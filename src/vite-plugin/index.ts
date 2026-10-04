import path from 'node:path';
import { createScopedLogger } from '@moccona/logger';
import fs from 'fs-extra';
import type { PluginOption } from 'vite';
import { loadConfig, toProviderOptions } from '../core/config.js';
import {
	createErrors,
	formatError,
	isApicodegenError,
	wrapError,
} from '../core/errors.js';
import { type CodeGenResult, codeGen } from '../openapi/index.js';
import { CodegenCache } from './cache.js';

const PLUGIN_NAME = 'api-code-gen';
const logger = createScopedLogger('api-code-gen');

export type ApiCodeGenPluginOptions = {
	/** Human-readable name for this API config (required) */
	name: string;
	/** OpenAPI spec file path or URL */
	spec?: string;
	/** Output file path */
	output?: string;
	/** HTTP client adaptor */
	adaptor?: 'fetch' | 'axios';
	/** Base URL for API endpoints */
	baseURL?: string;
	/** Custom client import source path */
	importClientSource?: string;
	/** Enable verbose logging */
	verbose?: boolean;
	/** Run type check after generation (default: true) */
	typeCheck?: boolean;
	/**
	 * Enable on-disk caching of generated code (default: true).
	 * Subsequent vite invocations skip codegen when neither the spec file
	 * nor the options have changed. Disable to force a fresh generation.
	 */
	cache?: boolean;
	/**
	 * Directory to store cache entries (default: `node_modules/.cache/apicodegen`).
	 * Ignored when `cache === false`.
	 */
	cacheDir?: string;
};

/**
 * Run TypeScript type checking on generated file
 */
async function runTypeCheck(filePath: string): Promise<string[]> {
	const { execaCommand } = await import('execa');
	const errors: string[] = [];

	try {
		await execaCommand(`npx tsc ${filePath} --noEmit`, {
			shell: true,
		});
	} catch (error) {
		if (error instanceof Error) {
			errors.push(error.message);
		}
	}

	return errors;
}

/**
 * Validate spec path exists
 */
async function validateSpecPath(specPath: string): Promise<void> {
	// For URLs, skip file existence check
	if (specPath.startsWith('http://') || specPath.startsWith('https://')) {
		return;
	}

	const filePath = specPath.replace(/^file:\/\//, '');
	const absolutePath = path.isAbsolute(filePath)
		? filePath
		: path.resolve(process.cwd(), filePath);

	const exists = await fs.pathExists(absolutePath);
	if (!exists) {
		throw createErrors.specNotFound(absolutePath);
	}
}

/**
 * Generate code for a single API configuration
 */
async function generateForOption(option: ApiCodeGenPluginOptions): Promise<{
	success: boolean;
	name: string;
	output?: string;
	stats?: { endpoints: number; schemas: number; duration: number };
	error?: unknown;
	cached?: boolean;
}> {
	const {
		name,
		typeCheck = true,
		verbose,
		cache = true,
		cacheDir,
		...restOptions
	} = option;

	try {
		console.log(`\x1b[36m├─\x1b[0m ${name}`);

		// Use config loader to handle env vars and config files
		const config = await loadConfig({
			name,
			cliOptions: { ...restOptions, verbose },
		});

		// Validate spec exists
		await validateSpecPath(config.spec);

		// Ensure output directory exists
		if (config.output) {
			const outputDir = path.dirname(config.output);
			await fs.ensureDir(outputDir);
		}

		// Convert to provider options and resolve docURL.
		// Pass absolute paths / file:// URLs through unchanged so the
		// generator's `Base.resolveSpecURL` can pick the file transport.
		// Only relative paths need to be anchored to cwd.
		let docURL = config.spec;
		if (
			!docURL.startsWith('http://') &&
			!docURL.startsWith('https://') &&
			!docURL.startsWith('file://') &&
			!docURL.startsWith('/') &&
			!/^[A-Za-z]:[\\/]/.test(docURL)
		) {
			docURL = path.resolve(process.cwd(), docURL);
		}

		// Resolve cache directory (default node_modules/.cache/apicodegen).
		const resolvedCacheDir =
			cacheDir ??
			path.join(process.cwd(), 'node_modules', '.cache', 'apicodegen');
		const codegenCache = cache ? new CodegenCache(resolvedCacheDir) : null;

		const optionsHash = CodegenCache.hashOptions({
			name,
			spec: docURL,
			output: config.output,
			adaptor: config.adaptor,
			baseURL: config.baseURL,
			importClientSource: config.importClientSource,
		});

		let result: CodeGenResult | null = null;
		let cached = false;

		if (codegenCache) {
			const cachedEntry = await codegenCache.lookup(optionsHash, docURL);
			if (cachedEntry) {
				result = {
					code: cachedEntry.code,
					stats: cachedEntry.stats,
				};
				cached = true;
				if (verbose) {
					logger.debug(`Cache hit for ${name} (${optionsHash})`);
				}
			}
		}

		if (!result) {
			result = await codeGen({
				...toProviderOptions(config),
				docURL,
			});

			// Persist to cache for subsequent runs.
			if (codegenCache) {
				try {
					const fsPromises = await import('node:fs/promises');
					let specMtimeMs: number | undefined;
					let specContentHash: string | undefined;
					const isRemote =
						docURL.startsWith('http://') || docURL.startsWith('https://');
					if (!isRemote) {
						try {
							const st = await fsPromises.stat(docURL);
							specMtimeMs = st.mtimeMs;
							const content = await fsPromises.readFile(docURL, 'utf8');
							specContentHash = CodegenCache.hashContent(content);
						} catch {
							// Spec unreadable; skip caching.
						}
					}
					await codegenCache.store({
						optionsHash,
						specMtimeMs,
						specContentHash,
						code: result.code,
						stats: result.stats,
					});
				} catch (cacheError) {
					// Cache write failures must not break generation.
					if (verbose) {
						logger.warn(
							`Cache write failed for ${name}: ${(cacheError as Error).message}`
						);
					}
				}
			}
		}

		if (config.output) {
			await fs.writeFile(config.output, result.code);
		}

		// Run type check if enabled
		if (typeCheck && config.output) {
			const typeErrors = await runTypeCheck(config.output);
			if (typeErrors.length > 0) {
				logger.warn(`Type check failed for ${config.output}`);
				if (verbose) {
					for (const error of typeErrors) {
						logger.warn(`  ${error}`);
					}
				}
			}
		}

		return {
			success: true,
			name,
			output: config.output,
			stats: result.stats,
			cached,
		};
	} catch (error) {
		return {
			success: false,
			name,
			error,
		};
	}
}

/**
 * Main Vite plugin function
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { apiCodeGenPlugin } from '@moccona/apicodegen/vite';
 *
 * export default defineConfig({
 *   plugins: [
 *     apiCodeGenPlugin([
 *       {
 *         name: 'my-api',
 *         spec: './openapi.json',
 *         output: './src/api/generated.ts',
 *         baseURL: 'https://api.example.com',
 *       },
 *     ]),
 *   ],
 * });
 * ```
 */
export function apiCodeGenPlugin(
	options: ApiCodeGenPluginOptions[]
): PluginOption {
	if (!Array.isArray(options) || options.length === 0) {
		logger.warn('No API configurations provided to apiCodeGenPlugin');
		return { name: PLUGIN_NAME };
	}

	return {
		name: PLUGIN_NAME,

		async config(_config, env) {
			console.log(`\x1b[1m\x1b[36m${'─'.repeat(50)}\x1b[0m`);
			console.log(`\x1b[1m\x1b[36mAPI Code Gen\x1b[0m`);
			console.log(`\x1b[90mMode:\x1b[0m ${env?.command || 'unknown'}`);
			console.log(`\x1b[1m\x1b[36m${'─'.repeat(50)}\x1b[0m`);

			const results = await Promise.all(options.map(generateForOption));
			const successCount = results.filter((r) => r.success).length;
			const failCount = options.length - successCount;

			console.log(`\x1b[1m\x1b[36m${'─'.repeat(50)}\x1b[0m`);

			for (const result of results) {
				if (result.success) {
					const { name, output, stats, cached } = result;
					if (stats) {
						const cachedTag = cached ? ' \x1b[90m[cached]\x1b[0m' : '';
						console.log(
							`\x1b[32m✓\x1b[0m ${name} → ${output} (${stats.endpoints} endpoints, ${stats.schemas} schemas) ${stats.duration}ms${cachedTag}`
						);
					} else {
						console.log(`\x1b[32m✓\x1b[0m ${name} → ${output || 'N/A'}`);
					}
				} else {
					const { name, error } = result;
					if (isApicodegenError(error)) {
						console.log(`\x1b[31m✗\x1b[0m ${name}`);
						console.log(`\x1b[90m${formatError(error, true)}\x1b[0m`);
					} else {
						const wrapped = wrapError(error!, {
							code: 'E_GENERATION_FAILED',
							message: `Failed to generate API "${name}"`,
						});
						console.log(`\x1b[31m✗\x1b[0m ${name}`);
						console.log(`\x1b[90m${formatError(wrapped, true)}\x1b[0m`);
					}
				}
			}

			console.log(`\x1b[1m\x1b[36m${'─'.repeat(50)}\x1b[0m`);

			const totalDuration = results.reduce(
				(sum, r) => sum + (r.stats?.duration || 0),
				0
			);
			const totalEndpoints = results.reduce(
				(sum, r) => sum + (r.stats?.endpoints || 0),
				0
			);
			const totalSchemas = results.reduce(
				(sum, r) => sum + (r.stats?.schemas || 0),
				0
			);

			if (failCount === 0) {
				console.log(
					`\x1b[32m✓\x1b[0m API Code Gen - Complete (\x1b[90m${successCount}/${options.length} succeeded\x1b[0m, ${totalEndpoints} endpoints, ${totalSchemas} schemas, ${totalDuration}ms\x1b[0m)`
				);
			} else {
				console.log(
					`\x1b[33m⚠\x1b[0m API Code Gen - Complete (\x1b[90m${successCount} succeeded, ${failCount} failed\x1b[0m, ${totalEndpoints} endpoints, ${totalSchemas} schemas, ${totalDuration}ms\x1b[0m)`
				);
			}
			console.log(`\x1b[1m\x1b[36m${'─'.repeat(50)}\x1b[0m`);

			return {};
		},
	};
}

export default apiCodeGenPlugin;
