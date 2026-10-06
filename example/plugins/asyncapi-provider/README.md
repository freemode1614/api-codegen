# Example: AsyncAPI provider plugin

A minimal end-to-end example showing how to register a custom spec-format
provider (AsyncAPI 2.x) via the plugin API. This demonstrates the
provider-registry capability added in PR2.

## Files

- `apicodegen.config.mjs` — exports a `Plugin` (via `definePlugin`) that
  registers a provider named `asyncapi`. The provider is a tiny
  AsyncAPI 2.x reader that synthesizes one endpoint per channel.

## Running

From the repo root:

```bash
pnpm exec tsdown
# then:
pnpm exec apicodegen --config example/plugins/asyncapi-provider/apicodegen.config.mjs
```

In the generated `api.ts` you'll see one `export async function` per
AsyncAPI channel.

## How it works

1. `readAsyncApi(doc)` parses an AsyncAPI document and returns a
   `ProviderInitResult` shaped like the OpenAPI one.
2. The default export is a `Plugin` declaring `provider: { name,
   versions, factory }`.
3. When `codeGen()` runs, it reads `specFormat: 'asyncapi'` from the
   config (passed via the wrapper script, see below) and routes to this
   plugin's factory.
4. The built-in `openapi` provider is untouched.

## Note on the config

This example exports only the plugin; the actual `codeGen()` invocation
needs `specFormat: 'asyncapi'` and an AsyncAPI spec file. Adjust your
own `apicodegen.config.mjs` to wrap this:

```js
import asyncapiPlugin from './apicodegen.config.mjs';

export default {
	spec: './asyncapi.json',     // path to an AsyncAPI document
	output: './src/api.ts',
	specFormat: 'asyncapi',
	plugins: [asyncapiPlugin],
};
```

## Caveats

- The example reader only handles channels with one `publish` or
  `subscribe` operation and synthesizes a single GET endpoint per
  channel so the diff is readable. Real use should model AsyncAPI's
  publish/subscribe semantics fully.
- Plugins are config-internal today (no auto-discovery of npm packages) —
  see `docs/plugins.md` for the design rationale.
