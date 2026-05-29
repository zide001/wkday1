# Knowledge Update Workflow

Use this workflow when a Codex conversation creates information that should be remembered beyond the current chat.

## What To Save

Save:

- Stable user preferences.
- Project background or decisions.
- Repeatable workflows.
- Repository paths, tool setup, and local environment facts.
- Concise session summaries that explain what changed and how to use it later.

Do not save:

- Passwords, tokens, cookies, webhook URLs, API keys, private keys, or other secrets.
- Full raw chat transcripts.
- Temporary debugging noise.
- Personal data that is not needed for future work.

## Update Process

1. Pull latest:

   ```bash
   cd /Users/yangzide/.codex/skills/zide-shared-library/references/wkday1
   git pull --rebase
   ```

2. Choose the target:

   - `knowledge/profile.md` for stable user preferences and working style.
   - `knowledge/codex-operations.md` for local setup, repo paths, GitHub, and skill sync facts.
   - `knowledge/decisions.md` for durable decisions.
   - `knowledge/session-notes/YYYY-MM-DD-topic.md` for concise conversation summaries.

3. Write summaries as facts, decisions, and future-use instructions. Avoid raw chat logs.
4. Review for secrets:

   ```bash
   rg -n -i "(password|passwd|secret|token|api[_-]?key|apikey|private key|BEGIN RSA|BEGIN OPENSSH|webhook|密钥|密码|令牌)" knowledge workflows skills README.md
   ```

5. Commit and push:

   ```bash
   git status --short
   git add <reviewed-knowledge-or-workflow-paths>
   git diff --cached --check
   git commit -m "Update Codex knowledge base"
   git push
   ```

## Default Rule

If the user says to automatically update memory, do not save every message. Save only durable summaries that would materially help a future Codex session.
