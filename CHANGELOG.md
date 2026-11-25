# @moccona/apicodegen

## 0.1.2

### Patch Changes

- 1f52f98: Align the public types with what the generator actually supports:
  - `MediaTypeObject.type` now accepts real media types
    (`multipart/form-data`, `application/x-www-form-urlencoded`, `application/xml`,
    ...) instead of only the five `MediaTypes` values. Known types keep their
    autocomplete.
  - `ParameterObject.in` is optional — a parameter without `in` has always been
    treated as a body parameter by the generator and the adapters.

- 1f52f98: Fix generated object types ignoring the schema `required` array. A property is
  now emitted as optional (`?`) unless it is listed in the parent schema's
  `required` array; previously every property of an object schema was emitted as
  required, so request bodies of specs that mark optional fields (e.g.
  FastAPI/Pydantic models, where `Optional[...] = None` fields are simply absent
  from `required`) failed to type-check at the call site. (#44)
- 4b1cc7a: Fix 10 known issues in v0.1.1:
  - **Local spec paths**: CLI and Vite plugin no longer wrap local paths in
    `file://`. Generated `Base.resolveSpecURL()` classifier routes local
    files through `readFile` and remote URLs through undici. (#1)
  - **Petstore 3.1 generation**: `application/x-www-form-urlencoded` and other
    media types now map to UpperCamelCase function-name suffixes
    (`FormUrlencoded`, `FormData`, `Json`, `Xml`, ...) instead of the
    previous illegal `X-www-form-urlencoded`. (#2)
  - **Content-Type headers**: `application/json`, `application/x-www-form-urlencoded`
    and other media types now emit an explicit `Content-Type` header. Fixes
    415 errors on real APIs. (#3)
  - **multipart/form-data bodies**: 3.x multipart bodies with file fields
    now correctly emit `FormData` instead of `JSON.stringify`. (#4)
  - **x-www-form-urlencoded bodies**: now built via `URLSearchParams`
    (with `if (req[k] != null)` guards) instead of `JSON.stringify`. (#5, #8)
  - **operationId**: function names use `operationId` when present (verified
    via end-to-end test). (#6)
  - **Response type**: untyped responses now emit `as unknown` (fetch) /
    `<unknown>` generic (axios) instead of implicit any. (#7)
  - **Vite plugin caching**: new `cache` option (default `true`) caches
    generated code at `node_modules/.cache/apicodegen/<hash>.json`; cache
    invalidates on spec mtime/content change. Remote specs are not cached.
    (#9)
  - **Vite peer dependency**: bumped from `^7` to `^7 || ^8` to silence
    install warnings on vite 8 projects. (#10)

## 0.1.1

### Patch Changes

- Fix axios SSE support to actually stream the response. Previously the generated `axios(url, init)` for `text/event-stream` endpoints relied on axios's default adapter, which would still try to parse the response body. The generated call now sets `adapter: 'fetch'` and `responseType: 'stream'` so `response.data` is a `ReadableStream` the caller can iterate directly.

## 0.1.0

### Minor Changes

- Add support for SSE (`text/event-stream`) responses. When an OpenAPI endpoint declares a `text/event-stream` response, the generated function now returns the raw HTTP response (`Promise<Response>` for fetch, `Promise<AxiosResponse>` for axios) without parsing the body, allowing the application layer to consume the event stream directly. Non-SSE responses are unaffected.

  Also fixes a path-alias resolution issue in the Vite plugin's typecheck step by writing a temporary tsconfig that extends the nearest project config.

## 0.0.11

### Patch Changes

- fix: stop camelCasing parameter names in generated code

  Parameter names like `user_id` were being converted to `userId` in function signatures, but referenced as `user_id` elsewhere, causing undefined variable errors. Remove camelCase from parameter name transformation, keeping only normalize.

## 0.0.10

### Patch Changes

- 21e7771: Refactor: extract `VersionedProvider` base class shared by V2/V3/V3.1 OpenAPI providers, eliminating ~430 lines of duplicated code. V3 and V3.1 now each contain only their version-specific container accessors; V2 keeps its own `getParameterByRef` / `getResponseByRef` / `init` overrides because V2's data shapes differ structurally.

  Fix: `Generator.write` now creates the output's parent directory before writing (previously failed with `ENOENT` on nested output paths) and propagates write errors as `ApicodegenError` instead of swallowing them. `VersionedProvider.init` no longer mutates the input OpenAPI spec when injecting a default 200 response.

  Chore: replace magic string `'E_GENERATION_FAILED'` in `cli.ts` and `vite-plugin/index.ts` with the `ErrorCodes.GENERATION_FAILED` constant. Move `src/cli/logger.ts` to `src/core/logger.ts` and split the CLI-specific ASCII banner into `src/cli/banner.ts`; `vite-plugin` now reuses the shared logger. Delete unused `configToCLIOptions` dead code. Add 50 unit tests covering `Base` static methods and `Generator.toUrlTemplate`.

  All 199 tests pass (was 83/149 before, +50 new unit tests, all 66 previously failing integration tests now pass).

## 0.0.9

### Patch Changes

- Update release workflow and CLI, clean up changesets

## 0.0.8

### Patch Changes

- f210c6a: Fix shebang for cross-platform compatibility (#/bin/env -> /usr/bin/env)
- d081335: Update release workflow and CLI

## 0.0.7

### Patch Changes

- 202d67d: - Add `typecheck` script and CI job
  - Add release workflow with GitHub Actions
  - Improve README with troubleshooting, peer dependencies, custom axios
  - Fix vite-plugin import path (use /vite instead of /vite-plugin)
  - Add concurrency control to release workflow
  - Remove obsolete oxlint config

## 0.0.3

### Patch Changes

- ## Bug Fixes
  - 修复生成代码的类型错误
  - 修复 V2 生成代码的错误
  - 修复两个测试用例的错误
  - 修复变量相关问题

  ## Improvements
  - 优化测试用例
  - 切换 TS 语法错误的检查方式
  - 移除针对 response 的不必要 as 类型断言（当 response 没有指定 schema 时）

  ## Dependencies
  - 升级 pkg-manager
  - 升级项目依赖

  ## Documentation
  - 添加 README 文件
  - 添加文档注释

## 0.0.2

### Patch Changes

- Fix intersection type error

## 0.0.1

### Patch Changes

- First release including a vite-plugin
