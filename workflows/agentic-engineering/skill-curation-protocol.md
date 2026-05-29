# Skill Curation Protocol

## Purpose

Use this protocol after meaningful Codex work to decide whether a lesson should become durable. It is the shared Curator rule for all user-level skills.

## Commander Mode

Codex acts as the Commander for routine curation. Do not interrupt the user with a popup or confirmation by default.

Internally check:

```text
Did this run reveal a reusable rule, template, failure mode, verification handle, or routing decision?
```

If no, do not write anything durable.

Surface the decision at three levels:

| Level | When | User-facing behavior |
|---|---|---|
| Silent no-op | No reusable lesson, or only a one-off observation | Say nothing about curation |
| Inline note | A narrow verified lesson was written to the owning skill/prompt/workflow | Mention it briefly in the final handoff |
| Explicit approval | Broad rule change, cross-skill rewrite, commit/push, external action, private content, or destructive/risky operation | Ask the user before acting |

The user should not have to manage routine upgrades manually. Commander owns the decision; the user owns approval for broad, external, or risky changes.

## Popup Timing Policy

The PRD Curator review window is for user judgment, not for every writeback.

Do not open the window when:

- There is no reusable lesson.
- The lesson is a one-off project fact.
- A narrow verified rule can be written to the owning skill/workflow with an inline final note.
- Commander can confidently skip the candidate.

Open the window only when at least one is true:

- The candidate would enter the PRD knowledge base as a reusable personal or learning PRD pattern.
- The candidate changes a default PRD method, rubric, template, or multi-role workflow rule.
- The candidate contains or depends on private document content, people data, business-sensitive detail, or a storage-boundary decision.
- The destination is ambiguous across `prd-coach`, `wecom-doc-editor`, `tapd-prd-draft`, `workflow`, `knowledge`, or `project`.
- The candidate is medium/high risk, conflicts with an existing rule, or failed one of the writeback gates.
- Several candidates have accumulated and batching them is less disruptive than repeated inline questions.
- The user explicitly asks to review, curate, approve, or organize PRD knowledge.

Timing:

- Prefer opening after PRD Reviewer finishes and before durable writeback.
- Do not interrupt Writer drafting, Formatter publishing, or live WeCom/TAPD editing unless the next action would store private content or change a broad rule.
- If the PRD task is still in progress, queue the candidate and surface it in the final handoff or the next dedicated curation pass.

## Curator Runtime Flow

Run this flow internally after meaningful work. It should feel like background quality control, not a separate user task.

| Step | Name | Action | Output |
|---|---|---|---|
| 0 | Listen | Watch for repeated friction, corrected assumptions, new verification handles, stable user preferences, useful templates, or routing mistakes | Candidate lesson or no-op |
| 1 | Normalize | Reduce the candidate to object, scene, evidence, future action, and owner | One concise candidate |
| 2 | Deduplicate | Search the target skill/workflow/prompt for an existing rule before writing | Reuse existing rule or continue |
| 3 | Gate | Apply the writeback gate below | Write / skip / ask |
| 4 | Route | Choose the narrowest durable destination | Skill, prompt, workflow, knowledge, project, material, or nowhere |
| 5 | Patch | Write the smallest operational rule, row, checklist item, or template update | Minimal diff |
| 6 | Verify | Check searchability, formatting, referenced paths, and whether the rule lands in the right owner | Verified writeback |
| 7 | Surface | Report only according to Commander mode | Silent no-op, inline note, or explicit approval request |

## Candidate Contract

Curator should reason in this shape, even when it does not show the user:

```yaml
source: current-run | repeated-run | user-preference | failure | external-reference
object: prd | wecom-doc | tapd | report | automation | diagram | activity | shared-library | other
lesson: ""
evidence: ""
future_action: ""
destination: skill | prompt | workflow | knowledge | project | material | nowhere
risk: low | medium | high
visibility: silent | inline-note | ask-user
```

Never store raw private document text, credentials, webhook URLs, cookies, or full logs as a curation candidate.

## Routing Table

| Lesson Type | Destination | Example |
|---|---|---|
| One skill prevents the same mistake next time | `skills/{skill}/SKILL.md` or `skills/{skill}/references/` | WeCom paste target proof, TAPD rich text verification |
| Cross-skill sequence or handoff | `workflows/` | PRD Writer -> Reviewer -> Formatter -> Curator |
| Reusable startup contract | `prompts/` | "Use PRD multi-role pipeline" prompt |
| Stable user preference or long-term decision | `knowledge/` | Default role-first work, concise meeting language |
| Project-specific fact or artifact | `projects/` | Active site path, rollback folder, deploy URL |
| Source material | `materials/` or `inbox/` | Shared zip, screenshot pack, reference PDF |
| Unverified observation | Nowhere durable, or a temporary project note | "Seems like this selector changed" |

## Writeback Gate

Write back only when at least two are true:

- The issue can recur.
- The behavior was verified in a real run.
- The lesson changes future action, not just wording.
- The destination skill already owns that object.
- The entry can be stated in one concise operational rule.

Stop and keep it out of durable skills when:

- It is private content from one document.
- It is a one-time workaround.
- It duplicates an existing rule.
- It would make a focused skill trigger too broadly.
- It was not verified and would be risky if treated as fact.

## Approval Triggers

Ask before acting when the writeback would:

- Change the default behavior of multiple skills.
- Create, delete, rename, or reorganize many files.
- Commit, push, publish, submit, send, or otherwise affect an external system.
- Store private document content, people data, business-sensitive details, or secrets.
- Convert an unverified inference into a durable rule.
- Override an existing user preference or established workflow.
- Require destructive or risky local operations.

Do not ask for routine narrow updates, such as adding a verified stop rule to the owning skill, adding a small object row, or updating an index for a newly created local workflow.

## PRD-Specific Curator Flow

For the default PRD multi-role pipeline:

1. Use Reviewer findings as the main signal.
2. If the same issue would recur in future PRDs, consider a `prd-coach` rule or rubric update.
3. If the issue is about publishing into WeCom or TAPD, route to `wecom-doc-editor` or `tapd-prd-draft` instead of `prd-coach`.
4. If the issue is about the Writer -> Reviewer -> Formatter handoff itself, route to `workflows/agentic-engineering/`.
5. If the final PRD simply had project-specific content, do not write it back.

## UI-Assisted Review Lane

Use a review interface when the user wants to personally judge curation candidates before they enter the durable PRD knowledge base.

Default local prototype:

```text
/Users/yangzide/Documents/Codex/2026-05-28/files-mentioned-by-the-user-0528/prd-curator-console/index.html
```

The interface should support:

- Historical PRD inventory from `_inbox`, personal PRDs, learning PRDs, and `_index`.
- Candidate lessons generated from Reviewer, Formatter, or Curator findings.
- Editable fields for object, destination, lesson, evidence, and future action.
- Gate checks for reusable, verified, action-changing, and owner-correct.
- User decisions: approve, approve after edit, or skip.
- Export as JSON/Markdown before any automated writeback.

Do not let the UI directly mutate source PRD files. Treat exported decisions as the approved input for a later writeback script.

## Whole-Library Closeout

For skill-upgrade tasks, report:

```text
Changed:
- Skill files:
- Prompt/workflow/knowledge files:

Coverage added:
- Object/mode:
- Verification:
- Curator/writeback:

Verified:
- Search:
- Diff/format:
- Referenced files:

Not done:
- Deferred skills:
- Reason:
```

## Maintenance Rhythm

- After a single task: write back only narrow verified rules.
- After several related tasks: update the skill coverage matrix or reference checklist.
- After a new family of work emerges: create a workflow first, then decide whether a new skill is justified.
- After repeated cross-role handoffs: add or update a prompt template.
