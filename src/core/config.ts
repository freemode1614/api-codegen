import path from 'node:path';
import fs from 'fs-extra';

import type { Adaptors, FetchDocRequestInit } from './interface.js';

/**
 * Adaptor type for HTTP client
 */
export type ConfigAdaptor = keyof typeof Adaptors;

/**
 * Shared config interface for CLI and Vite plugin
 */
export interface ApicodegenConfig {
	/** OpenAPI spec file path or URL (required) */
	spec: string;
	/** Output file path */
	output: string;
	/** HTTP client adaptor (fetch|axios) */
	adaptor?: ConfigAdaptor;
	/** Base URL for API endpoints */
	baseURL?: string;
	/** Custom client import source path */
	importClientSource?: string;
	/** Enable verbose logging */
	verbose?: boolean;
	/** Run type check after generation (default: true) */
	typeCheck?: boolean;
	/** Watch for file changes */
	watch?: boolean;
	/** Request options for fetching spec */
	requestOptions?: FetchDocRequestInit;
}

/**
 * Options for loading config
 */
export interface LoadConfigOptions {
	/** Explicit config file path */
	configFile?: string;
	/** Config file directory (defaults to cwd) */
	cwd?: string;
	/** CLI overrides */
	cliOptions?: Partial<ApicodegenConfig>;
	/** Vite plugin options (for name metadata) */
	name?: string;
}

/**
 * Result of config loading
 */
export interface ResolvedConfig extends ApicodegenConfig {
	/** Config file path if loaded from file */
	configFilePath?: string;
	/** Config name for logging */
	name: string;
}

/**
 * Environment variable mappings
 */
const ENV_MAPPINGS: Record<string, keyof ApicodegenConfig> = {
	APICODEGEN_SPEC: 'spec',
	APICODEGEN_OUTPUT: 'output',
	APICODEGEN_BASE_URL: 'baseURL',
	APICODEGEN_ADAPTOR: 'adaptor',
	APICODEGEN_VERBOSE: 'verbose',
	APICODEGEN_WATCH: 'watch',
	APICODEGEN_TYPE_CHECK: 'typeCheck',
};

/**
 * Load config from environment variables
 */
function loadFromEnv(): Partial<ApicodegenConfig> {
	const config: Partial<ApicodegenConfig> = {};

	for (const [envKey, configKey] of Object.entries(ENV_MAPPINGS)) {
		const value = process.env[envKey];
		if (value !== undefined) {
			// Convert string to appropriate type
			switch (configKey) {
				case 'verbose':
				case 'watch':
				case 'typeCheck':
					config[configKey] = value === 'true' || value === '1';
					break;
				case 'adaptor':
					config[configKey] = value as ConfigAdaptor;
					break;
				default:
					config[configKey] = value;
			}
		}
	}

	return config;
}

/**
 * Load config from a file
 */
async function loadFromFile(
	filePath: string
): Promise<Partial<ApicodegenConfig>> {
	const ext = path.extname(filePath).toLowerCase();

	try {
		if (ext === '.json' || ext === '.jsonc') {
			const content = await fs.readFile(filePath, 'utf-8');
			return JSON.parse(content);
		}

		if (ext === '.js' || ext === '.cjs' || ext === '.mjs') {
			const mod = await import(filePath);
			return mod.default || mod;
		}

		if (ext === '.ts') {
			// For .ts files, try to load as JSON first
			const content = await fs.readFile(filePath, 'utf-8');
			// Try parsing as JSON (may work for JSON-like TS files)
			try {
				return JSON.parse(content);
			} catch {
				// For actual TS config, we'd need ts-node or similar
				// For now, fall back to looking for JSON export pattern
				const jsonMatch = content.match(/export\s+default\s+(\{.+\})/s);
				if (jsonMatch) {
					return JSON.parse(jsonMatch[1]);
				}
			}
		}

		// Try parsing as JSON for unknown extensions
		const content = await fs.readFile(filePath, 'utf-8');
		return JSON.parse(content);
	} catch (error) {
		throw new Error(`Failed to load config from ${filePath}: ${error}`);
	}
}

/**
 * Find config file in project root
 */
async function findConfigFile(cwd: string): Promise<string | null> {
	const configFiles = [
		'apicodegen.config.json',
		'apicodegen.config.js',
		'apicodegen.config.mjs',
		'.apicodegenrc',
		'.apicodegenrc.json',
		'.apicodegenrc.js',
		'.apicodegenrc.mjs',
	];

	for (const fileName of configFiles) {
		const filePath = path.join(cwd, fileName);
		if (await fs.pathExists(filePath)) {
			return filePath;
		}
	}

	// Also check package.json for apicodegen field
	const packageJsonPath = path.join(cwd, 'package.json');
	if (await fs.pathExists(packageJsonPath)) {
		try {
			const pkg = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
			if (pkg.apicodegen && typeof pkg.apicodegen === 'string') {
				return path.resolve(cwd, pkg.apicodegen);
			}
		} catch {
			// Ignore package.json parse errors
		}
	}

	return null;
}

/**
 * Merge multiple config sources with priority
 * Priority: defaults < env vars < config file < CLI args
 */
function mergeConfigs(
	base: ApicodegenConfig,
	...sources: (Partial<ApicodegenConfig> | undefined)[]
): ApicodegenConfig {
	const result = { ...base };

	for (const source of sources) {
		if (!source) continue;

		for (const [key, value] of Object.entries(source)) {
			// Only override if value is defined (not undefined)
			if (value !== undefined) {
				(result as Record<string, unknown>)[key] = value;
			}
		}
	}

	return result;
}

/**
 * Validate config has required fields
 */
function validateConfig(
	config: Partial<ApicodegenConfig>
): config is ApicodegenConfig {
	if (!config.spec) {
		throw new Error(
			'Missing required field: spec (OpenAPI spec file path or URL)'
		);
	}
	return true;
}

/**
 * Load and resolve config from multiple sources
 */
export async function loadConfig(
	options: LoadConfigOptions = {}
): Promise<ResolvedConfig> {
	const cwd = options.cwd || process.cwd();
	const cliOptions = options.cliOptions || {};

	// 1. Load from environment variables
	const envConfig = loadFromEnv();

	// 2. Load from config file (if specified or found)
	let fileConfig: Partial<ApicodegenConfig> = {};
	let configFilePath: string | undefined;

	if (options.configFile) {
		configFilePath = path.resolve(cwd, options.configFile);
		fileConfig = await loadFromFile(configFilePath);
	} else {
		const foundPath = await findConfigFile(cwd);
		if (foundPath) {
			configFilePath = foundPath;
			fileConfig = await loadFromFile(foundPath);
		}
	}

	// 3. Check package.json inline config
	const packageJsonPath = path.join(cwd, 'package.json');
	let inlineConfig: Partial<ApicodegenConfig> = {};
	if (await fs.pathExists(packageJsonPath)) {
		try {
			const pkg = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
			if (pkg.apicodegen && typeof pkg.apicodegen === 'object') {
				inlineConfig = pkg.apicodegen as Partial<ApicodegenConfig>;
			}
		} catch {
			// Ignore
		}
	}

	// 4. Merge configs with priority
	const merged = mergeConfigs(
		{ spec: '', output: './output.ts' }, // defaults
		envConfig,
		inlineConfig,
		fileConfig,
		cliOptions
	);

	// 5. Validate
	validateConfig(merged);

	// 6. Add metadata
	const name = options.name || merged.baseURL || merged.spec;

	return {
		...merged,
		configFilePath,
		name,
	};
}

/**
 * Create CLI options from config for commander
 */
export function configToCLIOptions(
	config: ApicodegenConfig
): Record<string, unknown> {
	const options: Record<string, unknown> = {};

	if (config.spec) options.spec = config.spec;
	if (config.output) options.output = config.output;
	if (config.adaptor) options.adaptor = config.adaptor;
	if (config.baseURL) options.baseURL = config.baseURL;
	if (config.verbose) options.verbose = config.verbose;
	if (config.watch) options.watch = config.watch;
	if (config.importClientSource)
		options.importClientSource = config.importClientSource;

	return options;
}

/**
 * Convert resolved config to provider options format
 */
export function toProviderOptions(config: ResolvedConfig) {
	return {
		docURL: config.spec,
		output: config.output,
		adaptor: config.adaptor,
		baseURL: config.baseURL,
		importClientSource: config.importClientSource,
		verbose: config.verbose,
		requestOptions: config.requestOptions,
	};
}
