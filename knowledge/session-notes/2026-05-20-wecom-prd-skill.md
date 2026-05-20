# 2026-05-20 WeCom PRD Skill Iteration

## Facts

- Created and evolved the user-level `wecom-doc-editor` skill for safe 企业微信文档 PRD editing.
- Paired `wecom-doc-editor` with `prd-coach`: `prd-coach` handles PRD product judgment and wording; `wecom-doc-editor` handles live 企业微信 UI execution and verification.
- Added explicit operating modes: Observe, Draft, Execute, Improve.
- Added a PRD editing capability map covering document structure, requirement tables, process expression, review collaboration, paste behavior, and verification.
- Added self-operation learning: Codex should use safe hands-on UI observation through Computer Use when learning 企业微信文档 behavior.

## Decisions

- The user allows ongoing self-iteration of `wecom-doc-editor` after verified 企业微信 PRD editing lessons.
- Stable lessons can be written back to the skill without asking each time.
- Do not store raw private document content, credentials, cookies, or one-off document details in the skill or shared library.
- After meaningful skill work, mirror the updated skill and concise daily notes to `zide001/wkday1` and push to GitHub.

## Next Use

- For future 企业微信 PRD work, load `prd-coach` first for content/format, then `wecom-doc-editor` for live UI operation.
- Before editing a live doc, confirm the document title and exact target section/table cell.
- After editing, verify the title, target location, and visible inserted content.
- If a verified UI behavior changes future editing practice, update `wecom-doc-editor` and push the shared library backup.
