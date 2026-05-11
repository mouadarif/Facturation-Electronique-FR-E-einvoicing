# Cas 7 - Achat payé avec carte logée (carte d’achat)

Status: draft  
Last updated: 2026-05-11

## Résumé

Le cas 7 couvre des achats réalisés avec une **carte logée** (carte d’achat). La nuance importante est que, côté facture, on est dans une logique de **facture déjà payée** (proche du Cas 2), mais avec des **données de paiement carte** à renseigner et un fonctionnement organisationnel (relevé mensuel, contestations possibles).

## Contexte & périmètre

- Le vendeur est payé via la carte.
- La facture est transmise à l’acheteur comme **déjà payée** (montant à payer nul).
- L’acheteur reçoit un relevé mensuel et règle l’opérateur de carte logée ; certains achats peuvent être contestés (litige/refus).

## Nuances importantes (avec autres cas)

### Nuance vs **Cas 2** (facture déjà payée)

- **Cas 7** est une **variante** du Cas 2 : la facture est déjà payée, mais le paiement est une transaction carte (données spécifiques).

### Nuance vs **Cas 5/6** (collaborateurs)

- **Cas 5/6** parlent de frais collaborateur (facture au nom entreprise vs non).
- **Cas 7** parle d’un **moyen de paiement centralisé** (carte logée) : ce n’est pas un tiers payeur “personne” à nommer dans la facture.

## Exemple concret (focalisé sur la nuance)

### Hôtel payé par carte logée: Cas 7 vs Cas 5

- **Scénario Cas 7**: l’entreprise utilise une carte logée pour les déplacements. L’hôtel est payé via la carte. La facture est déposée comme déjà payée ; l’entreprise rapproche ensuite facture ↔ transaction carte ↔ relevé mensuel.
- **Scénario Cas 5**: le collaborateur paye avec sa carte personnelle et se fait rembourser ; la nuance est alors la qualification facture au nom de l’entreprise et le traitement note de frais.

## Sources

- `src/data/cases.js` : cas applicatif 7.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf#page=47` : Annexe A v1.3, cas n°7.

## Pages liées

- [Cas 2 - Facture déjà payée](cas_02_facture_deja_payee.md)
- [Cas 5 - Frais avec facture entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
