import { describe, it, expect } from 'vitest';
import {
	ApicodegenError,
	ErrorCodes,
	createErrors,
	formatError,
	isApicodegenError,
	wrapError,
} from '../src/core/errors.js';

/**
 * Edge-case sweep for errors module. Locks current behavior with inline
 * "BUG:" notes where the implementation looks wrong, so any future change
 * to fix the bug will surface immediately in this file.
 */

describe('ApicodegenError.toString edge cases', () => {
	it('verbose=false does NOT include stack trace even when cause exists', () => {
		const cause = new Error('underlying');
		const err = createErrors.generationFailed(cause);
		const out = err.toString(false);
		expect(out).not.toContain('Original Error:');
		expect(out).not.toContain(cause.stack?.split('\n')[0] ?? '__NO_STACK__');
	});

	it('verbose=true with a plain Error cause includes original message', () => {
		const cause = new Error('underlying cause msg');
		const err = createErrors.generationFailed(cause);
		const out = err.toString(true);
		expect(out).toContain('Original Error:');
		expect(out).toContain('underlying cause msg');
	});

	it('verbose=true with no cause skips Original Error section', () => {
		const err = createErrors.generationFailed();
		const out = err.toString(true);
		expect(out).not.toContain('Original Error:');
	});

	it('renders both Line and Column when both provided', () => {
		const err = createErrors.specParseFailed('/x.json', 42, 7);
		const out = err.toString();
		expect(out).toContain('Line:');
		expect(out).toContain('42');
		expect(out).toContain('Column:');
		expect(out).toContain('7');
	});

	it('renders only Line when column is undefined', () => {
		const err = createErrors.specParseFailed('/x.json', 42);
		const out = err.toString();
		expect(out).toContain('Line:');
		expect(out).not.toContain('Column:');
	});
});

describe('ApicodegenError.toJSON', () => {
	it('serializes cause as message string only (not the full Error)', () => {
		// BUG (low risk): toJSON drops the cause Error and only keeps .message.
		// Means a JSON round-trip can't reconstruct the original Error stack.
		const cause = new Error('inner');
		const err = createErrors.generationFailed(cause);
		const json = err.toJSON() as Record<string, unknown>;
		expect(json.cause).toBe('inner');
		expect(json.cause).not.toBeInstanceOf(Error);
	});

	it('serializes missing cause as undefined', () => {
		const err = createErrors.generationFailed();
		const json = err.toJSON() as Record<string, unknown>;
		expect(json.cause).toBeUndefined();
	});
});

describe('ApicodegenError is still instanceof Error', () => {
	it('passes instanceof Error check', () => {
		const err = createErrors.specNotFound('/x');
		expect(err).toBeInstanceOf(Error);
		expect(err).toBeInstanceOf(ApicodegenError);
		expect(err.name).toBe('ApicodegenError');
	});
});

describe('formatError edge cases', () => {
	it('handles null', () => {
		// String(null) === 'null'
		expect(formatError(null)).toContain('null');
	});

	it('handles undefined', () => {
		expect(formatError(undefined)).toContain('undefined');
	});

	it('handles a plain string throw', () => {
		expect(formatError('boom')).toContain('boom');
	});

	it('handles a number', () => {
		expect(formatError(42)).toContain('42');
	});

	it('handles a plain object', () => {
		const out = formatError({ message: 'oops' });
		// String(obj) → '[object Object]'
		expect(out).toContain('[object Object]');
	});

	it('formats a generic Error with optional stack when verbose=true', () => {
		const err = new Error('generic');
		const out = formatError(err, true);
		expect(out).toContain('generic');
		// Stack trace lines start with '    at '
		expect(out).toContain('at ');
	});

	it('does NOT include stack when verbose=false on generic Error', () => {
		const err = new Error('generic');
		const out = formatError(err, false);
		expect(out).not.toContain('at ');
	});

	it('delegates to ApicodegenError.toString when input is one', () => {
		const apierr = createErrors.specNotFound('/missing');
		const out = formatError(apierr);
		// contains the code prefix and the message
		expect(out).toContain(ErrorCodes.SPEC_NOT_FOUND);
		expect(out).toContain('OpenAPI spec file not found');
	});
});

describe('wrapError edge cases', () => {
	it('returns the same instance when input is already an ApicodegenError', () => {
		const apierr = createErrors.specNotFound('/x');
		const wrapped = wrapError(apierr);
		expect(wrapped).toBe(apierr); // identity preserved
	});

	it('wraps a plain Error with GENERATION_FAILED default code', () => {
		const e = new Error('inner');
		const wrapped = wrapError(e);
		expect(wrapped.code).toBe(ErrorCodes.GENERATION_FAILED);
		expect(wrapped.message).toBe('inner');
		expect(wrapped.cause).toBe(e);
	});

	it('context.code overrides default code', () => {
		const e = new Error('inner');
		const wrapped = wrapError(e, { code: ErrorCodes.CONFIG_INVALID });
		expect(wrapped.code).toBe(ErrorCodes.CONFIG_INVALID);
	});

	it('context.message overrides the wrapped error message', () => {
		const e = new Error('inner');
		const wrapped = wrapError(e, { message: 'outer' });
		expect(wrapped.message).toBe('outer');
		expect(wrapped.cause).toBe(e);
	});

	it('wraps a string via String()', () => {
		const wrapped = wrapError('boom');
		expect(wrapped.message).toBe('boom');
		expect(wrapped.code).toBe(ErrorCodes.GENERATION_FAILED);
	});

	it('wraps null via String() ("null")', () => {
		const wrapped = wrapError(null);
		expect(wrapped.message).toBe('null');
	});

	it('wraps undefined via String() ("undefined")', () => {
		const wrapped = wrapError(undefined);
		expect(wrapped.message).toBe('undefined');
	});

	it('does NOT include location when context omits it', () => {
		const wrapped = wrapError(new Error('inner'));
		expect(wrapped.location).toBeUndefined();
	});
});

describe('isApicodegenError', () => {
	it('returns true for ApicodegenError instance', () => {
		expect(isApicodegenError(createErrors.specNotFound('/x'))).toBe(true);
	});

	it('returns false for plain Error', () => {
		expect(isApicodegenError(new Error('x'))).toBe(false);
	});

	it('returns false for string', () => {
		expect(isApicodegenError('x')).toBe(false);
	});

	it('returns false for null/undefined', () => {
		expect(isApicodegenError(null)).toBe(false);
		expect(isApicodegenError(undefined)).toBe(false);
	});

	it('returns false for plain object that looks similar', () => {
		const fake = { name: 'ApicodegenError', code: 'X', message: 'y' };
		expect(isApicodegenError(fake)).toBe(false);
	});
});

describe('createErrors.typeCheckFailed', () => {
	it('surfaces _errors in suggestions (after fix)', () => {
		// After fix: typeCheckFailed includes the error lines in suggestions
		// so callers can see what failed.
		const err = createErrors.typeCheckFailed('/out.ts', ['error1', 'error2']);
		expect(err.code).toBe(ErrorCodes.TYPE_CHECK_FAILED);
		expect(err.location).toBe('/out.ts');
		expect(err.suggestions).toContain('error1');
		expect(err.suggestions).toContain('error2');
	});
});

describe('createErrors.missingRequiredField', () => {
	it('uses VALIDATION_FAILED code (re-uses it for missing config fields)', () => {
		const err = createErrors.missingRequiredField('apiKey');
		expect(err.code).toBe(ErrorCodes.VALIDATION_FAILED);
		expect(err.message).toContain('apiKey');
		expect(err.suggestions.length).toBeGreaterThan(0);
	});

	it('attaches optional context to path field', () => {
		const err = createErrors.missingRequiredField('url', '/spec/foo.json');
		expect(err.path).toBe('/spec/foo.json');
	});
});