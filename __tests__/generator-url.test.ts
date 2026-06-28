import { describe, expect, it } from 'vitest';
import ts from 'typescript';
import { Generator } from '../src/core/generator/index.js';
import { ParameterIn } from '../src/core/interface.js';

function makeParameter(name: string, in_: ParameterIn) {
	return {
		name,
		in: in_,
		required: true,
		schema: { type: 'string' as const },
	};
}

describe('Generator.toUrlTemplate', () => {
	it('returns a NoSubstitutionTemplateLiteral when path has no placeholders and no query params', () => {
		const result = Generator.toUrlTemplate('/users', []);
		expect(ts.isNoSubstitutionTemplateLiteral(result)).toBe(true);
		expect((result as ts.NoSubstitutionTemplateLiteral).text).toBe('/users');
	});

	it('prepends basePath to plain path', () => {
		const result = Generator.toUrlTemplate('/users', [], 'https://api.example.com');
		expect(ts.isNoSubstitutionTemplateLiteral(result)).toBe(true);
		expect((result as ts.NoSubstitutionTemplateLiteral).text).toBe(
			'https://api.example.com/users'
		);
	});

	it('returns a TemplateExpression when path contains a {param} placeholder', () => {
		const params = [makeParameter('userId', ParameterIn.path)];
		const result = Generator.toUrlTemplate('/users/{userId}', params);
		expect(ts.isTemplateExpression(result)).toBe(true);

		const expr = result as ts.TemplateExpression;
		expect(expr.head.text).toBe('/users/');
		expect(expr.templateSpans).toHaveLength(1);

		const span = expr.templateSpans[0];
		expect(ts.isIdentifier(span.expression)).toBe(true);
		expect((span.expression as ts.Identifier).text).toBe('userId');
	});

	it('appends query parameters as ?key={param} and &key={param}', () => {
		const params = [
			makeParameter('page', ParameterIn.query),
			makeParameter('limit', ParameterIn.query),
		];
		// Query parameters inject `{...}` placeholders, so the result is a
		// TemplateExpression whose head.text begins with `/users?` and
		// each span is a parameter identifier.
		const result = Generator.toUrlTemplate('/users', params);
		expect(ts.isTemplateExpression(result)).toBe(true);
		const expr = result as ts.TemplateExpression;
		expect(expr.head.text).toBe('/users?page=');
		expect(expr.templateSpans).toHaveLength(2);
		const span0Expr = expr.templateSpans[0].expression as ts.Identifier;
		const span1Expr = expr.templateSpans[1].expression as ts.Identifier;
		expect(span0Expr.text).toBe('page');
		expect(span1Expr.text).toBe('limit');
		// Middle text of first span should glue '&limit=' between the two placeholders
		expect(expr.templateSpans[0].literal.text).toBe('&limit=');
	});

	it('mixes path placeholder and query parameters', () => {
		const params = [
			makeParameter('userId', ParameterIn.path),
			makeParameter('verbose', ParameterIn.query),
		];
		const result = Generator.toUrlTemplate('/users/{userId}', params);
		expect(ts.isTemplateExpression(result)).toBe(true);
	});

	it('throws on invalid path segment (mismatched {)', () => {
		// `/foo{bar` is split to ['/foo', '{bar']; the regex `/^{(.+)}(.+)?/`
		// requires both `{` and `}`, so it throws "Invalid path segment".
		expect(() => Generator.toUrlTemplate('/foo{bar', [])).toThrow(
			/Invalid path segment/
		);
	});
});
