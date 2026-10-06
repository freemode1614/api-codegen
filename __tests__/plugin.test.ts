// Unit tests for the plugin registry + plugin loader.
//
// These tests isolate the registry/loader from `codeGen()` so a failure
// points at the layer under test.
import { describe, it, expect, beforeEach } from 'vitest';
import { Adapter } from '../src/core/base/Adaptor.js';
import { definePlugin, type Plugin } from '../src/core/plugin.js';
import { applyPlugins } from '../src/core/plugin-loader.js';
import {
	clearUserAdapters,
	hasAdapter,
	listAdapters,
	registerAdapter,
	resolveAdapter,
	seedBuiltInAdapters,
} from '../src/core/registry.js';

// Minimal adapter used across these tests. Field names mirror `FetchAdapter`
// so it can stand in as a real adapter in `codeGen()` end-to-end tests.
class StubAdapter extends Adapter {
	readonly name = 'stub';
	readonly methodFieldName = 'method';
	readonly bodyFieldName = 'body';
	readonly headersFieldName = 'headers';
	readonly queryFieldName = '';
	client(): never[] {
		// Not exercised by these unit tests; e2e tests cover real emission.
		return [];
	}
}

describe('registry', () => {
	beforeEach(() => {
		// Reset between tests so registration order does not leak.
		clearUserAdapters();
		seedBuiltInAdapters();
	});

	it('seeds built-in adapters (fetch, axios) on demand', () => {
		expect(hasAdapter('fetch')).toBe(true);
		expect(hasAdapter('axios')).toBe(true);
	});

	it('returns the registered spec via resolveAdapter', () => {
		const spec = {
			name: 'ky',
			factory: () => new StubAdapter(),
		};
		registerAdapter(spec);
		expect(resolveAdapter('ky')).toBe(spec);
	});

	it('refuses to override a built-in name', () => {
		expect(() =>
			registerAdapter({ name: 'fetch', factory: () => new StubAdapter() })
		).toThrow(/built-in/);
	});

	it('refuses duplicate registration', () => {
		registerAdapter({ name: 'ky', factory: () => new StubAdapter() });
		expect(() =>
			registerAdapter({ name: 'ky', factory: () => new StubAdapter() })
		).toThrow(/already registered/);
	});

	it('refuses invalid specs', () => {
		expect(() => registerAdapter({ name: '', factory: () => new StubAdapter() })).toThrow();
		// @ts-expect-error — intentional bad input
		expect(() => registerAdapter({ name: 'bad' })).toThrow(/factory/);
	});

	it('clearUserAdapters drops user entries and resets the seed flag', () => {
		registerAdapter({ name: 'ky', factory: () => new StubAdapter() });
		expect(hasAdapter('ky')).toBe(true);

		clearUserAdapters();
		expect(hasAdapter('ky')).toBe(false);
		// Built-ins still present.
		expect(hasAdapter('fetch')).toBe(true);
		expect(hasAdapter('axios')).toBe(true);
	});

	it('listAdapters returns a sorted snapshot', () => {
		registerAdapter({ name: 'ky', factory: () => new StubAdapter() });
		registerAdapter({ name: 'ofetch', factory: () => new StubAdapter() });
		const names = listAdapters();
		expect(names).toContain('fetch');
		expect(names).toContain('axios');
		expect(names).toContain('ky');
		expect(names).toContain('ofetch');
	});
});

describe('applyPlugins', () => {
	beforeEach(() => {
		clearUserAdapters();
		seedBuiltInAdapters();
	});

	it('is a no-op when plugins is empty or undefined', async () => {
		await applyPlugins(undefined);
		await applyPlugins([]);
		expect(listAdapters().sort()).toEqual(['axios', 'fetch']);
	});

	it('registers adapters from a Plugin object', async () => {
		const plugin: Plugin = definePlugin({
			name: 'ky-plugin',
			adapter: { name: 'ky', factory: () => new StubAdapter() },
		});
		await applyPlugins([plugin]);
		expect(hasAdapter('ky')).toBe(true);
	});

	it('resolves synchronous factories', async () => {
		await applyPlugins([
			() =>
				definePlugin({
					name: 'ofetch-plugin',
					adapter: { name: 'ofetch', factory: () => new StubAdapter() },
				}),
		]);
		expect(hasAdapter('ofetch')).toBe(true);
	});

	it('resolves asynchronous factories', async () => {
		await applyPlugins([
			async () =>
				definePlugin({
					name: 'async-plugin',
					adapter: { name: 'async', factory: () => new StubAdapter() },
				}),
		]);
		expect(hasAdapter('async')).toBe(true);
	});

	it('clears user adapters from the previous run before re-applying', async () => {
		// First run registers 'ky'.
		await applyPlugins([
			definePlugin({
				name: 'first',
				adapter: { name: 'ky', factory: () => new StubAdapter() },
			}),
		]);
		expect(hasAdapter('ky')).toBe(true);

		// Second run has no plugins → 'ky' should be gone.
		await applyPlugins([]);
		expect(hasAdapter('ky')).toBe(false);
		expect(hasAdapter('fetch')).toBe(true);
	});

	it('throws on a plugin entry with no name', async () => {
		await expect(
			// @ts-expect-error — intentionally malformed entry
			applyPlugins([{ adapter: { name: 'ky', factory: () => new StubAdapter() } }])
		).rejects.toThrow(/non-empty name/);
	});

	it('propagates errors from async factories', async () => {
		await expect(
			applyPlugins([
				async () => {
					throw new Error('boom');
				},
			])
		).rejects.toThrow(/plugins\[0\] factory threw: boom/);
	});

	it('ignores reserved capabilities (provider) without throwing', async () => {
		await expect(
			applyPlugins([
				definePlugin({
					name: 'reserved',
					// @ts-expect-error — intentionally declaring the reserved field
					provider: {},
				}),
			])
		).resolves.toBeUndefined();
	});
});
