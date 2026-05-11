from __future__ import annotations

import json
import re
from pathlib import Path

from pypdf import PdfReader


REPO_ROOT = Path(__file__).resolve().parent.parent
TMP_JSON = REPO_ROOT / "tools" / ".tmp_sources.json"
OUTPUT_JS = REPO_ROOT / "src" / "data" / "sourceReferenceIndex.js"


def clean_text(value: str) -> str:
    value = value.replace("\r", " ").replace("\n", " ")
    value = re.sub(r"[#*_>`|]", " ", value)
    value = re.sub(r"\[(.*?)\]\((.*?)\)", r"\1", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def markdown_excerpt(path: Path) -> str:
    text = path.read_text(encoding="utf-8", errors="ignore")
    return clean_text(text)[:420]


def pdf_excerpt(path: Path) -> tuple[str, int]:
    reader = PdfReader(str(path))
    excerpt = ""
    for page in reader.pages[:3]:
        text = clean_text(page.extract_text() or "")
        if text:
            excerpt = text[:420]
            break
    return excerpt, len(reader.pages)


def build_record(source: dict) -> dict:
    relative_path = source.get("local", "")
    local_path = REPO_ROOT / relative_path
    exists = local_path.exists()
    suffix = local_path.suffix.lower()

    record = {
      "id": source["id"],
      "label": source["label"],
      "type": source["type"],
      "localRelativePath": relative_path.replace("\\", "/"),
      "localExists": exists,
      "localKind": suffix[1:] if suffix else "text",
      "localUrl": f"/{relative_path.replace('\\', '/')}",
      "localPage": None,
      "localPageLabel": "Document local",
      "pageCount": None,
      "excerpt": "",
    }

    if not exists:
        record["localUrl"] = ""
        record["localPageLabel"] = "Lien officiel"
        return record

    if suffix == ".pdf":
        excerpt, pages = pdf_excerpt(local_path)
        record["excerpt"] = excerpt
        record["localPage"] = 1
        record["localPageLabel"] = "Page 1"
        record["pageCount"] = pages
        record["localUrl"] = f"/{relative_path.replace('\\', '/')}#page=1"
        return record

    if suffix in {".md", ".csv", ".txt"}:
        record["excerpt"] = markdown_excerpt(local_path)
        if suffix == ".csv":
            record["localPageLabel"] = "Table locale"
        elif suffix == ".md":
            record["localPageLabel"] = "Note locale"
        return record

    if suffix == ".zip":
        record["excerpt"] = "Archive officielle telechargee localement. Utiliser ce fichier pour retrouver les exemples, schemas et annexes du lot officiel."
        record["localPageLabel"] = "Archive locale"
        return record

    return record


def main() -> None:
    sources = json.loads(TMP_JSON.read_text(encoding="utf-8"))
    records = [build_record(source) for source in sources]
    OUTPUT_JS.write_text(
        "export const sourceReferenceIndex = "
        + json.dumps(records, ensure_ascii=True, indent=2)
        + ";\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
