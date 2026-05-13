# Cas n°22b - Facture payée avec escompte - livraisons de biens ou TVA sur les débits

Status: draft
Last updated: 2026-05-12

## Summary

Escompte appliqué à une livraison de biens ou prestation avec option TVA sur les débits.

Dans l'application, ce cas est classe dans la famille **statuts** avec le type **Escompte / débits**. L'exemple local est: Un escompte réduit le montant payé d'une facture de marchandises.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Gérer l'écart de paiement sans casser la ventilation fiscale initiale.
- Quand un statut de cycle de vie ou un encaissement est implique, conserver la date, le montant, le motif et l'acteur emetteur du statut.
- Les montants payes, restants dus, annules ou regularises doivent rester reconciliables avec la facture et les statuts transmis.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Gérer l'écart de paiement sans casser la ventilation fiscale initiale.
- Page Annexe A v1.3 liee: page 106

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°22a - Facture payée avec escompte - prestations de services avec TVA due à l'encaissement** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°22b** | Facture payée avec escompte - livraisons de biens ou TVA sur les débits | B2B e-invoicing via PA selon qualification | Meme mecanisme commercial d escompte, mais exigibilite TVA differente: encaissement dans 22a, debit ou livraison de biens dans 22b. |

Difference centrale : Meme mecanisme commercial d escompte, mais exigibilite TVA differente: encaissement dans 22a, debit ou livraison de biens dans 22b.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=106`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°2 - Facture déjà payée par l'acheteur ou un tiers payeur au moment de l'émission](cas_02_facture_deja_payee.md)
- [Cas n°3 - Facture à payer par un tiers payeur connu au moment de la facturation](cas_03_tiers_payeur_connu.md)
- [Cas n°4 - Facture à payer par l'acheteur avec prise en charge partielle par un tiers](cas_04_prise_en_charge_partielle.md)
