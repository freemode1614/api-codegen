import fs from 'fs-extra';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock heavy deps so tests are fast and deterministic
vi.mock('execa', () => ({ execaCommand: vi.fn() }));
vi.mock('../src/openapi/index.js', () => ({
	codeGen: vi.fn(),
}));

import { apiCodeGenPlugin } from '../src/vite-plugin/index.js';
import { execaCommand } from 'execa';
import { codeGen } from '../src/openapi/index.js';

const mockedExeca = vi.mocked(execaCommand);
const mockedCodeGen = vi.mocked(codeGen);

const tmpRoot = path.join(
	process.cwd(),
	`__tests__/__tmp_vite_cache_${process.pid}`
);

describe('vite plugin caching (#9)', () => {
	beforeEach(async () => {
		await fs.mkdir(tmpRoot, { recursive: true });
		mockedExeca.mockReset();
		mockedCodeGen.mockReset();
	});

	afterEach(async () => {
		await fs.rm(tmpRoot, { recursive: true, force: true });
	});

	async function setupSpecFile(): Promise<{ specPath: string; outputPath: string; cacheDir: string }> {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(
			specPath,
			JSON.stringify({
				openapi: '3.0.0',
				info: { title: 'X', version: '1' },
				paths: {},
			})
		);
		return {
			specPath,
			outputPath: path.join(tmpRoot, 'out.ts'),
			cacheDir: path.join(tmpRoot, '.cache'),
		};
	}

	it('runs codeGen the first time, then reuses the cache on the second invocation', async () => {
		const { specPath, outputPath, cacheDir } = await setupSpecFile();
		mockedCodeGen.mockResolvedValue({
			code: 'export const x = 1;',
			stats: { endpoints: 2, schemas: 1, duration: 50 },
		});
		mockedExeca.mockResolvedValue({} as never);

		const plugin = apiCodeGenPlugin([
			{
				name: 'cached-api',
				spec: specPath,
				output: outputPath,
				typeCheck: false,
				cache: true,
				cacheDir,
			},
		]);
		const configHook = (plugin as { config: Function }).config;

		// First invocation: should hit codeGen once.
		await configHook({}, { command: 'build' });
		expect(mockedCodeGen).toHaveBeenCalledTimes(1);

		// Cache file should now exist.
		const cacheFiles = await fs.readdir(cacheDir);
		expect(cacheFiles.length).toBe(1);

		// Reset call counts, second invocation: should hit the cache.
		mockedCodeGen.mockClear();
		await configHook({}, { command: 'build' });
		expect(mockedCodeGen).toHaveBeenCalledTimes(0);

		// Output file was still written (so type check / downstream consumers
		// see the same artefact).
		const written = await fs.readFile(outputPath, 'utf8');
		expect(written).toBe('export const x = 1;');
	});

	it('invalidates the cache when the spec file is modified', async () => {
		const { specPath, outputPath, cacheDir } = await setupSpecFile();
		mockedCodeGen.mockResolvedValue({
			code: 'export const x = 1;',
			stats: { endpoints: 2, schemas: 1, duration: 50 },
		});
		mockedExeca.mockResolvedValue({} as never);

		const plugin = apiCodeGenPlugin([
			{
				name: 'cache-invalidate',
				spec: specPath,
				output: outputPath,
				typeCheck: false,
				cache: true,
				cacheDir,
			},
		]);
		const configHook = (plugin as { config: Function }).config;

		await configHook({}, { command: 'build' });
		expect(mockedCodeGen).toHaveBeenCalledTimes(1);

		// Touch the spec file — mtime changes; cache must miss.
		const future = new Date(Date.now() + 5_000);
		await fs.utimes(specPath, future, future);

		mockedCodeGen.mockClear();
		await configHook({}, { command: 'build' });
		expect(mockedCodeGen).toHaveBeenCalledTimes(1);
	});

	it('skips caching entirely when cache: false', async () => {
		const { specPath, outputPath, cacheDir } = await setupSpecFile();
		mockedCodeGen.mockResolvedValue({
			code: 'export const x = 1;',
			stats: { endpoints: 2, schemas: 1, duration: 50 },
		});
		mockedExeca.mockResolvedValue({} as never);

		const plugin = apiCodeGenPlugin([
			{
				name: 'no-cache',
				spec: specPath,
				output: outputPath,
				typeCheck: false,
				cache: false,
				cacheDir,
			},
		]);
		const configHook = (plugin as { config: Function }).config;

		await configHook({}, { command: 'build' });
		await configHook({}, { command: 'build' });

		expect(mockedCodeGen).toHaveBeenCalledTimes(2);

		// No cache files written.
		const exists = await fs.pathExists(cacheDir).catch(() => false);
		if (exists) {
			const files = await fs.readdir(cacheDir);
			expect(files.length).toBe(0);
		}
	});

	it('does not cache remote (http(s)) specs', async () => {
		mockedCodeGen.mockResolvedValue({
			code: 'export const r = 1;',
			stats: { endpoints: 0, schemas: 0, duration: 1 },
		});
		mockedExeca.mockResolvedValue({} as never);

		const plugin = apiCodeGenPlugin([
			{
				name: 'remote-api',
				spec: 'https://example.com/openapi.json',
				output: path.join(tmpRoot, 'remote.ts'),
				typeCheck: false,
				cache: true,
				cacheDir: path.join(tmpRoot, '.remote-cache'),
			},
		]);
		const configHook = (plugin as { config: Function }).config;

		await configHook({}, { command: 'build' });
		await configHook({}, { command: 'build' });

		expect(mockedCodeGen).toHaveBeenCalledTimes(2);
	});
});
