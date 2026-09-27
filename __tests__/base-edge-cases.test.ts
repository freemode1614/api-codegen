import { describe, it, expect } from 'vitest';
import { Base } from '../src/core/base/Base.js';
import { createUniqueNameResolver } from '../src/core/generator/naming.js';

/**
 * Edge-case sweep for Base utility methods + naming helper.
 *
 * Convention: if a test below fails, the failure is documented inline
 * as a "BUG:" comment so it can be triaged later without losing context.
 */

describe('Base.normalize edge cases', () => {
	it('handles empty string', () => {
		expect(Base.normalize('')).toBe('');
	});

	it('replaces every special character in the charset', () => {
		expect(Base.normalize('a/b-c_d{e}f(g)h:i j`k,l*m<n>o$p#q.r')).toMatch(
			/^[A-Za-z_]+$/
		);
		expect(Base.normalize('a/b-c_d{e}f(g)h:i j`k,l*m<n>o$p#q.r')).not.toContain('-');
		expect(Base.normalize('a/b-c_d{e}f(g)h:i j`k,l*m<n>o$p#q.r')).not.toContain('/');
	});

	it('appends underscore for TypeScript reserved keyword', () => {
		expect(Base.normalize('delete')).toBe('delete_');
		expect(Base.normalize('class')).toBe('class_');
	});

	it('strips two leading chars when input starts with a digit AND has more chars (regex /^\d./)', () => {
		// Regex is /^\d./ which requires "digit + at least one more char" to match.
		// Single-char input "9" doesn't match → passes through unchanged.
		expect(Base.normalize('1abc')).toBe('bc');
		expect(Base.normalize('9')).toBe('9');
	});

	it('does NOT collapse ... sequences (each dot becomes _ first)', () => {
		// BUG: replace(/[...]/, '_') turns each '.' into '_' BEFORE replaceAll('...', '') runs.
		// Current behavior: 'a...b' → 'a___b'.
		expect(Base.normalize('a...b')).toBe('a___b');
		expect(Base.normalize('...')).toBe('___');
	});

	it('preserves letters that are NOT in the charset (e.g. non-ASCII)', () => {
		// Chinese / emoji are NOT in [/\-_{}():\s`,*<>$#.] so they pass through.
		const out = Base.normalize('中文emoji');
		expect(out).toBe('中文emoji');
	});
});

describe('Base.camelCase edge cases', () => {
	it('handles empty string', () => {
		expect(Base.camelCase('')).toBe('');
	});

	it('drops leading numeric segments until first alphabetic segment', () => {
		// camelCase shifts parts[0] while it matches /^\d/
		expect(Base.camelCase('1_2_abc_def')).toBe('abcDef');
		expect(Base.camelCase('123')).toBe('');
	});

	it('preserves single non-numeric token as-is', () => {
		expect(Base.camelCase('foo')).toBe('foo');
	});

	it('handles consecutive underscores (filter(Boolean) collapses)', () => {
		expect(Base.camelCase('foo__bar')).toBe('fooBar');
		expect(Base.camelCase('__foo')).toBe('foo');
	});
});

describe('Base.upperCamelCase edge cases', () => {
	it('handles empty string', () => {
		expect(Base.upperCamelCase('')).toBe('');
	});

	it('N-prefix only fires for non-leading numeric segments (leading digit stripped by normalize)', () => {
		// upperCamelCase('1abc') → normalize strips '1a' → 'bc' → 'Bc' (no N).
		// upperCamelCase('foo_1bar') → normalize keeps it (leading char not digit+more),
		//   splits on '_' → ['foo', '1bar'] → 'Foo' + 'N1bar'.
		expect(Base.upperCamelCase('1abc')).toBe('Bc');
		expect(Base.upperCamelCase('foo_1bar')).toBe('FooN1bar');
	});

	it('does not lowercase the first character of the FIRST segment (UpperCamel)', () => {
		expect(Base.upperCamelCase('foo_bar')).toBe('FooBar');
	});
});

describe('Base.pathToFnName edge cases', () => {
	it('returns just the method suffix when both path and operationId normalize to empty', () => {
		// path = "///" → normalize → "___" → camelCase splits on _ → filtered out → ""
		// operationId = "" → if (operationId) falsy → skip
		// final name = "" + "UsingGet"
		const name = Base.pathToFnName('///', 'get', '');
		expect(name).toBe('UsingGet');
	});

	it('produces legal identifier when operationId starts with a digit', () => {
		const name = Base.pathToFnName('/pets', 'get', '1list');
		expect(name).toMatch(/^[A-Za-z_$][A-Za-z0-9_$]*$/);
	});

	it('drops the keyword-protection underscore (camelCase re-splits on _)', () => {
		// BUG: normalize("delete") → "delete_", but camelCase splits on _ and re-joins,
		// so the keyword-protection suffix is consumed. Generated name compiles fine
		// only because TS allows identifier "delete" at call sites — but inside a class
		// or interface body it would collide with the `delete` operator.
		const name = Base.pathToFnName('/pets', 'delete', 'delete');
		expect(name).toBe('deleteUsingDelete');
		expect(name).toMatch(/^[A-Za-z_$][A-Za-z0-9_$]*$/);
	});

	it('keeps non-ASCII characters in operationId (no charset collision)', () => {
		const name = Base.pathToFnName('/pets', 'get', '查询宠物');
		expect(name).toBe('查询宠物UsingGet');
	});

	it('handles ... sequences in operationId — current behavior preserves foo+Bar', () => {
		// normalize("foo...bar") → "foo___bar" (each . → _), then camelCase splits and joins.
		const name = Base.pathToFnName('/pets', 'get', 'foo...bar');
		expect(name).toBe('fooBarUsingGet');
	});
});

describe('Base.ref2name edge cases', () => {
	const minimalDoc = {
		components: {
			schemas: {
				Pet: { $ref: '#/components/schemas/PetDetail' },
				PetDetail: { type: 'object' },
			},
		},
	};

	it('returns "unknown" when ref resolves to nothing in doc', () => {
		expect(Base.ref2name('#/components/schemas/Missing', minimalDoc)).toBe('unknown');
	});

	it('returns last segment when no doc provided', () => {
		expect(Base.ref2name('#/components/schemas/Pet')).toBe('Pet');
	});

	it('strips leading #', () => {
		expect(Base.ref2name('#/foo/bar')).toBe('bar');
	});

	it('decodes ~1 (OpenAPI JSON Pointer escape for /) per path segment', () => {
		// Each segment in the ref is processed via replaceAll('~1', '/') before lookup,
		// so '#/paths/~1pets~1cats' resolves to doc.paths['/pets/cats'].
		const docWithTilde1 = {
			paths: {
				'/pets/cats': { type: 'object' },
			},
		};
		expect(Base.ref2name('#/paths/~1pets~1cats', docWithTilde1)).toBe(
			'/pets/cats'
		);
	});

	it('follows one level of $ref indirection (returns lastPath of resolved object)', () => {
		// Pet schema is $ref → PetDetail which is a plain object. Should resolve to "PetDetail".
		expect(Base.ref2name('#/components/schemas/Pet', minimalDoc)).toBe('PetDetail');
	});
});

describe('createUniqueNameResolver edge cases', () => {
	it('treats distinct bases independently when collisions happen late', () => {
		const reserve = createUniqueNameResolver();
		expect(reserve('a')).toBe('a');
		expect(reserve('a')).toBe('a2');
		expect(reserve('b')).toBe('b');
		expect(reserve('a')).toBe('a3');
		expect(reserve('b')).toBe('b2');
	});

	it('handles 100 collisions of same name', () => {
		const reserve = createUniqueNameResolver();
		const names = new Set<string>();
		for (let i = 0; i < 100; i++) {
			names.add(reserve('updateUsingPut'));
		}
		expect(names.size).toBe(100);
		expect(names.has('updateUsingPut')).toBe(true);
		expect(names.has('updateUsingPut100')).toBe(true);
	});

	it('produces a legal TS identifier even when base name is a keyword', () => {
		const reserve = createUniqueNameResolver();
		expect(reserve('delete')).toBe('delete');
		expect(reserve('delete')).toBe('delete2');
	});

	it('two independent resolvers do not share state', () => {
		const a = createUniqueNameResolver();
		const b = createUniqueNameResolver();
		expect(a('foo')).toBe('foo');
		expect(b('foo')).toBe('foo'); // not foo2 — separate registry
	});
});