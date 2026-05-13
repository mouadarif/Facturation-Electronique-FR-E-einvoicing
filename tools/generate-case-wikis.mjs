import fs from "node:fs";
import path from "node:path";
import { cases } from "../src/data/cases.js";
import { wikiPathForCase } from "../src/app/model.js";

const root = process.cwd();
const today = "2026-05-12";
const annexAPath = "docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b_v1_3.pdf";

function stripTags(value = "") {
  return value.replace(/`/g, "").replace(/\s+/g, " ").trim();
}

function sourceLink(item) {
  const page = item.afnorSource?.page || item.annexPage;
  return page ? `${annexAPath}#page=${page}` : annexAPath;
}

function nuanceBullets(item) {
  const base = [
    `La fiche Annexe A v1.3 reste la source d'autorite pour le perimetre, les acteurs et les obligations de plateforme.`,
    `La synthese applicative ne doit pas remplacer la qualification fiscale: TVA, exigibilite, lieu d'imposition et statut des parties doivent etre valides sur la piece reelle.`,
    `Cote ERP, le controle prioritaire est: ${stripTags(item.erp)}`
  ];

  if (item.category === "b2b-int") {
    base.push("Pour l'international, distinguer e-invoicing domestique et e-reporting transaction; le lieu des parties et le flux physique peuvent changer la qualification.");
  }
  if (item.category === "b2c") {
    base.push("Pour le B2C, verifier si le vendeur doit transmettre une donnee d'e-reporting plutot qu'une facture B2B structuree.");
  }
  if (item.category === "statuts") {
    base.push("Quand un statut de cycle de vie ou un encaissement est implique, conserver la date, le montant, le motif et l'acteur emetteur du statut.");
  }
  if (/tiers|intermediaire|mandat|marketplace|affacturage|sous-traitance|co-traitance/i.test(item.title + " " + item.type)) {
    base.push("Ne pas confondre les roles: acheteur/vendeur juridiques, payeur, beneficiaire du paiement, tiers gestionnaire et tiers facturant peuvent etre differents.");
  }
  if (/acompte|arrhes|escompte|encaissement|mensuels|paiement/i.test(item.title + " " + item.type)) {
    base.push("Les montants payes, restants dus, annules ou regularises doivent rester reconciliables avec la facture et les statuts transmis.");
  }
  return base;
}

function pageContent(item) {
  const related = cases
    .filter((candidate) => candidate.id !== item.id && candidate.category === item.category)
    .slice(0, 3);
  const source = sourceLink(item);
  return `# ${item.afnorCase} - ${item.title}

Status: draft
Last updated: ${today}

## Summary

${stripTags(item.description)}

Dans l'application, ce cas est classe dans la famille **${item.category}** avec le type **${stripTags(item.type)}**. L'exemple local est: ${stripTags(item.example)}

## Key points

${nuanceBullets(item).map((entry) => `- ${entry}`).join("\n")}

## App interpretation

- Format attendu: ${stripTags(item.format)}
- Impact ERP: ${stripTags(item.erp)}
- Page Annexe A v1.3 liee: ${item.afnorSource?.page ? `page ${item.afnorSource.page}` : "a verifier"}

## Verification notes

Cette page est une synthese locale basee sur la fiche Annexe A v1.3 et sur la carte applicative. Elle est utilisable pour orienter l'analyse, mais une decision projet doit toujours revenir a la fiche AFNOR, aux donnees de facture et au traitement fiscal du cas reel.

## Sources

- \`${source}\`
- \`docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf\`
- \`src/data/cases.js\`

## Related pages

- [Index wiki](../index.md)
${related.map((candidate) => `- [${candidate.afnorCase} - ${candidate.title}](${path.basename(wikiPathForCase(candidate))})`).join("\n")}
`;
}

let created = 0;
let updated = 0;
for (const item of cases) {
  const relativePath = wikiPathForCase(item);
  const absolutePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  if (fs.existsSync(absolutePath)) {
    const current = fs.readFileSync(absolutePath, "utf8");
    const next = current.replaceAll(
      "docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf",
      annexAPath
    );
    if (next !== current) {
      fs.writeFileSync(absolutePath, next, "utf8");
      updated += 1;
    }
    continue;
  }
  fs.writeFileSync(absolutePath, pageContent(item), "utf8");
  created += 1;
}

console.log(`case wiki pages: created=${created}, updated=${updated}`);
