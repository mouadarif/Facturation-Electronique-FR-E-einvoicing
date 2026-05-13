# Cas 8 à 10 - Facture à payer à un tiers (affacturage, centralisation, bénéficiaire inconnu)

Status: draft  
Last updated: 2026-05-11

## Résumé

Les cas 8 à 10 couvrent les situations où le paiement d’une facture doit être dirigé vers un **tiers bénéficiaire** (ex. affactureur) et/ou où ce bénéficiaire peut être **déterminé dès l’émission** ou **après émission** (subrogation/cession). La nuance clé est de distinguer :

- **Cas 8**: bénéficiaire (ex. affactureur / centralisation) déterminé **au moment de la facturation**.
- **Cas 9**: tiers connu qui peut aussi intervenir sur commande/réception/gestion (distributeur, dépositaire, etc.).
- **Cas 10**: bénéficiaire **inconnu au moment de la facture** (ex. subrogation après émission) → changement de bénéficiaire en cours de cycle de vie.

## Contexte & périmètre

- La facture est une facture B2B standard côté acheteur (le but est de **ne pas exporter la complexité** à l’acheteur).
- La complexité se porte sur :
  - la **désignation du bénéficiaire du paiement**,
  - le **compte à payer**,
  - la **traçabilité** (statuts, changement de bénéficiaire, partage à l’affactureur),
  - et les effets sur le statut “Encaissée” si TVA à l’encaissement.

## Nuances importantes (avec autres cas)

### Nuance vs **Cas 3** (tiers payeur connu)

- **Cas 3**: le tiers exécute le paiement **pour le compte de l’acheteur** (organisation acheteur).
- **Cas 8–10**: le tiers est souvent **bénéficiaire** (nouveau propriétaire de la créance) ou acteur financier lié au vendeur (organisation vendeur).

### Nuance vs **Cas 17a/17b** (marketplace/intermédiaire de paiement)

- **Cas 8–10**: focalisé sur la **cession/subrogation** et le paiement au bénéficiaire.
- **Cas 17a/17b**: intermédiaire de paiement (marketplace) pouvant en plus être tiers facturant sous mandat.

## Exemples concrets (focalisés sur la nuance)

### Exemple A — Affacturage “connu dès l’émission” (Cas 8)

Le vendeur cède la créance au factor avant émission de la facture. La facture indique directement l’affactureur comme **bénéficiaire** (payee) et le compte à payer est celui du factor.

**Nuance à retenir**: ce n’est pas l’acheteur qui “choisit un tiers payeur” (Cas 3) : ici, la créance est cédée et le bénéficiaire est porté dans la facture.

### Exemple B — Subrogation après émission (Cas 10)

Le vendeur émet la facture “classique” (bénéficiaire = vendeur), puis cède la créance plus tard. La facture n’est pas modifiable ; il faut donc informer l’acheteur d’un **changement de bénéficiaire / compte à payer** via le cycle de vie.

**Nuance à retenir**: le bénéficiaire était **inconnu** au moment de l’émission.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas 8** | Beneficiaire du paiement connu des l'emission, par exemple affacturage ou centralisation de tresorerie | **B2B e-invoicing via PA** | La facture peut porter les informations du beneficiaire du paiement. |
| **Cas 9** | Un tiers intervient aussi dans la gestion operationnelle | **B2B e-invoicing via PA** | Le tiers peut etre plus qu'un beneficiaire financier. |
| **Cas 10** | Le beneficiaire est inconnu ou change apres emission | **B2B e-invoicing + statuts** | Le changement se traite dans le cycle de vie plutot que dans la facture initiale. |
| **Cas 11** | Un tiers recoit/traite la facture pour l'acheteur | **Routage / delegation cote acheteur** | Le tiers traite la facture mais n'est pas forcement beneficiaire du paiement. |

Difference centrale : les cas 8 a 10 concernent **a qui payer**; les cas 11 et 12 concernent plutot **qui recoit ou traite** la facture pour l'acheteur.

## Sources

- `src/data/cases.js` : cas applicatif 8 (synthèse 8 à 10).
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=50` : Annexe A v1.3, cas 8 à 10 (chapitre 3.2.9).

## Pages liées

- [Cas 3 - Tiers payeur connu](cas_03_tiers_payeur_connu.md)
- [Cas 17a/17b - Intermédiaire de paiement](../00_query_hub.md)
