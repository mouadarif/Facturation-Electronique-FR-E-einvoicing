# Cas 2 - Facture deja payee

Status: current
Last updated: 2026-05-10

## Resume

Le cas 2 couvre une facture emise alors que le reglement est deja intervenu au moment de l'emission. Le paiement peut avoir ete fait par l'acheteur ou par un tiers payeur. La facture formalise alors une operation deja soldee, avec un montant restant a payer nul ou deja couvert.

Le point important est de ne pas confondre cette situation avec une facture d'acompte. Dans les deux cas, il peut y avoir un paiement avant ou au moment de la facture. Mais le sens juridique, fiscal et ERP n'est pas le meme.

## Notion metier

Une facture deja payee correspond a une operation dont le prix facture est deja regle quand la facture est emise. Elle peut apparaitre dans des parcours comme :

- commande payee en ligne au moment de la commande ;
- paiement par carte ou virement avant emission de la facture ;
- paiement par un tiers payeur connu ;
- facture de service deja encaissee au moment de son depot.

Dans les cadres de facturation, on retrouve notamment :

| Cadre | Sens |
| --- | --- |
| `B2` | Depot d'une facture de bien deja payee. |
| `S2` | Depot d'une facture de prestation de service deja payee. |
| `M2` | Depot d'une facture mixte deja payee. |

## Notions a connaitre

### Comment lire les codes

Dans les normes et les specifications, beaucoup d'informations sont exprimees avec des codes. Il ne faut pas les lire comme du jargon abstrait : chaque code correspond a une donnee metier precise.

| Code | Nom simple | A quoi ca sert dans ce cas |
| --- | --- | --- |
| `BT` | Business Term, ou donnee normalisee de facture | C'est un champ standard de la facture electronique. Exemple : `BT-23` indique le cadre de facturation. |
| `BR` | Business Rule, ou regle de controle | Ce n'est pas une donnee de facture, mais une regle qui verifie la coherence des donnees. |
| `B` dans `B1/B2/B4` | Bien | La facture concerne une livraison de biens. |
| `S` dans `S1/S2/S4` | Service | La facture concerne une prestation de service. |
| `M` dans `M1/M2/M4` | Mixte | La facture contient a la fois des biens et des services non accessoires l'un de l'autre. |
| Suffixe `1` | Facture normale | Depot classique d'une facture de bien, service ou mixte. |
| Suffixe `2` | Facture deja payee | La facture est deposee alors que le paiement est deja intervenu. |
| Suffixe `4` | Facture definitive apres acompte | La facture finale solde une operation pour laquelle un acompte a deja ete facture. |

### Mini-dictionnaire des champs cites

| Champ ou code | Nom lisible | Explication metier | Exemple |
| --- | --- | --- | --- |
| `BT-23` | Cadre de facturation | Champ qui dit dans quel scenario metier la facture est deposee. | `S2` si c'est une facture de service deja payee. |
| `BT-9` | Date d'echeance ou date liee a l'acompte selon le cas | Date utile pour savoir quand le paiement est attendu ou, dans certains cas, comment traiter un acompte. | Si la facture est deja payee, une date incoherente peut declencher un controle. |
| `BT-2` | Date de facture | Date d'emission de la facture. | Facture emise le 10 mai 2026. |
| `BT-3` | Type de facture | Champ qui precise si le document est une facture commerciale, une facture d'acompte, un avoir, etc. | `386` signifie facture d'acompte. |
| `BT-115` | Montant a payer | Montant restant du par l'acheteur sur la facture. | Pour une facture deja payee, il peut etre egal a `0`. |
| `386` | Type "facture d'acompte" | Code utilise dans `BT-3` pour dire que le document est une facture d'acompte. | A utiliser pour une avance partielle sur une operation future. |
| `BR-FR-08` | Regle de coherence francaise | Regle qui controle notamment la coherence des dates dans les cas d'acompte ou de facture deja payee. | Elle explique pourquoi `B2/S2/M2` peut etre utile si le paiement est anterieur a la facture. |

### Cadre de facturation

Le cadre de facturation est la categorie metier indiquee dans la facture pour expliquer la nature du depot. Dans les donnees de facture, il est porte par `BT-23`.

Il ne dit pas seulement "ceci est une facture". Il precise le contexte : facture de bien, facture de service, facture mixte, facture deja payee, facture definitive apres acompte, etc.

Lecture rapide :

| Cadre | Traduction |
| --- | --- |
| `B1` | Facture normale de biens. |
| `S1` | Facture normale de services. |
| `M1` | Facture normale mixte, avec biens et services. |
| `B2` | Facture de biens deja payee. |
| `S2` | Facture de services deja payee. |
| `M2` | Facture mixte deja payee. |
| `B4` | Facture definitive de biens apres acompte. |
| `S4` | Facture definitive de services apres acompte. |
| `M4` | Facture definitive mixte apres acompte. |

### `B2`, `S2`, `M2`

Les cadres avec le suffixe `2` designent des factures deja payees au moment du depot :

| Code | Signification | Exemple simple |
| --- | --- | --- |
| `B2` | Facture de bien deja payee | Marchandise payee integralement a la commande, facture emise apres paiement. |
| `S2` | Facture de prestation de service deja payee | Intervention de maintenance payee avant emission de la facture. |
| `M2` | Facture mixte deja payee | Facture comprenant biens et services, deja reglee au moment de l'emission. |

Dans `S2`, le `S` signifie "service" et le `2` signifie "deja payee". Donc `S2` ne veut pas dire acompte : cela veut dire que la facture de service deposee correspond a une prestation deja payee.

### Pourquoi la norme dit aussi `B1`, `S1`, `M1`

La mention "cadre de facturation deja payee (`B2` / `S2` / `M2`) ou cadre `B1` / `S1` / `M1`" veut dire que le caractere "deja paye" peut etre traite de deux manieres selon le scenario et les donnees transmises.

| Famille de cadres | Sens | Lecture pratique |
| --- | --- | --- |
| `B2`, `S2`, `M2` | La facture est explicitement deposee comme deja payee. | A privilegier quand le paiement est deja intervenu et que la facture porte clairement cette situation, notamment avec montant a payer nul ou date de paiement connue. |
| `B1`, `S1`, `M1` | La facture est deposee comme facture normale de bien, service ou mixte. | Possible si le flux reste traite comme une facture normale et que le paiement est gere par le cycle de vie, le rapprochement ou les statuts, sans forcer le cadre "deja payee". |

Autrement dit, `B2/S2/M2` ne sont pas toujours obligatoires des qu'un paiement existe. Ils servent a marquer explicitement une facture deja payee dans `BT-23`. Mais certains cas AFNOR acceptent aussi le cadre normal `B1/S1/M1`, notamment lorsque l'operation reste structuree comme une facture classique et que le paiement est porte ailleurs dans le processus.

Point de vigilance : la regle `BR-FR-08` de XP Z12-012 controle la coherence de la date d'echeance `BT-9`. Si une facture indique une date d'echeance ou de paiement anterieure a la date de facture, les cadres "deja payee" `B2/S2/M2` peuvent etre necessaires pour que la situation soit coherente. Si on reste en `B1/S1/M1`, il faut verifier que les dates et montants ne contredisent pas les regles de controle.

### Pourquoi l'exemple 2 peut etre `S2`

Dans l'exemple 2, le client a deja paye la prestation avant que la facture soit deposee. Comme la facture concerne une prestation de service, le cadre logique peut etre `S2` : depot d'une facture de service deja payee.

Mais `S2` n'est pas une conclusion automatique. Si l'entreprise ou la PDP conserve un traitement de facture normale, la facture peut aussi rester en `S1`, a condition que les donnees restent coherentes : montant a payer, date d'echeance, statut de paiement, information d'encaissement et regles de controle.

Ce serait different si le client avait seulement verse une avance de 30 % sur une prestation future. Dans ce cas, on ne serait plus dans `S2`, mais dans une facture d'acompte, puis plus tard dans une facture definitive apres acompte.

### Lien avec la TVA a l'encaissement

Pour une prestation de service sans option TVA sur les debits, la TVA est souvent exigible a l'encaissement. Si la facture est en `S2`, cela signifie que l'encaissement a deja eu lieu au moment du depot de la facture.

Le vendeur doit donc pouvoir rattacher la facture au paiement deja recu. Selon le cas et les obligations applicables, l'information d'encaissement peut devoir etre transmise ou exploitable dans le cycle de vie.

## Difference entre acompte et commande payee a la commande

La difference se joue sur une question simple : le paiement couvre-t-il deja l'operation facturee, ou seulement une partie d'une operation future ?

| Situation | Ce que le paiement represente | Document attendu | Suite normale |
| --- | --- | --- | --- |
| Commande payee a la commande | Paiement du prix total de la commande ou de la facture | Facture deja payee possible en `B2`, `S2` ou `M2`; cadre normal `B1`, `S1` ou `M1` possible si les donnees restent coherentes | Pas de facture finale a deduire, sauf correction ou avoir |
| Acompte | Paiement partiel a valoir sur une livraison ou prestation future | Facture d'acompte, type `386` ou equivalent auto-facture si applicable | Facture definitive apres acompte, cadre `B4`, `S4` ou `M4` |

## Exemples concrets

### Exemple 1 : commande B2B payee integralement a la commande

Une entreprise achete du materiel pour `1 200 EUR TTC` sur un portail fournisseur. Elle paie immediatement par carte bancaire au moment de la commande. Le fournisseur emet ensuite la facture.

Dans ce cas, le paiement couvre deja le montant total de la facture. On n'est pas sur un acompte : il n'y a pas une facture d'acompte puis une facture finale qui deduit cet acompte. La facture peut etre qualifiee comme facture de bien deja payee, donc cadre `B2`. Selon le scenario d'integration, elle peut aussi rester en `B1` si la facture est deposee comme facture normale et que le paiement est gere par le rapprochement ou le cycle de vie.

Points attendus :

- le montant a payer (`BT-115`) est nul ou coherent avec une facture deja reglee ;
- la date de paiement est connue ;
- la facture doit etre rapprochee du paiement deja recu ;
- si une date d'echeance (`BT-9`) est presente, elle doit rester coherente avec une facture deja payee.

### Exemple 2 : prestation de service payee avant emission de facture

Un prestataire vend une intervention de maintenance a `500 EUR HT + 100 EUR TVA`. Le client paie immediatement. La facture est emise apres paiement.

Si la prestation est deja payee au moment du depot, le cadre peut etre `S2`, ou rester `S1` si le flux est traite comme une facture normale et que les donnees de paiement sont gerees ailleurs. Si le vendeur n'a pas opte pour la TVA sur les debits, la TVA est en principe exigible a l'encaissement. Comme l'encaissement a deja eu lieu, le vendeur doit etre capable de rattacher la facture au paiement deja recu et, si requis, de transmettre l'information d'encaissement.

Ce n'est pas une facture d'acompte si les `600 EUR TTC` correspondent au prix total de la prestation facturee.

### Exemple 3 : acompte sur une commande future

Un client commande une prestation de `10 000 EUR HT`. Il verse `30 %` au lancement, soit `3 000 EUR HT`, puis le solde sera facture a la fin du projet.

Ici, le paiement ne solde pas l'operation complete. Il s'agit d'un acompte. Le vendeur doit emettre une facture d'acompte pour les `30 %`. Dans la facture electronique, le type de facture (`BT-3`) doit alors indiquer une facture d'acompte, par exemple avec le code `386`. Une facture definitive sera ensuite emise a la fin du projet.

La facture definitive ne doit pas refaire comme si rien n'avait deja ete facture. Elle doit rappeler ou deduire les acomptes deja factures afin d'eviter :

- une double facturation ;
- une double declaration de TVA ;
- un mauvais solde client ;
- une erreur de rapprochement comptable.

### Exemple 4 : commande payee a la commande mais livraison plus tard

Un client paie `100 %` de la commande au moment de la commande, mais la livraison aura lieu quelques jours plus tard.

Le point de qualification n'est pas seulement la date de livraison : il faut regarder si le paiement couvre tout le prix facture ou seulement une avance. Si le client a paye la totalite du prix et que la facture emise correspond a cette totalite, on se rapproche du cas "facture deja payee". Si le paiement ne couvre qu'une partie du prix et qu'une facture finale doit suivre, on bascule dans la logique d'acompte.

## Regle de decision rapide

| Question | Si oui | Si non |
| --- | --- | --- |
| Le paiement couvre-t-il 100 % du montant facture ? | Facture deja payee possible. | Regarder la logique d'acompte ou de paiement partiel. |
| Une facture finale devra-t-elle deduire ce paiement ? | Acompte. | Facture deja payee possible. |
| Le document porte-t-il seulement une avance sur une operation future ? | Acompte. | Facture simple deja payee ou facture classique. |
| Le montant restant a payer est-il nul des l'emission ? | Indice fort de facture deja payee. | Pas suffisant pour conclure, analyser le cas. |

## Points de controle ERP

- Ne pas typer automatiquement tout paiement avant facture comme "acompte".
- Distinguer paiement total, paiement partiel et avance contractuelle.
- Utiliser le cadre `B2`, `S2` ou `M2` lorsque l'on veut declarer explicitement dans `BT-23` que la facture deposee est deja payee.
- Accepter `B1`, `S1` ou `M1` si le flux reste une facture normale et si les dates, montants et statuts restent coherents avec les controles.
- Utiliser une facture d'acompte lorsque le paiement est partiel et appelle une facture definitive ; dans ce cas, le type de facture (`BT-3`) doit refleter l'acompte, par exemple avec le code `386`.
- Chainage obligatoire en logique acompte : commande, facture d'acompte, paiement, facture definitive, solde.
- Controler que la facture definitive deduit les acomptes deja factures.
- Pour les services a TVA a l'encaissement, rattacher la facture au paiement effectif.

## Pieges frequents

- Appeler "acompte" une commande payee integralement a la commande.
- Emettre une facture d'acompte alors que le prix total est deja paye et facture.
- Oublier de deduire l'acompte sur la facture definitive.
- Declarer deux fois la TVA : une premiere fois sur l'acompte, puis une seconde fois sur le total final sans deduction.
- Confondre "deja payee" avec "payable immediatement" : une facture payable immediatement n'est pas forcement deja payee.

## Sources

- `src/data/cases.js` : cas applicatif 2, "Facture deja payee par l'acheteur ou un tiers payeur au moment de l'emission".
- `juridique/02_DEFINITIONS_NOTIONS_REFORME.md` : definition de l'acompte.
- `src/data/officialAnnexData.js` : cadres `B2`, `S2`, `M2`, `B4`, `S4`, `M4` et types de factures d'acompte.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf#page=25` : cas AFNOR de facture deja payee.
- `docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf#page=81` : cas AFNOR facture d'acompte et facture definitive apres acompte.
- `docs_tech/afnor/afnor_xp_z12_012_2025.pdf#page=31` : regles liees a la date d'echeance et aux factures deja payees / acomptes.

## Pages liees

- [Cas 1 - Multi-commande / multi-livraison](cas_01_multi_commande_multi_livraison.md)
- [Definitions juridiques des notions](../../juridique/02_DEFINITIONS_NOTIONS_REFORME.md)
- [Notions par cas de reforme](../../juridique/03_NOTIONS_PAR_CAS_REFORME.md)
- [Roles des normes AFNOR](../06_normes_afnor.md)
