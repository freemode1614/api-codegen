import { describe, it, expect } from 'vitest';
import { Base } from '../src/core/base/Base.js';
import { createUniqueNameResolver } from '../src/core/generator/naming.js';

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