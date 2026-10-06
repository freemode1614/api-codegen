---
"@moccona/apicodegen": minor
---

Light up the generator hook capabilities on the `Plugin` interface
(PR3). Plugins can now intercept the output pipeline at three points:

- `beforeEmit` — receive the `Statement[]` produced by `schemaToStatemets`,
  return a new (or mutated) array before it is printed.
- `afterFormat` — receive the formatted source string, return a new
  string before it is written.
- `writeFile` — replace `Generator.write` entirely (e.g. emit to
  multiple paths, run lint after write, …).

Hook ordering: `beforeEmit` and `afterFormat` run in plugin-list order
and each receives the previous hook's output. `writeFile` is exclusive —
the first plugin in `plugins[]` that declares one wins; the rest are
skipped.

- **New public API**
  - `BeforeEmitHook`, `AfterFormatHook`, `WriteFileHook` types in
    `src/core/generator-hooks.ts`.
  - `GeneratorHookContext<K>` carries `initOptions`, `schema`,
    `adapter`, `output`, `statements` (and `code` for `afterFormat` /
    `writeFile`).
  - `runBeforeEmitHooks`, `runAfterFormatHooks`, `resolveWriteFileHook`
    in `src/core/hook-runner.ts`.
  - `deepFreeze` / `freezeStatements` helpers in `src/core/ctx-freeze.ts`.

- **Snapshot discipline**
  Every hook receives a deep-frozen snapshot of the context. Plain-data
  fields (`initOptions`, `schema`, `code`) are cloned at every level
  so a plugin cannot mutate upstream state. Class-instance fields
  (`adapter`, `ts.Node` statements) are shallow-frozen — methods remain
  callable and TypeScript compiler internals are preserved.

- **Documentation**
  - `docs/plugins.md` gets a "Generator hooks" section with the
    context shape, ordering rules, and pitfalls (including the
    "destructure the ctx object" gotcha).
  - `README.md` updated with a Generator Hooks subsection and a
    project-structure entry for the new files.

- **Compatibility**
  No breaking changes. Configs without plugins behave identically to
  v0.0.9. Hook slots are optional on `Plugin`.

- **Tests**
  New `__tests__/generator-hook.test.ts` (13 tests) covering:
  hook chaining, async hooks, `writeFile` exclusivity, ctx-shape
  delivery, and the frozen-snapshot guarantees for plain-data and
  class-instance fields across all three hook slots.
