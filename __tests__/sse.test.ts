import { describe, expect, it } from 'vitest';
import { FetchAdapter } from '../src/core/client/fetch.js';
import { AxiosAdapter } from '../src/core/client/axios.js';
import { Generator } from '../src/core/generator/index.js';
import { Adaptors, MediaTypes, ParameterIn } from '../src/core/interface.js';
import type {
	MediaTypeObject,
	OperationObject,
	ParameterObject,
	ProviderInitResult,
} from '../src/core/interface.js';

function makeSseFixture(): ProviderInitResult {
	const operation: OperationObject = {
		method: 'get',
		operationId: 'streamEvents',
		parameters: [],
		responses: [
			{
				type: MediaTypes.EVENT_STREAM,
				schema: { type: 'object', properties: { msg: { type: 'string' } } },
			} as MediaTypeObject,
		],
	};

	return {
		enums: [],
		schemas: {},
		parameters: {},
		responses: {},
		requestBodies: {},
		apis: {
			'/events': [operation],
		},
	};
}

describe('SSE codegen (fetch adapter)', () => {
	it('returns raw fetch() without JSON parsing', async () => {
		const code = await Generator.genCode(
			makeSseFixture(),
			{ docURL: 'memory://', output: 'memory.ts', adaptor: Adaptors.fetch },
			new FetchAdapter()
		);

		expect(code).toMatch(/return fetch\(/);
		expect(code).not.toContain('response.json');
		expect(code).not.toContain('.then(');
	});

	it('still emits method/headers/body for SSE endpoint', async () => {
		const fixture = makeSseFixture();
		fixture.apis['/events'][0].parameters = [
			{
				name: 'X-Trace-Id',
				in: ParameterIn.header,
				required: false,
				schema: { type: 'string' },
			} as ParameterObject,
		];

		const code = await Generator.genCode(
			fixture,
			{ docURL: 'memory://', output: 'memory.ts', adaptor: Adaptors.fetch },
			new FetchAdapter()
		);

		expect(code).toContain('method: "GET"');
		expect(code).toContain('X-Trace-Id');
	});

	it('emits body field when SSE endpoint has body parameters', async () => {
		const fixture = makeSseFixture();
		fixture.apis['/events'][0].parameters = [
			{
				name: 'payload',
				in: ParameterIn.body,
				required: true,
				schema: { type: 'string' },
			} as ParameterObject,
		];

		const code = await Generator.genCode(
			fixture,
			{ docURL: 'memory://', output: 'memory.ts', adaptor: Adaptors.fetch },
			new FetchAdapter()
		);

		expect(code).toContain('body:');
		expect(code).toContain('JSON.stringify');
	});
});

describe('SSE codegen (axios adapter)', () => {
	it('returns raw axios() without generic type parameter', async () => {
		const code = await Generator.genCode(
			makeSseFixture(),
			{ docURL: 'memory://', output: 'memory.ts', adaptor: Adaptors.axios },
			new AxiosAdapter()
		);

		expect(code).toMatch(/return axios\(/);
		expect(code).not.toMatch(/return axios</);
	});

	it('still emits method/headers/body for SSE endpoint', async () => {
		const fixture = makeSseFixture();
		fixture.apis['/events'][0].parameters = [
			{
				name: 'X-Trace-Id',
				in: ParameterIn.header,
				required: false,
				schema: { type: 'string' },
			} as ParameterObject,
		];

		const code = await Generator.genCode(
			fixture,
			{ docURL: 'memory://', output: 'memory.ts', adaptor: Adaptors.axios },
			new AxiosAdapter()
		);

		expect(code).toContain('method: "GET"');
		expect(code).toContain('X-Trace-Id');
	});

	it('emits data field when SSE endpoint has body parameters', async () => {
		const fixture = makeSseFixture();
		fixture.apis['/events'][0].parameters = [
			{
				name: 'payload',
				in: ParameterIn.body,
				required: true,
				schema: { type: 'string' },
			} as ParameterObject,
		];

		const code = await Generator.genCode(
			fixture,
			{ docURL: 'memory://', output: 'memory.ts', adaptor: Adaptors.axios },
			new AxiosAdapter()
		);

		expect(code).toContain('data:');
	});
});

describe('Regression: non-SSE codegen unchanged', () => {
	it('fetch: application/json still parses to JSON', async () => {
		const fixture: ProviderInitResult = {
			enums: [],
			schemas: {},
			parameters: {},
			responses: {},
			requestBodies: {},
			apis: {
				'/pets': [
					{
						method: 'get',
						operationId: 'listPets',
						parameters: [],
						responses: [
							{
								type: MediaTypes.JSON,
								schema: {
									type: 'array',
									items: {
										type: 'object',
										properties: { id: { type: 'number' } },
									},
								},
							} as MediaTypeObject,
						],
					},
				],
			},
		};

		const code = await Generator.genCode(
			fixture,
			{ docURL: 'memory://', output: 'memory.ts', adaptor: Adaptors.fetch },
			new FetchAdapter()
		);

		expect(code).toContain('response.json');
		expect(code).toContain('.then(');
	});

	it('axios: application/json keeps <T> type annotation (positional-binding regression guard)', async () => {
		const fixture: ProviderInitResult = {
			enums: [],
			schemas: {},
			parameters: {},
			responses: {},
			requestBodies: {},
			apis: {
				'/pets': [
					{
						method: 'get',
						operationId: 'listPets',
						parameters: [],
						responses: [
							{
								type: MediaTypes.JSON,
								schema: {
									type: 'array',
									items: {
										type: 'object',
										properties: { id: { type: 'number' } },
									},
								},
							} as MediaTypeObject,
						],
					},
				],
			},
		};

		const code = await Generator.genCode(
			fixture,
			{ docURL: 'memory://', output: 'memory.ts', adaptor: Adaptors.axios },
			new AxiosAdapter()
		);

		// Regression guard: if AxiosAdapter.client() drops a parameter, the
		// `isEventStream` slot receives the wrong value and the SSE branch may
		// fire for a JSON response, stripping the <T> type annotation.
		expect(code).toMatch(/return axios</);
		expect(code).not.toMatch(/return axios\(/);
	});
});
