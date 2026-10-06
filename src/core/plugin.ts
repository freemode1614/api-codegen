/**
 * @file Plugin contract definition.
 *
 * A plugin is a plain object (or a factory that returns one) describing how to
 * extend the code generator. A plugin MAY declare one or more capabilities —
 * each capability is optional and looked up in the corresponding registry.
 *
 * Current capabilities:
 * - `adapter`  — register a new HTTP client adapter (PR1)
 *
 * Reserved for upcoming PRs (interface reserved, no runtime support yet):
 * - `provider`        — register a non-OpenAPI spec provider
 * - `transformSpec`   — mutate the raw spec doc before parsing
 * - `beforeEmit`      — mutate generated Statement[] before printing
 * - `afterFormat`     — post-process the formatted source string
 * - `writeFile`       — replace the file writer (e.g. emit to multiple paths)
 *
 * @example
 * ```ts
 * import { definePlugin } from '@moccona/apicodegen';
 * import { MyAdapter } from './my-adapter.js';
 *
 * export default definePlugin({
 *   name: 'my-ky-adapter',
 *   adapter: { name: 'ky', factory: () => new MyAdapter() },
 * });
 * ```
 */

import type { Adapter } from './base/Adaptor.js';

/**
 * Adapter plugin spec.
 *
 * - `name`     — identifier used by users in `apicodegen.config.{js,mjs}`'s
 *                `adaptor: 'ky'` field. Must be unique across all registered
 *                adapters (built-in names: `fetch`, `axios`).
 * - `factory`  — zero-arg constructor returning a fresh `Adapter` instance.
 *                Called once per generation; instances must not be reused
 *                across runs.
 */
export interface AdapterPluginSpec {
	/** Unique adapter identifier (e.g. `'ky'`, `'ofetch'`). */
	name: string;
	/** Factory that produces a new {@link Adapter} instance. */
	factory: () => Adapter;
}

/**
 * Reserved for PR2 (Provider registry). Not yet wired into `codeGen()`.
 */
export interface ProviderPluginSpec {
	/** Reserved. Will be used as the spec-format identifier in PR2. */
	readonly __reserved?: never;
}

/**
 * The unified plugin shape consumed by `codeGen()`.
 *
 * Each capability is independent. A plugin that only registers an adapter
 * does not need to declare anything else.
 */
export interface Plugin {
	/** Required. Human-readable plugin name (used in logs and errors). */
	name: string;
	/** Optional. Adapter this plugin contributes. */
	adapter?: AdapterPluginSpec;
	/** Reserved for PR2. Currently inert. */
	provider?: ProviderPluginSpec;
	/** Optional. Plugin version (free-form, surfaced in logs). */
	version?: string;
}

/**
 * Type helper that narrows a plugin spec without runtime cost.
 *
 * Use this when authoring a plugin so consumers get correct types and
 * plugin authors get IDE completion for the reserved capabilities.
 *
 * @example
 * ```ts
 * export default definePlugin({ name: 'my-plugin', adapter: { ... } });
 * ```
 */
export function definePlugin<T extends Plugin>(spec: T): T {
	return spec;
}
