# Cas n°42 - Gestion de la détaxe

Status: draft
Last updated: 2026-05-12

## Summary

Traitement des opérations de détaxe et des justificatifs associés.

Dans l'application, ce cas est classe dans la famille **sectoriel** avec le type **AFNOR XP Z12-014**. L'exemple local est: Une vente peut donner lieu à détaxe selon le client, le territoire et les justificatifs.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Contrôler éligibilité, preuve, statut fiscal et régularisation éventuelle.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Contrôler éligibilité, preuve, statut fiscal et régularisation éventuelle.
- Page Annexe A v1.3 liee: page 143

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°41 - Sociétés de barter** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°42** | Gestion de la détaxe | B2B e-invoicing via PA selon qualification | La detaxe peut demarrer en B2C/e-reporting puis evoluer; le cas 30 vise plus largement la TVA deja collectee avant facture a posteriori. |

Difference centrale : La detaxe peut demarrer en B2C/e-reporting puis evoluer; le cas 30 vise plus largement la TVA deja collectee avant facture a posteriori.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=143`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°5 - Frais payés par des collaborateurs avec facture au nom de l'entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
- [Cas n°13 - Sous-traitance avec paiement direct ou délégation de paiement](cas_11.md)
- [Cas n°14 - Co-traitance B2B](cas_12.md)
