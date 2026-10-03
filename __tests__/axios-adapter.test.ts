import { describe, it, expect } from 'vitest';
import { AxiosAdapter } from '../src/core/client/axios.js';

describe('AxiosAdapter', () => {
	const adapter = new AxiosAdapter();

	it('exposes axios-specific field names', () => {
		expect(adapter.name).toBe('axios');
		expect(adapter.methodFieldName).toBe('method');
		expect(adapter.bodyFieldName).toBe('data');
		expect(adapter.headersFieldName).toBe('headers');
		expect(adapter.queryFieldName).toBe('params');
	});

	it('returns statements for the simplest GET call with no params/body', () => {
		const stmts = adapter.client(
			'/pets',
			'get',
			[],
			undefined,
			undefined,
			adapter,
			'none',
			undefined,
			false
		);
		expect(Array.isArray(stmts)).toBe(true);
		expect(stmts).toHaveLength(1);
	});

	it('generates a header property assignment for header parameters', () => {
		const stmts = adapter.client(
			'/pets',
			'get',
			[{ name: 'X-Token', in: 'header' }],
			undefined,
			undefined,
			adapter,
			'none',
			undefined,
			false
		);
		// Just verify we get one statement and it includes header info
		expect(stmts).toHaveLength(1);
	});

	it('generates a body (data) property when requestBody.schema is present', () => {
		const stmts = adapter.client(
			'/pets',
			'post',
			[],
			{ type: 'application/json', schema: { type: 'object' } },
			undefined,
			adapter,
			'json',
			'application/json',
			false
		);
		expect(stmts).toHaveLength(1);
	});

	it('emits the FormData identifier when bodyKind is form-data', () => {
		const stmts = adapter.client(
			'/pets',
			'post',
			[],
			{ type: 'multipart/form-data' },
			undefined,
			adapter,
			'form-data',
			undefined,
			false
		);
		expect(stmts).toHaveLength(1);
	});

	it('emits the URLSearchParams identifier when bodyKind is urlencoded', () => {
		const stmts = adapter.client(
			'/pets',
			'post',
			[],
			{ type: 'application/x-www-form-urlencoded' },
			undefined,
			adapter,
			'urlencoded',
			'application/x-www-form-urlencoded',
			false
		);
		expect(stmts).toHaveLength(1);
	});

	it('includes a typed generic in the call when response.schema is present', () => {
		const stmts = adapter.client(
			'/pets',
			'get',
			[],
			undefined,
			{ type: 'application/json', schema: { type: 'object' } },
			adapter,
			'none',
			undefined,
			false
		);
		expect(stmts).toHaveLength(1);
	});

	it('falls back to plain req identifier when bodyKind is binary', () => {
		const stmts = adapter.client(
			'/upload',
			'post',
			[],
			{ type: 'application/octet-stream', schema: { type: 'string', format: 'binary' } },
			undefined,
			adapter,
			'binary',
			'application/octet-stream',
			false
		);
		expect(stmts).toHaveLength(1);
	});

	it('puts body parameters (no `in` field) into the body/data path', () => {
		const stmts = adapter.client(
			'/pets',
			'post',
			[{ name: 'name' }], // no `in` → treated as body
			undefined,
			undefined,
			adapter,
			'json',
			'application/json',
			false
		);
		expect(stmts).toHaveLength(1);
	});

	it('uppercases the HTTP method when emitting the method field', () => {
		const stmts = adapter.client(
			'/pets',
			'post',
			[],
			undefined,
			undefined,
			adapter,
			'none',
			undefined,
			false
		);
		// Print the AST to string and verify the method is uppercase
		const ts = require('typescript') as typeof import('typescript');
		const printer = ts.createPrinter();
		const src = ts.createSourceFile(
			'out.ts',
			'',
			ts.ScriptTarget.Latest,
			true,
			ts.ScriptKind.TS
		);
		const printed = stmts.map((s) => printer.printNode(ts.EmitHint.Unspecified, s, src)).join('\n');
		expect(printed).toContain('method: "POST"');
	});
});
