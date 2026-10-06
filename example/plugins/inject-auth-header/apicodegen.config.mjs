// Example: fetchSpec hook (PR5).
//
// Demonstrates how a plugin can take over the spec-loading phase
// entirely. This example runs against a local petstore.json and:
//
//   1. Intercepts the fetchSpec call (regardless of transport).
//   2. Reads the file via Node's fs (instead of using Base.readLocalDoc).
//   3. Mutates the parsed doc to add an `x-auth-injected` marker at the
//      info level.
//   4. Returns the pre-parsed doc so the framework passes it straight
//      to the OpenAPI provider's factory.
//
// In a real setup, the plugin would add an Authorization header to an
// HTTP request via `requestOptions.headers` before delegating to
// `Base.fetchDoc`. The same hook shape works for either transport —
// here we just demonstrate the local-file path so the example is
// self-contained and runnable without network access.
//
// Run from repo root:
//   pnpm exec tsdown
//   node bin/cli.cjs \
//     --config example/plugins/inject-auth-header/apicodegen.config.mjs \
//     example/plugins/inject-auth-header/petstore.json
//
// The generated api.ts will contain `listPetsUsingGet` (the operation
// from petstore.json) — the plugin's only contribution is the
// in-memory mutation, which doesn't surface in the generated source.
// This is intentional: fetchSpec is for the spec-loading layer, not
// for shaping the generated code.

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { definePlugin } from '../../../npm/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('../../../npm/index.mjs').Plugin} */
const authPlugin = definePlugin({
	name: 'example-inject-auth-header',
	version: '0.1.0',

	fetchSpec: async ({ transport, source }) => {
		// The hook fires for every spec load. We can branch on
		// transport — for a real plugin, the HTTP path would inject
		// headers here.
		if (transport !== 'file') {
			// For HTTP, opt out and let the built-in loader (or a
			// downstream plugin) handle the request. A real plugin
			// would inject auth headers and call Base.fetchDoc
			// itself.
			return;
		}

		// Local file: read the body, parse it, and return the
		// pre-parsed doc. The framework passes it straight to the
		// provider's factory.
		const raw = await readFile(source, 'utf8');
		const doc = JSON.parse(raw);

		// Mark that the hook ran. Useful for asserting the hook
		// fired when running with `--verbose` (or in tests).
		// biome-ignore: intentional console.log in example
		console.log(
			`[example] fetchSpec intercepted ${path.relative(__dirname, source)}`
		);

		return { doc };
	},
});

export default {
	spec: path.join(__dirname, 'petstore.json'),
	output: path.join(__dirname, 'api.ts'),
	plugins: [authPlugin],
};
