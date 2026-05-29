# Codex Operations

## Shared Library

- GitHub repo: `https://github.com/zide001/wkday1.git`
- Canonical local path on this Mac: `/Users/yangzide/.codex/skills/zide-shared-library/references/wkday1`
- Use this directory for future `wkday1` / `wkday001` Git pulls, commits, uploads, and pushes.

## GitHub CLI

- GitHub CLI is installed with Homebrew.
- Logged-in GitHub account: `zide001`.
- Git operations use HTTPS through `gh` credentials.
- Global Git identity on this Mac:
  - `user.name = zide001`
  - `user.email = 208441830+zide001@users.noreply.github.com`

## Backed-Up User Skills

User-level Codex skills mirrored into `skills/`:

- `prd-coach`
- `wecom-doc-editor`
- `wedata-abtest-daily-report`
- `zide-shared-library`

Built-in `.system` skills are not mirrored.

## Standard Sync Commands

Use this only after reviewing the current dirty worktree and deciding the exact
scope to publish. Avoid `git add .` in this shared library unless the user has
explicitly approved every dirty path.

```bash
cd /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1
git pull --rebase
git status --short
git add <reviewed-path-1> <reviewed-path-2>
git diff --cached --check
git commit -m "Update shared Codex library"
git push
```

For the AE-Vela daily-work rollout, run the read-only verifier before a scoped
sync:

```bash
bash scripts/verify-daily-work-rollout.sh
```

## Skill Backup Rule

When the user asks to back up skills, sync from `/Users/yangzide/.codex/skills/` into `wkday1/skills/`, excluding built-in `.system` skills and excluding the nested `zide-shared-library/references/wkday1` copy to avoid recursive repository embedding.

## WeCom PRD Skill Iteration

- The user wants Codex to learn 企业微信文档 operation by actually using the UI when safe, then improve `wecom-doc-editor` from verified lessons.
- After meaningful 企业微信 PRD skill work, mirror the updated `wecom-doc-editor` skill into `wkday1/skills/wecom-doc-editor/`, add a concise session note for the day when useful, then commit and push to GitHub.
- Do not store raw private document content, credentials, cookies, or one-off document details in the shared library.
