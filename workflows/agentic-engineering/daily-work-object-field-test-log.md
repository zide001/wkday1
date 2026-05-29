# Daily Work Object Field Test Log

## Purpose

Use this log to move the AE-Vela daily-work protocol from meta-work into real
business tasks. The protocol is only improving daily work if PRD, WeCom, TAPD,
report, automation, prototype, diagram, code, and skill tasks produce clearer
state, better completion checks, or reusable lessons.

This file is a queue plus a log. Add a short record after real tasks reveal
friction or confirm that the current protocol is enough.

## When To Record

Record a field test when at least one is true:

- the task uses expanded Full display;
- the task crosses two or more systems, such as PRD plus WeCom plus TAPD;
- a completion check prevents a mistake;
- a task exposes a reusable failure mode or new routing decision;
- the final handoff says `Curated:` with something other than `none`.

Do not record one-line rewrites, simple answers, or tasks where the protocol
adds no durable lesson.

## Field-Test Queue

| Priority | Object | Trial Trigger | Flow | Evidence To Capture | Completion Check | Likely Writeback |
|---|---|---|---|---|---|---|
| P0 | PRD publishing chain | Next PRD draft/review that may touch WeCom, TAPD, or report output | Full, expanded | source path or visible doc title; task card; acceptance/risk check; target format | PRD check plus document/TAPD check when applicable | `skills/prd-coach/`, `skills/wecom-doc-editor/`, or `skills/tapd-prd-draft/` |
| P0 | WeCom/Tencent Docs live edit | Next live doc edit, table fill, paste, or PRD section update | Full, compact or expanded | visible title, target section/cell, before/after proof | document check: target proof before edit and visible proof after edit | `skills/wecom-doc-editor/` |
| P1 | TAPD requirement | Next TAPD draft/save/submit from PRD source | Full, expanded | project, title, owner, iteration, category, description preview | submit/save check: preview before external action and final evidence after approval | `skills/tapd-prd-draft/` |
| P1 | Daily report / analysis | Next Wedata or ABTest status/report run | Full, compact or expanded | date range, data source, latest artifact, logs, denominator/comparison basis | report check plus automation check if rerun or send is involved | `skills/wedata-abtest-daily-report/` |
| P1 | Prototype/activity | Next Qidian campaign page, local preview, poster, admin, or deploy task | Full, compact or expanded | changed files, local URL, screenshot/browser proof, deploy boundary | prototype check; deploy/public actions require confirmation | `skills/qidian-character-activity/` |
| P2 | Diagram / XMind | Next editable process map, PRD flow, or strategy tree | Full, compact or expanded | source notes, `.xmind` or rendered artifact, visual check | diagram artifact check: editable file exists and preview is readable | `skills/mindmap-designer/` |
| P2 | Shared-library sync | Next request to push or publish this rollout | Full, expanded | clean scope list, staged diff, sensitive-file exclusion, user confirmation | external-visible git check: no unrelated staged files, push only after approval | `skills/zide-shared-library/` |
| P2 | Code implementation | Next repo code change where this protocol is useful | Full, compact or expanded | repo state, diff, test/build output, skipped-check reason if any | code check: meaningful local check passes or risk stated | `skills/harness-engineering/` |

## Record Template

Copy this block when a real task provides evidence worth keeping.

```markdown
## YYYY-MM-DD - Short Task Name

| Field | Value |
|---|---|
| Object | prd / wecom / tapd / report / automation / prototype / diagram / code / skill |
| Trigger |  |
| Flow | Full |
| Display weight | silent / compact / expanded |
| Owner |  |
| External-visible action | no / yes, previewed and confirmed |
| Main evidence |  |
| Check used |  |
| Verdict | pass / needs-revision / block |
| Curated | none / path |

What improved:

-

Friction or failure:

-

Writeback decision:

- Keep as log only / update owning skill / update prompt / update workflow.
```

## Current Records

### 2026-05-29 - AE-Vela Daily-Work Rollout

| Field | Value |
|---|---|
| Object | skill + workflow |
| Trigger | User asked to learn AE-Vela's strengths and use them to keep improving daily work |
| Flow | Full |
| Owner | `skill-evolution-framework`, `zide-shared-library`, `daily-work-iteration-protocol.md` |
| External-visible action | no |
| Main evidence | protocol, task card, adoption checkpoint, rollout manifest, linked skill entry points |
| Check used | skill/workflow check |
| Verdict | pass for rollout; incomplete for full long-term objective |
| Curated | `workflows/agentic-engineering/daily-work-task-card-field-test-2026-05-29.md` and this log |

What improved:

- The AE-Vela ideas now exist as a daily protocol, startup prompt, entry-point
  links, rollout scope manifest, and object-level field-test queue.

Friction or failure:

- No business object has been validated yet. The next high-value proof should
  come from PRD, WeCom, TAPD, report, or automation work.
- The shared-library worktree is dirty, so sync remains local-only until a
  scoped commit/push is explicitly approved.

Writeback decision:

- Keep this first record in the cross-skill workflow log.
- Patch owning skills only after a real object-level task reveals a narrower
  repeatable lesson.

## Pass Criteria For The First Business Trial

The first object-level business trial counts as useful when all are true:

1. The task names its object and owner before the main action.
2. The display weight is appropriate and does not over-process a small task.
3. The final verification uses the object completion check from the protocol.
4. Any external-visible action is previewed and confirmed before execution.
5. The closeout records `Curated: none` or a narrow writeback path.
6. Any friction is recorded here only if it changes future behavior.
