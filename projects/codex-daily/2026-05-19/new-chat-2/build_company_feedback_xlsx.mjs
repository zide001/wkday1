import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/yangzide/Documents/Codex/2026-05-19/new-chat-2/outputs/company_feedback";
const inputPath = `${outputDir}/company_feedback_rows.json`;
const outputPath = `${outputDir}/图片解锁_公司反馈话术_按负责人.xlsx`;

const rows = JSON.parse(await fs.readFile(inputPath, "utf8"));

function colLetter(n) {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("反馈话术");
const headers = ["负责人", "公司", "公司ID", "已完成配置小程序", "建议主讲小程序", "正向数据点", "数据话术", "扩量邀约", "可复制完整话术", "内部注意"];
const values = [
  headers,
  ...rows.map((row) => [
    row.person,
    row.company,
    row.company_id,
    row.configured_apps,
    row.highlight_apps,
    row.positive_points,
    row.data_message,
    row.expansion_ask,
    row.message,
    row.caution,
  ]),
];

sheet.getRange(`A1:${colLetter(headers.length)}${values.length}`).values = values;

const source = workbook.worksheets.add("来源口径");
source.getRange("A1:B6").values = [
  ["项目", "说明"],
  ["筛选对象", "仅使用前序清单中“已完成实验配置”的小程序，并按负责人+公司+小程序去重。"],
  ["观测表来源", "/Users/yangzide/Downloads/04_表格数据/图片解锁小程序观测list.xlsx"],
  ["日报来源", "/Users/yangzide/WorkBuddy/2026-05-11-task-1/reports/2026-05-19.md"],
  ["话术原则", "只讲收入/曝光/IPU 高于 5% 的正向点；负向、波动或未超过 5% 的项只放内部注意；末尾加入文生图扩量邀约。"],
  ["输出时间", "2026-05-19"],
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
  D: 260,
  E: 220,
  F: 520,
  G: 520,
  H: 620,
  I: 760,
  J: 320,
});
styleSheet(source, 6, 2, { A: 120, B: 760 });

const check = await workbook.inspect({
  kind: "table",
  range: "反馈话术!A1:J10",
  include: "values",
  tableMaxRows: 12,
  tableMaxCols: 10,
});
console.log(check.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

await workbook.render({ sheetName: "反馈话术", range: "A1:J10", scale: 2 });
await workbook.render({ sheetName: "来源口径", range: "A1:B6", scale: 2 });

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
