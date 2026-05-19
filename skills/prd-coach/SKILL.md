---
name: prd-coach
description: Personal product-management skill for writing, reviewing, comparing, and iterating PRDs. Use when the user asks Codex to write a PRD, review a PRD, compare their PRDs with learning/reference PRDs, summarize PRD evolution over time, build PRD templates, score PRD quality, or update the user's product-methodology skill from new PRD examples, especially with .docx files in the local PRD knowledge base.
---

# PRD Coach

## Core Principle

Treat every user-provided "learning PRD" as training signal, not just one-off reference. Use it to improve the user's personal PRD method, templates, scoring rubric, and next-writing checklist.

## Default Knowledge Base

When the user does not specify paths, inspect:

- Personal PRDs: `/Users/yangzide/Documents/Codex/2026-05-11/new-chat/prd-knowledge-base/01-personal-prds/raw/wecom-prd`
- Learning PRDs: `/Users/yangzide/Documents/Codex/2026-05-11/new-chat/prd-knowledge-base/02-learning-prds/raw/wecom-prd`
- Index and analysis outputs: `/Users/yangzide/Documents/Codex/2026-05-11/new-chat/prd-knowledge-base/_index`

## Workflow

1. Classify the task:
   - **Write**: produce a PRD or PRD section.
   - **Review**: critique a PRD and propose improvements.
   - **Compare**: compare personal PRDs against learning PRDs.
   - **Evolve**: update the user's reusable PRD method, template, or rubric.

2. Gather evidence:
   - For `.docx`, run `scripts/extract_prd_signals.py` when batch extraction is useful.
   - Read only the relevant extracted JSON/CSV or focused document snippets.
   - Prefer evidence from titles, author fields, update dates, background, goals, requirement tables, metrics, experiment sections, launch plans, and review records.

3. Use the references selectively:
   - Read `references/personal-profile.md` for the user's current PRD evolution profile.
   - Read `references/rubric.md` for scoring and review criteria.
   - Read `references/expression-patterns.md` before writing or rewriting PRD requirements, so the expression structure matches the demand type instead of forcing one template.
   - Read `references/output-templates.md` when generating reusable outputs.

4. Produce action-oriented output:
   - Start with the highest-level judgment.
   - Separate "already improved" from "next improvement".
   - Give concrete rewrite patterns, table templates, or next-PRD checklist items.
   - When the user asks for continuous iteration, update the relevant reference file or project template.

## PRD Writing Output Rules

For formal PRD deliverables:

- Set author to `杨子德`.
- Preserve the user's existing PRD format, section order, tone, and company-style wording unless the user explicitly asks for a new format.
- Do not include `PRD Coach`, `Codex`, "AI 优化", "我建议", or similar assistant traces inside the formal PRD body, title, update record, author field, file name, or comments.
- If showing changes, put coaching notes in a separate review report or a clearly labeled marked-up copy, not in the clean PRD.
- Use the expression pattern library internally, but output should read like the user's own PRD.
- Prefer clear developer-facing language over methodology labels: say what the page shows, what the user does, what rule applies, and what happens in exceptions.

## Continuous Iteration Protocol

When the user adds new personal or learning PRDs:

1. Extract signals from the new documents.
2. Compare them against the current personal profile and rubric.
3. Identify whether the new learning PRD introduces a reusable pattern.
4. Update one or more of:
   - `references/personal-profile.md`
   - `references/rubric.md`
   - `references/output-templates.md`
   - the project-level PRD templates under the knowledge base `_index`
5. Tell the user what changed in the method, not just what changed in the document set.

## Review Stance

Judge PRDs by whether they help a real product team make decisions:

- Why now?
- What business/user/system problem is being solved?
- What changes if this ships?
- Which metric proves it worked?
- What experiment or rollout plan reduces risk?
- Is gray release, experiment design, training, or post-launch review actually necessary for this requirement, given impact, workload, reversibility, and risk?
- What states, permissions, failures, and edge cases must be handled?
- Can engineering implement from the PRD without guessing page elements, interactions, strategy rules, and fallback logic?
- Did the PRD choose the right expression pattern for the demand type instead of forcing a page/configuration template onto every requirement?
- Who must do what before and after launch?
- What will be reviewed after 7/14/30 days?

## User-Specific Bias

The user's current strength is turning ambiguous AI/content/business problems into concrete backend, data, and configuration capabilities. The next growth direction is to connect those capabilities more explicitly to business assumptions, experiment design, decision thresholds, and post-launch loops.

Use this bias when coaching: do not merely ask for more detail; push toward stronger product judgment.
