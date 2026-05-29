---
name: zide-shared-library
description: Read and use the user's zide001 GitHub/Codex shared library. Use when the user mentions githubzide001, zide001, wkday1, wkday001, GitHub skills, shared Codex materials, personal knowledge base, long-term memory, conversation summaries, long-term knowledge, personal preferences, prompts, workflows, project background, reusable templates, git push/upload to the shared library, or asks Codex to recall/use/update material stored in their GitHub/shared library.
---

# Zide Shared Library

Use this skill to access the user's shared Codex knowledge base cloned from:

- Remote: `https://github.com/zide001/wkday1.git`
- Local skill copy: `/Users/yangzide/.codex/skills/zide-shared-library/references/wkday1`

## Core Principle

Treat the shared library as a durable operating system for the user's Codex work, not a dumping ground. Strong prior library entries are blind-spot maps: if a reusable workflow needed role setup, source paths, project context, prompt templates, decision notes, sync rules, or safety boundaries, future library updates should preserve that coverage.

Choose the knowledge object before reading or writing. Store the smallest durable artifact that will help a future agent act correctly.

## Library Object Coverage Matrix

| Library Object | Must Usually Cover | Compress / Skip | Verification |
|---|---|---|---|
| Stable preference/profile | Preference, context where it applies, exceptions, source confidence | Raw chat transcript | Relevant `knowledge/` file updated and concise |
| Prompt/template | Role, trigger, inputs, output shape, stop conditions, examples if useful | One-off conversation details | Indexed from `prompts/INDEX.md` when appropriate |
| Workflow/procedure | Preconditions, commands/tools, decision points, verification, rollback/stop rule | Long logs and private data | Stored under `workflows/` or skill reference with runnable commands |
| Project context | Project purpose, paths, artifacts, current state, next-use instructions | Full generated outputs unless needed | `projects/` entry or index points to artifacts |
| Session note | Durable facts, decisions, changed files, future retrieval keywords | Non-durable chatter | `knowledge/session-notes/` note is findable by topic |
| Material upload | Source, destination, title, sensitivity, index entry | Duplicate unorganized files | File exists under `materials/` or `inbox/` with index/update note |
| Skill/prompt evolution | Changed skill/prompt, reason, coverage added, validation result | Unverified lessons | Local skill/prompt file and library record both reflect the update if syncing |

## Workflow

1. Treat the local skill copy as the canonical local source for this skill.
2. If the user asks for the latest GitHub content, or if freshness matters, check the worktree first:

   ```bash
   git -C /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1 status --short
   ```

   Pull only when the worktree is clean or the user explicitly approves how to handle local changes:

   ```bash
   git -C /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1 pull --rebase
   ```

3. Start with `README.md` and the relevant `*/INDEX.md` files. Do not load the whole repository into context unless it is tiny and directly relevant.
4. Use `rg --files` to discover available materials, then read only the files needed for the task.
5. If the requested information is not present, say that the library does not currently contain it and ask the user where they want it stored.
6. For recurring daily-work improvements across multiple objects or skills, consult `workflows/agentic-engineering/daily-work-iteration-protocol.md` before creating new rules; it provides the user's Full-only daily flow with compressed display weight and state / handoff / check / curate loop.

## Knowledge Base Updates

Use `knowledge/` as the user's durable memory layer.

- Store stable preferences, account/repo context without secrets, repeatable decisions, project background, and concise conversation summaries.
- Do not dump raw chat logs. Summarize only durable facts, decisions, workflows, and next-use instructions.
- Update `knowledge/session-notes/` when a conversation creates useful future context.
- Update `knowledge/profile.md`, `knowledge/codex-operations.md`, or `knowledge/decisions.md` when a fact should be remembered across future Codex sessions.
- After updating the knowledge base, leave changes local unless the user explicitly asks to sync. Before any commit or push, review `git status --short`, stage only reviewed paths, run `git diff --cached --check`, and get confirmation for the external-visible action.

## Upload And Push Workflow

Use `/Users/yangzide/.codex/skills/zide-shared-library/references/wkday1` for future `wkday1`/`wkday001` uploads and Git pushes.

1. Check state first:

   ```bash
   git -C /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1 status --short
   ```

2. Pull only if the worktree is clean or the user explicitly approves how to handle local changes:

   ```bash
   git -C /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1 pull --rebase
   ```

3. Add or update files under the appropriate directory.
4. Review `git status --short` and avoid committing unrelated or sensitive files.
5. Stage only reviewed paths, then run:

   ```bash
   git -C /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1 diff --cached --check
   ```

6. Commit with a concise message only after the user approves the exact scope.
7. Push from that same directory only after confirmation:

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

## Skill Library Curation

When organizing or upgrading skills in this repository:

- Start from `skills/REGISTRY.md` and `workflows/agentic-engineering/skill-curation-protocol.md` when they exist.
- For broad daily-work behavior, route through `workflows/agentic-engineering/daily-work-iteration-protocol.md` first; only patch individual skills when the lesson has a narrow owner.
- Update indexes whenever adding a skill, prompt, workflow, reference, or material.
- Keep runtime skill files focused; put large examples, matrices, and runbooks under `references/` or `workflows/`.
- Mirror changes to the live local skill only when future Codex runs need the behavior immediately.
- Do not commit or push while unrelated local changes are present unless the user explicitly approves the exact commit scope.

## Rules

- Never ask the user for passwords, tokens, or secrets in chat.
- Do not commit sensitive credentials into this repository.
- When adding or organizing materials, preserve the existing directory purpose and prefer concise Markdown index files.
- For sync requests, use normal Git commands from the local skill copy and report the outcome clearly.
