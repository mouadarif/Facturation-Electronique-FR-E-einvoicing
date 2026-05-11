# Formats et exemples statiques — notes

## Ce que l'officiel confirme
- la réforme accepte **UBL**, **CII** et **Factur-X**
- Factur-X combine un PDF lisible et un XML structuré
- la page des spécifications externes annonce des **exemples**, **XSD** et **swaggers** dans le ZIP officiel v3.1

## Exemple statique réellement présent dans le pack
- `docs_tech/norme_afnor_xp_z12_012_2025.pdf`
  - utile pour comprendre les profils et le socle minimal
  - utile pour le couple Factur-X / CII et le message CDAR

## Exemple statique non recopié localement
- exemples XML/XSD/Swagger du ZIP v3.1
- raison : archive ZIP officielle non copiée localement dans cet environnement

## Consigne de lecture future
1. récupérer le ZIP officiel v3.1 hors de ce pack
2. isoler les exemples XML par flux
3. isoler les XSD et les swaggers
4. mapper ensuite vers ERP / middleware / PDP
