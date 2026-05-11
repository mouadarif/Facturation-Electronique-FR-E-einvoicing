const ANNEX_A_PATH = "docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf";

function annexA(page, afnorCase, title, note) {
  return {
    sourceTitle: "XP Z12-014 Annexe A - fiches detaillees des cas specifiques",
    localRelativePath: ANNEX_A_PATH,
    localUrl: `/${ANNEX_A_PATH}#page=${page}`,
    page,
    pageLabel: `Page ${page}`,
    afnorCase,
    title,
    note
  };
}

export const annexAReferences = {
  1: annexA(8, "2.1", "Transmission d'une facture et cycle de vie", "Cas nominal d'echange de facture B2B."),
  3: annexA(81, "Cas n°20 et 21", "Facture d'acompte et facture definitive apres acompte", "Chainage acompte, facture finale et traitement du solde."),
  4: annexA(81, "Cas n°20 et 21", "Facture d'acompte et facture definitive apres acompte", "Acompte de prestation et facture finale."),
  5: annexA(77, "Cas n°19b", "Auto-facturation", "L'acheteur emet la facture pour le compte du vendeur sous mandat."),
  6: annexA(17, "2.5", "Litige suivi d'un avoir", "Reference utile lorsque l'avoir corrige ou annule une facture contestee."),
  15: annexA(52, "Cas n°13", "Sous-traitance avec paiement direct ou delegation de paiement", "Traitement des factures de sous-traitance et roles associes."),
  16: annexA(105, "Cas n°33", "Operations soumises au regime de la marge beneficiaire", "Cas TVA sur la marge dans une facture B2B."),
  17: annexA(36, "Cas n°8 a 10", "Factures a payer a un tiers, dont affacturage", "Affacturage, beneficiaire, changement d'IBAN et statuts associes."),
  18: annexA(97, "Cas n°29", "Assujetti unique au sens de l'article 256 C du CGI", "Qualification des operations avec assujetti unique."),
  20: annexA(74, "Cas n°19a", "Facture emise par un tiers facturant avec mandat", "Mandat de facturation et tiers facturant pour le compte du vendeur."),
  21: annexA(107, "Cas n°34", "Encaissement partiel et annulation d'encaissement", "Lien utile pour les encaissements partiels et corrections d'encaissement."),
  22: annexA(15, "2.4", "Refus d'une facture par l'acheteur", "Statut Refusee, motif et consequences TVA/comptables."),
  23: annexA(17, "2.5", "Litige suivi d'un avoir", "Statut En litige et resolution par avoir."),
  24: annexA(91, "Cas n°25", "Gestion des bons et des cartes cadeaux", "Bons a usage unique ou multiple."),
  26: annexA(101, "Cas n°32", "Paiements mensuels", "Facturation recurrente ou regularisation apres mensualites."),
  27: annexA(67, "Cas n°16", "Facture de debours pour remboursement", "Debours et remboursement de facture payee par un tiers."),
  28: annexA(8, "2.1", "Transmission d'une facture et cycle de vie", "Cycle de vie de facture et statuts de traitement."),
  29: annexA(8, "2.1", "Transmission d'une facture et cycle de vie", "Cycle de vie de facture et statut d'approbation."),
  32: annexA(101, "Cas n°32", "Paiements mensuels", "Regularisation apres paiements mensuels."),
  35: annexA(97, "Cas n°30", "TVA deja collectee - facture a posteriori", "Operation initialement traitee en e-reporting B2C puis facturee apres coup.")
};
