# Agent wiki maintainer schema

This repository is a persistent knowledge base for the French e-invoicing reform. The agent maintains the wiki as a compounding artifact. Raw sources are read, not rewritten. Durable synthesis belongs in markdown pages.

## Layers

### Raw sources

Raw or source-like material lives in:

- `docs_core/`
- `docs_tech/`
- `docs_tpe/`
- `docs_platforms/`
- `docs_international/`
- `docs_specific/`
- `.cache/official_specs/` when present

Treat these as source of truth. Do not edit PDFs, ZIPs or imported source files. When a source is superseded, keep it for traceability and mark the newer source in the wiki/catalog.

### Wiki

The persistent synthesis lives mainly in:

- `wiki/`
- `juridique/`
- `metier/`
- `technique/`

The agent owns this layer. It may create, update and cross-link pages when sources or questions add durable knowledge.

### Generated indexes

Navigation and generated references live in:

- `notes/documentation_catalog.md`
- `notes/document_page_index.md`
- `src/data/sourceReferenceIndex.js`

Regenerate these with the scripts in `tools/` when source references change.

## Required wiki files

- `wiki/index.md` is content-oriented. It lists key pages, one-line purpose, category and maintenance notes.
- `wiki/log.md` is chronological and append-only. Every ingest, major query synthesis, lint pass or refactor gets an entry.
- `wiki/00_query_hub.md` is the user-facing query router.
- `wiki/04_journal_evolutions_et_points_ouverts.md` tracks stable claims, watch items and contradictions.

## Page conventions

Use UTF-8 markdown. Prefer short stable titles. Use relative markdown links for wiki navigation. Use explicit source paths for local files.

Recommended page structure:

```markdown
# Title

Status: draft | current | needs-review
Last updated: YYYY-MM-DD

## Summary

## Key points

## Sources

## Related pages
```

YAML frontmatter is optional for now. If Dataview becomes important, add frontmatter consistently in a dedicated refactor.

## Ingest workflow

When a new source arrives:

1. Identify whether it is generic official, generic normative, technical, legal, company-specific or obsolete.
2. Store it in the appropriate raw/source folder without modifying the source itself.
3. Update `notes/documentation_catalog.md` and `notes/documentation_catalog.csv` if the corpus changed.
4. If it is a PDF, regenerate `notes/document_page_index.md` and `notes/document_page_index.csv`.
5. Read the source and create or update durable synthesis pages.
6. Update affected entity/concept/case pages.
7. Record confirmations, contradictions and superseded claims in `wiki/04_journal_evolutions_et_points_ouverts.md`.
8. Update `wiki/index.md`.
9. Append one entry to `wiki/log.md` using the format `## [YYYY-MM-DD] ingest | Source title`.
10. Run `npm test`.

## Query workflow

When answering a question:

1. Read `wiki/index.md` first.
2. Open the relevant wiki pages.
3. Only go to raw PDFs/sources when the wiki is missing detail or a precise citation is needed.
4. If the answer creates durable synthesis, file it back into a wiki page.
5. Append a `query` or `synthesis` entry to `wiki/log.md` when the wiki is updated.

## Lint workflow

Periodically run:

```bash
npm run test:wiki
```

The health check should catch missing required files, broken local markdown links and missing log/index references. For deeper maintenance, manually look for:

- contradictions between pages,
- stale claims after new sources,
- important concepts without their own page,
- orphan pages with no inbound links,
- app cases lacking legal or AFNOR references,
- source files not represented in the catalog.

## App integration

The app reads structured data from `src/data/`. When adding durable sources:

- add the source to `src/data/sources.js` if it should appear in app reference cards;
- regenerate `src/data/sourceReferenceIndex.js`;
- update case mappings in `src/data/annexAReferences.js` or `src/data/primaryReferences.js` only when the page-level reference is known;
- run `npm test`.

For production-like local preview, use `npm run preview` after `npm run build`. This uses `tools/serve-secure.mjs`, not the raw Vite preview server.

## Tone of maintenance

Prefer concise summaries, explicit uncertainty and exact links. Do not hide contradictions. If a new source supersedes an older statement, update the summary and leave a note in the journal/log.
