import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { Base } from '../src/core/base/Base.js';

describe('Base.resolveSpecURL', () => {
	it('classifies http:// URLs as http transport', () => {
		const r = Base.resolveSpecURL('http://example.com/spec.json');
		expect(r).toEqual({ transport: 'http', source: 'http://example.com/spec.json' });
	});

	it('classifies https:// URLs as http transport', () => {
		const r = Base.resolveSpecURL('https://example.com/spec.json');
		expect(r).toEqual({
			transport: 'http',
			source: 'https://example.com/spec.json',
		});
	});

	it('classifies file:// URLs as file transport and strips the scheme', () => {
		const r = Base.resolveSpecURL('file:///abs/path/spec.json');
		expect(r).toEqual({ transport: 'file', source: '/abs/path/spec.json' });
	});

	it('classifies Windows-style file:// URLs as file transport', () => {
		const r = Base.resolveSpecURL('file:///C:/spec.json');
		expect(r).toEqual({ transport: 'file', source: 'C:/spec.json' });
	});

	it('classifies POSIX absolute paths as file transport', () => {
		const r = Base.resolveSpecURL('/abs/path/spec.json');
		expect(r).toEqual({ transport: 'file', source: '/abs/path/spec.json' });
	});

	it('classifies Windows absolute paths as file transport', () => {
		expect(Base.resolveSpecURL('C:\\spec.json')).toEqual({
			transport: 'file',
			source: 'C:\\spec.json',
		});
		expect(Base.resolveSpecURL('C:/spec.json')).toEqual({
			transport: 'file',
			source: 'C:/spec.json',
		});
	});

	it('classifies relative paths as http transport (caller must resolve)', () => {
		const r = Base.resolveSpecURL('openapi.json');
		expect(r).toEqual({ transport: 'http', source: 'openapi.json' });
	});

	it('uses absolute paths verbatim (does not path.resolve on Windows drive letters)', () => {
		// Defensive: make sure Windows-style strings are not mangled.
		const r = Base.resolveSpecURL('D:\\projects\\api\\spec.json');
		expect(r.transport).toBe('file');
		expect(r.source).toBe('D:\\projects\\api\\spec.json');
	});

	it('returns the same instance shape on repeated calls (no shared state)', () => {
		const a = Base.resolveSpecURL('/a/b.json');
		const b = Base.resolveSpecURL('/c/d.json');
		expect(a).toEqual({ transport: 'file', source: '/a/b.json' });
		expect(b).toEqual({ transport: 'file', source: '/c/d.json' });
	});
});

describe('CLI spec path resolution (smoke)', () => {
	// We don't import the CLI directly (it has commander wiring that requires
	// argv parsing). Instead, mirror the same logic and assert the resolved
	// values that flow into codeGen.docURL for the typical CLI invocations.

	function resolveDocURL(docURL: string, baseURL?: string): string {
		if (docURL.startsWith('http://') || docURL.startsWith('https://')) {
			return docURL;
		}
		if (docURL.startsWith('/') || /^[A-Za-z]:[\\/]/.test(docURL)) {
			return docURL;
		}
		if (baseURL) {
			return new URL(docURL, baseURL).href;
		}
		return path.resolve(process.cwd(), docURL);
	}

	it('passes absolute paths through to the file transport', () => {
		const abs = path.resolve(process.cwd(), 'docs/openapi.json');
		expect(resolveDocURL(abs)).toBe(abs);
		expect(Base.resolveSpecURL(resolveDocURL(abs))).toEqual({
			transport: 'file',
			source: abs,
		});
	});

	it('resolves relative paths against cwd before passing to the file transport', () => {
		const resolved = resolveDocURL('./docs/openapi.json');
		expect(path.isAbsolute(resolved)).toBe(true);
		expect(Base.resolveSpecURL(resolved).transport).toBe('file');
	});

	it('keeps remote URLs untouched', () => {
		const url = 'https://api.example.com/openapi.json';
		expect(resolveDocURL(url)).toBe(url);
		expect(Base.resolveSpecURL(resolveDocURL(url)).transport).toBe('http');
	});
});
