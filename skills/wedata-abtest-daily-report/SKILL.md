---
name: wedata-abtest-daily-report
description: Use when working on the user's WorkBuddy We分析/Wedata ABTest crawler and daily report workflow, especially 图片解锁二期 daily reports, 2-minute executive report formatting, Excel historical comparisons, launchd scheduling, WeChat webhook delivery, and QR-code login refresh.
---

# We分析 ABTest Daily Report

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
