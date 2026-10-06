/**
 * @file Generator hook contracts (PR3).
 *
 * Hooks are NOT registered in a global registry — they are scoped to a
 * single `codeGen()` run and resolved from the `plugins[]` array passed in
 * `ApicodegenConfig`. The hook runner (`hook-runner.ts`) walks the list
 * and chains each hook's output into the next.
 *
 * Three hook slots are exposed:
 *
 * - `beforeEmit`  — runs after `schemaToStatemets` produces a
 *                   `Statement[]`, before it is printed. Output feeds back
 *                   into the printer.
 * - `afterFormat` — runs after prettier has formatted the source. Useful
 *                   for last-mile rewrites (e.g. license header injection).
 * - `writeFile`   — replaces `Generator.write`. The FIRST plugin that
 *                   declares this hook wins; remaining plugins' `writeFile`
 *                   hooks are skipped.
 *                   - Return `void`/`undefined` to fall through to the
 *                     built-in writer (writes `ctx.code` to `ctx.output`).
 *                     This is the easiest path for single-file plugins.
 *                   - Return `Record<path, code>` to emit multiple files.
 *                     Each entry is written to `path` (resolved relative
 *                     to `process.cwd()`). This enables split-output
 *                     plugins (e.g. `api.ts` + `types.ts` + `schemas.ts`).
 *                     See `example/plugins/multi-file-output/`.
 */

import type { Statement } from 'typescript';
import type { Adapter } from './base/Adaptor.js';
import type { ProviderInitOptions, ProviderInitResult } from './interface.js';

/**
 * Per-run context passed to a hook.
 *
 * Carries the same data the underlying pipeline stage would have access
 * to, so plugins do not need to reach into the generator internals.
 */
export interface GeneratorHookContext<K extends HookKind> {
	/** Original init options passed to `codeGen()`. */
	readonly initOptions: ProviderInitOptions;
	/** Parsed spec result (enums, schemas, apis, ...). */
	readonly schema: ProviderInitResult;
	/** Resolved adapter instance used for this run. */
	readonly adapter: Adapter;
	/** Output path the user requested (may be empty). */
	readonly output: string;
	/** Statements produced by `schemaToStatemets` (or earlier hooks). */
	readonly statements: ReadonlyArray<Statement>;
	/** Source string emitted by the printer (or earlier hooks). */
	readonly code: string;
	/**
	 * Discriminator — matches the hook's name. Lets a single plugin
	 * function serve multiple hook slots if it ever wants to.
	 */
	readonly kind: K;
}

export type HookKind = 'beforeEmit' | 'afterFormat' | 'writeFile';

/**
 * Map of output path → source code returned by a `writeFile` hook to
 * emit multiple files in a single run.
 *
 * Paths are resolved relative to `process.cwd()`. Use absolute paths
 * to write outside the project root. If `ctx.output` is also present,
 * the plugin is free to include it in the map or skip it.
 */
export type WriteFileOutput = Readonly<Record<string, string>>;

/**
 * Hook signatures. All return their modified input; the runner feeds the
 * returned value into the next stage.
 */
export type BeforeEmitHook = (
	ctx: GeneratorHookContext<'beforeEmit'>
) => Statement[] | Promise<Statement[]>;

export type AfterFormatHook = (
	ctx: GeneratorHookContext<'afterFormat'>
) => string | Promise<string>;

/**
 * Replace the file writer. See file-level JSDoc for the two return
 * shapes (`void` → fall through; `Record<path, code>` → multi-file).
 */
export type WriteFileHook = (
	ctx: GeneratorHookContext<'writeFile'>
) => WriteFileOutput | void | Promise<WriteFileOutput | void>;

/**
 * Compile-time sanity check: every hook receives a context where the
 * `kind` discriminator matches the hook type. If a plugin author writes
 * the wrong shape the compiler will flag the call site.
 */
export type _AssertHookShapes = [
	BeforeEmitHook extends (c: GeneratorHookContext<'beforeEmit'>) => unknown
		? true
		: never,
	AfterFormatHook extends (c: GeneratorHookContext<'afterFormat'>) => unknown
		? true
		: never,
	WriteFileHook extends (c: GeneratorHookContext<'writeFile'>) => unknown
		? true
		: never,
];
