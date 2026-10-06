// Example: register a custom AsyncAPI provider via the plugin API.
//
// This demonstrates PR2 of the plugin architecture: a plugin can supply
// its own spec-format provider (here, a tiny AsyncAPI 2.x reader) that
// `codeGen()` will route to when `specFormat: 'asyncapi'` is configured.
//
// NOTE: the AsyncAPI → ProviderInitResult mapping below is intentionally
// minimal — it only handles channels with one publish operation and
// synthesizes a single GET endpoint per channel so the demo is readable.
// A real plugin should model AsyncAPI's publish/subscribe semantics fully
// (e.g. one publish + one subscribe operation per channel) and consult
// `channels[].subscribe` / `channels[].publish` separately.
//
// Run from repo root:
//   pnpm exec tsdown
//   pnpm exec apicodegen --config example/plugins/asyncapi-provider/apicodegen.config.mjs

import { definePlugin } from '../../../src/core/index.js';

function readAsyncApi(doc) {
	if (!doc || typeof doc !== 'object') {
		throw new Error('AsyncAPI: document is not an object');
	}
	const root = /** @type {any} */ (doc);
	const version = root.asyncapi;
	if (typeof version !== 'string' || !version.startsWith('2.')) {
		throw new Error(`AsyncAPI: unsupported version "${version}" (expected 2.x)`);
	}
	const channels = root.channels ?? {};
	const apis = {};
	for (const [channelPath, channel] of Object.entries(channels)) {
		const op = channel?.publish ?? channel?.subscribe;
		if (!op) continue;
		const opId = op.operationId ?? `on${channelPath.replace(/[^a-zA-Z0-9]/g, '')}`;
		apis[channelPath] = [
			{
				method: 'get',
				operationId: opId,
				summary: op.summary ?? `AsyncAPI channel ${channelPath}`,
				responses: [],
			},
		];
	}
	return {
		enums: [],
		schemas: {},
		parameters: {},
		responses: {},
		requestBodies: {},
		apis,
	};
}

export default definePlugin({
	name: 'example-asyncapi-provider',
	version: '0.1.0',
	provider: {
		name: 'asyncapi',
		versions: ['2.0', '2.1', '2.2', '2.3', '2.4', '2.5', '2.6'],
		factory: (_init, doc) => readAsyncApi(doc),
	},
});
