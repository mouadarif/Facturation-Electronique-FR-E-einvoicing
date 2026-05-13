# Cas n°19a / n°19b - Facture émise par un tiers facturant avec mandat et auto-facturation

Status: draft
Last updated: 2026-05-12

## Summary

Facture émise par un tiers pour le compte du vendeur, ou par l'acheteur en auto-facturation.

Dans l'application, ce cas est classe dans la famille **sectoriel** avec le type **Mandat / auto-facturation**. L'exemple local est: Un mandataire crée la facture pour le vendeur, ou l'acheteur émet la facture au nom du vendeur.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Conserver les mandats, inverser correctement les rôles et contrôler la numérotation.
- Ne pas confondre les roles: acheteur/vendeur juridiques, payeur, beneficiaire du paiement, tiers gestionnaire et tiers facturant peuvent etre differents.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Conserver les mandats, inverser correctement les rôles et contrôler la numérotation.
- Page Annexe A v1.3 liee: page 90

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°18 - Gestion des notes de débit** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°19a / n°19b** | Facture émise par un tiers facturant avec mandat et auto-facturation | B2B e-invoicing via PA selon qualification | Le mandat ou l auto-facturation B2B doit etre separe des flux impliquant un particulier et un professionnel. |

Difference centrale : Le mandat ou l auto-facturation B2B doit etre separe des flux impliquant un particulier et un professionnel.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=90`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°5 - Frais payés par des collaborateurs avec facture au nom de l'entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
- [Cas n°13 - Sous-traitance avec paiement direct ou délégation de paiement](cas_11.md)
- [Cas n°14 - Co-traitance B2B](cas_12.md)
