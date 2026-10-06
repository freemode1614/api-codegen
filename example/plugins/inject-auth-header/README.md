# Example: inject-auth-header fetchSpec plugin

A runnable end-to-end example showing the `fetchSpec` hook (PR5) at
work. The plugin intercepts the spec-loading phase, reads the file
itself, parses it, and returns a pre-parsed doc so the framework
passes it straight to the OpenAPI provider's factory.

This is a self-contained local-file demo so it runs without network
access. The same hook shape is what you'd use in production to inject
auth headers on remote requests — see the inline comment in
`apicodegen.config.mjs` for the HTTP path.

## Files

- `apicodegen.config.mjs` — exports a `Plugin` (via `definePlugin`) plus
  a full `ApicodegenConfig`. The plugin's `fetchSpec` hook reads the
  file via `node:fs/promises` and returns `{ doc }`.
- `petstore.json` — the same 2-endpoint OpenAPI 3 fixture used by the
  other examples.

## Running

From the repo root:

```bash
pnpm exec tsdown
node bin/cli.cjs \
  --config example/plugins/inject-auth-header/apicodegen.config.mjs \
  example/plugins/inject-auth-header/petstore.json
```

Expected log line from the hook:

```
[example] fetchSpec intercepted petstore.json
✓ Generated .../inject-auth-header/api.ts (2 endpoints, 0 schemas) 31ms
```

The generated `api.ts` contains `listPetsUsingGet` /
`showPetByIdUsingGet` — the same endpoints the other examples
produce, because the hook is a passthrough for the spec body.

## How it works

1. `codeGen()` resolves the spec URL to a `(transport, source)` pair
   (here: `('file', '/.../petstore.json')`).
2. Before reading the file, the framework checks if any plugin
   declares a `fetchSpec` hook.
3. The first hook in the list is called with a frozen context
   (`{ initOptions, requestOptions, transport, source }`).
4. The hook returns `{ doc: { ...parsed spec } }` — the framework
   passes this straight to the provider's factory.
5. Subsequent `fetchSpec` hooks are skipped.

## HTTP variant

For remote specs, replace the `readFile` branch with a fetch call
that injects auth headers:

```js
fetchSpec: async ({ transport, source, requestOptions }) => {
  if (transport === 'file') return; // opt out — built-in loader takes over

  const { Base } = await import('@moccona/apicodegen');
  const result = await Base.fetchDoc(source, {
    ...requestOptions,
    headers: {
      ...requestOptions.headers,
      Authorization: `Bearer ${process.env.MY_TOKEN}`,
    },
  });
  return { doc: result };
},
```

## Pitfalls

- **`fetchSpec` is exclusive** (not chained like `transformSpec`).
  The FIRST plugin in the list to return a non-void result wins;
  later hooks are skipped. Returning `void` opts out and lets the
  next hook (or the built-in loader) handle the request.
- **Return either `{ body: string }` or `{ doc: unknown }`** — not
  both. The framework uses `'body' in result` to decide whether to
  `JSON.parse` or pass through. Returning `{ doc: "string-not-object" }`
  will skip JSON.parse and confuse the provider.
- **The ctx is deep-frozen** — `initOptions.docURL`, `requestOptions`,
  `transport`, and `source` are all read-only. Mutating any of them
  throws.
- **For HTTP requests, you can either delegate to `Base.fetchDoc`**
  (preserving retry/timeout/agent behavior) **or call your own fetch**.
  `Base.fetchDoc` is exported from `@moccona/apicodegen` for this
  reason.
