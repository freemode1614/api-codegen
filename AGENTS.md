# AGENTS.md

Rules for AI coding agents working in this repository. These are **hard requirements** — violations are not acceptable.

## Git Workflow — STRICT

### Never push directly to `main`

- **All** changes to `main` MUST go through a pull request.
- Do **not** run `git push origin main`, `git push --force origin main`, or any equivalent direct push.
- Do **not** use `git checkout main` to commit work, then push.
- Do **not** amend, reset, or rewrite commits on `main` directly.
- Do **not** bypass branch protection rules via `--admin`, `--force`, or `gh pr merge --admin` without explicit per-action approval from the user.

### Required flow for any change

1. Create or switch to a feature branch: `git checkout -b <type>/<short-desc>`
2. Commit changes on that branch.
3. Push the feature branch: `git push origin <branch>`
4. Open a PR: `gh pr create --base main --head <branch>`
5. Wait for the user to review and merge on GitHub.

### Release flow

- `main` has a ruleset that requires `pull_request` (no direct push).
- For a new version: create a release branch (`release/v<X.Y.Z>`), run `pnpm changeset add` and `pnpm changeset version` to bump the version and update CHANGELOG, then open a PR; the user merges on GitHub; then locally run `gh release create v<X.Y.Z>` (which also creates the tag). CI handles `npm publish` on the release event.
- Do not run `git tag ... && git push origin v*` without going through the release flow first.

### Do not modify branch protection / rulesets unless explicitly asked

- The user configures GitHub rules themselves.
- Do not create, modify, or delete rulesets, branch protection rules, or required status checks without explicit per-action instruction.
- If a ruleset is missing and the user expects one, ask before creating it.

## Other

- Do not commit files in `.opencode/` (already gitignored; do not change the ignore rule without asking).
- Do not add or change dependencies in `package.json` without explicit approval.
