# 起点角色活动 Runbook

## File Map

- `index.html`: page structure, cache-busted CSS/JS links, quiz/result/poster sections.
- `styles.css`: immersive layout, responsive rules, card/avatar styling.
- `app.js`: question data, scene guides, scoring, result rendering, poster canvas, submit beacon.
- `admin.html` / `admin.js`: lightweight dashboard.
- `functions/api/submit.js`: validates and inserts quiz result into D1.
- `functions/api/stats.js`: reads aggregate stats for admin.
- `schema.sql`: `quiz_events` D1 table and indexes.
- `.cloudflare-pages-dist`: deploy output folder for Cloudflare Pages.
- `_routes.json`: restrict Pages Functions to `/api/*`.
- `_headers`: cache static assets.

## Rollback

Create rollback before edits:

```bash
stamp=$(date +%Y%m%d-%H%M%S)
slug=<short-slug>
mkdir -p "rollback/${slug}-${stamp}/assets/tarot-seats" "rollback/${slug}-${stamp}/assets/ui"
cp index.html app.js styles.css admin.html admin.js wrangler.toml "rollback/${slug}-${stamp}/"
cp assets/tarot-seats/* "rollback/${slug}-${stamp}/assets/tarot-seats/" 2>/dev/null || true
cp -R assets/ui/. "rollback/${slug}-${stamp}/assets/ui/" 2>/dev/null || true
```

## Local Preview

Use a free port, commonly `8791`:

```bash
python3 -m http.server 8791
```

Open `http://127.0.0.1:8791/?v=<cache-bust>`. Click through enough questions to verify state transitions. For final-flow verification, click all 12 choices and confirm `#resultView` is visible.

## Cloudflare Deploy

Sync changed files first:

```bash
rsync -a index.html app.js styles.css admin.html admin.js .cloudflare-pages-dist/
rsync -a assets/tarot-seats/ .cloudflare-pages-dist/assets/tarot-seats/
rsync -a assets/ui/ .cloudflare-pages-dist/assets/ui/
cp _routes.json _headers .cloudflare-pages-dist/
```

Deploy:

```bash
npx wrangler pages deploy .cloudflare-pages-dist --project-name qidian-character-quiz --branch main --commit-message "<message>"
```

Verify:

```bash
curl -s 'https://qidian-character-quiz.pages.dev/?v=<cache-bust>' | rg 'expected-token'
curl -I 'https://qidian-character-quiz.pages.dev/assets/ui/mystery-avatar.png?v=<cache-bust>'
curl -s 'https://qidian-character-quiz.pages.dev/api/stats?days=1' | head -c 300
```

## Caching And Capacity

Recommended `_routes.json`:

```json
{
  "version": 1,
  "include": ["/api/*"],
  "exclude": []
}
```

Recommended `_headers`:

```text
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=300, must-revalidate

/*.js
  Cache-Control: public, max-age=300, must-revalidate
```

Opening the quiz is static CDN traffic. Only `/api/submit` and `/api/stats` hit Functions/D1. Internal testing should be fine; for public campaign scale, reduce analytics writes or upgrade Cloudflare.

## Common Fixes

- User sees old CSS/JS: update query version in `index.html`, then deploy.
- Image shows broken: confirm asset exists in both source and `.cloudflare-pages-dist`, then `curl -I` the public URL.
- Last question does not jump result: inspect `chooseOption()` and ensure the final branch calls `showResult`.
- “You” avatar vs narrator avatar is swapped: narrator uses `#narratorAvatar` and should stay 阿德罗斯; previous-reply avatar lives inside `.user-line` and can be the 神秘人 image.
