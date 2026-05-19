#!/usr/bin/env python3
"""Extract lightweight PRD signals from .docx files.

Usage:
  python3 extract_prd_signals.py --personal <dir> --learning <dir> --out <json>
"""

from __future__ import annotations

import argparse
import json
import re
import zipfile
from pathlib import Path


def read_docx_text(path: Path) -> str:
    text = ""
    with zipfile.ZipFile(path) as archive:
        for name in archive.namelist():
            if name.startswith("word/") and name.endswith(".xml"):
                xml = archive.read(name).decode("utf-8", "ignore")
                xml = re.sub(r"<w:tab[^>]*/>", "\t", xml)
                xml = re.sub(r"</w:p>", "\n", xml)
                xml = re.sub(r"<[^>]+>", "", xml)
                text += xml + "\n"
    return re.sub(r"\n{2,}", "\n", text).strip()


def first_match(pattern: str, text: str) -> str:
    match = re.search(pattern, text)
    return match.group(1).strip() if match else ""


def snippet_after(label: str, text: str, size: int = 280) -> str:
    index = text.find(label)
    if index < 0:
        return ""
    return re.sub(r"\s+", " ", text[index : index + size]).strip()


def extract(path: Path, category: str) -> dict[str, object]:
    text = read_docx_text(path)
    title = text.splitlines()[0] if text else path.stem
    return {
        "file": str(path),
        "category": category,
        "title": title[:160],
        "author": first_match(r"作者[:：]\s*([^\n\r\[]+)", text)[:40],
        "last_update": first_match(r"最后更新日[:：]\s*([^\n\r]+)", text)[:80],
        "background": snippet_after("需求背景", text),
        "goal": snippet_after("衡量目标", text) or snippet_after("目标指标", text),
        "experiment": snippet_after("实验设计", text),
        "launch": snippet_after("发布计划", text),
        "sections": re.findall(r"(?m)^([一二三四五六七八九十]+、[^\n]{2,60})", text)[:16],
        "text_length": len(text),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--personal", action="append", default=[])
    parser.add_argument("--learning", action="append", default=[])
    parser.add_argument("--out", required=True)
    args = parser.parse_args()

    records = []
    for category, dirs in [("personal", args.personal), ("learning", args.learning)]:
        for directory in dirs:
            for path in sorted(Path(directory).glob("*.docx")):
                records.append(extract(path, category))

    output = Path(args.out)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(records, ensure_ascii=False, indent=2))
    print(f"Wrote {len(records)} records to {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
