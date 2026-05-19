import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const dryRun = process.argv.includes("--dry-run");
const manifestPath = resolve(root, "art-sources.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const downloaded = [];

for (const item of manifest.items) {
  if (!item.directUrl || !item.asset) {
    continue;
  }

  const outputPath = resolve(root, item.asset);
  if (dryRun) {
    console.log(`[dry-run] ${item.character} -> ${item.asset}`);
    continue;
  }

  const response = await fetch(item.directUrl, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36",
      referer: item.sourcePage,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${item.directUrl}`);
  }

  await mkdir(dirname(outputPath), { recursive: true });
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, buffer);
  downloaded.push({
    id: item.id,
    character: item.character,
    asset: item.asset,
    bytes: buffer.length,
    sourcePage: item.sourcePage,
  });
  console.log(`${item.character} -> ${item.asset} (${buffer.length} bytes)`);
}

if (!dryRun) {
  await writeFile(
    resolve(root, "assets/characters-hires/crawl-manifest.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), downloaded }, null, 2),
  );
}
