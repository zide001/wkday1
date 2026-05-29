# Skills Index

User-level Codex skills synced from this Mac.

## Registry

- `REGISTRY.md`：全库 skill 地图、成熟度标准、默认升级循环和下一步整理顺序。

## Included

- `skill-evolution-framework/`: Meta workflow for evolving local skills with object coverage, blind-spot maps, and verification.
- `harness-engineering/`: Observe/harness/patch/verify/handoff guardrail for local engineering and operational work.
- `mindmap-designer/`: Structured-language-first XMind and mind-map generation workflow.
- `prd-coach/`: PRD writing, review, comparison, scoring, and coaching workflow.
- `qidian-character-activity/`: Qidian/IP character quiz and small campaign activity build/deploy workflow.
- `tapd-prd-draft/`: TAPD requirement creation from WeCom/Tencent Docs PRDs.
- `wecom-doc-editor/`: Safe 企业微信文档 PRD editing, UI operation learning, table/cell paste verification, and continuous skill improvement.
- `wedata-abtest-daily-report/`: WorkBuddy/Wedata ABTest crawler and daily report workflow.
- `zide-shared-library/`: Local skill entrypoint for reading and syncing this shared library.

## Restore On Another Mac

Copy a skill folder into the Codex skills directory:

```bash
cp -R skills/<skill-name> ~/.codex/skills/
```

Restart Codex after installing or updating skills.

## Notes

- Built-in `.system` skills are not mirrored here.
- Chronicle screen-history skill is intentionally not mirrored here by default because it is machine/privacy-context specific.
- The nested `zide-shared-library/references/wkday1` copy is intentionally excluded to avoid recursively embedding this repository inside itself.
