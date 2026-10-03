import { describe, it, expect, vi, beforeEach } from 'vitest';
import { request } from 'undici';
import { Base } from '../src/core/base/Base.js';
import { createUniqueNameResolver } from '../src/core/generator/naming.js';
import { codeGen } from '../src/openapi/index.js';

vi.mock('undici', async () => {
	const actual = await vi.importActual<typeof import('undici')>('undici');
	return { ...actual, request: vi.fn() };
});
const mockedRequest = vi.mocked(request);

describe('Base.pathToFnName', () => {
	it('prefers operationId over path', () => {
		const name = Base.pathToFnName('/pets/{id}', 'put', 'updatePet');
		expect(name).toBe('updatePetUsingPut');
	});

	it('falls back to path when operationId is missing', () => {
		const name = Base.pathToFnName('/pets/{id}', 'get');
		expect(name).toBe('petsIdUsingGet');
	});

	it('falls back to path when operationId normalizes to empty', () => {
		const name = Base.pathToFnName('/pets/{id}', 'get', '');
		expect(name).toBe('petsIdUsingGet');
	});

	it('produces legal identifiers when path contains dashes', () => {
		const name = Base.pathToFnName('/pets/{id}', 'put', 'update-pet');
		expect(name).toBe('updatePetUsingPut');
		expect(name).toMatch(/^[A-Za-z_$][A-Za-z0-9_$]*$/);
	});
});

describe('codeGen honours operationId (end-to-end)', () => {
	beforeEach(() => mockedRequest.mockReset());

	it('emits operationId-derived function names when operationId is present', async () => {
		const spec = {
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: {
				'/pets/{id}': {
					put: {
						operationId: 'updatePet',
						parameters: [
							{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
						],
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
		};
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn().mockResolvedValue(spec) },
		} as never);

		const result = await codeGen({
			docURL: 'https://example.com/spec.json',
			output: '',
		});

		expect(result.code).toContain('export async function updatePetUsingPut');
		// Confirm we did NOT fall back to path-derived naming.
		expect(result.code).not.toContain('petsIdUsingPut');
	});

	it('falls back to path-derived naming when operationId is absent', async () => {
		const spec = {
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: {
				'/pets/{id}': {
					get: {
						parameters: [
							{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
						],
						responses: { '200': { description: 'ok' } },
					},
				},
			},
		};
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn().mockResolvedValue(spec) },
		} as never);

		const result = await codeGen({
			docURL: 'https://example.com/spec.json',
			output: '',
		});

		expect(result.code).toContain('petsIdUsingGet');
	});
});

describe('createUniqueNameResolver', () => {
	it('returns the original name on first call', () => {
		const reserve = createUniqueNameResolver();
		expect(reserve('updateUsingPut')).toBe('updateUsingPut');
	});

	it('appends a counter suffix on subsequent collisions', () => {
		const reserve = createUniqueNameResolver();
		expect(reserve('updateUsingPut')).toBe('updateUsingPut');
		expect(reserve('updateUsingPut')).toBe('updateUsingPut2');
		expect(reserve('updateUsingPut')).toBe('updateUsingPut3');
	});

	it('does not interfere with distinct names', () => {
		const reserve = createUniqueNameResolver();
		expect(reserve('createUsingPost')).toBe('createUsingPost');
		expect(reserve('deleteUsingDelete')).toBe('deleteUsingDelete');
		expect(reserve('createUsingPost')).toBe('createUsingPost2');
	});

	it('maintains independent counters per base name', () => {
		const reserve = createUniqueNameResolver();
		expect(reserve('foo')).toBe('foo');
		expect(reserve('bar')).toBe('bar');
		expect(reserve('foo')).toBe('foo2');
		expect(reserve('bar')).toBe('bar2');
	});

	it('treats empty string as a name (no special-case bypass)', () => {
		const reserve = createUniqueNameResolver();
		expect(reserve('')).toBe('');
		expect(reserve('')).toBe('2');
	});
});