# PRD Skills Work - 2026-05-20

## Scope

- Build and refine `wecom-doc-editor` as the user's 企业微信文档 PRD editing skill.
- Capture the rule that Codex should learn 企业微信 behavior through safe direct UI operation when possible.
- Mirror the skill and durable notes into the `zide001/wkday1` shared library.

## Outputs

- `skills/wecom-doc-editor/SKILL.md`
- `skills/wecom-doc-editor/agents/openai.yaml`
- `knowledge/session-notes/2026-05-20-wecom-prd-skill.md`
- `knowledge/codex-operations.md`
- `knowledge/decisions.md`

## Future Workflow

1. Use `prd-coach` to shape PRD content and preserve the user's writing conventions.
2. Use `wecom-doc-editor` to operate the 企业微信 document UI safely.
3. Verify the document title, exact table cell or section, and pasted content after every edit.
4. When the session teaches a reusable UI or PRD-editing lesson, update the skill and push the shared library.
