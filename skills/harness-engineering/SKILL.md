---
name: harness-engineering
description: Lightweight engineering harness for local file, command, automation, UI, repository, and external-system work. Use when tasks require observe-before-change, scoped edits, verification, safe handoff, or practical engineering/operations execution.
---

# Harness Engineering

Use this skill when a task asks Codex to take over practical engineering work:
code changes, file changes, automation, UI-driven edits, debugging, local
verification, release preparation, or any workflow where commands can affect
the user's machine or external systems.

This skill is a guardrail layer. It does not replace engineering judgment, but
it requires every engineering action to pass through a small set of observable
gates: observe, harness, patch, verify, and handoff.

## Core Principle

Treat previous successful and failed runs as blind-spot maps. If a class of work repeatedly required repo inspection, target proof, command dry-runs, artifact verification, external-action confirmation, or rollback evidence, make that coverage explicit for the same operation object.

Do not use one generic safety checklist for every task. Choose the operation object first, then apply the smallest set of gates that proves the work is safe and complete.

## Operation Object Coverage Matrix

| Operation Object | Must Usually Cover | Compress / Skip | Verification |
|---|---|---|---|
| Local file edit | Target file, current content, unrelated changes, scoped patch, syntax/format check | Broad repo checks for tiny text edits | Diff or direct inspection proves exact change |
| Code implementation | Repo state, dependency/test command, patch scope, regression check | Unrelated refactors | Relevant test/build/lint or targeted runtime check passes |
| Document/artifact generation | Source material, output path, format requirements, render/import check | Code-level tests if no code changed | File exists and visual/structural check passes |
| Browser/UI operation | Visible target, account/session, exact action, one-step observation, stop condition | Blind coordinate chains | Screenshot/DOM/visible state proves result |
| Automation/scheduler | Existing job, schedule, logs, dry-run/status-only boundary, delivery channel | Rerun when user asked not to rerun | Logs/plist/job state proves status or change |
| External visible action | Destination, irreversible effect, user confirmation, payload preview | Automatic submit/push/send | Confirmation plus remote state/result evidence |
| Destructive/local risky action | Data affected, rollback/backup, explicit approval, safer alternative | Silent deletion/reset/permission changes | Backup/approval and post-action state are documented |

## Trigger

Use this skill when any of these are true:

- The user asks Codex to fix, implement, debug, generate files, edit docs, or
  operate local tools.
- The task requires shell commands, browser automation, desktop automation, or
  non-trivial file writes.
- The task has risk of drifting from the user's intent unless the environment is
  inspected first.
- The user says "take over", "handle it", "make it work", "verify it", or an
  equivalent phrase.

Do not force this skill for tiny, self-contained chat answers, simple rewrites,
or one-line lookups that do not touch local state.

## Required Flow

### 1. Observe

Before editing or running write commands:

- Confirm the working directory.
- Check whether the directory is a git repository.
- Inspect the relevant files, scripts, tests, and package managers.
- Identify existing user changes if a git worktree exists.
- State the immediate next action in a short user update.

Prefer the helper:

```bash
./scripts/inspect_repo.sh
```

### 2. Harness

Before changing code or files:

- Find the smallest command that can reproduce or verify the target behavior.
- Prefer existing project scripts over invented commands.
- If no test or check exists, define a minimal verification path before editing.
- For UI work, define how the final screen or artifact will be checked.

For detected checks:

```bash
./scripts/run_checks.sh --dry-run
```

### 3. Patch

When editing:

- Keep changes scoped to the requested behavior.
- Do not rewrite unrelated structure.
- Use the repository's existing style and helpers.
- Avoid touching generated, lock, credential, cache, or build output files unless
  the user explicitly asks.
- Announce the edit target before making file changes.

### 4. Verify

After editing:

- Run the smallest meaningful verification command.
- If the first check fails, inspect the failure and continue toward a fix when
  feasible.
- Do not claim something is verified unless a command, render, screenshot, or
  direct inspection supports it.
- For frontend or UI work, verify with a browser or screenshot when practical.

Use:

```bash
./scripts/run_checks.sh --execute
./scripts/changed_files.sh
```

### 5. Handoff

Final response must include:

- What changed.
- What was verified.
- Any remaining risk or skipped check.
- Exact paths for generated deliverables.

Keep the handoff short unless the user asks for a detailed report.

## Curator Closeout

After a task exposes a repeatable safety gap, decide where the lesson belongs.

- Add operation-specific guardrails here only when they apply across many local engineering tasks.
- Route domain-specific lessons to the owning skill, such as `wecom-doc-editor`, `tapd-prd-draft`, or `wedata-abtest-daily-report`.
- Route cross-skill procedures to `workflows/` in the shared library.
- For recurring daily-work patterns that span PRDs, live docs, automation, prototypes, code, and skills, use `workflows/agentic-engineering/daily-work-iteration-protocol.md` as the shared operating loop before adding more Harness rules.
- Do not add one-off command failures or project-private details to this skill.

## Command Safety Rules

Classify commands before running them:

- Read-only: safe to run after stating purpose.
- Local write: allowed only after observing context and scoping the target.
- External visible: stop and ask before sending, publishing, pushing,
  submitting, deleting remotely, purchasing, emailing, or messaging.
- Destructive: stop and ask before deleting, resetting, overwriting, changing
  permissions broadly, killing services, or modifying system state.

When in doubt, use:

```bash
./scripts/safe-run.sh --dry-run "command here"
```

High-risk commands require explicit user approval and:

```bash
HARNESS_ALLOW_DANGEROUS=1 ./scripts/safe-run.sh --execute "command here"
```

## Stop Conditions

Stop and ask the user when:

- The target document, app, branch, repository, or account is ambiguous.
- A command would be externally visible.
- A command may destroy or overwrite user data.
- The current screen does not match the requested target.
- Verification depends on a login, QR scan, captcha, or manual user step.

## Non-Goals

This skill is not:

- A replacement for OS sandboxing.
- A promise that arbitrary shell commands are safe.
- A reason to avoid domain-specific skills.

When a task clearly matches a domain skill, use that skill together with this
one. Harness Engineering provides the gates; the domain skill provides the
specialized workflow.
