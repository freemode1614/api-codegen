import { afterEach, describe, expect, it, vi } from 'vitest';
import {
	ApicodegenError,
	createErrors,
	ErrorCodes,
	formatError,
	isApicodegenError,
	wrapError,
} from '../src/core/errors.js';

describe('ApicodegenError', () => {
	describe('constructor', () => {
		it('should create error with all properties', () => {
			const error = new ApicodegenError({
				code: ErrorCodes.SPEC_NOT_FOUND,
				message: 'Spec not found',
				location: '/path/to/spec.json',
				line: 10,
				column: 5,
				path: '/paths/users',
				suggestions: ['Check path', 'Use valid path'],
				cause: new Error('Original error'),
			});

			expect(error.code).toBe('E_SPEC_NOT_FOUND');
			expect(error.message).toBe('Spec not found');
			expect(error.location).toBe('/path/to/spec.json');
			expect(error.line).toBe(10);
			expect(error.column).toBe(5);
			expect(error.path).toBe('/paths/users');
			expect(error.suggestions).toEqual(['Check path', 'Use valid path']);
			expect(error.cause).toBeInstanceOf(Error);
			expect(error.name).toBe('ApicodegenError');
		});

		it('should create error with minimal properties', () => {
			const error = new ApicodegenError({
				code: ErrorCodes.GENERATION_FAILED,
				message: 'Generation failed',
			});

			expect(error.code).toBe('E_GENERATION_FAILED');
			expect(error.message).toBe('Generation failed');
			expect(error.location).toBeUndefined();
			expect(error.suggestions).toEqual([]);
		});
	});

	describe('toString', () => {
		it('should format error with code and message', () => {
			const error = new ApicodegenError({
				code: ErrorCodes.SPEC_NOT_FOUND,
				message: 'OpenAPI spec file not found',
				location: './openapi.json',
			});

			const str = error.toString();
			expect(str).toContain('Error [E_SPEC_NOT_FOUND]');
			expect(str).toContain('OpenAPI spec file not found');
			expect(str).toContain('./openapi.json');
		});

		it('should include suggestions when present', () => {
			const error = new ApicodegenError({
				code: ErrorCodes.SPEC_NOT_FOUND,
				message: 'Spec not found',
				suggestions: ['Suggestion 1', 'Suggestion 2'],
			});

			const str = error.toString();
			expect(str).toContain('Suggestion 1');
			expect(str).toContain('Suggestion 2');
		});

		it('should include cause stack trace in verbose mode', () => {
			const error = new ApicodegenError({
				code: ErrorCodes.GENERATION_FAILED,
				message: 'Generation failed',
				cause: new Error('Original error'),
			});

			const str = error.toString(true);
			expect(str).toContain('Original Error');
		});

		it('should not include cause in non-verbose mode', () => {
			const error = new ApicodegenError({
				code: ErrorCodes.GENERATION_FAILED,
				message: 'Generation failed',
				cause: new Error('Original error'),
			});

			const str = error.toString(false);
			expect(str).not.toContain('Original Error');
		});
	});

	describe('toJSON', () => {
		it('should serialize to JSON object', () => {
			const error = new ApicodegenError({
				code: ErrorCodes.SPEC_PARSE_FAILED,
				message: 'Parse failed',
				location: './spec.json',
				line: 5,
				column: 3,
			});

			const json = error.toJSON();
			expect(json).toEqual({
				name: 'ApicodegenError',
				code: 'E_SPEC_PARSE_FAILED',
				message: 'Parse failed',
				location: './spec.json',
				line: 5,
				column: 3,
				path: undefined,
				suggestions: [],
				cause: undefined,
			});
		});
	});
});

describe('createErrors', () => {
	describe('specNotFound', () => {
		it('should create SPEC_NOT_FOUND error', () => {
			const error = createErrors.specNotFound('/path/to/spec.json');

			expect(error.code).toBe('E_SPEC_NOT_FOUND');
			expect(error.message).toBe('OpenAPI spec file not found');
			expect(error.location).toBe('/path/to/spec.json');
			expect(error.suggestions.length).toBeGreaterThan(0);
		});

		it('should include cause when provided', () => {
			const cause = new Error('File not found');
			const error = createErrors.specNotFound('/path/spec.json', cause);

			expect(error.cause).toBe(cause);
		});
	});

	describe('specFetchFailed', () => {
		it('should create SPEC_FETCH_FAILED error', () => {
			const error = createErrors.specFetchFailed('https://example.com/spec.json');

			expect(error.code).toBe('E_SPEC_FETCH_FAILED');
			expect(error.message).toContain('Failed to fetch');
			expect(error.location).toBe('https://example.com/spec.json');
		});

		it('should include status code in message when provided', () => {
			const error = createErrors.specFetchFailed(
				'https://example.com/spec.json',
				404
			);

			expect(error.message).toContain('HTTP 404');
		});
	});

	describe('specParseFailed', () => {
		it('should create SPEC_PARSE_FAILED error', () => {
			const error = createErrors.specParseFailed('./spec.json', 10, 5);

			expect(error.code).toBe('E_SPEC_PARSE_FAILED');
			expect(error.location).toBe('./spec.json');
			expect(error.line).toBe(10);
			expect(error.column).toBe(5);
		});
	});

	describe('generationFailed', () => {
		it('should create GENERATION_FAILED error', () => {
			const error = createErrors.generationFailed();

			expect(error.code).toBe('E_GENERATION_FAILED');
			expect(error.message).toBe('Code generation failed');
		});

		it('should include cause when provided', () => {
			const cause = new Error('Schema error');
			const error = createErrors.generationFailed(cause);

			expect(error.cause).toBe(cause);
		});
	});

	describe('validationFailed', () => {
		it('should create VALIDATION_FAILED error', () => {
			const error = createErrors.validationFailed(
				'/paths/users',
				'Missing required field'
			);

			expect(error.code).toBe('E_VALIDATION_FAILED');
			expect(error.location).toBe('/paths/users');
			expect(error.path).toBe('Missing required field');
		});
	});

	describe('typeCheckFailed', () => {
		it('should create TYPE_CHECK_FAILED error', () => {
			const error = createErrors.typeCheckFailed('/output.ts', [
				'Type mismatch',
				'Missing property',
			]);

			expect(error.code).toBe('E_TYPE_CHECK_FAILED');
			expect(error.message).toBe('TypeScript type check failed');
			expect(error.location).toBe('/output.ts');
		});
	});

	describe('missingRequiredField', () => {
		it('should create error for missing field', () => {
			const error = createErrors.missingRequiredField('spec');

			expect(error.code).toBe('E_VALIDATION_FAILED');
			expect(error.message).toContain('spec');
		});
	});
});

describe('wrapError', () => {
	it('should return ApicodegenError unchanged', () => {
		const original = createErrors.specNotFound('/spec.json');
		const wrapped = wrapError(original);

		expect(wrapped).toBe(original);
	});

	it('should wrap Error with context', () => {
		const error = new Error('Something went wrong');
		const wrapped = wrapError(error, {
			code: ErrorCodes.GENERATION_FAILED,
			message: 'Custom message',
		});

		expect(wrapped).toBeInstanceOf(ApicodegenError);
		expect(wrapped.code).toBe('E_GENERATION_FAILED');
		expect(wrapped.message).toBe('Custom message');
		expect(wrapped.cause).toBe(error);
	});

	it('should wrap non-Error with default context', () => {
		const wrapped = wrapError('Unknown error');

		expect(wrapped).toBeInstanceOf(ApicodegenError);
		expect(wrapped.message).toBe('Unknown error');
		expect(wrapped.code).toBe('E_GENERATION_FAILED');
	});
});

describe('isApicodegenError', () => {
	it('should return true for ApicodegenError', () => {
		const error = createErrors.specNotFound('/spec.json');
		expect(isApicodegenError(error)).toBe(true);
	});

	it('should return false for regular Error', () => {
		const error = new Error('Regular error');
		expect(isApicodegenError(error)).toBe(false);
	});

	it('should return false for non-Error', () => {
		expect(isApicodegenError('string')).toBe(false);
		expect(isApicodegenError(null)).toBe(false);
		expect(isApicodegenError(undefined)).toBe(false);
		expect(isApicodegenError({})).toBe(false);
	});
});

describe('formatError', () => {
	it('should format ApicodegenError', () => {
		const error = createErrors.specNotFound('/spec.json');
		const formatted = formatError(error);

		expect(formatted).toContain('Error [E_SPEC_NOT_FOUND]');
	});

	it('should format regular Error', () => {
		const error = new Error('Regular error message');
		const formatted = formatError(error);

		expect(formatted).toContain('Regular error message');
	});

	it('should format primitive values', () => {
		const formatted = formatError('Just a string');
		expect(formatted).toContain('Just a string');
	});
});