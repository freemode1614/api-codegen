## Why

代码评审发现 `@moccona/apicodegen` 存在三类问题，阻碍可维护性与发布质量：

1. **真实产品 bug**：集成测试 66/149 (44%) 失败 — codegen 在多个真实 OpenAPI 文档上产出无法通过 `tsc --noEmit` 的 TypeScript。说明生成器在边界情况（嵌套引用、union/intersection、ref 解析）下生成的类型有缺陷。
2. **架构债**：`V2.ts` / `V3.ts` / `V3_1.ts` 三个文件约 1,300 行近乎相同的转换逻辑（三份 `getSchemaByRef` / `toBaseSchema` / `getParameterByRef` / `getResponseByRef` / `getRequestBodyByRef` / `init`），任何修复都要改三处。死代码（如 `configToCLIOptions`）、吞错误的 `Generator.write`、魔术字符串、与项目其它部分不一致的裸 `console.log` 输出都加剧了维护成本。
3. **测试覆盖不足**：核心纯函数（`Base.normalize` / `ref2name`、`Generator.toUrlTemplate`）无单测，导致问题只在集成测试以 `tsc` 报错的形式暴露，定位成本高。

现在整改是因为：项目已发布 0.0.9，添加新 OpenAPI 特性前必须先收敛现有质量问题，否则新代码会继续叠加在不稳定基础上。

## What Changes

- **修复 codegen 在真实 spec 上产出非法 TS 的问题**：定位并修复导致 `openapi-workshop` / `schema-types` / `security` / `train-travel` 等 spec 集成测试失败的具体生成错误
- **重构 V2/V3/V3.1 解析层消除重复**：抽出一个共享的 `VersionedProvider` 抽象基类或工具模块，三个版本只覆盖差异点
- **删除 `configToCLIOptions` 死代码**（`src/core/config.ts:284`）
- **统一 vite-plugin 与 CLI 的日志输出**：让 `src/vite-plugin/index.ts` 改用 `src/cli/logger.ts`（或提炼为 `src/core/logger.ts`），消除裸 `console.log` + ANSI 字面量散落
- **收紧错误传播**：`Generator.write` 不再静默吞错，抛出 `ApicodegenError`
- **替换魔术字符串**：将 `'E_GENERATION_FAILED'` 等替换为 `ErrorCodes.*` 常量
- **为 `Base.normalize` / `ref2name` / `camelCase` / `upperCamelCase` 与 `Generator.toUrlTemplate` 添加单元测试**

## Capabilities

### New Capabilities

- `provider-architecture`: 定义共享的 `VersionedProvider` 抽象，规定三个 OpenAPI 版本（v2/v3/v3.1）如何复用 schema 解析、参数处理、请求体/响应处理、API 路径收集等核心逻辑。约束每个版本只实现差异点（definitions vs components.schemas、parameters vs requestBodies、版本号识别等）。
- `core-utilities-testing`: 为 `Base` 工具方法（`normalize`、`ref2name`、`isRef`、`isValidEnumType`、`isBooleanEnum`、`findSameSchema`、`uniqueEnums`）与 `Generator.toUrlTemplate` 添加单元测试，保证纯函数行为有显式契约。

### Modified Capabilities

无（项目尚无已发布 spec；新能力足以覆盖此变更的所有契约变更）

## Impact

- **代码**：
  - `src/openapi/V2.ts` (~456 行) / `V3.ts` (~452 行) / `V3_1.ts` (~448 行) — 大幅缩减
  - `src/core/config.ts` — 删除 `configToCLIOptions` 导出
  - `src/core/generator/index.ts` — 修复 bug，改 `Generator.write` 抛出错误
  - `src/vite-plugin/index.ts` — 替换裸 `console.log` 为统一 logger
  - `src/cli/logger.ts` — 视情况提升到 `src/core/logger.ts` 供 Vite 插件复用
  - `src/cli.ts` — 用 `ErrorCodes.GENERATION_FAILED` 替代字面量
  - `__tests__/` — 新增纯函数单测文件
- **API**：无破坏性变更（本次不引入新的对外 API，也不修改现有导出）
- **依赖**：无新增依赖；`fs-extra` 替换可作为后续 follow-up（不在本变更范围）
- **测试**：所有 66 个失败的集成测试应在变更完成后通过
