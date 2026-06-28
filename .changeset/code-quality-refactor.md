---
"@moccona/apicodegen": patch
---

Refactor: extract `VersionedProvider` base class shared by V2/V3/V3.1 OpenAPI providers, eliminating ~430 lines of duplicated code. V3 and V3.1 now each contain only their version-specific container accessors; V2 keeps its own `getParameterByRef` / `getResponseByRef` / `init` overrides because V2's data shapes differ structurally.

Fix: `Generator.write` now creates the output's parent directory before writing (previously failed with `ENOENT` on nested output paths) and propagates write errors as `ApicodegenError` instead of swallowing them. `VersionedProvider.init` no longer mutates the input OpenAPI spec when injecting a default 200 response.

Chore: replace magic string `'E_GENERATION_FAILED'` in `cli.ts` and `vite-plugin/index.ts` with the `ErrorCodes.GENERATION_FAILED` constant. Move `src/cli/logger.ts` to `src/core/logger.ts` and split the CLI-specific ASCII banner into `src/cli/banner.ts`; `vite-plugin` now reuses the shared logger. Delete unused `configToCLIOptions` dead code. Add 50 unit tests covering `Base` static methods and `Generator.toUrlTemplate`.

All 199 tests pass (was 83/149 before, +50 new unit tests, all 66 previously failing integration tests now pass).
