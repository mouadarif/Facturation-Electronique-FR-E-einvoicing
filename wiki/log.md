# Wiki log

Append-only maintenance record. Use entries starting with `## [YYYY-MM-DD] type | title` so the log stays parseable.

## [2026-04-26] refactor | Persistent wiki architecture

- Added `AGENTS.md` as the schema for maintaining the knowledge base.
- Added `wiki/index.md` as the content-oriented catalog.
- Added this `wiki/log.md` as the chronological maintenance log.
- Cleaned the main query/source/journal entry pages to UTF-8 markdown.
- Kept raw documents immutable and documented the source/wiki/generated layers.

## [2026-04-26] synthesis | AFNOR norms, legal definitions and case notions

- Added `wiki/06_normes_afnor.md` for the role of XP Z12-012, XP Z12-013, XP Z12-014 and Annexe A.
- Added `juridique/02_DEFINITIONS_NOTIONS_REFORME.md` for legal definitions and official references.
- Added `juridique/03_NOTIONS_PAR_CAS_REFORME.md` for the notion carried by each app case.
- Added `src/data/annexAReferences.js` to link app cases to exact XP Z12-014 Annexe A pages.

## [2026-04-26] security | Production-readiness checks

- Hardened `local-viewer.html` by moving script logic to `local-viewer.js`, adding CSP and allowing only documented local folders.
- Added `vite.config.js` security headers and localhost binding for Vite usage.
- Added `tools/serve-secure.mjs` as the recommended production-like preview server.
- Expanded `tools/wiki-health.mjs` to check catalog integrity, page index integrity, source separation, app data coherence, viewer hardening and secrets.
- Expanded `tools/check-links.mjs` to test official links extracted from wiki, legal notes and canonical app source data.

## [2026-04-26] synthesis | Functional architecture diagram

- Added `wiki/07_architecture_outil.md` with ASCII diagrams of the tool, knowledge layers, source ingestion, user navigation, security boundaries and test flow.

## [2026-05-10] synthesis | Detailed app case 2

- Added `wiki/cas_applicables/cas_02_facture_deja_payee.md`.
- Documented the distinction between a fully paid order at order time and an advance payment invoice.
- Linked cases 1 and 2 from `wiki/index.md` and the Annex A case matrix.

## [2026-05-10] synthesis | Case 2 notation decoding

- Expanded case 2 with a dedicated decoding section for `BT-*`, `BR-*`, `B/S/M` prefixes and `1/2/4` suffixes.
- Clarified `BT-23`, `BT-9`, `BT-2`, `BT-3`, `BT-115`, code `386` and `BR-FR-08`.
