# Cas n°14 - Co-traitance B2B

Status: draft
Last updated: 2026-05-12

## Summary

Plusieurs entreprises interviennent conjointement dans une opération de facturation.

Dans l'application, ce cas est classe dans la famille **sectoriel** avec le type **Co-traitance**. L'exemple local est: Un groupement de co-traitants facture une prestation à un acheteur B2B.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Tracer mandataire, co-traitants, part de chacun et paiement direct éventuel.
- Ne pas confondre les roles: acheteur/vendeur juridiques, payeur, beneficiaire du paiement, tiers gestionnaire et tiers facturant peuvent etre differents.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Tracer mandataire, co-traitants, part de chacun et paiement direct éventuel.
- Page Annexe A v1.3 liee: page 75

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°13 - Sous-traitance avec paiement direct ou délégation de paiement** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°14** | Co-traitance B2B | B2B e-invoicing via PA selon qualification | La commande par tiers porte sur l intervention d un tiers dans la commande ou le paiement; la co-traitance porte sur la repartition d une operation entre co-traitants. |

Difference centrale : La commande par tiers porte sur l intervention d un tiers dans la commande ou le paiement; la co-traitance porte sur la repartition d une operation entre co-traitants.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=75`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°5 - Frais payés par des collaborateurs avec facture au nom de l'entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
- [Cas n°13 - Sous-traitance avec paiement direct ou délégation de paiement](cas_11.md)
- [Cas n°15 - Facture de vente suite à commande ou paiement éventuel d'un tiers pour le compte de l'acheteur](cas_13.md)
