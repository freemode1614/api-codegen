import { describe, it, expect, vi, beforeEach } from 'vitest';
import { request } from 'undici';
import type { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { codeGen } from '../src/openapi/index.js';
import { Adaptors } from '../src/core/interface.js';

/**
 * Step 5d — V2 vs V3 vs V3_1 input edge cases.
 * Locks current behavior per version. Highlights differences.
 */

vi.mock('undici', async () => {
	const actual = await vi.importActual<typeof import('undici')>('undici');
	return {
		...actual,
		request: vi.fn(),
	};
});

const mockedRequest = vi.mocked(request);

const generate = async (spec: unknown): Promise<string> => {
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

describe('OpenAPI 2.0 (Swagger) input', () => {
	const makeV2 = (overrides: Partial<OpenAPIV2.Document> = {}): OpenAPIV2.Document =>
		({
			swagger: '2.0',
			info: { title: 't', version: '1.0' },
			paths: {},
			...overrides,
		}) as OpenAPIV2.Document;

	it('emits a function for a V2 path', async () => {
		const code = await generate(
			makeV2({
				paths: {
					'/pets': {
						get: {
							operationId: 'listPets',
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/function\s+listPetsUsingGet/);
	});

	it('handles V2 body parameter (in: body + schema)', async () => {
		// BUG (probably intended): V2 body param may or may not surface in JSDoc —
		// depending on whether V2 provider rewrites it to a requestBody.
		const code = await generate(
			makeV2({
				paths: {
					'/pets': {
						post: {
							operationId: 'createPet',
							parameters: [
								{
									name: 'pet',
									in: 'body',
									required: true,
									schema: { type: 'object', properties: { name: { type: 'string' } } },
								} as never,
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/function\s+createPetUsingPost/);
		// Lock current behavior: V2 body param is NOT expanded into req.* tags.
		// The generator likely doesn't translate V2 body → V3 requestBody here.
		expect(code).not.toMatch(/@param\s+req\.name/);
	});

	it('handles V2 formData parameter', async () => {
		const code = await generate(
			makeV2({
				paths: {
					'/upload': {
						post: {
							operationId: 'upload',
							consumes: ['multipart/form-data'],
							parameters: [
								{
									name: 'file',
									in: 'formData',
									type: 'file',
								} as never,
							],
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			})
		);
		expect(code).toMatch(/function\s+uploadUsingPost/);
	});
});

describe('OpenAPI 3.0 input', () => {
	const makeV3 = (overrides: Partial<OpenAPIV3.Document> = {}): OpenAPIV3.Document =>
		({
			openapi: '3.0.0',
			info: { title: 't', version: '1.0' },
			paths: {},
			...overrides,
		}) as OpenAPIV3.Document;

	it('handles V3 path without throwing', async () => {
		const code = await generate(makeV3({ paths: { '/x': { get: { operationId: 'x', responses: { '200': { description: 'ok' } } } } } }));
		expect(code).toMatch(/function\s+xUsingGet/);
	});

	it('handles V3 with no info object', async () => {
		const code = await generate({ openapi: '3.0.0', paths: {} } as never);
		expect(code).toBeDefined();
	});

	it('handles V3 with servers array', async () => {
		const code = await generate(
			makeV3({
				servers: [{ url: 'https://api.example.com' }, { url: 'https://staging.example.com' }],
				paths: {},
			})
		);
		expect(code).toBeDefined();
	});
});

describe('OpenAPI 3.1 input', () => {
	const makeV3_1 = (overrides: Partial<OpenAPIV3_1.Document> = {}): OpenAPIV3_1.Document =>
		({
			openapi: '3.1.0',
			info: { title: 't', version: '1.0' },
			paths: {},
			...overrides,
		}) as OpenAPIV3_1.Document;

	it('handles V3.1 path', async () => {
		const code = await generate(
			makeV3_1({
				paths: {
					'/pets': {
						get: { operationId: 'listPets', responses: { '200': { description: 'ok' } } },
					},
				},
			})
		);
		expect(code).toMatch(/function\s+listPetsUsingGet/);
	});

	it('handles V3.1 with webhooks (no crash)', async () => {
		const code = await generate(
			makeV3_1({
				webhooks: {
					'newPet': {
						post: {
							operationId: 'onNewPet',
							responses: { '200': { description: 'ok' } },
						},
					},
				} as never,
			})
		);
		expect(code).toBeDefined();
		// BUG (probably intended): webhooks are not surfaced as generated functions in this build.
		expect(code).not.toMatch(/function\s+onNewPet/);
	});

	it('handles V3.1 with webhooks + paths together', async () => {
		const code = await generate(
			makeV3_1({
				paths: {
					'/pets': {
						get: { operationId: 'listPets', responses: { '200': { description: 'ok' } } },
					},
				},
				webhooks: {
					'newPet': {
						post: { operationId: 'onNewPet', responses: { '200': { description: 'ok' } } },
					},
				} as never,
			})
		);
		expect(code).toMatch(/function\s+listPetsUsingGet/);
	});
});