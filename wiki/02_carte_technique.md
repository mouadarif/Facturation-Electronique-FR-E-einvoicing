# 02 — Carte technique

## 1. Acteurs
### PDP
Plateforme agréée immatriculée par l’administration.
Capable de :
- émettre
- transmettre
- recevoir
- extraire et transmettre les données utiles
- gérer les données de transaction et de paiement

### OD
Opérateur de dématérialisation.
Peut rendre des services logiciels mais n’a pas, sans immatriculation, toutes les prérogatives d’une PDP.

### PPF
Portail public de facturation recentré sur :
- l’annuaire
- la concentration des données
- certains services de qualification / interopérabilité

## 2. Formats
- **UBL**
- **CII**
- **Factur-X** = PDF lisible + XML structuré

## 3. Objets techniques récurrents
- facture
- cycle de vie / statuts
- données de transaction
- données de paiement
- annuaire des destinataires
- adresses électroniques de facturation
- interopérabilité PDP ↔ PDP
- interopérabilité PDP ↔ PPF
- qualification / tests

## 4. Sources techniques prioritaires
- `../docs_tech/specifications_externes_v3_1_link.md`
- `../docs_tech/norme_afnor_xp_z12_012_2025.pdf`
- `../docs_tech/donnees_facture_correspondance_flux.pdf`
- `../docs_tech/e_reporting_donnees_transaction.pdf`
- `../docs_tech/e_reporting_donnees_paiement.pdf`
- `../docs_tech/e_reporting_frequences_delais.pdf`
- `../docs_platforms/guide_immatriculation_pdp.pdf`

## 5. Annuaire
L’annuaire est une brique centrale :
- identification des entreprises concernées
- plateforme de réception associée
- adresse électronique de facturation

Accès public :
- https://facturation.chorus-pro.gouv.fr/annuaire

## 6. Peppol
Peppol France sert de cadre réseau pour l’interopérabilité.
Voir :
- https://www.impots.gouv.fr/rejoindre-le-reseau-peppol
