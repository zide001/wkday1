import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/yangzide/Documents/Codex/2026-05-19/new-chat-2/outputs/person_company_miniprogram";
const inputPath = `${outputDir}/extracted_rows.json`;
const outputPath = `${outputDir}/已完成实验配置_公司小程序_去重.xlsx`;

const payload = JSON.parse(await fs.readFile(inputPath, "utf8"));
const personOrder = new Map([
  ["汪汪", 1],
  ["颜海波", 2],
  ["吕东帆", 3],
]);

function pnum(source) {
  return Number(String(source || "").replace(/^P/, "")) || 0;
}

function colLetter(n) {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

const deduped = [];
const seen = new Set();
for (const row of payload.rows.filter((item) => item.status === "已完成实验配置")) {
  const key = `${row.person}|${row.company}|${row.mini_program}`;
  if (seen.has(key)) continue;
  seen.add(key);
  deduped.push(row);
}

deduped.sort((a, b) => (
  (personOrder.get(a.person) || 99) - (personOrder.get(b.person) || 99) ||
  pnum(a.company_source) - pnum(b.company_source) ||
  pnum(a.source) - pnum(b.source) ||
  String(a.mini_program).localeCompare(String(b.mini_program), "zh-Hans-CN")
));

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("已完成配置");
const headers = ["负责人", "公司", "公司ID", "小程序", "小程序编号", "对应书目", "原文位置"];
const values = [
  headers,
  ...deduped.map((row) => [
    row.person,
    row.company,
    row.company_id,
    row.mini_program,
    row.mini_program_id,
    row.book,
    row.source,
  ]),
];
sheet.getRange(`A1:${colLetter(headers.length)}${values.length}`).values = values;

const companyMap = new Map();
for (const row of deduped) {
  const key = `${row.person}|${row.company}|${row.company_id}`;
  if (!companyMap.has(key)) companyMap.set(key, []);
  companyMap.get(key).push(row);
}

const companySheet = workbook.worksheets.add("公司汇总");
const companyHeaders = ["负责人", "公司", "公司ID", "已完成小程序数", "已完成小程序"];
const companyValues = [
  companyHeaders,
  ...[...companyMap.values()].map((items) => {
    const first = items[0];
    return [
      first.person,
      first.company,
      first.company_id,
      items.length,
      items.map((row) => `${row.mini_program}（${row.mini_program_id}）`).join("、"),
    ];
  }),
];
companySheet.getRange(`A1:${colLetter(companyHeaders.length)}${companyValues.length}`).values = companyValues;

const notes = workbook.worksheets.add("说明");
notes.getRange("A1:B5").values = [
  ["项目", "说明"],
  ["筛选条件", "仅保留原文状态为“已完成实验配置”的小程序记录。"],
  ["去重口径", "按“负责人 + 公司 + 小程序”去重。"],
  ["记录数", `${deduped.length} 条`],
  ["源文档", payload.source_docx],
];

function styleSheet(targetSheet, rowsCount, colsCount, widths) {
  const lastCol = colLetter(colsCount);
  targetSheet.getRange(`A1:${lastCol}${rowsCount}`).format = {
    font: { name: "Arial", size: 10 },
    verticalAlignment: "top",
    wrapText: true,
  };
  targetSheet.getRange(`A1:${lastCol}1`).format = {
    font: { bold: true, color: "#FFFFFF" },
    fill: "#1F4E78",
    horizontalAlignment: "center",
    verticalAlignment: "middle",
    wrapText: true,
  };
  targetSheet.getRange(`A1:${lastCol}${rowsCount}`).format.borders = {
    preset: "all",
    style: "thin",
    color: "#D9E2F3",
  };
  targetSheet.getRange("1:1").format.rowHeightPx = 30;
  for (const [col, width] of Object.entries(widths)) {
    targetSheet.getRange(`${col}:${col}`).format.columnWidthPx = width;
  }
}

styleSheet(sheet, values.length, headers.length, {
  A: 80,
  B: 220,
  C: 80,
  D: 140,
  E: 85,
  F: 230,
  G: 80,
});
styleSheet(companySheet, companyValues.length, companyHeaders.length, {
  A: 80,
  B: 220,
  C: 80,
  D: 105,
  E: 520,
});
styleSheet(notes, 5, 2, { A: 120, B: 640 });

const check = await workbook.inspect({
  kind: "table",
  range: "已完成配置!A1:G25",
  include: "values",
  tableMaxRows: 25,
  tableMaxCols: 7,
});
console.log(check.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

await workbook.render({ sheetName: "已完成配置", range: "A1:G21", scale: 2 });
await workbook.render({ sheetName: "公司汇总", range: "A1:E10", scale: 2 });
await workbook.render({ sheetName: "说明", range: "A1:B5", scale: 2 });

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
