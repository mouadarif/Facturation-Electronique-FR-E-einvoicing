# Cas n°20 et n°21 - Facture d'acompte après acompte payé ou à payer puis facture définitive / finale

Status: draft
Last updated: 2026-05-12

## Summary

Chaîne facture d'acompte puis facture finale, avec acompte déjà payé ou encore à payer.

Dans l'application, ce cas est classe dans la famille **b2b-dom** avec le type **Acompte**. L'exemple local est: Un acompte est facturé à la commande, puis déduit sur la facture finale.

## Key points

- La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.
- La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.
- Cote ERP, le controle prioritaire est: Chaîner commande, acompte, paiement, facture finale et solde restant dû.
- Les montants payes, restants dus, annules ou regularises doivent rester reconciliables avec la facture et les statuts transmis.

## App interpretation

- Format attendu: EN16931 / EXTENDED-CTC-FR selon le cas
- Impact ERP: Chaîner commande, acompte, paiement, facture finale et solde restant dû.
- Page Annexe A v1.3 liee: page 99

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas n°19a / n°19b - Facture émise par un tiers facturant avec mandat et auto-facturation** | Cas voisin ou precedent dans la cartographie AFNOR | Selon qualification du cas | Sert de point de comparaison, mais ne doit pas etre applique par analogie sans verifier les roles. |
| **Cas n°20 et n°21** | Facture d'acompte après acompte payé ou à payer puis facture définitive / finale | B2B e-invoicing via PA selon qualification | Une facture deja payee n est pas une facture d acompte: l acompte est un versement a valoir qui doit etre chaine a une facture finale. |

Difference centrale : Une facture deja payee n est pas une facture d acompte: l acompte est un versement a valoir qui doit etre chaine a une facture finale.

## Sources

- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=99`
- `docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf`
- `src/data/cases.js`

## Related pages

- [Index wiki](../index.md)
- [Cas n°1 - Multi-commande / multi-livraison](cas_01_multi_commande_multi_livraison.md)
