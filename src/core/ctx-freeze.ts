/**
 * @file Deep-freeze utilities for plugin hook contexts.
 *
 * Hooks in PR3 receive a snapshot of the run context. We can't rely on
 * TypeScript's `readonly` types alone — at runtime, a plugin author can
 * still `ctx.initOptions.plugins.push(...)` or `ctx.schema.apis.foo = ...`.
 *
 * This module produces a frozen snapshot:
 *
 * - Plain-data fields (objects with `Object.prototype` or `Array.prototype`)
 *   are deep-cloned via `structuredClone` and then frozen at every level.
 * - Class-instance fields (e.g. `Adapter`, `ts.Node`) cannot be cloned
 *   without losing their methods or prototype metadata. They are
 *   shallow-frozen instead — new properties cannot be added and existing
 *   properties cannot be reassigned, but methods remain callable.
 * - Primitives are returned as-is (already immutable).
 *
 * Cycles are handled with a `WeakSet` so plugins cannot construct a
 * self-referential `ctx` to confuse the freezer.
 */

import type { Statement } from 'typescript';

/**
 * Decide whether `value` is plain data (cloneable) or a class instance
 * (must keep its prototype).
 */
export function isPlainData(value: unknown): boolean {
	if (value === null || typeof value !== 'object') return false;
	const proto = Object.getPrototypeOf(value);
	return (
		proto === Object.prototype || proto === Array.prototype || proto === null
	);
}

/**
 * Recursively deep-clone plain data, freeze everything we touch, and
 * shallow-freeze class instances.
 *
 * @param value - the value to freeze.
 * @param seen  - internal cycle guard; do not pass from call sites.
 * @returns a frozen snapshot of `value`.
 */
export function deepFreeze(
	value: unknown,
	seen = new WeakSet<object>()
): unknown {
	if (value === null || typeof value !== 'object') return value;
	if (seen.has(value as object)) return value;

	if (!isPlainData(value)) {
		// Class instance: shallow-freeze only. Do NOT recurse — child fields
		// belong to the class and may have non-plain types we don't want
		// to walk into.
		return Object.freeze(value);
	}

	seen.add(value as object);

	if (Array.isArray(value)) {
		const out = value.map((item) => deepFreeze(item, seen));
		return Object.freeze(out);
	}

	const proto = Object.getPrototypeOf(value);
	const out: Record<string, unknown> =
		proto === null ? Object.create(null) : {};
	for (const key of Object.keys(value as Record<string, unknown>)) {
		out[key] = deepFreeze((value as Record<string, unknown>)[key], seen);
	}
	return Object.freeze(out);
}

/**
 * Wrap a `Statement[]` (or `NodeArray`) as a frozen array so plugins
 * cannot mutate the upstream list via push/splice/index assignment.
 *
 * NOTE: we deliberately do NOT freeze individual `ts.Node` instances.
 * TypeScript's compiler API mutates internal fields (`pos`, `end`,
 * `flags`, parent links) during printing, and `Object.freeze` on a
 * `ts.Node` corrupts those invariants. The array itself is frozen;
 * statement-level mutation relies on plugins behaving themselves.
 *
 * We also force a fresh plain array (not a `NodeArray`) because plugins
 * spread `[...statements]` and a `NodeArray` cannot be spread in user
 * code without ceremony.
 */
export function freezeStatements(
	statements: ReadonlyArray<Statement>
): ReadonlyArray<Statement> {
	return Object.freeze([...statements]);
}
