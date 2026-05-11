# 07 - Architecture fonctionnelle de l'outil

Status: current  
Last updated: 2026-04-26

Cette page décrit l'architecture de `facture_electronique_pack` avec un vocabulaire fonctionnel. L'objectif est de comprendre comment les sources officielles, la wiki maintenue par LLM, les index et l'application locale travaillent ensemble.

## Vue d'ensemble

```text
                           UTILISATEUR
                               |
                               v
                 +-----------------------------+
                 | Application locale Vite     |
                 | - cas d'usage               |
                 | - contexte entreprise       |
                 | - références documentaires  |
                 | - tables et liens           |
                 +-------------+---------------+
                               |
                 ouvre / consulte / filtre
                               |
                               v
       +-----------------------+-----------------------+
       |                                               |
       v                                               v
+-------------------+                         +-------------------+
| Viewer local      |                         | Wiki persistante  |
| - Markdown        |                         | - synthèses       |
| - CSV             |                         | - définitions     |
| - PDF page exacte |                         | - contradictions  |
| - texte brut      |                         | - liens croisés   |
+---------+---------+                         +---------+---------+
          |                                             ^
          | pointe vers                                  |
          v                                             | maintenue par
+-------------------+                         +---------+---------+
| Sources brutes    |                         | Agent LLM         |
| - DGFiP / AIFE    |                         | - lit les sources |
| - AFNOR / FNFE    |                         | - synthétise      |
| - Légifrance      |                         | - met à jour      |
| - Cegos/COMEXA    |                         | - journalise      |
+-------------------+                         +-------------------+
```

## Les 4 couches

```text
+==================================================================+
| 1. SOURCES BRUTES                                                 |
|------------------------------------------------------------------|
| Dossiers : docs_core/, docs_tech/, docs_platforms/, docs_tpe/,    |
| docs_international/, docs_specific/                               |
|                                                                  |
| Rôle : conserver les documents d'origine.                         |
| Règle : on lit ces fichiers, on ne les réécrit pas.               |
+==================================================================+
                              |
                              | lecture, extraction, vérification
                              v
+==================================================================+
| 2. WIKI PERSISTANTE                                               |
|------------------------------------------------------------------|
| Dossiers : wiki/, juridique/, metier/, technique/                 |
|                                                                  |
| Rôle : transformer les sources en connaissance exploitable.        |
| Contenu : synthèses, définitions, cas, contradictions, liens.      |
| Mainteneur : l'agent LLM.                                         |
+==================================================================+
                              |
                              | catalogage, liens, pages exactes
                              v
+==================================================================+
| 3. INDEX ET DONNÉES STRUCTURÉES                                   |
|------------------------------------------------------------------|
| Dossiers/fichiers : notes/, src/data/                             |
|                                                                  |
| Rôle : rendre la connaissance navigable par l'app.                 |
| Exemples : catalogue documentaire, index page PDF, sources,        |
| références principales, mapping Annexe A.                         |
+==================================================================+
                              |
                              | rendu utilisateur
                              v
+==================================================================+
| 4. APPLICATION LOCALE                                             |
|------------------------------------------------------------------|
| Fichiers : src/, index.html, local-viewer.html, local-viewer.js    |
|                                                                  |
| Rôle : naviguer dans les cas, ouvrir les sources, afficher les     |
| références et accéder aux pages exactes des documents.             |
+==================================================================+
```

## Circulation d'une nouvelle source

```text
Nouvelle source ajoutée
        |
        v
+----------------------+
| 1. Classer la source |
| officiel / AFNOR /   |
| spécifique entreprise|
+----------+-----------+
           |
           v
+-------------------------+
| 2. Ranger le fichier    |
| docs_core/              |
| docs_tech/afnor/        |
| docs_specific/...       |
+----------+--------------+
           |
           v
+----------------------------+
| 3. Lire et extraire        |
| points clés, définitions,  |
| cas, pages utiles          |
+----------+-----------------+
           |
           v
+----------------------------+
| 4. Mettre à jour la wiki   |
| synthèses, concepts,       |
| définitions, contradictions|
+----------+-----------------+
           |
           v
+----------------------------+
| 5. Mettre à jour les index |
| catalogue, page index,     |
| sourceReferenceIndex       |
+----------+-----------------+
           |
           v
+----------------------------+
| 6. Tester                  |
| npm test                   |
+----------------------------+
```

## Navigation utilisateur

```text
Utilisateur
   |
   +--> "Je veux comprendre un cas"
   |        |
   |        v
   |   Bibliothèque des cas
   |        |
   |        +--> définition métier
   |        +--> impact ERP
   |        +--> référence principale
   |        +--> fiche AFNOR Annexe A page exacte
   |
   +--> "Je veux vérifier une source"
   |        |
   |        v
   |   Carte source / viewer local
   |        |
   |        +--> PDF à la bonne page
   |        +--> Markdown lisible
   |        +--> CSV / table locale
   |
   +--> "Je veux comprendre la règle"
            |
            v
       Wiki persistante
            |
            +--> définitions juridiques
            +--> rôle des normes AFNOR
            +--> notions par cas
            +--> sources officielles
```

## Séparation générique / spécifique entreprise

```text
                   CONTENU GÉNÉRIQUE
                         |
       +-----------------+-----------------+
       |                                   |
       v                                   v
docs_core/                         docs_tech/afnor/
DGFiP, AIFE, Bercy                 XP Z12-012, 013, 014
                                   Annexe A


                   CONTENU SPÉCIFIQUE
                         |
                         v
          docs_specific/cegos_comexa_2026/
          supports Cegos / COMEXA / cas entreprise
```

Règle : les normes AFNOR et sources officielles génériques ne doivent pas être mélangées avec les supports Cegos/COMEXA. Les supports spécifiques peuvent éclairer un cas, mais ne deviennent pas la source normative principale.

## Rôle des principaux fichiers

```text
AGENTS.md
  -> règles de maintenance pour le LLM

wiki/index.md
  -> catalogue navigable de la wiki

wiki/log.md
  -> historique chronologique des changements

notes/documentation_catalog.md
  -> inventaire de tous les fichiers documentaires

notes/document_page_index.md
  -> index page par page des PDF

src/data/cases.js
  -> cartes de cas affichées dans l'application

src/data/primaryReferences.js
  -> référence principale conseillée pour chaque cas

src/data/annexAReferences.js
  -> lien entre cas applicatif et fiche XP Z12-014 Annexe A

src/data/sources.js
  -> sources visibles dans les cartes de l'application

local-viewer.html / local-viewer.js
  -> ouverture sécurisée des fichiers locaux

tools/wiki-health.mjs
  -> contrôle qualité documentaire et sécurité de base

tools/serve-secure.mjs
  -> preview locale sécurisée
```

## Sécurité fonctionnelle

```text
Demande d'ouverture d'un fichier
        |
        v
+----------------------------+
| Viewer local               |
| vérifie le chemin demandé  |
+-------------+--------------+
              |
      chemin autorisé ?
        /             \
      oui              non
      |                |
      v                v
ouvre le fichier   message neutre
dans le viewer     "chemin invalide"
```

Le viewer n'ouvre que les dossiers autorisés : `docs_*`, `wiki/`, `juridique/`, `metier/`, `technique/`, `notes/`. Les chemins externes, `javascript:`, chemins relatifs dangereux et fichiers sensibles sont refusés.

## Tests de santé

```text
npm test
   |
   +--> npm run test:wiki
   |      - fichiers requis
   |      - liens Markdown locaux
   |      - catalogue documentaire
   |      - index page PDF
   |      - séparation sources
   |      - cohérence app
   |      - durcissement viewer
   |      - absence de secrets évidents
   |
   +--> npm run test:links
   |      - liens officiels déclarés
   |      - liens https dans wiki/juridique/src-data
   |
   +--> npm run build
          - build Vite
```

## Limite importante

L'application n'a pas d'authentification native. Elle est conçue pour un usage local ou une preview sécurisée sur `127.0.0.1`.

Pour une exposition intranet ou réseau, il faut ajouter une couche externe :

```text
Utilisateur réseau
      |
      v
Reverse proxy sécurisé
SSO / OAuth / LDAP / VPN
      |
      v
Application facture_electronique_pack
```

Sans cette couche, l'application ne doit pas être exposée sur `0.0.0.0` ou Internet.
