export const requirementSources = {
  invoice: ["invoice-data-local", "legifrance-cgi-annexe-iv", "specs", "afnor-012", "afnor-en16931-a1", "fnfe-schematrons"],
  transaction: ["transaction-data-local", "legifrance-cgi-annexe-iv", "dgfip-approfondis"],
  payment: ["payment-data-local", "legifrance-cgi-annexe-iv", "dgfip-approfondis"],
  status: ["specs", "afnor-012", "afnor-013", "fnfe-schematrons"],
  annuaire: ["annuaire", "aife-b2b", "bercy-annuaire"]
};

const invoiceCore = {
  title: "Facture B2B domestique - donnees facture",
  header: [
    "BT-1 Numero unique de facture",
    "BT-2 Date d'emission de la facture",
    "BT-5 Code devise de la facture",
    "BT-109 Montant total HT de la facture",
    "BT-110 Montant total TVA de la facture",
    "BT-116 Base HT par taux de TVA",
    "BT-117 Montant TVA par taux",
    "BT-119 Taux de TVA"
  ],
  parties: [
    "BT-30 Vendeur - numero SIREN",
    "BT-40 Vendeur - code pays",
    "BT-47 Acheteur - numero SIREN",
    "BT-55 Acheteur - code pays",
    "BT-31 Identifiant TVA vendeur si applicable",
    "BT-48 Identifiant TVA acheteur si applicable"
  ],
  lines: [
    "A partir du 01/09/2027: BT-153 nom du bien/service",
    "A partir du 01/09/2027: BT-129 quantite facturee",
    "A partir du 01/09/2027: BT-146/147/148 detail du prix unitaire HT"
  ],
  taxAndReferences: [
    "BT-25 reference a une facture anterieure si facture rectificative ou avoir",
    "BT-8 code de date d'exigibilite TVA si option pour les debits",
    "BT-120 motif d'exoneration TVA si applicable",
    "BT-118 code type TVA pour autoliquidation si applicable",
    "BT-72 date effective de livraison ou fin de prestation si differente de la date facture",
    "BT-9 date d'echeance ou date d'acompte selon le cas documente",
    "BT-75 a BT-80 adresse de livraison si differente",
    "Remises, escompte et eco-participation si presents sur la facture"
  ],
  payment: ["Pas un flux paiement par defaut; ajouter e-reporting paiement si TVA a l'encaissement et cas applicable."],
  caveat: "Liste issue des PDFs locaux DGFiP. Les schemas XML exacts et cardinalites restent a valider dans l'archive officielle des specifications."
};

const transactionB2C = {
  title: "E-reporting transaction - personne non assujettie",
  header: [
    "SIREN du redevable du e-reporting",
    "Mention option TVA d'apres les debits si le redevable l'a exercee",
    "Date du jour",
    "Nombre de transactions realisees sur la journee concernee"
  ],
  parties: ["Pas d'identification nominative du particulier dans le referentiel local extrait."],
  lines: [
    "Categorie de transactions: livraisons de biens soumises a TVA",
    "Categorie de transactions: prestations de services soumises a TVA",
    "Categorie de transactions: operations exonerees",
    "Categorie de transactions: operations relevant de regimes particuliers dont TVA sur la marge"
  ],
  taxAndReferences: [
    "Montant total HT des operations de la journee",
    "Montant de TVA correspondant",
    "Si plusieurs taux: transmettre les montants pour chaque taux de TVA"
  ],
  payment: ["Si paiement a reporter: utiliser les donnees de paiement agregees par jour d'encaissement."],
  caveat: "Les frequences et modalites exactes dependent du regime et des delais officiels."
};

const transactionInternational = {
  title: "E-reporting transaction - B2B international",
  header: [
    "SIREN de l'entreprise etablie en France, qu'elle soit fournisseur ou cliente",
    "Date d'emission de la facture",
    "Numero unique de facture",
    "Devise de la facture",
    "Montant HT total",
    "Montant TVA total",
    "Montant HT par taux de TVA",
    "Montant TVA par taux",
    "Taux de TVA applicable"
  ],
  parties: [
    "Pays du fournisseur",
    "Pays du client",
    "Numero TVA intracommunautaire fournisseur si applicable",
    "Numero TVA intracommunautaire client si applicable"
  ],
  lines: [
    "A partir du 01/09/2027: denomination du bien livre ou service rendu",
    "A partir du 01/09/2027: quantite",
    "A partir du 01/09/2027: prix unitaire HT"
  ],
  taxAndReferences: [
    "Numero de facture rectifiee si facture rectificative",
    "Option TVA sur les debits si applicable",
    "Motif d'exoneration ou regime particulier si applicable",
    "Mention autoliquidation si applicable",
    "Date livraison/fin de prestation si differente",
    "Date d'acompte si differente",
    "Adresse de livraison si differente"
  ],
  payment: ["Si TVA a l'encaissement et paiement a reporter: transmettre les donnees de paiement par facture."],
  caveat: "Le champ exact de l'operation doit etre confirme dans le document local e_reporting_operations_champ.pdf."
};

const paymentInvoice = {
  title: "E-reporting paiement - rattache a une facture",
  header: ["Numero de facture", "Date de paiement / encaissement effectif"],
  parties: ["SIREN de l'entreprise qui encaisse lorsque le flux global l'exige."],
  lines: ["Montant encaisse distingue par taux d'imposition TVA le cas echeant."],
  taxAndReferences: ["Hors operations autoliquidees et hors option pour le paiement de TVA sur les debits, selon le PDF local."],
  payment: [
    "Si facture electronique deposee: enrichissement du statut 'encaissee'",
    "Si B2B international sans facture electronique deposee: flux global periodique par facture",
    "Si operation agregee: donnees de paiement agregees par jour"
  ],
  caveat: "Les periodicites sont a verifier dans e_reporting_frequences_delais.pdf et les specifications."
};

const statusPayload = {
  title: "Cycle de vie / statut",
  header: [
    "Reference de la facture concernee",
    "Code statut de cycle de vie",
    "Date/heure ou date de changement de statut selon le schema applicable"
  ],
  parties: ["Emetteur du statut et destinataire selon le circuit plateforme."],
  lines: ["Payload detaille du statut non exhaustivement present dans les extraits locaux; verifier CDAR/specifications."],
  taxAndReferences: ["Motif de refus/litige si le schema et le statut le demandent."],
  payment: ["Pour 'encaissee', enrichir avec numero de facture, date de paiement et montant encaisse par taux TVA."],
  caveat: "Le repo pointe AFNOR/specifications pour les statuts; ne pas deduire les cardinalites sans le schema officiel."
};

const annuairePayload = {
  title: "Annuaire / routage",
  header: ["Identifiant entreprise ou etablissement recherche", "Adresse electronique de facturation cible", "Plateforme de reception associee"],
  parties: ["SIRET/SIREN du destinataire selon le niveau d'adressage retenu."],
  lines: ["Non applicable: donnees de routage, pas lignes de facture."],
  taxAndReferences: ["Non applicable."],
  payment: ["Non applicable."],
  caveat: "Le wiki local confirme le role central de l'annuaire; les attributs exacts doivent suivre le service officiel."
};

const qualificationPayload = {
  title: "Qualification a verifier",
  header: ["Donnees minimales de qualification: pays, SIREN/SIRET si applicable, numero TVA si applicable, nature operation, date, montants, devise."],
  parties: ["Fournisseur, client, pays d'etablissement et statut assujetti/non assujetti."],
  lines: ["Nature bien/service, quantite et prix si la qualification aboutit a facture ou transaction detaillee."],
  taxAndReferences: ["Regime TVA, exonération, autoliquidation, marge, DOM, groupe TVA ou autre regime specifique si confirme."],
  payment: ["Ajouter donnees de paiement seulement si le cas releve du e-reporting paiement."],
  caveat: "Le repo ne confirme pas un payload exact pour ce cas; l'interface affiche les donnees de qualification sans inventer de schema."
};

function cloneReq(req) {
  return Object.fromEntries(Object.entries(req).map(([key, value]) => [key, Array.isArray(value) ? [...value] : value]));
}

function mergeReq(base, additions = {}) {
  const req = cloneReq(base);
  for (const [key, value] of Object.entries(additions)) {
    req[key] = Array.isArray(value) ? [...(req[key] || []), ...value] : value;
  }
  return req;
}

export function requirementsForCase(item) {
  if (item.category === "plateforme" && /annuaire|routage|plateforme de reception/i.test(item.title)) return annuairePayload;
  if (item.category === "plateforme" && /format|controle|factur-x|ubl|cii/i.test(`${item.title} ${item.type}`)) return invoiceCore;
  if (item.category === "statuts" && /paiement|encaissement|frequence|delegation/i.test(`${item.title} ${item.type}`)) return paymentInvoice;
  if (item.category === "statuts") return statusPayload;
  if (item.type.includes("E-reporting transaction") && item.category === "b2c") return transactionB2C;
  if (item.type.includes("E-reporting transaction") && item.category === "b2b-int") return transactionInternational;
  if (item.type.includes("Qualification")) return qualificationPayload;
  if (item.type.includes("B2G")) return mergeReq(invoiceCore, {
    parties: ["Champs d'adressage B2G: SIRET, code service et reference d'engagement quand demandes."],
    caveat: "B2G deja traite via Chorus Pro; verifier les exigences Chorus et specifications."
  });
  const req = cloneReq(invoiceCore);
  if (item.type.includes("paiement")) {
    req.payment = paymentInvoice.payment;
    req.taxAndReferences = [...req.taxAndReferences, ...paymentInvoice.taxAndReferences];
  }
  if (/avoir|rectificative/i.test(item.title)) {
    req.taxAndReferences = [...req.taxAndReferences, "Reference a la facture initiale rectifiee/annulee: BT-25 et date anterieure si applicable."];
  }
  if (/acompte/i.test(item.title)) {
    req.taxAndReferences = [...req.taxAndReferences, "Date de l'acompte versee si differente de la date d'emission."];
  }
  if (/autofacturation/i.test(item.title)) {
    req.taxAndReferences = [...req.taxAndReferences, "Mention autofacturation: BT-3 code type de facture dedie."];
  }
  if (/autoliquidation|btp/i.test(item.title)) {
    req.taxAndReferences = [...req.taxAndReferences, "Mention autoliquidation: code type TVA dedie dans la ventilation TVA."];
  }
  if (/marge/i.test(item.title)) {
    req.taxAndReferences = [...req.taxAndReferences, "Regime particulier TVA sur la marge: motif/code dedie a verifier dans le schema."];
  }
  if (/devise/i.test(item.title)) {
    req.header = [...req.header, "Devise de facture BT-5; contre-valeurs fiscales a verifier dans specifications."];
  }
  if (/livraison|biens/i.test(item.title)) {
    req.taxAndReferences = [...req.taxAndReferences, "Adresse de livraison et date effective de livraison si differentes."];
  }
  return req;
}

export function requirementText(item) {
  const req = requirementsForCase(item);
  return [
    req.title,
    `En-tete: ${req.header.join("; ")}`,
    `Parties: ${req.parties.join("; ")}`,
    `Lignes: ${req.lines.join("; ")}`,
    `TVA/references: ${req.taxAndReferences.join("; ")}`,
    `Paiement/statut: ${req.payment.join("; ")}`,
    `Limite: ${req.caveat}`
  ].join("\n");
}
