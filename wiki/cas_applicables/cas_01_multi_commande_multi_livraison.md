# Cas 1 - Multi-commande / multi-livraison

Status: current
Last updated: 2026-05-11

## Résumé

Le cas 1 couvre une facture qui regroupe **plusieurs commandes**, **plusieurs livraisons**, ou les deux. Le point clé est de **conserver la traçabilité au bon niveau** (facture ou ligne) et de savoir **utiliser les extensions** quand EN16931 ne suffit pas.

Dans l'application, ce cas sert de point d'entree pour les factures B2B domestiques simples qui deviennent plus complexes parce qu'elles agregent plusieurs operations commerciales.

## Contexte & périmètre

- **Quand**: facturation périodique, regroupement de livraisons, facturation multi-sites, etc.
- **Pourquoi c’est difficile**: une facture “regroupée” peut casser le rapprochement acheteur si les références commande/livraison ne sont pas portées correctement.
- **Ce que dit l’Annexe A**: la **norme EN16931 seule** ne couvre pas le multi-commande / multi-livraison ; il faut s’appuyer sur le profil **EXTENDED-CTC-FR** pour porter certaines références **au niveau ligne**.

## Notion métier

Une entreprise peut émettre une facture unique pour plusieurs commandes ou plusieurs livraisons. Ce regroupement est acceptable si la facture reste exploitable par l’acheteur : **chaque ligne** doit permettre de comprendre **quelle commande / livraison** elle concerne.

Le risque metier est de perdre la tracabilite entre :

- la commande d'origine ;
- la livraison reellement effectuee ;
- la ligne facturee ;
- le paiement ou le cycle de vie associe.

## Donnees a surveiller

| Donnee | Role |
| --- | --- |
| Reference de commande | Permet a l'acheteur de rapprocher la facture avec son achat. |
| Reference de livraison | Permet de rattacher une ligne facturee a une livraison effective. |
| Ligne de facture | Peut porter une reference differente si la facture regroupe plusieurs commandes. |
| Cadre de facturation `BT-23` | Indique le mode de facturation : bien, service, facture deja payee, etc. |
| Code d'exigibilite TVA `BT-8` | Indique l'evenement d'exigibilite de la TVA lorsque necessaire. |

## Nuances importantes (avec autres cas)

### Nuance vs **Cas 31** (facture mixte “principal/accessoire”)

- **Cas 1**: le sujet est la **traçabilité commande/livraison** quand on regroupe.
- **Cas 31**: le sujet est la **qualification** d’une opération principale et d’une opération accessoire (TVA/régime), même si la facture a une seule commande.

### Nuance vs **Cas 2** (facture déjà payée)

- **Cas 1** n’implique pas un paiement déjà intervenu.
- Si le regroupement est aussi **déjà payé** (ex: abonnement payé d’avance), on retombe sur des contraintes du **Cas 2** (montant à payer, encaissement/statuts si TVA à l’encaissement).

## Exemples concrets (focalisés sur la nuance)

### Exemple 1 : plusieurs commandes sur une facture de biens

Un client passe trois commandes dans le mois. Le vendeur livre les marchandises puis emet une seule facture mensuelle.

Dans ce cas, **la nuance Cas 1 vs Cas 31** est simple : ici, on ne cherche pas à requalifier une opération principale/accessoire ; on cherche à **ne pas perdre le lien** ligne ↔ commande/livraison. Chaque ligne doit porter la bonne référence de commande/livraison quand elles diffèrent.

### Exemple 2 : facture de service avec TVA exigible a l'encaissement

Un prestataire emet une facture de service de `1 000 EUR HT` avec `200 EUR` de TVA. Le client paie un mois plus tard.

Si le vendeur n'a pas opte pour la TVA sur les debits, la TVA devient exigible au moment ou le paiement est encaisse. Cela veut dire que la TVA n'est pas seulement liee a la date de facture : elle depend de la date reelle d'encaissement.

Dans les formats de facture, cette situation se lit avec le cadre de facturation et le champ `BT-8` :

| Element | Explication |
| --- | --- |
| `S1` | Depot d'une facture de prestation de service. |
| `S2` | Depot d'une facture de prestation de service deja payee. |
| `BT-8` absent | Pour une prestation de service sans option sur les debits, on considere que la TVA reste a l'encaissement. |
| `BT-8 = 72` en UN/CEFACT CII | Le code signifie que la TVA est exigible a l'encaissement. |
| `BT-8 = 432` en UBL | Le code signifie que la TVA est exigible a l'encaissement. |

Consequence pratique : le vendeur ou sa plateforme doit pouvoir transmettre le statut ou les donnees d'encaissement. Si le paiement est partiel, l'information d'encaissement doit refleter le montant reellement encaisse, et pas seulement le montant total de la facture.

### Exemple 3 : meme service, mais option TVA sur les debits

Le vendeur peut avoir opte pour la TVA sur les debits. Dans ce cas, pour les prestations de services, la TVA devient exigible des l'inscription au debit du compte client, ce qui correspond souvent a la facturation.

La difference est importante :

| Situation | Moment d'exigibilite TVA | Effet operationnel |
| --- | --- | --- |
| Service sans option sur les debits | Encaissement du paiement | Il faut suivre et transmettre les donnees de paiement. |
| Service avec option sur les debits | Debit / facturation | Le suivi d'encaissement n'a pas le meme role fiscal pour l'exigibilite. |

Dans les donnees locales de l'application, la regle metier indique que l'option pour les debits est portee via `BT-8` avec le code `5` en CII ou `3` en UBL.

## Pourquoi cette notion est importante pour le cas 1

Le cas 1 semble d'abord etre un cas de regroupement documentaire : plusieurs commandes ou livraisons dans une meme facture. Mais des qu'une facture regroupe plusieurs operations, il faut eviter de melanger les logiques :

- une ligne peut correspondre a une livraison de biens ;
- une autre peut correspondre a une prestation de service ;
- une prestation de service peut etre a l'encaissement ;
- une facture deja payee peut relever d'un cadre `S2` ;
- un paiement partiel peut generer une information d'encaissement distincte.

La bonne lecture du cas consiste donc a distinguer le regroupement commercial de la regle fiscale applicable a chaque operation.

## Points de controle ERP

- Autoriser plusieurs references de commande ou livraison dans une meme facture.
- Conserver les references au niveau ligne quand elles different.
- Identifier si la facture contient des biens, des services, ou une facture mixte.
- Qualifier le cadre de facturation `BT-23` : `B1`, `S1`, `M1`, `B2`, `S2`, `M2`, etc.
- Pour les prestations de services, verifier si le vendeur a opte pour la TVA sur les debits.
- Si la TVA est a l'encaissement, conserver la date et le montant effectivement encaisses.
- En cas d'encaissement partiel, transmettre uniquement le montant encaisse avec la ventilation attendue.

## Nuances avec les cas voisins

| Cas | Situation | Type de flux | Nuance cle |
| --- | --- | --- | --- |
| **Cas 1** | Une facture regroupe plusieurs commandes ou livraisons | **B2B e-invoicing via PA** | Le sujet principal est la granularite des references commande/livraison, souvent au niveau ligne. |
| **Cas 2** | La facture est deja payee au moment de l'emission | **B2B e-invoicing via PA** | Le sujet principal est le montant deja paye et le net a payer, pas le regroupement logistique. |

Difference centrale : dans le cas 1, on cherche a rattacher correctement plusieurs operations commerciales a une facture. Dans le cas 2, on cherche a indiquer correctement qu'une operation est deja soldee.

## Sources

- `src/data/cases.js` : cas applicatif 1, "Multi-commande / multi-livraison".
- `juridique/02_DEFINITIONS_NOTIONS_REFORME.md` : definitions "TVA exigible a l'encaissement", "Option pour les debits" et "E-reporting paiement".
- `juridique/03_NOTIONS_PAR_CAS_REFORME.md` : matrice des notions par cas.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=39` : Annexe A v1.3, cas n°1 multi-commande / multi-livraison.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf#page=34` : exemple de facture deja payee et regle liee a `S1`, `S2`, `BT-8` et TVA a l'encaissement.
- `docs_tech/afnor/afnor_xp_z12_012_2025.pdf#page=17` : role de `BT-8` pour l'evenement d'exigibilite de la TVA.
- `docs_tech/e_reporting_donnees_paiement.pdf#page=1` : donnees de paiement a transmettre lorsque la TVA est exigible a l'encaissement.

## Pages liees

- [Definitions juridiques des notions](../../juridique/02_DEFINITIONS_NOTIONS_REFORME.md)
- [Notions par cas de reforme](../../juridique/03_NOTIONS_PAR_CAS_REFORME.md)
- [Roles des normes AFNOR](../06_normes_afnor.md)
- [Cas 2 - Facture déjà payée](cas_02_facture_deja_payee.md)
