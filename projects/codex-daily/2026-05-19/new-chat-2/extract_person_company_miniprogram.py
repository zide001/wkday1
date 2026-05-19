import json
import re
from collections import defaultdict

from docx import Document

DOCX_PATH = "/Users/yangzide/Downloads/05_文档/其他文档/图片解锁实验报告.docx"
OUT_PATH = "/Users/yangzide/Documents/Codex/2026-05-19/new-chat-2/outputs/person_company_miniprogram/extracted_rows.json"


def clean(text: str) -> str:
    text = text.replace("\u200c", "").replace("\u200d", "").replace("\ufeff", "")
    text = text.replace("\xa0", " ")
    return re.sub(r"[ \t]+", " ", text).strip()


def person_from_suffix(suffix: str) -> tuple[str, str]:
    if "汪慧" in suffix:
        return "汪汪", "汪慧(wanghui.c)"
    if "颜海波" in suffix:
        return "颜海波", "颜海波(yanhaibo)"
    if "吕东帆" in suffix:
        return "吕东帆", "吕东帆(lvdongfan)"
    return "", ""


def strip_person_marker(suffix: str) -> str:
    suffix = re.sub(r"@\s*汪慧\(wanghui\.c\)", "", suffix)
    suffix = re.sub(r"@\s*颜海波\(yanhaibo\)", "", suffix)
    suffix = re.sub(r"@\s*吕东帆\(lvdongfan\)", "", suffix)
    suffix = suffix.replace("@", "")
    return clean(suffix)


def classify_status(raw: str) -> str:
    raw = raw or ""
    if "已完成实验配置" in raw:
        return "已完成实验配置"
    if "不做配置" in raw:
        return "不做配置"
    if "暂无权限" in raw:
        return "暂无权限"
    if "目前无权限" in raw:
        return "目前无权限"
    if "无权限" in raw:
        return "无权限"
    return ""


doc = Document(DOCX_PATH)
paragraphs = [(i, clean(p.text)) for i, p in enumerate(doc.paragraphs)]
paragraphs = [(i, t) for i, t in paragraphs if t]

start = next(i for i, t in paragraphs if "按使用公司汇总" in t)
end = next(i for i, t in paragraphs if i > start and "0309 白露伴读数据更新" in t)

company_re = re.compile(r"^(?:(\d+)\.\s*)?(.+?有限公司)-(\d+)(.*)$")
book_re = re.compile(r"(.+?)（([0-9.]+万)）")
app_re = re.compile(r"([^（）]+?)（(\d+)）([^（）]*)")
admin_keywords = ("小程序管理员", "WE分析", "管理员")

rows = []
admin_notes = defaultdict(list)
current = None
current_book = ""

for para_idx, text in paragraphs:
    if para_idx < start or para_idx >= end:
        continue
    if "按使用公司汇总" in text:
        continue

    company_match = company_re.match(text)
    if company_match and "@" in company_match.group(4):
        suffix = clean(company_match.group(4))
        person, original_person = person_from_suffix(suffix)
        current = {
            "company_order": company_match.group(1) or "",
            "company": clean(company_match.group(2)),
            "company_id": company_match.group(3),
            "person": person,
            "original_person": original_person,
            "company_note": strip_person_marker(suffix),
            "company_source": f"P{para_idx}",
        }
        current_book = ""
        continue

    if not current:
        continue

    working = text
    book_match = book_re.match(working)
    if book_match:
        current_book = clean(book_match.group(1))
        working = clean(working[book_match.end():])
        if not working:
            continue

    app_matches = list(app_re.finditer(working))
    if app_matches:
        for match in app_matches:
            app_name = clean(match.group(1).strip(" ：:，,、-—"))
            raw_status = clean(match.group(3).strip(" ：:，,、-—"))
            detected_status = classify_status(raw_status) or classify_status(text)
            if not raw_status and detected_status:
                raw_status = detected_status
            rows.append(
                {
                    **current,
                    "book": current_book,
                    "mini_program": app_name,
                    "mini_program_id": match.group(2),
                    "status": detected_status,
                    "raw_status": raw_status,
                    "auth_note": "",
                    "source": f"P{para_idx}",
                    "source_text": text,
                }
            )
        continue

    if any(keyword in working for keyword in admin_keywords):
        note_text = working
        name_part = re.split(r"\s+(?:小程序管理员|管理员|WE分析)", note_text, maxsplit=1)[0]
        name_part = clean(name_part.strip(" ：:，,、-—"))
        if name_part:
            key = (current["company"], name_part)
            admin_notes[key].append(f"P{para_idx}: {note_text}")

for row in rows:
    key = (row["company"], row["mini_program"])
    if key in admin_notes:
        row["auth_note"] = "；".join(admin_notes[key])

payload = {
    "source_docx": DOCX_PATH,
    "section_start": f"P{start}",
    "section_end": f"P{end}",
    "rows": rows,
}

with open(OUT_PATH, "w", encoding="utf-8") as f:
    json.dump(payload, f, ensure_ascii=False, indent=2)

print(json.dumps({
    "rows": len(rows),
    "companies": len({r["company"] for r in rows}),
    "people": sorted({r["person"] for r in rows}),
    "output": OUT_PATH,
}, ensure_ascii=False, indent=2))
