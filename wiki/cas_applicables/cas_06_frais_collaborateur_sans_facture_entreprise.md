# Cas 6 - Frais payés par un collaborateur sans facture adressée à l’entreprise (ticket / facture au nom du collaborateur)

Status: draft  
Last updated: 2026-05-11

## Résumé

Le cas 6 couvre un achat payé par un collaborateur où le vendeur remet un ticket ou une facture **au nom du collaborateur**. La nuance principale est que ce flux est **B2C** (donc **e-reporting côté vendeur**), et non une facture B2B adressée à l’entreprise.

## Contexte & périmètre

- Le vendeur vend à une personne non assujettie (le collaborateur).
- La facture n’est pas adressée à l’entreprise → l’entreprise peut rembourser en interne, mais cela ne transforme pas la vente en B2B.
- Il peut exister des cas où une facture B2B est demandée a posteriori (à traiter avec prudence, et en cohérence avec les cadres prévus).

## Nuances importantes (avec autres cas)

### Nuance vs **Cas 5** (facture au nom de l’entreprise)

- **Cas 5**: facture B2B adressée à l’entreprise → e-invoicing.
- **Cas 6**: ticket/facture au nom du collaborateur → e-reporting (B2C).

### Nuance vs **Cas 30** (TVA déjà collectée / facture a posteriori)

L’Annexe A indique qu’une facture B2B peut être émise dans un second temps dans certains scénarios (cadre spécifique “TVA déjà collectée”). Quand c’est le cas, la nuance est d’éviter la **double collecte / double déclaration**.

## Exemple concret (focalisé sur la nuance)

### Restaurant: Cas 6 vs Cas 5

- **Scénario Cas 6**: le collaborateur règle un repas et repart avec un ticket/facture à son nom. Le vendeur déclare la vente en e-reporting B2C. Le collaborateur demande ensuite un remboursement interne.
- **Scénario Cas 5**: le collaborateur demande une facture au nom de l’entreprise (SIREN + adresse de facturation électronique). La facture est reçue en e-invoicing, et le collaborateur est remboursé via note de frais.

## Sources

- `src/data/cases.js` : cas applicatif 6.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf#page=47` : Annexe A v1.3, cas n°6.

## Pages liées

- [Cas 5 - Frais avec facture entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
