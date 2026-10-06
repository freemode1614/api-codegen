// End-to-end + unit tests for the provider registry (PR2).
import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { definePlugin } from '../src/core/plugin.js';
import {
	clearUserProviders,
	hasProvider,
	listProviders,
	registerProvider,
	resolveProvider,
	seedBuiltInProviders,
} from '../src/core/provider-registry.js';
import { codeGen } from '../src/openapi/index.js';

describe('provider registry', () => {
	beforeEach(() => {
		clearUserProviders();
		seedBuiltInProviders();
	});

	it('seeds the built-in openapi provider', () => {
		expect(hasProvider('openapi')).toBe(true);
	});

	it('refuses to override a built-in name', () => {
		expect(() =>
			registerProvider({
				name: 'openapi',
				factory: () => ({
					enums: [],
					schemas: {},
					parameters: {},
					responses: {},
					requestBodies: {},
					apis: {},
				}),
			})
		).toThrow(/built-in/);
	});

	it('refuses duplicate registration', () => {
		registerProvider({
			name: 'asyncapi',
			factory: () => ({
				enums: [],
				schemas: {},
				parameters: {},
				responses: {},
				requestBodies: {},
				apis: {},
			}),
		});
		expect(() =>
			registerProvider({
				name: 'asyncapi',
				factory: () => ({
					enums: [],
					schemas: {},
					parameters: {},
					responses: {},
					requestBodies: {},
					apis: {},
				}),
			})
		).toThrow(/already registered/);
	});

	it('returns the registered spec via resolveProvider', () => {
		const spec = {
			name: 'asyncapi',
			versions: ['2.6'],
			factory: () => ({
				enums: [],
				schemas: {},
				parameters: {},
				responses: {},
				requestBodies: {},
				apis: {},
			}),
		};
		registerProvider(spec);
		expect(resolveProvider('asyncapi')).toBe(spec);
	});

	it('lists built-ins and user plugins', () => {
		registerProvider({
			name: 'asyncapi',
			factory: () => ({
				enums: [],
				schemas: {},
				parameters: {},
				responses: {},
				requestBodies: {},
				apis: {},
			}),
		});
		const names = listProviders();
		expect(names).toContain('openapi');
		expect(names).toContain('asyncapi');
	});
});

describe('specFormat routing in codeGen()', () => {
	const tmpRoot = path.join(
		process.cwd(),
		`__tests__/__tmp_provider_plugin_${process.pid}`
	);

	beforeEach(async () => {
		await fs.mkdir(tmpRoot, { recursive: true });
	});

	afterEach(async () => {
		await fs.rm(tmpRoot, { recursive: true, force: true });
	});

	it('routes a custom provider when specFormat is set', async () => {
		// A trivial provider that returns a single endpoint: GET /custom
		const customProvider = definePlugin({
			name: 'custom-provider',
			version: '0.1.0',
			provider: {
				name: 'custom',
				versions: ['1.0'],
				factory: (_init, _doc) => ({
					enums: [],
					schemas: {},
					parameters: {},
					responses: {},
					requestBodies: {},
					apis: {
						'/custom': [
							{
								method: 'get',
								operationId: 'customGet',
								summary: 'custom endpoint',
								responses: [],
							},
						],
					},
				}),
			},
		});

		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(specPath, '{"any-shape": true}');

		const outputPath = path.join(tmpRoot, 'api.ts');
		const result = await codeGen({
			docURL: specPath,
			output: outputPath,
			specFormat: 'custom',
			plugins: [customProvider],
		});

		expect(result.stats.endpoints).toBe(1);
		const written = await fs.readFile(outputPath, 'utf8');
		expect(written).toContain('export async function customGet');
	});

	it('throws a helpful error for an unknown specFormat (no plugin)', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(specPath, '{"openapi": "3.0.0"}');

		await expect(
			codeGen({
				docURL: specPath,
				output: '',
				specFormat: 'never-registered',
			})
		).rejects.toThrow(/Unknown spec format "never-registered"/);
	});

	it('default specFormat still routes to openapi', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(
			specPath,
			JSON.stringify({
				openapi: '3.0.0',
				info: { title: 'Default', version: '1' },
				paths: {
					'/default': {
						get: {
							operationId: 'defaultOp',
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
			})
		);

		const result = await codeGen({
			docURL: specPath,
			output: '',
		});

		expect(result.code).toContain('export async function defaultOp');
	});
});
