# Cas n°30 - TVA déjà collectée : opération traitée initialement en e-reporting B2C avec facture a posteriori

Status: draft
Last updated: 2026-05-12

## Summary

Une opération déjà déclarée en e-reporting fait ensuite l'objet d'une facture.

Dans l'application, ce cas est classe dans la famille **b2c** avec le type **TVA déjà collectée**. L'exemple local est: Un client demande après coup une facture pour une vente initialement B2C.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Eviter la double collecte TVA et marquer le cadre de facturation dédié.
- Pour le B2C, verifier si le vendeur doit transmettre une donnee d'e-reporting plutot qu'une facture B2B structuree.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Eviter la double collecte TVA et marquer le cadre de facturation dédié.
- Page Annexe A v1.3 liee: page 115

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°29 - Assujetti unique au sens de l'article 256 C du CGI** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°30** | TVA déjà collectée : opération traitée initialement en e-reporting B2C avec facture a posteriori | B2C / e-reporting ou cas mixte | Le cas 30 intervient quand une vente d abord B2C/e-reporting donne ensuite lieu a facture; il faut eviter double collecte ou double declaration. |

Difference centrale : Le cas 30 intervient quand une vente d abord B2C/e-reporting donne ensuite lieu a facture; il faut eviter double collecte ou double declaration.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=115`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°6 - Frais payés par des collaborateurs sans facture adressée à l'entreprise](cas_06_frais_collaborateur_sans_facture_entreprise.md)
- [Cas n°23 - Flux en auto-facturation entre un particulier et un professionnel](cas_21.md)
