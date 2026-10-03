import fs from 'node:fs/promises';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the heavy deps so tests are fast and deterministic
vi.mock('execa', () => ({
	execaCommand: vi.fn(),
}));

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
	`__tests__/__tmp_vite_plugin_${process.pid}`
);

describe('apiCodeGenPlugin', () => {
	beforeEach(async () => {
		await fs.mkdir(tmpRoot, { recursive: true });
		mockedExeca.mockReset();
		mockedCodeGen.mockReset();
	});

	afterEach(async () => {
		await fs.rm(tmpRoot, { recursive: true, force: true });
	});

	it('returns a plugin with the expected name when options is empty', () => {
		const plugin = apiCodeGenPlugin([]);
		expect(plugin).toEqual({ name: 'api-code-gen' });
	});

	it('returns a plugin with the expected name when options is not an array', () => {
		// @ts-expect-error — intentionally wrong type
		const plugin = apiCodeGenPlugin(undefined);
		expect(plugin).toEqual({ name: 'api-code-gen' });
	});

	it('returns a vite plugin object with a config hook for valid options', () => {
		const plugin = apiCodeGenPlugin([
			{ name: 'my-api', spec: './openapi.json' },
		]);

		expect(plugin).toMatchObject({ name: 'api-code-gen' });
		expect(typeof (plugin as { config?: unknown }).config).toBe('function');
	});

	it('runs code generation for each configured option during config()', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(specPath, '{}');
		const outputPath = path.join(tmpRoot, 'out.ts');

		mockedCodeGen.mockResolvedValue({
			code: 'export const x = 1;',
			stats: { endpoints: 2, schemas: 3, duration: 7 },
		});
		mockedExeca.mockResolvedValue({} as never);

		const plugin = apiCodeGenPlugin([
			{ name: 'a', spec: specPath, output: outputPath, typeCheck: true },
		]);
		const configHook = (plugin as { config: Function }).config;

		await configHook({}, { command: 'build' });

		expect(mockedCodeGen).toHaveBeenCalledTimes(1);
		expect(mockedExeca).toHaveBeenCalledTimes(1); // type check ran
		const written = await fs.readFile(outputPath, 'utf8');
		expect(written).toBe('export const x = 1;');
	});

	it('skips type checking when typeCheck=false', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(specPath, '{}');

		mockedCodeGen.mockResolvedValue({
			code: 'export const y = 2;',
			stats: { endpoints: 0, schemas: 0, duration: 1 },
		});

		const plugin = apiCodeGenPlugin([
			{ name: 'a', spec: specPath, output: path.join(tmpRoot, 'out.ts'), typeCheck: false },
		]);
		const configHook = (plugin as { config: Function }).config;

		await configHook({}, { command: 'build' });

		expect(mockedExeca).not.toHaveBeenCalled();
	});

	it('captures generation failures without throwing and still resolves', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(specPath, '{}');

		mockedCodeGen.mockRejectedValue(new Error('parse failed'));

		const plugin = apiCodeGenPlugin([
			{ name: 'broken', spec: specPath, output: path.join(tmpRoot, 'out.ts') },
		]);
		const configHook = (plugin as { config: Function }).config;

		// Must not throw — failure is collected into the result object
		await expect(configHook({}, { command: 'build' })).resolves.toBeDefined();
		expect(mockedCodeGen).toHaveBeenCalledTimes(1);
	});

	it('reports type-check failures via the config result without throwing', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(specPath, '{}');

		mockedCodeGen.mockResolvedValue({
			code: 'export const z = 3;',
			stats: { endpoints: 1, schemas: 1, duration: 1 },
		});
		mockedExeca.mockRejectedValue(new Error('TS1005: syntax error'));

		const plugin = apiCodeGenPlugin([
			{ name: 'tc', spec: specPath, output: path.join(tmpRoot, 'out.ts'), verbose: true },
		]);
		const configHook = (plugin as { config: Function }).config;

		await expect(configHook({}, { command: 'build' })).resolves.toBeDefined();
		expect(mockedExeca).toHaveBeenCalledTimes(1);
	});

	it('handles non-Error rejections from execa gracefully', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(specPath, '{}');

		mockedCodeGen.mockResolvedValue({
			code: 'export const w = 4;',
			stats: { endpoints: 0, schemas: 0, duration: 1 },
		});
		// Non-Error rejection — should be coerced to empty errors array, not crash
		mockedExeca.mockRejectedValue('string-only failure');

		const plugin = apiCodeGenPlugin([
			{ name: 'weird', spec: specPath, output: path.join(tmpRoot, 'out.ts') },
		]);
		const configHook = (plugin as { config: Function }).config;

		await expect(configHook({}, { command: 'build' })).resolves.toBeDefined();
	});

	it('accepts URL specs without checking the filesystem', async () => {
		mockedCodeGen.mockResolvedValue({
			code: 'export const u = 5;',
			stats: { endpoints: 0, schemas: 0, duration: 1 },
		});

		const plugin = apiCodeGenPlugin([
			{ name: 'remote', spec: 'https://example.com/openapi.json', output: path.join(tmpRoot, 'remote.ts') },
		]);
		const configHook = (plugin as { config: Function }).config;

		await configHook({}, { command: 'build' });

		expect(mockedCodeGen).toHaveBeenCalledTimes(1);
		const callArg = mockedCodeGen.mock.calls[0]?.[0];
		// URL specs should be passed through unchanged (not file:// wrapped)
		expect((callArg as { docURL?: string }).docURL).toBe(
			'https://example.com/openapi.json'
		);
	});

	it('wraps file:// absolute paths back into absolute paths for existence check', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(specPath, '{}');

		mockedCodeGen.mockResolvedValue({
			code: 'export const f = 6;',
			stats: { endpoints: 0, schemas: 0, duration: 1 },
		});

		const plugin = apiCodeGenPlugin([
			{
				name: 'fileurl',
				spec: `file://${specPath}`,
				output: path.join(tmpRoot, 'fileurl.ts'),
			},
		]);
		const configHook = (plugin as { config: Function }).config;

		await configHook({}, { command: 'build' });
		expect(mockedCodeGen).toHaveBeenCalledTimes(1);
	});

	it('rejects when the spec file does not exist', async () => {
		const plugin = apiCodeGenPlugin([
			{
				name: 'missing',
				spec: path.join(tmpRoot, 'does-not-exist.json'),
				output: path.join(tmpRoot, 'missing.ts'),
			},
		]);
		const configHook = (plugin as { config: Function }).config;

		// Failure is caught and turned into result.error; the hook still resolves
		await expect(configHook({}, { command: 'build' })).resolves.toBeDefined();
		expect(mockedCodeGen).not.toHaveBeenCalled();
	});

	it('handles relative spec paths by resolving them against cwd', async () => {
		const specPath = path.join(tmpRoot, 'rel.json');
		await fs.writeFile(specPath, '{}');

		mockedCodeGen.mockResolvedValue({
			code: 'export const r = 7;',
			stats: { endpoints: 0, schemas: 0, duration: 1 },
		});

		// Use process.chdir to a known location, then point at a relative file
		const originalCwd = process.cwd();
		process.chdir(tmpRoot);
		try {
			const plugin = apiCodeGenPlugin([
				{ name: 'rel', spec: './rel.json', output: path.join(tmpRoot, 'rel.ts') },
			]);
			const configHook = (plugin as { config: Function }).config;
			await configHook({}, { command: 'build' });
			expect(mockedCodeGen).toHaveBeenCalledTimes(1);
			const callArg = mockedCodeGen.mock.calls[0]?.[0];
			// Relative path gets resolved to absolute (no file:// wrapper)
			const docURL = (callArg as { docURL?: string }).docURL;
			expect(docURL).toBeTruthy();
			expect(docURL?.startsWith('http')).toBe(false);
			expect(docURL?.endsWith('rel.json')).toBe(true);
		} finally {
			process.chdir(originalCwd);
		}
	});

	it('skips file writing when output is not provided', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(specPath, '{}');

		mockedCodeGen.mockResolvedValue({
			code: 'export const no = 8;',
			stats: { endpoints: 0, schemas: 0, duration: 1 },
		});

		const plugin = apiCodeGenPlugin([
			{ name: 'no-output', spec: specPath, typeCheck: false },
		]);
		const configHook = (plugin as { config: Function }).config;

		await expect(configHook({}, { command: 'build' })).resolves.toBeDefined();
		expect(mockedCodeGen).toHaveBeenCalledTimes(1);
		// typeCheck runs only when output exists, so execa should NOT be called
		expect(mockedExeca).not.toHaveBeenCalled();
	});

	it('aggregates stats across multiple options and handles unknown env.command', async () => {
		const specPath1 = path.join(tmpRoot, 's1.json');
		const specPath2 = path.join(tmpRoot, 's2.json');
		await fs.writeFile(specPath1, '{}');
		await fs.writeFile(specPath2, '{}');

		mockedCodeGen
			.mockResolvedValueOnce({
				code: 'export const a = 1;',
				stats: { endpoints: 5, schemas: 2, duration: 10 },
			})
			.mockResolvedValueOnce({
				code: 'export const b = 2;',
				stats: { endpoints: 3, schemas: 1, duration: 5 },
			});

		const plugin = apiCodeGenPlugin([
			{ name: 'one', spec: specPath1, output: path.join(tmpRoot, 'a.ts') },
			{ name: 'two', spec: specPath2, output: path.join(tmpRoot, 'b.ts') },
		]);
		const configHook = (plugin as { config: Function }).config;

		// env.command undefined → 'unknown' branch
		await configHook({}, {});
		expect(mockedCodeGen).toHaveBeenCalledTimes(2);
	});
});