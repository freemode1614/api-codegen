# @moccona/apicodegen

## Unreleased

### Patch Changes

- Refactor: extract `VersionedProvider` base class shared by V2/V3/V3.1, eliminating ~430 lines of duplicated code
- Fix: `Generator.write` now creates output parent directory before writing (resolves 66 failing integration tests) and propagates errors as `ApicodegenError`
- Fix: `VersionedProvider.init` no longer mutates the input OpenAPI spec
- Chore: replace magic string `'E_GENERATION_FAILED'` with `ErrorCodes.GENERATION_FAILED` constant in `cli.ts` and `vite-plugin/index.ts`
- Chore: move `src/cli/logger.ts` to `src/core/logger.ts`; vite-plugin now reuses the shared logger
- Chore: delete unused `configToCLIOptions` dead code
- Tests: add 50 unit tests for `Base` static methods and `Generator.toUrlTemplate`

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
