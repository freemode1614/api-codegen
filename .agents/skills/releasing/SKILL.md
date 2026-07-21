---
name: releasing
description: Use when preparing to release a new version - releasing npm packages, creating GitHub releases, or publishing changes
---

# Releasing

## Overview

This project uses **changeset** for versioning + CHANGELOG generation, and **GitHub Actions** for automated npm publishing. The release is triggered by creating a GitHub Release (which also creates the tag), not by pushing tags directly.

## When to Use

- About to publish a new version
- Need to update CHANGELOG
- Creating a GitHub release
- Publishing to npm

## Release Flow

```
1. Ensure changes are committed on main
2. Create feature branch: git checkout -b release/v<X.Y.Z>
3. Create changeset: pnpm changeset add
4. Run changeset version: pnpm changeset version
5. Commit version changes
6. Push branch and open PR
7. User merges PR on GitHub
8. Run: gh release create v<X.Y.Z>
9. CI automatically: build → publish to npm
```

## Step-by-Step

### 1. Start from main

```bash
git checkout main
git pull origin main
```

### 2. Create Release Branch

```bash
git checkout -b release/v<X.Y.Z>
```

### 3. Create Changeset

```bash
pnpm changeset add
```

When prompted:
- **Select package**: `@moccona/apicodegen`
- **Select bump type**:
  - `patch` - Bug fixes
  - `minor` - New features (backwards compatible)
  - `major` - Breaking changes
- **Write description**: Brief summary of changes

### 4. Update Version Locally

```bash
pnpm changeset version
```

This will:
- Update `package.json` version
- Update `CHANGELOG.md`

### 5. Commit Version Changes

```bash
git add .
git commit -m "chore: bump version to <X.Y.Z>"
```

### 6. Push and Open PR

```bash
git push origin release/v<X.Y.Z>
gh pr create --base main --head release/v<X.Y.Z> \
  --title "chore: bump version to <X.Y.Z>" \
  --body "版本 bump <previous> → <X.Y.Z>"
```

### 7. Merge PR

User reviews and merges on GitHub.

### 8. Create GitHub Release

After PR is merged, locally on main:

```bash
git checkout main && git pull origin main
gh release create v<X.Y.Z> --generate-notes
```

This creates the git tag and triggers CI.

### 9. Verify Release

Check GitHub Actions tab for release workflow run. On success:
- Package published to npm

## Version Bump Guide

| Type | When to Use | Example |
|------|-------------|---------|
| `patch` | Bug fixes | `v0.0.10` → `v0.0.11` |
| `minor` | New features | `v0.0.11` → `v0.1.0` |
| `major` | Breaking changes | `v0.1.0` → `v1.0.0` |

## Troubleshooting

**npm publish failed?**
- Verify `NPM_TOKEN` secret exists in repo Settings → Secrets and variables → Actions
- Check token has correct permissions

**Version mismatch?**
- The `package.json` version must match the release tag
- If tag is wrong, delete and retry:
  ```bash
  git tag -d v<X.Y.Z> && gh release delete v<X.Y.Z}
  ```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm changeset add` | Create changeset |
| `pnpm changeset version` | Update version + CHANGELOG |
| `gh release create v<X.Y.Z> --generate-notes` | Create release + tag (triggers CI) |

## Required Setup (One-time)

In GitHub repo → Settings → Secrets and variables → Actions:
- Add `NPM_TOKEN` with npm access token
