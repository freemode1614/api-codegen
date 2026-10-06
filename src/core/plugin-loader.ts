/**
 * @file Apply a list of {@link Plugin} entries to the registries.
 *
 * Used by `codeGen()` between two runs: it clears user adapters, then
 * re-applies the plugin list from the current config so successive runs
 * do not accumulate state.
 */

import { createScopedLogger } from '@moccona/logger';
import type { Plugin } from './plugin.js';
import {
	clearUserAdapters,
	registerAdapter,
	seedBuiltInAdapters,
} from './registry.js';

const logger = createScopedLogger('Plugins');

/**
 * Resolve a single plugin entry to a concrete {@link Plugin} object.
 *
 * Accepts a plain object or a (possibly async) factory returning one.
 */
async function resolveEntry(
	entry: Plugin | (() => Plugin | Promise<Plugin>),
	index: number
): Promise<Plugin> {
	if (typeof entry === 'function') {
		try {
			return await entry();
		} catch (error) {
			throw new Error(
				`[apicodegen] plugins[${index}] factory threw: ${
					error instanceof Error ? error.message : String(error)
				}`
			);
		}
	}
	return entry;
}

/**
 * Apply a plugin list to the registries.
 *
 * Each entry may be a {@link Plugin} object directly, or a (possibly async)
 * factory returning one. Factories are resolved in parallel.
 *
 * Unknown plugin fields (e.g. `provider` before PR2) are logged at debug
 * level and ignored — this lets us ship additive capabilities without
 * breaking older plugin files.
 *
 * @param plugins - raw `plugins` value from `ApicodegenConfig`.
 */
export async function applyPlugins(
	plugins: ReadonlyArray<Plugin | (() => Plugin | Promise<Plugin>)> | undefined
): Promise<void> {
	// Always start from a clean slate: drop user adapters from any previous run
	// and (re-)seed built-ins. This is a no-op on first call.
	clearUserAdapters();
	seedBuiltInAdapters();

	if (!plugins || plugins.length === 0) return;

	const resolved = await Promise.all(
		plugins.map((entry, index) => resolveEntry(entry, index))
	);

	for (const [i, plugin] of resolved.entries()) {
		if (
			!plugin ||
			typeof plugin.name !== 'string' ||
			plugin.name.length === 0
		) {
			throw new Error(
				`[apicodegen] plugins[${i}]: each entry must be a Plugin object with a non-empty name`
			);
		}

		logger.debug(
			`apply plugin "${plugin.name}"${plugin.version ? ` v${plugin.version}` : ''}`
		);

		if (plugin.adapter) {
			registerAdapter(plugin.adapter);
		}

		// Reserved capabilities — present in the type so plugins can declare
		// them today, but no runtime wiring yet. Logged at debug so authors
		// know why their capability has no effect yet.
		if (plugin.provider) {
			logger.debug(
				`plugin "${plugin.name}" declares "provider" — not yet supported, ignored`
			);
		}
	}
}
