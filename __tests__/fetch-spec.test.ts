// End-to-end tests for the fetchSpec hook (PR5).
//
// Coverage:
//   - fetchSpec replaces the spec loader entirely (HTTP or file).
//   - Plugin can return a raw body string (framework parses).
//   - Plugin can return a pre-parsed doc (framework passes through).
//   - First non-void fetchSpec wins; later ones are skipped.
//   - Returning void opts out; framework falls through to built-in.
//   - Async hooks are awaited.
//   - ctx.transport and ctx.source are populated correctly.
//   - The ctx is deep-frozen.

import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { codeGen } from '../src/openapi/index.js';
import { definePlugin } from '../src/core/plugin.js';
import { resolveFetchSpecHook } from '../src/core/fetch-hook-runner.js';

function tinySpec() {
	return {
		openapi: '3.0.0',
		info: { title: 'Fetch Hook Demo', version: '1.0.0' },
		paths: {
			'/demo/ping': {
				get: {
					operationId: 'demoPing',
					summary: 'ping',
					responses: {
						'200': {
							content: {
								'application/json': { schema: { type: 'string' } },
							},
						},
					},
				},
			},
		},
	};
}

async function writeSpec(dir: string, name = 'spec.json'): Promise<string> {
	const p = path.join(dir, name);
	await fs.writeFile(p, JSON.stringify(tinySpec()));
	return p;
}

describe('fetchSpec hook (PR5)', () => {
	let tmpRoot: string;

	beforeEach(async () => {
		const { tmpdir } = await import('node:os');
		tmpRoot = await fs.mkdtemp(
			path.join(tmpdir(), 'apicodegen-fetch-spec-')
		);
	});

	afterEach(async () => {
		await fs.rm(tmpRoot, { recursive: true, force: true });
	});

	it('fetchSpec returning a raw body string replaces the file loader', async () => {
		const specPath = await writeSpec(tmpRoot);
		const plugin = definePlugin({
			name: 'inline-body',
			fetchSpec: ({ source }) => {
				expect(source).toBe(specPath);
				// Return a transformed body (not the one on disk) — proves
				// the plugin's value reaches the provider, not the file.
				return {
					body: JSON.stringify({
						openapi: '3.0.0',
						info: { title: 'Inline Override', version: '9.9.9' },
						paths: {
							'/injected/from-hook': {
								get: {
									operationId: 'injectedFromHook',
									summary: 'injected by fetchSpec',
									responses: {
										'200': {
											content: {
												'application/json': { schema: { type: 'string' } },
											},
										},
									},
								},
							},
						},
					}),
				};
			},
		});

		const result = await codeGen({
			docURL: specPath,
			output: '',
			plugins: [plugin],
		});
		expect(result.code).toContain('injectedFromHookUsingGet');
		// Sanity: the file on disk was NOT used.
		expect(result.code).not.toContain('demoPing');
	});

	it('fetchSpec returning a pre-parsed doc skips JSON.parse', async () => {
		const specPath = await writeSpec(tmpRoot);
		const plugin = definePlugin({
			name: 'pre-parsed',
			fetchSpec: () => ({
				doc: {
					openapi: '3.0.0',
					info: { title: 'Pre-parsed', version: '1.0.0' },
					paths: {
						'/pre/parsed': {
							get: {
								operationId: 'preParsed',
								summary: 'pre-parsed',
								responses: {
									'200': {
										content: {
											'application/json': { schema: { type: 'string' } },
										},
									},
								},
							},
						},
					},
				},
			}),
		});

		const result = await codeGen({
			docURL: specPath,
			output: '',
			plugins: [plugin],
		});
		expect(result.code).toContain('preParsedUsingGet');
	});

	it('first non-void fetchSpec wins; later ones are skipped', async () => {
		const specPath = await writeSpec(tmpRoot);
		const called: string[] = [];

		await codeGen({
			docURL: specPath,
			output: '',
			plugins: [
				definePlugin({
					name: 'first',
					fetchSpec: () => {
						called.push('first');
						return {
							doc: {
								openapi: '3.0.0',
								info: { title: 'First', version: '1.0.0' },
								paths: {
									'/first': {
										get: {
											operationId: 'firstOp',
											summary: 'first',
											responses: {
												'200': {
													content: {
														'application/json': { schema: { type: 'string' } },
													},
												},
											},
										},
									},
								},
							},
						};
					},
				}),
				definePlugin({
					name: 'second',
					fetchSpec: () => {
						called.push('second'); // should NOT be called
						return undefined;
					},
				}),
			],
		});

		expect(called).toEqual(['first']);
	});

	it('void fetchSpec opts out; next hook or built-in loader handles the request', async () => {
		const specPath = await writeSpec(tmpRoot);
		let secondCalled = false;

		await codeGen({
			docURL: specPath,
			output: '',
			plugins: [
				definePlugin({
					name: 'opt-out',
					fetchSpec: () => {
						// opt out
					},
				}),
				definePlugin({
					name: 'fallback',
					fetchSpec: () => {
						secondCalled = true;
						return { doc: tinySpec() };
					},
				}),
			],
		});

		expect(secondCalled).toBe(true);
	});

	it('no fetchSpec => built-in file loader is used', async () => {
		const specPath = await writeSpec(tmpRoot);
		const result = await codeGen({ docURL: specPath, output: '' });
		expect(result.code).toContain('demoPingUsingGet');
	});

	it('all fetchSpec opts out (return void) => built-in loader is used', async () => {
		const specPath = await writeSpec(tmpRoot);
		const result = await codeGen({
			docURL: specPath,
			output: '',
			plugins: [
				definePlugin({
					name: 'opt-out-1',
					fetchSpec: () => undefined,
				}),
				definePlugin({
					name: 'opt-out-2',
					fetchSpec: async () => undefined,
				}),
			],
		});
		expect(result.code).toContain('demoPingUsingGet');
	});

	it('async fetchSpec is awaited', async () => {
		const specPath = await writeSpec(tmpRoot);
		let ran = false;

		await codeGen({
			docURL: specPath,
			output: '',
			plugins: [
				definePlugin({
					name: 'async',
					async fetchSpec() {
						await new Promise((r) => setTimeout(r, 5));
						ran = true;
						return { doc: tinySpec() };
					},
				}),
			],
		});
		expect(ran).toBe(true);
	});

	it('ctx.transport and ctx.source reflect Base.resolveSpecURL', async () => {
		const specPath = await writeSpec(tmpRoot);
		let observedTransport: string | undefined;
		let observedSource: string | undefined;

		await codeGen({
			docURL: specPath,
			output: '',
			plugins: [
				definePlugin({
					name: 'observer',
					fetchSpec: ({ transport, source }) => {
						observedTransport = transport;
						observedSource = source;
						return { doc: tinySpec() };
					},
				}),
			],
		});

		expect(observedTransport).toBe('file');
		expect(observedSource).toBe(specPath);
	});

	it('fetchSpec ctx is deep-frozen', async () => {
		const specPath = await writeSpec(tmpRoot);
		await codeGen({
			docURL: specPath,
			output: '',
			plugins: [
				definePlugin({
					name: 'snapshot-check',
					fetchSpec: ({ initOptions, requestOptions }) => {
						expect(() => {
							(initOptions as { docURL: string }).docURL = 'mutated';
						}).toThrow();
						expect(() => {
							(requestOptions as { method: string }).method = 'POST';
						}).toThrow();
						return { doc: tinySpec() };
					},
				}),
			],
		});
	});

	it('resolveFetchSpecHook returns undefined when no plugin declares the hook', async () => {
		const plugins = [definePlugin({ name: 'a' }), definePlugin({ name: 'b' })];
		const out = await resolveFetchSpecHook(plugins, {
			initOptions: { docURL: 'x', baseURL: '', output: '' },
			requestOptions: {},
			transport: 'file',
			source: '/tmp/x.json',
		});
		expect(out).toBeUndefined();
	});

	it('resolveFetchSpecHook returns the first non-void result', async () => {
		const plugins = [
			definePlugin({
				name: 'a',
				fetchSpec: () => undefined,
			}),
			definePlugin({
				name: 'b',
				fetchSpec: () => ({ body: '{}' }),
			}),
			definePlugin({
				name: 'c',
				fetchSpec: () => ({ body: '{"would-be-ignored":true}' }),
			}),
		];
		const out = await resolveFetchSpecHook(plugins, {
			initOptions: { docURL: 'x', baseURL: '', output: '' },
			requestOptions: {},
			transport: 'file',
			source: '/tmp/x.json',
		});
		expect(out).toEqual({ body: '{}' });
	});
});
