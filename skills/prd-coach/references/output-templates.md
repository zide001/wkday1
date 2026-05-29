# Output Templates

## PRD Evolution Review

```markdown
# PRD Evolution Review

## One-Line Judgment

你的 PRD 能力正在从「」进化到「」。下一阶段最值得补的是「」。

## Timeline

| Stage | Time | Representative PRDs | Capability Signal | Blind Spot |
|---|---|---|---|---|
| 1 |  |  |  |  |
| 2 |  |  |  |  |
| 3 |  |  |  |  |

## Personal vs Learning PRDs

| Dimension | Personal Pattern | Learning Pattern | Gap | Next Action |
|---|---|---|---|---|
| Business context |  |  |  |  |
| Metrics |  |  |  |  |
| User journey |  |  |  |  |
| Experiment design |  |  |  |  |
| Launch/coordination |  |  |  |  |

## Next Iteration Backlog

| Priority | Improvement | How to Apply in Next PRD | Acceptance Standard |
|---|---|---|---|
| P0 |  |  |  |
| P1 |  |  |  |
| P2 |  |  |  |
```

## Next PRD Skeleton

```markdown
# [PRD] Title

作者：杨子德

## 0. Demand Type and Expression Pattern

- Demand type:
- Recommended expression pattern:
- Why this pattern:
- Sections intentionally not needed:

## 1. Business Hypothesis

- Current baseline:
- Why now:
- Expected change:
- What we will do if it succeeds/fails:

## 2. Problem and Scope

- User/business problem:
- Affected users/systems:
- In scope:
- Out of scope:

## 3. Goal Metrics

| Metric Type | Metric | Definition | Baseline | Target | Decision Rule |
|---|---|---|---:|---:|---|
| Result |  |  |  |  |  |
| Process |  |  |  |  |  |
| Risk |  |  |  |  |  |

## 4. User/Operation Flow

- Entry:
- Main path:
- Branches:
- Failure/empty states:

## 5. Requirements

Choose the requirement expression based on demand type. Do not force this table if another pattern is clearer.

| Priority | Page/Module | Display Elements | Interaction | Strategy/Rules | Fallback Logic | Acceptance Criteria |
|---|---|---|---|---|---|---|
| P0 |  |  |  |  |  |  |

## 6. Necessity and Workload Assessment

| Item | Needed? | Reason | Workload/Risk | Decision |
|---|---|---|---|---|
| Gray release |  |  |  |  |
| A/B experiment |  |  |  |  |
| Data tracking |  |  |  |  |
| Training/comms |  |  |  |  |
| Post-launch review |  |  |  |  |

## 7. Data and Experiment

- Hypothesis:
- Variable:
- Sample/grouping:
- Observation period:
- Success threshold:
- Stop/rollback condition:
- If no experiment is needed, explain why online observation is enough:

## 8. Launch and Coordination

- Gray scope:
- Rollback:
- Owners:
- Data review date:
- Post-launch decision:
```

## Clean PRD Delivery Rules

When producing a formal PRD document, remove coaching labels before delivery:

- Do not write "PRD Coach" in the PRD.
- Do not write "Codex" as updater or author.
- Do not expose internal section names like "Demand Type and Expression Pattern" unless the user wants a methodology version.
- Keep author as `杨子德`.
- Keep the user's familiar PRD structure; apply expression patterns inside the requirements text rather than turning every document into a new template.

## Adaptive PRD Delivery Modes

Before using a template, choose the lightest delivery mode that fits the demand. Read `adaptive-prd-delivery.md` for the detailed mode reference.

| Mode | Use When | Default Output Shape |
|---|---|---|
| WeCom Daily | Small daily iteration or Tencent Docs table fill | Familiar `一、需求概述` + `二、详细需求` |
| Strategy / Rule | Matching, ranking, routing, threshold, fallback, feature switch | Trigger, input, rule, priority, output, fallback, examples |
| AI Capability | AI generation/review/summary/pipeline/quality requirement | Scenario, input, output, flow/state, quality, fallback, data loop |
| Experiment / Observation | Value must be proven or rollout decision is uncertain | Necessity judgment, hypothesis, groups, metrics, period, decision rule |
| Data / Dashboard | Metrics, events, reports, dashboards | Decision scenario, metric definitions, events, dashboard, exception handling |
| Flow / State | Multi-step path, jump, review, unlock, pipeline, state machine | Current flow, target flow, branches, exception path, final state |
| Business Cooperation | Partner/resource/commercial coordination | Background, goal, resource, product scope, measurement, risk, owners |
| Complete PRD | User asks for full PRD or scope is cross-functional/high-risk | Full long-form PRD reference, compressed where irrelevant |

Do not output all modes. Use one primary mode and borrow only the relevant blocks from others.

## WeCom Daily PRD Format

Use this when the user asks for the familiar 企业微信 PRD style or when editing a WeCom PRD document.

### Word / Tencent Docs Style Tokens

When creating or exporting a Word/Tencent Docs-targeted PRD, follow the user's current reference style unless the source document already has stronger local formatting:

| Element | Font / Size | Weight | Notes |
|---|---:|---|---|
| Title | PingFang SC / 24pt | Bold | `[PRD][日常迭代] ...` title line |
| Level 1 heading | PingFang SC / 18pt | Bold | `一、需求概述`, `二、详细需求` |
| Level 2 heading | PingFang SC / 16pt | Bold | `需求背景`, `衡量目标` |
| Body text | PingFang SC / 11pt | Regular | Normal paragraphs and list content |
| Table text | PingFang SC / 11pt | Regular | Header row bold; body should not all be bold |
| Confidential / Author | PingFang SC / 12pt | Mixed | `[confidential]` label bold, author normal/bold per reference |

Table notes:

- Preserve targeted bold only for key reviewer information, such as P0 labels or the first definition line in `详细需求`; do not bold whole table bodies.
- In `详细需求`, use the first column as `子模块` when the rows map directly to the `需求列表` submodules.
- For a three-column `子模块 | 详细需求[优先级] | demo示意` table in landscape Word, keep the middle requirement column widest and the demo column compact.

```markdown
# [PRD][日常迭代] 标题

作者：杨子德

一、需求概述

需求背景
用 1-2 段说明当前问题、为什么要做、这次改动的范围。若用户说明“纯后端”“不涉及前端”“不写字段/prompt”，这里直接收敛范围。

衡量目标

| 指标名称 | 口径定义 | 目标变化 |
|---|---|---|
|  |  |  |

需求列表

| 序号 | 产品模块 | 子模块（如有） | 需求描述 | 优先级 |
|---:|---|---|---|---|
| 1 |  |  |  | P0 |

期望上线时间

| 日期 | 原因 |
|---|---|
|  |  |

二、详细需求

| 子模块 | 详细需求[优先级] | demo示意 |
|---|---|---|
|  | **子模块用于说明该能力的核心定位**<br/>1. 【P0】一句话说明系统要做什么。<br/>a. 规则一。<br/>b. 规则二。<br/>c. 不涉及/不改动范围。 | Before：...<br/><br/>After：... |

三、详细需求之后的固定尾部模块

四、数据埋点（不需要）

本次为明确规则/流程/配置调整，暂不新增数据埋点。

五、实验设计（不需要）

本次为明确规则调整，不涉及 A/B 实验。

六、发布计划（不需要）

按研发排期上线；如上线后发现相关规则或流程异常，可回滚至原有逻辑。

七、上线前后协同方动作（不需要）

无需额外运营、商务、客服、财税法协同动作；如当前需求涉及编辑、数据、研发等内部角色，应在此句中替换为对应协同方。

八、评审记录

| 日期 | 评审纪要 |
|---|---|
|  |  |

Q&A

| 问题 | 结论 |
|---|---|
|  |  |
```

Fixed-tail usage rule:

- These tail modules are fixed in formal WeCom/Word PRD deliverables. If a module is not needed, keep the module and write `（不需要）` in the heading.
- Tail-module body text must match the current demand object. Do not copy examples such as `首章图片默认展示规则` into unrelated PRDs.
- If data tracking, experiment design, launch plan, or coordination is needed, remove `（不需要）` and replace the one-line reason with the actual plan.

When the content will be pasted directly into WeCom, prefer plain text or existing table cells over Markdown tables if table rendering is risky.

## Backend Acceptance PRD Format

Use this when the requirement is mostly server-side and the reviewer needs to verify backend behavior, not frontend UI. Typical objects:名单导入、白名单/灰度名单、配置生效、用户命中、规则分流、图片/内容兜底、数据回收、测试验收.

Writing rules:

- Keep the background to 1-2 short paragraphs: why this backend capability is needed, who provides the input, and what the backend must guarantee.
- The top summary table should answer:交付目标、研发范围、实现方式、测试重点、数据回收.
- `本期范围` should list only deliverable backend/data/test items.
- `不做范围` should be short. Common rows:前端改造、后台管理页面、实验效果判断. Do not add long explanations for strategy platforms, real-time models, fields, or instrumentation unless they are likely review questions.
- Do not include `字段说明` unless the engineers must add a new API/database/event field and the user explicitly wants it.
- `详细需求` rows should map one-to-one to backend capabilities. Use `1. 【P0】...` plus `a. b. c.` subpoints.
- Every P0 backend row should include enough for QA: trigger/input, backend action, rule, fallback, and verification point.
- Put test acceptance in a standalone section when the demand is mainly backend behavior. Test should focus on命中、未命中、跨范围不误命中、分流稳定、兜底正确.

```markdown
# [PRD][策略实验] 标题

作者：杨子德

| 项目 | 本期口径 |
|---|---|
| 交付目标 | 支持**后端导入/读取名单、命中圈定用户、按规则下发策略结果**。 |
| 研发范围 | **纯后端需求**。前端不新增逻辑，不新增埋点。 |
| 实现方式 | 本期只做**后端配置/名单导入能力**，不建设后台管理页面。 |
| 测试重点 | 重点验证两件事：**用户是否命中**、**命中后策略分流是否正确**。 |
| 数据回收 | 产品/数据侧基于圈定名单，从大数据回收现有行为数据。 |

## 一、需求概述

### 需求背景

用 1-2 段说明：本期为什么需要后端圈定/配置能力、输入由谁提供、后端需要保证什么。

### 目标

一句话说明本期要验证或解决的问题。若只是后端能力建设，不展开模型分数、字段说明或策略理论。

### 本期范围

| 范围 | 说明 |
|---|---|
| 名单导入 | 后端支持导入/读取产品侧提供的名单。 |
| 用户命中 | 请求策略时，后端按约定主键判断是否命中。 |
| 规则分流 | 命中用户按稳定规则返回不同策略结果。 |
| 兜底逻辑 | 目标策略不可用时，按既有低风险结果兜底。 |
| 测试验收 | 验证命中、未命中、分流、兜底是否正确。 |

### 不做范围

| 不做项 | 说明 |
|---|---|
| 前端改造 | 本期不改前端逻辑，不新增前端埋点。 |
| 后台管理页面 | 本期只做后端配置/名单导入，不建设可视化后台。 |
| 实验效果判断 | 本 PRD 不判断实验结果，效果由数据回收后单独分析。 |

### 需求列表

| 序号 | 产品模块 | 子模块 | 需求描述 | 优先级 |
|---:|---|---|---|---|
| 1 | 服务端 | 名单导入 | 支持导入/读取产品侧提供的实验用户名单。 | P0 |
| 2 | 服务端 | 命中判断 | 用户请求策略时，按约定主键判断是否命中实验名单。 | P0 |
| 3 | 服务端 | 规则分流 | 命中用户按稳定规则返回不同策略结果。 | P0 |
| 4 | 服务端 | 兜底逻辑 | 目标结果不可用时，降级返回默认结果。 | P0 |
| 5 | 测试 | 验收验证 | 验证命中、未命中、分流、兜底逻辑是否符合预期。 | P0 |
| 6 | 数据 | 数据回收 | 基于圈定名单从大数据回收现有行为数据。 | P1 |

### 期望上线时间

| 日期 | 说明 |
|---|---|
| 待排期 | 依赖产品提供名单、后端完成导入和分流逻辑。 |

## 二、详细需求

| 子模块 | 详细需求[优先级] | demo示意 |
|---|---|---|
| 名单导入 | 1. 【P0】后端支持导入产品侧提供的实验用户名单。<br/>a. 名单最小粒度为约定主键。<br/>b. 不同业务范围下需要独立判断，不跨范围命中。<br/>c. 名单导入后，需要支持测试或后端查询导入结果。 | 输入：名单文件/配置。<br/><br/>导入后：后端可按名单判断命中。 |
| 命中判断 | 1. 【P0】用户请求策略时，后端判断是否命中本期实验名单。<br/>a. 命中：进入分流逻辑。<br/>b. 未命中：继续走现有策略。<br/>c. 测试需要能确认单个用户的命中结果。 | 名单内：命中实验。<br/><br/>名单外：不命中实验。 |
| 规则分流 | 1. 【P0】命中用户按稳定规则分流。<br/>a. 明确分流依据。<br/>b. 明确对照组和实验组返回结果。<br/>c. 同一用户多次请求结果必须保持一致。 | 对照：默认策略。<br/>实验：目标策略。 |
| 兜底逻辑 | 1. 【P0】目标结果不可用时，后端降级返回默认结果。<br/>a. 目标结果存在：按分流结果返回。<br/>b. 目标结果不存在：返回默认结果。<br/>c. 默认结果也不可用时，走现有线上兜底逻辑。 | 目标缺失 → 默认结果。 |

## 三、测试验收口径

| 测试场景 | 预期结果 |
|---|---|
| 导入名单内用户请求策略 | 命中实验，进入分流逻辑。 |
| 未导入名单用户请求策略 | 不命中实验，走现有策略。 |
| 同一用户更换业务范围请求 | 不应误命中原范围实验。 |
| 命中用户重复请求 | 分流结果保持一致。 |
| 目标结果不存在 | 返回默认结果。 |
| 默认结果也不存在 | 走现有默认兜底。 |

## 四、数据埋点（不需要）

本期**不新增前端埋点**，不新增埋点字段。数据回收由产品/数据侧基于圈定名单，从现有埋点中回收。

## 五、发布计划

| 阶段 | 动作 | 负责人 |
|---|---|---|
| 上线前 | 产品提供实验名单。 | 产品 |
| 上线前 | 后端完成名单导入、命中判断、规则分流和兜底逻辑。 | 后端 |
| 上线前 | 测试按“三、测试验收口径”完成验证。 | 测试 |
| 观测期 | 数据侧基于圈定名单回收实验数据。 | 数据/产品 |

## 六、上线前后协同方动作

| 协同方 | 上线前 | 上线后 |
|---|---|---|
| 产品 | 提供实验名单。 | 提供名单给数据侧做回收。 |
| 后端 | 完成导入、命中、分流、兜底逻辑。 | 支持命中和兜底问题排查。 |
| 测试 | 验证命中、未命中、分流和兜底。 | 回归线上关键 case。 |
| 数据 | 确认取数口径。 | 基于圈定名单回收数据。 |

## 七、评审记录

| 日期 | 评审纪要 |
|---|---|
| 待补充 | 待补充。 |

## Q&A

| 问题 | 结论 |
|---|---|
| 本期是否涉及前端开发？ | 不涉及。前端不新增逻辑，不新增埋点。 |
| 测试最重要验证什么？ | 验证用户是否命中，以及命中后返回的策略结果是否正确。 |
| 目标结果不存在怎么办？ | 直接降级返回默认结果。 |
| 数据如何回收？ | 产品/数据侧基于圈定名单，从大数据回收现有埋点数据。 |
```
