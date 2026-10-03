---
name: releasing
description: Use when preparing to release a new version - releasing npm packages, creating GitHub releases, or publishing changes
---

# Releasing

## Overview

This project uses **changeset** with **GitHub Actions** for automated releases. Tag pushes trigger the release workflow which builds, creates GitHub release with CHANGELOG, and publishes to npm.

## When to Use

- About to publish a new version
- Need to update CHANGELOG
- Creating a GitHub release
- Publishing to npm

## Release Flow

```
1. Ensure changes are committed
2. Create changeset file (describes what changed + bump type)
3. Run changeset version locally (updates version in package.json + CHANGELOG.md)
4. Commit version changes
5. Push to main
6. Create and push release tag
7. GitHub Actions automatically: build → release → publish
```

## Step-by-Step

### 1. Check Status

```bash
git status
# All changes should be committed before release
```

### 2. Create Changeset

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

### 3. Update Version Locally

```bash
pnpm changeset version
```

This will:
- Update `package.json` version
- Update `CHANGELOG.md`

### 4. Commit Version Changes

```bash
git add .
git commit -m "chore: bump version"
```

### 5. Push

```bash
git push origin main
```

### 6. Create Release Tag

```bash
git tag v0.0.4        # Replace with your version (should match package.json)
git push origin v0.0.4
```

### 7. Verify Release

Check GitHub Actions tab for release workflow run. On success:
- GitHub release created with CHANGELOG
- Package published to npm

## Version Bump Guide

| Type | When to Use | Example |
|------|-------------|---------|
| `patch` | Bug fixes | `v0.0.3` → `v0.0.4` |
| `minor` | New features | `v0.0.4` → `v0.1.0` |
| `major` | Breaking changes | `v0.1.0` → `v1.0.0` |

## Skip Release

To push to main without triggering release:

```bash
git commit -m "chore: skip release"
git push
```

The workflow checks for "skip release" in commit message.

## Troubleshooting

**Release didn't trigger?**
- Verify tag format: `v*` (e.g., `v0.0.4`)
- Check GitHub Actions logs
- Ensure `package.json` version matches the tag

**npm publish failed?**
- Verify `NPM_TOKEN` secret exists in repo Settings → Secrets
- Check token has correct permissions

**Version mismatch?**
- Run `pnpm changeset version` locally before tagging
- The `package.json` version must match the git tag version
- If tag already exists with wrong version:
  ```bash
  git tag -d v0.0.4 && git tag v0.0.4 && git push origin v0.0.4 --force
  ```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm changeset add` | Create changeset |
| `pnpm changeset version` | Update version in package.json + CHANGELOG.md (run locally before tagging) |
| `pnpm changeset publish` | Release (runs in CI after tag push) |

## Required Setup (One-time)

In GitHub repo → Settings → Secrets and variables → Actions:
- Add `NPM_TOKEN` with npm access token
