# Cas n°34 - Encaissement partiel et annulation d'encaissement

Status: draft
Last updated: 2026-05-12

## Summary

Gestion d'encaissements fractionnés ou annulés dans le cycle de vie.

Dans l'application, ce cas est classe dans la famille **statuts** avec le type **Encaissement**. L'exemple local est: Un paiement partiel est reçu puis une écriture d'encaissement est annulée.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Tracer chaque encaissement, annulation, montant et date.
- Quand un statut de cycle de vie ou un encaissement est implique, conserver la date, le montant, le motif et l'acteur emetteur du statut.
- Les montants payes, restants dus, annules ou regularises doivent rester reconciliables avec la facture et les statuts transmis.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Tracer chaque encaissement, annulation, montant et date.
- Page Annexe A v1.3 liee: page 127

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°33 - Opérations soumises au régime de la marge bénéficiaire** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°34** | Encaissement partiel et annulation d'encaissement | B2B e-invoicing via PA selon qualification | Une facture deja payee ou escomptee doit etre distinguee d un encaissement partiel ou annule transmis dans le cycle de vie. |

Difference centrale : Une facture deja payee ou escomptee doit etre distinguee d un encaissement partiel ou annule transmis dans le cycle de vie.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=127`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°2 - Facture déjà payée par l'acheteur ou un tiers payeur au moment de l'émission](cas_02_facture_deja_payee.md)
- [Cas n°3 - Facture à payer par un tiers payeur connu au moment de la facturation](cas_03_tiers_payeur_connu.md)
- [Cas n°4 - Facture à payer par l'acheteur avec prise en charge partielle par un tiers](cas_04_prise_en_charge_partielle.md)
