import { describe, expect, it } from 'vitest';
import { Base } from '../src/core/base/Base.js';
import { MediaTypes } from '../src/core/interface.js';

describe('Base.normalize', () => {
	it('appends _ to TypeScript reserved keywords', () => {
		expect(Base.normalize('type')).toBe('type_');
		expect(Base.normalize('class')).toBe('class_');
		expect(Base.normalize('return')).toBe('return_');
		expect(Base.normalize('interface')).toBe('interface_');
	});

	it('replaces /, -, {, }, :, ., etc. with _', () => {
		expect(Base.normalize('/pets/{petId}')).toBe('_pets__petId_');
		expect(Base.normalize('user-name')).toBe('user_name');
		expect(Base.normalize('foo.bar')).toBe('foo_bar');
		expect(Base.normalize('a:b')).toBe('a_b');
	});

	it('replaces backticks, commas, parens, $, #, <, >, * and whitespace', () => {
		expect(Base.normalize('a b')).toBe('a_b');
		expect(Base.normalize('(x)')).toBe('_x_');
		expect(Base.normalize('a,b')).toBe('a_b');
		expect(Base.normalize('a`b')).toBe('a_b');
		expect(Base.normalize('a*b')).toBe('a_b');
		expect(Base.normalize('a<b>c')).toBe('a_b_c');
		expect(Base.normalize('a#b')).toBe('a_b');
		expect(Base.normalize('a$b')).toBe('a_b');
	});

	it('removes leading "<digit>." pattern', () => {
		expect(Base.normalize('1.foo')).toBe('foo');
	});

	it('removes "..." spread tokens when dots are not in the special-char set', () => {
		// Note: `.` is in the special-char set, so each `.` becomes `_` first.
		// `replaceAll('...', '')` runs after, so it has no effect on `...` itself.
		// The behavior is documented: `foo...bar` -> `foo___bar`.
		expect(Base.normalize('foo...bar')).toBe('foo___bar');
	});
});

describe('Base.camelCase', () => {
	it('strips leading digit segments', () => {
		expect(Base.camelCase('1_user_name')).toBe('userName');
		expect(Base.camelCase('9_lives')).toBe('lives');
	});

	it('camelCases snake_case input', () => {
		expect(Base.camelCase('user_profile')).toBe('userProfile');
		expect(Base.camelCase('foo_bar_baz')).toBe('fooBarBaz');
	});

	it('returns single segment as-is', () => {
		expect(Base.camelCase('user')).toBe('user');
	});

	it('returns empty string for input with no valid segments', () => {
		expect(Base.camelCase('_')).toBe('');
		expect(Base.camelCase('___')).toBe('');
	});
});

describe('Base.upperCamelCase', () => {
	it('uppercases first letter of every segment', () => {
		expect(Base.upperCamelCase('user_profile')).toBe('UserProfile');
		expect(Base.upperCamelCase('foo_bar_baz')).toBe('FooBarBaz');
	});

	it('keeps single segment capitalized', () => {
		expect(Base.upperCamelCase('user')).toBe('User');
	});

	it('normalizes and capitalizes in one pass', () => {
		expect(Base.upperCamelCase('user-profile')).toBe('UserProfile');
	});
});

describe('Base.capitalize', () => {
	it('uppercases the first character', () => {
		expect(Base.capitalize('hello')).toBe('Hello');
	});

	it('trims whitespace before uppercasing', () => {
		expect(Base.capitalize('  hello')).toBe('Hello');
		expect(Base.capitalize('hello  ')).toBe('Hello');
	});

	it('leaves already-uppercased strings alone', () => {
		expect(Base.capitalize('Hello')).toBe('Hello');
	});
});

describe('Base.isRef', () => {
	it('returns true for object with string $ref', () => {
		expect(Base.isRef({ $ref: '#/components/schemas/Pet' })).toBe(true);
	});

	it('returns false for null', () => {
		expect(Base.isRef(null)).toBe(false);
	});

	it('returns false for array', () => {
		expect(Base.isRef([])).toBe(false);
		expect(Base.isRef(['$ref'])).toBe(false);
	});

	it('returns false for string', () => {
		expect(Base.isRef('#/components/schemas/Pet')).toBe(false);
	});

	it('returns false for object without $ref', () => {
		expect(Base.isRef({})).toBe(false);
		expect(Base.isRef({ type: 'object' })).toBe(false);
	});

	it('returns false when $ref is not a string', () => {
		expect(Base.isRef({ $ref: 42 })).toBe(false);
		expect(Base.isRef({ $ref: null })).toBe(false);
	});
});

describe('Base.isValidEnumType', () => {
	it('returns false for boolean type', () => {
		expect(Base.isValidEnumType({ type: 'boolean' })).toBe(false);
	});

	it('returns true for non-boolean type with enum', () => {
		expect(Base.isValidEnumType({ type: 'string', enum: ['a', 'b'] })).toBe(true);
	});

	it('returns false for boolean enum', () => {
		expect(
			Base.isValidEnumType({ type: 'string', enum: [true, false] } as unknown as {
				type: string;
				enum: (string | number)[];
			})
		).toBe(false);
	});
});

describe('Base.isBooleanEnum', () => {
	it('returns true when type is boolean', () => {
		expect(Base.isBooleanEnum({ type: 'boolean' })).toBe(true);
	});

	it('returns true when enum contains boolean members', () => {
		expect(
			Base.isBooleanEnum({ type: 'string', enum: [true, false] } as unknown as {
				type: string;
				enum: (string | number)[];
			})
		).toBe(true);
	});

	it('returns false otherwise', () => {
		expect(Base.isBooleanEnum({ type: 'string' })).toBe(false);
		expect(Base.isBooleanEnum({ type: 'string', enum: ['a', 'b'] })).toBe(false);
	});
});

describe('Base.findSameSchema', () => {
	const enumA = { name: 'A', enum: ['x', 'y'] };

	it('returns matching enum', () => {
		const result = Base.findSameSchema(enumA, [
			{ name: 'B', enum: ['p', 'q'] },
			enumA,
		]);
		expect(result).toBe(enumA);
	});

	it('matches regardless of enum member order', () => {
		const result = Base.findSameSchema(
			{ name: 'Z', enum: ['y', 'x'] },
			[{ name: 'A', enum: ['x', 'y'] }]
		);
		expect(result?.name).toBe('A');
	});

	it('returns undefined when no match', () => {
		expect(
			Base.findSameSchema(enumA, [{ name: 'B', enum: ['p', 'q'] }])
		).toBeUndefined();
	});
});

describe('Base.uniqueEnums', () => {
	it('passes through a single enum', () => {
		const result = Base.uniqueEnums([{ name: 'A', enum: ['x'] }]);
		expect(result).toEqual([{ name: 'A', enum: ['x'] }]);
	});

	it('merges enums with the same name', () => {
		const result = Base.uniqueEnums([
			{ name: 'A', enum: ['x', 'y'] },
			{ name: 'A', enum: ['z'] },
		]);
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('A');
		expect(new Set(result[0].enum)).toEqual(new Set(['x', 'y', 'z']));
	});

	it('keeps enums with different names distinct', () => {
		const result = Base.uniqueEnums([
			{ name: 'A', enum: ['x'] },
			{ name: 'B', enum: ['y'] },
		]);
		expect(result).toHaveLength(2);
	});
});

describe('Base.ref2name', () => {
	it('returns last path segment when no doc is provided', () => {
		expect(Base.ref2name('#/components/schemas/Pet')).toBe('Pet');
		expect(Base.ref2name('#/components/parameters/userId')).toBe('userId');
	});

	it('returns last segment of plain string', () => {
		expect(Base.ref2name('Pet')).toBe('Pet');
	});

	it('returns "unknown" when ref path does not resolve in the doc', () => {
		const doc = { components: { schemas: { Pet: { type: 'object' } } } };
		expect(Base.ref2name('#/components/schemas/Missing', doc)).toBe('unknown');
	});

	it('resolves nested ref in doc', () => {
		const doc = { components: { schemas: { Pet: { type: 'object' } } } };
		expect(Base.ref2name('#/components/schemas/Pet', doc)).toBe('Pet');
	});

	it('decodes ~1 JSON Pointer escape to /', () => {
		const doc = { paths: { '/foo/bar': { get: {} } } };
		expect(Base.ref2name('#/paths/~1foo~1bar', doc)).toBe('/foo/bar');
	});
});

describe('Base.getMediaType', () => {
	it('matches application/json', () => {
		expect(Base.getMediaType('application/json')).toBe(MediaTypes.JSON);
	});

	it('matches image/*', () => {
		expect(Base.getMediaType('image/png')).toBe(MediaTypes.IMAGE);
		expect(Base.getMediaType('image/jpeg')).toBe(MediaTypes.IMAGE);
	});

	it('matches text/*', () => {
		expect(Base.getMediaType('text/plain')).toBe(MediaTypes.TEXT);
	});

	it('returns undefined for unknown types', () => {
		expect(Base.getMediaType('application/octet-stream')).toBeUndefined();
		expect(Base.getMediaType('foo/bar')).toBeUndefined();
	});
});

describe('Base.pathToFnName', () => {
	it('generates name from path and method', () => {
		expect(Base.pathToFnName('/pets/{petId}', 'get')).toBe('petsPetIdUsingGet');
	});

	it('returns just the path when no method is provided', () => {
		expect(Base.pathToFnName('/users')).toBe('users');
	});
});
