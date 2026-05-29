# Decisions

## 2026-05-19

- Use `zide001/wkday1` as the shared Codex library for cross-machine materials, prompts, workflows, projects, knowledge, and user-level skills.
- Use `/Users/yangzide/.codex/skills/zide-shared-library/references/wkday1` as the canonical local working directory for this shared library on the current Mac.
- Back up local user-level Codex skills into `wkday1/skills/`.
- Maintain a personal knowledge base under `wkday1/knowledge/`.
- Update the knowledge base only with durable, reusable summaries; do not store raw chat logs or secrets.

## 2026-05-20

- For 企业微信 PRD editing, Codex should learn by safe hands-on UI operation when possible, then update `wecom-doc-editor` with verified reusable lessons.
- After meaningful `wecom-doc-editor` improvements, mirror the skill and concise daily work notes to `zide001/wkday1` and push them to GitHub.

## 2026-05-29

- Use the AE-Vela codebase as a blind-spot map for daily Codex work, not as a template to copy wholesale.
- For non-trivial recurring tasks on the user's Mac, default to object-first routing and Full-only flow: state, handoff, work, completion check, and curation. Compress only the visible display weight; do not ask the user to choose Tiny / Light / Full.
- Use `workflows/agentic-engineering/daily-work-iteration-protocol.md` as the shared operating loop and `prompts/daily-work-task-card.md` as the reusable startup card.
- Record only useful real-task friction in `workflows/agentic-engineering/daily-work-object-field-test-log.md`; do not log one-line or throwaway tasks.
- For shared-library sync, avoid broad staging such as `git add .` when the worktree is dirty; stage only reviewed, scoped paths after explicit sync approval.
