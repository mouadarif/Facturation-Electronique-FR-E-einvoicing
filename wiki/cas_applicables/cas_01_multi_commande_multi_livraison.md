# Cas 1 - Multi-commande / multi-livraison

Status: current
Last updated: 2026-05-10

## Resume

Le cas 1 couvre une facture qui regroupe plusieurs commandes, plusieurs livraisons, ou les deux. Le sujet principal est la capacite du systeme de facturation a conserver les references utiles au bon niveau : soit au niveau de la facture, soit au niveau de chaque ligne.

Dans l'application, ce cas sert de point d'entree pour les factures B2B domestiques simples qui deviennent plus complexes parce qu'elles agregent plusieurs operations commerciales.

## Notion metier

Une entreprise peut emettre une seule facture pour plusieurs commandes ou plusieurs bons de livraison. Ce regroupement est acceptable si la facture reste exploitable par l'acheteur, la PDP et l'administration : les lignes doivent permettre de comprendre quelle commande ou livraison est concernee.

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

## Exemples concrets

### Exemple 1 : plusieurs commandes sur une facture de biens

Un client passe trois commandes dans le mois. Le vendeur livre les marchandises puis emet une seule facture mensuelle.

Dans ce cas, chaque ligne de facture doit idealement garder la reference de la commande ou de la livraison correspondante. La TVA sur les livraisons de biens est en general traitee au moment prevu par les regles de livraison/facturation, sans suivi d'encaissement comparable aux prestations de services a l'encaissement.

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

## Sources

- `src/data/cases.js` : cas applicatif 1, "Multi-commande / multi-livraison".
- `juridique/02_DEFINITIONS_NOTIONS_REFORME.md` : definitions "TVA exigible a l'encaissement", "Option pour les debits" et "E-reporting paiement".
- `juridique/03_NOTIONS_PAR_CAS_REFORME.md` : matrice des notions par cas.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf#page=25` : cas AFNOR multi-commande / multi-livraison.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf#page=34` : exemple de facture deja payee et regle liee a `S1`, `S2`, `BT-8` et TVA a l'encaissement.
- `docs_tech/afnor/afnor_xp_z12_012_2025.pdf#page=17` : role de `BT-8` pour l'evenement d'exigibilite de la TVA.
- `docs_tech/e_reporting_donnees_paiement.pdf#page=1` : donnees de paiement a transmettre lorsque la TVA est exigible a l'encaissement.

## Pages liees

- [Definitions juridiques des notions](../../juridique/02_DEFINITIONS_NOTIONS_REFORME.md)
- [Notions par cas de reforme](../../juridique/03_NOTIONS_PAR_CAS_REFORME.md)
- [Roles des normes AFNOR](../06_normes_afnor.md)
