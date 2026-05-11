# Facture électronique France - Wiki Explorer

Contact, suggestions ou améliorations : [ibnelaryf.mouad@gmail.com](mailto:ibnelaryf.mouad@gmail.com)

Application locale et base documentaire pour explorer la réforme française de la facturation électronique : cas d'usage AFNOR, obligations e-invoicing/e-reporting, références officielles, contexte entreprise et impacts ERP.

Le projet sert à la fois de :

- **application web Vite** pour naviguer dans les cas de réforme ;
- **wiki de synthèse** pour capitaliser les connaissances métier, juridiques et techniques ;
- **assistant personnel de connaissance** pour aider l'utilisateur à clarifier les zones d'ombre de la réforme ;
- **pack documentaire local** avec sources, catalogues et index de pages PDF.

## Rôle du wiki

Le wiki est le coeur vivant du projet. Il ne sert pas seulement à stocker des notes : il accompagne l'utilisateur comme un assistant personnel de recherche, de clarification et de structuration.

Son objectif est de construire progressivement une base de connaissance solide, détaillée et traçable autour de la facturation électronique française. Les sujets ambigus, les contradictions entre sources, les questions ouvertes, les points fiscaux à qualifier et les impacts ERP sont documentés au fil de l'eau.

Ce travail est volontairement en continuation : la réforme évolue, les sources officielles changent, les interprétations se précisent et les cas métier se complètent. Le wiki permet donc de garder une mémoire durable des analyses, au lieu de repartir de zéro à chaque question.

Les principales entrées du wiki sont :

- `wiki/index.md` : carte générale des pages disponibles ;
- `wiki/00_query_hub.md` : point d'entrée pour orienter les questions ;
- `wiki/04_journal_evolutions_et_points_ouverts.md` : suivi des points ouverts, contradictions et éléments à surveiller ;
- `wiki/log.md` : journal chronologique des ajouts, synthèses et maintenances ;
- `juridique/`, `metier/`, `technique/` : synthèses spécialisées par angle d'analyse.

Lorsqu'une analyse devient utile au-delà d'une réponse ponctuelle, elle doit être intégrée dans le wiki pour enrichir la base de connaissance commune.

## Aperçu de l'application

L'application permet de consulter :

- les **44 cas d'usage B2B AFNOR XP Z12-014** ;
- les cas applicables au contexte entreprise ;
- les impacts ERP, formats, données BT et exemples concrets ;
- les références principales par cas ;
- les fiches **XP Z12-014 Annexe A** lorsqu'un mapping fiable existe ;
- les tables officielles converties en JSON : BT e-invoicing, e-reporting, statuts, annuaire ;
- un parcours de formation basé sur les cas complexes ;
- les sources locales ou officielles liées à chaque cas.

L'outil inclut aussi un viewer local sécurisé pour ouvrir les fichiers Markdown, CSV, JSON, TXT et PDF autorisés depuis l'interface.

## Prérequis

- Node.js **20.19+** ou **22.12+**
- npm

Vérifier les versions :

```bash
node --version
npm --version
```

## Installation

Depuis la racine du projet :

```bash
npm install
```

## Lancer en développement

```bash
npm run dev
```

Vite démarre sur `127.0.0.1`. Ouvrir l'URL affichée dans le terminal, généralement :

```text
http://127.0.0.1:5173/
```

## Utiliser l'application

Depuis l'écran d'accueil :

1. **Vue d'ensemble** : résumé du contexte entreprise et répartition des cas.
2. **Cas applicables** : cas filtrés selon le contexte métier, fiscal et ERP.
3. **44 cas AFNOR** : bibliothèque complète des cas d'usage, avec recherche et filtres par famille.
4. **Tables officielles** : consultation des tables BT, e-reporting, statuts et annuaire.
5. **Formation** : thèmes de formation reliés aux cas et obligations.

Dans une fiche de cas, l'application affiche :

- l'explication métier ou technique ;
- un exemple concret ;
- la référence documentaire principale ;
- la fiche AFNOR Annexe A si disponible ;
- les données BT et la hiérarchie des informations ;
- l'impact ERP ;
- les liens vers fichiers locaux et sources officielles.

## Build de production locale

```bash
npm run build
```

Le build est généré dans `dist/`.

## Preview sécurisée

Pour tester le build avec le serveur local sécurisé du projet :

```bash
npm run build
npm run preview
```

Par défaut, la preview écoute sur :

```text
http://127.0.0.1:4173/
```

Cette commande utilise `tools/serve-secure.mjs`. Le serveur applique des headers de sécurité et ne sert que `dist/`, le viewer local et les dossiers documentaires autorisés.

## Tests et vérifications

Lancer tous les contrôles :

```bash
npm test
```

Cette commande exécute :

- `npm run test:wiki` : santé de la wiki, liens Markdown, catalogues, cohérence des données app, durcissement du viewer ;
- `npm run test:links` : contrôle des liens officiels déclarés ;
- `npm run build` : compilation Vite.

Commandes utiles :

```bash
npm run test:wiki
npm run test:links
npm run build
```

## Contenu du dépôt

```text
src/                         Application Vite
src/data/                    Données structurées affichées par l'app
src/app/                     Logique d'affichage, filtres, modales et tables
wiki/                        Wiki principale de synthèse
juridique/                   Définitions et socle réglementaire
metier/                      Notes métier
technique/                   Notes techniques et architecture
docs_core/                   Sources officielles générales
docs_tech/                   Sources techniques, AFNOR, formats, exemples
docs_tpe/                    Documentation orientée TPE/PME
docs_platforms/              Documentation plateformes et PDP/PA
docs_international/          Sources internationales
docs_specific/               Sources spécifiques entreprise
notes/                       Catalogues, index PDF et listes de liens
tools/                       Scripts de test, génération et preview sécurisée
local-viewer.html            Viewer local des documents
local-viewer.js              Logique du viewer local
```

## Pages de lecture recommandées

- `wiki/index.md` : carte d'entrée de la wiki.
- `wiki/00_query_hub.md` : routeur de questions.
- `wiki/01_synthese_executive.md` : synthèse exécutive.
- `wiki/02_carte_technique.md` : carte technique.
- `wiki/06_normes_afnor.md` : rôle des normes AFNOR.
- `juridique/02_DEFINITIONS_NOTIONS_REFORME.md` : définitions juridiques.
- `notes/documentation_catalog.md` : catalogue documentaire.
- `notes/document_page_index.md` : index page par page des PDF.

## Maintenance documentaire

Les documents sources sont conservés comme références. Ils ne doivent pas être réécrits directement.

La connaissance durable doit être ajoutée dans :

- `wiki/`
- `juridique/`
- `metier/`
- `technique/`

Lorsqu'une source ou une synthèse importante est ajoutée :

1. mettre à jour les pages de synthèse concernées ;
2. mettre à jour les catalogues si le corpus change ;
3. ajouter une entrée dans `wiki/log.md` ;
4. lancer `npm test`.

Les règles détaillées sont dans `AGENTS.md`.

## Sécurité et limites

L'application est conçue pour un usage local ou une preview interne sur `127.0.0.1`.

Elle ne fournit pas d'authentification native. Pour une exposition intranet ou réseau, ajouter une couche externe : reverse proxy, SSO, VPN ou contrôle d'accès équivalent.

Ne pas exposer directement l'application sur Internet sans revue de sécurité.

## Avant publication sur GitHub

Avant de pousser ce dépôt, vérifier :

- que le dépôt Git pointe bien sur ce projet, pas sur le dossier utilisateur parent ;
- que les fichiers sensibles ou personnels ne sont pas suivis ;
- que les documents soumis à licence ou confidentiels peuvent être publiés ;
- que les sources AFNOR, supports entreprise et documents spécifiques ne violent pas de droits de diffusion ;
- que `.env`, exports internes, vidéos, fichiers personnels et données client ne sont pas inclus ;
- que `npm test` passe.

Pour un dépôt public, il est recommandé de publier uniquement le code, la wiki autorisée et les liens vers sources officielles publiques. Les PDF sous licence ou supports internes doivent rester hors dépôt public.

## Licence

À définir avant publication GitHub.

Si le dépôt contient des documents tiers, la licence du code ne couvre pas automatiquement ces documents.
