# Cas 12 - Intermédiaire transparent gestionnaire de facture pour son commettant acheteur

Status: draft  
Last updated: 2026-05-11

## Résumé

Ce cas couvre un **intermédiaire transparent** qui gère des factures pour le compte de l’acheteur, souvent via une **adresse de facturation électronique dédiée** confiée à une plateforme de l’intermédiaire. La nuance importante est la séparation :

- vendeur ↔ acheteur (facture et cycle de vie restent “B2B”)
- intermédiaire ↔ acheteur (partage, synthèses, préparation de paiements)

## Nuances importantes (avec autres cas)

### Nuance vs **Cas 11** (tiers gestionnaire)

- **Cas 12** formalise un intermédiaire “transparent” avec une organisation de réception via sa plateforme et une adresse dédiée.
- **Cas 11** couvre plus généralement un tiers qui traite pour le compte de l’acheteur.

### Nuance vs **Cas 8–10** (affacturage / bénéficiaire)

- **Cas 12**: gestion/traitement pour l’acheteur.
- **Cas 8–10**: paiement dirigé vers un tiers bénéficiaire (souvent côté vendeur/finance).

## Exemple concret (focalisé sur la nuance)

Une agence ou un opérateur centralise la réception et le contrôle des factures d’un groupe, pose les statuts (approuvée/en litige), prépare un récapitulatif, puis l’acheteur paie (ou l’intermédiaire paie pour lui selon délégation).

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas 11** | Tiers gestionnaire qui recoit/traite la facture | **Routage / delegation via PA** | Delegation de traitement cote acheteur. |
| **Cas 12** | Intermediaire transparent gestionnaire de facture pour son commettant acheteur | **Routage / organisation dediee** | L'intermediaire organise la reception/gestion avec une adresse ou plateforme dediee. |
| **Cas 17** | Marketplace ou intermediaire de paiement | **B2B e-invoicing via PA** | L'intermediaire peut intervenir dans le paiement ou la facturation, pas seulement la gestion. |

Difference centrale : le cas 12 reste cote acheteur et gestion; le cas 17 peut deplacer le paiement et parfois l'emission de facture.

## Sources

- `src/data/cases.js` : cas applicatif 10 (libellé “Cas n°12”).
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=63` : Annexe A v1.3, cas n°12.
