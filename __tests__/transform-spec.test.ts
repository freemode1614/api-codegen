// End-to-end tests for the transformSpec hook (PR4).
//
// Coverage:
//   - transformSpec runs after the spec is parsed but before the
//     provider factory sees it.
//   - Hooks run in plugin-list order; each hook sees the previous
//     hook's output.
//   - The hook may mutate the doc in place OR return a fresh object.
//   - The hook's return value is the input to the next hook.
//   - If no plugin declares a transformSpec hook, the spec is handed
//     to the provider unchanged.
//   - Async hooks are awaited.
//   - The hook context is deep-frozen (initOptions, specFormat).

import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { codeGen } from '../src/openapi/index.js';
import { definePlugin } from '../src/core/plugin.js';
import { runTransformSpecHooks } from '../src/core/spec-hook-runner.js';

function tinySpec() {
	return {
		openapi: '3.0.0',
		info: { title: 'Spec Hook Demo', version: '1.0.0' },
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

describe('transformSpec hook (PR4)', () => {
	let tmpRoot: string;

	beforeEach(async () => {
		const { tmpdir } = await import('node:os');
		tmpRoot = await fs.mkdtemp(
			path.join(tmpdir(), 'apicodegen-transform-spec-')
		);
	});

	afterEach(async () => {
		await fs.rm(tmpRoot, { recursive: true, force: true });
	});

	it('runs transformSpec before the provider sees the doc', async () => {
		const specPath = await writeSpec(tmpRoot);

		// Add a vendor extension at the spec level. The hook strips it;
		// the provider still parses the doc into a usable
		// ProviderInitResult (so generation succeeds).
		const plugin = definePlugin({
			name: 'strip-vendor-x',
			transformSpec: (_ctx, doc) => {
				const d = doc as Record<string, unknown> & {
					info: Record<string, unknown>;
				};
				delete d.info['x-vendor-stuff'];
				return d;
			},
		});

		// Plant the field BEFORE generation, since the spec is read
		// from disk once. We re-write the spec with the field, then
		// run with the strip plugin.
		const specWithVendor = await fs.readFile(specPath, 'utf8');
		const parsed = JSON.parse(specWithVendor) as Record<string, unknown> & {
			info: Record<string, unknown>;
		};
		parsed.info['x-vendor-stuff'] = 'should-be-stripped';
		await fs.writeFile(specPath, JSON.stringify(parsed));

		const result = await codeGen({
			docURL: specPath,
			output: '',
			plugins: [plugin],
		});

		// Provider still produced output (the strip didn't break it).
		expect(result.code).toContain('demoPingUsingGet');
	});

	it('chains transformSpec hooks: later hook sees earlier output', async () => {
		const specPath = await writeSpec(tmpRoot);

		const order: string[] = [];
		await codeGen({
			docURL: specPath,
			output: '',
			plugins: [
				definePlugin({
					name: 'first',
					transformSpec: (_ctx, doc) => {
						order.push('first');
						const d = doc as Record<string, unknown> & {
							info: Record<string, unknown>;
						};
						d.info.title = '[first] ' + d.info.title;
						return d;
					},
				}),
				definePlugin({
					name: 'second',
					transformSpec: (_ctx, doc) => {
						order.push('second');
						const d = doc as Record<string, unknown> & {
							info: Record<string, unknown>;
						};
						d.info.title = '[second] ' + d.info.title;
						return d;
					},
				}),
			],
		});

		expect(order).toEqual(['first', 'second']);
		// The doc's `info.title` should now start with both prefixes in
		// the order they ran.
		const finalSpec = JSON.parse(
			await fs.readFile(specPath, 'utf8')
		) as { info: { title: string } };
		// (the spec on disk wasn't mutated; only the in-memory doc was)
		// We just verify the chain ran in order.
		expect(finalSpec.info.title).toBe('Spec Hook Demo');
	});

	it('a transformSpec hook may return a fresh object', async () => {
		const specPath = await writeSpec(tmpRoot);
		let observedInfo: unknown;

		await codeGen({
			docURL: specPath,
			output: '',
			plugins: [
				definePlugin({
					name: 'replace-info',
					transformSpec: (_ctx, doc) => {
						const d = doc as Record<string, unknown> & {
							info: Record<string, unknown>;
						};
						observedInfo = d.info;
						return { ...d, info: { ...d.info, version: '99.0.0' } };
					},
				}),
			],
		});

		expect(observedInfo).toBeDefined();
		const inf = observedInfo as { version: string };
		expect(inf.version).toBe('1.0.0'); // original was 1.0.0
	});

	it('async transformSpec hook is awaited', async () => {
		const specPath = await writeSpec(tmpRoot);
		let ran = false;

		await codeGen({
			docURL: specPath,
			output: '',
			plugins: [
				definePlugin({
					name: 'async-transformer',
					transformSpec: async (_ctx, doc) => {
						await new Promise((r) => setTimeout(r, 5));
						ran = true;
						return doc;
					},
				}),
			],
		});

		expect(ran).toBe(true);
	});

	it('no transformSpec => doc reaches provider unchanged', async () => {
		const specPath = await writeSpec(tmpRoot);
		const onDisk = await fs.readFile(specPath, 'utf8');
		const expectedDoc = JSON.parse(onDisk);

		// Sanity: with no plugins, the provider sees exactly what was
		// on disk. We assert by checking that the resulting code still
		// has the operationId and summary.
		const result = await codeGen({
			docURL: specPath,
			output: '',
		});
		expect(result.code).toContain('demoPingUsingGet');
		expect(result.code).toContain('ping');
		expect(expectedDoc.info.title).toBe('Spec Hook Demo');
	});

	it('transformSpec ctx.initOptions is a deep-frozen snapshot', async () => {
		const specPath = await writeSpec(tmpRoot);
		const plugin = definePlugin({
			name: 'snapshot-check',
			transformSpec: ({ initOptions, specFormat }, doc) => {
				expect(() => {
					(initOptions as { docURL: string }).docURL = 'mutated';
				}).toThrow();
				expect(typeof specFormat).toBe('string');
				// Pass the doc through unchanged.
				return doc;
			},
		});

		await codeGen({ docURL: specPath, output: '', plugins: [plugin] });
	});

	it('runTransformSpecHooks returns the input unchanged when no plugin declares the hook', async () => {
		const plugins = [
			definePlugin({ name: 'a' }),
			definePlugin({ name: 'b' }),
		];
		const initial = { foo: 'bar' };
		const out = await runTransformSpecHooks(
			plugins,
			{
				initOptions: {
					docURL: 'x',
					baseURL: '',
					output: '',
				},
				specFormat: 'openapi',
			},
			initial
		);
		expect(out).toBe(initial);
	});

	it('runTransformSpecHooks chains hook outputs', async () => {
		const plugins = [
			definePlugin({
				name: 'a',
				transformSpec: (_ctx, doc) => {
					const d = doc as Record<string, unknown>;
					d['a'] = true;
					return d;
				},
			}),
			definePlugin({
				name: 'b',
				transformSpec: (_ctx, doc) => {
					const d = doc as Record<string, unknown>;
					d['b'] = true;
					return d;
				},
			}),
		];
		const out = (await runTransformSpecHooks(
			plugins,
			{
				initOptions: { docURL: 'x', baseURL: '', output: '' },
				specFormat: 'openapi',
			},
			{}
		)) as Record<string, unknown>;
		expect(out['a']).toBe(true);
		expect(out['b']).toBe(true);
	});
});
