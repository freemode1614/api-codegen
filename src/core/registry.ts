/**
 * @file Plugin registries.
 *
 * Two simple `Map`-based registries hold plugin-supplied adapters and
 * (in a future PR) providers. The registries are process-global state:
 *
 * - The core seeds built-ins (fetch, axios) once at module load.
 * - `codeGen()` applies the user's plugin list at the start of each run,
 *   populating user entries on top.
 * - Built-ins cannot be overwritten by a user plugin; attempting to do so
 *   throws to avoid silent shadowing of a documented built-in name.
 *
 * Consumers should not import this module directly — use `definePlugin`
 * and let `codeGen()` wire the registry.
 */

import { AxiosAdapter } from './client/axios.js';
import { FetchAdapter } from './client/fetch.js';
import type { AdapterPluginSpec } from './plugin.js';

/** Adapter registry: name -> spec. */
const adapterRegistry = new Map<string, AdapterPluginSpec>();

/** Set of adapter names the core ships with. Re-registration throws. */
const builtInAdapterNames = new Set<string>(['fetch', 'axios']);

/** Whether built-ins have been seeded. Idempotent. */
let builtInsSeeded = false;

/**
 * Seed built-in adapters (`fetch`, `axios`) into the registry.
 *
 * Called lazily by `codeGen()` so user plugins can register `fetch` /
 * `axios` mocks BEFORE the first run without racing the core.
 *
 * If a user has already registered an entry under a built-in name we
 * skip seeding that name (so a `fetch` mock wins). A second call is a no-op.
 */
export function seedBuiltInAdapters(): void {
	if (builtInsSeeded) return;
	builtInsSeeded = true;

	if (!adapterRegistry.has('fetch')) {
		adapterRegistry.set('fetch', {
			name: 'fetch',
			factory: () => new FetchAdapter(),
		});
	}
	if (!adapterRegistry.has('axios')) {
		adapterRegistry.set('axios', {
			name: 'axios',
			factory: () => new AxiosAdapter(),
		});
	}
}

/**
 * Register an adapter plugin.
 *
 * @throws if `spec.name` is empty, collides with a built-in name, or is
 *         already registered by another plugin in this run.
 */
export function registerAdapter(spec: AdapterPluginSpec): void {
	if (!spec || typeof spec.name !== 'string' || spec.name.length === 0) {
		throw new Error('[apicodegen] registerAdapter: spec.name is required');
	}
	if (typeof spec.factory !== 'function') {
		throw new Error(
			`[apicodegen] registerAdapter(${spec.name}): spec.factory must be a function returning an Adapter instance`
		);
	}
	if (builtInAdapterNames.has(spec.name)) {
		throw new Error(
			`[apicodegen] registerAdapter: "${spec.name}" is a built-in adapter name and cannot be replaced`
		);
	}
	if (adapterRegistry.has(spec.name)) {
		throw new Error(
			`[apicodegen] registerAdapter: adapter "${spec.name}" is already registered`
		);
	}
	adapterRegistry.set(spec.name, spec);
}

/**
 * Look up an adapter by name. Returns `undefined` if not found.
 *
 * Callers should treat `undefined` as a user-facing error (unknown adapter).
 */
export function resolveAdapter(name: string): AdapterPluginSpec | undefined {
	return adapterRegistry.get(name);
}

/** Returns true if an adapter with the given name is registered. */
export function hasAdapter(name: string): boolean {
	return adapterRegistry.has(name);
}

/** List all registered adapter names (built-ins + user plugins). */
export function listAdapters(): string[] {
	return [...adapterRegistry.keys()];
}

/**
 * Remove all non-built-in adapter entries. Called between `codeGen()` runs
 * so plugin state from a previous run does not leak.
 *
 * After clearing, built-ins are NOT re-seeded — the next `codeGen()` will
 * seed them again via `seedBuiltInAdapters()`.
 */
export function clearUserAdapters(): void {
	for (const key of [...adapterRegistry.keys()]) {
		if (!builtInAdapterNames.has(key)) {
			adapterRegistry.delete(key);
		}
	}
	// Force re-seed on next run so subsequent runs always have built-ins.
	builtInsSeeded = false;
}
