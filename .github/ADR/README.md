# Architecture Decision Records (ADR)

This directory contains **Architecture Decision Records** for `@moccona/apicodegen`.
We use the lightweight ADR format popularized by Michael Nygard and adopted by
the [TypeScript](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Meeting-Notes),
[VS Code](https://github.com/microsoft/vscode/wiki/Development-Process), and
many other engineering organizations.

An ADR captures **one significant decision**: the context that forced it, the
options considered, the chosen path, and the consequences we accept.

---

## When to write an ADR

You **should** open an ADR when a change:

- Adds, removes, or renames anything in the **public API**
  (`src/index.ts`, `src/vite-plugin/index.ts`, `src/cli.ts`).
- Introduces, removes, or replaces a **runtime dependency**.
- Changes the **shape of generated code** in a way users must adapt to.
- Touches the **release pipeline** (`tsdown`, `changesets`, CI).
- Adopts a new **language-level policy** (e.g. dropping a TS feature, raising
  the Node minimum).
- Settles a long-running debate that future contributors will rediscover.

You do **not** need an ADR for:

- Bug fixes that restore documented behavior.
- Internal refactors with no user-visible impact.
- Documentation or test changes.

If unsure, open a draft and a maintainer will triage.

---

## Lifecycle

```
Proposed ──▶ Accepted ──▶ (optionally) Superseded by ADR-NNNN
   │
   └────▶ Rejected (kept for the historical record)
```

Status is recorded in the front matter. **Do not delete** rejected or
superseded ADRs — the historical record is the whole point.

---

## Index

| Number | Title | Status | Date |
| ------ | ----- | ------ | ---- |
| [0000](0000-template.md) | ADR template | (template) | — |

<!--
When adding a new ADR:

1. Copy `0000-template.md` to `NNNN-short-title.md` where `NNNN` is the
   next four-digit number (zero-padded) and `short-title` is kebab-case.
2. Fill in the front matter and the four sections.
3. Append a row to the table above.
4. Link the ADR from your PR description if it justifies the change.
-->

---

## Conventions

- **Numbering**: monotonically increasing, zero-padded to four digits.
- **File names**: `NNNN-kebab-case-title.md`.
- **Front matter**: keep the YAML block minimal; do not add fields that aren't
  used.
- **Voice**: write in the past tense for Accepted/Rejected/Superseded so the
  text stays accurate after the decision is locked in.
- **Tone**: factual. Argue the tradeoffs in the PR discussion, not in the ADR
  itself — the ADR is the *result* of the discussion.
- **Length**: aim for 1–2 pages. If you need more, the decision is probably
  too large and should be split.

---

## Further reading

- [Michael Nygard — Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [Microsoft — TypeScript Design Meeting Notes](https://github.com/microsoft/TypeScript/wiki/TypeScript-Design-Meeting-Notes)
- [GitHub — ADR template](https://github.com/joelparkerhenderson/architecture-decision-record)
- [AWS — ADR process](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html)
