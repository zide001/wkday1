# AE-Vela Completion Checks For This Mac

Date: 2026-05-29

## Rule

Flow is always `Full`. What changes is display weight:

- `silent`: keep the loop internal and answer directly.
- `compact`: name Object + Check, then work.
- `expanded`: keep visible state, handoff, evidence, check, and curation.

This file replaces "gate" language with local completion checks. Do not ask the
user to choose a mode.

## Object Checks

| Object | Use Expanded Display When | Completion Check |
|---|---|---|
| PRD | The task spans WeCom, TAPD, report, experiment, owner/risk, or launch plan | Source and target format are known; scope, acceptance, owner/risk, metrics or review loop are checked; final text has no assistant traces |
| WeCom/Tencent Docs | A live doc/table/template is edited, copied, pasted, or published | Visible document title and target section/cell are proved before edit; visible result is checked after edit; stop if the page is blank, wrong, or ambiguous |
| TAPD / send / publish | Anything will be saved, submitted, sent, pushed, or made visible to others | Payload/destination fields are previewed; user confirms the external action; final state or returned link/status is captured |
| Report / ABTest | Data is compared, interpreted, sent, or used for a decision | Data date, denominator, comparison window, source/export, and anomaly notes are checked; output file or summary is inspected before send |
| Automation / monitor | A schedule, login, rerun, webhook, or delivery channel is involved | Config, schedule, latest logs, latest artifact, and send channel are inspected before rerun or delivery; no blind rerun unless asked |
| Prototype / frontend / activity | UI, poster, local page, deployment, admin, D1, or public link changes | Local page/artifact opens; key flow or screenshot proves the change; public/deploy action waits for confirmation |
| Diagram / XMind | The output should be edited, reused, or pasted into PRD/docs | Editable artifact exists; preview is readable; structure has main path, branches, and labels that match source material |
| Code | Repo files, scripts, dependencies, tests, or runtime behavior change | Current repo state is observed; relevant test/build/lint/runtime check passes or skipped risk is explicit; unrelated user changes are preserved |
| Skill / workflow | A reusable rule, prompt, workflow, or local skill is changed | Owner is narrow; duplicate rules are avoided; index/search can find the new rule; verifier or targeted `rg` proves wiring |

## Default Closeout

Use this short shape for meaningful work:

```text
Changed:
- ...

Verified:
- ...

Risk / not done:
- ...

Curated:
- none | path
```

## When To Write Back

Write back only if the task produces a reusable, verified, action-changing
lesson. Otherwise record `Curated: none` and keep moving.
