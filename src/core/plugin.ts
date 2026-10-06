/**
 * @file Plugin contract definition.
 *
 * A plugin is a plain object (or a factory that returns one) describing how to
 * extend the code generator. A plugin MAY declare one or more capabilities —
 * each capability is optional and looked up in the corresponding registry.
 *
 * Current capabilities:
 * - `adapter`  — register a new HTTP client adapter (PR1)
 * - `provider` — register a non-OpenAPI spec provider (PR2)
 *
 * Reserved for upcoming PRs (interface reserved, no runtime support yet):
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
import type { ProviderInitResult } from './interface.js';

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
 * Provider plugin spec (PR2).
 *
 * - `name`     — unique provider identifier (e.g. `'openapi'`, `'asyncapi'`).
 *                Used as the value of `ApicodegenConfig.specFormat`.
 * - `versions` — optional list of version strings this provider can handle
 *                (e.g. `['2.6']` for AsyncAPI 2.6.x). Surfaced in logs and
 *                future validation; not used to auto-route documents today.
 * - `factory`  — given parsed `initOptions` and the raw document, returns a
 *                fully populated {@link ProviderInitResult}. Implementations
 *                do NOT need to extend the `Provider` abstract class — a
 *                plain factory is enough.
 *
 * The built-in `openapi` provider is registered under the name `'openapi'`
 * and is the default when `specFormat` is omitted.
 */
export interface ProviderPluginSpec {
	/** Unique provider identifier (e.g. `'asyncapi'`). */
	name: string;
	/** Optional. Version strings this provider supports (e.g. `['2.6']`). */
	versions?: readonly string[];
	/**
	 * Build a {@link ProviderInitResult} from the parsed options and raw doc.
	 *
	 * Implementations should throw a descriptive error when `doc` is not in
	 * a format the provider can handle (e.g. wrong `asyncapi` version).
	 */
	factory: ProviderFactory;
}

/**
 * Factory function turning a raw spec doc into a {@link ProviderInitResult}.
 *
 * The factory is awaited at most once per `codeGen()` run, so it is free to
 * perform synchronous parsing or `await` external resources as needed.
 */
export type ProviderFactory = (
	initOptions: ProviderInitLike,
	doc: unknown
) => ProviderInitResult | Promise<ProviderInitResult>;

/**
 * Minimal subset of {@link ProviderInitOptions} the factory needs.
 *
 * Keeping the surface small means plugins do not depend on internal config
 * fields (e.g. `plugins` itself) and reduces coupling.
 */
export interface ProviderInitLike {
	readonly docURL: string;
	readonly baseURL: string;
	readonly output: string;
}

// (ProviderInitResult is imported at the top — both this file and
// `./interface.js` reference each other via `import type` only, so the
// type-only cycle resolves at compile time with no runtime cost.)

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
