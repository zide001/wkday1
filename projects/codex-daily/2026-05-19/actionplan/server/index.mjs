import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const dataDir = process.env.DATA_DIR || path.join(rootDir, "data");
const eventsFile = path.join(dataDir, "events.jsonl");
const port = Number(process.env.PORT || 4174);
const adminKey = process.env.ADMIN_KEY || "zide-admin";
const cookieName = "reader_admin";

const app = express();

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: false }));

function adminToken() {
  return crypto.createHmac("sha256", adminKey).update("interactive-reader-admin").digest("hex");
}

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const index = item.indexOf("=");
        if (index === -1) return [item, ""];
        return [item.slice(0, index), decodeURIComponent(item.slice(index + 1))];
      }),
  );
}

function isAdmin(req) {
  const authHeader = req.get("x-admin-key");
  if (authHeader && authHeader === adminKey) return true;

  const cookies = parseCookies(req.get("cookie"));
  return cookies[cookieName] === adminToken();
}

function setAdminCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${cookieName}=${encodeURIComponent(adminToken())}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 12}`,
  );
}

function clearAdminCookie(res) {
  res.setHeader("Set-Cookie", `${cookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
}

function adminOnly(req, res, next) {
  if (isAdmin(req)) {
    next();
    return;
  }

  res.status(401).json({ error: "unauthorized" });
}

function cleanString(value, maxLength = 160) {
  if (typeof value !== "string") return undefined;
  return value.slice(0, maxLength);
}

function cleanBoolean(value) {
  return typeof value === "boolean" ? value : undefined;
}

async function ensureDataFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(eventsFile);
  } catch {
    await fs.writeFile(eventsFile, "", "utf8");
  }
}

async function readEvents() {
  await ensureDataFile();
  const raw = await fs.readFile(eventsFile, "utf8");
  return raw
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function normalizeEvent(body) {
  const type = cleanString(body.type, 40);
  if (type !== "coin_result" && type !== "choice") return null;

  const event = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    sessionId: cleanString(body.sessionId, 120) || crypto.randomUUID(),
    type,
    storyId: cleanString(body.storyId),
    storyTitle: cleanString(body.storyTitle),
  };

  if (!event.storyId || !event.storyTitle) return null;

  if (type === "coin_result") {
    return {
      ...event,
      coinSide: cleanString(body.coinSide, 12),
      routeLabel: cleanString(body.routeLabel),
      targetChapterId: cleanString(body.targetChapterId),
    };
  }

  return {
    ...event,
    routeLabel: cleanString(body.routeLabel),
    coinSide: cleanString(body.coinSide, 12),
    fromChapterId: cleanString(body.fromChapterId),
    fromChapterTitle: cleanString(body.fromChapterTitle),
    choiceId: cleanString(body.choiceId),
    choiceText: cleanString(body.choiceText, 240),
    choiceHint: cleanString(body.choiceHint, 160),
    targetChapterId: cleanString(body.targetChapterId),
    targetChapterTitle: cleanString(body.targetChapterTitle),
    isEnding: cleanBoolean(body.isEnding) ?? false,
  };
}

function countBy(items, getKey) {
  const map = new Map();
  items.forEach((item) => {
    const key = getKey(item) || "未知";
    map.set(key, (map.get(key) || 0) + 1);
  });

  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "zh-Hans-CN"));
}

function summarize(events) {
  const sessions = new Set(events.map((event) => event.sessionId));
  const coinEvents = events.filter((event) => event.type === "coin_result");
  const choiceEvents = events.filter((event) => event.type === "choice");
  const endingEvents = choiceEvents.filter((event) => event.isEnding);

  const choices = countBy(choiceEvents, (event) => {
    const route = event.routeLabel ? `${event.routeLabel} / ` : "";
    return `${route}${event.fromChapterTitle} -> ${event.choiceText}`;
  });

  return {
    generatedAt: new Date().toISOString(),
    totalEvents: events.length,
    uniqueReaders: sessions.size,
    totalStoryEntries: coinEvents.length,
    totalChoices: choiceEvents.length,
    storyEntries: countBy(coinEvents, (event) => event.routeLabel),
    choices,
    endings: countBy(endingEvents, (event) => event.targetChapterTitle),
    recentEvents: events.slice(-80).reverse(),
  };
}

app.post("/api/events", async (req, res) => {
  const event = normalizeEvent(req.body ?? {});
  if (!event) {
    res.status(400).json({ ok: false });
    return;
  }

  await ensureDataFile();
  await fs.appendFile(eventsFile, `${JSON.stringify(event)}\n`, "utf8");
  res.status(201).json({ ok: true });
});

app.get("/api/admin/summary", adminOnly, async (_req, res) => {
  const events = await readEvents();
  res.json(summarize(events));
});

app.post("/api/admin/clear", adminOnly, async (_req, res) => {
  await ensureDataFile();
  await fs.writeFile(eventsFile, "", "utf8");
  res.json({ ok: true });
});

app.post("/admin/login", (req, res) => {
  if (req.body?.password === adminKey) {
    setAdminCookie(res);
    res.redirect("/admin");
    return;
  }

  res.status(401).send(loginHtml("口令不对"));
});

app.post("/admin/logout", (_req, res) => {
  clearAdminCookie(res);
  res.redirect("/admin");
});

app.get("/admin", (req, res) => {
  if (!isAdmin(req)) {
    res.send(loginHtml());
    return;
  }

  res.send(dashboardHtml());
});

try {
  await fs.access(distDir);
  app.use(express.static(distDir));
  app.get(/.*/, async (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
} catch {
  // API-only mode for Vite development.
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Reader server running on http://127.0.0.1:${port}`);
  console.log(`Admin dashboard: http://127.0.0.1:${port}/admin`);
  if (!process.env.ADMIN_KEY) {
    console.log("Default ADMIN_KEY is zide-admin. Set ADMIN_KEY before sharing outside your machine.");
  }
});

function loginHtml(error = "") {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>阅读数据看板登录</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #efe0c6; color: #2f241b; }
    form { width: min(92vw, 380px); display: grid; gap: 14px; padding: 28px; border: 1px solid rgba(92, 68, 42, .18); border-radius: 8px; background: #f8ecd7; box-shadow: 0 20px 48px rgba(68, 49, 28, .16); }
    h1 { margin: 0; font-size: 1.4rem; }
    p { margin: 0; color: #776753; line-height: 1.6; }
    input, button { min-height: 44px; border-radius: 6px; font: inherit; }
    input { border: 1px solid rgba(92, 68, 42, .24); padding: 0 12px; background: #fff8ec; }
    button { border: 0; color: #fff; background: #705235; cursor: pointer; }
    .error { color: #a13b2c; }
  </style>
</head>
<body>
  <form method="post" action="/admin/login">
    <h1>阅读数据看板</h1>
    <p>请输入管理员口令。测试读者不会看到这个页面。</p>
    ${error ? `<p class="error">${error}</p>` : ""}
    <input name="password" type="password" placeholder="管理员口令" autocomplete="current-password" autofocus />
    <button type="submit">进入看板</button>
  </form>
</body>
</html>`;
}

function dashboardHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>阅读数据看板</title>
  <style>
    :root { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #2f241b; background: #ead8ba; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; }
    header { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px clamp(18px, 5vw, 54px); border-bottom: 1px solid rgba(92, 68, 42, .16); background: rgba(248, 236, 215, .92); backdrop-filter: blur(14px); }
    h1, h2 { margin: 0; }
    h1 { font-size: 1.45rem; }
    main { display: grid; gap: 22px; width: min(1180px, calc(100vw - 32px)); margin: 24px auto 54px; }
    button { min-height: 38px; padding: 8px 12px; border: 1px solid rgba(92, 68, 42, .22); border-radius: 6px; color: #3a2b1d; background: #fff5e4; cursor: pointer; }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .card, section { border: 1px solid rgba(92, 68, 42, .16); border-radius: 8px; background: #f7ead3; box-shadow: 0 14px 34px rgba(68, 49, 28, .1); }
    .card { padding: 18px; }
    .card strong { display: block; font-size: 2rem; line-height: 1.1; }
    .card span { color: #7d6a53; }
    section { display: grid; gap: 14px; padding: 18px; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .bar-row { display: grid; grid-template-columns: minmax(160px, 1fr) minmax(120px, 2fr) 54px; gap: 12px; align-items: center; min-height: 34px; }
    .bar-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .bar-track { height: 12px; border-radius: 99px; background: rgba(92, 68, 42, .12); }
    .bar-fill { height: 100%; border-radius: inherit; background: #705235; }
    .empty { color: #7d6a53; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px 8px; border-bottom: 1px solid rgba(92, 68, 42, .12); text-align: left; vertical-align: top; }
    th { color: #7d6a53; font-weight: 600; }
    td { font-size: .92rem; }
    .pill { display: inline-flex; padding: 3px 7px; border-radius: 99px; color: #60482f; background: rgba(112, 82, 53, .1); }
    @media (max-width: 820px) { .cards, .grid { grid-template-columns: 1fr; } header { align-items: flex-start; flex-direction: column; } .bar-row { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>阅读数据看板</h1>
      <div id="updated" class="empty">正在加载...</div>
    </div>
    <div class="actions">
      <button id="refresh">刷新</button>
      <button id="clear">清空测试数据</button>
      <form method="post" action="/admin/logout"><button type="submit">退出</button></form>
    </div>
  </header>
  <main>
    <div class="cards">
      <div class="card"><strong id="uniqueReaders">0</strong><span>独立读者</span></div>
      <div class="card"><strong id="totalStoryEntries">0</strong><span>抛硬币进入故事</span></div>
      <div class="card"><strong id="totalChoices">0</strong><span>选项点击</span></div>
      <div class="card"><strong id="totalEvents">0</strong><span>总事件</span></div>
    </div>
    <div class="grid">
      <section>
        <h2>故事进入分布</h2>
        <div id="storyEntries"></div>
      </section>
      <section>
        <h2>结局到达</h2>
        <div id="endings"></div>
      </section>
    </div>
    <section>
      <h2>选项热度</h2>
      <div id="choices"></div>
    </section>
    <section>
      <h2>最近事件</h2>
      <div id="recentEvents"></div>
    </section>
  </main>
  <script>
    const ids = ["uniqueReaders", "totalStoryEntries", "totalChoices", "totalEvents"];

    function setText(id, value) {
      document.getElementById(id).textContent = value;
    }

    function renderBars(id, rows) {
      const root = document.getElementById(id);
      if (!rows.length) {
        root.innerHTML = '<p class="empty">暂无数据</p>';
        return;
      }

      const max = Math.max(...rows.map((row) => row.count), 1);
      root.innerHTML = rows.map((row) => {
        const width = Math.max(5, Math.round((row.count / max) * 100));
        return '<div class="bar-row"><div class="bar-label" title="' + escapeHtml(row.label) + '">' + escapeHtml(row.label) + '</div><div class="bar-track"><div class="bar-fill" style="width:' + width + '%"></div></div><strong>' + row.count + '</strong></div>';
      }).join("");
    }

    function renderRecent(events) {
      const root = document.getElementById("recentEvents");
      if (!events.length) {
        root.innerHTML = '<p class="empty">暂无数据</p>';
        return;
      }

      root.innerHTML = '<table><thead><tr><th>时间</th><th>类型</th><th>内容</th><th>读者</th></tr></thead><tbody>' + events.slice(0, 30).map((event) => {
        const time = new Date(event.timestamp).toLocaleString();
        const type = event.type === "coin_result" ? "进入故事" : "选项";
        const detail = event.type === "coin_result"
          ? event.routeLabel
          : (event.fromChapterTitle + " -> " + event.choiceText + (event.isEnding ? " / 到达 " + event.targetChapterTitle : ""));
        return '<tr><td>' + escapeHtml(time) + '</td><td><span class="pill">' + type + '</span></td><td>' + escapeHtml(detail || "") + '</td><td>' + escapeHtml((event.sessionId || "").slice(0, 8)) + '</td></tr>';
      }).join("") + '</tbody></table>';
    }

    function escapeHtml(value) {
      return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
    }

    async function loadSummary() {
      const response = await fetch("/api/admin/summary");
      if (!response.ok) {
        window.location.reload();
        return;
      }

      const data = await response.json();
      ids.forEach((id) => setText(id, data[id] ?? 0));
      document.getElementById("updated").textContent = "更新时间：" + new Date(data.generatedAt).toLocaleString();
      renderBars("storyEntries", data.storyEntries || []);
      renderBars("endings", data.endings || []);
      renderBars("choices", data.choices || []);
      renderRecent(data.recentEvents || []);
    }

    document.getElementById("refresh").addEventListener("click", loadSummary);
    document.getElementById("clear").addEventListener("click", async () => {
      if (!confirm("确定清空当前测试数据？")) return;
      await fetch("/api/admin/clear", { method: "POST" });
      await loadSummary();
    });
    loadSummary();
    setInterval(loadSummary, 15000);
  </script>
</body>
</html>`;
}
