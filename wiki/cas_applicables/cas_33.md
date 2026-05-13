# Cas n°35 - Notes d'auteur

Status: draft
Last updated: 2026-05-12

## Summary

Traitement spécifique des notes ou factures liées aux droits d'auteur.

Dans l'application, ce cas est classe dans la famille **sectoriel** avec le type **Droits d'auteur**. L'exemple local est: Un auteur transmet une note à une société cliente.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Qualifier auteur, assujettissement, retenues et régime TVA.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Qualifier auteur, assujettissement, retenues et régime TVA.
- Page Annexe A v1.3 liee: page 127

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°34 - Encaissement partiel et annulation d'encaissement** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°35** | Notes d'auteur | B2B e-invoicing via PA selon qualification | Les notes d auteur peuvent impliquer mandat ou regime specifique, mais ne se confondent pas automatiquement avec l auto-facturation. |

Difference centrale : Les notes d auteur peuvent impliquer mandat ou regime specifique, mais ne se confondent pas automatiquement avec l auto-facturation.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=127`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°5 - Frais payés par des collaborateurs avec facture au nom de l'entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
- [Cas n°13 - Sous-traitance avec paiement direct ou délégation de paiement](cas_11.md)
- [Cas n°14 - Co-traitance B2B](cas_12.md)
