---
name: wecom-doc-editor
description: Safely edit Tencent WeCom/企业微信 docs through the desktop UI, especially PRD documents, table cells, demo示意 columns, Before/After process text, and small copy edits. Use when the user asks Codex to operate an already-open 企业微信文档, paste content into a Tencent Docs/WeCom document, update a PRD table, or learn from WeCom document editing behavior. For PRD writing or PRD-format edits, use with prd-coach first to match the user's PRD structure before editing WeCom.
---

# WeCom Doc Editor

## Overview

Use this skill for live 企业微信文档 editing. Treat it as a fragile UI workflow: first prove the target document is correct, then edit only the requested location, then verify the result landed in the right place.

This skill should improve over time. When a live 企业微信 editing session reveals a durable behavior, paste quirk, table-handling rule, or PRD-format convention, fold the lesson back into this file if it would prevent future mistakes or speed up repeated PRD work.

## Operating Modes

1. **Observe**: learn the visible 企业微信文档 UI without editing.
   - Identify the document title, editing surface, table behavior, toolbar affordances, comments, outline, and current cursor/cell state.
   - Prefer hands-on UI observation through Computer Use when the user asks to "熟悉", "学习", "总结", or "掌握" 企业微信文档功能.
   - Use safe, reversible actions first: switch tabs, scroll, inspect outline, click into cells, read toolbar states, and verify cursor/cell focus.

2. **Draft**: shape PRD content before touching the document.
   - Use `prd-coach` for requirement logic, section structure, and wording.
   - Produce plain-text content that is safe to paste into 企业微信.

3. **Execute**: make the requested live edit.
   - Follow the required safety loop below.
   - Keep edits scoped to the confirmed location.

4. **Improve**: update this skill when the session produced reusable knowledge.
   - Add only durable, verified instructions.
   - Keep notes short and operational: trigger, preferred action, verification, failure handling.
   - Do not add one-off document details, private content, or bulky logs.

## Self-Operation Learning

When learning 企业微信文档 behavior, operate the UI directly where possible instead of relying only on verbal assumptions.

- First perform non-destructive exploration: confirm document identity, navigate sections, inspect table selection, test caret placement, and observe paste/read behavior only when safe.
- If a real edit is needed, require a confirmed target document and target location, then follow the execution safety loop.
- After operating, convert the verified lesson into a short rule only if it changes future behavior.
- Keep a short session note when the user asks to preserve the day's work or push it to the shared library.

## PRD Skill Pairing

For 企业微信 PRD documents, pair this skill with `prd-coach`.

1. Use `prd-coach` first when content or format needs product judgment.
   - Draft or rewrite PRD sections with the user's established format.
   - Match common PRD tables: `需求列表` and `详细需求`.
   - Preserve the user's preferred hierarchy: `i.` with `A. B. C.` subpoints.
   - Keep clean PRD body language without assistant traces.

2. Use this skill second for live document execution.
   - Paste the already-shaped PRD content into the correct 企业微信 document location.
   - Prefer short, cell-safe text for `demo示意`.
   - Verify the target title and target cell before and after editing.

This split reduces runtime: `prd-coach` handles format and wording; `wecom-doc-editor` handles safe UI editing.

## PRD Editing Capability Map

Use this map when the user asks to become better at PRD writing inside 企业微信文档:

- **Document structure**: titles, headings, section order, update records, anchors, and outline navigation.
- **Requirement tables**: `需求列表`, `详细需求`, priority/status columns, owner fields, acceptance criteria, and `demo示意`.
- **Process expression**: Before/After process text, step arrows, branch rules, fallback states, and compact demo-cell descriptions.
- **Review collaboration**: comments, suggestions, resolved/unresolved discussion state, and reviewer-visible wording.
- **Paste behavior**: plain text, multi-line cell paste, copied table fragments, accidental Markdown rendering, and cursor/cell focus.
- **Verification**: title match, target section match, target row/column match, inserted content visible, and no unintended neighboring-cell changes.

When observing or learning the UI, do not claim a capability is reliable until it has been visually verified in the current app/document state.

## Required Safety Loop

1. Confirm the requested document title before editing.
   - Use Computer Use `get_app_state` and the visible document/window title.
   - If the title is missing, search or switch tabs until the visible title matches the user's requested document.
   - Do not edit a similar document. Names like `文生图支持多图能力` and `文生图章节复核流程优化` are not interchangeable.

2. Confirm the edit target.
   - Locate the exact section, row, and column before pasting.
   - For PRDs, common anchors are `需求列表`, `流程图`, `详细需求`, `模块`, `详细需求[优先级]`, and `demo示意`.
   - If editing a table cell, click inside the target cell and verify the caret appears in that cell before paste.

3. Edit only the requested content.
   - If the user says "不用对详细需求做改动", leave `详细需求[优先级]` unchanged.
   - If the user asks to put a process diagram into `demo示意`, paste only into the `demo示意` cell.
   - Do not use broad replace operations unless the user explicitly asks.

4. Verify after every paste.
   - Re-query or visually inspect the document after editing.
   - Confirm the visible title still matches the target document.
   - Confirm the inserted text appears in the requested location.

## Preferred Editing Method

Use clipboard-based paste for multi-line content:

```bash
printf '%s' 'content here' | pbcopy
```

Then use Computer Use to click the confirmed target cell and press `super+v`.

Avoid blind OS-coordinate automation when multiple WeCom docs or tabs are open. Coordinates can land in the wrong document. If coordinate clicking is necessary, first verify the target title and visible target area, then re-check after the click.

## Enterprise WeCom Formatting Rules

For content the user will paste or that Codex will paste into 企业微信文档:

- Prefer plain text over Markdown tables, Mermaid, fenced code blocks, or HTML.
- When the document is a PRD, rely on `prd-coach` for structure before pasting. Do not reconstruct the user's PRD format from scratch inside this skill.
- For flow diagrams in table cells, use compact text:

```text
Before：单条章节复核
章节提取 → 全部提取完成 → 逐条进入章节复核 → 单条判断 → 进入生图

After：批量章节复核
章节提取 → 全部提取完成 → 按动态参数分组（当前默认 5 条） → 批量进入章节复核 → 准确性校验 + 重复信息筛选 → 保留内容进入生图
```

- For PRD detailed requirements, match the user's preferred hierarchy: `i.` as the main item, with `A. B. C.` underneath.
- For `demo示意`, use the demo/process content directly in the cell, not a separate standalone section unless the user asks.

## PRD Writing In 企业微信

When writing or rewriting PRD content that will live in 企业微信文档:

1. Keep formal PRD body clean.
   - Do not leave assistant traces such as `AI 优化`, `建议`, `PRD Coach`, or conversational notes in the document body.
   - Put coaching comments in chat or a separate review report, not inside the clean PRD unless the user asks.

2. Make table cells implementation-ready.
   - State what the page/module shows, what the user or system does, what rule applies, and what exception path follows.
   - Use short paragraphs or `i. / A. B. C.` hierarchy instead of Markdown tables inside table cells.
   - In `demo示意`, prefer compact flow text over long explanatory prose.

3. Preserve existing document conventions.
   - Match the current section names, table column names, numbering, punctuation style, and author/update-record format.
   - If the open document's structure conflicts with the default PRD pattern, follow the open document unless the user asks to standardize it.

## Search And Tab Handling

When the desired doc is not frontmost:

1. Use WeCom search for the exact title or distinctive substring.
2. Review result titles before opening. Search results may include a document whose snippet mentions the target title but whose actual title differs.
3. Open the intended result.
4. Immediately run `get_app_state` and confirm the window title or visible heading matches.

## Confirmation Rule

If the user explicitly asks to edit the open 企业微信文档, treat that as approval for the specific requested edit. Ask again before:

- Editing a different document than the requested title.
- Making broad formatting or content changes outside the requested location.
- Publishing, sharing, deleting, moving, or changing permissions.

## Failure Handling

Stop and report instead of guessing when:

- The target title cannot be confirmed.
- The caret location cannot be verified.
- The UI switches to a different document unexpectedly.
- A paste lands in the wrong location.

In the final response, state the confirmed document title, what was edited, and any uncertainty or follow-up needed.

## Continuous Improvement Checklist

After any real 企业微信 PRD editing session, decide whether this skill should be updated:

- The user has explicitly allowed ongoing self-iteration. Treat this as standing permission to improve this skill after verified 企业微信 PRD editing lessons, without asking each time.
- **Update the skill** when a verified behavior changes the safest way to edit, paste, navigate, verify, or write PRD content in 企业微信.
- **Do not update the skill** for one-off document content, temporary UI glitches, or project-specific product decisions that belong in the PRD itself.
- **Ask first** before changing other skills, storing private document content, or adding broad methodology rules not proven by the current session.
- **Before updating**, reduce the lesson to a reusable rule and place it in the narrowest relevant section above.
- **After updating**, briefly tell the user what new operating rule was learned.
