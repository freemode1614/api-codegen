import path from 'node:path';
import { createScopedLogger } from '@moccona/logger';
import fs from 'fs-extra';
import type { PluginOption } from 'vite';
import { loadConfig, toProviderOptions } from '../core/config.js';
import {
	createErrors,
	ErrorCodes,
	isApicodegenError,
	wrapError,
} from '../core/errors.js';
import { logger } from '../core/logger.js';
import { codeGen } from '../openapi/index.js';

const PLUGIN_NAME = 'api-code-gen';
const pluginLogger = createScopedLogger('api-code-gen');

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
 * Find the nearest tsconfig.json or jsconfig.json by searching upward.
 * Bounded by process.cwd() — the Vite project root — to avoid picking up
 * unrelated configs outside the project.
 */
async function findNearestTsConfig(filePath: string): Promise<string | null> {
	let dir = path.dirname(path.resolve(filePath));
	const rootDir = process.cwd();
	const fsRoot = path.parse(dir).root;

	while (true) {
		for (const name of ['tsconfig.json', 'jsconfig.json']) {
			const configPath = path.join(dir, name);
			if (await fs.pathExists(configPath)) {
				return configPath;
			}
		}

		if (dir === rootDir || dir === fsRoot) break;

		dir = path.dirname(dir);
	}

	return null;
}

/**
 * Run TypeScript type checking on generated file
 */
async function runTypeCheck(filePath: string): Promise<string[]> {
	const { execaCommand } = await import('execa');
	const errors: string[] = [];

	const resolvedPath = path.resolve(filePath);
	const tsconfigPath = await findNearestTsConfig(resolvedPath);

	if (!tsconfigPath) {
		try {
			await execaCommand(`npx tsc ${resolvedPath} --noEmit`, {
				shell: true,
			});
		} catch (error) {
			if (error instanceof Error) {
				errors.push(error.message);
			}
		}
		return errors;
	}

	const outputDir = path.dirname(resolvedPath);
	const tempConfigName = `.${path.basename(resolvedPath).replace(/\.ts$/i, '')}.${Date.now()}.apicodegen.json`;
	const tempConfigPath = path.join(outputDir, tempConfigName);
	const extendsPath = path.relative(outputDir, tsconfigPath);

	const tempConfig = {
		extends: extendsPath,
		compilerOptions: {
			noEmit: true,
		},
		include: [path.basename(resolvedPath)],
	};

	try {
		await fs.writeJson(tempConfigPath, tempConfig);
		await execaCommand(`npx tsc --project "${tempConfigPath}" --noEmit`, {
			shell: true,
		});
	} catch (error) {
		if (error instanceof Error) {
			errors.push(error.message);
		}
	} finally {
		try {
			await fs.remove(tempConfigPath);
		} catch {
			// ignore cleanup errors
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
		logger.info(`Generating ${name}...`);

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
				pluginLogger.warn(`Type check failed for ${config.output}`);
				if (verbose) {
					for (const error of typeErrors) {
						pluginLogger.warn(`  ${error}`);
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
		pluginLogger.warn('No API configurations provided to apiCodeGenPlugin');
		return { name: PLUGIN_NAME };
	}

	return {
		name: PLUGIN_NAME,

		async config(_config, env) {
			logger.heading('API Code Gen', env?.command);

			const results = await Promise.all(options.map(generateForOption));
			const successCount = results.filter((r) => r.success).length;
			const failCount = options.length - successCount;

			logger.divider();

			for (const result of results) {
				if (result.success) {
					const { name, output, stats } = result;
					if (stats) {
						logger.item(
							`${name} → ${output} (${stats.endpoints} endpoints, ${stats.schemas} schemas) ${stats.duration}ms`,
							'green'
						);
					} else {
						logger.item(`${name} → ${output || 'N/A'}`, 'green');
					}
				} else {
					const { name, error } = result;
					if (isApicodegenError(error)) {
						logger.item(name, 'red');
						logger.error(error, true);
					} else {
						const wrapped = wrapError(error!, {
							code: ErrorCodes.GENERATION_FAILED,
							message: `Failed to generate API "${name}"`,
						});
						logger.item(name, 'red');
						logger.error(wrapped, true);
					}
				}
			}

			logger.divider();

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

			logger.summary({
				succeeded: successCount,
				failed: failCount,
				endpoints: totalEndpoints,
				schemas: totalSchemas,
				duration: totalDuration,
			});
			logger.divider();

			return {};
		},
	};
}

export default apiCodeGenPlugin;
