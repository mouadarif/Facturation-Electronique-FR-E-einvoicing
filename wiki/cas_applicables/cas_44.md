# Cas n°44 - Transactions avec les DROM / COM / TAAF

Status: draft
Last updated: 2026-05-12

## Summary

Opérations avec territoires ultramarins nécessitant une qualification territoriale.

Dans l'application, ce cas est classe dans la famille **b2b-int** avec le type **Territoires**. L'exemple local est: Une société de métropole facture ou livre vers un DROM, une COM ou les TAAF.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Maintenir tables territoires, pays, TVA, exonérations et routage.
- Pour l'international, distinguer e-invoicing domestique et e-reporting transaction; le lieu des parties et le flux physique peuvent changer la qualification.

## App interpretation

- Format attendu: Qualification territoriale avant e-invoicing/e-reporting
- Impact ERP: Maintenir tables territoires, pays, TVA, exonérations et routage.
- Page Annexe A v1.3 liee: page 154

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°43b - Transferts de stocks assimilés à des livraisons intracommunautaires** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°44** | Transactions avec les DROM / COM / TAAF | B2B international / e-reporting | DROM, COM et TAAF demandent une table territoriale dediee; ne pas appliquer mecaniquement le traitement France metropolitaine ou etranger. |

Difference centrale : DROM, COM et TAAF demandent une table territoriale dediee; ne pas appliquer mecaniquement le traitement France metropolitaine ou etranger.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=154`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°43 - Factures B2B internationales et e-reporting](cas_41.md)
- [Cas n°43a - Opérations triangulaires](cas_42.md)
- [Cas n°43b - Transferts de stocks assimilés à des livraisons intracommunautaires](cas_43.md)
