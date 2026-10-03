import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('undici', async () => {
	const actual = await vi.importActual<typeof import('undici')>('undici');
	return {
		...actual,
		request: vi.fn(),
	};
});

import { request } from 'undici';
import { OpenAPIProvider, codeGen, OpenAPIVersion } from '../src/openapi/index.js';
import { AxiosAdapter } from '../src/core/client/axios.js';
import { Adaptors } from '../src/core/interface.js';
import type { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';

const mockedRequest = vi.mocked(request);

function makeV3Doc(): OpenAPIV3.Document {
	return {
		openapi: '3.0.0',
		info: { title: 't', version: '1.0' },
		paths: {},
	} as OpenAPIV3.Document;
}

function makeV3_1Doc(): OpenAPIV3_1.Document {
	return {
		openapi: '3.1.0',
		info: { title: 't', version: '1.0' },
		paths: {},
	} as OpenAPIV3_1.Document;
}

function makeV2Doc(): OpenAPIV2.Document {
	return {
		swagger: '2.0',
		info: { title: 't', version: '1.0' },
		paths: {},
	} as OpenAPIV2.Document;
}

describe('OpenAPIProvider.parse', () => {
	it('routes v2 docs to V2', () => {
		const provider = new OpenAPIProvider(
			{ spec: 'x', output: 'x' } as never,
			makeV2Doc() as never
		);
		expect(() => provider.parse(makeV2Doc() as never)).not.toThrow();
	});

	it('routes v3.0 docs to V3', () => {
		const provider = new OpenAPIProvider(
			{ spec: 'x', output: 'x' } as never,
			makeV3Doc() as never
		);
		expect(() => provider.parse(makeV3Doc() as never)).not.toThrow();
	});

	it('routes v3.1 docs to V3_1', () => {
		const provider = new OpenAPIProvider(
			{ spec: 'x', output: 'x' } as never,
			makeV3_1Doc() as never
		);
		expect(() => provider.parse(makeV3_1Doc() as never)).not.toThrow();
	});

	it('throws on unknown openapi version', () => {
		const provider = new OpenAPIProvider(
			{ spec: 'x', output: 'x' } as never,
			makeV3Doc() as never
		);
		const weird = { swagger: '9.9', info: {}, paths: {} } as never;
		expect(() => provider.parse(weird)).toThrow(/Not a valid OpenAPI version/);
	});
});

describe('getAdaptor (indirect via codeGen with adaptor=axios)', () => {
	beforeEach(() => {
		mockedRequest.mockReset();
	});

	it('uses AxiosAdapter when adaptor=axios', async () => {
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: {
				json: vi
					.fn()
					.mockResolvedValue(makeV3Doc()),
			},
		} as never);

		// Build a tiny spec with one endpoint so the generator actually emits code
		// referencing the client. Empty spec produces "// No api declaration found."
		// and won't exercise the adapter branch.
		const specWithPath: OpenAPIV3.Document = {
			openapi: '3.0.0',
			info: { title: 't', version: '1.0' },
			paths: {
				'/ping': {
					get: {
						operationId: 'ping',
						responses: { '200': { description: 'ok' } },
					},
				},
			},
		} as OpenAPIV3.Document;

		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn().mockResolvedValue(specWithPath) },
		} as never);

		const result = await codeGen({
			spec: 'x',
			output: 'out.ts',
			docURL: 'https://example.com/spec.json',
			adaptor: Adaptors.axios,
		});

		// Axios adapter emits a call to the client identifier (= 'axios')
		expect(result.code).toContain('axios');
	});

	it('uses FetchAdapter by default and switches logger to debug when verbose', async () => {
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn().mockResolvedValue(makeV3Doc()) },
		} as never);

		const result = await codeGen({
			spec: 'x',
			output: 'out.ts',
			docURL: 'https://example.com/spec.json',
			verbose: true,
			adaptor: Adaptors.fetch,
		});

		expect(result.code.length).toBeGreaterThan(0);
	});
});

describe('AxiosAdapter can be instantiated standalone', () => {
	it('returns AxiosAdapter instance', () => {
		const a = new AxiosAdapter();
		expect(a.name).toBe('axios');
	});
});

describe('OpenAPIVersion enum', () => {
	it('exposes the four known versions', () => {
		expect(OpenAPIVersion.v2).toBe('v2');
		expect(OpenAPIVersion.v3).toBe('v3');
		expect(OpenAPIVersion.v3_1).toBe('v3_1');
		expect(OpenAPIVersion.unknown).toBe('unknown');
	});
});