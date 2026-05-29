# Daily Work Rollout Manifest - 2026-05-29

This manifest separates the AE-Vela daily-work rollout from pre-existing
shared-library changes. It exists so a future sync, commit, or review can be
scoped instead of bundling unrelated dirty work.

## Rollout Intent

Adapt the useful parts of AE-Vela into the user's daily Codex work:

- object-first routing;
- Full-only flow with compressed display weight;
- explicit state, handoff, completion check, and curation steps;
- reusable startup prompt;
- narrow owner links from the skills that most often participate in daily work.

This is a local rollout record only. No GitHub push, commit, WeCom send, TAPD
submit, deployment, or other external-visible action was performed.

Proactive reminder created:

| Automation | Purpose |
|---|---|
| `ae-vela` | Weekday thread reminder to prompt the user to apply the daily-work protocol to the first non-trivial PRD, WeCom/Tencent Docs, TAPD, ABTest/report, automation, prototype, or skill/workflow task. |

## Created By This Rollout

| Path | Purpose |
|---|---|
| `prompts/daily-work-task-card.md` | Reusable startup card for classifying daily tasks by object, owner, display weight, evidence, completion check, external action, and curation candidate. |
| `workflows/agentic-engineering/daily-work-iteration-protocol.md` | Main AE-Vela-inspired operating loop for daily work. |
| `workflows/agentic-engineering/ae-vela-completion-checks.md` | Mac-specific completion-check table for PRD, WeCom/Tencent Docs, TAPD/send, report, automation, prototype, diagram, code, and skill/workflow tasks. |
| `workflows/agentic-engineering/ae-vela-full-flow-demo.mmd` | Editable Mermaid source for the Full-only daily-work demo flow. |
| `workflows/agentic-engineering/ae-vela-full-flow-demo.svg` | Shareable visual demo of the Full-only daily-work flow. |
| `workflows/agentic-engineering/daily-work-adoption-checkpoint-2026-05-29.md` | First adoption checkpoint and gap list. |
| `workflows/agentic-engineering/daily-work-task-card-field-test-2026-05-29.md` | First field test of the task card against this rollout itself. |
| `workflows/agentic-engineering/daily-work-object-field-test-log.md` | Queue and record template for the first real business-task trials. |
| `workflows/agentic-engineering/daily-work-rollout-manifest-2026-05-29.md` | This scope and sync-safety manifest. |
| `knowledge/session-notes/2026-05-29-ae-vela-daily-work-adoption.md` | Durable knowledge-layer summary and next-use instructions for future Codex sessions. |
| `scripts/verify-daily-work-rollout.sh` | Read-only verifier for rollout files, cross-links, shared and live skill entry points, scoped staging/sync rules, and sensitive-marker checks. |

Local workspace note outside the shared library:

| Path | Purpose |
|---|---|
| `/Users/yangzide/Documents/Codex/2026-05-29/files-mentioned-by-the-user-ae/ae-vela-lessons-for-our-work.md` | Study note summarizing AE-Vela strengths, caveats, and adoption ideas. |

## Modified By This Rollout

Only the daily-work related lines should be treated as part of this rollout in
the files below. Some files already had unrelated local edits before this
manifest existed.

| Path | Rollout-owned change |
|---|---|
| `prompts/prd-rewrite-and-complete.md` | Added daily-work task-card routing and field-test logging for PRD tasks that cross systems or need expanded Full display. |
| `prompts/wecom-doc-edit.md` | Added Full-only routing for live WeCom/Tencent Docs edits and field-test logging. |
| `prompts/abtest-daily-analysis.md` | Added Full-only routing for report, script, scheduler, login, rerun, or send tasks and field-test logging. |
| `prompts/frontend-tool-build.md` | Added Full-only routing for multi-file, deploy/public-link, cross-turn, or external-visible prototype work and field-test logging. |
| `prompts/INDEX.md` | Added `daily-work-task-card.md`. |
| `workflows/INDEX.md` | Added `agentic-engineering/daily-work-iteration-protocol.md`, `daily-work-object-field-test-log.md`, completion-check table, and demo diagram entries. |
| `knowledge/INDEX.md` | Added the AE-Vela daily-work adoption session note. |
| `knowledge/profile.md` | Added the AE-Vela-inspired daily-work posture as a recurring-work preference. |
| `knowledge/decisions.md` | Added the 2026-05-29 daily-work adoption decisions and scoped-staging rule. |
| `knowledge/codex-operations.md` | Replaced broad `git add .` guidance with scoped reviewed staging and cached diff check. |
| `workflows/knowledge-update.md` | Replaced broad directory staging with reviewed-path staging and cached diff check. |
| `README.md` | Replaced `git add .` sync guidance with reviewed-path staging and cached diff check; added the verifier command. |
| `scripts/publish.ps1` | Replaced broad staging with required reviewed `-Paths`, cached diff check, and explicit git exit-code handling. |
| `scripts/sync.ps1` | Added a dirty-worktree stop before `pull --rebase` and explicit git exit-code handling. |
| `skills/zide-shared-library/SKILL.md` | Added daily-work protocol routing for broad recurring work and replaced auto commit/push guidance with scoped sync gates. |
| `skills/harness-engineering/SKILL.md` | Added curator closeout route to the daily-work protocol. |
| `skills/skill-evolution-framework/SKILL.md` | Added rule to upgrade the shared loop first for broad daily-work changes. |
| `skills/prd-coach/SKILL.md` | Added Full-only daily-work alignment for PRD work spanning other systems. |
| `skills/wecom-doc-editor/SKILL.md` | Added Full-only daily-work outer-frame rule for WeCom edits and PRD/TAPD handoff. |
| `skills/tapd-prd-draft/SKILL.md` | Added Full-flow rule for external-visible TAPD creation. |
| `skills/wedata-abtest-daily-report/SKILL.md` | Added Full-only display-weight guidance for status audits, reruns, schedule changes, QR login, and WeChat delivery. |
| `skills/qidian-character-activity/SKILL.md` | Added Full-only display-weight guidance for local tweaks vs deployment/public/admin changes. |
| `skills/mindmap-designer/SKILL.md` | Added Full-only display-weight guidance for outlines vs editable diagram artifacts. |

The same daily-work references were mirrored into the live local skill files
under `/Users/yangzide/.codex/skills/.../SKILL.md` so future Codex sessions can
use the behavior immediately.
The `zide-shared-library` sync-safety rule was also mirrored into the live
local skill at `/Users/yangzide/.codex/skills/zide-shared-library/SKILL.md`.

## Pre-Existing Or Out-Of-Scope Dirty Work

The shared-library worktree is not clean. Do not assume all dirty files belong
to this rollout.

Observed out-of-scope or not-yet-attributed paths include:

- `skills/INDEX.md`
- `skills/prd-coach/agents/openai.yaml`
- `skills/prd-coach/references/output-templates.md`
- `skills/prd-coach/references/rubric.md`
- `prompts/prd-multi-role-pipeline.md`
- `skills/REGISTRY.md`
- `skills/prd-coach/references/adaptive-prd-delivery.md`
- `skills/qidian-character-activity/agents/openai.yaml`
- `skills/qidian-character-activity/references/runbook.md`
- `skills/skill-evolution-framework/agents/openai.yaml`
- `skills/tapd-prd-draft/agents/openai.yaml`
- `workflows/agentic-engineering/prd-multi-role-pipeline.md`
- `workflows/agentic-engineering/skill-curation-protocol.md`

Some of these may be useful shared-library evolution work, but they require a
separate scope decision before commit or push.

## Known Risks

- The original `AE-Vela-main.zip` could not be fully extracted because several
  Chinese filenames were corrupted in the archive. The rollout was based on the
  stable extracted core: root docs, `.claude`, `.codebuddy`, `agents`, `ci`, and
  ASCII-safe `pipeline` files.
- `.mcp.json` inside the AE-Vela package appeared to include a WeCom webhook
  URL. Treat the archive as potentially containing sensitive configuration and
  do not publish raw package contents.
- The shared and live `wecom-doc-editor` skill files already differed in older
  unrelated lines. The daily-work line exists in both, but full parity was not
  proven.
- No real PRD, WeCom, TAPD, report, automation, or prototype task has completed
  end-to-end under this protocol yet. The first field test was this rollout
  itself; `daily-work-object-field-test-log.md` now defines the pending
  business-task validation queue.

## Verification Already Performed

Commands used during the rollout:

```bash
rg -n "daily-work|AE-Vela|task-card|adoption-checkpoint|field-test" prompts workflows skills -g '*.md'
rg -n "daily-work-iteration-protocol|daily-work-task-card" /Users/yangzide/.codex/skills -g 'SKILL.md'
rg -n "daily-work-object-field-test-log|Field-Test Queue|Pass Criteria" workflows prompts skills -g '*.md'
rg -n "AE-Vela Daily Work Adoption|daily-work-adoption|daily-work-object-field-test-log|git add \\\\.|Full-only|Completion Check" knowledge workflows prompts -g '*.md'
bash scripts/verify-daily-work-rollout.sh
git status --short --untracked-files=all
git diff --check -- README.md knowledge/INDEX.md knowledge/profile.md knowledge/decisions.md knowledge/codex-operations.md knowledge/session-notes/2026-05-29-ae-vela-daily-work-adoption.md workflows/knowledge-update.md workflows/agentic-engineering/daily-work-iteration-protocol.md prompts/daily-work-task-card.md prompts/INDEX.md workflows/INDEX.md workflows/agentic-engineering/daily-work-adoption-checkpoint-2026-05-29.md workflows/agentic-engineering/daily-work-task-card-field-test-2026-05-29.md workflows/agentic-engineering/daily-work-object-field-test-log.md workflows/agentic-engineering/daily-work-rollout-manifest-2026-05-29.md scripts/verify-daily-work-rollout.sh scripts/publish.ps1 scripts/sync.ps1
```

Current verification meaning:

- The protocol is discoverable from linked workflow, prompt, and skill entry
  points.
- The four high-frequency startup prompts now route non-trivial PRD, WeCom,
  ABTest/report, and frontend/prototype work through the Full-only daily-work
  task card.
- The knowledge layer has a dated session note pointing future sessions to the
  operating assets.
- The knowledge defaults now make the AE-Vela-inspired posture part of future
  recurring work, and shared-library sync guidance avoids broad staging.
- The read-only verifier gives future runs a single command to check that the
  rollout remains wired together in both the shared-library copy and live local
  skills.
- A weekday heartbeat automation now proactively reminds the user to apply the
  protocol before the day gets absorbed into ordinary tasks.
- The live local skills contain the same daily-work entry point references.
- The object-level field-test log gives the first real-task queue and pass
  criteria; the completion-check table makes each object's local proof concrete.
- The new prompt and workflow files pass whitespace checks.
- The worktree remains dirty, so commit/push is intentionally deferred.

## Safe Future Commit Scope

If the user later asks to sync this AE-Vela daily-work rollout, review and stage
only the rollout-owned paths above. Use a scoped add command or explicit path
list; do not use `git add .`.

Before any commit or push:

1. Re-run `git status --short --untracked-files=all`.
2. Inspect `git diff` for each modified tracked file and stage only the
   daily-work related hunks or paths.
3. Exclude `.mcp.json`, archive contents, generated caches, and unrelated PRD
   or skill evolution files unless explicitly approved.
4. Ask for confirmation before commit/push because this is an external-visible
   shared-library sync.
