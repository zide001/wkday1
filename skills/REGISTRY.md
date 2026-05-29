# Skill Registry

This registry is the shared-library view of user-level Codex skills. It keeps the skill set organized as a working operating system, not a list of prompt files.

## Organization Rules

- `SKILL.md` is the executable entrypoint: trigger, object modes, required coverage, verification, and stop rules.
- `references/` stores larger rubrics, examples, checklists, and runbooks.
- `agents/openai.yaml` stores the UI-facing promise and default prompt.
- `scripts/` stores repeatable helpers when a skill has real commands.
- Cross-skill procedures belong in `workflows/`, not inside one oversized skill.
- Commander mode is the default for curation: Codex decides routine writeback silently or with a short final note, and asks the user only for broad, risky, external, or privacy-sensitive changes.

## Whole-Library Map

| Skill | Primary Object | Default Role | Mature Coverage | Verification | Writeback Target |
|---|---|---|---|---|---|
| `harness-engineering` | Local file, command, repo, UI, automation, external action | Safety orchestrator | Operation object matrix and gates | Diff, command, render, screenshot, or log | Same skill for guardrail gaps; `workflows/` for cross-skill procedures |
| `mindmap-designer` | Mind map, XMind, workflow diagram, logic map | Structure designer | Map object coverage and XMind workflow | Editable file plus visual inspection | Same skill for map rules; `projects/` for one-off diagrams |
| `prd-coach` | PRD writing, review, comparison, coaching | Multi-role PRD pipeline | Product object modes, rubric, templates, default Writer/Reviewer/Formatter/Curator | Review verdict, final PRD, target-surface fit | `prd-coach` references, `wecom-doc-editor`, `tapd-prd-draft`, or workflow |
| `qidian-character-activity` | IP quiz/campaign site | Campaign builder | Activity object matrix, assets, deploy, capacity | Local/mobile/browser/deploy checks | Same skill or runbook for verified campaign patterns |
| `skill-evolution-framework` | Skill upgrade and refactor | Skill curator | Object/mode coverage, blind-spot map, verification | Referenced files exist, entrypoints searchable | Target skill, prompt, workflow, knowledge, or nowhere |
| `tapd-prd-draft` | TAPD requirement from PRD | Requirement publisher | Source capture, project routing, fields, draft/create, verification | API/DOM success, draft or created item evidence | Same skill for TAPD behavior; `wecom-doc-editor` for source-copy behavior |
| `wecom-doc-editor` | Tencent Docs/WeCom document editing | Live doc operator | Observe/Draft/Execute/Improve, edit object matrix, safety loop | Visible title, target location, pasted result | Same skill for UI/editing lessons; `prd-coach` for content rules |
| `wedata-abtest-daily-report` | Wedata ABTest crawl/report/scheduler | Data reporter | Report object matrix, 2-minute format, scheduler, delivery, login | JSON/Markdown/log/plist evidence | Same skill for report automation; `workflows/` for scheduler patterns |
| `zide-shared-library` | Shared knowledge, prompts, workflows, skills | Library curator | Library object matrix and sync rules | File exists, index updated, git status reviewed | Knowledge, prompt, workflow, skill, project, or material |

## Upgrade Levels

| Level | Meaning | Required Evidence |
|---|---|---|
| L1 Entry | Has frontmatter, purpose, trigger, and basic workflow | `SKILL.md` can be read and triggered |
| L2 Object Coverage | Defines object/mode matrix and what can be skipped | Coverage table or compact equivalent exists |
| L3 Verification | Says how to prove work landed | Command, UI, file, screenshot, render, log, or external evidence |
| L4 Curator | Says where new lessons go and when not to write back | Curator closeout or continuous improvement rule |
| L5 Operational Asset | Has references/scripts/templates for repeated work | Files exist and are indexed when useful |

Current target: every user-level skill should be at least L4. L5 is only needed when the skill has real repeatable artifacts.

## Default Upgrade Loop

1. Identify the operation object.
2. Read only the relevant skill and reference files.
3. Compare against the registry and recent blind-spot memory.
4. Add the smallest missing structure: object row, stop rule, verification, or curator closeout.
5. Verify by search, diff check, and referenced file existence.
6. As Commander, decide whether the lesson belongs in the target skill, a prompt, a workflow, knowledge, or nowhere; do not show a popup for routine no-op or narrow writeback.

## Next Upgrade Order

1. Keep `prd-coach`, `wecom-doc-editor`, and `tapd-prd-draft` aligned because they form the PRD publishing chain.
2. Keep `harness-engineering`, `skill-evolution-framework`, and `zide-shared-library` aligned because they form the meta-governance layer.
3. Upgrade project-family skills such as `qidian-character-activity` and `wedata-abtest-daily-report` only after verified field lessons.
4. Preserve lightweight skills such as `mindmap-designer`; do not overload them with unrelated governance text.
