/**
 * @file Run hooks from a `Plugin[]` list.
 *
 * Hooks are run in the order they appear in `plugins[]`. The first plugin
 * that declares a `writeFile` hook wins; later `writeFile` hooks are
 * skipped (write is exclusive — a plugin can call `Generator.write`
 * internally to fall back to the built-in writer).
 *
 * `beforeEmit` and `afterFormat` are chained: each hook receives the
 * previous hook's output and may return a modified version.
 *
 * Snapshotting: every hook receives a deep-frozen snapshot of the run
 * context. See `ctx-freeze.ts` for the rules — plain data is cloned and
 * frozen at every level; class instances (`Adapter`, `ts.Node`) are
 * shallow-frozen so plugins cannot reassign fields but their methods
 * remain callable.
 */

import type { Statement } from 'typescript';
import { deepFreeze, freezeStatements } from './ctx-freeze.js';
import type {
	AfterFormatHook,
	BeforeEmitHook,
	GeneratorHookContext,
	WriteFileHook,
} from './generator-hooks.js';
import type { Plugin } from './plugin.js';

/**
 * Build a frozen snapshot of a context for a single hook invocation.
 * Plain-data fields are deep-cloned and frozen; object fields
 * (`adapter`) are shallow-frozen by `deepFreeze`.
 */
function freezeCtx<K extends 'beforeEmit' | 'afterFormat' | 'writeFile'>(
	ctx: Partial<Omit<GeneratorHookContext<K>, 'statements' | 'code'>>
): Partial<Omit<GeneratorHookContext<K>, 'statements' | 'code'>> {
	return deepFreeze(ctx) as Partial<
		Omit<GeneratorHookContext<K>, 'statements' | 'code'>
	>;
}

/**
 * Run `beforeEmit` hooks in order.
 *
 * Each hook receives a frozen snapshot of the context plus a frozen
 * view of the running `Statement[]`. The hook may return a new array;
 * that array is the input to the next hook and is also returned to the
 * caller.
 */
export async function runBeforeEmitHooks(
	plugins: ReadonlyArray<Plugin>,
	ctx: Partial<Omit<GeneratorHookContext<'beforeEmit'>, 'statements'>>,
	initial: Statement[]
): Promise<Statement[]> {
	const frozenCtx = freezeCtx(ctx);
	let statements = initial;
	for (const plugin of plugins) {
		if (typeof plugin.beforeEmit !== 'function') continue;
		const hook = plugin.beforeEmit as BeforeEmitHook;
		statements = await hook({
			...(frozenCtx as GeneratorHookContext<'beforeEmit'>),
			statements: freezeStatements(statements),
			kind: 'beforeEmit',
		});
	}
	return statements;
}

/**
 * Run `afterFormat` hooks in order.
 *
 * Each hook receives a frozen snapshot of the context plus the running
 * `code` string. The hook may return a new string; that string feeds
 * the next hook and is returned to the caller.
 */
export async function runAfterFormatHooks(
	plugins: ReadonlyArray<Plugin>,
	ctx: Partial<Omit<GeneratorHookContext<'afterFormat'>, 'code'>>,
	initial: string
): Promise<string> {
	const frozenCtx = freezeCtx(ctx);
	let code = initial;
	for (const plugin of plugins) {
		if (typeof plugin.afterFormat !== 'function') continue;
		const hook = plugin.afterFormat as AfterFormatHook;
		code = await hook({
			...(frozenCtx as GeneratorHookContext<'afterFormat'>),
			code,
			kind: 'afterFormat',
		});
	}
	return code;
}

/**
 * Resolve the `writeFile` hook. The FIRST plugin in `plugins[]` that
 * declares one wins. Returns `undefined` if no plugin has the hook —
 * the caller then falls back to `Generator.write()`.
 */
export function resolveWriteFileHook(
	plugins: ReadonlyArray<Plugin>
): WriteFileHook | undefined {
	for (const plugin of plugins) {
		if (typeof plugin.writeFile === 'function') {
			return plugin.writeFile as WriteFileHook;
		}
	}
	return undefined;
}

/**
 * Re-export the freezing utilities so `codeGen()` (which calls
 * `writeFile` directly without going through `runXxxHooks`) can apply
 * the same snapshot discipline.
 */
export { deepFreeze, freezeStatements };
