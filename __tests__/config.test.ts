import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import path from 'node:path';
import fs from 'fs-extra';
import {
	loadConfig,
	mergeConfigs,
	validateConfig,
	toProviderOptions,
} from '../src/core/config.js';
import type { ApicodegenConfig, ResolvedConfig } from '../src/core/config.js';

const TEST_DIR = path.join(process.cwd(), '.test-temp-config');

describe('config', () => {
	beforeEach(async () => {
		await fs.ensureDir(TEST_DIR);
		process.env = {};
	});

	afterEach(async () => {
		await fs.remove(TEST_DIR);
	});

	describe('mergeConfigs', () => {
		it('should merge configs with later sources taking priority', () => {
			const base = { spec: '', output: './output.ts' };
			const config1 = { spec: 'spec1' };
			const config2 = { spec: 'spec2', verbose: true };

			const result = mergeConfigs(base, config1, config2);

			expect(result.spec).toBe('spec2');
			expect(result.verbose).toBe(true);
			expect(result.output).toBe('./output.ts');
		});

		it('should not override with undefined values', () => {
			const base = { spec: 'base', output: 'output', verbose: true };
			const override = { spec: undefined, verbose: undefined };

			const result = mergeConfigs(base, override);

			expect(result.spec).toBe('base');
			expect(result.verbose).toBe(true);
		});

		it('should handle empty sources', () => {
			const base = { spec: 'base' };

			const result = mergeConfigs(base, undefined, {}, undefined);

			expect(result.spec).toBe('base');
		});
	});

	describe('validateConfig', () => {
		it('should pass for valid config with spec', () => {
			const config: Partial<ApicodegenConfig> = { spec: './openapi.json' };

			const isValid = validateConfig(config);

			expect(isValid).toBe(true);
		});

		it('should throw for missing spec', () => {
			const config: Partial<ApicodegenConfig> = { output: './out.ts' };

			expect(() => validateConfig(config)).toThrow(
				'Missing required field: spec'
			);
		});

		it('should throw for empty spec', () => {
			const config: Partial<ApicodegenConfig> = { spec: '' };

			expect(() => validateConfig(config)).toThrow(
				'Missing required field: spec'
			);
		});
	});

	describe('loadConfig', () => {
		it('should load from JSON config file', async () => {
			const configPath = path.join(TEST_DIR, 'apicodegen.json');
			await fs.writeJson(configPath, {
				spec: './openapi.json',
				output: './generated/api.ts',
				adaptor: 'fetch',
				baseURL: 'https://api.example.com',
			});

			const result = await loadConfig({
				configFile: configPath,
				cwd: TEST_DIR,
			});

			expect(result.spec).toBe('./openapi.json');
			expect(result.output).toBe('./generated/api.ts');
			expect(result.adaptor).toBe('fetch');
			expect(result.baseURL).toBe('https://api.example.com');
		});

		it('should load from .apicodegenrc config file', async () => {
			const configPath = path.join(TEST_DIR, '.apicodegenrc');
			await fs.writeJson(configPath, {
				spec: './spec.json',
				verbose: true,
			});

			const result = await loadConfig({
				cwd: TEST_DIR,
			});

			expect(result.spec).toBe('./spec.json');
			expect(result.verbose).toBe(true);
		});

		it('should load from apicodegen.config.json in cwd', async () => {
			const configPath = path.join(TEST_DIR, 'apicodegen.config.json');
			await fs.writeJson(configPath, {
				spec: './my-spec.json',
			});

			const result = await loadConfig({
				cwd: TEST_DIR,
			});

			expect(result.spec).toBe('./my-spec.json');
		});

		it('should load from package.json apicodegen field', async () => {
			const pkgPath = path.join(TEST_DIR, 'package.json');
			await fs.writeJson(pkgPath, {
				name: 'test-project',
				apicodegen: {
					spec: './pkg-spec.json',
					output: './out.ts',
				},
			});

			const result = await loadConfig({
				cwd: TEST_DIR,
			});

			expect(result.spec).toBe('./pkg-spec.json');
			expect(result.output).toBe('./out.ts');
		});

		it('should load from environment variables', async () => {
			process.env.APICODEGEN_SPEC = './env-spec.json';
			process.env.APICODEGEN_OUTPUT = './env-out.ts';
			process.env.APICODEGEN_BASE_URL = 'https://env.example.com';
			process.env.APICODEGEN_VERBOSE = 'true';
			process.env.APICODEGEN_ADAPTOR = 'axios';

			const result = await loadConfig({
				cwd: TEST_DIR,
			});

			expect(result.spec).toBe('./env-spec.json');
			expect(result.output).toBe('./env-out.ts');
			expect(result.baseURL).toBe('https://env.example.com');
			expect(result.verbose).toBe(true);
			expect(result.adaptor).toBe('axios');
		});

		it('should prioritize CLI options over env vars and file', async () => {
			const configPath = path.join(TEST_DIR, 'file-config.json');
			await fs.writeJson(configPath, {
				spec: './file-spec.json',
				output: './file-out.ts',
				verbose: false,
			});

			process.env.APICODEGEN_SPEC = './env-spec.json';
			process.env.APICODEGEN_VERBOSE = 'true';

			const result = await loadConfig({
				configFile: configPath,
				cwd: TEST_DIR,
				cliOptions: {
					spec: './cli-spec.json',
					verbose: true, // CLI sets verbose: true, overriding file
				},
			});

			expect(result.spec).toBe('./cli-spec.json');
			expect(result.output).toBe('./file-out.ts');
			expect(result.verbose).toBe(true); // CLI overrides env and file
		});

		it('should handle boolean env var conversion', async () => {
			process.env.APICODEGEN_WATCH = '1';
			process.env.APICODEGEN_TYPE_CHECK = 'true';

			const result = await loadConfig({
				cwd: TEST_DIR,
				cliOptions: { spec: './spec.json' },
			});

			expect(result.watch).toBe(true);
			expect(result.typeCheck).toBe(true);
		});

		it('should throw for missing spec', async () => {
			await expect(
				loadConfig({
					cwd: TEST_DIR,
					cliOptions: {},
				})
			).rejects.toThrow('Missing required field: spec');
		});

		it('should find apicodegen.config.js (ESM)', async () => {
			const configPath = path.join(TEST_DIR, 'apicodegen.config.js');
			await fs.writeFile(
				configPath,
				`export default {
					spec: './js-spec.json',
					output: './js-out.ts'
				};`
			);

			const result = await loadConfig({
				cwd: TEST_DIR,
			});

			expect(result.spec).toBe('./js-spec.json');
		});

		it('should use default values', async () => {
			const result = await loadConfig({
				cwd: TEST_DIR,
				cliOptions: { spec: './spec.json' },
			});

			expect(result.output).toBe('./output.ts');
			expect(result.adaptor).toBeUndefined();
			expect(result.baseURL).toBeUndefined();
		});

		it('should include configFilePath in result', async () => {
			const configPath = path.join(TEST_DIR, 'test-config.json');
			await fs.writeJson(configPath, { spec: './spec.json' });

			const result = await loadConfig({
				configFile: configPath,
				cwd: TEST_DIR,
			});

			expect(result.configFilePath).toBe(configPath);
		});

		it('should use name option for result name', async () => {
			await fs.writeJson(path.join(TEST_DIR, 'config.json'), {
				spec: './spec.json',
			});

			const result = await loadConfig({
				configFile: path.join(TEST_DIR, 'config.json'),
				cwd: TEST_DIR,
				name: 'my-custom-name',
			});

			expect(result.name).toBe('my-custom-name');
		});

		it('should fall back to baseURL for name when no name provided', async () => {
			await fs.writeJson(path.join(TEST_DIR, 'config.json'), {
				spec: './spec.json',
				baseURL: 'https://fallback.example.com',
			});

			const result = await loadConfig({
				configFile: path.join(TEST_DIR, 'config.json'),
				cwd: TEST_DIR,
			});

			expect(result.name).toBe('https://fallback.example.com');
		});

		it('should handle requestOptions', async () => {
			await fs.writeJson(path.join(TEST_DIR, 'config.json'), {
				spec: './spec.json',
				requestOptions: {
					method: 'POST',
					headers: { Authorization: 'Bearer token' },
				},
			});

			const result = await loadConfig({
				configFile: path.join(TEST_DIR, 'config.json'),
				cwd: TEST_DIR,
			});

			expect(result.requestOptions).toEqual({
				method: 'POST',
				headers: { Authorization: 'Bearer token' },
			});
		});
	});

	describe('toProviderOptions', () => {
		it('should convert config to provider options format', () => {
			const config: ResolvedConfig = {
				spec: './spec.json',
				output: './out.ts',
				name: 'test',
				adaptor: 'axios',
				baseURL: 'https://api.example.com',
				verbose: true,
				importClientSource: 'import { custom } from "./client"',
				requestOptions: { method: 'GET' },
			};

			const result = toProviderOptions(config);

			expect(result).toEqual({
				docURL: './spec.json',
				output: './out.ts',
				adaptor: 'axios',
				baseURL: 'https://api.example.com',
				verbose: true,
				importClientSource: 'import { custom } from "./client"',
				requestOptions: { method: 'GET' },
			});
		});

		it('should handle minimal config', () => {
			const config: ResolvedConfig = {
				spec: './spec.json',
				output: './out.ts',
				name: 'test',
			};

			const result = toProviderOptions(config);

			expect(result.docURL).toBe('./spec.json');
			expect(result.output).toBe('./out.ts');
			expect(result.adaptor).toBeUndefined();
			expect(result.baseURL).toBeUndefined();
			expect(result.verbose).toBeUndefined();
		});
	});

	describe('config file priority', () => {
		it('should prioritize apicodegen.config.json over .apicodegenrc', async () => {
			await fs.writeJson(path.join(TEST_DIR, 'apicodegen.config.json'), {
				spec: './config-spec.json',
			});
			await fs.writeJson(path.join(TEST_DIR, '.apicodegenrc'), {
				spec: './rc-spec.json',
			});

			const result = await loadConfig({ cwd: TEST_DIR });

			expect(result.spec).toBe('./config-spec.json');
		});

		it('should prioritize package.json apicodegen object over env', async () => {
			process.env.APICODEGEN_SPEC = './env-spec.json';

			await fs.writeJson(path.join(TEST_DIR, 'package.json'), {
				apicodegen: { spec: './pkg-spec.json' },
			});

			const result = await loadConfig({ cwd: TEST_DIR });

			expect(result.spec).toBe('./pkg-spec.json');
		});
	});
});