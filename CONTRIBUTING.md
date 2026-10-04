# Contributing to `@moccona/apicodegen`

[English](#english) · [中文](#中文)

---

<a id="english"></a>

## English

Hi there! We're thrilled that you'd like to contribute to `@moccona/apicodegen`.
Your help is essential to keeping it great.

Contributions to this project are
[released](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service#6-contributions-under-repository-license)
to the public under the project's open source license ([MIT](./LICENSE)).

> **Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md).
> By participating in this project you agree to abide by its terms.**

---

## Table of contents

1. [Code of conduct](#code-of-conduct)
2. [Project layout](#project-layout)
3. [Development setup](#development-setup)
4. [Issue guidelines](#issue-guidelines)
5. [Submitting a pull request](#submitting-a-pull-request)
6. [Engineering standards](#engineering-standards)
7. [Release & versioning](#release--versioning)
8. [Reporting security issues](#reporting-security-issues)
9. [Communication](#communication)
10. [Resources](#resources)

---

## Code of conduct

This project follows the
[Contributor Covenant 3.0](./CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable
behavior via the channels described in [`SECURITY.md`](./SECURITY.md).

---

## Project layout

```
.
├── src/              # Source code (ESM, TypeScript)
│   ├── cli/          # CLI entry & logger
│   ├── core/         # Internal contracts (config / errors / generator)
│   ├── openapi/      # OpenAPI 2 / 3 / 3.1 schema parsers
│   ├── vite-plugin/  # Optional Vite integration
│   ├── types/        # Third-party ambient types
│   ├── cli.ts        # CLI entry point
│   └── index.ts      # Public API entry point
├── __tests__/        # Vitest unit tests
├── docs/             # Roadmap, ADRs, design notes
├── bin/              # Compiled CLI launcher
├── npm/              # Build output (DO NOT EDIT)
├── .changeset/       # Changesets entries
├── .github/workflows # GitHub Actions: CI, Release
└── .husky/           # Git hooks (pre-commit → lint-staged)
```

The published artifact is generated from `src/` via `tsdown` into `npm/`.
**Never hand-edit files inside `npm/`.**

---

## Development setup

### Prerequisites

- **Node.js ≥ 24** (see `engines` in `package.json`)
- **pnpm 10.x** (`corepack enable && corepack prepare pnpm@10.9.0 --activate`)
- A POSIX shell (Linux/macOS/WSL)

### One-time setup

```bash
git clone https://github.com/freemode1614/api-codegen.git
cd api-codegen
pnpm install --frozen-lockfile
```

The `prepare` script installs Husky hooks automatically, so
`pre-commit` will run `lint-staged` for you.

### Daily commands

| Command              | What it does                                              |
| -------------------- | --------------------------------------------------------- |
| `pnpm dev`           | `tsdown --watch`, rebuild on file change                  |
| `pnpm build`         | Produce the `npm/` artifact                               |
| `pnpm test`          | Run Vitest once (CI mode)                                 |
| `pnpm typecheck`     | `tsc --noEmit` over `src/` + `__tests__/`                 |
| `pnpm lint`          | Biome lint over `src/`                                    |
| `pnpm lint:fix`      | Biome lint with `--write`                                 |
| `pnpm format`        | Biome format with `--write`                               |
| `pnpm debug`         | Run the CLI under `node --inspect-brk=9229`               |

Before opening a PR, **all four** checks must pass locally:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

---

## Issue guidelines

### Before you file

- Search [open issues](https://github.com/freemode1614/api-codegen/issues)
  and [closed ones](https://github.com/freemode1614/api-codegen/issues?q=is%3Aissue+is%3Aclosed).
- Read the [README](./README.md) and the docs in [`docs/`](./docs).
- If unsure, open a [Discussion](https://github.com/freemode1614/api-codegen/discussions)
  first—do **not** pollute the Issue tracker with speculation.

### Bug report

Include:

- A clear, descriptive title
- `pnpm` and `node -v` output
- Minimal reproduction (input spec, command, observed vs. expected output)
- Stack trace if applicable
- Environment (OS, terminal, Vite version if using the plugin)

### Feature request

Describe the **problem** first, then the proposed solution. Explain why existing
APIs don't solve it. Sketch an API surface if you can.

---

## Submitting a pull request

1. **Fork & clone** the repository.
2. **Create a topic branch**: `git checkout -b feat/short-topic-name` or
   `fix/short-topic-name`. **Do not** commit directly to `main`.
3. Make your change. Keep it focused—one PR, one concern.
4. Add or update tests under `__tests__/`.
5. Update docs in `README.md` / `docs/` and add a JSDoc block on every exported
   symbol you touch.
6. Run all CI gates locally:
   ```bash
   pnpm lint && pnpm typecheck && pnpm test && pnpm build
   ```
7. If your change is **user-visible**, add a Changeset:
   ```bash
   pnpm changeset
   ```
   Pick the appropriate semver bump (`major` / `minor` / `patch`) and write
   a one-line description. Internal refactors do not need one.
8. **Commit** with [Conventional Commits](https://www.conventionalcommits.org/)
   (e.g. `feat(cli): support OpenAPI 3.1 nullable schemas`).
9. **Push** to your fork and open a PR.
10. Wait for review. Expect a first response within **7 days**.

### PR checklist

A PR is more likely to be merged when:

- [ ] Tests cover the new behavior and edge cases
- [ ] Public API additions include JSDoc and a `docs/` note
- [ ] Conventional Commit title is used
- [ ] Changeset is present (for user-visible changes)
- [ ] CI is green: `lint`, `typecheck`, `test`, `build`
- [ ] Diff is reviewable (< ~400 net lines excluding generated code)

---

## Engineering standards

We follow the [Microsoft TypeScript engineering playbook](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Meeting-Notes).
The full rules live in [`CODE_OF_CONDUCT.md` §5](./CODE_OF_CONDUCT.md);
the condensed version:

### TypeScript

- **No `any`, no non-null assertions, no implicit `any`** in new code.
- Use `unknown` + type guards at trust boundaries.
- Exported symbols require explicit return types and JSDoc.
- Prefer `type` aliases for data shapes; `interface` for extensible contracts.
- All `null`/`undefined` are modeled explicitly (`strictNullChecks` is on).

### Modules & dependencies

- ESM only (`"type": "module"`). No CommonJS in `src/`.
- Runtime target: Node ≥ 24, ES2022.
- New dependencies require maintainer review. Update `peerDependencies`
  when touching integration surfaces (Vite, Prettier, TypeScript).

### Code style

- Formatting is enforced by **Biome** (`biome.json`). Don't argue style;
  let Biome settle it. Run `pnpm lint:fix` and `pnpm format`.
- Pre-commit hook runs `biome check --write` and `biome format --write`
  on staged files. Use `git commit --no-verify` only with a written reason.

### Tests

- **Vitest**, files in `__tests__/`, naming `*.test.ts`.
- New features ship with unit tests; bug fixes ship with regression tests.

### Architecture decisions

- Significant changes (new public API, dependency additions, breaking changes)
  need an ADR: `.github/ADR/NNNN-kebab-title.md`. Use the template:
  ```
  # NNNN. Title

  - Status: Proposed | Accepted | Superseded
  - Date: YYYY-MM-DD
  - Context
  - Decision
  - Consequences
  ```

---

## Release & versioning

We use [Changesets](https://github.com/changesets/changesets). The release
workflow is fully automated (`.github/workflows/release.yml`):

```bash
pnpm changeset          # add an entry
pnpm version            # bump versions, update CHANGELOG.md
pnpm publish            # cut the release via CI on tag push
```

- Releases are tagged `vX.Y.Z` and pushed automatically.
- `main` is always releasable; never merge a red CI.
- Breaking changes require a `major` bump and a `BREAKING CHANGE:` footer
  in the commit message **or** a `major` changeset.

---

## Reporting security issues

**Do not file public Issues, Discussions, or PRs for security vulnerabilities.**

Please follow the disclosure process in [`SECURITY.md`](./SECURITY.md):
use GitHub's private vulnerability reporting or contact a maintainer directly.
We will acknowledge within 3 business days.

---

## Communication

- **Bug reports & features**: GitHub Issues
- **Questions & ideas**: GitHub Discussions
- **Security**: see [`SECURITY.md`](./SECURITY.md)
- **Maintainers**: see [`package.json`](./package.json) `author` field

Discussions in non-English are welcome, but English is preferred for searchability.

---

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)
- [GitHub Help](https://help.github.com)
- [Conventional Commits 1.0](https://www.conventionalcommits.org/)
- [Changesets documentation](https://github.com/changesets/changesets)

---

<a id="中文"></a>

## 中文

感谢你有兴趣为 `@moccona/apicodegen` 做出贡献！你的每一份帮助都让项目变得更好。

本项目遵循 [MIT 许可证](./LICENSE)。提交贡献即表示你同意以相同许可证发布你的贡献。

> **本项目附带 [贡献者行为准则](./CODE_OF_CONDUCT.md)。
> 参与本项目即视为你同意遵守其条款。**

---

### 目录

1. [行为准则](#行为准则)
2. [项目结构](#项目结构)
3. [开发环境搭建](#开发环境搭建)
4. [提交 Issue](#提交-issue)
5. [提交 Pull Request](#提交-pull-request)
6. [工程规范](#工程规范)
7. [发布与版本管理](#发布与版本管理)
8. [报告安全问题](#报告安全问题)
9. [沟通渠道](#沟通渠道)
10. [参考资料](#参考资料)

---

### 行为准则

本项目遵循 [Contributor Covenant 3.0](./CODE_OF_CONDUCT.md)。
参与时，请保持友善与专业；任何不可接受的行为请通过
[`SECURITY.md`](./SECURITY.md) 中描述的渠道举报。

---

### 项目结构

```
.
├── src/              # 源代码（ESM、TypeScript）
│   ├── cli/          # CLI 入口与日志
│   ├── core/         # 内部契约（config / errors / generator）
│   ├── openapi/      # OpenAPI 2 / 3 / 3.1 schema 解析
│   ├── vite-plugin/  # 可选的 Vite 集成
│   ├── types/        # 第三方私有类型补充
│   ├── cli.ts        # CLI 入口
│   └── index.ts      # 公共 API 入口
├── __tests__/        # Vitest 单元测试
├── docs/             # 路线图、ADR、设计文档
├── bin/              # 编译后的 CLI 启动器
├── npm/              # 构建产物（请勿手动修改）
├── .changeset/       # Changesets 变更条目
├── .github/workflows # GitHub Actions：CI、Release
└── .husky/           # Git 钩子（pre-commit → lint-staged）
```

发布产物由 `src/` 经 `tsdown` 打包到 `npm/`，**任何情况下都不要直接修改 `npm/` 内的文件**。

---

### 开发环境搭建

#### 前置依赖

- **Node.js ≥ 24**（见 `package.json` 中的 `engines`）
- **pnpm 10.x**（`corepack enable && corepack prepare pnpm@10.9.0 --activate`）
- POSIX 兼容的 shell（Linux / macOS / WSL）

#### 一次性初始化

```bash
git clone https://github.com/freemode1614/api-codegen.git
cd api-codegen
pnpm install --frozen-lockfile
```

`prepare` 脚本会自动安装 Husky 钩子，使 `pre-commit` 自动运行 `lint-staged`。

#### 日常命令

| 命令                | 作用                                              |
| ------------------- | ------------------------------------------------- |
| `pnpm dev`          | `tsdown --watch`，文件变化自动重建                |
| `pnpm build`        | 生成 `npm/` 产物                                  |
| `pnpm test`         | 运行一次 Vitest（CI 模式）                        |
| `pnpm typecheck`    | `tsc --noEmit`，覆盖 `src/` 与 `__tests__/`        |
| `pnpm lint`         | Biome 检查 `src/`                                 |
| `pnpm lint:fix`     | Biome 检查并自动修复                              |
| `pnpm format`       | Biome 格式化并自动写回                            |
| `pnpm debug`        | 以 `node --inspect-brk=9229` 启动 CLI             |

提交 PR 前，**四项检查必须在本地全部通过**：

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

---

### 提交 Issue

#### 提交前

- 搜索 [open issues](https://github.com/freemode1614/api-codegen/issues)
  与 [closed issues](https://github.com/freemode1614/api-codegen/issues?q=is%3Aissue+is%3Aclosed)。
- 阅读 [README](./README.md) 与 [`docs/`](./docs) 中的文档。
- 如果拿不准，先开 [Discussion](https://github.com/freemode1614/api-codegen/discussions) 讨论——**不要**在 Issue 区灌水。

#### Bug 报告

请包含：

- 清晰描述问题的标题
- `pnpm -v` 与 `node -v` 输出
- 最小复现（输入 spec、命令、实际输出与期望输出）
- 必要时附上堆栈信息
- 环境信息（OS、终端、若用 Vite 插件请附版本）

#### 功能请求

先描述**问题**，再描述解决方案。说明现有 API 为何不能解决；尽量画出 API 形状。

---

### 提交 Pull Request

1. **Fork & clone** 仓库。
2. **新建 topic 分支**：`git checkout -b feat/xxx` 或 `fix/xxx`，**不要**直接提交到 `main`。
3. 实现变更。保持聚焦——一个 PR 只解决一个问题。
4. 在 `__tests__/` 下补充或更新测试。
5. 更新 `README.md` / `docs/`，并为新增/修改的导出符号补充 JSDoc。
6. 在本地跑完所有 CI 检查：
   ```bash
   pnpm lint && pnpm typecheck && pnpm test && pnpm build
   ```
7. 若变更**对用户可见**，新增一条 Changeset：
   ```bash
   pnpm changeset
   ```
   选择正确的 semver 级别（`major` / `minor` / `patch`）并写一句话说明。内部重构可省略。
8. 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/)
   （如 `feat(cli): support OpenAPI 3.1 nullable schemas`）。
9. 推送到你的 fork 并开 PR。
10. 等待评审。维护者会在 **7 天内**给出首次回应。

#### PR 自检清单

- [ ] 测试覆盖了新行为与边界条件
- [ ] 公共 API 变更附带 JSDoc 与 `docs/` 说明
- [ ] 使用 Conventional Commits 标题
- [ ] 已添加 Changeset（用户可见变更）
- [ ] CI 全绿：`lint` / `typecheck` / `test` / `build`
- [ ] 改动可审阅（净增 < ~400 行，不含生成代码）

---

### 工程规范

完整规则见 [`CODE_OF_CONDUCT.md` §5](./CODE_OF_CONDUCT.md)。
摘要如下：

#### TypeScript

- 新代码**禁止** `any`、`!` 非空断言、隐式 `any`。
- 在不可信边界使用 `unknown` + 类型守卫。
- 导出符号必须有显式返回类型与 JSDoc。
- 数据形状优先使用 `type` 别名；可扩展契约使用 `interface`。
- `null`/`undefined` 必须显式建模（已开启 `strictNullChecks`）。

#### 模块与依赖

- 纯 ESM（`"type": "module"`），`src/` 内禁止 CommonJS。
- 运行时目标：Node ≥ 24，ES2022。
- 新增依赖需维护者评审；触及集成面（Vite、Prettier、TypeScript）时同步更新 `peerDependencies`。

#### 代码风格

- 由 **Biome**（`biome.json`）强制统一。**不要争论风格**——交给 Biome。
  运行 `pnpm lint:fix` 与 `pnpm format` 即可。
- pre-commit 钩子会对暂存文件运行 `biome check --write` 与 `biome format --write`。
  `git commit --no-verify` 仅在书面说明理由后使用。

#### 测试

- **Vitest**，测试文件位于 `__tests__/`，命名为 `*.test.ts`。
- 新功能必须附带单元测试；Bug 修复必须附带回归测试。

#### 架构决策

- 重要变更（新增公共 API、引入依赖、破坏性变更）需要新建 ADR：
  `.github/ADR/NNNN-kebab-title.md`，使用以下模板：
  ```
  # NNNN. 标题

  - Status: Proposed | Accepted | Superseded
  - Date: YYYY-MM-DD
  - Context（背景）
  - Decision（决策）
  - Consequences（影响）
  ```

---

### 发布与版本管理

本项目使用 [Changesets](https://github.com/changesets/changesets)，
发布流程完全自动化（`.github/workflows/release.yml`）：

```bash
pnpm changeset          # 新增变更条目
pnpm version            # 提升版本号、更新 CHANGELOG.md
pnpm publish            # 推送 tag 后由 CI 完成发布
```

- 发布标签为 `vX.Y.Z`，由 CI 自动推送。
- `main` 必须始终处于可发布状态：永远不要合入红 CI。
- 破坏性变更需要 `major` 提升，并在 commit 信息中加 `BREAKING CHANGE:` 注脚
  **或**新建一条 `major` changeset。

---

### 报告安全问题

**不要**通过公开 Issue、Discussion 或 PR 报告安全漏洞。

请遵循 [`SECURITY.md`](./SECURITY.md) 中的披露流程：使用 GitHub 私有漏洞报告
或直接联系维护者。我们承诺在 3 个工作日内回复。

---

### 沟通渠道

- **Bug 报告 / 功能请求**：GitHub Issues
- **问题与想法**：GitHub Discussions
- **安全问题**：见 [`SECURITY.md`](./SECURITY.md)
- **维护者**：见 [`package.json`](./package.json) 中 `author` 字段

非英语讨论也欢迎，但出于可检索性考虑优先使用英语。

---

### 参考资料

- [如何参与开源](https://opensource.guide/how-to-contribute/)
- [使用 Pull Request](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests)
- [GitHub 帮助](https://help.github.com)
- [Conventional Commits 1.0](https://www.conventionalcommits.org/)
- [Changesets 文档](https://github.com/changesets/changesets)

---

_This document is adapted from the
[GitHub contributing template](https://github.com/github/.github/blob/main/CONTRIBUTING.md),
with project-specific guidance aligned to Microsoft TypeScript engineering practices._
