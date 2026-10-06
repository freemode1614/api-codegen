---
"@moccona/apicodegen": minor
---

Light up the `fetchSpec` hook — the most upstream plugin slot. Plugins
can now replace the spec-loading phase entirely (HTTP auth, custom
artifact stores, YAML support, caching, ...).

- **New file** `src/core/fetch-hooks.ts` — `FetchSpecContext`,
  `FetchSpecHook`, `FetchSpecResult` types. The hook sits in its own
  module (not `spec-hooks.ts`) because the working data is a URL
  string + request options, not a parsed spec doc.
- **New file** `src/core/fetch-hook-runner.ts` —
  `resolveFetchSpecHook(plugins, ctx)`. **Exclusive** resolution
  (first non-void wins), unlike `transformSpec` which is chained.
  This matches the `writeFile` semantic and avoids double-fetching.
- **New `fetchSpec?` field on `Plugin`**. The Plugin JSDoc now lists
  it among live capabilities.
- **Wired into `codeGen()`** between `Base.resolveSpecURL` and the
  built-in file/HTTP loader. The result is either:
  - `{ body: string }` — framework calls `JSON.parse` and passes the
    value to the provider's factory.
  - `{ doc: unknown }` — framework passes the value straight through
    to the provider's factory (skip JSON.parse).
- **Tests** `__tests__/fetch-spec.test.ts` (11 tests): raw-body return,
  pre-parsed-doc return, first-wins exclusivity, void opt-out, async
  hook, ctx.transport/source population, ctx immutability, no-hook
  passthrough, all-void passthrough, runner-level first-non-void
  test, runner-level no-plugin test.
- **Example** `example/plugins/inject-auth-header/` — runnable
  self-contained config (uses local file transport so the demo
  works offline; inline comment shows the HTTP auth-header variant
  using `Base.fetchDoc`).
- **Docs**: `README.md` adds a "Spec loader" subsection with the
  return-shape union, exclusivity semantics, and opt-out pattern.
  Status banner bumped to PR1+PR2+PR3+PR4+PR5.

- **Compatibility**: No breaking changes. Configs without `fetchSpec`
  plugins behave identically to the previous release. The built-in
  `Base.fetchDoc` and `Base.readLocalDoc` are still called when no
  hook takes over.
