/**
 * @file Provider registry (PR2).
 *
 * Mirrors `registry.ts` (adapter registry) for spec providers. The built-in
 * `openapi` provider is registered lazily so user plugins may not override
 * it; this mirrors the built-in protection for `fetch`/`axios`.
 *
 * Consumers should not import this module directly — use `definePlugin`
 * and let `codeGen()` wire the registry.
 */

import type { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { OpenAPIProvider } from '../openapi/index.js';
import type { ProviderInitResult } from './interface.js';
import type { ProviderFactory } from './plugin.js';

/** Provider registry: name -> spec. */
const providerRegistry = new Map<
	string,
	{ name: string; versions?: readonly string[]; factory: ProviderFactory }
>();

/** Set of provider names the core ships with. Re-registration throws. */
const builtInProviderNames = new Set<string>(['openapi']);

/** Whether built-ins have been seeded. Idempotent. */
let builtInsSeeded = false;

/**
 * Internal adapter that turns the OpenAPIProvider instance into the
 * minimal {@link ProviderInitResultLike} shape plugins use.
 */
function openapiFactory(
	_initOptions: { docURL: string; baseURL: string; output: string },
	doc: unknown
): ProviderInitResult {
	// Cast through `unknown` to keep the registry decoupled from
	// openapi-types — a user plugin's `doc` shape is whatever it parses.
	const provider = new OpenAPIProvider(
		{
			docURL: _initOptions.docURL,
			baseURL: _initOptions.baseURL,
			output: _initOptions.output,
			// Plugin providers are not passed the full ProviderInitOptions
			// intentionally — see `ProviderInitLike` for why.
			importClientSource: '',
			requestOptions: {},
			verbose: false,
		},
		doc as OpenAPIV2.Document | OpenAPIV3.Document | OpenAPIV3_1.Document
	);
	// OpenAPIProvider extends Provider which exposes ProviderInitResult
	// fields directly on the instance.
	return provider;
}

/**
 * Seed built-in providers (`openapi`) into the registry.
 *
 * Called lazily by `codeGen()` so user plugins can register `openapi`
 * mocks BEFORE the first run without racing the core.
 *
 * Idempotent: a second call is a no-op.
 */
export function seedBuiltInProviders(): void {
	if (builtInsSeeded) return;
	builtInsSeeded = true;

	if (!providerRegistry.has('openapi')) {
		providerRegistry.set('openapi', {
			name: 'openapi',
			versions: ['2.0', '3.0', '3.1'],
			factory: openapiFactory,
		});
	}
}

/**
 * Register a provider plugin.
 *
 * @throws if `spec.name` is empty, collides with a built-in name, or is
 *         already registered by another plugin in this run.
 */
export function registerProvider(spec: {
	name: string;
	versions?: readonly string[];
	factory: ProviderFactory;
}): void {
	if (!spec || typeof spec.name !== 'string' || spec.name.length === 0) {
		throw new Error('[apicodegen] registerProvider: spec.name is required');
	}
	if (typeof spec.factory !== 'function') {
		throw new Error(
			`[apicodegen] registerProvider(${spec.name}): spec.factory must be a function`
		);
	}
	if (builtInProviderNames.has(spec.name)) {
		throw new Error(
			`[apicodegen] registerProvider: "${spec.name}" is a built-in provider name and cannot be replaced`
		);
	}
	if (providerRegistry.has(spec.name)) {
		throw new Error(
			`[apicodegen] registerProvider: provider "${spec.name}" is already registered`
		);
	}
	providerRegistry.set(spec.name, spec);
}

/**
 * Look up a provider by name. Returns `undefined` if not found.
 */
export function resolveProvider(
	name: string
):
	| { name: string; versions?: readonly string[]; factory: ProviderFactory }
	| undefined {
	return providerRegistry.get(name);
}

/** Returns true if a provider with the given name is registered. */
export function hasProvider(name: string): boolean {
	return providerRegistry.has(name);
}

/** List all registered provider names (built-ins + user plugins). */
export function listProviders(): string[] {
	return [...providerRegistry.keys()];
}

/**
 * Remove all non-built-in provider entries. Called between `codeGen()` runs
 * so plugin state from a previous run does not leak.
 *
 * After clearing, built-ins are NOT re-seeded — the next `codeGen()` will
 * seed them again via `seedBuiltInProviders()`.
 */
export function clearUserProviders(): void {
	for (const key of [...providerRegistry.keys()]) {
		if (!builtInProviderNames.has(key)) {
			providerRegistry.delete(key);
		}
	}
	// Force re-seed on next run.
	builtInsSeeded = false;
}
