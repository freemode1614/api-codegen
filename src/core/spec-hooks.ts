/**
 * @file Spec-loading hook contracts.
 *
 * Spec hooks run during the spec-loading phase of `codeGen()`, BEFORE
 * the spec is handed to a provider for parsing into a
 * `ProviderInitResult`. They sit on the same `Plugin` object as the
 * generator hooks, but are a separate phase with their own context
 * shape (the parsed spec doc is the working data, not `Statement[]` or
 * a source string).
 *
 * Current spec hook:
 *
 * - `transformSpec` — chain through plugins in declaration order. Each
 *                    hook receives the previous hook's output (or the
 *                    freshly-parsed doc if it's the first one). Hooks
 *                    MUST return a transformed doc (same shape they
 *                    received, possibly mutated). Hooks may return a
 *                    different type as long as the next plugin's hook
 *                    can consume it.
 *
 * Why this lives outside `generator-hooks.ts`:
 *
 * - Spec hooks operate on the raw parsed JSON-like object; generator
 *   hooks operate on `Statement[]` / string. The ctx shape and
 *   return types diverge too much to share a single file.
 * - The runner doesn't import from `generator-hooks.ts`; both files
 *   import from `plugin.ts` instead.
 */

import type { ProviderInitLike } from './plugin.js';

/**
 * Context passed to a `transformSpec` hook.
 *
 * Carries enough information about the run that the plugin can decide
 * what to do (e.g. skip work for non-matching `specFormat`, read the
 * raw docURL string, etc.) without reaching into the generator
 * internals.
 */
export interface TransformSpecContext {
	/** The view of init options the provider factory would see. */
	readonly initOptions: ProviderInitLike;
	/** The spec format that was requested (e.g. `'openapi'`, `'asyncapi'`). */
	readonly specFormat: string;
	/** Discriminator matching the hook's name. */
	readonly kind: 'transformSpec';
}

/**
 * The `transformSpec` hook signature.
 *
 * - Input: the parsed spec doc (a JSON-compatible value: object, array,
 *   primitive — whatever the spec source produced).
 * - Output: a transformed spec doc. The same value (mutated) is fine;
 *   a fresh value is also fine. Hooks may also swap the doc's type
 *   (e.g. trim down a v3.1 doc to v3.0 by deleting fields).
 *
 * Hooks may be sync or async.
 */
export type TransformSpecHook = (
	ctx: TransformSpecContext,
	doc: unknown
) => unknown | Promise<unknown>;

/**
 * Compile-time sanity check: the hook's first parameter matches the
 * declared context shape. If a plugin author writes the wrong shape
 * the compiler will flag the call site.
 */
export type _AssertSpecHookShape = TransformSpecHook extends (
	c: TransformSpecContext,
	doc: unknown
) => unknown
	? true
	: never;
