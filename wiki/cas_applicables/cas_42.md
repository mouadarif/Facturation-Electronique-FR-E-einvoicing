# Cas n°43a - Opérations triangulaires

Status: draft
Last updated: 2026-05-12

## Summary

Opérations impliquant plusieurs parties situées dans plusieurs pays.

Dans l'application, ce cas est classe dans la famille **b2b-int** avec le type **Opération internationale**. L'exemple local est: A vend à B mais la marchandise est livrée directement de C vers le client final.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Tracer pays des parties, flux physique, flux facture et régime TVA.
- Pour l'international, distinguer e-invoicing domestique et e-reporting transaction; le lieu des parties et le flux physique peuvent changer la qualification.

## App interpretation

- Format attendu: Qualification TVA et e-reporting selon circuit
- Impact ERP: Tracer pays des parties, flux physique, flux facture et régime TVA.
- Page Annexe A v1.3 liee: page 152

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°43 - Factures B2B internationales et e-reporting** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°43a** | Opérations triangulaires | B2B international / e-reporting | L operation triangulaire est une pratique specifique internationale; elle demande de distinguer flux physique, flux facture et pays des parties. |

Difference centrale : L operation triangulaire est une pratique specifique internationale; elle demande de distinguer flux physique, flux facture et pays des parties.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=152`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°43 - Factures B2B internationales et e-reporting](cas_41.md)
- [Cas n°43b - Transferts de stocks assimilés à des livraisons intracommunautaires](cas_43.md)
- [Cas n°44 - Transactions avec les DROM / COM / TAAF](cas_44.md)
