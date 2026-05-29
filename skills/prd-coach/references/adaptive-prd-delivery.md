# Adaptive PRD Delivery

Use this reference before producing a PRD deliverable. The goal is to learn from complete PRD templates without making every output heavy. First choose the demand type, then include only sections that help reviewers decide, build, test, or operate the requirement.

This reference incorporates the useful structure from the user-provided `requirements-doc-writer` skill: complete document coverage, missing-information handling, user story/problem framing, trigger-system-user requirement writing, testing, instrumentation, gray release, rollback, and centralized open questions.

## Contents

- Selection Rule
- Product Object Coverage Matrix
- Always Keep
- Mode 1: WeCom Daily Mode
- Mode 2: Strategy / Rule Mode
- Mode 3: AI Capability Mode
- Mode 4: Experiment / Observation Mode
- Mode 5: Data / Dashboard Mode
- Mode 6: Flow / State Mode
- Mode 7: Business Cooperation Mode
- Mode 8: Complete PRD Mode
- Internal Quality Check

## Selection Rule

Before writing, decide:

| Question | Use For |
|---|---|
| What product object is being changed: C-side experience, backend/admin tool, strategy, AI capability, data, flow, or business cooperation? | Pick the required coverage from Product Object Coverage Matrix |
| Is this a small daily iteration in the user's familiar WeCom format? | Use WeCom Daily Mode |
| Is the hard part business logic, matching, ranking, threshold, or fallback? | Use Strategy / Rule Mode |
| Is the hard part model capability, AI pipeline, prompt/input/output, quality, or safety? | Use AI Capability Mode |
| Is the hard part proving business value or choosing rollout conditions? | Use Experiment / Observation Mode |
| Is the hard part metric definition, event tracking, dashboard, or decision support? | Use Data / Dashboard Mode |
| Is the hard part a multi-step path or state change? | Use Flow / State Mode |
| Is the hard part partner/resource/commercial alignment? | Use Business Cooperation Mode |
| Does the user ask for a complete PRD, or is the scope cross-functional/high-risk? | Use Complete PRD Mode |

Do not expose this mode-selection table in the clean PRD unless the user asks for the reasoning.

## Product Object Coverage Matrix

Use this as the first alignment layer against strong reference PRDs. A strong PRD may mention items the user did not name because the product object naturally requires them. Do not copy everything into the final output; use the matrix to identify likely blind spots.

| Product Object | Must Usually Cover | Often Compress / Skip |
|---|---|---|
| C-side/user-facing experience | Target user, entry, scenario, current pain, page states, interaction, copy, empty/error/success states, user perception, metrics, rollout or observation, rollback if risky | Internal implementation fields, long partner coordination, heavy experiment if low-risk |
| Backend/admin tool | Operator role, permission, list/detail/form fields, search/filter/batch operation, state machine, audit/history, failure handling, rollback, test cases | Marketing copy, C-side user stories, visual polish unless operator UI matters |
| Strategy / rule / classification | Trigger, input dimensions, classification taxonomy, rule priority, conflict handling, output, fallback, examples, monitoring metrics, guardrail metrics | Page layout details unless configuration UI is required |
| AI capability / content pipeline | Use scenario, input context, output format, quality bar, review states, failure fallback, unsafe/low-confidence handling, human intervention, feedback loop, evaluation metrics | Full frontend copy unless surfaced to users; causal experiment language unless true attribution exists |
| Experiment / gray release | Hypothesis, population, groups, split ratio, metrics, period, success threshold, stop/rollback condition, post-launch decision | Heavy page details if UI is unchanged |
| Data / dashboard / report | Decision scenario, metric definition, dimensions, filters, data source, event trigger, field meaning, privacy risk, refresh cadence, anomaly handling, action after reading | User-facing interaction unless dashboard is the product |
| Flow / state transition | Entry, precondition, main path, branches, state before/after, exception path, final state, diagram/image, test scenarios | Long background if the flow problem is already known |
| Business cooperation / resource | Stakeholders, resource input, business goal, product surface, settlement/permission/data boundaries, risk, owners, timeline | Deep algorithm details unless core to delivery |

Coverage rule:

- If a reference PRD includes a coverage item that this matrix marks as "must usually cover", add it unless the current request explicitly excludes it.
- If the item is useful but too heavy for the user's WeCom daily format, translate it into a concise row, subpoint, or `待确认事项` instead of adding a new chapter.
- If the item is not relevant, explicitly compress it into non-scope only when reviewers might otherwise ask about it.

## Always Keep

- State the user/business problem before the solution.
- Mark missing facts as `待补充` or `基于当前信息推断`; do not invent baselines, dates, owners, thresholds, or technical constraints.
- Put unresolved issues at the end in `待确认事项 / 信息缺口`: `问题 | 影响 | 建议确认对象`.
- Write functional requirements as concrete behavior: trigger, system action, user/operation perception, fallback, priority.
- Explicitly say what is unchanged or out of scope when that prevents review drift.

## Mode 1: WeCom Daily Mode

Use for small or familiar `[PRD][日常迭代]` documents, especially when content will be pasted into an existing Tencent Docs/WeCom template.

Include:

- `一、需求概述`: background, measurement goal, requirement list, expected launch time if known.
- `二、详细需求`: `模块 | 详细需求[优先级] | demo示意`.
- Compact Before/After text or a real diagram/image in `demo示意` when useful.

Usually skip or compress:

- Full user story chapter.
- Long gray release plan.
- Separate copywriting, data, and test chapters unless directly relevant.

## Mode 2: Strategy / Rule Mode

Use when the PRD changes decision logic such as content matching, image selection, recommendation, traffic routing, whitelist/blacklist, threshold, ranking, fallback, or feature-switch rules.

Recommended sections:

| Section | What To Write |
|---|---|
| 背景与问题 | Why the existing rule is insufficient and where it appears |
| 策略目标 | What decision should become better and how to judge it |
| 生效范围 | User/book/content/channel/app/version scope |
| 策略规则 | Trigger, input, rule, priority, output, fallback |
| 示例 | 2-3 concrete cases, including missing or conflicting data |
| 数据观察 | Metrics and guardrails that prove the rule is working |
| 待确认事项 | Thresholds, owners, rollout, and dependency gaps |

Avoid a page-heavy template unless UI or backend configuration is part of the change.

## Mode 3: AI Capability Mode

Use when the PRD involves model output, AI generation, AI review, prompt/input/output handling, content quality, human review, or AI pipeline orchestration.

Recommended sections:

| Section | What To Write |
|---|---|
| 使用场景 | Who uses the AI result and what decision/action it supports |
| 输入与上下文 | Required input, optional input, missing-input fallback, privacy/compliance notes |
| 输出要求 | Output type, format, quality bar, prohibited output, explainability if needed |
| 流程与状态 | Generate/retry/review/pass/fail/edit/publish states |
| 质量评估 | Human review rules, sampling, pass rate, risk examples |
| 失败兜底 | Model failure, timeout, low confidence, unsafe content, degraded display |
| 数据与回溯 | Events, quality labels, feedback loop, post-launch review |

For the user's current AI/content workflows, prefer behavior-proxy framing unless attribution or experiment fields are present. Do not overclaim causality.

## Mode 4: Experiment / Observation Mode

Use when validation is truly needed. First judge whether an experiment is necessary based on impact, uncertainty, reversibility, workload, and risk.

If an experiment is needed, include:

| Field | Required Content |
|---|---|
| Hypothesis | What change is expected and why |
| Population | Who/content enters the experiment |
| Groups | Control, treatment, split ratio |
| Metrics | Result, process, and guardrail metrics |
| Period | Observation window |
| Decision Rule | Expand, rollback, iterate, or stop conditions |

If not needed, write a short observation plan and explain why normal launch observation is enough.

## Mode 5: Data / Dashboard Mode

Use when the requirement is mainly about metrics, events, dashboards, reports, or decision-support data.

Recommended sections:

| Section | What To Write |
|---|---|
| 决策场景 | What question the data answers and who uses it |
| 指标口径 | Metric name, formula, dimensions, filters, refresh frequency |
| 埋点事件 | Event, trigger, fields, field meaning, privacy risk |
| 看板/报表 | Layout, filters, update cadence, owner |
| 异常处理 | Missing, delayed, duplicate, abnormal, permission-limited data |
| 复盘动作 | What product/ops action follows from each result |

Do not stop at "看数据"; connect each metric to a decision.

## Mode 6: Flow / State Mode

Use when the requirement changes a path, jump, approval, review, unlock, payment, generation pipeline, or state transition.

Recommended sections:

- Current flow and target flow.
- Entry, preconditions, main path, branches, exception path, final state.
- Before/After process in text, XMind, Mermaid, or image form depending on the target document.
- State table when engineering needs exact transitions.

For PRD delivery, use the real diagram/image when the user asks for a diagram artifact; do not flatten it into prose.

## Mode 7: Business Cooperation Mode

Use for partner/resource/commercial requirements.

Recommended sections:

- Cooperation background and stakeholders.
- Business goal and resource input.
- Product surfaces or operational process affected.
- Measurement and settlement/permission/data boundaries if relevant.
- Risks: content, compliance, revenue, partner dependency, user experience.
- Coordination: product, ops, business, data, legal, tech owners.

## Mode 8: Complete PRD Mode

Use as a reference for full PRDs, not the default for every request.

Full-section reference:

1. 需求概述: name, type, priority, module, status, version, one-line summary.
2. 服务的用户是谁: target users, roles, scenarios.
3. 用户的问题是什么: current problem, scenario, impact, why existing solution is not enough.
4. 背景、现状、目标: background, current state, target, explicit non-scope.
5. 用户故事: role-goal-value stories.
6. 衡量目标: core, auxiliary, and guardrail metrics with current value, target value, definition, period.
7. 产品方案: scope, function list, page/interaction, business rules, permissions, edge cases.
8. 业务核心流程: staged process diagram or equivalent artifact.
9. 文案列表: default, empty, error, success copy when the user-facing surface changes.
10. 测试方案: core and exception scenarios.
11. 数据统计: data questions, events, dashboard.
12. 灰度发布计划: stages, scope, expansion condition, observation metrics, rollback condition.
13. 依赖、风险与上线说明: dependencies, risks, mitigation, owners.
14. 待确认事项 / 信息缺口: question, impact, suggested owner.

Compression rule:

- If a complete PRD is not required, keep only the sections tied to the selected mode.
- If the target is WeCom Daily Mode, translate the relevant complete-PRD thinking into the existing WeCom tables rather than pasting all 14 chapters.
- If a section has no bearing on the current requirement, omit it or write one compact line in non-scope/待确认.

## Internal Quality Check

Before final delivery, verify silently:

- User/problem/scope are concrete.
- Metrics have definition, baseline/current value if known, target if known, and observation period when relevant.
- Requirement rows include trigger, system action, user/operation perception, fallback, and priority when applicable.
- Strategy and AI requirements include examples or quality criteria when ambiguity would block engineering.
- Testing covers normal and exception paths.
- Data work includes events and decision use, not just a dashboard name.
- Gray release and experiment are included only when they are necessary; otherwise state why they are not needed.
- Open questions are centralized at the end.
