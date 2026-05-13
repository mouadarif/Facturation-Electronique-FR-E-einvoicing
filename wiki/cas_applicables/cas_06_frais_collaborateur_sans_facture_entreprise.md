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

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas 5** | Le collaborateur paie, mais la facture est au nom de l'entreprise | **B2B e-invoicing via PA** | L'entreprise est l'acheteur juridique; le collaborateur avance seulement les frais. |
| **Cas 6** | Le collaborateur paie, et le ticket/facture est a son nom | **B2C / e-reporting cote vendeur** | L'entreprise ne recoit pas de facture via PA; elle traite une note de frais interne. |
| **Cas 7** | Achat avec carte logee / carte d'achat, facture au nom de l'entreprise | **B2B e-invoicing via PA** | La facture est deja payee par un moyen de paiement de l'entreprise. |

### Cas 6 - ticket ou facture au nom du collaborateur

```text
Facture/ticket au nom du collaborateur
Paiement par le collaborateur
Remboursement interne par l'entreprise
```

Exemple :

```text
Un salarie paie un restaurant.
Le ticket est a son nom ou sans nom d'entreprise.
```

Consequence cote vendeur :

```text
Pas de facture B2B vers l'entreprise
Declaration B2C / e-reporting
```

Consequence cote entreprise :

```text
Pas de reception via PA
Traitement comptable interne en note de frais
TVA potentiellement problematique
```

Nuance TVA : l'entreprise peut vouloir deduire une TVA alors que la facture ne la designe pas comme acheteur. C'est pour cela que la deductibilite doit etre clarifiee au cas reel.

Difference centrale : si la facture est au nom de l'entreprise, on revient vers le cas 5 ou 7; si elle est au nom du collaborateur, ce n'est pas une facture B2B recue par l'entreprise.

## Sources

- `src/data/cases.js` : cas applicatif 6.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=47` : Annexe A v1.3, cas n°6.

## Pages liées

- [Cas 5 - Frais avec facture entreprise](cas_05_frais_collaborateur_facture_entreprise.md)
