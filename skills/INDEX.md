# Skills Index

User-level Codex skills synced from this Mac.

## Included

- `prd-coach/`: PRD writing, review, comparison, scoring, and coaching workflow.
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
- The nested `zide-shared-library/references/wkday1` copy is intentionally excluded to avoid recursively embedding this repository inside itself.
