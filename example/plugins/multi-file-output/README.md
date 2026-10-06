# Example: multi-file output plugin

A runnable end-to-end example showing how a `writeFile` hook can split
a single generated source into multiple files. This demonstrates the
new `Record<path, code>` return shape of `writeFile` — when a hook
returns a map, the framework calls `Generator.writeMany` to write every
entry (and `mkdir -p` the parent directories automatically).

## Files

- `apicodegen.config.mjs` — exports a `Plugin` (via `definePlugin`) plus
  a full `ApicodegenConfig`. The plugin's `writeFile` hook returns three
  paths:
  - `src/api.ts`     — the original generated source (prepended with a
    comment marker).
  - `src/types.ts`   — a marker type barrel.
  - `src/schemas.ts` — an empty schema barrel.
- `petstore.json` — the same 2-endpoint OpenAPI 3 fixture used by the
  other examples.

## Running

From the repo root:

```bash
pnpm exec tsdown
node bin/cli.cjs \
  --config example/plugins/multi-file-output/apicodegen.config.mjs \
  example/plugins/multi-file-output/petstore.json
```

After running, `example/plugins/multi-file-output/src/` will contain:

```
api.ts        # 633 bytes — generated source + marker comment
types.ts      # 64 bytes  — `export type ApiSource = "split";`
schemas.ts    # 44 bytes  — empty schema barrel
```

## How it works

1. The plugin's `writeFile` hook receives the same frozen context as
   before (`{ code, output, ... }`). It returns a `Record<path, code>`.
2. `codeGen()` sees the non-void return, calls
   `Generator.writeMany(result)`.
3. `Generator.writeMany` calls `mkdir -p` for each entry's parent
   directory, then `Generator.write` for the file itself. Errors are
   logged (matching the single-file `write()` semantics); one failed
   path does not abort the others.

## Pitfalls

- **`writeFile` returning `void` does NOT fall through to the built-in
  writer** — the framework treats any `writeFile` hook as taking full
  responsibility for output. If you want a plugin to still write the
  default single file, return `{ [ctx.output]: ctx.code }` (or have
  the hook call `Generator.write` itself before returning `void`).
- **Paths are resolved relative to `process.cwd()`.** Use absolute
  paths to write outside the project root. `mkdir -p` is automatic —
  no need to pre-create directories.
- **`writeFile` is exclusive.** The FIRST plugin in `plugins[]` to
  declare it wins; later plugins' `writeFile` hooks are skipped.
