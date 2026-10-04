import { createHash } from 'node:crypto';
import { readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { CodeGenResult } from '../openapi/index.js';

/**
 * Serialized form of a generated artifact, persisted to disk so we can
 * skip the OpenAPI parse + codegen pass on subsequent vite restarts when
 * nothing has changed.
 */
export interface CacheEntry {
	/** SHA-256 of the resolved options (everything except the spec content) */
	optionsHash: string;
	/** mtime of the spec file in milliseconds (or undefined for remote specs) */
	specMtimeMs: number | undefined;
	/** SHA-256 of the spec file content (or undefined for remote specs) */
	specContentHash: string | undefined;
	/** The generated code */
	code: string;
	/** Generation stats */
	stats: CodeGenResult['stats'];
}

/**
 * Cache for a single vite-plugin codegen run. Lives only for the duration
 * of one plugin invocation — there is no module-level state.
 *
 * Cache files are stored at:
 *
 *   <cacheDir>/<optionsHash>.json
 *
 * where `<cacheDir>` defaults to `node_modules/.cache/apicodegen` but can
 * be overridden via `cacheDir`.
 */
export class CodegenCache {
	private readonly cacheDir: string;

	constructor(cacheDir: string) {
		this.cacheDir = cacheDir;
	}

	/** Hash the options that affect generated output (excluding the spec). */
	static hashOptions(options: Record<string, unknown>): string {
		// Sort keys for stability.
		const keys = Object.keys(options).sort();
		const payload = keys
			.filter((k) => k !== 'verbose' && k !== 'typeCheck' && k !== 'cache')
			.map((k) => `${k}=${JSON.stringify(options[k])}`)
			.join('|');
		return createHash('sha256').update(payload).digest('hex').slice(0, 16);
	}

	/** Hash the raw spec content so unrelated edits are detected. */
	static hashContent(content: string): string {
		return createHash('sha256').update(content).digest('hex').slice(0, 16);
	}

	/**
	 * Look up a cached entry. Returns `null` on miss / corruption / disabled.
	 *
	 * @param optionsHash  Options hash from `hashOptions`.
	 * @param specSource   Resolved spec path or URL. Local paths use mtime +
	 *                     content hash; URLs always miss (no cache).
	 */
	async lookup(
		optionsHash: string,
		specSource: string
	): Promise<CacheEntry | null> {
		const cachePath = path.join(this.cacheDir, `${optionsHash}.json`);
		let raw: string;
		try {
			raw = await readFile(cachePath, 'utf8');
		} catch {
			return null;
		}

		let entry: CacheEntry;
		try {
			entry = JSON.parse(raw) as CacheEntry;
		} catch {
			return null;
		}

		if (entry.optionsHash !== optionsHash) return null;

		// Remote specs are not cached — too risky to assume the upstream
		// didn't change.
		const isRemote =
			specSource.startsWith('http://') || specSource.startsWith('https://');
		if (isRemote) return null;

		// Local spec: verify mtime + content hash.
		let currentMtimeMs: number | undefined;
		try {
			const st = await stat(specSource);
			currentMtimeMs = st.mtimeMs;
		} catch {
			return null;
		}
		if (currentMtimeMs !== entry.specMtimeMs) return null;

		if (entry.specContentHash) {
			let content: string;
			try {
				content = await readFile(specSource, 'utf8');
			} catch {
				return null;
			}
			if (CodegenCache.hashContent(content) !== entry.specContentHash) {
				return null;
			}
		}

		return entry;
	}

	/** Persist a successful codegen result. */
	async store(entry: CacheEntry): Promise<void> {
		const cachePath = path.join(this.cacheDir, `${entry.optionsHash}.json`);
		const dir = path.dirname(cachePath);
		await import('fs-extra').then((fs) => fs.ensureDir(dir));
		await writeFile(cachePath, JSON.stringify(entry));
	}
}
