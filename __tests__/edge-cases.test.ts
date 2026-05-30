import { describe, it, expect } from 'vitest';
import {
	createErrors,
	ApicodegenError,
	wrapError,
	isApicodegenError,
	formatError,
} from '../src/core/errors.js';

describe('createErrors edge cases', () => {
	describe('specNotFound', () => {
		it('should create error with all suggestions', () => {
			const error = createErrors.specNotFound('/path', new Error('ENOENT'));
			expect(error.suggestions.length).toBe(3);
			expect(error.cause).toBeInstanceOf(Error);
		});

		it('should create error without cause', () => {
			const error = createErrors.specNotFound('/path');
			expect(error.cause).toBeUndefined();
			expect(error.suggestions.length).toBe(3);
		});
	});

	describe('specFetchFailed', () => {
		it('should create error with status code', () => {
			const error = createErrors.specFetchFailed(
				'https://example.com/spec.json',
				404
			);
			expect(error.code).toBe('E_SPEC_FETCH_FAILED');
			expect(error.message).toContain('HTTP 404');
			expect(error.location).toBe('https://example.com/spec.json');
		});

		it('should create error without status code', () => {
			const error = createErrors.specFetchFailed('https://example.com/spec.json');
			expect(error.message).toBe('Failed to fetch OpenAPI spec from URL');
		});

		it('should create error with cause', () => {
			const cause = new Error('Network error');
			const error = createErrors.specFetchFailed(
				'https://example.com/spec.json',
				undefined,
				cause
			);
			expect(error.cause).toBe(cause);
		});
	});

	describe('specParseFailed', () => {
		it('should create error with line and column', () => {
			const error = createErrors.specParseFailed('/spec.json', 10, 5);
			expect(error.code).toBe('E_SPEC_PARSE_FAILED');
			expect(error.line).toBe(10);
			expect(error.column).toBe(5);
			expect(error.location).toBe('/spec.json');
		});

		it('should create error with all suggestions', () => {
			const error = createErrors.specParseFailed('/spec.json', 10, 5);
			expect(error.suggestions.length).toBe(3);
		});

		it('should create error without line/column', () => {
			const error = createErrors.specParseFailed('/spec.json');
			expect(error.line).toBeUndefined();
			expect(error.column).toBeUndefined();
		});
	});

	describe('outputDirMissing', () => {
		it('should create error with suggestions', () => {
			const error = createErrors.outputDirMissing('/output/dir');
			expect(error.code).toBe('E_OUTPUT_DIR_MISSING');
			expect(error.suggestions.length).toBe(2);
			expect(error.location).toBe('/output/dir');
		});

		it('should create error with cause', () => {
			const cause = new Error('Permission denied');
			const error = createErrors.outputDirMissing('/output/dir', cause);
			expect(error.cause).toBe(cause);
		});
	});

	describe('configInvalid', () => {
		it('should create error for invalid config', () => {
			const error = createErrors.configInvalid('/config.json');
			expect(error.code).toBe('E_CONFIG_INVALID');
			expect(error.location).toBe('/config.json');
		});

		it('should include suggestions', () => {
			const error = createErrors.configInvalid('/config.json');
			expect(error.suggestions.length).toBe(2);
		});
	});

	describe('validationFailed', () => {
		it('should create error with path and details', () => {
			const error = createErrors.validationFailed(
				'/paths/users',
				'Missing required field'
			);
			expect(error.code).toBe('E_VALIDATION_FAILED');
			expect(error.path).toBe('Missing required field');
			expect(error.location).toBe('/paths/users');
		});

		it('should include cause', () => {
			const cause = new Error('Invalid schema');
			const error = createErrors.validationFailed(
				'/paths/users',
				'Missing required field',
				cause
			);
			expect(error.cause).toBe(cause);
		});
	});

	describe('generationFailed', () => {
		it('should create error without cause', () => {
			const error = createErrors.generationFailed();
			expect(error.code).toBe('E_GENERATION_FAILED');
			expect(error.cause).toBeUndefined();
		});

		it('should create error with cause', () => {
			const cause = new Error('Schema error');
			const error = createErrors.generationFailed(cause);
			expect(error.cause).toBe(cause);
		});

		it('should include suggestions', () => {
			const error = createErrors.generationFailed();
			expect(error.suggestions.length).toBe(3);
		});
	});

	describe('typeCheckFailed', () => {
		it('should create error with multiple type errors', () => {
			const errors = ['Error 1', 'Error 2', 'Error 3'];
			const error = createErrors.typeCheckFailed('/output.ts', errors);
			expect(error.code).toBe('E_TYPE_CHECK_FAILED');
			expect(error.location).toBe('/output.ts');
		});

		it('should create error with cause', () => {
			const cause = new Error('tsc error');
			const error = createErrors.typeCheckFailed('/output.ts', [], cause);
			expect(error.cause).toBe(cause);
		});
	});

	describe('missingRequiredField', () => {
		it('should create error for missing field', () => {
			const error = createErrors.missingRequiredField('spec');
			expect(error.code).toBe('E_VALIDATION_FAILED');
			expect(error.message).toContain('spec');
		});

		it('should create error with context', () => {
			const error = createErrors.missingRequiredField('output', '/config');
			expect(error.path).toBe('/config');
		});

		it('should include suggestion', () => {
			const error = createErrors.missingRequiredField('baseURL');
			expect(error.suggestions.length).toBe(1);
			expect(error.suggestions[0]).toContain('baseURL');
		});
	});
});

describe('ApicodegenError edge cases', () => {
	describe('toString', () => {
		it('should format with all fields', () => {
			const error = new ApicodegenError({
				code: 'E_SPEC_PARSE_FAILED',
				message: 'Parse failed',
				location: '/spec.json',
				line: 5,
				column: 10,
				path: '/paths/users',
				suggestions: ['Fix syntax', 'Check format'],
			});

			const str = error.toString();
			expect(str).toContain('Error [E_SPEC_PARSE_FAILED]');
			expect(str).toContain('Parse failed');
			expect(str).toContain('/spec.json');
			expect(str).toContain('Line:');
			expect(str).toContain('Column:');
			expect(str).toContain('Fix syntax');
		});

		it('should handle missing optional fields', () => {
			const error = new ApicodegenError({
				code: 'E_GENERATION_FAILED',
				message: 'Gen failed',
			});

			const str = error.toString();
			expect(str).toContain('Gen failed');
			expect(str).not.toContain('Location:');
			expect(str).not.toContain('Suggestion:');
		});
	});

	describe('toJSON', () => {
		it('should serialize all fields', () => {
			const error = new ApicodegenError({
				code: 'E_SPEC_NOT_FOUND',
				message: 'Not found',
				location: '/spec.json',
				line: 1,
				column: 1,
				path: '/paths',
				suggestions: ['Check path'],
				cause: new Error('Original'),
			});

			const json = error.toJSON();
			expect(json).toEqual({
				name: 'ApicodegenError',
				code: 'E_SPEC_NOT_FOUND',
				message: 'Not found',
				location: '/spec.json',
				line: 1,
				column: 1,
				path: '/paths',
				suggestions: ['Check path'],
				cause: 'Original',
			});
		});
	});
});

describe('wrapError edge cases', () => {
	it('should preserve ApicodegenError', () => {
		const original = createErrors.specNotFound('/spec.json');
		const wrapped = wrapError(original);
		expect(wrapped).toBe(original);
	});

	it('should wrap Error with partial context', () => {
		const error = new Error('Original');
		const wrapped = wrapError(error, { message: 'Custom' });
		expect(wrapped.message).toBe('Custom');
		expect(wrapped.cause).toBe(error);
	});

	it('should wrap non-Error with defaults', () => {
		const wrapped = wrapError(123);
		expect(wrapped).toBeInstanceOf(ApicodegenError);
		expect(wrapped.message).toBe('123');
	});

	it('should handle null', () => {
		const wrapped = wrapError(null as unknown as string);
		expect(wrapped.message).toBe('null');
	});

	it('should handle undefined', () => {
		const wrapped = wrapError(undefined as unknown as string);
		expect(wrapped.message).toBe('undefined');
	});

	it('should handle object without message', () => {
		const wrapped = wrapError({} as unknown as string);
		expect(wrapped).toBeInstanceOf(ApicodegenError);
	});
});

describe('isApicodegenError edge cases', () => {
	it('should return true for ApicodegenError subclass', () => {
		class CustomError extends ApicodegenError {
			constructor() {
				super({ code: 'E_GENERATION_FAILED', message: 'Custom' });
			}
		}
		expect(isApicodegenError(new CustomError())).toBe(true);
	});

	it('should return false for string', () => {
		expect(isApicodegenError('error string')).toBe(false);
	});

	it('should return false for number', () => {
		expect(isApicodegenError(0)).toBe(false);
	});

	it('should return false for array', () => {
		expect(isApicodegenError([])).toBe(false);
	});

	it('should return false for object without prototype', () => {
		const obj = Object.create(null);
		expect(isApicodegenError(obj)).toBe(false);
	});
});

describe('formatError edge cases', () => {
	it('should format Error with stack', () => {
		const error = new Error('Test error');
		const formatted = formatError(error, true);
		expect(formatted).toContain('Test error');
	});

	it('should format Error without stack in non-verbose', () => {
		const error = new Error('Test error');
		const formatted = formatError(error, false);
		expect(formatted).toContain('Test error');
		expect(formatted).not.toContain('at ');
	});

	it('should format null as string', () => {
		const formatted = formatError(null as unknown);
		expect(formatted).toContain('null');
	});

	it('should format object as string', () => {
		const formatted = formatError({ message: 'test' } as unknown);
		expect(formatted).toContain('[object Object]');
	});
});