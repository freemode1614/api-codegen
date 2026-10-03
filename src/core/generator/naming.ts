/**
 * Create a per-generation unique-name resolver.
 *
 * Tracks how many times each base name has been seen during a single
 * code generation pass and returns a unique variant on every call:
 *
 *   reserve('foo')  // 'foo'
 *   reserve('foo')  // 'foo2'
 *   reserve('foo')  // 'foo3'
 *   reserve('bar')  // 'bar'  (independent counter)
 *
 * The resolver holds no module-level state — create one per generation pass
 * and let it go out of scope when the pass completes.
 */
export const createUniqueNameResolver = (): ((name: string) => string) => {
	const seen = new Map<string, number>();

	return (name: string): string => {
		const next = (seen.get(name) ?? 0) + 1;
		seen.set(name, next);
		return next === 1 ? name : `${name}${next}`;
	};
};
