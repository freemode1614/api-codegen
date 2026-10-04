<!--
Thanks for your contribution!

Please fill out this template. Sections marked with `*` are required.
Items with `- [ ]` must be checked off before a maintainer can merge.

See `CONTRIBUTING.md` for the full contribution guide.
-->

## Summary

<!-- One or two sentences describing what this PR does. -->

*

## Linked issues

<!--
Use `Closes #123` or `Fixes #123` to auto-close issues on merge.
Leave blank if this PR isn't tied to a specific issue.
-->

- Closes #
- Relates to #

## Motivation & context

<!--
Why is this change needed? What problem does it solve?
If it fixes a bug, describe the bug. If it's a feature, link the feature request.
-->

*

## Changes

<!--
Bullet list of the user-visible changes. Group by area if helpful.
Mention any public API additions, deprecations, or breaking changes explicitly.
-->

-

## Type of change

<!-- Check all that apply. -->

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update
- [ ] Refactor / internal change (no user-visible change)
- [ ] Build / CI / tooling

## Public API impact

<!--
Delete this section if N/A. Otherwise describe:
- New exports, options, CLI flags
- Renames, deprecations, removals
- Output shape changes (generated code)
- Required Changeset entry (`pnpm changeset`)
-->

- [ ] This PR introduces **no** public API changes.
- [ ] I have added a Changeset entry (`pnpm changeset`).
- [ ] I have updated README / docs / JSDoc accordingly.
- [ ] This PR includes a **breaking change** — see `BREAKING CHANGE:` section below.

### Breaking change details

<!-- Required if the box above is checked. -->

>

## Implementation notes

<!--
Anything reviewers should pay attention to: design choices, tradeoffs,
performance concerns, alternative approaches considered.
For significant changes, link to the ADR in `docs/adr/`.
-->

-

## Checklist

<!-- Reviewer-blocking items. -->

- [ ] I have read [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).
- [ ] My code follows the project's TypeScript engineering rules (no `any`, no `!`, JSDoc on exports).
- [ ] I have added or updated **tests** under `__tests__/` for the new behavior.
- [ ] All CI checks pass locally:
      `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
- [ ] Biome (`pnpm lint:fix && pnpm format`) reports no issues.
- [ ] I have updated documentation (README, `docs/`, JSDoc) as needed.
- [ ] I have added an ADR in `docs/adr/` if the change is architecturally significant.
- [ ] The diff is focused (≤ ~400 net lines excluding generated code).

## CI status

<!--
After pushing, paste the green check URLs from the Checks section
so reviewers can navigate quickly. The required jobs are:

- `Lint`
- `Typecheck (src only)` — must be green
- `Typecheck (full repo, advisory)` — may be red for legacy reasons; explain if so
- `Test`
- `Build`
-->

- Lint:
- Typecheck (src only):
- Typecheck (full repo):
- Test:
- Build:

## Screenshots / recordings

<!--
Attach UI evidence if relevant (e.g. `--help` output, generated code diff, terminal capture).
Delete if N/A.
-->

<details>
<summary>Show</summary>

</details>
