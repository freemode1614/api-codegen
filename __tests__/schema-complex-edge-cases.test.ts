import { describe, it, expect, vi, beforeEach } from 'vitest';
import { request } from 'undici';
import type { OpenAPIV3 } from 'openapi-types';
import { codeGen } from '../src/openapi/index.js';
import { Adaptors } from '../src/core/interface.js';

/**
 * Step 5b — Schema complex-structure output edge cases.
 * Covers allOf / oneOf / anyOf / nullable / readOnly / writeOnly / nested arrays.
 */

vi.mock('undici', async () => {
	const actual = await vi.importActual<typeof import('undici')>('undici');
	return {
		...actual,
		request: vi.fn(),
	};
});

const mockedRequest = vi.mocked(request);

const makeSpec = (overrides: Partial<OpenAPIV3.Document> = {}): OpenAPIV3.Document =>
	({
		openapi: '3.0.0',
		info: { title: 't', version: '1.0' },
		paths: {},
		...overrides,
	}) as OpenAPIV3.Document;

const generate = async (spec: OpenAPIV3.Document): Promise<string> => {
	mockedRequest.mockReset();
	mockedRequest.mockResolvedValue({
		statusCode: 200,
		body: { json: vi.fn().mockResolvedValue(spec) },
	} as never);

	const result = await codeGen({
		spec: 'x',
		output: '',
		docURL: 'https://example.com/spec.json',
		adaptor: Adaptors.fetch,
	});

	return result.code;
};

beforeEach(() => {
	mockedRequest.mockReset();
});

describe('Schema complex structure output', () => {
	it('emits type with array of primitive', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						StringList: { type: 'array', items: { type: 'string' } },
					},
				},
			})
		);
		expect(code).toMatch(/type\s+StringList\s*=\s*string\[\]/);
	});

	it('emits type with array of object (using inline object or ref)', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						PetList: { type: 'array', items: { type: 'object', properties: { id: { type: 'integer' } } } },
					},
				},
			})
		);
		expect(code).toMatch(/type\s+PetList\s*=/);
		expect(code).toContain('id');
	});

	it('handles allOf by emitting intersected type (or merged object)', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Base: { type: 'object', properties: { id: { type: 'string' } } },
						Extended: {
							allOf: [
								{ $ref: '#/components/schemas/Base' },
								{ type: 'object', properties: { name: { type: 'string' } } },
							],
						},
					},
				},
			})
		);
		// Should at least emit an Extended type without throwing.
		expect(code).toMatch(/type\s+Extended\s*=/);
	});

	it('handles oneOf without throwing', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Either: {
							oneOf: [
								{ type: 'object', properties: { a: { type: 'string' } } },
								{ type: 'object', properties: { b: { type: 'integer' } } },
							],
						},
					},
				},
			})
		);
		expect(code).toMatch(/type\s+Either\s*=/);
	});

	it('handles anyOf without throwing', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Any: {
							anyOf: [
								{ type: 'string' },
								{ type: 'number' },
							],
						},
					},
				},
			})
		);
		expect(code).toMatch(/type\s+Any\s*=/);
	});

	it('handles nested arrays (array of array of string)', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Nested: { type: 'array', items: { type: 'array', items: { type: 'string' } } },
					},
				},
			})
		);
		expect(code).toMatch(/type\s+Nested\s*=/);
	});

	it('handles nested $ref three levels deep', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Level1: { type: 'object', properties: { l2: { $ref: '#/components/schemas/Level2' } } },
						Level2: { type: 'object', properties: { l3: { $ref: '#/components/schemas/Level3' } } },
						Level3: { type: 'object', properties: { name: { type: 'string' } } },
					},
				},
			})
		);
		expect(code).toMatch(/type\s+Level1\s*=/);
		expect(code).toMatch(/type\s+Level3\s*=/);
	});

	it('handles enum with numeric values', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Priority: { type: 'integer', enum: [1, 2, 3] },
					},
				},
			})
		);
		expect(code).toMatch(/enum\s+Priority/);
		expect(code).toMatch(/1/);
		expect(code).toMatch(/3/);
	});

	it('handles enum with mixed string and number', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Mixed: { enum: ['a', 1, true] },
					},
				},
			})
		);
		// Lock current behavior: should not throw, even if output is awkward.
		expect(code).toBeDefined();
		expect(code.length).toBeGreaterThan(0);
	});

	it('handles readOnly property without crashing', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Pet: {
							type: 'object',
							properties: {
								id: { type: 'string', readOnly: true },
								name: { type: 'string' },
							},
						},
					},
				},
			})
		);
		expect(code).toMatch(/type\s+Pet\s*=/);
	});

	it('handles writeOnly property without crashing', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Credentials: {
							type: 'object',
							properties: { password: { type: 'string', writeOnly: true } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/type\s+Credentials\s*=/);
	});
});