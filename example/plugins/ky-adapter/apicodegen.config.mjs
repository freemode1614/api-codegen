// Example: register a custom HTTP-client adapter via the plugin API.
//
// Run:
//   pnpm exec apicodegen --config example/plugins/ky-adapter/apicodegen.config.mjs
//
// What this demonstrates:
//   1. A user-defined Adapter class extending the abstract `Adapter`.
//   2. The adapter is published as a plugin via `definePlugin`.
//   3. The config references the plugin's adapter by name (`adaptor: 'ky'`).
//
// NOTE: the ky implementation below is intentionally minimal — it only
// shows the call shape. A real plugin should mirror `FetchAdapter`'s
// parameter handling (headers, query, body) for production use.

import { Adapter } from '../../../src/core/base/Adaptor.js';
import { definePlugin } from '../../../src/core/index.js';
import { factory as t } from 'typescript';

class KyAdapter extends Adapter {
	readonly name = 'ky';
	readonly methodFieldName = 'method';
	readonly bodyFieldName = 'body';
	readonly headersFieldName = 'headers';
	readonly queryFieldName = 'searchParams';

	client(uri, method) {
		// Simplified emission: `return await ky(uri, { method: 'GET' })`.
		const call = t.createCallExpression(t.createIdentifier('ky'), [
			t.createStringLiteral(uri),
			t.createObjectLiteralExpression([
				t.createPropertyAssignment(
					'method',
					t.createStringLiteral(method.toUpperCase())
				),
			]),
		]);
		return [t.createReturnStatement(t.createAwaitExpression(call))];
	}
}

export default definePlugin({
	name: 'example-ky-adapter',
	version: '0.1.0',
	adapter: {
		name: 'ky',
		factory: () => new KyAdapter(),
	},
});
