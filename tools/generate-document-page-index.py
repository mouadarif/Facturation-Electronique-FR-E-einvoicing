from __future__ import annotations

import csv
import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
DOC_DIRS = [
    "docs_core",
    "docs_tech",
    "docs_tpe",
    "docs_platforms",
    "docs_international",
    "docs_specific",
]


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def page_title(text: str, fallback: str) -> str:
    lines = [clean_text(line) for line in text.splitlines()]
    lines = [line for line in lines if line and len(line) > 2]
    if not lines:
        return fallback
    return lines[0][:120]


def iter_pdf_paths() -> list[Path]:
    paths: list[Path] = []
    for folder in DOC_DIRS:
        base = ROOT / folder
        if base.exists():
            paths.extend(base.rglob("*.pdf"))
    return sorted(paths)


def main() -> None:
    rows: list[dict[str, str | int]] = []
    for pdf_path in iter_pdf_paths():
        rel_path = pdf_path.relative_to(ROOT).as_posix()
        reader = PdfReader(str(pdf_path))
        for index, page in enumerate(reader.pages, start=1):
            text = clean_text(page.extract_text() or "")
            rows.append(
                {
                    "path": rel_path,
                    "page": index,
                    "page_url": f"/{rel_path}#page={index}",
                    "title_guess": page_title(text, f"{pdf_path.stem} page {index}"),
                    "text_preview": text[:500],
                }
            )

    csv_path = ROOT / "notes" / "document_page_index.csv"
    with csv_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["path", "page", "page_url", "title_guess", "text_preview"])
        writer.writeheader()
        writer.writerows(rows)

    md_path = ROOT / "notes" / "document_page_index.md"
    grouped: dict[str, list[dict[str, str | int]]] = {}
    for row in rows:
        grouped.setdefault(str(row["path"]), []).append(row)

    with md_path.open("w", encoding="utf-8") as handle:
        handle.write("# Document Page Index\n\n")
        handle.write("Generated page-level index for local PDF files. Each row has a page URL using native browser PDF anchors (`#page=N`).\n\n")
        handle.write(f"- PDF files indexed: {len(grouped)}\n")
        handle.write(f"- Pages indexed: {len(rows)}\n")
        handle.write("- CSV version: `notes/document_page_index.csv`\n\n")
        for path, items in sorted(grouped.items()):
            handle.write(f"## `{path}`\n\n")
            handle.write("| Page | Title guess | Link |\n")
            handle.write("| ---: | --- | --- |\n")
            for row in items:
                title = str(row["title_guess"]).replace("|", "/")
                handle.write(f"| {row['page']} | {title} | `{row['page_url']}` |\n")
            handle.write("\n")

    print(f"Indexed {len(rows)} pages from {len(grouped)} PDFs")


if __name__ == "__main__":
    main()
