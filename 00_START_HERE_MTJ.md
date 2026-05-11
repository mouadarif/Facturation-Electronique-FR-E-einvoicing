# Facture électronique - point d'entrée

Ce pack est une base de connaissance maintenue par agent autour de la réforme française de facturation électronique.

## Lire selon le besoin

- **Vue wiki persistante** : `wiki/index.md`
- **Hub de requête** : `wiki/00_query_hub.md`
- **Rôles des normes AFNOR** : `wiki/06_normes_afnor.md`
- **Définitions juridiques** : `juridique/02_DEFINITIONS_NOTIONS_REFORME.md`
- **Notions par cas de réforme** : `juridique/03_NOTIONS_PAR_CAS_REFORME.md`
- **Catalogue documentaire** : `notes/documentation_catalog.md`
- **Index page par page des PDF** : `notes/document_page_index.md`

## Architecture

- `docs_*`, `metier/`, `technique/`, `juridique/` : sources locales, notes métier et synthèses spécialisées.
- `wiki/` : couche de synthèse persistante, maintenue par l'agent, lisible dans Obsidian.
- `notes/` : catalogues, index et inventaires générés ou semi-générés.
- `src/` : application Vite qui expose les cas, les références et les tables.
- `tools/` : scripts de génération, contrôle et maintenance.

## Règle centrale

Les documents bruts ne sont pas réécrits pour répondre à une question. L'agent lit les sources, consolide les informations dans la wiki, note les contradictions et maintient les liens. Les réponses importantes doivent être réintégrées dans la wiki pour que la connaissance compose dans le temps.

## Démarrage app

```bash
npm install
npm run dev
```

## Vérification

```bash
npm test
```
