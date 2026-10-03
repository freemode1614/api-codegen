import { describe, it, expect, vi, beforeEach } from 'vitest';
import { request } from 'undici';
import type { OpenAPIV3 } from 'openapi-types';
import { codeGen } from '../src/openapi/index.js';
import { Adaptors } from '../src/core/interface.js';
import { FetchAdapter } from '../src/core/client/fetch.js';
import { AxiosAdapter } from '../src/core/client/axios.js';

/**
 * Step 5c — Adaptor interface edge cases.
 * Both unit (Adaptor.name) and integration (codeGen emits different syntax per adaptor).
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

const generate = async (
	spec: OpenAPIV3.Document,
	adaptor: 'fetch' | 'axios' = Adaptors.fetch
): Promise<string> => {
	mockedRequest.mockReset();
	mockedRequest.mockResolvedValue({
		statusCode: 200,
		body: { json: vi.fn().mockResolvedValue(spec) },
	} as never);

	const result = await codeGen({
		spec: 'x',
		output: '',
		docURL: 'https://example.com/spec.json',
		adaptor,
	});

	return result.code;
};

beforeEach(() => {
	mockedRequest.mockReset();
});

describe('Adapter instances', () => {
	it('FetchAdapter.name is "fetch"', () => {
		expect(new FetchAdapter().name).toBe('fetch');
	});

	it('AxiosAdapter.name is "axios"', () => {
		expect(new AxiosAdapter().name).toBe('axios');
	});
});

describe('Fetch adaptor output', () => {
	it('emits fetch() call and method: "GET"', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						get: {
							operationId: 'listPets',
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			}),
			Adaptors.fetch
		);
		expect(code).toMatch(/fetch\(/);
		expect(code).toMatch(/method:\s*["']GET["']/);
	});

	it('emits POST with body passed as req object', async () => {
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
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			}),
			Adaptors.fetch
		);
		expect(code).toMatch(/method:\s*["']POST["']/);
		// Lock current behavior: body is referenced as `req` object, not serialized inline.
		expect(code).toMatch(/\breq\b/);
	});
});

describe('Axios adaptor output', () => {
	it('emits axios-style call (axios. or axios())', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						get: {
							operationId: 'listPets',
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			}),
			Adaptors.axios
		);
		// Lock current behavior: axios adapter emits a call referencing 'axios' identifier.
		expect(code).toMatch(/axios/);
	});

	it('emits method via axios config field', async () => {
		const code = await generate(
			makeSpec({
				paths: {
					'/pets': {
						get: {
							operationId: 'listPets',
							responses: { '200': { description: 'ok' } },
						},
					},
				},
			}),
			Adaptors.axios
		);
		// Either "method: 'GET'" or axios method-specific call.
		expect(code).toMatch(/method["']?\s*:\s*["']GET["']|axios\.(get|post|put|delete|patch)/);
	});
});

describe('Adaptor output divergence', () => {
	it('fetch and axios produce different code for the same spec', async () => {
		const spec = makeSpec({
			paths: {
				'/pets': {
					get: {
						operationId: 'listPets',
						responses: { '200': { description: 'ok' } },
					},
				},
			},
		});
		const fetchCode = await generate(spec, Adaptors.fetch);
		const axiosCode = await generate(spec, Adaptors.axios);
		expect(fetchCode).not.toBe(axiosCode);
	});
});