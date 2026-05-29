# PRD Review Rubric

Score each dimension 1-5. Use evidence from the PRD; do not reward intent that is not written.

| Dimension | 1 | 3 | 5 |
|---|---|---|---|
| Business hypothesis | Only says what to build | Explains business/user problem | States why now, baseline, expected value, and priority logic |
| Problem definition | Feature request only | Pain point is understandable | Problem, affected users, current path, and cost are explicit |
| Goal metrics | Metrics missing or generic | Has basic indicators | Has result, process, and risk metrics with thresholds |
| Necessity/workload judgment | Treats all sections as mandatory | Roughly marks needed/not needed | Explains whether gray release, experiment, data, training, and review are necessary based on impact, risk, workload, and reversibility |
| Experiment design | No experiment thinking | Has observation plan when needed | If necessary, has hypothesis, variables, groups, period, thresholds, and next actions; if unnecessary, clearly explains why observation is enough |
| Product-object coverage | Uses one generic PRD shape | Covers some items required by the product object | Chooses required coverage by object: C-side experience, backend/admin, strategy/classification, AI capability, experiment, data/dashboard, flow/state, or business cooperation |
| Expression-pattern fit | Forces one template everywhere | Uses a mostly suitable structure | Chooses the structure by demand type: page/config, strategy, experiment, data, flow, cooperation, or lightweight iteration |
| Requirement clarity | Scattered list | P0/P1 table usable | Gives the right implementation details for the chosen pattern; for pages/configs, includes display elements, interactions, strategy rules, fallback logic, and acceptance criteria |
| Data instrumentation | Says "need/no need" | Lists events or dashboards | Connects events to decisions and post-launch analysis |
| Launch plan | Date only | Has rough release plan | Has gray release, rollback, dependencies, owners, and communication |
| Review loop | Absent | Mentions observation | Defines 7/14/30-day review questions and decision rules |
| Format fit | Ignores the target document format | Mostly follows the user's PRD sections | Matches the user's WeCom table columns, `i. / A.B.C.` hierarchy, demo placement, and explicit non-scope constraints |

## Coaching Output Pattern

For each PRD or PRD set:

1. Give one sentence judgment.
2. List 3 strengths with evidence.
3. List 3 highest-leverage improvements.
4. Provide one rewrite example or template section.
5. State the next PRD habit to practice.
6. If the PRD is for WeCom delivery, check whether the output can be pasted into the target table/cell without extra cleanup.

## Strong Rewrite Prompts

- "把这段背景改成商业假设：当前基线是什么，为什么现在做，做成后影响哪个指标。"
- "把这些指标改成决策指标：每个指标变化后下一步动作是什么。"
- "把需求列表补成后台工具状态机：权限、空态、失败态、批量操作、历史记录、回滚。"
- "先判断是否真的需要灰度/实验：看影响面、风险、工作量、是否可回滚；不需要就写清楚“不做实验，只做上线观测”的理由。"
- "把给开发看的需求改成页面级描述：这个页面展示什么元素，用户怎么操作，系统按什么策略处理，异常时怎么兜底。"
