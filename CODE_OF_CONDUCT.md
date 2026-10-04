# Contributor Code of Conduct & Engineering Guidelines

本项目遵循 [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) 的精神，
并结合微软 TypeScript 工程（[microsoft/TypeScript](https://github.com/microsoft/TypeScript)、
[Microsoft/vscode](https://github.com/microsoft/vscode)）的最佳实践，对贡献者的行为、
协作方式与工程标准做出约定。

---

## 1. 我们的承诺

我们致力于让参与本项目的任何人都不必担心因身份、经验水平、性别、性别认同与表达、性取向、
残障、外貌、体型、国籍、种族、年龄、宗教或技术偏好而受到骚扰。

无论你是第一次提 Issue 的新手，还是核心维护者，我们都期望你：

- 友好且包容；
- 尊重不同的观点与经验；
- 接受建设性的批评，优雅地表达异议；
- 关注对社区最有利的事情。

---

## 2. 不可接受的行为

不可接受的行为包括但不限于：

- 使用性化的语言或图像，以及任何形式的性关注或性挑逗；
- 侮辱性/贬损性评论、人身攻击或政治攻击；
- 公开或私下的骚扰；
- 未经明确许可发布他人的隐私信息（"doxing"）；
- 在专业场合中可合理视为不当的其他行为。

---

## 3. 责任与执行

项目维护者有权且有义务：

- 移除、编辑或拒绝不符合本守则的评论、提交、代码、Issue、Wiki 编辑与其他贡献；
- 对被认定为不当、威胁性、冒犯性或有危害的行为，做出临时或永久的封禁。

维护者的决定是最终决定，但欢迎申诉：在 Issue 中 `@` 维护者即可启动复议流程。

所有投诉都会由维护者团队迅速、公平地审查与处理。

---

## 4. 适用范围

本守则适用于所有项目空间——仓库、Issue、Pull Request、Discussion、CI 评论、邮件列表、
聊天频道以及任何代表项目或社区的公开/私人场合。
当你在其他场所以项目身份出现时，也请遵守本守则。

---

## 5. 工程规范（Engineering Standards）

本节是本仓库的「工程 Code of Conduct」。我们参考微软 TypeScript 工程的实践，
对 TypeScript 编码、构建、测试、提交与协作给出明确规则。

### 5.1 TypeScript 语言准则

本项目 `tsconfig.json` 已经开启 `strict: true`，并面向 Node 24 与 ES2022。所有新增代码必须：

1. **禁止 `any`、禁止隐式 `any`**。需要未指定类型时，使用 `unknown` 并进行类型收窄。
   - 例外：第三方 SDK 的转型边界使用 `unknown` + 自定义类型守卫。
2. **禁止非空断言 `!`**。使用显式的类型守卫或抛出 `Error`。
3. **开启 `strictNullChecks`**：`null` / `undefined` 是有效值，请显式建模。
4. **导出符号必须有显式返回类型与 JSDoc**。这是公共 API 契约，CI 会校验。
5. **优先使用 `type` 别名而不是 `interface`** 表示数据形状；使用 `interface` 表示可扩展的契约。
6. **使用 `readonly`** 修饰不可变字段与索引签名。
7. **避免魔法字符串/数字**：常量集中放在 `src/core/constants/*`。
8. **不要在源码中 `console.log`**：使用 `@moccona/logger`（见 `src/cli/logger.ts`）。

> 这些规则与 [`biome.json`](./biome.json) 中的 `noExplicitAny: off` 等豁免**不冲突**——
> biome 的配置是为了在迁移期减少误报，**但本守则要求新代码遵守上述约束**。

### 5.2 模块化与依赖

1. **CommonJS/ESM**：`package.json` 的 `"type": "module"`，所有源文件使用 ESM 语法，
   文件扩展名由 `tsdown` 与 NodeNext 解析处理，**不要手写 `.js`/`"type": "commonjs"`**。
2. **`engines.node >= 24`**：不得使用未经目标版本支持的语法或 API。
3. **新增依赖前必须先评估**：
   - 优先复用 `@moccona/*` 系列；
   - 评估打包体积、维护活跃度、license；
   - 走 PR 评审后再安装。
4. **peerDependencies**：与外部工程（vite、prettier、typescript）集成的功能必须声明为 peer。

### 5.3 目录与命名

```
src/
├── cli/            # CLI 入口与日志
├── core/           # 内部契约层（config / errors / interface / constants）
│   ├── base/
│   ├── client/
│   ├── generator/
│   └── constants/
├── openapi/        # OpenAPI 2/3/3.1 schema 解析
├── vite-plugin/    # Vite 集成（可选 peer）
├── types/          # 第三方私有类型补充
├── cli.ts
└── index.ts        # 公共 API 入口
```

- 文件名使用 **PascalCase**（类、React 风格组件）或 **kebab-case**（工具模块），与现有保持一致；
- 类型文件统一为 `.ts`（必要时 `types/*.d.ts`）；
- **不要**在 `src/` 之外手写源码——`npm/` 是构建产物。

### 5.4 错误处理

- 业务可恢复错误：抛出自定义错误类，存放在 `src/core/errors.ts`；
- 致命错误：在 CLI 边界统一捕获并通过 logger 打印退出码；
- **永远不要**吞掉 `Error`；保留堆栈与 `cause`。

### 5.5 测试

- 测试框架：**Vitest**，文件位于 `__tests__/`，命名 `*.test.ts`；
- 新增功能必须附带单元测试；Bug 修复必须附带回归测试；
- 不得提交降低覆盖率的代码，除非在 PR 描述中明确说明原因。

### 5.6 提交与变更

- 使用 [Conventional Commits](https://www.conventionalcommits.org/)：
  `feat:`、`fix:`、`docs:`、`refactor:`、`perf:`、`test:`、`build:`、`ci:`、`chore:`。
- 用户可见的变更必须通过 [Changesets](https://github.com/changesets/changesets) 在
  `.changeset/` 下新增一条 changeset；内部变更可省略。
- 单次 PR 聚焦一件事，体积控制在 ~400 行净增以内（不含生成代码）。

### 5.7 自动化检查（不可绕过）

| 阶段        | 命令                | 失败后果             |
| ----------- | ------------------- | -------------------- |
| pre-commit  | `pnpm lint-staged`  | 必须修复或显式 `--no-verify` + 说明 |
| CI lint     | `pnpm lint`         | 阻塞合并             |
| CI typecheck| `pnpm typecheck`    | 阻塞合并             |
| CI test     | `pnpm test`         | 阻塞合并             |
| CI build    | `pnpm build`        | 阻塞合并与发布       |

> Husky + lint-staged + Biome 已就位，请勿尝试 `git commit --no-verify` 而不附理由。

### 5.8 文档

- 任何对外暴露的 API（`src/index.ts`、`src/vite-plugin/index.ts`）必须在 JSDoc 中说明：
  参数、返回值、抛错、示例；
- README、CHANGELOG、API 文档与代码同步更新；
- 重大架构变更需要新建 `docs/adr/NNNN-title.md`（ADR，参考微软工程实践）。

---

## 6. Issue / PR 礼仪

- **先搜后问**：避免重复 Issue；如发现重复，请链接而非新建。
- **一个 Issue 一个主题**，避免在同一线程里夹带多个问题。
- **复现步骤最小化**：Bug Report 必须包含复现命令、期望/实际行为、`pnpm`/Node 版本。
- **PR 描述**：说明动机、改动、影响面、测试方式、是否需要 changeset。
- **Review**：以代码而非人为对象进行讨论；维护者应在 7 天内给出首次回应。

---

## 7. 安全

发现安全问题请**不要**公开提 Issue，参阅 [`SECURITY.md`](./SECURITY.md)（如不存在，请联系维护者私下报告）。
我们会在确认后尽快修复并致谢。

---

## 8. 归属

本守则改编自 [Contributor Covenant 2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)，
并融合了微软 TypeScript 工程的工程实践与社区约定。

---

_本守则适用于本项目的所有公共与私有协作空间；违反本守则将面临上述"责任与执行"一节中描述的处理措施。_
