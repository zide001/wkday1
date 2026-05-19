import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/yangzide/Documents/Codex/2026-05-19/new-chat-2/outputs/person_company_miniprogram";
const inputPath = `${outputDir}/extracted_rows.json`;
const outputPath = `${outputDir}/负责人-公司-小程序整理表_已填充.xlsx`;

const payload = JSON.parse(await fs.readFile(inputPath, "utf8"));
const rows = payload.rows;
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

function statusLabel(row) {
  return row.status || row.raw_status || "未标注";
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

const sortedRows = [...rows].sort((a, b) => {
  return (
    (personOrder.get(a.person) || 99) - (personOrder.get(b.person) || 99) ||
    pnum(a.company_source) - pnum(b.company_source) ||
    pnum(a.source) - pnum(b.source) ||
    String(a.mini_program).localeCompare(String(b.mini_program), "zh-Hans-CN")
  );
});

const workbook = Workbook.create();

const detail = workbook.worksheets.add("整理明细");
const detailHeaders = [
  "负责人",
  "公司",
  "公司ID",
  "小程序",
  "小程序编号",
  "对应书目",
  "配置/权限状态",
  "公司沟通备注",
  "授权/管理员备注",
  "原文位置",
  "原文记录",
];
const detailValues = [
  detailHeaders,
  ...sortedRows.map((row) => [
    row.person,
    row.company,
    row.company_id,
    row.mini_program,
    row.mini_program_id,
    row.book,
    statusLabel(row),
    row.company_note,
    row.auth_note,
    row.source,
    row.source_text,
  ]),
];
detail.getRange(`A1:${colLetter(detailHeaders.length)}${detailValues.length}`).values = detailValues;

const summary = workbook.worksheets.add("按负责人汇总");
const summaryHeaders = ["负责人", "公司数", "小程序记录数", "已完成实验配置", "无/暂无权限", "不做配置", "未标注"];
const people = ["汪汪", "颜海波", "吕东帆"];
const summaryValues = [
  summaryHeaders,
  ...people.map((person) => {
    const personRows = rows.filter((row) => row.person === person);
    return [
      person,
      unique(personRows.map((row) => row.company)).length,
      personRows.length,
      personRows.filter((row) => statusLabel(row) === "已完成实验配置").length,
      personRows.filter((row) => /无权限|暂无权限|目前无权限/.test(statusLabel(row))).length,
      personRows.filter((row) => statusLabel(row) === "不做配置").length,
      personRows.filter((row) => statusLabel(row) === "未标注").length,
    ];
  }),
];
summary.getRange(`A1:${colLetter(summaryHeaders.length)}${summaryValues.length}`).values = summaryValues;

const companies = workbook.worksheets.add("公司汇总");
const companyHeaders = [
  "负责人",
  "公司",
  "公司ID",
  "公司沟通备注",
  "小程序记录数",
  "已完成实验配置",
  "无/暂无权限",
  "不做配置",
  "涉及小程序",
];
const companyMap = new Map();
for (const row of sortedRows) {
  const key = `${row.person}|${row.company}|${row.company_id}`;
  if (!companyMap.has(key)) companyMap.set(key, []);
  companyMap.get(key).push(row);
}
const companyValues = [
  companyHeaders,
  ...[...companyMap.values()].map((items) => {
    const first = items[0];
    const apps = unique(items.map((row) => `${row.mini_program}（${row.mini_program_id}）`)).join("、");
    return [
      first.person,
      first.company,
      first.company_id,
      first.company_note,
      items.length,
      items.filter((row) => statusLabel(row) === "已完成实验配置").length,
      items.filter((row) => /无权限|暂无权限|目前无权限/.test(statusLabel(row))).length,
      items.filter((row) => statusLabel(row) === "不做配置").length,
      apps,
    ];
  }),
];
companies.getRange(`A1:${colLetter(companyHeaders.length)}${companyValues.length}`).values = companyValues;

const source = workbook.worksheets.add("来源说明");
source.getRange("A1:B6").values = [
  ["项目", "说明"],
  ["源文档", payload.source_docx],
  ["抽取范围", `${payload.section_start} 到 ${payload.section_end} 之前的“按使用公司汇总”段落`],
  ["负责人映射", "文档中的“汪慧(wanghui.c)”按用户口径整理为“汪汪”；颜海波、吕东帆保持原名。"],
  ["小程序识别规则", "识别“小程序名（数字编号）”为小程序记录；“书名（0.x万）”只作为对应书目上下文。"],
  ["状态识别", "保留“已完成实验配置、无权限、暂无权限、目前无权限、不做配置”等原文状态。"],
];

function styleSheet(sheet, rowsCount, colsCount, widthMap = {}) {
  const lastCol = colLetter(colsCount);
  sheet.getRange(`A1:${lastCol}${rowsCount}`).format = {
    font: { name: "Arial", size: 10 },
    verticalAlignment: "top",
    wrapText: true,
  };
  sheet.getRange(`A1:${lastCol}1`).format = {
    font: { bold: true, color: "#FFFFFF" },
    fill: "#1F4E78",
    horizontalAlignment: "center",
    verticalAlignment: "middle",
    wrapText: true,
  };
  sheet.getRange(`A1:${lastCol}${rowsCount}`).format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };
  sheet.getRange("1:1").format.rowHeightPx = 32;
  for (const [col, width] of Object.entries(widthMap)) {
    sheet.getRange(`${col}:${col}`).format.columnWidthPx = width;
  }
}

styleSheet(detail, detailValues.length, detailHeaders.length, {
  A: 72,
  B: 220,
  C: 80,
  D: 140,
  E: 84,
  F: 220,
  G: 120,
  H: 260,
  I: 280,
  J: 72,
  K: 360,
});
styleSheet(summary, summaryValues.length, summaryHeaders.length, {
  A: 90,
  B: 90,
  C: 110,
  D: 120,
  E: 105,
  F: 90,
  G: 90,
});
styleSheet(companies, companyValues.length, companyHeaders.length, {
  A: 72,
  B: 220,
  C: 80,
  D: 260,
  E: 100,
  F: 120,
  G: 105,
  H: 90,
  I: 560,
});
styleSheet(source, 6, 2, { A: 130, B: 680 });

for (let r = 2; r <= detailValues.length; r += 1) {
  const status = String(detailValues[r - 1][6]);
  const range = detail.getRange(`G${r}:G${r}`);
  if (status === "已完成实验配置") {
    range.format = { fill: "#E2F0D9", font: { color: "#375623", bold: true } };
  } else if (/无权限|暂无权限|目前无权限/.test(status)) {
    range.format = { fill: "#FCE4D6", font: { color: "#9C0006", bold: true } };
  } else if (status === "不做配置") {
    range.format = { fill: "#E7E6E6", font: { color: "#666666", bold: true } };
  } else {
    range.format = { fill: "#FFF2CC", font: { color: "#7F6000" } };
  }
}

await fs.mkdir(outputDir, { recursive: true });

const detailCheck = await workbook.inspect({
  kind: "table",
  range: "整理明细!A1:K12",
  include: "values",
  tableMaxRows: 12,
  tableMaxCols: 11,
});
console.log(detailCheck.ndjson);

const summaryCheck = await workbook.inspect({
  kind: "table",
  range: "按负责人汇总!A1:G4",
  include: "values",
  tableMaxRows: 5,
  tableMaxCols: 8,
});
console.log(summaryCheck.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

await workbook.render({ sheetName: "整理明细", range: "A1:K30", scale: 2 });
await workbook.render({ sheetName: "按负责人汇总", range: "A1:G4", scale: 2 });
await workbook.render({ sheetName: "公司汇总", range: "A1:I20", scale: 2 });
await workbook.render({ sheetName: "来源说明", range: "A1:B6", scale: 2 });

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(outputPath);
