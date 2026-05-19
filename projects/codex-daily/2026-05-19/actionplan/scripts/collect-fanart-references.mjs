import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const seedsPath = path.join(root, "content/fanart-seeds.json");
const outJsonPath = path.join(root, "content/fanart-references.json");
const outHtmlPath = path.join(root, "public/references/fanart-crawl.html");

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36";

function htmlEscape(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function firstMatch(html, patterns) {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1].trim();
  }
  return "";
}

function decodeEntities(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extractMeta(html) {
  const title = decodeEntities(
    firstMatch(html, [
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["'][^>]*>/i,
      /<title[^>]*>([^<]+)<\/title>/i,
    ]),
  );
  const image = decodeEntities(
    firstMatch(html, [
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["'][^>]*>/i,
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    ]),
  );
  const description = decodeEntities(
    firstMatch(html, [
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["'][^>]*>/i,
    ]),
  );
  return { title, image, description };
}

async function fetchMeta(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": USER_AGENT,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: controller.signal,
      redirect: "follow",
    });
    const status = response.status;
    const contentType = response.headers.get("content-type") || "";
    const text = contentType.includes("text/html") ? await response.text() : "";
    return {
      ok: response.ok,
      status,
      contentType,
      blocked: status === 403 || status === 418 || /Cloudflare|访问被拦截|Just a moment/i.test(text),
      meta: text ? extractMeta(text) : {},
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      contentType: "",
      blocked: false,
      error: error instanceof Error ? error.message : "unknown fetch error",
      meta: {},
    };
  } finally {
    clearTimeout(timeout);
  }
}

function renderHtml(records) {
  const cards = records
    .map((item) => {
      const image = item.imageUrl
        ? `<img class="thumb" src="${htmlEscape(item.imageUrl)}" alt="${htmlEscape(item.title)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.replaceWith(Object.assign(document.createElement('div'), { className: 'thumb thumb--empty', textContent: '打开原页面查看' }))" />`
        : `<div class="thumb thumb--empty">需要人工打开</div>`;
      const tags = (item.tags || []).map((tag) => `<span>${htmlEscape(tag)}</span>`).join("");
      const status = item.fetch?.blocked
        ? "脚本端被拦截"
        : item.fetch?.ok
          ? `可读 ${item.fetch.status}`
          : item.fetch?.status
            ? `状态 ${item.fetch.status}`
            : "使用种子信息";
      return `
        <article class="card">
          ${image}
          <div class="body">
            <div class="meta">
              <strong>${htmlEscape(item.title)}</strong>
              <em>${htmlEscape(item.platform)}</em>
            </div>
            <p>${htmlEscape(item.author || "作者待确认")}</p>
            <p>${htmlEscape(item.usage || "")}</p>
            <div class="tags">${tags}</div>
            <div class="footer">
              <span>${htmlEscape(status)}</span>
              <a href="${htmlEscape(item.pageUrl)}" target="_blank" rel="noreferrer">原页面</a>
            </div>
          </div>
        </article>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>小说二创人物图采集结果</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #0f1418;
        color: #f4eadb;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background:
          radial-gradient(circle at 16% 8%, rgba(160, 119, 70, 0.2), transparent 30rem),
          radial-gradient(circle at 88% 18%, rgba(83, 143, 150, 0.18), transparent 28rem),
          #0f1418;
      }
      main { width: min(1280px, calc(100% - 32px)); margin: 0 auto; padding: 38px 0 70px; }
      header { max-width: 900px; margin-bottom: 26px; }
      h1 { margin: 0 0 12px; font-family: "Songti SC", "Noto Serif SC", Georgia, serif; font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.1; letter-spacing: 0; }
      .intro { margin: 0; color: #d3c6b7; line-height: 1.75; }
      .note { margin-top: 14px; padding: 12px 14px; border: 1px solid rgba(232, 193, 121, 0.3); border-radius: 8px; color: #efd19d; background: rgba(56, 42, 25, 0.42); line-height: 1.6; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(235px, 1fr)); gap: 16px; }
      .card { overflow: hidden; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; background: rgba(10, 14, 18, 0.76); box-shadow: 0 18px 42px rgba(0,0,0,0.22); }
      .thumb { display: grid; place-items: center; width: 100%; height: 280px; object-fit: cover; background: #171b22; color: #8c8278; }
      .thumb--empty { border-bottom: 1px solid rgba(255,255,255,0.08); }
      .body { display: grid; gap: 8px; padding: 14px; }
      .meta { display: grid; gap: 4px; }
      strong { color: #fff4e4; line-height: 1.35; }
      em { color: #8fd5c8; font-size: 0.78rem; font-style: normal; }
      p { margin: 0; color: #cbbdae; font-size: 0.88rem; line-height: 1.55; }
      .tags { display: flex; flex-wrap: wrap; gap: 6px; }
      .tags span { padding: 4px 7px; border-radius: 999px; background: rgba(255,255,255,0.08); color: #dfd0bd; font-size: 0.74rem; }
      .footer { display: flex; justify-content: space-between; gap: 10px; align-items: center; margin-top: 4px; color: #8d8277; font-size: 0.78rem; }
      a { color: #9fd8cf; text-decoration: none; }
      a:hover { color: #d9fff6; }
      @media (max-width: 720px) {
        main { width: min(100% - 22px, 1280px); padding-top: 28px; }
        .thumb { height: 230px; }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>小说二创人物图采集结果</h1>
        <p class="intro">这里汇总了当前可公开访问或已找到入口的高质量二创/官设/活动视觉。脚本只抓元数据和缩略图 URL，不绕过登录、验证码或付费墙。</p>
        <p class="note">正式放入阅读器前，建议按这些参考重新生成/绘制原创图，或联系画师授权。</p>
      </header>
      <section class="grid">${cards}</section>
    </main>
  </body>
</html>
`;
}

const seeds = JSON.parse(await fs.readFile(seedsPath, "utf8"));
const records = [];

for (const seed of seeds.items) {
  const fetchResult = await fetchMeta(seed.pageUrl);
  const meta = fetchResult.meta || {};
  records.push({
    ...seed,
    title: seed.title || meta.title,
    imageUrl: seed.imageUrl || meta.image || "",
    description: seed.description || meta.description || "",
    fetch: {
      ok: fetchResult.ok,
      status: fetchResult.status,
      contentType: fetchResult.contentType,
      blocked: fetchResult.blocked,
      error: fetchResult.error,
    },
  });
}

const output = {
  id: "fanart-reference-crawl",
  title: "小说二创人物图采集结果",
  updatedAt: new Date().toISOString(),
  records,
  summary: {
    total: records.length,
    withImage: records.filter((item) => item.imageUrl).length,
    blocked: records.filter((item) => item.fetch?.blocked).length,
    fetched: records.filter((item) => item.fetch?.ok).length,
  },
};

await fs.writeFile(outJsonPath, `${JSON.stringify(output, null, 2)}\n`);
await fs.writeFile(outHtmlPath, renderHtml(records));

console.log(JSON.stringify(output.summary, null, 2));
