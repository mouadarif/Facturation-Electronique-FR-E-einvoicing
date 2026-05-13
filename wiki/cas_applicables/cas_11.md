# Cas n°13 - Sous-traitance avec paiement direct ou délégation de paiement

Status: draft
Last updated: 2026-05-12

## Summary

Facturation impliquant sous-traitant, titulaire et acheteur final avec paiement direct ou délégué.

Dans l'application, ce cas est classe dans la famille **sectoriel** avec le type **Sous-traitance**. L'exemple local est: Un sous-traitant est payé directement dans le cadre d'un marché.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Gérer le lien entre facture principale, facture de sous-traitance et tiers payeur.
- Ne pas confondre les roles: acheteur/vendeur juridiques, payeur, beneficiaire du paiement, tiers gestionnaire et tiers facturant peuvent etre differents.
- Les montants payes, restants dus, annules ou regularises doivent rester reconciliables avec la facture et les statuts transmis.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Gérer le lien entre facture principale, facture de sous-traitance et tiers payeur.
- Page Annexe A v1.3 liee: page 67

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°12 - Intermédiaire transparent gestionnaire de facture pour son commettant acheteur** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°13** | Sous-traitance avec paiement direct ou délégation de paiement | B2B e-invoicing via PA selon qualification | La co-traitance met plusieurs entreprises au meme niveau dans un groupement; la sous-traitance distingue titulaire, sous-traitant et acheteur final. |

Difference centrale : La co-traitance met plusieurs entreprises au meme niveau dans un groupement; la sous-traitance distingue titulaire, sous-traitant et acheteur final.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=67`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°5 - Frais payés par des collaborateurs avec facture au nom de l'entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
- [Cas n°14 - Co-traitance B2B](cas_12.md)
- [Cas n°15 - Facture de vente suite à commande ou paiement éventuel d'un tiers pour le compte de l'acheteur](cas_13.md)
