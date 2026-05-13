# Cas n°18 - Gestion des notes de débit

Status: draft
Last updated: 2026-05-12

## Summary

Document de débit à traiter dans le cycle de facturation et de correction.

Dans l'application, ce cas est classe dans la famille **statuts** avec le type **Note de débit**. L'exemple local est: Un acheteur émet une note de débit liée à un écart prix ou quantité.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Qualifier note de débit, avoir, facture rectificative et impact comptable.
- Quand un statut de cycle de vie ou un encaissement est implique, conserver la date, le montant, le motif et l'acteur emetteur du statut.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Qualifier note de débit, avoir, facture rectificative et impact comptable.
- Page Annexe A v1.3 liee: page 89

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°17a / n°17b - Facture à payer à un tiers intermédiaire de paiement, avec ou sans mandat de facturation** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°18** | Gestion des notes de débit | B2B e-invoicing via PA selon qualification | La note de debit corrige ou reclame un montant; l encaissement partiel/annulation concerne le cycle de paiement d une facture. |

Difference centrale : La note de debit corrige ou reclame un montant; l encaissement partiel/annulation concerne le cycle de paiement d une facture.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=89`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°2 - Facture déjà payée par l'acheteur ou un tiers payeur au moment de l'émission](cas_02_facture_deja_payee.md)
- [Cas n°3 - Facture à payer par un tiers payeur connu au moment de la facturation](cas_03_tiers_payeur_connu.md)
- [Cas n°4 - Facture à payer par l'acheteur avec prise en charge partielle par un tiers](cas_04_prise_en_charge_partielle.md)
