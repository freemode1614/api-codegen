---
"@moccona/apicodegen": minor
---

Light up the `transformSpec` hook reserved on the `Plugin` interface
in PR1. Plugins can now rewrite the raw spec doc before the provider
parses it.

- **New file** `src/core/spec-hooks.ts` — `TransformSpecContext` and
  `TransformSpecHook` types. Spec hooks live in their own module
  (separate from `generator-hooks.ts`) because the working data is the
  parsed spec doc, not `Statement[]`/string.
- **New file** `src/core/spec-hook-runner.ts` —
  `runTransformSpecHooks(plugins, ctx, initial)`. Chains hooks in
  plugin-list order, deep-freezes the ctx (same snapshot discipline
  as generator hooks), leaves the spec doc itself un-cloned (JSON.parse
  output is structurally immutable for our purposes, and cloning a
  large spec would be wasteful).
- **New `transformSpec?` field on `Plugin`**. The Plugin JSDoc now
  lists it among live capabilities instead of "reserved for upcoming
  PRs".
- **Wired into `codeGen()`** between spec parsing and
  `providerSpec.factory(..., doc)`. Behavior unchanged when no plugin
  declares the hook.
- **Tests** `__tests__/transform-spec.test.ts` (8 tests): ordering,
  chain-through, fresh-object return, async hook, no-hook passthrough,
  ctx immutability, runner-level chain test, runner-level
  no-plugin-passthrough test.
- **Example** `example/plugins/strip-vendor-extensions/` — runnable
  config that strips every `x-*` field and prefixes every operationId
  with `v2_`. Verified end-to-end: the generated `api.ts` contains
  `v2ListPetsUsingGet` and `v2ShowPetByIdUsingGet`.
- **Docs**:
  - `README.md` adds a "Spec hooks" subsection with context shape,
    ordering rules, and pitfalls. Plugin-shape JSDoc snippet shows the
    `transformSpec` field. See-also updated to link the example.
  - Status banner updated to PR1+PR2+PR3+PR4.

- **Compatibility**:
  No breaking changes. Configs without `transformSpec` plugins behave
  identically to the previous release.
