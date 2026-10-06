/**
 * @file Run `transformSpec` hooks from a `Plugin[]` list.
 *
 * Spec-loading hooks run in declaration order. Each hook receives the
 * previous hook's output (or the freshly-parsed doc if it's the first
 * one) and MUST return a transformed doc. The runner feeds the
 * returned value into the next hook and returns the final value to the
 * caller.
 *
 * Snapshotting: like generator hooks, `transformSpec` hooks receive a
 * deep-frozen snapshot of the context. The `doc` itself is NOT cloned
 * — cloning a parsed spec could be very expensive on large specs, and
 * the JSON.parse output is structurally immutable for our purposes
 * (plugins typically return a fresh object rather than mutating).
 */

import { deepFreeze } from './ctx-freeze.js';
import type { Plugin } from './plugin.js';
import type { TransformSpecContext, TransformSpecHook } from './spec-hooks.js';

/**
 * Run `transformSpec` hooks in order.
 *
 * If no plugin declares a `transformSpec` hook, returns the input
 * unchanged. The returned value is the final transformed doc, suitable
 * for handing to the provider's `factory`.
 */
export async function runTransformSpecHooks(
	plugins: ReadonlyArray<Plugin>,
	ctx: Omit<TransformSpecContext, 'kind'>,
	initial: unknown
): Promise<unknown> {
	const frozenCtx = deepFreeze(ctx) as Omit<TransformSpecContext, 'kind'>;
	let doc = initial;
	for (const plugin of plugins) {
		if (typeof plugin.transformSpec !== 'function') continue;
		const hook = plugin.transformSpec as TransformSpecHook;
		doc = await hook(
			{ ...(frozenCtx as TransformSpecContext), kind: 'transformSpec' },
			doc
		);
	}
	return doc;
}
