# Cas 4 - Prise en charge partielle par un tiers (assurance, subvention, etc.)

Status: draft  
Last updated: 2026-05-11

## Résumé

Le cas 4 couvre une facture où **une partie du montant** est prise en charge par un tiers (ex. assureur), et le reste est payé par l’acheteur (ex. franchise). La nuance critique est la **cohérence des montants** et la **traçabilité des encaissements** (souvent multiples) — en particulier quand la TVA est exigible à l’encaissement.

## Contexte & périmètre

- Le vendeur émet une facture B2B à l’acheteur.
- Une partie du montant est “déjà payée / à payer par un tiers” (mécanisme de modélisation).
- Le vendeur peut recevoir **plusieurs encaissements** (acheteur + tiers) à des dates différentes.

## Notions & données (repères)

- **Limite EN16931**: le standard ne permet pas d’indiquer “plusieurs payeurs” de façon native ; le cas décrit un contournement (et les précautions associées).
- **Montants**: le cas s’appuie sur l’idée que le **montant payé (ou pris en charge)** peut servir à rendre juste le **net à payer**.
- **Encaissements**: si la TVA est à l’encaissement, il faut pouvoir déclarer correctement les encaissements (dates/montants), potentiellement en plusieurs fois.

## Nuances importantes (avec autres cas)

### Nuance vs **Cas 3** (tiers payeur connu)

- **Cas 3**: un tiers paie “à la place de l’acheteur” (organisation du paiement), sans forcément découper la facture en parts.
- **Cas 4**: on a une **prise en charge partielle** (franchise vs solde, TVA, etc.) → la nuance est la **répartition** et les **encaissements multiples**.

### Nuance vs **Cas 2** (facture déjà payée)

- **Cas 2**: la facture est soldée au moment de l’émission.
- **Cas 4**: la facture peut être **partiellement** couverte, sans être soldée.

## Exemple concret (focalisé sur la nuance)

### Exemple : facture de réparation avec assureur (Cas 4) vs tiers payeur (Cas 3)

- **Contexte**: réparation automobile facturée `1 000 EUR HT + 200 EUR TVA = 1 200 EUR TTC`.
- L’assurance prend en charge `900 EUR HT` (sans TVA si la TVA est récupérable par l’acheteur), l’acheteur paie une franchise `100 EUR HT` + la TVA `200 EUR`.

**Ce qui fait la nuance Cas 4**:
- Il ne suffit pas de dire “un tiers paie” : il faut tracer **deux paiements** (franchise/TVA vs prise en charge) et éviter les erreurs sur la TVA et la ventilation lors des statuts d’encaissement.

**Ce qui ferait basculer vers Cas 3**:
- si le tiers paye “pour le compte de l’acheteur” sans logique de prise en charge partielle (pas de franchise/solde séparés à tracer).

## Sources

- `src/data/cases.js` : cas applicatif 4.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf#page=43` : Annexe A v1.3, cas n°4.
- `juridique/03_NOTIONS_PAR_CAS_REFORME.md` : repères cas proches.

## Pages liées

- [Cas 3 - Tiers payeur connu](cas_03_tiers_payeur_connu.md)
- [Cas 2 - Facture déjà payée](cas_02_facture_deja_payee.md)
- [Notions par cas de réforme](../../juridique/03_NOTIONS_PAR_CAS_REFORME.md)
