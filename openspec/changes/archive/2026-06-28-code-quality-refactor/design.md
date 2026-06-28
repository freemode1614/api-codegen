## Context

`@moccona/apicodegen` 的 OpenAPI 解析层由三个几乎相同的类组成（`src/openapi/V2.ts`、`V3.ts`、`V3_1.ts`，各 ~450 行）。它们各自实现了 `getSchemaByRef`、`toBaseSchema`、`getParameterByRef`、`getResponseByRef`、`getRequestBodyByRef`、`init` 等方法，内容上 95% 相同，差异仅在于：

- **v2**：`definitions` 替代 `components.schemas`；`parameters` 在根级；`responses` 在根级；`requestBodies` 不存在
- **v3**：`components.schemas/parameters/responses/requestBodies`
- **v3.1**：与 v3 结构相同，但 `SchemaObject.type` 可为 `string[]`（union of types），且部分类型表达略不同

三个版本之间仅有的行为差异：

1. 读取 schema/parameter/response/requestBody 容器的字段路径
2. `toBaseSchema` 中处理 `oneOf` / `anyOf` / `allOf` 时，对 v3 与 v3.1 是否附加 `isRef` 标记的小差异
3. V3.1 中 `isOpenAPIArraySchema` 多了对 `type` 数组的支持

此外，集成测试中 66/149 失败。初步判断失败集中在：
- 多个 operation 共用 path 时的 `responses[code]` 复用（`V3.ts:407-413` 的 `Object.assign(responses, ...)` 会污染原 spec）
- `Base.ref2name` 在遇到无法解析的 ref 时静默返回 `'unknown'`，导致生成代码中的类型引用为字面量 `unknown`
- 嵌套 `$ref` 链式解析时未走完所有 `$ref` 段

最后，`src/vite-plugin/index.ts` 用裸 `console.log` + 内联 ANSI 转义输出，与 `src/cli/logger.ts` 的彩色 logger 并行存在，两套输出系统维护成本高。

## Goals / Non-Goals

**Goals:**

- 让 `V2` / `V3` / `V3_1` 共用一个 `VersionedProvider` 抽象，每个版本只覆盖差异点
- 修复 66 个失败的集成测试，确保所有真实 spec（openapi-workshop 等）能产出可 `tsc --noEmit` 通过的 TS
- 消除 `src/core/config.ts:284` 的 `configToCLIOptions` 死代码
- 统一 `vite-plugin` 与 `cli` 的日志输出（提取 logger 到 `src/core/logger.ts` 或将 vite-plugin 引入 `cli/logger.ts`）
- 替换 `Generator.write` 静默错误吞咽，改为抛出 `ApicodegenError`
- 替换 `src/cli.ts:190` 中 `'E_GENERATION_FAILED'` 字面量为 `ErrorCodes.GENERATION_FAILED`
- 为 `Base` 工具方法与 `Generator.toUrlTemplate` 添加单测

**Non-Goals:**

- 不替换 `fs-extra`（作为后续 follow-up）
- 不调整 `Base.fetchDoc` 的网络行为（重试/超时/缓存为单独变更）
- 不引入新的对外 API
- 不修改任何 `package.json` 中的依赖
- 不重写 `Generator` 的 TypeScript 工厂代码

## Decisions

### Decision 1: 抽出 `VersionedProvider` 抽象基类（位于 `src/openapi/VersionedProvider.ts`）

**方案 A（采用）**：基类持有所有版本共享的 `getSchemaByRef` / `toBaseSchema` / `getParameterByRef` / `getResponseByRef` / `getRequestBodyByRef` / `init` 等方法的实现，但这些实现通过 protected 抽象方法访问版本特定数据：
- `getSchemaContainer(): Record<string, OpenAPIXxx.SchemaObject> | undefined` — 返回 `definitions`（v2）或 `components.schemas`（v3/v3.1）
- `getParameterContainer()`, `getResponseContainer()`, `getRequestBodyContainer()` 同理
- `normalizeSchema(schema)` 钩子 — 让 v3.1 单独处理 `type: string[]` 的情况
- `getVersion(): OpenAPIVersion`

子类只保留 ~30-60 行的版本特定实现。

**方案 B（拒绝）**：用泛型函数（如 `parseOpenAPIDoc<V2|V3|V3_1>(doc, version): ProviderInitResult`）替换类。缺点是类型守卫、ref 解析、循环引用处理都退化成运行时分支，可读性更差。

**方案 C（拒绝）**：保留三个独立类，提取公共工具函数到 `utils.ts`。不能解决 1,300 行重复的事实。

### Decision 2: 不在重构中重写 codegen 行为，仅消除重复

重构保留所有现有行为（包括 `Base.ref2name` 在失败时返回 `'unknown'` 的语义），先消除重复。bug 修复以**单独的诊断 + 修复任务**形式在 `tasks.md` 中列出（受 `provider-architecture` spec 约束），避免在重构 PR 中混入行为变更。

### Decision 3: `VersionedProvider` 内部用 `unknown` 类型的 `doc` 字段 + 受保护访问器

- 基类声明 `protected doc: unknown`，子类在构造时断言为 `OpenAPIV2.Document` 等
- 受保护方法 `getDoc<T>(): T` 强制子类用泛型访问
- 这样保持类型安全又避免 `as unknown as ...` 在多处散布

### Decision 4: 提取 `src/core/logger.ts`，让 vite-plugin 与 cli 共用

**方案 A（采用）**：把 `src/cli/logger.ts` 移到 `src/core/logger.ts`（不带 CLI 专属的 banner），vite-plugin 引入。CLI 的 banner 留在 `src/cli/banner.ts`。

**方案 B（拒绝）**：vite-plugin 继续用裸 `console.log`。继续维护两套系统，违反单一职责。

### Decision 5: `Generator.write` 改为抛出错误而非吞咽

- 当前实现：`catch (error) { console.error(error); }` — 调用方拿不到失败信号
- 改为抛出 `ApicodegenError`，由 `cli.ts` 与 `vite-plugin/index.ts` 已有的 `try/catch` 路径统一处理
- 这与本变更 "收紧错误传播" 的目标一致

### Decision 6: 单测文件按工具分类放，不建镜像目录

- `__tests__/base.test.ts` — 覆盖 `Base` 所有静态方法
- `__tests__/generator-url.test.ts` — 覆盖 `Generator.toUrlTemplate`
- 集成测试 `__tests__/index.test.ts` 保持现状（依赖外部 `serve-handler`），但要新增输出目录清理钩子

## Risks / Trade-offs

- **重构风险**：抽公共基类可能引入细微行为差异，导致原本"恰好通过"的测试在新结构下失败。
  → **缓解**：`tasks.md` 中"重构"任务以"先复制后抽象"方式执行，每个版本类先逐字搬到基类再删除重复；保证中间状态所有 66 个失败测试仍维持原样
- **`isRef` 标志在 v3 vs v3.1 的差异**（V3.ts:312-318 标记 `isRef: true`，V3_1.ts:308-314 同样）已确认一致，但需在抽象时通过单测覆盖以防回归
- **`ref2name` 静默返回 `'unknown'`** 的行为保留 → 集成测试仍可能因为这个原因失败。`tasks.md` 中"修复失败集成测试"任务需先单独调查每个失败 spec 的具体错误模式
- **`Generator.write` 抛出错误可能影响测试**：集成测试中代码生成后才 `tsc --noEmit`，写文件失败现在会冒泡到测试
  → **缓解**：在 `tasks.md` 中确认 `Generator.write` 错误信息清晰，必要时给测试增加专门的写权限检查
- **重构后行数可能不减反增**（如果基类接口设计过度）。以"消除三处重复"而非"行数减少"为完成判据
- **未引入新依赖**，因此无供应链风险

## Migration Plan

无破坏性变更，按以下顺序执行：

1. 增加 `provider-architecture` 与 `core-utilities-testing` 的单测（红）
2. 添加 `src/openapi/VersionedProvider.ts` 基类，将 `V3` 的实现迁入
3. 让 `V3` 继承基类（`V3.ts` 仅剩版本特定代码），运行测试
4. 让 `V2`、`V3_1` 同理继承基类
5. 删除原 `V2/V3/V3_1` 中的重复方法
6. 提取 `src/core/logger.ts`，替换 vite-plugin 中的 `console.log`
7. 删除 `configToCLIOptions`
8. `Generator.write` 改为抛错
9. 替换 `cli.ts` 中魔术字符串
10. 添加 `Base` 与 `Generator.toUrlTemplate` 的单测
11. 运行 `pnpm test`，所有 149 个测试应通过
12. 运行 `pnpm lint` 与 `pnpm typecheck` 确保无回归

回滚策略：本变更的所有改动都在 `src/` 与 `__tests__/`，可通过 `git revert` 整体回滚；无数据库迁移、无对外 API 变更。

## Open Questions

- `Base.ref2name` 在 ref 解析失败时返回 `'unknown'` 的行为是否保留？这影响 `tasks.md` 中"修复失败集成测试"任务的范围 — 若保留，需在每个失败 spec 中调查是否由 ref 解析失败引起；若不保留，需引入 `ApicodegenError` 抛出但可能破坏向后兼容（生成代码原本允许 `unknown` 兜底）
- `tsdown.config.ts` 是否纳入 biome 检查范围（目前只检查 `src/`，导致该文件用双引号违规）— 建议加进 `files.includes` 或维持现状（本变更不处理）
