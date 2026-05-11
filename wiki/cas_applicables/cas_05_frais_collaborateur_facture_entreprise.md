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

## Sources

- `src/data/cases.js` : cas applicatif 5.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf#page=46` : Annexe A v1.3, cas n°5.

## Pages liées

- [Cas 6 - Frais sans facture entreprise](cas_06_frais_collaborateur_sans_facture_entreprise.md)
