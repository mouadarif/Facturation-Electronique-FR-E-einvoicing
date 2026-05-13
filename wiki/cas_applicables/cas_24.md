# Cas n°26 - Factures avec clause de réserve contractuelle

Status: draft
Last updated: 2026-05-12

## Summary

Facture intégrant une réserve contractuelle ayant un impact sur traitement ou paiement.

Dans l'application, ce cas est classe dans la famille **sectoriel** avec le type **Réserve contractuelle**. L'exemple local est: Une partie du montant est retenue jusqu'à levée d'une réserve.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Tracer réserve, échéance, retenue et statut de traitement.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Tracer réserve, échéance, retenue et statut de traitement.
- Page Annexe A v1.3 liee: page 111

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°25 - Gestion des bons et cartes cadeaux** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°26** | Factures avec clause de réserve contractuelle | B2B e-invoicing via PA selon qualification | Une reserve contractuelle affecte le traitement ou le paiement; l encaissement partiel decrit les paiements transmis dans le cycle de vie. |

Difference centrale : Une reserve contractuelle affecte le traitement ou le paiement; l encaissement partiel decrit les paiements transmis dans le cycle de vie.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=111`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°5 - Frais payés par des collaborateurs avec facture au nom de l'entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
- [Cas n°13 - Sous-traitance avec paiement direct ou délégation de paiement](cas_11.md)
- [Cas n°14 - Co-traitance B2B](cas_12.md)
