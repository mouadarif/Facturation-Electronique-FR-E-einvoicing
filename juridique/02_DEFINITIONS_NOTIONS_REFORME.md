# Définitions juridiques et notions de référence

Date de vérification : 2026-04-26.

Ce document résume les notions juridiques qui sous-tendent les normes AFNOR XP Z12-012, XP Z12-013 et XP Z12-014. Les normes AFNOR expliquent l'implémentation opérationnelle ; les définitions opposables viennent des textes officiels, du BOFiP et des sources administratives.

## Carte de lecture

| Notion | Définition courte | Source officielle principale | Lien avec les normes AFNOR |
| --- | --- | --- | --- |
| Facture | Document de preuve commerciale et comptable décrivant une vente ou prestation, avec mentions obligatoires. | Code de commerce L441-9, CGI art. 289, CGI annexe II art. 242 nonies A, economie.gouv.fr | XP Z12-012 encode les données de facture dans UBL/CII/Factur-X. |
| Facture électronique B2B domestique | Facture émise, transmise et reçue sous forme électronique entre assujettis établis en France. | CGI art. 289 bis | XP Z12-012 décrit les formats ; XP Z12-014 décrit les cas d'usage. |
| E-invoicing | Périmètre des factures électroniques B2B domestiques et des données de facture associées. | CGI art. 289 bis, CGI art. 289 E, CGI annexe II art. 242 nonies J à L | XP Z12-012 et XP Z12-014. |
| E-reporting transaction | Transmission de données sur certaines opérations hors e-invoicing : B2B international, B2C, opérations situées selon les règles TVA. | CGI art. 290, CGI annexe II art. 242 nonies M à O | Les cas XP Z12-014 aident à qualifier certains scénarios, mais la source de champ reste juridique. |
| E-reporting paiement | Transmission des données de paiement lorsque la TVA est exigible à l'encaissement. | CGI art. 290 A | XP Z12-012 décrit les statuts/messages ; XP Z12-014 décrit des cas comme encaissement partiel. |
| Plateforme agréée / PDP | Plateforme utilisée pour la transmission des factures et données à l'administration. | CGI art. 289 bis, art. 289 E, annexe II art. 242 nonies B à P | XP Z12-013 décrit l'interfaçage API SI/PDP. |
| PPF / concentrateur / annuaire | Services publics recentrés autour de la concentration des données et de l'annuaire. | Annexe II art. 242 nonies J à P, documentation DGFiP/AIFE | XP Z12-013 pour les API ; XP Z12-014 pour les effets sur les cas. |
| Mandat de facturation | Mécanisme permettant à un client ou à un tiers d'établir une facture au nom et pour le compte de l'assujetti. | CGI annexe II art. 242 nonies, BOFiP TVA-DECLA-30-20-10 | XP Z12-014 Annexe A : cas 19a et 19b. |
| Auto-facturation | Cas où le client établit la facture au nom et pour le compte du fournisseur, sur mandat. | CGI annexe II art. 242 nonies, BOFiP TVA-DECLA-30-20-10 | XP Z12-014 Annexe A : cas 19b et cas 23. |
| Tiers facturant | Tiers mandaté pour créer/émettre la facture pour le compte du vendeur. | BOFiP TVA-DECLA-30-20-10 et 30-20-20-10 | XP Z12-014 Annexe A : cas 19a et cas 17b. |
| Affacturage | Opération financière liée à la cession/financement de créances ; l'affactureur devient le bénéficiaire du paiement selon le montage. | Code monétaire et financier art. L313-1 ; droit des cessions/subrogations à vérifier selon contrat | XP Z12-014 Annexe A : cas 8 à 10. |
| Rejet | Statut lié à un contrôle de conformité ou de réception qui empêche ou bloque le traitement de la facture. | Annexe II art. 242 nonies K/L pour les contrôles ; XP Z12-012 pour le statut | XP Z12-014 Annexe A : 2.2 et 2.3. |
| Refus | Décision métier de l'acheteur contre une facture reçue ; effet opérationnel sur traitement, comptabilisation et pré-remplissage TVA. | Principalement normatif/opérationnel AFNOR ; à relier aux règles comptables et fiscales applicables | XP Z12-014 Annexe A : 2.4. |
| Litige | Contestation métier nécessitant correction, avoir ou facture rectificative. | Notion opérationnelle ; la correction fiscale passe par les règles de facturation/avoirs | XP Z12-014 Annexe A : 2.5 et 2.6. |
| Avoir / facture rectificative | Document corrigeant ou annulant une facture antérieure. | CGI art. 289, BOFiP TVA-DECLA-30-20-20-20 | XP Z12-012 pour les formats ; XP Z12-014 pour les scénarios. |
| Acompte | Paiement partiel versé avant livraison/prestation, pouvant donner lieu à facture d'acompte. | CGI art. 289, annexe II art. 242 nonies A | XP Z12-014 Annexe A : cas 20/21. |
| TVA exigible à l'encaissement | TVA due lors de l'encaissement pour certaines opérations, notamment prestations de services hors option pour les débits. | CGI art. 269, CGI art. 290 A | XP Z12-014 Annexe A : escompte, encaissement, paiements mensuels. |
| Option pour les débits | Option qui modifie le moment d'exigibilité de la TVA pour certaines prestations. | CGI art. 269, mentions facture via annexe II art. 242 nonies A | Mention et données à porter dans les flux XP Z12-012. |
| Assujetti unique / groupe TVA | Régime où plusieurs personnes forment un assujetti unique au sens TVA. | CGI art. 256 C, annexe II art. 242 nonies A | XP Z12-014 Annexe A : cas 29. |
| TVA sur la marge | Régime où la TVA porte sur la marge et non sur le prix total selon les cas légaux. | CGI art. 266, 268, 297 A selon opération | XP Z12-014 Annexe A : cas 33. |
| Bons à usage unique / multiple | Régimes TVA spécifiques selon que le lieu et la taxe due sont connus dès l'émission du bon. | CGI et doctrine TVA à vérifier selon bon | XP Z12-014 Annexe A : cas 25. |
| Secret professionnel / données sensibles | Certaines données peuvent être limitées ou traitées avec précaution, notamment la dénomination précise du bien/service. | CGI annexe II art. 242 nonies J, Code pénal art. 226-13 | XP Z12-014 Annexe A : cas 36. |

## Définitions synthétiques

### Facture

Une facture est une pièce commerciale et comptable qui matérialise une livraison de biens ou une prestation de services. Entre professionnels, la facturation est obligatoire ; son contenu doit respecter les mentions prévues par le Code de commerce, le CGI et l'annexe II du CGI.

Sources officielles :
- Code de commerce, article L441-9 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028743898/
- CGI, article 289 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006305807/
- CGI annexe II, article 242 nonies A : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046086694
- Ministère de l'Économie, mentions obligatoires : https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/mentions-obligatoires-dune-facture-tout-savoir

Lien AFNOR :
- XP Z12-012 : structure des données de facture, profils, formats et règles de gestion.
- XP Z12-014 : scénarios d'usage impliquant cette facture.

### Facture électronique B2B domestique

La facture électronique obligatoire vise les opérations entre assujettis établis, domiciliés ou résidant habituellement en France, lorsqu'elles relèvent du périmètre de l'article 289 bis du CGI. L'émission, la transmission et la réception se font sous forme électronique selon des normes définies par arrêté.

Sources officielles :
- CGI, article 289 bis : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044051178
- Économie, calendrier de déploiement : https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/mentions-obligatoires-dune-facture-tout-savoir

Lien AFNOR :
- XP Z12-012 : formats UBL, CII, Factur-X et statuts.
- XP Z12-014 : cas nominal, refus, rejet, litige, tiers, affacturage, mandat, etc.

### E-reporting transaction

L'e-reporting transaction couvre la transmission électronique de données sur des opérations qui ne relèvent pas de la facture électronique B2B domestique : certaines opérations B2B internationales, B2C, ventes à distance, opérations situées en France ou hors France selon les règles de territorialité TVA.

Sources officielles :
- CGI, article 290 : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000046195631
- CGI annexe II, articles 242 nonies M à O : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000046385456/2026-09-01

Lien AFNOR :
- Les normes AFNOR n'élargissent pas le champ juridique ; elles aident à structurer les flux et les cas.

### E-reporting paiement

L'e-reporting paiement concerne les données de paiement relatives aux opérations pour lesquelles la TVA est exigible à l'encaissement, sauf exceptions prévues par le texte.

Source officielle :
- CGI, article 290 A : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046195613

Lien AFNOR :
- XP Z12-012 : statuts de cycle de vie.
- XP Z12-014 Annexe A : encaissement partiel, annulation d'encaissement, escompte, paiements mensuels.

### Plateforme agréée, PPF, annuaire et concentrateur

La réforme repose sur des plateformes agréées choisies par les assujettis pour la transmission des factures et des données. Les textes prévoient aussi les contrôles, délais et modalités de transmission des données vers l'administration.

Sources officielles :
- CGI, article 289 E : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000046195631
- CGI annexe II, articles 242 nonies B à P : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000046385456/2026-09-01
- DGFiP, plateformes agréées : https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees
- DGFiP, espace plateformes agréées : https://www.impots.gouv.fr/facturation-electronique-et-plateformes-agreees

Lien AFNOR :
- XP Z12-013 : API d'interfaçage entre SI/ERP/OD/PDP.
- XP Z12-014 : impacts métier sur les cas de routage, réception et statuts.

### Mandat de facturation, tiers facturant et auto-facturation

Un mandat de facturation permet au client ou à un tiers d'établir des factures au nom et pour le compte du fournisseur. L'autofacturation est le cas où le client facture pour le compte du fournisseur. Le tiers facturant est un tiers mandaté pour accomplir cette émission.

Sources officielles :
- CGI annexe II, article 242 nonies : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027356472
- BOFiP, BOI-TVA-DECLA-30-20-10 : https://bofip.impots.gouv.fr/export/pdf/2134
- BOFiP, personnes tenues de délivrer des factures : https://bofip.impots.gouv.fr/bofip/13244-PGP.html/identifiant%3DBOI-TVA-DECLA-30-20-10-30-20220629
- BOFiP, mentions générales et numérotation : https://bofip.impots.gouv.fr/bofip/140-PGP.html/identifiant%3DBOI-TVA-DECLA-30-20-20-10-20121231

Résumé opérationnel :
- mandat écrit et préalable ;
- facture émise au nom et pour le compte du fournisseur ;
- numérotation chronologique et continue propre au mandant ;
- mention recommandée du type "facture établie par A au nom et pour le compte de B".

Lien AFNOR :
- XP Z12-014 Annexe A, cas 17b, 19a, 19b et 23.

### Affacturage

L'affacturage est une opération financière portant sur des créances commerciales. Dans les cas de facturation électronique, il se traduit opérationnellement par la présence d'un bénéficiaire ou d'un changement de bénéficiaire/IBAN, et parfois par des statuts de cycle de vie spécifiques.

Source officielle :
- Code monétaire et financier, article L313-1 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006652080

À compléter selon contrat :
- subrogation conventionnelle ;
- cession Dailly ;
- cession de créance de droit commun ;
- affacturage confidentiel ou non confidentiel.

Lien AFNOR :
- XP Z12-014 Annexe A, cas 8 à 10.

### Rejet, refus et litige

Ces trois notions ne sont pas de même nature.

| Notion | Sens court | Source de définition |
| --- | --- | --- |
| Rejet | Échec de contrôles techniques, applicatifs, fonctionnels ou de réception. | Textes sur contrôles + XP Z12-012/014 pour le statut et le processus. |
| Refus | Décision de l'acheteur de refuser une facture mise à disposition. | Surtout XP Z12-014 Annexe A ; effets fiscaux/comptables à vérifier selon cas. |
| Litige | Contestation métier avant résolution par avoir, facture rectificative ou accord hors flux. | Surtout XP Z12-014 Annexe A ; correction via règles de facturation/avoirs. |

Sources officielles et normatives :
- CGI annexe II, article 242 nonies K/L pour les contrôles de conformité : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000046385456/2026-09-01
- XP Z12-012 : statuts de cycle de vie.
- XP Z12-014 Annexe A : rejet à l'émission, rejet en réception, refus, litige.

### Avoir et facture rectificative

Un avoir ou une facture rectificative corrige une facture antérieure. La logique juridique vient des règles de facturation et de TVA ; la logique de flux vient des normes AFNOR.

Sources officielles :
- CGI, article 289 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006305807/
- BOFiP, factures rectificatives : https://bofip.impots.gouv.fr/export/pdf/1872

Lien AFNOR :
- XP Z12-012 : type de document et données de référence.
- XP Z12-014 Annexe A : litige suivi d'avoir ou de facture rectificative.

### Acompte

Un acompte est un paiement partiel intervenant avant la livraison ou l'achèvement de la prestation. Il peut déclencher une facture d'acompte, puis une facture finale ou définitive.

Sources officielles :
- CGI, article 289 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006305807/
- CGI annexe II, article 242 nonies A : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046086694

Lien AFNOR :
- XP Z12-014 Annexe A, cas 20 et 21.

### TVA sur la marge

La TVA sur la marge s'applique à certains régimes spécifiques ; la facture ne se traite pas comme une facture classique HT/TVA sur prix total.

Sources officielles :
- CGI, article 266 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006305464/
- CGI, article 268 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006305483/
- CGI, article 297 A : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006305961/

Lien AFNOR :
- XP Z12-014 Annexe A, cas 33.

### Assujetti unique / groupe TVA

L'assujetti unique permet à plusieurs personnes liées de constituer un seul assujetti TVA. Les factures doivent porter certaines mentions lorsque l'opération est effectuée par un membre de l'assujetti unique.

Sources officielles :
- CGI, article 256 C : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044979762/
- CGI annexe II, article 242 nonies A : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046086694

Lien AFNOR :
- XP Z12-014 Annexe A, cas 29.

## Références officielles pivots

### Légifrance

- CGI, article 289 bis : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044051178
- CGI, articles 289 E à 290 A : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000046195631
- CGI annexe II, article 242 nonies : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027356472
- CGI annexe II, article 242 nonies A : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046086694
- CGI annexe II, articles 242 nonies J à P : https://www.legifrance.gouv.fr/codes/id/LEGISCTA000046385456/2026-09-01
- Code monétaire et financier, article L313-1 : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006652080

### BOFiP

- BOI-TVA-DECLA-30-20-10, règles relatives à l'établissement des factures : https://bofip.impots.gouv.fr/export/pdf/2134
- BOI-TVA-DECLA-30-20-10-30, personnes tenues de délivrer des factures : https://bofip.impots.gouv.fr/bofip/13244-PGP.html/identifiant%3DBOI-TVA-DECLA-30-20-10-30-20220629
- BOI-TVA-DECLA-30-20-20-10, mentions obligatoires générales : https://bofip.impots.gouv.fr/bofip/140-PGP.html/identifiant%3DBOI-TVA-DECLA-30-20-20-10-20121231
- BOI-TVA-DECLA-30-20-30, transmission électronique des factures : https://bofip.impots.gouv.fr/bofip/1406-PGP.html/identifiant%3DBOI-TVA-DECLA-30-20-30-20120912

### Administration / ministères

- Économie, mentions obligatoires d'une facture : https://www.economie.gouv.fr/entreprises/gerer-son-entreprise-au-quotidien/gerer-sa-comptabilite-et-ses-demarches/mentions-obligatoires-dune-facture-tout-savoir
- DGFiP, je passe à la facturation électronique : https://www.impots.gouv.fr/professionnel/je-passe-la-facturation-electronique
- DGFiP, spécifications externes B2B : https://www.impots.gouv.fr/specifications-externes-b2b
- DGFiP, liste des plateformes agréées : https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees

## À retenir

Les normes AFNOR ne remplacent pas le droit. Elles traduisent le droit et les spécifications en formats, API, statuts et scénarios opérationnels.

- Pour savoir si une opération est obligatoire : lire CGI / BOFiP / DGFiP.
- Pour savoir quelles données transmettre : lire CGI annexe II et spécifications DGFiP.
- Pour savoir comment coder la facture ou le statut : lire XP Z12-012.
- Pour savoir comment connecter SI, ERP, OD et PDP : lire XP Z12-013.
- Pour savoir comment traiter un cas métier : lire XP Z12-014 et son Annexe A.
