---
name: skill-evolution-framework
description: Evolve the user's local Codex skills with an object-classification and blind-spot-map method. Use when the user asks to improve, refactor, generalize, compare, or upgrade one or more skills; apply mentor/reference skill patterns; add adaptive modes, coverage matrices, internal checks, or reusable workflows across current skills.
---

# Skill Evolution Framework

Use this skill to improve the user's local skills without turning them into bloated prompt dumps. The method is adapted from the mentor PRD-writing system: strong reference artifacts are blind-spot maps, not templates to copy wholesale.

## Core Principle

Every mature skill should define:

1. The object it operates on.
2. The modes or task types it supports.
3. What each object/mode must usually cover.
4. What should be compressed or skipped.
5. How to verify that the work actually landed.
6. How new field lessons are folded back into the skill.

Do not add every possible section to every skill. Add the smallest reusable structure that prevents future mistakes.

For broad daily-work upgrades, start from `workflows/agentic-engineering/daily-work-iteration-protocol.md`: upgrade the shared Full-only state / handoff / check / curate loop first, then patch individual skills only when the lesson has a narrow operation-object owner.

## Workflow

1. Observe the target skill.
   - Read `SKILL.md`, `agents/openai.yaml`, and only the relevant reference files.
   - Identify whether the skill is local/user-owned, system-owned, or plugin-owned.
   - Do not edit system/plugin skills unless the user explicitly asks and the location is user-writable.

2. Identify the skill object.
   - Ask what the skill operates on: document, PRD, UI surface, automation, report, diagram, campaign site, dataset, browser session, shared library, or external system.
   - If the skill handles several objects, build a coverage matrix instead of forcing one workflow.

3. Treat strong examples as blind-spot maps.
   - If a mentor/reference workflow covers something the current skill lacks, first ask whether that item is usually required for this skill object.
   - If required, add it to the skill's object/mode coverage.
   - If useful but heavy, compress it into a checklist item, fallback rule, or `待确认/stop condition`.
   - If irrelevant, omit it.

4. Add adaptive structure.
   - Keep `SKILL.md` short and procedural.
   - Put large matrices, mode references, examples, and checklists under `references/`.
   - Update `agents/openai.yaml` only if the UI-facing promise changed.

5. Verify.
   - Check that referenced files exist.
   - Search for the new entry points from `SKILL.md`.
   - Parse YAML metadata when changed.
   - Use existing project checks if the skill includes scripts or code.

6. Curate the lesson.
   - Decide whether the observed lesson belongs in a skill, prompt, workflow, project note, knowledge file, or nowhere.
   - For the concrete runtime flow, follow `workflows/agentic-engineering/skill-curation-protocol.md` when available.
   - Act as Commander: make routine curation decisions without a popup or separate confirmation.
   - Report narrow verified writeback briefly in the final handoff; stay silent when there is nothing worth writing.
   - Write durable rules only when they were verified in a real task or are explicitly marked as an assumption.
   - Prefer a workflow entry when the lesson spans multiple skills or agents.
   - Prefer a prompt entry when the lesson is mainly a reusable startup contract.
   - Prefer the target skill when the lesson prevents a repeatable mistake inside one operation object.
   - Ask the user first for broad cross-skill rewrites, commit/push, external actions, private content storage, or risky/destructive changes.

## Library-Wide Upgrade Mode

Use this mode when the user asks to organize or upgrade all skills in the shared library.

1. Start from `skills/REGISTRY.md` if it exists; otherwise create it before editing individual skills.
2. Classify every skill by primary object, role, mature coverage, verification, and writeback target.
3. Upgrade the shared governance layer first: registry, workflow protocol, and indexes.
4. Patch individual skills only for missing entrypoints, object coverage, verification, stop rules, or Curator closeout.
5. Avoid broad rewrites. Keep each skill focused on its own operation object.
6. Verify with search, `git diff --check`, and referenced file existence.
7. Do not ask the user to approve routine registry/protocol updates; ask only before publishing, pushing, or making broad/risky changes.

## Coverage Matrix Template

Use this template inside a skill-specific reference or compactly in `SKILL.md`:

| Object / Mode | Must Usually Cover | Compress / Skip | Verification |
|---|---|---|---|
|  | Inputs, decisions, actions, states, outputs, failure paths, owner, artifact | Sections irrelevant to the current request | File exists, UI visible, command passed, screenshot/render inspected, external status verified |

Good object examples:

- PRD skill: C-side experience, backend/admin tool, strategy/rule, AI capability, experiment, data/dashboard, flow/state, business cooperation.
- WeCom editing skill: source document, target section, table cell, long document import, template copy, image/diagram insertion.
- Mind-map skill: concept map, process map, decision tree, feedback loop, PRD diagram, execution roadmap.
- Activity skill: quiz flow, result card, poster, visual assets, analytics, admin dashboard, deployment, rollback.
- Automation/report skill: data source, login state, scheduler, report format, delivery channel, failure remediation.

## Anti-Patterns

- Do not paste the same meta-framework paragraph into every skill.
- Do not make every skill read every reference file.
- Do not convert operational stop conditions into vague advice.
- Do not claim a skill has learned a behavior until the behavior was verified in a real run or encoded as an explicit assumption.
- Do not broaden a skill so much that its trigger becomes ambiguous.

## Handoff Standard

When evolving skills, report:

- Which skill files changed.
- Which object/mode coverage was added.
- Which prompt/workflow/knowledge entries were added, if any.
- What was verified.
- Which skills remain to evolve next.
