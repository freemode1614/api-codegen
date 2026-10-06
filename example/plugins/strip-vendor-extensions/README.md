# Example: strip-vendor-extensions transformSpec plugin

A runnable end-to-end example showing the `transformSpec` hook (PR4) at
work. The plugin:

1. Strips every `x-*` vendor extension from the spec (so downstream
   tooling sees a clean doc).
2. Prefixes every `operationId` with `v2_` (a contrived transform that
   shows the hook can rewrite the spec wholesale).

`transformSpec` runs **after** the spec is loaded and parsed, but
**before** the provider's factory sees it. Hooks run in plugin-list
order; each hook receives the previous hook's output.

## Files

- `apicodegen.config.mjs` — exports a `Plugin` (via `definePlugin`) plus
  a full `ApicodegenConfig`. The plugin's `transformSpec` hook
  rewrites the parsed spec.
- `petstore.json` — the same 2-endpoint OpenAPI 3 fixture used by the
  other examples, with several `x-*` extensions sprinkled in
  (`x-internal-team`, `x-cost-center`, `x-rate-limit`, `x-internal-only`).

## Running

From the repo root:

```bash
pnpm exec tsdown
node bin/cli.cjs \
  --config example/plugins/strip-vendor-extensions/apicodegen.config.mjs \
  example/plugins/strip-vendor-extensions/petstore.json
```

The generated `api.ts` will contain:

```ts
export async function v2ListPetsUsingGet() { ... }
export async function v2ShowPetByIdUsingGet({ petId }: { petId: string }) { ... }
```

Note the `v2_` prefix on both operationIds — the OpenAPI provider's
auto-suffixing (`UsingGet`) is preserved; the plugin only adds the
prefix.

## How it works

1. `codeGen()` reads the spec from disk and `JSON.parse`s it.
2. Before handing the parsed doc to the `openapi` provider's factory,
   `codeGen()` walks the resolved `plugins[]` list and runs each
   `transformSpec` hook in order.
3. Each hook receives `(ctx, doc)`. `ctx` carries `{ initOptions,
   specFormat, kind: 'transformSpec' }` (frozen snapshot). `doc` is
   the parsed spec (any JSON-compatible value).
4. The hook MUST return a transformed doc. Returning the same value
   (mutated) is fine; a fresh object is also fine.
5. The framework feeds the returned value into the next hook and
   eventually into `providerSpec.factory(..., finalDoc)`.

## Pitfalls

- **Always return a value.** Returning `undefined` will fail downstream
  — the provider cannot parse `undefined`. Pass the doc through if you
  only want to assert something about it.
- **Hooks run in declaration order.** A plugin later in the list sees
  the output of every earlier plugin's `transformSpec`.
- **The ctx is deep-frozen.** You can read `initOptions.docURL` and
  `specFormat` but mutating them throws.
- **Don't mutate the spec on disk.** The hook only sees the in-memory
  parsed copy; nothing the hook does is written back to the source
  file.
