# Daily Work Task Card Field Test

Date: 2026-05-29

## Task

Continue adapting the AE-Vela model into the user's daily Codex work so that recurring tasks improve through state, handoff, completion checks, and curation rather than staying as one-off chat advice.

## Applied Task Card

| Field | Value |
|---|---|
| Work object | `skill` + `workflow` |
| Owner skill / workflow | `skill-evolution-framework`, `zide-shared-library`, `daily-work-iteration-protocol.md` |
| Flow | Full |
| Display weight | expanded |
| Evidence needed | Protocol exists, prompt exists, high-frequency skill entry points reference the protocol, search finds the references, shared-library status is known |
| Completion check before done | Skill/workflow check: search finds the new entry points; destination owner is narrow; indexes point to new artifacts; no unrelated commit/push |
| External-visible action | No. Commit/push/publish/send were not performed |
| Curation candidate | Yes. The field test belongs in `workflows/agentic-engineering/` because it validates a cross-skill operating loop |

## Run Result

| Check | Evidence | Result |
|---|---|---|
| Task card usable | `prompts/daily-work-task-card.md` gave fields that fit this current task without extra structure | Pass |
| Full flow used | Expanded display was appropriate because this spans shared-library workflows, live skills, and future behavior | Pass |
| Object routed | Owner is the shared workflow plus `skill-evolution-framework`, not a single business skill | Pass |
| Check matched | `rg` search and `git diff --check` are the right lightweight checks for prompt/workflow changes | Pass |
| External boundary honored | No external actions were taken | Pass |
| Curation routed | This file records the reusable lesson under `workflows/agentic-engineering/` | Pass |

## Friction Found

1. The protocol was usable but a little abstract without a startup prompt.
   - Fix already applied: added `prompts/daily-work-task-card.md`.
2. The protocol needs field-test evidence, not just an integration table.
   - Fix applied here: this field-test record.
3. Shared-library commit/push is currently unsafe because the worktree contains many unrelated or pre-existing changes.
   - Handling: keep local changes uncommitted; require explicit scoped approval before any git operation.
4. Simple tasks could feel over-processed if the task card is shown every time.
   - Handling: the prompt says not to show the card for `简明扼要` or one-line tasks.

## Future Use Rule

For the next real PRD, WeCom, TAPD, Wedata, activity, XMind, or skill-evolution task:

1. Internally fill the task card.
2. Show it only if expanded display or ambiguity would cause risk.
3. Verify with the object-specific completion check.
4. If there is a reusable lesson, route it narrowly; otherwise record `Curated: none`.
