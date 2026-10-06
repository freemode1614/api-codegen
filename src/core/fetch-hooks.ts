/**
 * @file Spec-fetch hook contracts (PR5).
 *
 * Spec-fetch hooks are the most upstream plugin capability: they run
 * BEFORE the spec is even loaded/parsed. They let plugins:
 *
 * - Add auth headers / OAuth flows to remote HTTP requests.
 * - Read the spec from a non-standard location (private artifact
 *   store, in-memory cache, encrypted vault, ...).
 * - Inject a proxy between `codeGen()` and the network.
 * - Read the spec from YAML (the built-in only handles JSON).
 *
 * Hooks run in plugin-list order, like `transformSpec`. The FIRST
 * hook that returns a non-void value wins (fetch is exclusive —
 * subsequent hooks are skipped). To fall back to the built-in loader,
 * a hook can return `void`/`undefined` and the framework will dispatch
 * the next hook; if every hook opts out, the framework falls through
 * to `Base.fetchDoc` / `Base.readLocalDoc` itself.
 *
 * Why this lives outside `spec-hooks.ts` and `generator-hooks.ts`:
 *
 * - Generator hooks run on `Statement[]` / string at the END of the
 *   pipeline.
 * - `transformSpec` runs on the already-parsed JSON doc, MID-pipeline.
 * - `fetchSpec` runs on the source URL BEFORE anything is loaded —
 *   the working data is a URL string + request options, and the
 *   return value is either raw text OR a pre-parsed object.
 */

import type { FetchDocRequestInit } from './interface.js';
import type { ProviderInitLike } from './plugin.js';

/**
 * Result returned by a `fetchSpec` hook.
 *
 * Discriminated union: the plugin decides whether to return the raw
 * text body (the framework will then `JSON.parse` it) or a pre-parsed
 * object (the framework passes it straight to the provider's
 * factory). The framework respects whichever shape the plugin returns.
 */
export type FetchSpecResult =
	| { readonly body: string; readonly headers?: Record<string, string> }
	| { readonly doc: unknown; readonly headers?: Record<string, string> };

/**
 * Context passed to a `fetchSpec` hook.
 *
 * `initOptions` is the same narrow view that the provider factory
 * sees — `{ docURL, baseURL, output }`. The full `FetchDocRequestInit`
 * is available as `requestOptions` so plugins can read or override
 * the existing request shape (e.g. inject an auth header before
 * delegating to the built-in fetcher).
 */
export interface FetchSpecContext {
	/** Narrow view of init options. */
	readonly initOptions: ProviderInitLike;
	/** Existing request options from `ApicodegenConfig.requestOptions`. */
	readonly requestOptions: FetchDocRequestInit;
	/**
	 * The transport detected by `Base.resolveSpecURL` — either
	 * `'http'` (or `'https'`) for a remote URL, or `'file'` for a
	 * local path. Plugins can short-circuit on this.
	 */
	readonly transport: 'http' | 'file';
	/** The resolved source (URL string or filesystem path). */
	readonly source: string;
	/** Discriminator matching the hook's name. */
	readonly kind: 'fetchSpec';
}

/**
 * The `fetchSpec` hook signature.
 *
 * - Input: the frozen context plus the existing `requestOptions`.
 * - Output: a `FetchSpecResult` (raw text or pre-parsed object), or
 *   `void`/`undefined` to opt out and let the next hook (or the
 *   built-in loader) handle the request.
 * - Hooks may be sync or async.
 */
export type FetchSpecHook = (
	ctx: FetchSpecContext
) => FetchSpecResult | void | Promise<FetchSpecResult | void>;

/**
 * Compile-time sanity check: the hook's parameter matches the declared
 * context shape.
 */
export type _AssertFetchHookShape = FetchSpecHook extends (
	c: FetchSpecContext
) => unknown
	? true
	: never;
