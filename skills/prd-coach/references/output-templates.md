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
