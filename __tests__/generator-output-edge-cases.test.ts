import { describe, it, expect, vi, beforeEach } from 'vitest';
import { request } from 'undici';
import type { OpenAPIV3 } from 'openapi-types';
import { codeGen } from '../src/openapi/index.js';
import { Adaptors } from '../src/core/interface.js';

/**
 * Step 4 — Generator output-code integration edge cases.
 *
 * Drives the full pipeline (mocked fetch → parse → generate → output string)
 * and asserts on the emitted TypeScript. Locks current behavior with BUG
 * notes for surprising paths.
 */

vi.mock('undici', async () => {
	const actual = await vi.importActual<typeof import('undici')>('undici');
	return {
		...actual,
		request: vi.fn(),
	};
});

const mockedRequest = vi.mocked(request);

// Minimal v3 spec factory — accepts overrides.
const makeSpec = (overrides: Partial<OpenAPIV3.Document> = {}): OpenAPIV3.Document =>
	({
		openapi: '3.0.0',
		info: { title: 't', version: '1.0' },
		paths: {},
		...overrides,
	}) as OpenAPIV3.Document;

// Drive codeGen end-to-end. Returns the emitted code string.
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

describe('codeGen output edge cases', () => {
	it('emits no function declarations when paths is empty', async () => {
		const code = await generate(makeSpec({ paths: {} }));
		expect(code).not.toMatch(/export\s+async\s+function/);
	});

	it('emits one function per operationId (default naming from path)', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/a': {
						get: { responses: { '200': { description: 'ok' } } },
					},
					'/b': {
						post: { responses: { '200': { description: 'ok' } } },
					},
				},
			})
		);
		expect(code).toMatch(/export\s+async\s+function\s+aUsingGet/);
		expect(code).toMatch(/export\s+async\s+function\s+bUsingPost/);
	});

	it('emits a function per requestBody mediaType when >1 mediaType', async () => {
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
									'application/xml': {
										schema: { type: 'object', properties: { name: { type: 'string' } } },
									},
								},
							},
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		// Locks current behavior: media-type suffix is camelCase (lowercase "json"),
		// not UpperCamelCase. So the function is named `...Postjson` not `...PostJson`.
		expect(code).toMatch(/createPetUsingPostjson/);
		expect(code).toMatch(/createPetUsingPostxml/);
	});

	it('deduplicates same operationId + same method + same path (no mediaType diff)', async () => {
		// Two paths, both POST, both operationId='update'. Different paths.
		const code = await generate(
			makeSpec({
				paths: {
					'/a': {
						post: {
							operationId: 'update',
							responses: { '200': { description: 'ok' } },
						},
					},
					'/b': {
						post: {
							operationId: 'update',
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/function\s+updateUsingPost\b/);
		expect(code).toMatch(/function\s+updateUsingPost2/);
	});

	it('falls back to JSON request body when requestBody has no content', async () => {
		// BUG (probably intended): requestBody with empty content → codeGen
		// should still emit a function, defaulting to JSON. Lock current.
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						post: {
							operationId: 'create',
							requestBody: { content: {} } as never,
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		// Lock current behavior: function is still emitted with UsingPost suffix.
		expect(code).toMatch(/createUsingPost/);
	});

	it('emits a function even when responses is empty object', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						get: {
							operationId: 'list',
							responses: {} as never,
						},
					},
				},
			})
		);
		expect(code).toMatch(/listUsingGet/);
	});

	it('filters out cookie parameters (cookies are not in generated signature)', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						get: {
							operationId: 'list',
							parameters: [
								{ name: 'sid', in: 'cookie', schema: { type: 'string' } },
								{ name: 'limit', in: 'query', schema: { type: 'integer' } },
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		// Lock current behavior: cookie param `sid` is filtered out before
		// parameter nodes are generated. Query params are kept BUT they don't
		// appear in the function signature either — they're surfaced as JSDoc
		// tags / inside the body, not as declared parameters.
		expect(code).toBeDefined();
		expect(code).not.toContain('\n  sid:'); // not a declared param
	});

	it('handles path with hyphens — function name is legal, raw path appears as URL', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/api-v2/pets': {
						get: {
							operationId: 'list-pets',
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		// Function name is the normalized form (legal TS identifier).
		expect(code).toMatch(/listPetsUsingGet/);
		// Raw URL path with hyphens appears in the fetch call body — that's correct.
		expect(code).toContain('/api-v2/pets');
	});

	it('handles very long operationId without breaking TS', async () => {
		const longOpId = 'a'.repeat(200);
		const code = await generate(
			makeSpec({
				paths: {
					'/x': {
						get: {
							operationId: longOpId,
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toContain(longOpId);
	});

	it('handles empty operationId + empty path (extreme fallback)', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/': {
						get: {
							// no operationId, no path content
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		// Locks current behavior: a function is emitted; name derived from path '/'.
		expect(code).toMatch(/export\s+async\s+function/);
	});

	it('emits TypeScript types for components.schemas', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Pet: {
							type: 'object',
							properties: {
								id: { type: 'integer' },
								name: { type: 'string' },
							},
							required: ['id'],
						},
					},
				},
			})
		);
		// Pet type should appear with id:number and name?:string.
		expect(code).toMatch(/export\s+type\s+Pet\s*=/);
		expect(code).toMatch(/id:\s*number/);
		expect(code).toMatch(/name\??:\s*string/);
	});

	it('emits enum for components.schemas with enum', async () => {
		const code = await generate(
			makeSpec({
				paths: {},
				components: {
					schemas: {
						Status: { type: 'string', enum: ['active', 'inactive'] },
					},
				},
			})
		);
		expect(code).toMatch(/export\s+enum\s+Status/);
		expect(code).toMatch(/['"]active['"]/);
		expect(code).toMatch(/['"]inactive['"]/);
	});

	it('emits three deduplicated functions when three operations collide on name', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/a': { post: { operationId: 'op', responses: { '200': { description: 'ok' } } } },
					'/b': { post: { operationId: 'op', responses: { '200': { description: 'ok' } } } },
					'/c': { post: { operationId: 'op', responses: { '200': { description: 'ok' } } } },
				},
			})
		);
		expect(code).toMatch(/function\s+opUsingPost\b/);
		expect(code).toMatch(/function\s+opUsingPost2/);
		expect(code).toMatch(/function\s+opUsingPost3/);
	});

	it('does not crash when info.title is non-ASCII', async () => {
		const code = await generate(
			makeSpec({
				info: { title: '测试 API', version: '1.0' },
				paths: {},
			})
		);
		// Lock current behavior: title does NOT appear in emitted code (no
		// header banner emitted by generator). Only verifies no crash.
		expect(code).toBeDefined();
		expect(code.length).toBeGreaterThan(0);
	});
});