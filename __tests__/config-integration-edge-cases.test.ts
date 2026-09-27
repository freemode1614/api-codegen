import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import path from 'node:path';
import os from 'node:os';
import fs from 'fs-extra';
import {
	loadConfig,
	mergeConfigs,
	validateConfig,
} from '../src/core/config.js';
import { OpenAPIProvider } from '../src/openapi/index.js';

/**
 * Step 3 — config + OpenAPIProvider integration edge cases.
 * Locks current behavior; BUG notes mark any surprising paths.
 */

// ---------- helpers ----------
const makeV3Doc = (overrides: Record<string, unknown> = {}) => ({
	openapi: '3.0.0',
	info: { title: 't', version: '1' },
	paths: {},
	...overrides,
});

// Minimal valid v3 used to satisfy Provider ctor (it parses in ctor).
const makeProvider = (): OpenAPIProvider =>
	new OpenAPIProvider(
		{ spec: 'x', output: 'x' } as never,
		makeV3Doc() as never
	);

// ===== loadConfig: loadFromEnv edges =====
describe('loadConfig env-var edge cases', () => {
	const ENV_KEYS = [
		'APICODEGEN_SPEC',
		'APICODEGEN_OUTPUT',
		'APICODEGEN_BASE_URL',
		'APICODEGEN_ADAPTOR',
		'APICODEGEN_VERBOSE',
		'APICODEGEN_WATCH',
		'APICODEGEN_TYPE_CHECK',
	];

	let savedEnv: Record<string, string | undefined> = {};

	beforeEach(() => {
		savedEnv = {};
		for (const k of ENV_KEYS) {
			savedEnv[k] = process.env[k];
			delete process.env[k];
		}
	});

	afterEach(() => {
		for (const [k, v] of Object.entries(savedEnv)) {
			if (v === undefined) delete process.env[k];
			else process.env[k] = v;
		}
	});

	it('treats APICODEGEN_VERBOSE="false" as boolean false', async () => {
		process.env.APICODEGEN_SPEC = '/spec.json';
		process.env.APICODEGEN_VERBOSE = 'false';
		const cfg = await loadConfig({ cliOptions: { output: '/o.ts' } });
		expect(cfg.verbose).toBe(false);
	});

	it('treats APICODEGEN_VERBOSE="0" as boolean false', async () => {
		process.env.APICODEGEN_SPEC = '/spec.json';
		process.env.APICODEGEN_VERBOSE = '0';
		const cfg = await loadConfig({ cliOptions: { output: '/o.ts' } });
		expect(cfg.verbose).toBe(false);
	});

	it('treats APICODEGEN_VERBOSE="true" as boolean true', async () => {
		process.env.APICODEGEN_SPEC = '/spec.json';
		process.env.APICODEGEN_VERBOSE = 'true';
		const cfg = await loadConfig({ cliOptions: { output: '/o.ts' } });
		expect(cfg.verbose).toBe(true);
	});

	it('treats APICODEGEN_VERBOSE="yes" as boolean true (after fix: accepts common truthy values)', async () => {
		// After fix: 'yes', 'on', 'enable' also count as truthy alongside 'true'/'1'.
		process.env.APICODEGEN_SPEC = '/spec.json';
		process.env.APICODEGEN_VERBOSE = 'yes';
		const cfg = await loadConfig({ cliOptions: { output: '/o.ts' } });
		expect(cfg.verbose).toBe(true);
	});

	it('ignores invalid APICODEGEN_ADAPTOR (after fix: validates against known set)', async () => {
		// After fix: an invalid adaptor value is dropped (treated as unset).
		process.env.APICODEGEN_SPEC = '/spec.json';
		process.env.APICODEGEN_ADAPTOR = 'fetchh';
		const cfg = await loadConfig({ cliOptions: { output: '/o.ts' } });
		expect(cfg.adaptor).toBeUndefined();
	});
});

// ===== loadConfig: loadFromFile with .ts =====
describe('loadConfig .ts config file edge cases', () => {
	let tmpDir: string;

	beforeEach(async () => {
		tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'apicodegen-cfg-'));
	});

	afterEach(async () => {
		await fs.remove(tmpDir);
	});

	it('parses a .ts file containing a JSON object (no export default)', async () => {
		// loadFromFile tries JSON.parse first; a bare JSON object succeeds.
		const file = path.join(tmpDir, 'apicodegen.config.ts');
		await fs.writeFile(file, '{ "spec": "/from-ts.json", "output": "/o.ts" }');
		const cfg = await loadConfig({ configFile: file });
		expect(cfg.spec).toBe('/from-ts.json');
		expect(cfg.output).toBe('/o.ts');
	});

	it('parses a .ts file containing "export default { ... }" via regex extraction', async () => {
		const file = path.join(tmpDir, 'apicodegen.config.ts');
		// NOTE: regex fallback only works when the object literal uses JSON syntax
		// (quoted keys, double-quoted strings). Unquoted TS keys break JSON.parse.
		await fs.writeFile(
			file,
			`export default {\n  "spec": "/from-export.ts",\n  "output": "/o.ts"\n};`
		);
		const cfg = await loadConfig({ configFile: file });
		expect(cfg.spec).toBe('/from-export.ts');
		expect(cfg.output).toBe('/o.ts');
	});

	it('throws with descriptive error when .ts file is neither JSON nor export default', async () => {
		const file = path.join(tmpDir, 'apicodegen.config.ts');
		await fs.writeFile(
			file,
			`import x from 'y';\nexport default x();` // contains default but not the regex shape
		);
		await expect(loadConfig({ configFile: file })).rejects.toThrow(
			/Failed to load config/
		);
	});

	it('throws when .ts file has export default but inner object uses unquoted TS keys', async () => {
		// Locks a known limitation: the regex fallback re-parses with JSON.parse,
		// which rejects unquoted keys. To load real .ts configs the user should
		// use .mjs (ESM dynamic import) instead.
		const file = path.join(tmpDir, 'apicodegen.config.ts');
		await fs.writeFile(
			file,
			`export default {\n  spec: '/from-export.ts',\n  output: '/o.ts'\n};`
		);
		await expect(loadConfig({ configFile: file })).rejects.toThrow(
			/Failed to load config/
		);
	});

	it('throws with descriptive error when JSON file is malformed', async () => {
		const file = path.join(tmpDir, 'apicodegen.config.json');
		await fs.writeFile(file, '{ spec: "/x" }'); // unquoted key → JSON.parse fails
		await expect(loadConfig({ configFile: file })).rejects.toThrow(
			/Failed to load config/
		);
	});

	it('loads a .mjs config file via dynamic import (default export)', async () => {
		const file = path.join(tmpDir, 'apicodegen.config.mjs');
		await fs.writeFile(
			file,
			`export default { spec: '/from-mjs.json', output: '/o.ts' };`
		);
		const cfg = await loadConfig({ configFile: file });
		expect(cfg.spec).toBe('/from-mjs.json');
	});
});

// ===== loadConfig: package.json apicodegen coexistence =====
describe('loadConfig package.json apicodegen coexistence', () => {
	let tmpDir: string;

	beforeEach(async () => {
		tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'apicodegen-cfg-'));
	});

	afterEach(async () => {
		await fs.remove(tmpDir);
	});

	it('treats string apicodegen as a path to a separate config file', async () => {
		const externalCfg = path.join(tmpDir, 'external.json');
		await fs.writeFile(externalCfg, '{"spec": "/external.json", "output": "/o.ts"}');
		const pkgPath = path.join(tmpDir, 'package.json');
		await fs.writeFile(
			pkgPath,
			JSON.stringify({ name: 'p', apicodegen: 'external.json' })
		);
		const cfg = await loadConfig({ cwd: tmpDir });
		expect(cfg.spec).toBe('/external.json');
	});

	it('treats object apicodegen as inline config', async () => {
		const pkgPath = path.join(tmpDir, 'package.json');
		await fs.writeFile(
			pkgPath,
			JSON.stringify({
				name: 'p',
				apicodegen: { spec: '/inline.json', output: '/o.ts' },
			})
		);
		const cfg = await loadConfig({ cwd: tmpDir });
		expect(cfg.spec).toBe('/inline.json');
	});

	it('ignores malformed package.json apicodegen field silently', async () => {
		const pkgPath = path.join(tmpDir, 'package.json');
		await fs.writeFile(
			pkgPath,
			JSON.stringify({ name: 'p', apicodegen: 42 }) // number — neither string nor object
		);
		// 42 falls into neither inline-config nor findConfigFile path.
		// Result: loadConfig relies on env / CLI for spec.
		await expect(
			loadConfig({
				cwd: tmpDir,
				cliOptions: { spec: '/cli.json', output: '/o.ts' },
			})
		).resolves.toMatchObject({ spec: '/cli.json' });
	});
});

// ===== mergeConfigs edges =====
describe('mergeConfigs additional edge cases', () => {
	it('does not deep-merge nested objects (shallow override)', () => {
		// BUG: nested object keys are fully replaced, not deep-merged.
		// requestOptions.credentials would be lost if a later source
		// overrides only headers.
		const base = {
			spec: '/s',
			output: '/o',
			requestOptions: { headers: { a: '1' }, credentials: 'include' as const },
		};
		const override = {
			requestOptions: { headers: { b: '2' } },
		};
		const merged = mergeConfigs(base, override);
		expect((merged.requestOptions as { credentials?: string }).credentials).toBeUndefined();
	});

	it('treats null the same as undefined (does not override with null) — after fix', () => {
		// After fix: explicit null is treated like undefined, no override.
		const base = { spec: '/s', output: '/o', baseURL: '/api' };
		const override = { baseURL: null as unknown as string };
		const merged = mergeConfigs(base, override);
		expect(merged.baseURL).toBe('/api');
	});
});

// ===== validateConfig =====
describe('validateConfig additional edge cases', () => {
	it('throws when spec is undefined (not just empty)', () => {
		expect(() => validateConfig({ output: '/o' })).toThrow(/spec/);
	});

	it('passes type guard and returns true when spec is a URL string', () => {
		const guard = validateConfig({ spec: 'https://api.example.com/spec.json', output: '/o' });
		expect(guard).toBe(true);
	});
});

// ===== OpenAPIProvider.parse — full-doc edge integration =====
describe('OpenAPIProvider.parse integration edge cases', () => {
	it('handles spec with deprecated operation', () => {
		const provider = makeProvider();
		const doc = makeV3Doc({
			paths: {
				'/pets': {
					get: {
						summary: 'old endpoint',
						deprecated: true,
						responses: { '200': { description: 'ok' } },
					},
				},
			},
		});
		const result = provider.parse(doc as never);
		expect(result.apis['/pets']).toHaveLength(1);
	});

	it('handles spec with no responses on an operation', () => {
		// BUG: response handling may rely on responses[0] being defined —
		// if missing, downstream generator might throw.
		const provider = makeProvider();
		const doc = makeV3Doc({
			paths: {
				'/pets': {
					get: {
						responses: {}, // empty object — no default response either
					},
				},
			},
		});
		// Locks current behavior: parse does NOT throw on empty responses.
		expect(() => provider.parse(doc as never)).not.toThrow();
	});

	it('handles $ref pointing to itself (self-cycle)', () => {
		// BUG (potential): if the recursive $ref resolver doesn't track visited,
		// a self-cycle could infinite-loop or stack-overflow. Locks current.
		const provider = makeProvider();
		const doc = makeV3Doc({
			components: {
				schemas: {
					Node: { type: 'object', properties: { child: { $ref: '#/components/schemas/Node' } } },
				},
			},
		});
		expect(() => provider.parse(doc as never)).not.toThrow();
	});

	it('handles $ref pointing to a non-existent target', () => {
		const provider = makeProvider();
		const doc = makeV3Doc({
			paths: {
				'/pets': {
					get: {
						responses: {
							'200': {
								description: 'ok',
								content: {
									'application/json': {
										schema: { $ref: '#/components/schemas/MissingPet' },
									},
								},
							},
						},
					},
				},
			},
		});
		expect(() => provider.parse(doc as never)).not.toThrow();
	});

	it('handles a requestBody with an unknown mediaType (not in MediaTypes enum)', () => {
		const provider = makeProvider();
		const doc = makeV3Doc({
			paths: {
				'/pets': {
					post: {
						requestBody: {
							content: {
								'application/vnd.custom+xml': { schema: { type: 'string' } },
							},
						},
						responses: { '200': { description: 'ok' } },
					},
				},
			},
		});
		expect(() => provider.parse(doc as never)).not.toThrow();
	});

	it('handles two operations with the same path but different methods', () => {
		const provider = makeProvider();
		const doc = makeV3Doc({
			paths: {
				'/pets': {
					get: { responses: { '200': { description: 'ok' } } },
					post: { responses: { '200': { description: 'ok' } } },
				},
			},
		});
		const result = provider.parse(doc as never);
		expect(result.apis['/pets']).toHaveLength(2);
	});
});