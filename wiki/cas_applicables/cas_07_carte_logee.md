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

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas 5** | Le collaborateur paie, mais la facture est au nom de l'entreprise | **B2B e-invoicing via PA** | L'entreprise est l'acheteur juridique; le collaborateur avance seulement les frais. |
| **Cas 6** | Le collaborateur paie, et le ticket/facture est a son nom | **B2C / e-reporting cote vendeur** | L'entreprise ne recoit pas de facture via PA; elle traite une note de frais interne. |
| **Cas 7** | Achat avec carte logee / carte d'achat, facture au nom de l'entreprise | **B2B e-invoicing via PA** | La facture est deja payee par un moyen de paiement de l'entreprise. |

### Cas 7 - carte logee / carte d'achat

```text
Facture au nom de l'entreprise
Paiement par carte logee de l'entreprise
```

Exemple :

```text
Un salarie reserve un hotel avec une carte logee Scafruit.
La facture est au nom de Scafruit.
```

Consequence :

```text
VENDEUR -> PA-E -> PA-R de l'entreprise
Facture deja payee
Net a payer = 0
```

Nuance : ce n'est pas un tiers payeur. La carte est seulement le moyen de paiement de l'acheteur.

Difference centrale : cas 5 = facture entreprise + paiement collaborateur; cas 6 = facture collaborateur + paiement collaborateur; cas 7 = facture entreprise + paiement carte entreprise.

## Sources

- `src/data/cases.js` : cas applicatif 7.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=47` : Annexe A v1.3, cas n°7.

## Pages liées

- [Cas 2 - Facture déjà payée](cas_02_facture_deja_payee.md)
- [Cas 5 - Frais avec facture entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
