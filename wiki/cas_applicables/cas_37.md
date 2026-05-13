# Cas n°39 - Facture multi-vendeurs / intermédiaire transparent regroupant des ventes de plusieurs vendeurs

Status: draft
Last updated: 2026-05-12

## Summary

Un intermédiaire regroupe des ventes réalisées par plusieurs vendeurs.

Dans l'application, ce cas est classe dans la famille **plateforme** avec le type **AFNOR XP Z12-014**. L'exemple local est: Une plateforme agrège des ventes de plusieurs fournisseurs sur un document ou processus.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Ne pas perdre le vendeur réel, les montants par vendeur et les mandats.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Ne pas perdre le vendeur réel, les montants par vendeur et les mandats.
- Page Annexe A v1.3 liee: page 134

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°38 - Factures avec sous-lignes et regroupements de lignes** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°39** | Facture multi-vendeurs / intermédiaire transparent regroupant des ventes de plusieurs vendeurs | B2B e-invoicing via PA selon qualification | Le multi-vendeur regroupe plusieurs vendeurs; il faut le distinguer d un intermediaire acheteur et d un intermediaire de paiement. |

Difference centrale : Le multi-vendeur regroupe plusieurs vendeurs; il faut le distinguer d un intermediaire acheteur et d un intermediaire de paiement.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=134`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°11 - Facture devant être reçue et traitée par un tiers pour le compte de l'acheteur](cas_09_facture_traitee_par_tiers.md)
- [Cas n°12 - Intermédiaire transparent gestionnaire de facture pour son commettant acheteur](cas_10_intermediaire_transparent_acheteur.md)
- [Cas n°17a / n°17b - Facture à payer à un tiers intermédiaire de paiement, avec ou sans mandat de facturation](cas_15.md)
