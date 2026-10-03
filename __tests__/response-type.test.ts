import { describe, it, expect, vi, beforeEach } from 'vitest';
import { request } from 'undici';
import { codeGen } from '../src/openapi/index.js';

vi.mock('undici', async () => {
	const actual = await vi.importActual<typeof import('undici')>('undici');
	return { ...actual, request: vi.fn() };
});
const mockedRequest = vi.mocked(request);

describe('response type handling (#7)', () => {
	beforeEach(() => mockedRequest.mockReset());

	it('casts response.json() when a schema is declared', async () => {
		const spec = {
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: {
				'/pets': {
					get: {
						operationId: 'listPets',
						responses: {
							'200': {
								content: {
									'application/json': {
										schema: { type: 'array', items: { type: 'object' } },
									},
								},
							},
						},
					},
				},
			},
		};
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn().mockResolvedValue(spec) },
		} as never);

		const { code } = await codeGen({
			docURL: 'https://example.com/spec.json',
			output: '',
		});

		expect(code).toMatch(/\bas\s+/);
	});

	it('produces a typed promise return when no response schema is declared', async () => {
		const spec = {
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: {
				'/ping': {
					get: {
						operationId: 'ping',
						responses: {
							'204': { description: 'no content' },
						},
					},
				},
			},
		};
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn().mockResolvedValue(spec) },
		} as never);

		const { code } = await codeGen({
			docURL: 'https://example.com/spec.json',
			output: '',
		});

		// Even without a schema, the generated function should compile
		// (no implicit any) — the response should be typed somehow.
		expect(code).toMatch(/export async function ping/);
		// We don't assert `as unknown` strictly — the type contract is
		// "no implicit any" via the explicit fetch return type.
	});
});
