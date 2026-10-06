/**
 * @file Run `fetchSpec` hooks from a `Plugin[]` list.
 *
 * Spec-fetch hooks are resolved **exclusively**: the first plugin in
 * `plugins[]` that returns a non-void `FetchSpecResult` wins.
 * Subsequent hooks are skipped. Plugins that return `void` opt out
 * and let the next plugin (or the built-in loader) handle the
 * request.
 *
 * This is different from `transformSpec` (which chains every hook in
 * order). The semantic is closer to `writeFile`: a plugin that
 * "owns" the fetch is the source of truth, and other plugins should
 * not double-fetch.
 *
 * Snapshotting: every hook receives a deep-frozen context (same
 * discipline as the other hook runners).
 */

import { deepFreeze } from './ctx-freeze.js';
import type {
	FetchSpecContext,
	FetchSpecHook,
	FetchSpecResult,
} from './fetch-hooks.js';
import type { Plugin } from './plugin.js';

/**
 * Run `fetchSpec` hooks in order.
 *
 * Returns the first non-void result, or `undefined` if every hook
 * opted out (or no plugin declared the hook). The caller is then
 * responsible for falling back to the built-in loader.
 */
export async function resolveFetchSpecHook(
	plugins: ReadonlyArray<Plugin>,
	ctx: Omit<FetchSpecContext, 'kind'>
): Promise<FetchSpecResult | undefined> {
	const frozenCtx = deepFreeze(ctx) as Omit<FetchSpecContext, 'kind'>;
	for (const plugin of plugins) {
		if (typeof plugin.fetchSpec !== 'function') continue;
		const hook = plugin.fetchSpec as FetchSpecHook;
		const result = await hook({
			...(frozenCtx as FetchSpecContext),
			kind: 'fetchSpec',
		});
		if (result) {
			return result;
		}
	}
	return undefined;
}
