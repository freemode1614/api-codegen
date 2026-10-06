# Example: custom `ky` adapter plugin

A minimal end-to-end example showing how to register a third-party HTTP-client
adapter (`ky`) via the new plugin API.

## Files

- `apicodegen.config.mjs` — exports a `Plugin` (via `definePlugin`) that
  registers an adapter named `ky`.

## Running

From the repo root:

```bash
pnpm exec tsdown                                # build src so imports resolve
pnpm exec apicodegen --config example/plugins/ky-adapter/apicodegen.config.mjs
```

> The config uses a local fixture spec and writes the output next to it.
> Open the resulting `api.ts` and you'll see `ky("/...")` calls instead of
> the built-in `fetch(...)` ones.

## How it works

1. `KyAdapter extends Adapter` — overrides `name` and the field-name getters,
   implements `client()` to emit `ky(uri, { method })`.
2. The default export is a `Plugin` object created with `definePlugin()`. The
   plugin declares `adapter: { name: 'ky', factory: () => new KyAdapter() }`.
3. When `codeGen()` runs, it reads `plugins` from the config and registers
   the `ky` adapter in the global registry.
4. `adaptor: 'ky'` then resolves to this adapter via `resolveAdapter('ky')`.

## Caveats

- The example `KyAdapter` only handles the trivial GET case so the diff
  is readable. Real use should copy the parameter/body/header logic from
  `src/core/client/fetch.ts`.
- Plugins are config-internal today (no auto-discovery of npm packages) —
  see `docs/plugins.md` for the design rationale.
