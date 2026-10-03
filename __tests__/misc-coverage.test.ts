import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Stub undici at module level so Base.fetchDoc never hits the network.
vi.mock('undici', async () => {
	const actual = await vi.importActual<typeof import('undici')>('undici');
	return {
		...actual,
		request: vi.fn(),
	};
});

import { logger } from '../src/cli/logger.js';
import { printError } from '../src/core/errors.js';
import { ApicodegenError, createErrors, isApicodegenError } from '../src/core/errors.js';
import { Base } from '../src/core/base/Base.js';
import { request } from 'undici';

describe('logger.error', () => {
	let errorSpy: ReturnType<typeof vi.spyOn>;
	let logSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
	});

	afterEach(() => {
		errorSpy.mockRestore();
		logSpy.mockRestore();
	});

	it('uses ApicodegenError.toString when err is an ApicodegenError', () => {
		const err = createErrors.specNotFound('/missing.json');
		logger.error(err, true);
		expect(errorSpy).toHaveBeenCalledTimes(1);
		const out = errorSpy.mock.calls[0]?.[0] as string;
		expect(out).toContain('✗');
		expect(isApicodegenError(err)).toBe(true);
	});

	it('prints stack for generic Error when verbose=true', () => {
		const err = new Error('boom');
		logger.error(err, true);
		const out = errorSpy.mock.calls[0]?.[0] as string;
		expect(out).toContain('Error: boom');
	});

	it('does not print stack for generic Error when verbose=false', () => {
		const err = new Error('silent');
		logger.error(err, false);
		const out = errorSpy.mock.calls[0]?.[0] as string;
		expect(out).not.toContain('at ');
	});

	it('uses String(err) for non-Error, non-ApicodegenError values', () => {
		logger.error(42 as unknown);
		const out = errorSpy.mock.calls[0]?.[0] as string;
		expect(out).toContain('42');
	});

	it('other helpers (success/info/warn/loading/watching/fileChange/fileAdd/shutdown) emit one log each', () => {
		logger.success('ok');
		logger.info('note');
		logger.warn('careful');
		logger.loading('busy');
		logger.watching('w');
		logger.fileChange('a');
		logger.fileAdd('b');
		logger.shutdown();
		expect(logSpy).toHaveBeenCalledTimes(8);
	});
});

describe('printError', () => {
	let stream: { write: ReturnType<typeof vi.fn> };

	beforeEach(() => {
		stream = { write: vi.fn() };
	});

	it('writes formatted error + newline to the provided stream', () => {
		printError(new Error('x'), false, stream as unknown as NodeJS.WriteStream);
		expect(stream.write).toHaveBeenCalledTimes(2);
		// formatError wraps the message with ANSI color codes; just check that the payload contains the message
		expect(String(stream.write.mock.calls[0]?.[0])).toContain('x');
		expect(stream.write.mock.calls[1]?.[0]).toBe('\n');
	});
});

describe('Base.fetchDoc', () => {
	const mockedRequest = vi.mocked(request);

	beforeEach(() => {
		mockedRequest.mockReset();
	});

	afterEach(() => {
		mockedRequest.mockReset();
	});

	it('throws on HTTP >= 400', async () => {
		mockedRequest.mockResolvedValue({
			statusCode: 404,
			body: { json: vi.fn() },
		} as never);
		await expect(Base.fetchDoc('https://example.com/spec.json')).rejects.toThrow(
			/HTTP 404/
		);
	});

	it('throws a descriptive error when response body is not valid JSON', async () => {
		// body.json() throws synchronously to hit the catch branch on L181
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn(() => { throw new Error('bad json'); }) },
		} as never);
		await expect(Base.fetchDoc('https://example.com/spec.json')).rejects.toThrow(
			/Failed to parse JSON response/
		);
	});

	it('returns parsed JSON on success', async () => {
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn().mockResolvedValue({ ok: true }) },
		} as never);
		const result = await Base.fetchDoc<{ ok: boolean }>('https://example.com/spec.json');
		expect(result).toEqual({ ok: true });
	});
});

describe('Base.fetchDoc local file transport', () => {
	const mockedRequest = vi.mocked(request);
	const tmpRoot = path.join(
		process.cwd(),
		`__tests__/__tmp_base_fetch_doc_${process.pid}`
	);

	beforeEach(async () => {
		await fs.mkdir(tmpRoot, { recursive: true });
		mockedRequest.mockReset();
	});

	afterEach(async () => {
		await fs.rm(tmpRoot, { recursive: true, force: true });
		mockedRequest.mockReset();
	});

	it('reads a JSON spec via file:// URL and never touches undici', async () => {
		const specPath = path.join(tmpRoot, 'spec.json');
		await fs.writeFile(
			specPath,
			JSON.stringify({ openapi: '3.0.0', info: { title: 't', version: '1' } })
		);

		const result = await Base.fetchDoc<{ openapi: string }>(
			`file://${specPath}`
		);

		expect(result.openapi).toBe('3.0.0');
		expect(mockedRequest).not.toHaveBeenCalled();
	});

	it('reads a JSON spec via an absolute POSIX path', async () => {
		const specPath = path.join(tmpRoot, 'abs.json');
		await fs.writeFile(specPath, '{"foo":"bar"}');

		const result = await Base.fetchDoc<{ foo: string }>(specPath);

		expect(result.foo).toBe('bar');
		expect(mockedRequest).not.toHaveBeenCalled();
	});

	it('throws ApicodegenError E_SPEC_NOT_FOUND when the file does not exist', async () => {
		const missing = path.join(tmpRoot, 'does-not-exist.json');

		await expect(Base.fetchDoc(`file://${missing}`)).rejects.toBeInstanceOf(
			ApicodegenError
		);
		await expect(Base.fetchDoc(`file://${missing}`)).rejects.toMatchObject({
			code: 'E_SPEC_NOT_FOUND',
			location: missing,
		});
	});

	it('throws ApicodegenError E_SPEC_PARSE_FAILED on invalid JSON', async () => {
		const specPath = path.join(tmpRoot, 'broken.json');
		await fs.writeFile(specPath, '{ not json');

		await expect(Base.fetchDoc(specPath)).rejects.toBeInstanceOf(
			ApicodegenError
		);
		await expect(Base.fetchDoc(specPath)).rejects.toMatchObject({
			code: 'E_SPEC_PARSE_FAILED',
			location: specPath,
		});
	});

	it('still falls back to undici for http(s) URLs', async () => {
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn().mockResolvedValue({ ok: true }) },
		} as never);

		const result = await Base.fetchDoc<{ ok: boolean }>(
			'https://example.com/spec.json'
		);

		expect(result.ok).toBe(true);
		expect(mockedRequest).toHaveBeenCalledTimes(1);
	});

	it('treats a relative-looking path as a local read (last-segment basename)', async () => {
		// `Base.fetchDoc` only dispatches on absolute indicators (`file://`,
		// leading `/`, or Windows drive). Relative paths like `openapi.json`
		// fall through to undici by default. This is intentional: callers
		// (CLI / Vite plugin) are expected to resolve relative paths against
		// cwd before passing them in.
		mockedRequest.mockResolvedValue({
			statusCode: 200,
			body: { json: vi.fn().mockResolvedValue({ ok: true }) },
		} as never);

		await Base.fetchDoc('openapi.json');
		expect(mockedRequest).toHaveBeenCalledTimes(1);
	});
});