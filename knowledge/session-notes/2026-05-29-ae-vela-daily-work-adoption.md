# 2026-05-29 AE-Vela Daily Work Adoption

## Facts

- The user provided `AE-Vela-main.zip` and asked Codex to learn its strengths
  for ongoing daily work.
- The archive was only partially extractable because some Chinese filenames were
  corrupted, but stable core materials were readable: root docs, `.claude`,
  `.codebuddy`, `agents`, `ci`, and ASCII-safe `pipeline` files.
- The useful AE-Vela patterns were adapted into shared-library assets rather
  than kept only as chat advice.
- A proactive heartbeat reminder was created with automation id `ae-vela` so
  future weekday mornings can remind the user to apply the daily-work protocol.

## Decisions

- Use AE-Vela as a blind-spot map, not a template to copy wholesale.
- Keep small tasks small on screen while using Full flow internally.
- For non-trivial recurring work, prefer object-first routing, state, handoff,
  object-specific completion checks, and narrow curation.
- Route broad daily-work behavior through `workflows/agentic-engineering/`
  before patching individual skills.
- Do not commit or push the shared library while unrelated local changes are
  present unless the user explicitly approves the exact scope.
- Use the `ae-vela` reminder as a nudge, not as a reason to over-process small
  tasks.

## Assets Added Or Updated

- `workflows/agentic-engineering/daily-work-iteration-protocol.md`
- `workflows/agentic-engineering/ae-vela-completion-checks.md`
- `workflows/agentic-engineering/ae-vela-full-flow-demo.mmd`
- `workflows/agentic-engineering/ae-vela-full-flow-demo.svg`
- `prompts/daily-work-task-card.md`
- `workflows/agentic-engineering/daily-work-object-field-test-log.md`
- `workflows/agentic-engineering/daily-work-adoption-checkpoint-2026-05-29.md`
- `workflows/agentic-engineering/daily-work-task-card-field-test-2026-05-29.md`
- `workflows/agentic-engineering/daily-work-rollout-manifest-2026-05-29.md`

High-frequency prompt entry points now route non-trivial tasks through the
daily-work task card:

- `prompts/prd-rewrite-and-complete.md`
- `prompts/wecom-doc-edit.md`
- `prompts/abtest-daily-analysis.md`
- `prompts/frontend-tool-build.md`

High-frequency skill entry points now point to the daily-work protocol:

- `skills/zide-shared-library/SKILL.md`
- `skills/harness-engineering/SKILL.md`
- `skills/skill-evolution-framework/SKILL.md`
- `skills/prd-coach/SKILL.md`
- `skills/wecom-doc-editor/SKILL.md`
- `skills/tapd-prd-draft/SKILL.md`
- `skills/wedata-abtest-daily-report/SKILL.md`
- `skills/qidian-character-activity/SKILL.md`
- `skills/mindmap-designer/SKILL.md`

## Next Use

When the next real daily task arrives:

1. Start from the work object, not the tool.
2. Default to Full flow and choose only the visible display weight.
3. Use `prompts/daily-work-task-card.md` when the task is ambiguous, cross-tool,
   or worth a visible task card.
   The older high-frequency prompt templates already point non-trivial tasks to
   this card, so future PRD, WeCom, ABTest/report, and frontend/prototype work
   should inherit the protocol without opening the workflow file first.
4. Verify with the object completion check from
   `workflows/agentic-engineering/ae-vela-completion-checks.md`.
5. If a real PRD, WeCom, TAPD, report, automation, prototype, diagram, code, or
   skill task reveals useful friction, record it in
   `workflows/agentic-engineering/daily-work-object-field-test-log.md`.
6. Use `workflows/agentic-engineering/daily-work-rollout-manifest-2026-05-29.md`
   before any future commit/push so unrelated dirty files are not bundled.
7. If the reminder cadence becomes annoying or too weak, update automation
   `ae-vela` rather than creating a duplicate.

## Current Gaps

- No real business task has completed end-to-end under this protocol yet.
- The shared-library sync should stay scoped to reviewed daily-work, skill,
  prompt, workflow, and knowledge paths; do not use broad staging.
- The original AE-Vela archive may include sensitive configuration such as
  webhook-like values; do not publish raw extracted package contents.
