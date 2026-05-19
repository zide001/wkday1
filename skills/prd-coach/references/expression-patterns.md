# PRD Expression Patterns

Use this file when writing or rewriting PRD requirements. Do not force one structure onto every demand. First identify the demand type, then choose the lightest structure that helps engineering, design, data, QA, and business readers understand what to do.

## Selection Rule

Ask three questions before choosing a pattern:

1. What is the object being changed: page, backend config, strategy, data, flow, experiment, or business cooperation?
2. Who needs to act from this PRD: developer, designer, data analyst, QA, operations, business owner?
3. What would they otherwise need to ask in review?

## Pattern Library

### 1. Page / Backend / Configuration Requirement

Use when the demand changes a page, list, form, backend tool, configuration item, permission, or admin operation.

Recommended structure:

| Field | Meaning |
|---|---|
| Page/Module | Where the change happens |
| Display Elements | What fields, controls, statuses, buttons, and columns are shown |
| Interaction | What the user can click, input, save, edit, delete, filter, search, or switch |
| Strategy/Rules | Validation, permission, default value, state transition, deduplication, sorting, priority |
| Fallback Logic | Empty state, error state, no-permission state, save failure, async failure, rollback |
| Acceptance Criteria | How engineering/QA knows it is done |

Good for:

- Admin list
- Add/edit form
- Configuration backend
- Permission or operation control
- Batch operation

Avoid using it when the core problem is an experiment, content strategy, business partnership, or pure data definition.

### 2. Strategy / Algorithm / Rule Requirement

Use when the demand changes decision logic rather than a page.

Recommended structure:

| Field | Meaning |
|---|---|
| Trigger | When the strategy runs |
| Input | What data/attributes enter the strategy |
| Rule | How the system decides |
| Priority | How conflicts are resolved |
| Output | What result the system produces |
| Fallback | What happens when data is missing, invalid, delayed, or conflicting |
| Examples | 2-3 concrete cases |

Good for:

- Recommendation rules
- Content selection
- Pricing / ad / routing rules
- Blacklist or whitelist policy
- Feature switch strategy

### 3. Experiment Requirement

Use only when the demand truly needs experimental validation. Do not add experiments by default.

First write a necessity judgment:

| Question | Decision |
|---|---|
| Does this directly affect user experience, traffic allocation, revenue strategy, or content consumption? |  |
| Is there uncertainty that cannot be resolved by normal online observation? |  |
| Is the expected value worth data, development, and operations cost? |  |

If needed, use:

| Field | Meaning |
|---|---|
| Hypothesis | What you expect to happen |
| Variable | What changes between groups |
| Audience/Sample | Which users/books/channels enter |
| Groups | Control and experiment groups |
| Metrics | Result, process, and risk metrics |
| Observation Period | How long to watch |
| Decision Rule | Continue, expand, rollback, or iterate conditions |

If not needed, state why online observation is enough.

### 4. Data / Dashboard / Metrics Requirement

Use when the demand builds a dashboard, metric table, data event, or data product.

Recommended structure:

| Field | Meaning |
|---|---|
| Decision Scenario | What decision this data supports |
| Metric | Name of the metric |
| Definition | Formula and口径 |
| Dimensions | Book, channel, app, user type, date, experiment group, etc. |
| Filters | Query conditions |
| Update Frequency | Realtime, T+1, hourly, manual |
| Data Source | Event, table, API, offline import |
| Exception Handling | Missing data, delayed data, duplicate data, abnormal values |

Do not stop at "build a dashboard"; explain what product action the dashboard enables.

### 5. Flow / Link / State Transition Requirement

Use when the demand changes a user path, cross-page jump, multi-step flow, or state machine.

Recommended structure:

| Field | Meaning |
|---|---|
| Entry | Where the flow starts |
| Precondition | What must be true before entry |
| Main Path | Normal step-by-step path |
| State Transition | State before/after each step |
| Branches | Alternative paths |
| Exception Path | Failure, timeout, invalid state, permission failure |
| Final State | What must be recorded or displayed |

Good for:

- Jump links
- Payment/read/unlock path
- Book-to-book transition
- Review/approval flow

### 6. Business Cooperation / Resource / Commercial Requirement

Use when the demand is driven by a cooperation project, resource placement, revenue sharing, content introduction, or partner requirement.

Recommended structure:

| Field | Meaning |
|---|---|
| Cooperation Background | Who is involved and why now |
| Business Goal | Revenue, exposure, retention, conversion, cost, supply, or strategic value |
| Resource/Input | Content, traffic, partner capability, placement, API |
| Product Scope | Which product surfaces change |
| Measurement | How success is judged |
| Risk | Content, compliance, revenue, partner dependency, user experience |
| Coordination | Product, ops, business, data, legal, tech owners |

This style is useful for learning PRDs that explain broader project context before feature details.

### 7. Lightweight Daily Iteration Requirement

Use for small, low-risk, low-workload changes.

Recommended structure:

| Field | Meaning |
|---|---|
| Change | What changes |
| Scope | Where it changes |
| Rule | Key behavior |
| Acceptance | How to verify |
| Not Needed | Explicitly say no new data/experiment/training/gray release if unnecessary |

Keep it short. Do not inflate a small daily iteration into a heavy PRD.

## Anti-Patterns

- Do not add gray release or A/B experiment just because a template has that section.
- Do not write "新增页面" without fields, actions, rules, and failure states.
- Do not list metrics without explaining what decision they support.
- Do not write strategy rules only in prose when examples would remove ambiguity.
- Do not make every requirement a table if a short flow or rule block is clearer.

## Default Choice

When uncertain:

1. If engineering must build a page or backend operation, use Pattern 1.
2. If the hardest part is logic, use Pattern 2.
3. If the hardest part is proving value, use Pattern 3.
4. If the hardest part is measurement, use Pattern 4.
5. If the hardest part is path/state, use Pattern 5.
6. If the hardest part is business alignment, use Pattern 6.
7. If it is a small iteration, use Pattern 7.
