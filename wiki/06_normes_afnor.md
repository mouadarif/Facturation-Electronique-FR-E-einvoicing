# 06 - Roles des normes AFNOR

Cette page sert de repere rapide pour comprendre le role de chaque norme AFNOR presente dans le pack local. Les PDF restent les sources de verification.

## Vue rapide

| Norme | Role principal | A utiliser pour |
| --- | --- | --- |
| XP Z12-012 | Formats, profils, regles et statuts du socle minimum | Savoir comment structurer une facture, un avoir ou un statut de cycle de vie |
| XP Z12-013 | API entre les systemes d'information et les plateformes de dematerialisation | Concevoir l'integration SI / ERP / PDP |
| XP Z12-014 | Cas d'usage B2B applicables a la reforme | Comprendre les scenarios metier et leur traitement dans les flux |
| XP Z12-014 Annexe A | Detail normatif des principaux cas d'usage specifiques | Retrouver les fiches detaillees : affacturage, mandat, auto-facturation, tiers, litiges, acomptes, etc. |

## XP Z12-012 - formats, profils et statuts

Fichier local : `docs_tech/afnor/afnor_xp_z12_012_2025.pdf`

Cette norme decrit le contenu technique des messages de facture et de cycle de vie. Elle couvre notamment :
- les formats et profils de facture electronique ;
- les profils EN16931 et EXTENDED-CTC-FR ;
- les syntaxes UBL, CII et Factur-X ;
- les regles de gestion francaises ;
- les statuts de cycle de vie et leur structure de message.

Elle repond a la question : "comment representer techniquement la facture et ses statuts ?"

## XP Z12-013 - API plateformes

Fichier local : `docs_tech/afnor/afnor_xp_z12_013_api_plateformes_dematerialisation.pdf`

Cette norme decrit les API permettant d'interfacer les systemes d'information des entreprises avec les plateformes de dematerialisation. Elle sert a cadrer :
- les appels entre ERP, SI, OD et PDP ;
- l'envoi, la recherche et la reception des factures ;
- l'echange des statuts de cycle de vie ;
- les principes d'authentification, de comptes API et de perimetre d'acces.

Elle repond a la question : "comment connecter techniquement l'entreprise a sa plateforme ?"

## XP Z12-014 - cas d'usage B2B

Fichier local : `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`

Cette norme decrit les cas d'usage B2B applicables dans le cadre de la reforme. Elle donne une lecture fonctionnelle des scenarios :
- cas nominal d'echange de facture ;
- rejet a l'emission ou en reception ;
- refus par l'acheteur ;
- litige suivi d'un avoir ou d'une facture rectificative ;
- principes de traitement des cas specifiques.

Elle repond a la question : "quel scenario metier applique-t-on et quelles actions doivent suivre ?"

## XP Z12-014 Annexe A - fiches de cas specifiques

Fichier local : `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf`

Cette annexe normative detaille les principaux cas d'usage specifiques. Elle est la source la plus utile pour documenter les cartes de cas d'usage avancees :
- affacturage et changement de beneficiaire ;
- mandat de facturation et tiers facturant ;
- auto-facturation ;
- tiers payeur, agent d'acheteur, agent de vendeur ;
- sous-traitance, co-traitance et mandataire ;
- acomptes, escomptes, notes de debit, notes de restaurant, operations a la marge, etc.

Elle repond a la question : "comment traiter precisement ce cas particulier dans les flux et les statuts ?"

## Attention juridique

Ces normes donnent un cadre normatif et operationnel pour la reforme. Pour une definition strictement legale, il faut verifier les textes officiels applicables : CGI, Code monetaire et financier, BOFiP, decrets et documentation administrative.
