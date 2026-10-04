# Security Policy

[English](#english) · [中文](#中文)

---

<a id="english"></a>

## English

Thanks for helping keep `@moccona/apicodegen` and its users safe.

The maintainers of `@moccona/apicodegen` take the security of this project
seriously. This document explains how to report a vulnerability, what to
expect, and the scope of supported versions.

---

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| `0.x`   | :white_check_mark: Latest minor only |

Only the **latest published minor** on the `main` branch receives security
fixes. Older minors may receive patches on a best-effort basis at the
maintainers' discretion. Please upgrade before filing a report when feasible.

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues,
discussions, or pull requests.**

Use one of the following private channels:

### Preferred: GitHub private vulnerability reporting

Click **"Report a vulnerability"** under the
[Security tab](https://github.com/freemode1614/api-codegen/security/advisories/new)
of this repository. GitHub will route the report privately to the maintainers.

### Alternative: Email

Send an email to the address listed in the [`author`](./package.json) field
of `package.json` (or to a maintainer you already have a trusted channel with).
Use PGP if your report is highly sensitive.

---

## What to Include

To help us triage and resolve your report quickly, please include as much
of the following as you can:

1. **Type of issue** — e.g. arbitrary code execution, prototype pollution,
   path traversal, ReDoS, dependency confusion, supply-chain attack, etc.
2. **Affected component** — `src/cli`, `src/vite-plugin`, `src/core/generator`,
   a specific dependency, etc.
3. **Affected version(s)** — release tag or commit SHA.
4. **Configuration required to reproduce** — input spec, command-line flags,
   environment.
5. **Step-by-step reproduction instructions.**
6. **Proof-of-concept or exploit code** (if available).
7. **Impact** — what an attacker could achieve and under what conditions.
8. **Discovery context** — fuzzing tool, audit, manual review, etc.

Reports missing critical reproduction information may take longer to triage.

---

## Response Process

We follow a coordinated disclosure model. After you submit a report:

| Step | Target SLA                       | What happens                                            |
| ---- | -------------------------------- | ------------------------------------------------------- |
| 1    | **3 business days**              | Acknowledge receipt and assign a handler                |
| 2    | **7 business days**              | Confirm scope, severity, and affected versions          |
| 3    | _variable_                       | Develop and review a fix                                |
| 4    | _variable_                       | Coordinate disclosure timeline with you                 |
| 5    | _upon fix_                       | Publish a Security Advisory and release a patch         |
| 6    | _upon advisory_                  | Credit you (if desired) in the advisory                 |

We aim to issue a fix within **30 days** for high-severity issues, but the
actual timeline depends on complexity and the availability of maintainers.
We will always discuss timing with you before disclosing publicly.

---

## Severity Classification

We use [CVSS 3.1](https://www.first.org/cvss/v3.1/specification-document) as a
guideline. The maintainers' final classification may differ based on the
real-world impact in `apicodegen`'s usage contexts (CLI tool running on
developer machines; optional Vite plugin in build pipelines).

Examples of issues we consider in scope:

- Arbitrary code execution when processing an OpenAPI document
- Prototype pollution in config handling
- Path traversal in generated file output
- SSRF when the generator fetches remote `$ref` URLs
- Compromise of the npm publish pipeline
- Vulnerabilities in bundled dependencies (we coordinate upstream)

Examples of issues **out of scope**:

- Theoretical issues with no demonstrable impact
- Reports about lack of a specific HTTP header in CLI output
- Best-practice recommendations that do not constitute a vulnerability

---

## Safe Harbor

We will not pursue legal action against researchers who:

- Act in good faith and comply with this policy
- Avoid privacy violations, data destruction, or service disruption
- Do not exploit a vulnerability beyond what is necessary to demonstrate it
- Refrain from publishing details until coordinated disclosure completes

---

## Acknowledgements

Researchers who report valid, previously-unknown vulnerabilities will be
credited in the published Security Advisory unless they prefer anonymity.

---

## Out-of-Band Contact

For matters that cannot wait for email or GitHub, please open a Discussion
tagged `security` and a maintainer will reach out privately.

---

<a id="中文"></a>

## 中文

感谢你帮助让 `@moccona/apicodegen` 及其使用者更安全。

`@moccona/apicodegen` 的维护者非常重视本项目的安全。
本文档说明如何报告漏洞、你可以期望得到什么回应，以及哪些版本在维护范围内。

---

## 受支持的版本

| 版本   | 是否支持              |
| ------ | --------------------- |
| `0.x`  | :white_check_mark: 仅最新 minor |

只有 `main` 分支上**最新发布的 minor** 接收安全修复。
旧版本维护者可视情况尽力修复，建议在报告前先升级。

---

## 报告漏洞

**请勿**通过公开 GitHub Issue、Discussion 或 Pull Request 报告安全漏洞。

请使用以下私密渠道之一：

### 推荐：GitHub 私有漏洞报告

点击仓库的
[Security 标签页](https://github.com/freemode1614/api-codegen/security/advisories/new)
中的 **"Report a vulnerability"**，GitHub 会将报告私密地送达维护者。

### 备选：邮件

向 `package.json` 中 [`author`](./package.json) 字段所列的地址（或你已经信任的
维护者沟通渠道）发送邮件。如果报告非常敏感，请使用 PGP 加密。

---

## 请尽量提供的信息

为帮助我们快速分派与处理，请尽可能提供以下内容：

1. **问题类型** —— 例如：任意代码执行、原型链污染、路径穿越、ReDoS、
   dependency confusion、供应链攻击等。
2. **受影响组件** —— `src/cli`、`src/vite-plugin`、`src/core/generator`，
   或某个具体依赖。
3. **受影响版本** —— 发布标签或 commit SHA。
4. **复现所需的配置** —— 输入 spec、命令行参数、环境。
5. **分步复现说明。**
6. **概念验证或利用代码**（如有）。
7. **影响范围** —— 攻击者能达成什么、在什么条件下可以达成。
8. **发现场景** —— 模糊测试、安全审计、人工排查等。

缺少关键复现信息的报告可能需要更长时间分派。

---

## 处理流程

我们采用**协同披露**模型。提交报告后：

| 步骤 | 时长目标                | 处理动作                                  |
| ---- | ----------------------- | ----------------------------------------- |
| 1    | **3 个工作日**          | 确认收到并指定负责人                      |
| 2    | **7 个工作日**          | 确认影响范围、严重程度、受影响版本        |
| 3    | _视情况_                | 研发并评审修复                            |
| 4    | _视情况_                | 与你协商披露时间表                        |
| 5    | _修复完成后_            | 发布 Security Advisory 并发布补丁版本     |
| 6    | _Advisory 发布后_       | 在 Advisory 中为你署名（如愿意）          |

我们力争在 **30 天内**为高危问题发布修复，但实际周期取决于复杂度与维护者可投入
的时间。公开发布前我们一定会与你协商时间。

---

## 严重程度分级

我们以 [CVSS 3.1](https://www.first.org/cvss/v3.1/specification-document) 为参考。
最终分级会结合 `apicodegen` 的真实使用场景（运行于开发者机器的 CLI 工具、
构建流水线中可选的 Vite 插件）做调整。

**属于受理范围的例子**：

- 处理 OpenAPI 文档时的任意代码执行
- 配置处理中的原型链污染
- 生成文件输出时的路径穿越
- 生成器抓取远程 `$ref` 时发生的 SSRF
- npm 发布链路被攻陷
- 打包依赖自身的漏洞（我们会与上游协同）

**不属于受理范围的例子**：

- 没有可证明影响的理论性问题
- 关于 CLI 缺少某个 HTTP 头之类的"最佳实践"建议
- 未构成实际漏洞的安全建议

---

## 安全港（Safe Harbor）

对于符合以下条件的研究者，我们不会追究法律责任：

- 出于善意并遵守本政策
- 不侵犯隐私、不破坏数据、不中断服务
- 不超出必要范围去利用漏洞
- 在协同披露完成前不公开细节

---

## 致谢

提交有效且未被披露过的漏洞报告者，将在被发布的 Security Advisory 中
署名（除非你选择匿名）。

---

## 非常规联系方式

如果有紧急事项无法通过邮件或 GitHub 处理，请开一个带 `security` 标签的
Discussion，维护者会私下与你取得联系。

---

_This document is adapted from the
[GitHub SECURITY.md template](https://github.com/github/.github/blob/main/SECURITY.md)
and follows the
[GitHub community health guidelines](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-security-policy-to-your-repository)._
