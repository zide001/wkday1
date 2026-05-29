#!/usr/bin/env bash
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT" || exit 1
LIVE_SKILL_ROOT="/Users/yangzide/.codex/skills"

failures=0

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  failures=$((failures + 1))
}

pass() {
  printf 'PASS: %s\n' "$1"
}

require_file() {
  local path="$1"
  if [[ -f "$path" ]]; then
    pass "file exists: $path"
  else
    fail "missing file: $path"
  fi
}

require_text() {
  local path="$1"
  local text="$2"
  if [[ ! -f "$path" ]]; then
    fail "cannot search missing file: $path"
    return
  fi
  if grep -Fq "$text" "$path"; then
    pass "text found in $path: $text"
  else
    fail "text missing in $path: $text"
  fi
}

required_files=(
  "prompts/prd-rewrite-and-complete.md"
  "prompts/wecom-doc-edit.md"
  "prompts/abtest-daily-analysis.md"
  "prompts/frontend-tool-build.md"
  "prompts/daily-work-task-card.md"
  "workflows/agentic-engineering/daily-work-iteration-protocol.md"
  "workflows/agentic-engineering/daily-work-object-field-test-log.md"
  "workflows/agentic-engineering/daily-work-adoption-checkpoint-2026-05-29.md"
  "workflows/agentic-engineering/daily-work-task-card-field-test-2026-05-29.md"
  "workflows/agentic-engineering/daily-work-rollout-manifest-2026-05-29.md"
  "knowledge/session-notes/2026-05-29-ae-vela-daily-work-adoption.md"
  "knowledge/profile.md"
  "knowledge/decisions.md"
  "knowledge/codex-operations.md"
  "README.md"
  "scripts/publish.ps1"
  "scripts/sync.ps1"
  "workflows/agentic-engineering/ae-vela-completion-checks.md"
  "workflows/agentic-engineering/ae-vela-full-flow-demo.mmd"
  "workflows/agentic-engineering/ae-vela-full-flow-demo.svg"
)

for path in "${required_files[@]}"; do
  require_file "$path"
done

require_text "prompts/INDEX.md" "daily-work-task-card.md"
require_text "workflows/INDEX.md" "daily-work-iteration-protocol.md"
require_text "workflows/INDEX.md" "daily-work-object-field-test-log.md"
require_text "knowledge/INDEX.md" "2026-05-29-ae-vela-daily-work-adoption.md"

require_text "knowledge/profile.md" "AE-Vela-inspired posture"
require_text "knowledge/decisions.md" "Full-only flow"
require_text "knowledge/decisions.md" "daily-work-object-field-test-log.md"
require_text "knowledge/codex-operations.md" "git diff --cached --check"
require_text "README.md" "git diff --cached --check"
require_text "prompts/prd-rewrite-and-complete.md" "daily-work-task-card.md"
require_text "prompts/prd-rewrite-and-complete.md" "daily-work-object-field-test-log.md"
require_text "prompts/wecom-doc-edit.md" "daily-work-task-card.md"
require_text "prompts/wecom-doc-edit.md" "daily-work-object-field-test-log.md"
require_text "prompts/abtest-daily-analysis.md" "daily-work-task-card.md"
require_text "prompts/abtest-daily-analysis.md" "daily-work-object-field-test-log.md"
require_text "prompts/frontend-tool-build.md" "daily-work-task-card.md"
require_text "prompts/frontend-tool-build.md" "daily-work-object-field-test-log.md"
require_text "scripts/publish.ps1" "Set-StrictMode -Version Latest"
require_text "scripts/publish.ps1" '$LASTEXITCODE'
require_text "scripts/publish.ps1" "Pass reviewed paths with -Paths"
require_text "scripts/sync.ps1" "Set-StrictMode -Version Latest"
require_text "scripts/sync.ps1" '$LASTEXITCODE'
require_text "scripts/sync.ps1" "Worktree is dirty"
require_text "skills/zide-shared-library/SKILL.md" "leave changes local unless the user explicitly asks to sync"
require_text "skills/zide-shared-library/SKILL.md" "diff --cached --check"

require_text "prompts/daily-work-task-card.md" "daily-work-object-field-test-log.md"
require_text "workflows/agentic-engineering/daily-work-iteration-protocol.md" "daily-work-task-card.md"
require_text "workflows/agentic-engineering/daily-work-iteration-protocol.md" "daily-work-object-field-test-log.md"
require_text "workflows/agentic-engineering/daily-work-iteration-protocol.md" "daily-work-rollout-manifest-2026-05-29.md"
require_text "workflows/agentic-engineering/daily-work-iteration-protocol.md" "Full-Only Flow"
require_text "workflows/agentic-engineering/daily-work-iteration-protocol.md" "Completion Check"
require_text "workflows/agentic-engineering/daily-work-iteration-protocol.md" "ae-vela-completion-checks.md"
require_text "prompts/daily-work-task-card.md" "ae-vela-completion-checks.md"
require_text "workflows/agentic-engineering/ae-vela-completion-checks.md" 'Flow is always `Full`'
require_text "workflows/agentic-engineering/ae-vela-full-flow-demo.svg" "AE-Vela Full-Only Daily Work Flow"
require_text "workflows/agentic-engineering/daily-work-rollout-manifest-2026-05-29.md" "verify-daily-work-rollout.sh"

skill_files=(
  "skills/zide-shared-library/SKILL.md"
  "skills/harness-engineering/SKILL.md"
  "skills/skill-evolution-framework/SKILL.md"
  "skills/prd-coach/SKILL.md"
  "skills/wecom-doc-editor/SKILL.md"
  "skills/tapd-prd-draft/SKILL.md"
  "skills/wedata-abtest-daily-report/SKILL.md"
  "skills/qidian-character-activity/SKILL.md"
  "skills/mindmap-designer/SKILL.md"
)

for path in "${skill_files[@]}"; do
  require_file "$path"
  require_text "$path" "daily-work-iteration-protocol.md"
done

live_skill_files=(
  "$LIVE_SKILL_ROOT/zide-shared-library/SKILL.md"
  "$LIVE_SKILL_ROOT/harness-engineering/SKILL.md"
  "$LIVE_SKILL_ROOT/skill-evolution-framework/SKILL.md"
  "$LIVE_SKILL_ROOT/prd-coach/SKILL.md"
  "$LIVE_SKILL_ROOT/wecom-doc-editor/SKILL.md"
  "$LIVE_SKILL_ROOT/tapd-prd-draft/SKILL.md"
  "$LIVE_SKILL_ROOT/wedata-abtest-daily-report/SKILL.md"
  "$LIVE_SKILL_ROOT/qidian-character-activity/SKILL.md"
  "$LIVE_SKILL_ROOT/mindmap-designer/SKILL.md"
)

for path in "${live_skill_files[@]}"; do
  require_file "$path"
  require_text "$path" "daily-work-iteration-protocol.md"
done
require_text "$LIVE_SKILL_ROOT/zide-shared-library/SKILL.md" "leave changes local unless the user explicitly asks to sync"

unsafe_git_add=$(rg -n '^[[:space:]]*git add (\.|-A|knowledge workflows skills README\.md)([[:space:]]|$)' README.md knowledge workflows scripts 2>/dev/null || true)
if [[ -n "$unsafe_git_add" ]]; then
  fail "unsafe broad git add command remains:\n$unsafe_git_add"
else
  pass "no unsafe broad git add command remains in README, knowledge, workflows, or scripts"
fi

unsafe_auto_push=$(rg -n 'After updating the knowledge base, commit and push' skills/zide-shared-library/SKILL.md 2>/dev/null || true)
if [[ -n "$unsafe_auto_push" ]]; then
  fail "old auto commit/push rule remains:\n$unsafe_auto_push"
else
  pass "no old auto commit/push rule remains in zide-shared-library skill"
fi

sensitive_markers=$(rg -n 'https?://qyapi|webhook[=:]|token[=:]|cookie[=:]' \
  knowledge/session-notes/2026-05-29-ae-vela-daily-work-adoption.md \
  workflows/agentic-engineering/daily-work-rollout-manifest-2026-05-29.md 2>/dev/null || true)
if [[ -n "$sensitive_markers" ]]; then
  fail "sensitive-looking marker found in rollout docs:\n$sensitive_markers"
else
  pass "no sensitive-looking webhook/token/cookie values in rollout docs"
fi

if [[ "$failures" -gt 0 ]]; then
  printf '\nDaily-work rollout verification failed with %d issue(s).\n' "$failures" >&2
  exit 1
fi

printf '\nDaily-work rollout verification passed.\n'
