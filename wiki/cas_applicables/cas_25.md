# Cas n°27 - Gestion des tickets de péage vendus à un assujetti

Status: draft
Last updated: 2026-05-12

## Summary

Traitement des tickets de péage lorsqu'ils sont vendus à un assujetti.

Dans l'application, ce cas est classe dans la famille **sectoriel** avec le type **Péage**. L'exemple local est: Un opérateur facture des péages à une entreprise de transport.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Qualifier justificatif, facture, TVA et regroupement éventuel.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Qualifier justificatif, facture, TVA et regroupement éventuel.
- Page Annexe A v1.3 liee: page 112

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°26 - Factures avec clause de réserve contractuelle** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°27** | Gestion des tickets de péage vendus à un assujetti | B2B e-invoicing via PA selon qualification | Le peage peut produire un justificatif ou une facture selon le contexte; la note de restaurant demande aussi une qualification document/TVA avant de parler e-invoicing. |

Difference centrale : Le peage peut produire un justificatif ou une facture selon le contexte; la note de restaurant demande aussi une qualification document/TVA avant de parler e-invoicing.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=112`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°5 - Frais payés par des collaborateurs avec facture au nom de l'entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
- [Cas n°13 - Sous-traitance avec paiement direct ou délégation de paiement](cas_11.md)
- [Cas n°14 - Co-traitance B2B](cas_12.md)
