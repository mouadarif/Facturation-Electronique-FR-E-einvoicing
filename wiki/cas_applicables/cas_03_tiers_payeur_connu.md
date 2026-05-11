# Cas 3 - Facture à payer par un tiers payeur connu

Status: draft  
Last updated: 2026-05-11

## Résumé

Le cas 3 couvre une facture B2B **adressée à l’acheteur**, mais dont le **paiement est réalisé par un tiers payeur** connu au moment de la facturation. La nuance principale est que le tiers payeur est **un acteur du processus de paiement**, sans changer l’identité de l’acheteur ni le circuit de transmission de la facture.

## Contexte & périmètre

- La facture est transmise **vendeur → plateforme → acheteur**.
- L’acheteur **valide/liquide** la facture, puis organise le paiement par le tiers.
- Le tiers payeur paie et **retourne l’information** à l’acheteur (ou via l’outillage), afin de permettre les statuts (ex. “Paiement transmis”) et le suivi fiscal/TVA si nécessaire.

## Notions & données (repères)

- **Tiers payeur**: entité qui exécute le paiement pour le compte de l’acheteur.
- **Statuts de cycle de vie**: le cas met en jeu des statuts de traitement côté acheteur, et des statuts de paiement (“Paiement transmis”, puis éventuellement “Encaissée” si TVA à l’encaissement).
- **Profil EXTENDED-CTC-FR (optionnel)**: permet de **nommer** le tiers payeur dans la facture (bloc PAYEUR dédié) quand c’est utile et maîtrisé.

## Nuances importantes (avec autres cas)

### Nuance vs **Cas 2** (facture déjà payée)

- **Cas 3**: au moment de l’émission, la facture **n’est pas forcément payée** ; le paiement passe ensuite par un tiers payeur.
- **Cas 2**: la facture est **déjà soldée** au moment de l’émission (montant à payer nul, logique “déjà payée”).

### Nuance vs **Cas 4** (prise en charge partielle)

- **Cas 3**: le principe est “qui paie” (tiers payeur), sans nécessairement modéliser plusieurs encaissements.
- **Cas 4**: gestion d’une **prise en charge partielle** (franchise + solde, etc.) et donc souvent **plusieurs paiements/encaissements** à tracer.

### Nuance vs **Cas 5/6/7** (collaborateurs, carte logée)

- **Cas 5**: le collaborateur avance des frais **avec facture au nom de l’entreprise** (tiers payeur “personne”), avec des précautions RGPD.
- **Cas 6**: achat B2C au nom du collaborateur (pas une facture B2B à l’entreprise).
- **Cas 7**: carte logée = facture “déjà payée” par moyen de paiement acheteur (variante Cas 2), pas “tiers payeur” au sens organisationnel.

## Exemple concret (focalisé sur la nuance)

### Exemple : centrale de paiement groupe (Cas 3) vs facture déjà payée (Cas 2)

- **Contexte**: une filiale A reçoit une facture de `10 000 EUR TTC` pour des prestations. Le groupe dispose d’une centrale de paiement (tiers payeur) qui règle les factures après validation.

**Scénario Cas 3 (tiers payeur connu)**:
- La facture est émise **à l’acheteur** (filiale A).
- La filiale A valide la facture.
- La centrale de paiement règle le vendeur et informe la filiale A.
- La filiale A peut envoyer le statut **“Paiement transmis”** au vendeur, puis le vendeur gère l’encaissement (et le statut “Encaissée” si TVA à l’encaissement).

**Ce qui ferait basculer vers Cas 2**:
- si, au moment de l’émission, le paiement a déjà eu lieu et la facture doit être déposée comme **déjà payée** (montant à payer nul, cohérence montants/dates).

## Sources

- `src/data/cases.js` : cas applicatif 3.
- `juridique/03_NOTIONS_PAR_CAS_REFORME.md` : repères “tiers payeur” et cas proches.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf#page=41` : Annexe A v1.3, cas n°3.

## Pages liées

- [Cas 2 - Facture déjà payée](cas_02_facture_deja_payee.md)
- [Cas 4 - Prise en charge partielle par un tiers](cas_04_prise_en_charge_partielle.md)
- [Notions par cas de réforme](../../juridique/03_NOTIONS_PAR_CAS_REFORME.md)
