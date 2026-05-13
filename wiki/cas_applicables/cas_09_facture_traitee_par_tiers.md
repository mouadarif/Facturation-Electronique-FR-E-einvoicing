# Cas 11 - Facture reçue et traitée par un tiers pour le compte de l’acheteur

Status: draft  
Last updated: 2026-05-11

## Résumé

Ce cas couvre une facture dont la **réception et/ou le traitement** (contrôle, rapprochement, comptabilisation, statuts) est réalisé par un **tiers gestionnaire** pour le compte de l’acheteur. La nuance clé: ce tiers n’est pas l’acheteur juridique ; il agit via **délégation** sur la plateforme de réception.

## Nuances importantes (avec autres cas)

### Nuance vs **Cas 12** (intermédiaire transparent)

- **Cas 11**: tiers gestionnaire “back-office” côté acheteur.
- **Cas 12**: intermédiaire transparent organise la gestion via une plateforme dédiée et peut produire des documents de synthèse/paiement.

### Nuance vs **Cas 3** (tiers payeur)

- **Cas 11**: le tiers **traite** (et éventuellement paye) pour l’acheteur ; l’important est l’accès aux factures/statuts.
- **Cas 3**: le tiers est principalement acteur du **paiement**.

## Exemple concret (focalisé sur la nuance)

Un cabinet comptable reçoit les factures fournisseurs de l’entreprise, les contrôle, pose les statuts (approuvée, en litige, etc.) et prépare le paiement. L’entreprise garde la responsabilité juridique, mais délègue les actions opérationnelles au tiers.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas 8 a 10** | Paiement dirige vers un tiers beneficiaire | **B2B e-invoicing / statuts** | Le sujet est le beneficiaire du paiement. |
| **Cas 11** | Facture recue et traitee par un tiers pour l'acheteur | **Routage / delegation via PA** | Le sujet est le traitement pour compte de l'acheteur. |
| **Cas 12** | Intermediaire transparent gestionnaire de facture | **Routage / organisation dediee** | Le tiers est structurant dans l'organisation de reception et de gestion. |

Difference centrale : le cas 11 ne change pas l'acheteur juridique et ne signifie pas que le tiers paie la facture; il traite seulement pour le compte de l'acheteur.

## Sources

- `src/data/cases.js` : cas applicatif 9 (libellé “Cas n°11”).
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=59` : Annexe A v1.3, cas n°11.
