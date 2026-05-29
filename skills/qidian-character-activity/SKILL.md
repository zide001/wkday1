---
name: qidian-character-activity
description: Build, iterate, deploy, and troubleshoot Qidian/起点 IP character quiz or small campaign activities, especially MBTI-style role matching, adventure dialogue quizzes, character-card results, poster generation, Cloudflare Pages deployment, D1 stats, admin dashboards, visual asset generation, cache busting, rollback, and capacity checks. Use when the user asks to create, refine, publish, or summarize a 起点角色人格测试 / 小说人物匹配 / IP运营活动 / interactive web quiz.
---

# Qidian Character Activity

## Core Principle

Treat strong campaign examples and previous successful activity builds as blind-spot maps. If a reference activity covers result-card polish, poster sharing, stats, admin review, cache busting, rollback, or capacity, decide whether that coverage is required for the current activity object before building.

Do not turn every request into a full campaign build. Choose the activity object first, then include the smallest useful set of product, visual, data, deployment, and verification work.

When an activity task is part of broader daily work, use `workflows/agentic-engineering/daily-work-iteration-protocol.md` as the outer frame: all activity work uses Full flow, with compact display for local copy or visual tweaks and expanded display for deployment, public links, D1/admin changes, or rollback/capacity decisions; finish with a prototype/deploy completion check.

## Core Workflow

1. Read the current app before changing anything. In this project family the active static site is usually under `/Users/yangzide/Documents/Codex/2026-05-19/new-chat`, with `index.html`, `styles.css`, `app.js`, `admin.html`, `admin.js`, `functions/api/*`, `schema.sql`, `wrangler.toml`, and `.cloudflare-pages-dist`.
2. Create a rollback folder before each meaningful edit:
   - Use `rollback/<short-slug>-<yyyymmdd-hhmmss>/`.
   - Copy `index.html`, `app.js`, `styles.css`, `admin.html`, `admin.js`, `wrangler.toml`, and relevant assets.
3. Preserve the user’s product intent: this is an IP promotion activity, not a generic personality test. Use concrete role names, novel names, role热梗, and immersive scene copy when the user has confirmed authorization.
4. Keep the first screen as the usable activity, not a landing page. The default pattern is a mystery/adventure dialogue quiz: gray fog stage, left character/card, right dialogue console, top-left location/progress HUD.
5. Validate visually and behaviorally before final delivery: local preview, desktop screenshot, mobile screenshot, click through all questions, verify final result, verify poster generation if touched, and verify deployed URLs.

## Product Pattern

- Prefer 12 questions / 12 seats for tarot-style or adventure-style role matching.
- Include male and female roles, but keep the full role pool hidden from normal users unless the user asks for a gallery.
- Make options fun and situation-based. Avoid exposing raw traits such as “行动力 / 洞察力” in the answer options.
- At result stage, show character art, role profile, score, short reason, tags, “入坑口味”, “上榜名场面”, and a poster button.
- For copy, use vivid Chinese scene language. Keep UI labels compact.

## Activity Object Coverage Matrix

Choose the activity object before changing files.

| Activity Object | Must Usually Cover | Compress / Skip | Verification |
|---|---|---|---|
| Quiz flow | Entry state, progress, question count, option style, scoring/matching rule, last-step transition | Poster/admin/deploy if only copy is requested | Complete one full run to result |
| Result card | Character identity, match reason, tags, score/fit, image, CTA, share/poster entry | Admin stats unless touched | Result renders with real data and image |
| Poster generation | Canvas size, image source, text fit, QR/CTA, save/share route, mobile compatibility | Full quiz rewrite | Generate at least one poster successfully |
| Visual asset pass | Role distinction, file path, image dimensions, small-avatar readability, cache-bust version | Data schema changes | Check desktop and mobile render |
| Analytics / D1 stats | Submit event, schema, `/api/submit`, `/api/stats`, privacy, admin read path | Visual redesign | Submit once and verify stats path when practical |
| Admin dashboard | Auth/access assumption, stats table, filters, refresh, error state | Quiz copy changes | Load admin page and verify data/error state |
| Cloudflare deploy | Dist sync, `_routes.json`, `_headers`, cache busting, public URL, rollback folder | Local-only screenshots if publishing requested | `curl`/browser verifies current assets |
| Rollback / capacity | Rollback snapshot, expected traffic, dynamic write volume, fallback plan | Deep capacity modeling for internal test | Rollback folder exists and dynamic endpoints are understood |

## Visual Direction

- Use a restrained gray / dark fog atmosphere for the quiz flow.
- Use a fixed top-left HUD for scene location and progress, e.g. `门廊书房 06 / 12`.
- Use generated or approved二创角色图 when quality matters. For generated tarot cards, make every role visually distinct: face, hair, pose, costume, prop, palette, and background.
- If a small UI avatar is needed, make it readable at 38-58px. Test in the actual UI, not only as a full image.
- Keep result/profile/poster visuals more editorial and polished than the quiz surface, but avoid returning to a beige form-like panel if the user wants a full gray immersive style.

## Implementation Pattern

- Static frontend: `index.html`, `styles.css`, `app.js`.
- Assets:
  - Role result images often live under `assets/characters-ai/`.
  - Tarot/adventure guide cards often live under `assets/tarot-seats/`.
  - UI avatars/icons can live under `assets/ui/`.
- Data flow:
  - Quiz runs client-side.
  - On result, `submitQuizResult()` sends one `/api/submit` beacon/fetch.
  - Admin dashboard reads `/api/stats`.
  - D1 schema is in `schema.sql`.
- Cloudflare:
  - Keep `.cloudflare-pages-dist` synced before deploy.
  - Add or preserve `_routes.json` so only `/api/*` invokes Pages Functions.
  - Add or preserve `_headers` so static assets get CDN caching.
  - Cache-bust changed CSS/JS/assets with query versions in `index.html`.

## Validation Checklist

Before saying done:

- Local preview loads without broken images.
- A user can answer through the last question and reach a character result.
- Browser console has no critical errors when practical to inspect.
- Desktop layout keeps HUD, card, and question console readable.
- Mobile layout does not overflow or hide the primary choice flow.
- Public URL returns current `index.html`, current `app.js`, and current assets.
- If deploying, report the public URL and rollback folder.

## Deployment Notes

For the current Cloudflare Pages shape:

```bash
rsync -a index.html app.js styles.css admin.html admin.js .cloudflare-pages-dist/
rsync -a assets/tarot-seats/ .cloudflare-pages-dist/assets/tarot-seats/
rsync -a assets/ui/ .cloudflare-pages-dist/assets/ui/
cp _routes.json _headers .cloudflare-pages-dist/
npx wrangler pages deploy .cloudflare-pages-dist --project-name qidian-character-quiz --branch main --commit-message "<short message>"
```

Verify with `curl -s` / `curl -I` and a browser screenshot. Never expose Cloudflare API tokens in user-facing output.

## Capacity Heuristic

Opening and playing the quiz is mostly static CDN traffic. The main dynamic cost is one `/api/submit` write when a user finishes, plus `/api/stats` reads for admin. For company internal testing, this is safe. For public high-traffic promotion, consider Cloudflare paid plan, sampling result submissions, or queueing analytics writes.

## Curator Closeout

After an activity build or iteration, capture only reusable campaign lessons.

- Add rules here when they affect future quiz flow, result card, poster, analytics, admin, deployment, rollback, or capacity work.
- Put project-specific URLs, rollback folders, and asset paths in `projects/` unless they are stable defaults for this activity family.
- Route general frontend verification lessons to `harness-engineering` or a workflow instead of bloating this skill.
- Do not write unverified visual opinions into durable rules; keep them as project notes until tested in the real UI.

## Extra Reference

Read `references/runbook.md` when you need the compact command checklist, file map, rollback/deploy steps, or capacity/caching notes.
