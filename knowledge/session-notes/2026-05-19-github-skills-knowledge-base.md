# 2026-05-19 Session Notes: GitHub, Skills, Knowledge Base

## Summary

This session set up the user's GitHub-backed Codex shared library and turned it into a reusable knowledge/skill sync point.

## Durable Facts

- Shared GitHub repository: `zide001/wkday1`.
- Canonical local repository path: `/Users/yangzide/.codex/skills/zide-shared-library/references/wkday1`.
- GitHub CLI is installed and logged in as `zide001`.
- Direct terminal `git push` now works from the canonical local repository path.
- User-level skills have been mirrored into `wkday1/skills/`.

## Skills Backed Up

- `prd-coach`
- `wedata-abtest-daily-report`
- `zide-shared-library`

## Decisions

- Future Codex uploads and Git pushes for the shared library should happen from the canonical `wkday1` local directory.
- The personal knowledge base should live under `knowledge/`.
- Future conversation content should be summarized into the knowledge base only when it contains durable preferences, decisions, workflows, project background, or reusable instructions.
- Raw chat logs and secrets should not be stored.

## Next-Use Instructions

When a future conversation creates reusable context:

1. Update the relevant file under `knowledge/`.
2. Add a concise dated note under `knowledge/session-notes/` if the conversation itself is useful context.
3. Commit and push from the canonical `wkday1` directory.
