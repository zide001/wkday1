# 2026-05-21 Prompt Templates

## Facts

- Added four reusable Codex prompt templates under `prompts/`:
  - `prd-rewrite-and-complete.md`
  - `wecom-doc-edit.md`
  - `abtest-daily-analysis.md`
  - `frontend-tool-build.md`
- Updated `knowledge/profile.md` to prefer starting future Codex tasks with an explicit working role.

## Decision

- Future Codex tasks should infer or state a role early, such as product reviewer, WeCom document editor, experiment analyst, automation engineer, or frontend product engineer.

## Next Use

- Use the templates as task-starting prompts for repeated work.
- If a template proves useful or needs adjustment after real usage, update the specific prompt file rather than relying on chat history.
