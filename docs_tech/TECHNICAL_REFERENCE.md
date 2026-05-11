# Référence technique — facture électronique (France)

## Périmètre
Ce fichier sert de point d’entrée technique rapide.

## Où regarder selon la question
- **Cadre global / calendrier** → `../docs_core/calendrier_reforme.pdf`, `../docs_core/documentation_juridique.pdf`
- **FAQ fonctionnelle** → `../docs_core/faq_je_decouvre.pdf`, `../docs_tech/faq_japprofondis.pdf`
- **Formats / données / flux** → `../docs_tech/donnees_facture_correspondance_flux.pdf`, `../docs_tech/e_reporting_*.pdf`
- **Normes / formats attendus** → `norme_afnor_xp_z12_012_2025.pdf`
- **Spécifications externes complètes** → `specifications_externes_v3_1_link.md`
- **Plateformes agréées / OD / immatriculation** → `../docs_platforms/`
- **Annuaire / AIFE / démonstration** → `../wiki/03_sources_officielles_et_liens.md`

## Stack cible à connaître
### 1. Acteurs
- **Entreprise émettrice / réceptrice**
- **PDP** : plateforme agréée par l’État
- **OD** : opérateur de dématérialisation non immatriculé
- **PPF** : recentré sur l’annuaire et la concentration des données
- **Administration fiscale**

### 2. Formats
- **UBL**
- **CII**
- **Factur-X** (format mixte : PDF + XML structuré)

### 3. Blocs techniques récurrents
- identification entreprise
- adresse électronique de facturation
- plateforme de réception
- données de facture
- statuts de cycle de vie
- données de transaction
- données de paiement
- protocoles d’interopérabilité / raccordement

### 4. Documents techniques prioritaires
1. `specifications_externes_v3_1_link.md`
2. `norme_afnor_xp_z12_012_2025.pdf`
3. `donnees_facture_correspondance_flux.pdf`
4. `e_reporting_operations_champ.pdf`
5. `e_reporting_frequences_delais.pdf`
6. `../docs_platforms/guide_immatriculation_pdp.pdf`

## Points d’attention
- Ne pas confondre **PDP** et **OD**.
- Le **PPF** n’est plus la plateforme universelle d’émission/réception ; son rôle est recentré.
- Les **exemples XML / XSD / swagger** sont renvoyés vers l’archive officielle v3.1.
- L’**annuaire** devient central pour le routage.
