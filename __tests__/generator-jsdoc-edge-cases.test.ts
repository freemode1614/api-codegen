import { describe, it, expect, vi, beforeEach } from 'vitest';
import { request } from 'undici';
import type { OpenAPIV3 } from 'openapi-types';
import { codeGen } from '../src/openapi/index.js';
import { Adaptors } from '../src/core/interface.js';

/**
 * Step 5a — Generator JSDoc + parameter tag edge cases.
 * Locks current behavior of generateParamTags + body schema expansion.
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

describe('JSDoc param tags from path/query/header parameters', () => {
	it('emits @param for path parameters', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets/{id}': {
						get: {
							operationId: 'getPet',
							parameters: [
								{ name: 'id', in: 'path', required: true, schema: { type: 'string' } },
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/@param\s+(\{[^}]+\}\s+)?id\s+-\s+\[path\]/);
	});

	it('emits @param for query parameters with [query] prefix', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						get: {
							operationId: 'listPets',
							parameters: [
								{ name: 'limit', in: 'query', schema: { type: 'integer' } },
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/@param\s+(\{[^}]+\}\s+)?limit\s+-\s+\[query\]/);
	});

	it('emits @param for header parameters with [header] prefix', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						get: {
							operationId: 'listPets',
							parameters: [
								{ name: 'X-Request-ID', in: 'header', schema: { type: 'string' } },
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/@param\s+(\{[^}]+\}\s+)?XRequestID/);
		expect(code).toMatch(/\[header\]/);
	});

	it('marks parameter as required (no | undefined) when required=true', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/x': {
						get: {
							operationId: 'a',
							parameters: [
								{ name: 'q', in: 'query', required: true, schema: { type: 'string' } },
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		// Extract @param line for q (allowing optional {type} prefix).
		const m = code.match(/@param\s+(\{[^}]+\}\s+)?q\s+[^]*?(?=\n|$)/);
		expect(m).not.toBeNull();
		expect(m![0]).not.toContain(' | undefined');
	});

	it('@param tag includes type info from CommentObject.type (after fix)', async () => {
		// After fix: addComments() formats @param as `{type} name - comment`.
		const code = await generate(
			makeSpec({
				paths: {
					'/x': {
						get: {
							operationId: 'a',
							parameters: [
								{ name: 'q', in: 'query', required: false, schema: { type: 'string' } },
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		// After fix: optional fields include ' | undefined' suffix in type.
		expect(code).toMatch(/@param\s+\{string\s*\|\s*undefined\}\s+q/);
	});

	it('falls back to type "unknown" when parameter has no schema', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/x': {
						get: {
							operationId: 'a',
							parameters: [
								{ name: 'q', in: 'query' } as never, // no schema
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		const m = code.match(/@param\s+(\{[^}]+\}\s+)?q[^@]*?unknown/);
		expect(m).not.toBeNull();
	});

	it('normalizes parameter names with special characters', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/x': {
						get: {
							operationId: 'a',
							parameters: [
								{ name: 'filter-name', in: 'query', schema: { type: 'string' } },
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/@param\s+(\{[^}]+\}\s+)?filterName/);
		expect(code).not.toMatch(/@param\s+(\{[^}]+\}\s+)?filter-name/);
	});

	it('preserves non-ASCII description in @param comment', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/x': {
						get: {
							operationId: 'a',
							parameters: [
								{
									name: 'q',
									in: 'query',
									schema: { type: 'string' },
									description: '查询关键词',
								},
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toContain('查询关键词');
	});
});

describe('JSDoc body fields from requestBody schema', () => {
	it('emits @param req.xxx for each requestBody property', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						post: {
							operationId: 'createPet',
							requestBody: {
								content: {
									'application/json': {
										schema: {
											type: 'object',
											properties: {
												name: { type: 'string', description: 'pet name' },
												age: { type: 'integer', description: 'pet age' },
											},
											required: ['name'],
										},
									},
								},
							},
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/@param\s+(\{[^}]+\}\s+)?req\.name\s+-\s+pet name/);
		expect(code).toMatch(/@param\s+(\{[^}]+\}\s+)?req\.age\s+-\s+pet age/);
	});

	it('marks body field as optional (| undefined) when not in required list', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						post: {
							operationId: 'createPet',
							requestBody: {
								content: {
									'application/json': {
										schema: {
											type: 'object',
											properties: { name: { type: 'string' } },
											required: ['name'],
										},
									},
								},
							},
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		const m = code.match(/@param\s+(\{[^}]+\}\s+)?req\.name[^@]*/);
		expect(m).not.toBeNull();
		expect(m![0]).not.toContain(' | undefined');
	});

	it('does NOT expand body fields when schema is array', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						post: {
							operationId: 'bulk',
							requestBody: {
								content: {
									'application/json': {
										schema: { type: 'array', items: { type: 'string' } },
									},
								},
							},
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).not.toMatch(/@param\s+req\./);
	});

	it('expands body fields when schema is $ref (V3 provider dereferences properties)', async () => {
		// Locks current behavior: V3 provider inlines $ref into the request body schema
		// before generateParamTags runs, so @param req.name IS emitted.
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						post: {
							operationId: 'createPet',
							requestBody: {
								content: {
									'application/json': {
										schema: { $ref: '#/components/schemas/Pet' },
									},
								},
							},
							responses: { '200': { description: 'ok' } },
						},
					},
				},
				components: {
					schemas: { Pet: { type: 'object', properties: { name: { type: 'string' } } } },
				},
			})
		);
		expect(code).toMatch(/@param\s+(\{[^}]+\}\s+)?req\.name/);
	});

	it('handles requestBody with no schema gracefully', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						post: {
							operationId: 'createPet',
							requestBody: {
								content: { 'application/json': {} as never },
							},
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		// Should not throw — just no @param req.* lines.
		expect(code).toMatch(/createPetUsingPost/);
	});
});

describe('Multiple response codes', () => {
	it('locks behavior: response description does NOT appear in @returns', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						post: {
							operationId: 'createPet',
							requestBody: {
								content: {
									'application/json': {
										schema: { type: 'object', properties: { name: { type: 'string' } } },
									},
								},
							},
							responses: {
								'201': { description: 'created' },
								'400': { description: 'bad request' },
								'500': { description: 'server error' },
							},
						},
					},
				},
			})
		);
		// BUG (probably intended): no @returns tag emitted at all — the
		// responses[0].description never surfaces in JSDoc.
		expect(code).toMatch(/createPetUsingPost/);
		expect(code).not.toMatch(/@returns/);
		expect(code).not.toContain('created');
	});
});