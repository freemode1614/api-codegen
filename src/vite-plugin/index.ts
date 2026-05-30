import path from 'node:path';
import { createScopedLogger } from '@moccona/logger';
import fs from 'fs-extra';
import type { PluginOption } from 'vite';
import { loadConfig, toProviderOptions } from '@/core/config';
import {
	createErrors,
	formatError,
	isApicodegenError,
	wrapError,
} from '@/core/errors';
import { codeGen } from '@/openapi';

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
}> {
	const { name, typeCheck = true, verbose, ...restOptions } = option;

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

		// Convert to provider options and resolve docURL
		let docURL = config.spec;
		if (!docURL.startsWith('http://') && !docURL.startsWith('https://')) {
			if (docURL.startsWith('/') || docURL.match(/^[A-Za-z]:/)) {
				docURL = `file://${docURL}`;
			} else {
				docURL = path.resolve(process.cwd(), docURL);
			}
		}

		const result = await codeGen({
			...toProviderOptions(config),
			docURL,
		});

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
					const { name, output, stats } = result;
					if (stats) {
						console.log(
							`\x1b[32m✓\x1b[0m ${name} → ${output} (${stats.endpoints} endpoints, ${stats.schemas} schemas) ${stats.duration}ms`
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
