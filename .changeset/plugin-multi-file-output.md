---
"@moccona/apicodegen": minor
---

Extend the `writeFile` hook contract to support multi-file output.
A plugin may now return a `Record<path, code>` from its `writeFile`
hook instead of (or in addition to) writing files itself. The
framework calls `Generator.writeMany()` to materialize each entry.

- **Behavior change**: when a `writeFile` hook is present, the
  framework no longer falls through to the built-in `Generator.write`
  afterwards. Plugins that returned `void` and previously relied on
  the built-in writer must either (a) return `{ [ctx.output]: ctx.code }`
  to opt back in, or (b) call `Generator.write` themselves inside the
  hook before returning `void`. This avoids double-writes that bit
  the PR3 test suite when the new return shape was first introduced.

- **`Generator.writeMany(files)`** — new static method on `Generator`.
  Calls `mkdir -p` for each entry's parent directory (so splits into
  new subdirs like `src/` Just Work), then `Generator.write` for each
  entry. Errors are logged to `console.error` (matching single-file
  semantics) and one failed path does not abort the others.

- **New type**: `WriteFileOutput = Readonly<Record<string, string>>`
  exported from `src/core/generator-hooks.ts`. The `WriteFileHook`
  return type is now `WriteFileOutput | void | Promise<...>`.

- **Documentation**:
  - `README.md` Generator hooks section updates the "Hook ordering"
    subsection to describe the two return shapes and points at the new
    example.
  - Plugin shape JSDoc snippet shows the `Record<path, code>` form.
  - `example/plugins/multi-file-output/` ships a runnable demo that
    splits one source into `api.ts`, `types.ts`, `schemas.ts`.

- **Compatibility**:
  - Plugins that previously wrote `void` and called `Generator.write`
    inside the hook: continue to work unchanged.
  - Plugins that previously returned a promise of `void`: continue to
    work unchanged (the framework only writes when the hook returns a
    non-empty map).
  - Plugins that **implicitly relied on the framework's fall-through**
    to the built-in `Generator.write` (rare in practice, but possible):
    must explicitly opt in by returning the map or calling
    `Generator.write` themselves.
  - No changes to `beforeEmit` or `afterFormat`.

- **Tests**:
  New `__tests__/generator-hook.test.ts` cases (4 tests):
  - `writeFile` returning `Record<path, code>` writes multiple files.
  - `writeFile` returning `void` does NOT fall through to built-in.
  - `writeFile` may call `Generator.write` itself and return `void`.
  - `Generator.writeMany` writes each entry independently.
