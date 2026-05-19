import json
import re
import zipfile
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path

BASE = Path("/Users/yangzide/Documents/Codex/2026-05-19/new-chat-2")
OUTPUT_DIR = BASE / "outputs" / "company_feedback"
COMPLETED_JSON = BASE / "outputs" / "person_company_miniprogram" / "extracted_rows.json"
PHASE1_XLSX = Path("/Users/yangzide/Downloads/04_表格数据/图片解锁小程序观测list.xlsx")
PHASE2_MD = Path("/Users/yangzide/WorkBuddy/2026-05-11-task-1/reports/2026-05-19.md")


def norm_name(name):
    if not name:
        return ""
    name = str(name).strip()
    return {"思悦识图": "思跃识图"}.get(name, name)


def pct(value, digits=1):
    if value is None:
        return ""
    return f"{value * 100:+.{digits}f}%"


def pct_from_percent_number(value):
    if value is None:
        return ""
    return f"{value:+.1f}%"


GROUP_LABELS = {
    "g1": "广告解锁",
    "g2": "直接展示图片",
}

EXPANSION_ASK = (
    "另外文生图准备扩量，目前有两个尺度版本，长篇已覆盖25本书、短篇约400本。"
    "已有实验反馈看下来，广告解锁图片更偏收入提升，收入可提升15%-30%+；"
    "直接展示图片更偏IPU提升，IPU约提升10%，收入约提升10%-20%。"
    "想问下这边还有哪些小程序愿意继续测试文生图？产品侧会按当前在投的书继续生图。"
)


def cell_to_col_row(ref):
    match = re.match(r"([A-Z]+)(\d+)", ref)
    if not match:
        return None, None
    letters, row = match.groups()
    col = 0
    for ch in letters:
        col = col * 26 + ord(ch) - 64
    return col, int(row)


def read_xlsx_values(path):
    ns = {
        "main": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
        "rel": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
        "pkgrel": "http://schemas.openxmlformats.org/package/2006/relationships",
    }
    with zipfile.ZipFile(path) as zf:
        shared = []
        if "xl/sharedStrings.xml" in zf.namelist():
            root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
            for si in root.findall("main:si", ns):
                parts = [t.text or "" for t in si.findall(".//main:t", ns)]
                shared.append("".join(parts))

        rels_root = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
        rels = {
            rel.attrib["Id"]: rel.attrib["Target"]
            for rel in rels_root.findall("pkgrel:Relationship", ns)
        }

        wb_root = ET.fromstring(zf.read("xl/workbook.xml"))
        sheets = {}
        for sheet in wb_root.findall(".//main:sheet", ns):
            name = sheet.attrib["name"]
            rel_id = sheet.attrib[f"{{{ns['rel']}}}id"]
            target = rels[rel_id]
            if not target.startswith("xl/"):
                target = "xl/" + target
            sheets[name] = target

        out = {}
        for name, target in sheets.items():
            root = ET.fromstring(zf.read(target))
            rows = defaultdict(dict)
            for c in root.findall(".//main:c", ns):
                ref = c.attrib.get("r", "")
                col, row = cell_to_col_row(ref)
                if not col:
                    continue
                cell_type = c.attrib.get("t")
                value = None
                if cell_type == "inlineStr":
                    texts = [t.text or "" for t in c.findall(".//main:t", ns)]
                    value = "".join(texts)
                else:
                    v = c.find("main:v", ns)
                    if v is not None and v.text is not None:
                        raw = v.text
                        if cell_type == "s":
                            value = shared[int(raw)]
                        else:
                            try:
                                value = float(raw)
                                if value.is_integer():
                                    value = int(value)
                            except ValueError:
                                value = raw
                rows[row][col] = value
            matrix = []
            if rows:
                max_row = max(rows)
                max_col = max(max(cols) for cols in rows.values())
                for r in range(1, max_row + 1):
                    matrix.append([rows[r].get(c) for c in range(1, max_col + 1)])
            out[name] = matrix
    return out


def read_phase1_metrics():
    sheets = read_xlsx_values(PHASE1_XLSX)
    rows = sheets.get("工作表2", [])
    metrics = {}
    for row in rows[1:]:
        if not row or not row[0] or row[0] == "总收入":
            continue
        app = norm_name(row[0])
        if not any(row[idx] is not None for idx in (2, 3, 6, 7)):
            continue
        if app in metrics:
            continue
        metrics[app] = {
            "book": row[1],
            "g1_ipu": row[2],
            "g1_revenue": row[3],
            "g1_users": row[5],
            "g2_ipu": row[6],
            "g2_revenue": row[7],
            "g2_users": row[9],
        }
    return metrics


def extract_pct(text):
    if not text or text == "-":
        return None
    match = re.search(r"([+-]\d+(?:\.\d+)?)%", str(text))
    return float(match.group(1)) if match else None


def read_phase2_metrics():
    text = PHASE2_MD.read_text(encoding="utf-8")
    in_appendix = False
    metrics = {}
    for line in text.splitlines():
        if line.strip() == "## 明细附录":
            in_appendix = True
            continue
        if in_appendix and line.startswith("## "):
            break
        if not in_appendix or not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if not cells or cells[0] in {"小程序", "--------"} or cells[0].startswith("---"):
            continue
        if len(cells) < 7:
            continue
        app = norm_name(cells[0])
        metrics[app] = {
            "expt_id": cells[1],
            "control_revenue": cells[2],
            "g1_revenue_text": cells[3],
            "g2_revenue_text": cells[4],
            "g1_revenue": extract_pct(cells[3]),
            "g2_revenue": extract_pct(cells[4]),
            "g1_exposure": extract_pct(cells[5]),
            "g2_exposure": extract_pct(cells[6]),
        }
    return metrics


def phase1_good_text(app, metrics):
    m = metrics.get(app)
    if not m:
        return ""
    candidates = []
    for group in ("g1", "g2"):
        revenue = m.get(f"{group}_revenue")
        ipu = m.get(f"{group}_ipu")
        if revenue is None and ipu is None:
            continue
        score = max(revenue or -999, ipu or -999)
        candidates.append((score, GROUP_LABELS[group], revenue, ipu))
    if not candidates:
        return ""
    score, group, revenue, ipu = max(candidates, key=lambda item: item[0])
    if (revenue or 0) <= 0.05 and (ipu or 0) <= 0.05:
        return ""
    pieces = []
    if revenue is not None and revenue > 0.05:
        pieces.append(f"收入 {pct(revenue, 1)}")
    if ipu is not None and ipu > 0.05:
        pieces.append(f"IPU {pct(ipu, 1)}")
    return f"历史观测：{group} " + "、".join(pieces)


def phase2_good_text(app, metrics, include_low_positive=False):
    m = metrics.get(app)
    if not m:
        return ""
    groups = []
    for key, name in (("g1", GROUP_LABELS["g1"]), ("g2", GROUP_LABELS["g2"])):
        revenue = m.get(f"{key}_revenue")
        exposure = m.get(f"{key}_exposure")
        if revenue is None and exposure is None:
            continue
        threshold_met = (revenue is not None and revenue > 5) or (exposure is not None and exposure > 5)
        low_positive = False
        if threshold_met or low_positive:
            parts = []
            if revenue is not None and revenue > 5:
                parts.append(f"收入 {pct_from_percent_number(revenue)}")
            if exposure is not None and exposure > 5:
                parts.append(f"曝光 {pct_from_percent_number(exposure)}")
            groups.append(f"{name} " + "、".join(parts))
    if not groups:
        return ""
    return "5月19日数据：" + "；".join(groups)


def app_line(app, phase1, phase2, include_low_positive=False):
    parts = [part for part in [phase2_good_text(app, phase2, include_low_positive), phase1_good_text(app, phase1)] if part]
    if not parts:
        return ""
    return f"{app}：" + "；".join(parts)


phase1 = read_phase1_metrics()
phase2 = read_phase2_metrics()
completed_payload = json.loads(COMPLETED_JSON.read_text(encoding="utf-8"))
completed = []
seen = set()
for row in completed_payload["rows"]:
    if row.get("status") != "已完成实验配置":
        continue
    key = (row["person"], row["company"], norm_name(row["mini_program"]))
    if key in seen:
        continue
    seen.add(key)
    copied = dict(row)
    copied["mini_program"] = norm_name(copied["mini_program"])
    completed.append(copied)

company_rows = defaultdict(list)
for row in completed:
    company_rows[(row["person"], row["company"], row["company_id"])].append(row)

manual_priority = {
    "杭州好量来科技有限公司": ["宇飞悦看"],
    "深圳丽佳传媒有限公司": ["掌心悦享", "凌墨快享", "雾日快享"],
    "长沙西几文化传媒有限公司": ["西几书悦", "砚秋书海", "陵越书海", "云舒悦媒", "汀兰书屋"],
    "深圳市思跃网络传媒有限公司": ["绘月轻读", "自远祝福"],
    "深圳市骐量科技有限公司": ["思跃识图"],
    "深圳市爆量科技有限公司": ["思跃种草"],
    "杭州竟源网络科技有限公司": ["枕月看吧", "孜孜悦看"],
    "杭州推宝科技有限公司": ["温澜悦读"],
    "杭州星橙优品科技有限公司": ["小春鲸文"],
}

cautions = {
    "杭州好量来科技有限公司": "希希悦看当前没有正向数据，建议先不主推。",
    "长沙西几文化传媒有限公司": "汀兰书屋曝光有提升，但收入暂未同步；如需提，只讲曝光侧，不作为收入放量口径。",
    "深圳市思跃网络传媒有限公司": "淡烛轻阅前期后段转弱且已关闭，建议不作为正向案例。",
    "深圳市爆量科技有限公司": "思跃种草5月19日收入回落，建议只作为“曾验证正向、后续继续观察”的口径，不建议强放量。",
    "杭州竟源网络科技有限公司": "芸香书楼收入负向，孜孜悦看未超过 5%，建议都不主讲；枕月看吧更适合反馈。",
    "杭州推宝科技有限公司": "温澜悦读只讲广告解锁这一组，避免把直接展示图片一起打包描述。",
}

feedback_rows = []
for key in sorted(company_rows, key=lambda item: ({"汪汪": 1, "颜海波": 2, "吕东帆": 3}.get(item[0], 9), item[1])):
    person, company, company_id = key
    apps = [row["mini_program"] for row in company_rows[key]]
    priority = [app for app in manual_priority.get(company, apps) if app in apps or app in phase1 or app in phase2]
    positive_items = [
        (app, app_line(app, phase1, phase2, include_low_positive=True))
        for app in priority
    ]
    positive_items = [(app, line) for app, line in positive_items if line]
    positive_lines = [line for _, line in positive_items]
    if not positive_lines:
        positive_lines = ["目前没有足够强的正向数据，建议先不做放量反馈，只保留继续观察口径。"]
        highlight_apps = ""
    else:
        highlight_apps = "、".join(app for app, _ in positive_items)
    bullet_text = "；".join(positive_lines)
    caution = cautions.get(company, "")
    data_message = f"【{company}】建议反馈：{bullet_text}。"
    message = f"{data_message} {EXPANSION_ASK}"
    feedback_rows.append(
        {
            "person": person,
            "company": company,
            "company_id": company_id,
            "configured_apps": "、".join(apps),
            "highlight_apps": highlight_apps,
            "positive_points": bullet_text,
            "expansion_ask": EXPANSION_ASK,
            "data_message": data_message,
            "caution": caution,
            "message": message,
        }
    )

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
(OUTPUT_DIR / "company_feedback_rows.json").write_text(json.dumps(feedback_rows, ensure_ascii=False, indent=2), encoding="utf-8")

md_lines = [
    "# 图片解锁公司反馈话术",
    "",
    "口径：只取已完成实验配置的小程序；参考观测表和 2026-05-19 日报；只讲收入/曝光/IPU 高于 5% 的正向点；话术末尾统一加入文生图扩量邀约。",
    "",
]
for row in feedback_rows:
    block = [f"## {row['person']}｜{row['company']}", "", row["message"], ""]
    if row["caution"]:
        block.extend([f"内部注意：{row['caution']}", ""])
    md_lines.extend(
        block
    )
(OUTPUT_DIR / "图片解锁_公司反馈话术.md").write_text("\n".join(md_lines), encoding="utf-8")

print(json.dumps({
    "companies": len(feedback_rows),
    "markdown": str(OUTPUT_DIR / "图片解锁_公司反馈话术.md"),
    "json": str(OUTPUT_DIR / "company_feedback_rows.json"),
}, ensure_ascii=False, indent=2))
