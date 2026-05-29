# Daily Work Iteration Protocol

## Purpose

Use this protocol to keep daily Codex work improving over time by borrowing the useful parts of AE-Vela without making small tasks heavy.

It is for recurring work across PRDs, WeCom/Tencent Docs, TAPD, reports, automations, prototypes, code, diagrams, and skill updates.

## Core Idea

Every non-trivial task should leave behind at least one of these:

- a clearer current state,
- a safer next action,
- a verified artifact,
- or a reusable lesson.

Small tasks can stay lightweight in what is shown to the user. Internally, use
one Full loop for daily work: state, handoff, work, completion check, and
curation.

## Full-Only Flow

Do not choose between Tiny / Light / Full for the user's daily work on this Mac.
Default to Full every time, then compress the visible footprint to fit the task.

| Display Weight | Use When | Visible Shape |
|---|---|---|
| Silent | One answer, one sentence rewrite, simple lookup, no local/external state | Answer directly; keep the loop internal |
| Compact | Local file read/write, one document edit, small report, simple script/run | Briefly name object and completion check, then work |
| Expanded | Multi-step work, external visible action, live docs, automation, code changes, repeated workflow, unclear recovery point | Maintain explicit state, handoff, work log, completion check, and curation decision |

Full means complete thinking, not heavy ceremony. If the task is small, compress
the explanation instead of downgrading the flow.

## Object Routing

| Work Object | Primary Owner | Normal Evidence | Completion Check Before Done |
|---|---|---|---|
| PRD | `prd-coach` | source doc, draft file, reviewer findings | scope, acceptance, risk, owner, format target checked |
| WeCom/Tencent Docs | `wecom-doc-editor` | visible title/section/cell, screenshot/text verification | target proof before edit, visible proof after edit |
| TAPD | `tapd-prd-draft` | PRD source, project/iteration/owner fields | preview payload before submit |
| Report/analysis | report workflow or domain skill | data file, date range, query/export, chart/table | data date, denominator, comparison basis checked |
| Automation | domain skill or Harness | config, schedule, logs, latest artifact | status/log inspected before rerun; send channel confirmed |
| Prototype/activity | domain skill or Harness | source files, local URL, screenshot, test result | browser verification across relevant viewport |
| Code | Harness + repo-local conventions | diff, tests, lint/build, runtime check | meaningful check passes or skipped risk stated |
| Skill/workflow evolution | `skill-evolution-framework` / shared-library | changed file, reason, searchability | narrow owner, no duplicate, index updated if needed |

## Full Flow

### 1. State

Create or identify the smallest state anchor when work may continue across turns:

```yaml
object: prd | wecom | tapd | report | automation | prototype | code | skill | other
target: ""
stage: intake | working | verifying | delivery | curate | done
last_updated: YYYY-MM-DD HH:MM
evidence:
  - ""
open_questions:
  - ""
```

For projectless or one-off work, this can live in the task file itself. For durable workflows, store it under the owning project or shared-library workflow.

### 2. Handoff

Before delegating mentally or across tools, write a compact handoff in the working notes or final task artifact:

```yaml
intent: draft | edit | review | publish | debug | analyze | automate | curate
target_surface: chat | local-file | wecom-doc | tapd | browser | repo | scheduler
context_pointers:
  - path-or-visible-target
acceptance_criteria:
  - ""
constraints:
  - "do not submit/send/push without confirmation"
return_format:
  verdict: pass | needs-revision | block
  artifacts: []
  verification: []
  open_questions: []
```

Do not over-format tiny tasks. The point is to prevent drift, not create paperwork.

### 3. Work

Use the smallest effective loop:

```text
observe -> patch/edit/write/run -> inspect result -> adjust
```

Rules:

- Prefer read-only inspection before write actions.
- Keep all edits scoped to the target object.
- Preserve user changes and visible document content.
- When using live UI, prove the visible target before touching it.
- When using code, follow repo scripts and local conventions first.
- When using reports, bind every conclusion to data source and date.

### 4. Completion Check

Before calling work done, run the local completion check that fits the object:

| Check | Required Proof |
|---|---|
| Document check | Correct title/section/cell, final content visible or rendered |
| TAPD/send check | Payload preview, destination confirmed, user approval for external action |
| Code check | Test/build/lint/runtime check, or explicit skipped-check reason |
| Report check | Data date, metric denominator, comparison window, output file checked |
| Automation check | Schedule/config/log/latest artifact inspected; no blind rerun unless asked |
| Prototype check | Local page opens, screenshot or browser check proves the key flow |
| Skill check | Search finds the new rule; destination owner is narrow and appropriate |

If the check fails, return `needs-revision` and keep the work in progress. If a fact or permission is missing, return `block` and ask only the necessary question.

For the current Mac-specific check table, see
`workflows/agentic-engineering/ae-vela-completion-checks.md`.

### 5. Curate

After meaningful work, run a quiet curation check:

```text
Did this reveal a reusable rule, template, failure mode, verification handle, or routing decision?
```

Route the lesson narrowly:

| Lesson | Destination |
|---|---|
| PRD structure, rubric, phrasing, acceptance logic | `skills/prd-coach/` |
| WeCom target proof, paste behavior, table/layout handling | `skills/wecom-doc-editor/` |
| TAPD fields, draft/submit behavior, owner/category handling | `skills/tapd-prd-draft/` |
| Automation status/log/send behavior | owning automation skill |
| Cross-skill handoff or recurring operating loop | `workflows/agentic-engineering/` |
| Stable user preference or long-term decision | `knowledge/` |
| One-off project fact | `projects/` or task notes only |

Write back only when the lesson is reusable, verified, action-changing, and belongs to a narrow owner. Ask before broad default changes, push/submit/send, private content storage, or high-risk rewrites.

## Daily Adoption Rules

1. Start with the work object, not the tool.
2. Use Full flow by default; vary only the visible display weight.
3. In expanded Full work, maintain a visible state anchor.
4. External visible actions require preview and confirmation.
5. Do not turn every task into visible AE-Vela ceremony; keep small work small on screen.
6. After repeated friction, upgrade the workflow or skill, not just the answer.

For a reusable startup prompt, use `prompts/daily-work-task-card.md`. It turns this protocol into a compact task card with work object, owner, display weight, evidence, completion check, external-action boundary, and curation candidate.

## Current Integration Status

This protocol is currently linked from these entry points:

| Entry Point | Integration |
|---|---|
| `skills/zide-shared-library/SKILL.md` | Broad daily-work improvements consult this protocol before creating new rules |
| `skills/harness-engineering/SKILL.md` | Curator closeout routes recurring cross-object patterns here before adding Harness rules |
| `skills/prd-coach/SKILL.md` | PRD work uses Full flow by default, with display compressed for small edits before applying the PRD role split |
| `skills/wecom-doc-editor/SKILL.md` | WeCom edits use Full flow with compact display by default; cross-document publishing or WeCom plus TAPD uses expanded display with document check |
| `skills/tapd-prd-draft/SKILL.md` | TAPD creation uses Full flow with source state, handoff contract, submit/save check, and post-submit evidence |
| `skills/wedata-abtest-daily-report/SKILL.md` | Status-only audits use Full flow with compact display; reruns, schedule changes, QR login refresh, and WeChat delivery use expanded display with automation/send check |
| `skills/qidian-character-activity/SKILL.md` | Local copy/visual tweaks use Full flow with compact display; deployment, public links, D1/admin, rollback, and capacity use expanded display with prototype/deploy check |
| `skills/mindmap-designer/SKILL.md` | Quick outlines use Full flow with silent or compact display; editable XMind, PRD diagram artifacts, and cross-skill process maps use expanded display with diagram artifact check |
| `skills/skill-evolution-framework/SKILL.md` | Broad daily-work upgrades improve the shared loop first, then patch individual skills only for narrow operation-object owners |

## Adoption Audit

Use this checklist when deciding whether the protocol is actually improving daily work instead of becoming decorative process text.

| Check | Evidence |
|---|---|
| Discoverable | `rg daily-work-iteration-protocol` finds the protocol from the relevant skill entry points |
| Full flow used | The task keeps the Full loop internally while varying only display weight |
| Object routed | The work object has a named owner skill or workflow |
| Check matched | The final verification matches the object completion check, not a weaker generic check |
| Curation routed | Any reusable lesson has a narrow destination, or the run explicitly records no durable writeback |
| Scope preserved | Small tasks stayed small on screen; complex or external tasks kept state/handoff/check visible |

For the first rollout checkpoint, see `workflows/agentic-engineering/daily-work-adoption-checkpoint-2026-05-29.md`.

For the first task-card field test, see `workflows/agentic-engineering/daily-work-task-card-field-test-2026-05-29.md`.

For the object-level field-test queue and real-task record template, see `workflows/agentic-engineering/daily-work-object-field-test-log.md`.

For the Full-only demo diagram and completion-check table, see
`workflows/agentic-engineering/ae-vela-full-flow-demo.svg` and
`workflows/agentic-engineering/ae-vela-completion-checks.md`.

For rollout scope, dirty-worktree boundaries, and future sync guidance, see `workflows/agentic-engineering/daily-work-rollout-manifest-2026-05-29.md`.

## Closeout Format

For meaningful work, close with:

```text
Changed:
- ...

Verified:
- ...

Not done / risk:
- ...

Curated:
- none | wrote/updated ...
```

Keep the closeout shorter than the work itself. The goal is a clean handoff, not a second report.
