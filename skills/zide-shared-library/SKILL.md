---
name: zide-shared-library
description: Read and use the user's zide001 GitHub/Codex shared library. Use when the user mentions githubzide001, zide001, wkday1, wkday001, GitHub skills, shared Codex materials, long-term knowledge, personal preferences, prompts, workflows, project background, reusable templates, git push/upload to the shared library, or asks Codex to recall/use material stored in their GitHub/shared library.
---

# Zide Shared Library

Use this skill to access the user's shared Codex knowledge base cloned from:

- Remote: `https://github.com/zide001/wkday1.git`
- Local skill copy: `/Users/yangzide/.codex/skills/zide-shared-library/references/wkday1`

## Workflow

1. Treat the local skill copy as the canonical local source for this skill.
2. If the user asks for the latest GitHub content, or if freshness matters, run:

   ```bash
   git -C /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1 pull --rebase
   ```

3. Start with `README.md` and the relevant `*/INDEX.md` files. Do not load the whole repository into context unless it is tiny and directly relevant.
4. Use `rg --files` to discover available materials, then read only the files needed for the task.
5. If the requested information is not present, say that the library does not currently contain it and ask the user where they want it stored.

## Upload And Push Workflow

Use `/Users/yangzide/.codex/skills/zide-shared-library/references/wkday1` for future `wkday1`/`wkday001` uploads and Git pushes.

1. Pull first:

   ```bash
   git -C /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1 pull --rebase
   ```

2. Add or update files under the appropriate directory.
3. Review `git status --short` and avoid committing unrelated or sensitive files.
4. Commit with a concise message.
5. Push from that same directory:

   ```bash
   git -C /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1 push
   ```

## Repository Map

- `knowledge/`: long-term knowledge, personal preferences, account context without secrets, project indexes, decisions.
- `prompts/`: reusable prompts, role setups, task templates.
- `workflows/`: repeatable procedures such as syncing, publishing, ingesting materials, or project setup.
- `projects/`: project-specific briefs, assets, decisions, and task files.
- `materials/`: images, documents, references, datasets, and other source materials.
- `inbox/`: temporary material awaiting organization.
- `scripts/`: helper scripts owned by the shared library.

## Rules

- Never ask the user for passwords, tokens, or secrets in chat.
- Do not commit sensitive credentials into this repository.
- When adding or organizing materials, preserve the existing directory purpose and prefer concise Markdown index files.
- For sync requests, use normal Git commands from the local skill copy and report the outcome clearly.
