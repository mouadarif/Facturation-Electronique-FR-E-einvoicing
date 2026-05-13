# Cas 5 - Frais payés par un collaborateur avec facture au nom de l’entreprise

Status: draft  
Last updated: 2026-05-11

## Résumé

Le cas 5 couvre une avance de frais où **le collaborateur paie**, mais la **facture est libellée au nom de l’entreprise** (donc dans le périmètre e-invoicing B2B). La nuance clé est d’organiser la **réception sur la bonne adresse de facturation électronique** et de rattacher la facture au justificatif interne (note de frais), sans confusion avec un achat B2C.

## Contexte & périmètre

- La facture doit être **adressée à l’entreprise** (SIREN + adresse de facturation électronique).
- Le collaborateur est un **tiers payeur** au sens opérationnel.
- L’entreprise rembourse le collaborateur via son processus interne (hors circuit fiscal de la facture).

## Nuances importantes (avec autres cas)

### Nuance vs **Cas 6** (ticket / facture au nom du collaborateur)

- **Cas 5**: facture au nom de l’entreprise → e-invoicing B2B.
- **Cas 6**: facture/ticket au nom du collaborateur → vente B2C, e-reporting côté vendeur.

### Nuance vs **Cas 3** (tiers payeur “organisationnel”)

- **Cas 3**: tiers payeur souvent “structure” (centralisation) dans un circuit de validation/paiement.
- **Cas 5**: tiers payeur = **personne** (collaborateur), avec enjeux **RGPD** (éviter d’exposer des données personnelles dans la facture).

## Exemple concret (focalisé sur la nuance)

### Hôtel payé par le collaborateur: Cas 5 vs Cas 6

- **Scénario Cas 5**: le collaborateur réserve un hôtel, donne le **SIREN** et l’**adresse de facturation électronique** de l’entreprise. La facture est émise **au nom de l’entreprise**. L’entreprise reçoit la facture e-invoicing et rembourse le collaborateur via une note de frais.
- **Scénario Cas 6**: le collaborateur règle et repart avec une facture/ticket **à son nom**. Le vendeur déclare en e-reporting B2C. Le remboursement interne peut exister, mais ce n’est pas une facture B2B adressée à l’entreprise.

## Points de contrôle (ERP / process)

- S’assurer que la facture est bien **au nom de l’entreprise** (sinon c’est Cas 6).
- Prévoir une **adresse de facturation électronique dédiée** (optionnel) pour faciliter tri et rapprochement.
- Rattacher la facture au justificatif interne (matricule/identifiant interne) en évitant les données personnelles exposées.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas 5** | Le collaborateur paie, mais la facture est au nom de l'entreprise | **B2B e-invoicing via PA** | L'entreprise est l'acheteur juridique; le collaborateur avance seulement les frais. |
| **Cas 6** | Le collaborateur paie, et le ticket/facture est a son nom | **B2C / e-reporting cote vendeur** | L'entreprise ne recoit pas de facture via PA; elle traite une note de frais interne. |
| **Cas 7** | Achat avec carte logee / carte d'achat, facture au nom de l'entreprise | **B2B e-invoicing via PA** | La facture est deja payee par un moyen de paiement de l'entreprise. |

### Cas 5 - frais collaborateur avec facture entreprise

```text
Facture au nom de l'entreprise
Paiement initial par le collaborateur
Remboursement ensuite par l'entreprise
```

Exemple :

```text
Un salarie Scafruit paie un hotel avec sa carte personnelle,
mais la facture est au nom de Scafruit.
```

Consequence :

```text
VENDEUR -> PA-E -> PA-R de l'entreprise
```

La facture est bien B2B. La TVA peut suivre la logique normale de deduction si les autres conditions sont respectees.

Difference centrale : le collaborateur n'est pas l'acheteur juridique; il avance seulement le paiement. Le critere decisif reste **le nom porte par la facture**.

## Sources

- `src/data/cases.js` : cas applicatif 5.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=46` : Annexe A v1.3, cas n°5.

## Pages liées

- [Cas 6 - Frais sans facture entreprise](cas_06_frais_collaborateur_sans_facture_entreprise.md)
