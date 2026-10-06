// Example: transformSpec hook (PR4).
//
// Demonstrates stripping vendor extensions from the spec doc before
// the provider parses it. The OpenAPI provider doesn't care about
// `x-` prefixed fields, but downstream tooling (lint, audit) might,
// and a plugin author may want a clean spec to read after generation.
//
// This example also prefixes every operationId with `v2_` — a
// contrived transform that shows how `transformSpec` can rewrite the
// spec wholesale before the provider sees it.
//
// Run from repo root:
//   pnpm exec tsdown
//   node bin/cli.cjs \
//     --config example/plugins/strip-vendor-extensions/apicodegen.config.mjs \
//     example/plugins/strip-vendor-extensions/petstore.json

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { definePlugin } from '../../../npm/index.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('../../../npm/index.mjs').Plugin} */
const transformPlugin = definePlugin({
	name: 'example-strip-and-prefix',
	version: '0.1.0',

	transformSpec: (_ctx, doc) => {
		// 1. Walk the doc and remove every `x-*` extension.
		const stripped = JSON.parse(JSON.stringify(doc), (key, value) => {
			if (key.startsWith('x-')) return undefined;
			return value;
		});

		// 2. Prefix every operationId with `v2_`.
		const paths = stripped.paths ?? {};
		for (const pathItem of Object.values(paths)) {
			const ops = pathItem ?? {};
			for (const op of Object.values(ops)) {
				if (op && typeof op === 'object' && 'operationId' in op) {
					op.operationId = `v2_${op.operationId}`;
				}
			}
		}

		return stripped;
	},
});

export default {
	spec: path.join(__dirname, 'petstore.json'),
	output: path.join(__dirname, 'api.ts'),
	plugins: [transformPlugin],
};
