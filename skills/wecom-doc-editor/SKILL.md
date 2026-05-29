---
name: wecom-doc-editor
description: Safely edit Tencent WeCom/企业微信 docs through the desktop UI, especially PRD documents, table cells, demo示意 columns, Before/After process text, and small copy edits. Use when the user asks Codex to operate an already-open 企业微信文档, paste content into a Tencent Docs/WeCom document, update a PRD table, or learn from WeCom document editing behavior. For PRD writing or PRD-format edits, use with prd-coach first to match the user's PRD structure before editing WeCom.
---

# WeCom Doc Editor

## Overview

Use this skill for live 企业微信文档 editing. Treat it as a fragile UI workflow: first prove the target document is correct, then edit only the requested location, then verify the result landed in the right place.

This skill should improve over time. When a live 企业微信 editing session reveals a durable behavior, paste quirk, table-handling rule, or PRD-format convention, fold the lesson back into this file if it would prevent future mistakes or speed up repeated PRD work.

Use strong prior WeCom editing sessions as blind-spot maps. If a successful session required title proof, target-cell proof, clipboard validation, import fallback, image verification, or user handoff boundaries, treat those as required coverage for the same edit object next time.

When a WeCom edit is part of a broader daily-work loop, use `workflows/agentic-engineering/daily-work-iteration-protocol.md` as the outer frame: WeCom edits use Full flow by default, with compact display for small edits and expanded display for cross-document PRD publishing or live UI plus TAPD handoff; finish with a document completion check before done.

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

## Shared Editing Protocol

Use this protocol when the user and Codex may be using 企业微信 at the same time.

1. Establish who is driving before touching the UI.
   - If the user says they will guide, demonstrate, or continue working, switch to observe-only mode and do not click, type, scroll, or change focus.
   - If the user says "开始编辑", "你来", "接管", or gives a specific operation to perform, Codex may drive only that scoped operation.
   - If the user is actively moving the cursor, typing, selecting text, or navigating the document, stop and wait for a clear handoff.

2. Keep UI actions atomic and visible.
   - Announce the next action in chat before changing the document or navigating away.
   - Perform one UI transition or one paste at a time, then observe the result before continuing.
   - Do not chain clicks through loading states, hidden modals, or document switches.

3. Avoid cursor and clipboard collisions.
   - Do not type into a live document while the user may still be editing the same surface.
   - Prepare content outside the UI first, then paste only after the target title and location are visible.
   - If a paste target is uncertain, stop instead of trying nearby positions.

4. Respect the user's current work surface.
   - Do not navigate away from the user's current document or tab unless the requested route requires it.
   - If the user asks to work in the background or another display, first verify the intended WeCom window; if the tool must bring it foreground, say so before acting.
   - If the visible state changes unexpectedly, assume the user or WeCom changed context and re-confirm before editing.

5. When recovering a stalled WeCom editing session, resume narrowly.
   - Locate the exact session id or active terminal session first, then resume with explicit instructions: continue from the interruption point, do not rerun completed edits, observe the current WeCom window before acting, and stop if the title or target cell is uncertain.
   - Prefer inspecting the session JSON tail or concise tool outputs over noisy TTY animation when diagnosing a stuck state.
   - If the resumed session requests clipboard or WeCom UI permission, choose one-time approval only. Do not grant persistent approval unless the user explicitly asks.
   - Keep monitoring until the resumed session either verifies the edit or reports a blocker; do not leave a resumed TTY running in the background.

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

## Edit Object Coverage Matrix

Choose the edit object before acting. This prevents using one generic paste workflow for every document task.

| Edit Object | Must Usually Cover | Compress / Skip | Verification |
|---|---|---|---|
| Small text edit | Target title, section, exact text range, before/after wording, no neighboring change | Full document import | Re-observe visible text in place |
| PRD table cell | Target title, table name, row, column, caret in cell, cell-safe plain text, paste route | Whole-document selection | Confirm content landed in the exact cell |
| `demo示意` / process cell | Before/After, branch/fallback, changed vs unchanged scope, line breaks that fit the cell | Long standalone explanation | Cell remains readable and not raw Markdown |
| Long report / PRD body | Import vs paste decision, local artifact, table/image handling, top heading, raw Markdown leakage check | Blind clipboard paste | Verify first heading, at least one table/image when expected |
| Template copy/fill | Template library path, chosen template card, generated copy state, fixed regions, fillable cells | Rebuilding template from scratch | Template anchors visible before filling |
| Diagram/image insertion | Source image path, target section/cell, upload/paste route, visual fit | Replacing text with image unless requested | Image visibly renders in the target document |
| Shared live editing | Driver, user handoff, current focus, clipboard ownership, one action at a time | Background edits while user is active | Stop if user moves cursor or surface changes |

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

For Chinese text in WeCom PRD table cells, use clipboard paste instead of direct typing.

- Direct UI text input into WeCom table cells can drop Chinese characters and leave only numbering, punctuation, or ASCII fragments.
- If direct input produces corrupted text, immediately undo once with `super+z`, re-observe the cell, and switch to `pbcopy` + `super+v`.
- For multi-line requirement bodies, prepare the full cell text in plain text first, write it to the macOS clipboard, click the confirmed target cell, paste once, then verify the content landed in that exact column.
- Use this same route for `详细需求[优先级]` and `demo示意`; do not try to type long Chinese content character-by-character inside WeCom.

For live WeCom PRD tables:

- To widen a cramped table, click the table's left-side handle, then use `自动调整` -> `自适应页面宽度`; verify the table expands to the document body width.
- When the caret is inside a WeCom table, `Cmd+A` selects the current table before the whole document. Use a copy test first; if the clipboard contains only the target table, it is safe to replace that table with a formatted clipboard table.

## Long Document Insertion Strategy

Use this when the user asks to put a report, PRD, or analysis document into 企业微信/腾讯文档.

1. Prefer an API/connector route before GUI driving.
   - Search available tools for Tencent Docs / `tencent-docs` / SmartCanvas.
   - If a Tencent Docs MCP connector is available and the target document ID can be verified, use document APIs such as Markdown append or element insertion instead of UI paste.
   - If no connector is available, proceed with the UI route below and state that the current run is GUI-driven.

2. Choose the insertion route by content type.
   - For short PRD cell edits: use `pbcopy` + paste into the confirmed cell.
   - For long reports with multiple tables/images: create a local `.docx` or verified HTML/PDF first, then import/upload through the document UI when possible. This is usually safer than pasting raw Markdown.
   - For long reports where import is unavailable: convert Markdown tables into plain tab-separated blocks or simple text tables before pasting; do not paste raw Markdown tables and assume they will render.
   - For report diagrams/images: upload or paste the generated image separately after the text body, then verify the image is visible. Do not leave local Markdown image links in the live document.

3. Prepare the body before touching 企业微信.
   - Validate Markdown table separators locally before paste/import. Every Markdown table separator row must have the same number of cells as the header.
   - Remove code fences around ordinary text blocks unless the user explicitly wants code formatting.
   - Keep one title at the top and avoid duplicating the same field tables in multiple sections.

4. Verify after insertion.
   - Check the document title, first heading, at least one table, and any inserted image.
   - Scroll once through the top portion after paste/import to catch raw Markdown leakage such as `|---|---|`.
   - If Markdown leaked into the body, undo immediately or replace that section with a plain-text/table-safe version.

## Creating New WeCom Docs

When the user asks to create a new 企业微信文档, do not edit the currently open document.

1. First bring 企业微信 to the foreground and confirm the visible context.
   - If the 文档 home is visible, use the top `新建文档` entry.
   - If an existing document tab is visible, use the top tab-bar `新建` entry, then choose `文档` from the new-page options.
   - If clicking the left 文档 icon opens a recent spreadsheet/document instead of the document home, do not paste there. Use the visible file/menu controls to return to the docs home or choose a new-document entry; if the route is unclear, stop and report rather than editing the recent file.
   - If Codex or another app becomes frontmost while checking progress, re-activate 企业微信 before the next UI action.

2. Verify the new blank document before pasting.
   - The visible title should be `无标题文档` or a blank title placeholder.
   - Paste the document title into the title field first.
   - Press `Return` or click the body placeholder before pasting the PRD body.

3. When the user wants a document created from a WeCom template, use the template-library route and wait for each state.
   - From the blank document/new-document page, click `模板库` or the bottom quick-template `更多模板`; then wait until the full `模板库` modal is visible.
   - In the modal, verify `我的模板` is selected and the expected template card, such as `[PRD][日常迭代] 模版`, is fully visible before clicking it.
   - After selecting the template, wait until the generated document shows the template body, including the `[PRD][日常迭代]` title, `更新记录` table, and `需求概述` anchors. Do not paste while the page still shows `无标题文档`, a blank body placeholder, the template modal, or a previous document.
   - After every template-route click, observe the UI again before the next click or paste; do not chain clicks through loading states.

4. Use a controlled fallback for fragile WeCom click targets.
   - Computer Use coordinate clicks may fail on WeCom title bars or webview controls with `AXError.notImplemented`, `noWindowsAvailable`, or `windowNotFoundAtPosition`.
   - If that happens, activate 企业微信, perform a single carefully targeted OS-level click on the already visible control, then immediately run `get_app_state` to verify the page changed as expected.
   - Do not continue a multi-step coordinate sequence without re-checking the visible title/page after each successful transition.
   - If repeated GUI clicks fail on the document surface, switch to a non-GUI deliverable route: create/importable `.docx` plus a clear handoff, or use a connector if available.

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
- **Route elsewhere** when the lesson is not a WeCom editing lesson: PRD content logic goes to `prd-coach`, TAPD publishing behavior goes to `tapd-prd-draft`, and cross-skill PRD handoff goes to `workflows/`.
- **Ask first** before changing other skills, storing private document content, or adding broad methodology rules not proven by the current session.
- **Before updating**, reduce the lesson to a reusable rule and place it in the narrowest relevant section above.
- **After updating**, briefly tell the user what new operating rule was learned.
