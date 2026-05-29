---
name: wedata-abtest-daily-report
description: Use when working on the user's WorkBuddy We分析/Wedata ABTest crawler and daily report workflow, especially 图片解锁二期 daily reports, 2-minute executive report formatting, Excel historical comparisons, launchd scheduling, WeChat webhook delivery, and QR-code login refresh.
---

# We分析 ABTest Daily Report

## Core Principle

Treat previous successful daily-report runs as blind-spot maps. If a correct run needed login-state checks, existing-script reuse, report-format preservation, scheduler proof, webhook delivery evidence, or historical Excel comparison, cover that object explicitly instead of rebuilding the workflow.

Do not use one generic crawler/debug flow for every request. Choose the report object first: data crawl, report rendering, historical comparison, scheduler, WeChat delivery, login refresh, or status-only audit.

For daily report operations, use `workflows/agentic-engineering/daily-work-iteration-protocol.md` as the outer automation frame: all report work uses Full flow, with compact display for status-only audits and expanded display for reruns, schedule changes, QR login refreshes, or WeChat delivery; finish with an automation/send completion check.

## Scope

Use this skill for the WorkBuddy project at:

`/Users/yangzide/WorkBuddy/2026-05-11-task-1`

Core files:

- `scripts/scrape_daily.js`: daily crawler, Markdown renderer, webhook push
- `scripts/discover_mapping.js`: headed QR-code login and mini-program mapping refresh
- `scripts/configure_wechat_webhook.sh`: writes enterprise WeChat robot webhook into launchd and tests delivery
- `install.sh`: installs dependencies and registers the macOS launchd schedule
- `reports/YYYY-MM-DD.md`: readable daily report
- `reports/YYYY-MM-DD.json`: structured daily data

Never print or expose auth cookies, bearer tokens, or webhook URLs.

## Report Object Coverage Matrix

| Report Object | Must Usually Cover | Compress / Skip | Verification |
|---|---|---|---|
| Data crawl | Existing WorkBuddy script, Wedata login state, mini-program mapping, latest JSON, failure reason | New crawler creation unless existing path is unusable | `reports/latest.json` or dated JSON is updated/inspected |
| 2-minute report render | One-line conclusion, key metrics, action list, risks, appendix, decision bucket | Raw full metrics in the main body | `reports/latest.md` or dated Markdown matches the format |
| Historical comparison / Excel | Source workbook/report dates, comparable metrics, changed books/groups, concise delta | Non-comparable raw rows | Generated `.xlsx` or comparison table opens/has expected sheets |
| Scheduler | launchd plist, expected 10:00 schedule, command path, log path | Manual rerun if status-only was requested | `launchctl`/plist/log proves schedule state |
| WeChat delivery | Webhook configured without exposing secret, push success/failure log, target group assumption | Printing webhook URL | Log contains delivery outcome or configuration issue |
| QR login refresh | `/mp2/login` stop signal, headed browser, user scan handoff, mapping refresh | Continuing after login page without user scan | Script reaches post-login mapping/data state |
| Status-only audit | Existing artifacts/logs, last run result, direct remediation, no rerun | Changing scripts or launching browser | Report says current state and next required action |

## Report Standard

Daily reports should be readable in two minutes and answer the executive question first.

Required order:

1. `一句话结论`
2. `关键指标`
3. `行动清单`
4. `异常与风险`
5. `明细附录`

Use these decision buckets:

- `放量`: best income uplift >= 10%
- `小步放量`: best income uplift >= 5% and < 10%
- `暂停/回滚`: best available income uplift <= -5%
- `补数后判断`: income data missing
- `继续观察`: no strong move

The report should avoid long explanations. Put full raw metrics only in `明细附录`.

## Daily Workflow

When asked to update or troubleshoot the report:

1. Inspect `scripts/scrape_daily.js`, `reports/latest.md`, and `reports/latest.json`.
2. Keep the 2-minute format above.
3. Align Markdown tables using CJK display width.
4. Validate with `node --check scripts/scrape_daily.js`.
5. If regenerating from existing JSON, reuse the renderer logic from `scripts/scrape_daily.js` so the static report and future scheduled reports match.

## Scheduling

The local Mac launchd job is the source of truth because the crawler depends on the local Playwright profile and Wedata login state.

Expected schedule: daily at 10:00 Asia/Shanghai.

Useful commands:

```bash
cd /Users/yangzide/WorkBuddy/2026-05-11-task-1
./install.sh
launchctl list | grep com.yangzide.wedata-ab-daily
launchctl start com.yangzide.wedata-ab-daily
tail -100 logs/daily.log
```

If changing the schedule, update `install.sh`, rerun it, then verify the plist:

```bash
plutil -p ~/Library/LaunchAgents/com.yangzide.wedata-ab-daily.plist
```

## WeChat Delivery

This project uses enterprise WeChat group robot webhooks via `WECHAT_WEBHOOK`.

Setup:

```bash
cd /Users/yangzide/WorkBuddy/2026-05-11-task-1
./scripts/configure_wechat_webhook.sh
```

The script prompts for the webhook URL, writes it into the launchd plist, reloads launchd, and sends a test message.

If the scheduled run succeeds but no phone message arrives, check:

- `logs/daily.log` for `已推送企业微信` or `企微推送失败`
- `plutil -p ~/Library/LaunchAgents/com.yangzide.wedata-ab-daily.plist` for `WECHAT_WEBHOOK`
- whether the webhook belongs to the correct group

## QR Login Refresh

If the crawler says login expired, run:

```bash
cd /Users/yangzide/WorkBuddy/2026-05-11-task-1
node scripts/discover_mapping.js
```

This opens a headed browser. Ask the user to scan the WeChat QR code, then let the script refresh mapping/login state.

## Curator Closeout

After a report or automation run, write back only reusable operational lessons.

- Add rules here when they affect crawl routing, login-state handling, report format, scheduler proof, webhook delivery, or historical comparison.
- Route general automation safety lessons to `harness-engineering` or `workflows/`.
- Route business/experiment decision-language improvements to prompt templates when they are not specific to Wedata.
- Do not store cookies, webhook URLs, raw private metrics, or one-off daily anomalies in the skill.
