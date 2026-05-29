---
name: mindmap-designer
description: Create clear mind maps, XMind files, logic maps, workflow diagrams, and structured thinking diagrams from rough ideas. Use when the user asks to turn oral notes, PRD flows, process systems, evaluation loops, strategy trees, or messy concepts into a readable editable mind map or XMind artifact.
---

# Mindmap Designer

Use this skill when the user asks for a mind map, XMind file, logic map,
workflow diagram, structured thinking diagram, or asks to turn rough ideas into
a shareable thinking structure.

## Core Principle

Do not convert the user's words directly into a fully expanded mind map.

Use strong diagrams and prior successful maps as blind-spot maps. If a reference diagram contains audience, decision logic, feedback, ownership, or artifact layers that the user's rough notes omit, decide whether those layers are required for the current map object before drawing.

Always add one thinking layer before drawing:

1. Clarify the communication goal.
2. Rewrite the user's rough language into structured language.
3. Decide the clearest display structure.
4. Generate the mind map.
5. Open or verify the result in XMind when practical.

The user's preference is: make the map clear and comfortable to read, not
maximally complete on one canvas.

When a map is one artifact inside broader daily work, use `workflows/agentic-engineering/daily-work-iteration-protocol.md` as the outer frame: all map work uses Full flow, with silent or compact display for quick outlines and expanded display for editable XMind files, PRD diagram artifacts, or cross-skill process maps; finish with a diagram artifact completion check.

## Map Object Coverage

Choose the map object before choosing the layout.

| Map Object | Must Usually Cover | Compress / Skip | Verification |
|---|---|---|---|
| Concept explanation | Core concept, audience question, 3-5 main branches, examples, boundaries | Execution owners and detailed states unless needed | First canvas readable at a glance |
| Process / workflow | Input, steps, decision points, handoff, output, failure or rollback path | Full background prose | Main path and branch path are visually distinct |
| Decision tree / strategy | Trigger, classification dimensions, rule priority, examples, fallback | Decorative branches | Ambiguous cases have a place in the tree |
| Feedback loop | Production chain, evaluation chain, feedback signal, updated mechanism | One-way linear map | Relationship lines or explicit loop nodes exist |
| PRD diagram artifact | PRD section target, reviewer takeaway, before/after, changed/unchanged scope | Oversized all-in-one canvas | Diagram can be inserted into a PRD as-is |
| Execution roadmap | Milestones, owner, input/output, dependency, risk, checkpoint | Decorative styling | Each phase has a usable next action |

If a required item is missing from the user's input, add it as `待确认` or a visibly separate TODO branch instead of silently dropping it.

## Workflow

### 1. Understand The Intent

Identify what the map is for:

- External explanation: keep the first page clean and high-level.
- Internal execution: include input, process, output, and ownership.
- Review or evaluation: separate the decision tree from the production flow.
- Iteration loop: show where feedback returns into earlier mechanisms.

If the user gives rough oral notes, preserve their business terms but improve
the structure and wording.

### 2. Structure The Language First

Before making the XMind, write a short structured outline.

Preferred shape:

- Main process
- Subprocesses
- Decision points
- Feedback loops
- Assets or repositories that need to be maintained separately

Do not skip this step when the user's input is exploratory or messy.

### 3. Design The Display

Choose the map layout before generating nodes.

Good defaults:

- For a closed-loop system, put the production chain on one side and the
  evaluation or learning chain on the other side.
- For complex workflows, use progressive disclosure: overview first, detailed
  sheets or branches later.
- For decision rules, use a dedicated branch or sheet instead of mixing them
  into the production flow.
- For feedback loops, draw explicit relationship lines back to the mechanisms
  they update.

Avoid:

- Expanding every detail on the first canvas.
- Treating all nodes as equal importance.
- Making the evaluation tree visually dominate the main workflow unless that is
  the actual goal.

### 4. Visual Encoding

Use simple visual grouping:

- Production/process chain: blue.
- Review/evaluation chain: orange.
- Bridge or execution craft: green.
- Failure or risk: red.
- Feedback loops: dashed relationship lines.

Use bold or stronger styling for:

- Main process groups.
- Decision roots.
- Mechanisms that should be maintained as reusable assets.

### 5. XMind Output

When creating `.xmind` files directly:

- Prefer a valid XMind zip package with `content.json`, `metadata.json`, and
  `manifest.json`.
- Add relationship lines for feedback loops when the logic requires it.
- Preserve an editable source outline or generation script when useful.
- Open the file in XMind after generation and inspect the real visual result.

If XMind shows onboarding or paywall dialogs, close or skip them before
checking the canvas.

## Curator Closeout

After a map task, write back only reusable structure lessons.

- Add a rule here when a display pattern, object type, or verification step should change future maps.
- Put project-specific map content under `projects/` or the current workspace, not in the skill.
- Use `workflows/` when the map represents a repeatable cross-skill process.
- Do not add every generated map as an example; keep only patterns that prevent future layout or reasoning mistakes.

## Example Pattern

For the user's 拼书 A/B workflow, the clearest structure was:

- Center: `拼书 A/B 闭环`
- One side: `1-4：生产链路`
  - `A书库 / B书库`
  - `匹配`
  - `撰写过桥`
  - `进入 AB书库`
- Other side: `5-6：评判沉淀`
  - `评判`
  - `结果反哺`
- Feedback relationships:
  - `结果反哺 -> 匹配`
  - `结果反哺 -> 撰写过桥`

This is better than putting all nodes into one flat, fully expanded diagram.
