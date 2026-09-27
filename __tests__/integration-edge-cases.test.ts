import { describe, it, expect } from 'vitest';
import { OpenAPIProvider, OpenAPIVersion, codeGen } from '../src/openapi/index.js';

/**
 * Edge-case sweep for the OpenAPI integration layer.
 *
 * Locks current behavior with inline "BUG:" notes for surprising paths
 * so any future change surfaces immediately here.
 */

// Minimal valid v3 doc used to satisfy Provider base-class constructor (it parses in ctor).
const minimalV3 = {
	openapi: '3.0.0',
	info: { title: 't', version: '1' },
	paths: {},
};

const makeProvider = (): OpenAPIProvider =>
	new OpenAPIProvider(
		{ spec: 'x', output: 'x' } as never,
		minimalV3 as never
	);

describe('OpenAPIProvider.parse edge cases', () => {

	it('throws a friendly error when doc has no openapi/swagger field', () => {
		// After fix: getDocVersion detects both fields missing and throws a friendly message.
		const provider = makeProvider();
		const bad = {} as Record<string, unknown>;
		expect(() => provider.parse(bad as never)).toThrow(/Not a valid OpenAPI version/);
	});

	it('throws a friendly error when openapi is unsupported (e.g. "1.0")', () => {
		// '1.0'.slice(0,3) === '1.0' → falls to default → throws "Not a valid OpenAPI version".
		const provider = makeProvider();
		const doc = { openapi: '1.0', paths: {} };
		expect(() => provider.parse(doc as never)).toThrow(/Not a valid OpenAPI version/);
	});

	it('throws a friendly error when openapi is empty string AND swagger is absent', () => {
		// After fix: getDocVersion handles missing-or-empty openapi/swagger gracefully.
		const provider = makeProvider();
		const doc = { openapi: '', paths: {} };
		expect(() => provider.parse(doc as never)).toThrow(/Not a valid OpenAPI version/);
	});

	it('accepts openapi="3.0.0" via the prefix match', () => {
		// '3.0.0'.slice(0,3) === '3.0' → matched as v3.
		const provider = makeProvider();
		const doc = {
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: {},
		};
		const result = provider.parse(doc as never);
		expect(result.apis).toEqual({});
		expect(result.schemas).toEqual({});
	});

	it('accepts openapi="3.1.0" via the prefix match', () => {
		const provider = makeProvider();
		const doc = {
			openapi: '3.1.0',
			info: { title: 't', version: '1' },
			paths: {},
		};
		const result = provider.parse(doc as never);
		expect(result.apis).toEqual({});
	});

	it('accepts swagger="2.0" via the prefix match', () => {
		const provider = makeProvider();
		const doc = {
			swagger: '2.0',
			info: { title: 't', version: '1' },
			paths: {},
		};
		const result = provider.parse(doc as never);
		expect(result.apis).toEqual({});
	});

	it('returns empty schemas map when spec has no components', () => {
		const provider = makeProvider();
		const doc = {
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: {},
		};
		const result = provider.parse(doc as never);
		expect(result.schemas).toEqual({});
	});

	it('handles paths with empty operations object', () => {
		const provider = makeProvider();
		const doc = {
			openapi: '3.0.0',
			info: { title: 't', version: '1' },
			paths: { '/pets': {} },
		};
		const result = provider.parse(doc as never);
		// '/pets' key exists but operations array should be empty.
		expect(result.apis['/pets']).toEqual([]);
	});
});

describe('OpenAPIVersion enum', () => {
	it('exposes v2, v3, v3_1, unknown', () => {
		expect(OpenAPIVersion.v2).toBe('v2');
		expect(OpenAPIVersion.v3).toBe('v3');
		expect(OpenAPIVersion.v3_1).toBe('v3_1');
		expect(OpenAPIVersion.unknown).toBe('unknown');
	});

	it('can be used as a discriminator (string equality)', () => {
		const v: OpenAPIVersion = OpenAPIVersion.v3;
		expect(v === 'v3').toBe(true);
	});
});

describe('codeGen failure surface', () => {
	it('propagates the underlying fetch error when fetchDoc fails', async () => {
		// Provide a URL that will fail (DNS resolution / connection refused).
		await expect(
			codeGen({
				docURL: 'http://127.0.0.1:1/never-listens.json',
				output: '',
			})
		).rejects.toThrow();
	});
});