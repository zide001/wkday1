---
name: prd-coach
description: Personal product-management skill for writing, reviewing, comparing, and iterating PRDs. Use when the user asks Codex to write a PRD, review a PRD, compare their PRDs with learning/reference PRDs, summarize PRD evolution over time, build PRD templates, score PRD quality, or update the user's product-methodology skill from new PRD examples, especially with .docx files in the local PRD knowledge base.
---

# PRD Coach

## Core Principle

Treat every user-provided "learning PRD" as training signal, not just one-off reference. Use it to improve the user's personal PRD method, templates, scoring rubric, and next-writing checklist.

Treat strong mentor/reference PRDs as blind-spot maps. If a strong PRD consistently includes sections the user has not mentioned, assume those sections may represent missing product thinking, not irrelevant verbosity. Align with the reference by learning when those sections matter, while still outputting only the useful parts for the current demand type.

## Default Knowledge Base

When the user does not specify paths, inspect:

- Personal PRDs: `/Users/yangzide/Documents/Codex/2026-05-11/new-chat/prd-knowledge-base/01-personal-prds/raw/wecom-prd`
- Learning PRDs: `/Users/yangzide/Documents/Codex/2026-05-11/new-chat/prd-knowledge-base/02-learning-prds/raw/wecom-prd`
- Index and analysis outputs: `/Users/yangzide/Documents/Codex/2026-05-11/new-chat/prd-knowledge-base/_index`

## Workflow

Default to the Multi-Role PRD Pipeline posture for PRD work: Owner / Orchestrator frames the task, PRD Writer drafts, PRD Reviewer checks independently, Formatter adapts the output surface, and Curator decides whether any verified lesson should be written back. Compress roles for small requests, but keep the role separation mentally active.

For PRD work that spans WeCom, TAPD, reports, automation, or skill updates, align with `workflows/agentic-engineering/daily-work-iteration-protocol.md`: use Full flow by default, compress the visible display weight for small edits, then apply the PRD role split only as deeply as the task requires.

1. Classify the task:
   - **Write**: produce a PRD or PRD section.
   - **Summarize**: turn rough user narration, meeting notes, screenshots, or live document observations into a concise product/PRD summary.
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
   - Read `references/adaptive-prd-delivery.md` before producing a PRD deliverable, so the output mode matches the demand type and only relevant sections are included.
   - Read `references/output-templates.md` when generating reusable outputs.

4. Produce action-oriented output:
   - Start with the highest-level judgment.
   - Separate "already improved" from "next improvement".
   - Give concrete rewrite patterns, table templates, or next-PRD checklist items.
   - When the user asks for continuous iteration, update the relevant reference file or project template.

## Multi-Role PRD Pipeline

This is the default PRD Coach execution posture. Use the lightweight AE-Vela-style role split for all PRD work, then scale the visible process up or down based on task weight.

Default role split:

| Role | Responsibility | Output |
|---|---|---|
| Owner / Orchestrator | Clarify goal, scope, materials, target surface, and final acceptance | Brief, decisions, final handoff |
| PRD Writer | Produce the clean PRD draft and revise required issues | PRD body |
| PRD Reviewer | Independently judge business logic, boundary, feasibility, metrics, risks, launch plan, and missing facts | `pass / needs-revision / block` plus issue list |
| Formatter / Publisher | Adapt the approved content to WeCom, TAPD, Word/PDF, or chat | Publish-ready version |
| Curator | Decide whether any verified lesson should be written back into a skill, prompt, workflow, or knowledge note | Writeback decision |

Compress the pipeline for small requests: combine Writer and Reviewer, skip Formatter when the answer stays in chat, and skip writeback when there is no reusable lesson. Use the full visible split when the PRD is cross-functional, experiment/risk-heavy, intended for WeCom/TAPD, or has already needed several rounds of correction.

Reviewer verdict contract:

```text
verdict: pass | needs-revision | block
一句话判断:
必须修改:
可选优化:
缺失信息:
上线/协同风险:
是否需要二次审稿:
```

Curator closeout:

- If the lesson is about PRD logic, expression, rubric, or template shape, update `prd-coach` references.
- If the lesson is about WeCom formatting or table editing, route it to `wecom-doc-editor`.
- If the lesson is about TAPD fields, draft/save/submit behavior, or rich editor constraints, route it to `tapd-prd-draft`.
- If the lesson connects several skills, route it to a shared `workflows/` entry.
- Open the PRD Curator review window only for user-judged writeback: PRD knowledge-base inclusion, default-method changes, ambiguous destination, medium/high risk, private/business content boundary, or batched candidates. Routine no-op stays silent; narrow verified writeback is only mentioned in the final handoff.
- Do not write unverified one-off observations into durable skills.

## PRD Object Coverage Matrix

Choose the PRD object before choosing the output shape.

| PRD Object | Must Usually Cover | Compress / Skip | Verification |
|---|---|---|---|
| C-side/user-facing experience | User scenario, entry, interaction, states, copy, exceptions, metrics | Backend field detail unless needed | User flow can be read end-to-end |
| Backend/admin tool | Trigger, input, backend action, permission, fallback, QA check | Marketing copy and visual polish | Engineering can implement without guessing rules |
| Strategy/rule | Population, threshold, assignment, precedence, stop condition, data owner | Full page spec if no UI changes | Rule can be tested with positive/negative examples |
| AI capability | Input/output, model/strategy boundary, risk, fallback, evaluation, logging | Model theory unless needed for reviewers | Acceptance examples and review loop exist |
| Experiment | Hypothesis, group split, metrics, observation window, ramp/rollback | Long theory when decision rule is clear | Decision bucket and stop rule are explicit |
| Data/dashboard | Metric definition, dimension, source, refresh, owner, anomaly handling | UI details if only data contract matters | Data owner can validate the numbers |
| Flow/state transition | Before/after, state machine, unchanged scope, exception path, recovery | Long standalone diagram unless useful | Reviewer can see what changes and what stays |
| Business cooperation | Stakeholders, responsibility split, settlement/permission, timeline, risk | Internal implementation fields | Each side knows action and acceptance boundary |

## Summarization Mode

Use this when the user speaks in fragments, describes a workflow verbally, asks to "总结一下", or wants a quick PRD draft from conversation context.

1. Extract only product-relevant facts:
   - Background/problem.
   - Current flow and target flow.
   - Scope and explicit non-scope.
   - Rules, defaults, dynamic parameters, and unchanged logic.
   - Requirement list, priorities, and demo/process evidence.

2. Remove conversational noise.
   - Do not preserve hesitation, repeated corrections, or assistant process notes.
   - Convert user corrections into final rules. Example: if the user says "别写字段 / prompt 不用写 / 纯后端", the final PRD should explicitly keep those out of scope.

3. Prefer the user's WeCom PRD shape for deliverables:
   - `需求列表` columns: `序号 | 产品模块 | 子模块（如有） | 需求描述 | 优先级`.
   - `详细需求` columns: `模块 | 详细需求[优先级] | demo示意`.
   - Detailed requirement hierarchy: `i.` as the main item, with `A. B. C.` subpoints.
   - Put process diagrams or examples directly in `demo示意` when the user asks for demo placement.

## PRD Writing Output Rules

For formal PRD deliverables:

- Set author to `杨子德`.
- Preserve the user's existing PRD format, section order, tone, and company-style wording unless the user explicitly asks for a new format.
- Choose the product object and output mode before writing: C-side/user-facing experience, backend/admin tool, strategy/rule, AI capability, experiment, data/dashboard, flow/state transition, business cooperation, or complete long-form PRD.
- Do not output every possible PRD section just because a reference template contains it. Include the sections that help the current reviewers act; omit or compress unrelated sections.
- Use the complete long-form PRD structure only when the user asks for a full document, the requirement is cross-functional/high-risk, or the draft will be reviewed by product, engineering, QA, data, and operations together.
- If information is missing, keep writing with `待补充` or `基于当前信息推断`, then centralize open questions in `待确认事项 / 信息缺口` with impact and suggested owner.
- Do not include `PRD Coach`, `Codex`, "AI 优化", "我建议", or similar assistant traces inside the formal PRD body, title, update record, author field, file name, or comments.
- If showing changes, put coaching notes in a separate review report or a clearly labeled marked-up copy, not in the clean PRD.
- Use the expression pattern library internally, but output should read like the user's own PRD.
- Prefer clear developer-facing language over methodology labels: say what the page shows, what the user does, what rule applies, and what happens in exceptions.
- For report/PRD/PDF deliverables, proactively bold the information a reviewer must catch at a glance: core conclusions, experiment population, split ratios, thresholds, irreversible rules, P0 requirements, required fields, observation windows, stop conditions, and launch-blocking TODOs. Do not bold entire paragraphs.

For the user's common WeCom PRD format:

- Keep the document body concise and table-first.
- Use `一、需求概述`, `需求列表`, `期望上线时间`, and `二、详细需求` when the existing/open document uses that structure.
- For pure backend acceptance PRDs, especially名单导入、配置生效、命中判断、分流、兜底、数据回收类需求, use the backend acceptance template in `references/output-templates.md`: short background, clear in/out scope, `需求列表`, `详细需求`, test acceptance, launch coordination, and Q&A. Do not add field explanations, frontend sections, or model/strategy theory unless they are explicitly in scope.
- For formal `[PRD][日常迭代]` deliverables, keep the tail modules fixed even when they are not needed: `四、数据埋点`, `五、实验设计`, `六、发布计划`, `七、上线前后协同方动作`, `八、评审记录`, and `Q&A`.
- When a fixed tail module is not applicable, mark it in the heading with `（不需要）` and write one concise business-specific reason; do not copy unrelated example text from another PRD.
- `八、评审记录` should keep a table with `日期 | 评审纪要`, followed by `Q&A` with `问题 | 结论`, leaving blank rows when no content is available.
- Do not over-explain implementation fields, IDs, status enums, prompt text, or frontend UI when the user says the change is pure backend or flow-only.
- For backend acceptance PRDs, detailed requirement rows should follow `1. 【P0】...` plus `a. b. c.` subpoints. Each row should tell engineering and QA: input/trigger, backend action, rule, fallback, and how to verify it. The most important QA questions are usually `是否命中`, `命中后分流是否正确`, `非名单/跨 appid 是否误命中`, and `兜底是否正确`.
- For flow changes, include a compact Before/After comparison in `demo示意` instead of a long standalone diagram unless the user asks for a separate flow section.
- For Word/Tencent Docs-style exports, use the user's reference type scale: title 24pt bold, first-level headings 18pt bold, second-level headings 16pt bold, body/table text 11pt, confidential/author text 12pt, PingFang SC when available.

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
