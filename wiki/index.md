# Wiki index

Status: current  
Last updated: 2026-04-26

This index is the content-oriented map of the persistent wiki. Read it before answering questions against the knowledge base.

## Entry points

| Page | Purpose |
| --- | --- |
| [00 - Hub de requête](00_query_hub.md) | Query router for the corpus. |
| [01 - Synthèse exécutive](01_synthese_executive.md) | Short business summary of the reform and stable dates. |
| [02 - Carte technique](02_carte_technique.md) | Technical map: PDP, OD, PPF, annuaire, formats and flows. |
| [03 - Sources officielles et liens](03_sources_officielles_et_liens.md) | Official links tracked by the wiki. |
| [04 - Journal des évolutions et points ouverts](04_journal_evolutions_et_points_ouverts.md) | Stable claims, watch items and contradictions. |
| [06 - Rôles des normes AFNOR](06_normes_afnor.md) | What each AFNOR norm does. |
| [07 - Architecture fonctionnelle de l'outil](07_architecture_outil.md) | Functional ASCII architecture of the tool and app. |
| [Log](log.md) | Chronological maintenance history. |

## Legal and definitions

| Page | Purpose |
| --- | --- |
| [Socle réglementaire](../juridique/01_SOCLE_REGLEMENTAIRE.md) | Legal pivot page and links to legal synthesis. |
| [Définitions juridiques des notions](../juridique/02_DEFINITIONS_NOTIONS_REFORME.md) | Clear legal definitions for notions used in the norms. |
| [Notions par cas de réforme](../juridique/03_NOTIONS_PAR_CAS_REFORME.md) | Case-by-case notion matrix for the app and reform cases. |

## Detailed app cases

| Page | Purpose |
| --- | --- |
| [Cas 1 - Multi-commande / multi-livraison](cas_applicables/cas_01_multi_commande_multi_livraison.md) | Detailed explanation of app case 1, including concrete examples for `S1`, `S2`, `BT-8`, TVA at encashment and option for debits. |
| [Cas 2 - Facture deja payee](cas_applicables/cas_02_facture_deja_payee.md) | Detailed explanation of app case 2, including the difference between an advance payment invoice and an order paid at order time. |

## Technical synthesis

| Page | Purpose |
| --- | --- |
| [Formats ZIP XML exemples](../technique/01_FORMATS_ZIPS_XML_EXEMPLES.md) | Formats, archives, examples and technical pointers. |
| [PDP scope officiel](../technique/pdp/02_PDP_SCOPE_OFFICIEL_ET_LISTE.md) | Platform scope and official platform list. |
| [Technical reference](../docs_tech/TECHNICAL_REFERENCE.md) | Technical reference notes when available. |
| [AFNOR folder readme](../docs_tech/afnor/README.md) | Inventory of local AFNOR PDFs. |

## Generated catalogs

| Page | Purpose |
| --- | --- |
| [Documentation catalog](../notes/documentation_catalog.md) | Full corpus catalog with path, scope and content definition. |
| [Document page index](../notes/document_page_index.md) | Page-level index of local PDFs with `#page=N` links. |
| [Official links CSV](../notes/official_links.csv) | CSV list of tracked official links. |

## App-facing knowledge

| File | Purpose |
| --- | --- |
| [Cases data](../src/data/cases.js) | The 44 app case cards. |
| [Primary references](../src/data/primaryReferences.js) | Main reference per app case. |
| [Annex A references](../src/data/annexAReferences.js) | XP Z12-014 Annexe A page mapping per app case. |
| [Sources](../src/data/sources.js) | Sources exposed in app reference cards. |

## Current synthesis

- The wiki treats raw sources as immutable.
- The current synthesis separates generic official/normative content from Cegos/COMEXA-specific support material.
- AFNOR roles are separated into:
  - XP Z12-012: invoice formats, profiles, rules and lifecycle statuses.
  - XP Z12-013: SI/ERP/OD/PDP API interfacing.
  - XP Z12-014: B2B use cases.
  - XP Z12-014 Annexe A: detailed specific use-case sheets.
- Legal definitions are maintained separately from AFNOR operational cases.
- App case cards now point to Annex A pages when a reliable mapping exists.

## Maintenance notes

- Update this file whenever a durable wiki page is added, deleted or materially repurposed.
- Add a chronological entry to [log.md](log.md) whenever this index changes.
