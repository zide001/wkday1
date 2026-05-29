---
name: tapd-prd-draft
description: Create or submit TAPD requirements from Tencent WeCom PRD docs. Use when the user asks to create one or more TAPD需求 from 企业微信/Tencent Docs PRD content, fill TAPD fields such as project, title, description, developer, owner, category, iteration, and either submit directly, save as draft, or use TAPD MCP when available.
---

# TAPD PRD Requirement

Use this skill for repeatable TAPD requirement creation from an existing 企业微信 PRD document.

## Core Principle

Treat successful TAPD handoffs as blind-spot maps. If a prior correct run required source title proof, rich clipboard validation, target project routing, required-field preflight, people-field commit checks, or final draft/submission evidence, treat that as required coverage for the same handoff object next time.

Do not use one generic "paste PRD into TAPD" flow for every request. Choose the handoff object first, then cover the smallest complete set of source, target, fields, formatting, submit/draft, and verification steps.

TAPD creation uses Full flow in `workflows/agentic-engineering/daily-work-iteration-protocol.md`: keep source state, handoff contract, submit/save completion check, and post-submit evidence explicit because the action is externally visible.

## TAPD Handoff Object Coverage Matrix

| Handoff Object | Must Usually Cover | Compress / Skip | Verification |
|---|---|---|---|
| Source PRD capture | Exact WeCom/Tencent Docs title, body anchors, rich HTML/table preservation, confidentiality | Body text in chat/logs | Clipboard/DOCX metadata proves title or anchors and tables when expected |
| TAPD project routing | Project name, workspace access, MCP-vs-UI route, create page identity | Retrying inaccessible MCP workspace | Visible page or API result matches the target project |
| Title/description fill | TAPD title field, TinyMCE editor frame, placeholder replacement, body anchors, table/headings count | Manual Markdown reconstruction | DOM check shows title and non-placeholder description with formatting preserved |
| People and required fields | Developer, owner, category/iteration/priority/custom required fields, committed chooser values | Optional fields irrelevant to the project | Front-end validation has no blocking required-field error |
| Draft save | User asked for draft or validation is incomplete, draft evidence, location to find it | Final submit | Draft appears in TAPD draft/my-work surface |
| Direct creation | All required fields validated, submit button, success route, created ID/title | Saving draft by default when user asked to create | TAPD success state or created item evidence |
| Recovery / fallback | Failed rich copy, canvas export, login/access issue, selector drift, manual stop condition | Blind coordinate retries | Stop reason or fallback artifact is verified without leaking content |

## Safety Rules

- Treat PRD content as confidential by default. Do not print, summarize, store, or send PRD body text in chat or logs unless the user explicitly asks.
- Verify the exact source PRD title before copying content. Similar titles are not interchangeable.
- Verify the exact TAPD project before submitting or saving. Current routing rule from the user: if the PRD title/content is about `取数`, use `阅文集团数据项目`; otherwise use `阅文开放平台`.
- The user's current default is direct submission/creation. Clicking `创建` is allowed after all required fields and validations pass. Use `保存草稿` only if the user asks for a draft, if validation is incomplete, or if a final human check is needed.
- If the source document, TAPD page, or caret/field target cannot be verified, stop instead of guessing.

## Preferred Tools

- Use `wecom-doc-editor` first for live 企业微信/Tencent Docs title verification and safe UI handling.
- Prefer TAPD MCP/API when it can access the real target workspace and supports the requested state. Fall back to Chrome/CDP UI automation for fields or frontend-only flows that MCP cannot handle.
- Use Chrome/CDP or a separate independent Chrome window when possible so the user's main browser/workflow is not disturbed.
- Use DOM/selector automation for TAPD when available; it is more reliable than coordinate clicks.

## Independent Chrome Setup

When extension access is unavailable or the user wants background work, open a dedicated Chrome profile:

```bash
open -na "Google Chrome" --args \
  --remote-debugging-port=9333 \
  --user-data-dir="/Users/yangzide/Documents/Codex/2026-05-21/tapd/chrome-profile" \
  --window-size=1100,900 \
  "https://tapd.woa.com/"
```

Connect with Playwright from `node_repl`:

```js
const { chromium } = await import("playwright");
globalThis.tapdBrowser = await chromium.connectOverCDP("http://127.0.0.1:9333");
globalThis.tapdCtx = globalThis.tapdBrowser.contexts()[0];
```

## Source PRD Capture

1. Confirm the visible 企业微信/Tencent Docs title matches the requested PRD title.
2. Prefer opening the document URL in the independent Chrome profile if it can be found from the current page or local CEF history.
3. Copy the full document as rich content with `Meta+A`, `Meta+C` from inside the Tencent Docs editing surface.
   - Preserve the original document formatting as much as TAPD allows: headings, tables, line breaks, bold text, and links.
   - Do not convert the PRD body to plain text unless the user explicitly asks.
   - Do not use `pbcopy`, generated Markdown, or manual string assembly for the PRD body; those routes drop Tencent Docs tables and styling.
   - Do not manually prepend or rewrite the title into the copied body. If the title is not selected, use the TAPD title field for the title and keep the description body faithful to the source document.
4. Validate only metadata, not body content. Check that the clipboard includes rich HTML when the source document contains tables. If only plain text is available, stop and use a safer source-copy route instead of pasting into TAPD. If a rich copy does not include the document title, validate by visible source title plus body anchors such as `更新记录` and `需求概述`:

```bash
python3 - <<'PY'
import subprocess, hashlib
s = subprocess.check_output(["pbpaste"]).decode("utf-8", "ignore")
print({
  "chars": len(s),
  "has_target_title": "TARGET_TITLE" in s,
  "has_update_record": "更新记录" in s,
  "has_requirement_overview": "需求概述" in s,
  "html_bytes": len(subprocess.check_output(["pbpaste", "-Prefer", "html"])),
  "sha256_12": hashlib.sha256(s.encode()).hexdigest()[:12],
})
PY
```

If the checks fail, do not paste into TAPD.

### Tencent Docs Canvas Fallback

Some Tencent Docs pages render the document body on canvas. In that state, `Meta+A` / `Meta+C` may copy only a short title or focused fragment and no `text/html`.

When rich clipboard validation fails:

1. Use the Tencent Docs file menu: `导出为` -> `本地Word文档(.docx)`.
2. Save the download to a temporary local path inside the task workspace.
3. Validate structure only, without printing PRD content:
   - target PRD title exists
   - anchors such as `更新记录` and `需求概述` exist
   - the DOCX XML contains table structures (`<w:tbl`)
4. Convert DOCX to HTML and paste/set that HTML into TAPD so tables/headings survive:

```bash
textutil -convert html -output /tmp/prd.html /tmp/prd.docx
```

5. Verify in TAPD that `document.querySelectorAll("table").length > 0` when the source PRD contains tables.

Do not use this fallback to disclose, summarize, or store the PRD body outside temporary local files for the current task.

## TAPD Target

Prefer TAPD Open Platform "通用页面" / business-object creation pages when available, because they expose a cleaner embedded creation surface and can hide TAPD chrome with URL params such as `hidden_left_side` and `hidden_top_side`. Reference page currently used by the user: `https://o.tapd.woa.com/document/tapd-common-pages/`.

Fallback full TAPD create URL for `阅文开放平台`:

```text
https://tapd.woa.com/tapd_fe/10150041/story/create?workitem_type_id=1010150041000045535
```

Before filling fields, verify page title/body indicates `创建需求` and the correct project.

Known limitation: the configured TAPD MCP identity may not have access to `阅文开放平台` (`workspace_id=10150041`). If MCP returns `user ... not existed in workspace 10150041`, do not keep retrying MCP for that workspace; use authenticated TAPD UI automation instead until the MCP token identity is fixed.

## Fill Title And Description

Title input selector:

```js
await tapdPage.locator("input.card-content_title-input").fill(targetTitle);
```

TAPD description uses TinyMCE frames. Find the frame whose body is `body#tinymce[contenteditable=true]` and whose text contains the placeholder headings:

```js
let editorFrame = null;
for (const f of tapdPage.frames()) {
  const info = await f.evaluate(() => ({
    editable: !!document.querySelector('body#tinymce[contenteditable="true"]'),
    text: document.body?.innerText || ""
  })).catch(() => null);
  if (info?.editable && info.text.includes("【需求背景】")) editorFrame = f;
}
if (!editorFrame) throw new Error("TAPD description editor not found");
```

Paste the copied PRD into the editor. Use clipboard paste so rich HTML from Tencent Docs is preserved:

```js
await editorFrame.locator("body#tinymce").click();
await tapdPage.keyboard.press("Meta+A");
await tapdPage.keyboard.press("Meta+V");
```

Validate without printing content. The description body may not contain the PRD title if Tencent Docs did not include the title in the rich selection; that is acceptable when the TAPD title field matches the source title and body anchors are present.

```js
await editorFrame.evaluate((targetTitle) => {
  const text = document.body.innerText || "";
  return {
    textLen: text.length,
    hasTargetTitle: text.includes(targetTitle),
    hasPlaceholders:
      text.includes("【需求背景】") ||
      text.includes("【需求描述】") ||
      text.includes("【埋点及统计需求】"),
    hasUpdateRecord: text.includes("更新记录"),
    hasRequirementOverview: text.includes("需求概述")
  };
}, targetTitle);
```

Only proceed when `hasPlaceholders=false` and required body anchors are present. Prefer a visual screenshot check of the editor area when formatting fidelity matters, but do not send or store screenshots containing confidential content unless the user asks.

For formatting-sensitive PRDs, also verify that tables/headings survived the paste, not just that the text anchors exist:

```js
await editorFrame.evaluate(() => ({
  tables: document.querySelectorAll("table").length,
  headings: document.querySelectorAll("h1,h2,h3,strong,b").length,
  textLen: (document.body.innerText || "").length
}));
```

If the source document visibly contains tables and `tables` is `0`, treat the paste as failed formatting fidelity and do not submit/save until a rich-copy path is used.

## Fill People Fields

The right-side fields use `pinyinuserchooser` overlays. Useful selectors:

- Developer: `.content-form__item.developer`
- Owner/处理人: `.content-form__item.owner`
- User search input after opening a field: `.tapd-userselect-v2__selection-search__input`
- Dropdown item: `.tapd-userselect-v2__dropdown-item`

Pattern:

```js
async function chooseUser(page, fieldSelector, query, expectedText) {
  await page.locator(`${fieldSelector} .form__item-content`).click();
  await page.keyboard.type(query, { delay: 20 });
  await page.waitForTimeout(1200);
  await page.locator(".tapd-userselect-v2__dropdown-item")
    .filter({ hasText: expectedText })
    .first()
    .click();
  await page.locator("input.card-content_title-input").click();
  await page.waitForTimeout(600);
}

await chooseUser(tapdPage, ".content-form__item.developer", "luoji", "p_ywjiluo");
await chooseUser(tapdPage, ".content-form__item.owner", "duanyixiao", "p_yxiaoduan");
```

Current known user mappings:

- `luoji` -> `p_ywjiluo(罗绩)`
- `duanyixiao` -> `p_yxiaoduan(段亦逍)`

Verify committed fields:

```js
await tapdPage.evaluate(() => ({
  developer: (document.querySelector(".content-form__item.developer")?.innerText || "").replace(/\s+/g, " ").trim(),
  owner: (document.querySelector(".content-form__item.owner")?.innerText || "").replace(/\s+/g, " ").trim(),
}));
```

Expected committed text contains `开发人员 p_ywjiluo;` and `处理人 p_yxiaoduan;`.

## Required Field Preflight

Before clicking `创建`, scan for front-end validation errors and required TAPD fields. Do not assume title/description/people are enough.

For `阅文开放平台`, observed required fields include:

- `分类 *`: for 微信分销 PRDs, use `微信分销需求` when present.
- `需求优先级 *`: often defaults to `P0`; verify it is populated.
- `迭代 *`: verify it is populated after category/template selection.

Useful check:

```js
await tapdPage.evaluate(() =>
  Array.from(document.querySelectorAll(".form__item--error, .el-form-item__error, [class*=error]"))
    .map(el => (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim())
    .filter(Boolean)
);
```

If any visible required field error remains, fix it before submitting. A click on `创建` can silently stay on the create page if front-end validation fails.

## Submit Or Save

Default path: click the visible `创建` button after all validations pass.

```js
const responses = [];
const handler = (res) => {
  const url = res.url();
  if (/tapd\.woa\.com/.test(url) && /story|workitem|create|save|api/i.test(url)) {
    responses.push({ status: res.status(), url });
  }
};
tapdPage.on("response", handler);
await tapdPage.locator("button").filter({ hasText: "创建" }).last().click();
await tapdPage.waitForTimeout(5000);
tapdPage.off("response", handler);
```

Validate:

```js
await tapdPage.evaluate(() => {
  const text = (document.body.innerText || "").replace(/\s+/g, " ").trim();
  return {
    hasSuccessText: /成功|已创建|创建成功/.test(text),
    stillOnCreatePage: text.includes("创建需求"),
    currentUrl: location.href
  };
});
```

If the user explicitly asks for draft mode, or if direct creation is risky, click `保存草稿` instead and verify the response includes `/api/entity/workitems/save_draft` with status `200`. Then open `我的工作 -> 更多 -> 草稿` and verify the title appears there.

When direct creation succeeds, capture and report the created TAPD link if available. Report only high-level completion: project, title, filled people fields, created/saved state, and link/id. Do not include PRD body.

## Curator Closeout

After a TAPD run, write back only verified platform or handoff lessons.

- Add TAPD-specific rules here when they affect source capture, project routing, field filling, draft/save/create behavior, or post-submit verification.
- Route source-document editing or rich-copy lessons to `wecom-doc-editor`.
- Route PRD content or template lessons to `prd-coach`.
- Route cross-system PRD publishing sequences to `workflows/`.
- Do not store PRD body content, people-sensitive details, or one-off ticket facts in this skill.

## Post-submit Verification

After creation, prefer verifying the created story through the TAPD list preview URL:

```text
https://tapd.woa.com/tapd_fe/{workspace_id}/story/list?...&dialog_preview_id=story_{story_id}
```

Observed for `阅文开放平台`:

- `workspace_id=10150041`
- `dialog_preview_id=story_1010150041134538094` opens a right-side drawer over the story list.
- The drawer container is `.el-drawer.rtl`.
- Detail layout containers:
  - `.detail-container-wrapper.entity-detail-layout`
  - `.detail-container-left` for description/details
  - `.detail-container-right` for base fields
- The PRD body preview is `richtext-preview.richtext-preview`.

Do not rely only on `innerText` in `richtext-preview`; it may be near-zero even when rich content renders. For formatting verification, inspect structure instead:

```js
await page.evaluate(() => {
  const preview = document.querySelector("richtext-preview.richtext-preview") ||
    document.querySelector(".richtext-preview");
  const root = preview?.shadowRoot || preview;
  return {
    found: !!preview,
    tables: root?.querySelectorAll("table").length || 0,
    headings: root?.querySelectorAll("h1,h2,h3,h4,strong,b").length || 0,
    links: root?.querySelectorAll("a").length || 0,
    images: root?.querySelectorAll("img").length || 0,
    tableShapes: Array.from(root?.querySelectorAll("table") || [])
      .slice(0, 10)
      .map(t => ({
        rows: t.querySelectorAll("tr").length,
        cells: t.querySelectorAll("td,th").length
      }))
  };
});
```

For this workflow, a successful rich PRD result should show nonzero `tables` and `headings` when the source PRD contains tables/headings. This is the stronger check than simply seeing the body anchors.
