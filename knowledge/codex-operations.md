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
- `wedata-abtest-daily-report`
- `zide-shared-library`

Built-in `.system` skills are not mirrored.

## Standard Sync Commands

```bash
cd /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1
git pull --rebase
git status --short
git add .
git commit -m "Update shared Codex library"
git push
```

## Skill Backup Rule

When the user asks to back up skills, sync from `/Users/yangzide/.codex/skills/` into `wkday1/skills/`, excluding built-in `.system` skills and excluding the nested `zide-shared-library/references/wkday1` copy to avoid recursive repository embedding.
