import { describe, it, expect, vi, beforeEach } from 'vitest';
import { request } from 'undici';
import { codeGen } from '../src/openapi/index.js';

vi.mock('undici', async () => {
	const actual = await vi.importActual<typeof import('undici')>('undici');
	return { ...actual, request: vi.fn() };
});
const mockedRequest = vi.mocked(request);

const generate = async (spec: unknown): Promise<string> => {
	mockedRequest.mockReset();
	mockedRequest.mockResolvedValue({
		statusCode: 200,
		body: { json: vi.fn().mockResolvedValue(spec) },
	} as never);

	const { code } = await codeGen({
		docURL: 'https://example.com/spec.json',
		output: '',
	});

	return code;
};

describe('required properties (#44)', () => {
	beforeEach(() => mockedRequest.mockReset());

	it('marks only the properties listed in `required` as required', async () => {
		const code = await generate({
			openapi: '3.1.0',
			info: { title: 't', version: '1' },
			paths: {},
			components: {
				schemas: {
					ChatRequest: {
						type: 'object',
						required: ['api_key'],
						properties: {
							api_key: { type: 'string' },
							top_p: { anyOf: [{ type: 'number' }, { type: 'null' }] },
							temperature: {
								anyOf: [{ type: 'number' }, { type: 'null' }],
								default: 0.7,
							},
							stream: { type: 'boolean', default: false },
						},
					},
				},
			},
		});

		expect(code).toMatch(/api_key:\s*string;/);
		expect(code).toMatch(/top_p\?:\s*number \| null;/);
		expect(code).toMatch(/temperature\?:\s*number \| null;/);
		expect(code).toMatch(/stream\?:\s*boolean;/);
	});

	it('marks every property optional when no `required` array is present', async () => {
		const code = await generate({
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: {},
			components: {
				schemas: {
					Pet: {
						type: 'object',
						properties: {
							id: { type: 'integer' },
							name: { type: 'string' },
						},
					},
				},
			},
		});

		expect(code).toMatch(/id\?:\s*number;/);
		expect(code).toMatch(/name\?:\s*string;/);
	});

	it('honours the `required` array of an inline request body schema', async () => {
		const code = await generate({
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: {
				'/pets': {
					post: {
						operationId: 'createPet',
						requestBody: {
							content: {
								'application/json': {
									schema: {
										type: 'object',
										required: ['name'],
										properties: {
											name: { type: 'string' },
											age: { type: 'integer' },
										},
									},
								},
							},
						},
						responses: { '200': { description: 'ok' } },
					},
				},
			},
		});

		expect(code).toMatch(/name:\s*string/);
		expect(code).toMatch(/age\?:\s*number/);
	});

	it('honours the `required` array of a nested object schema', async () => {
		const code = await generate({
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: {},
			components: {
				schemas: {
					Outer: {
						type: 'object',
						required: ['inner'],
						properties: {
							inner: {
								type: 'object',
								required: ['a'],
								properties: {
									a: { type: 'string' },
									b: { type: 'string' },
								},
							},
							other: { type: 'string' },
						},
					},
				},
			},
		});

		expect(code).toMatch(/inner:\s*\{/);
		expect(code).toMatch(/a:\s*string;/);
		expect(code).toMatch(/b\?:\s*string;/);
		expect(code).toMatch(/other\?:\s*string;/);
	});
});
