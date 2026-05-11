export const companyProfile = {
  title: "Contexte entreprise",
  facts: [
    "Emission obligatoire au plus tard le 01/09/2027",
    "Partenaire EDI deja en place",
    "Societes de services avec TVA sur les debits",
    "TVA geree par entite juridique, sans assujetti unique",
    "Activite B2B France, zone euro et hors zone euro"
  ],
  conclusion:
    "Le socle applicable est principalement e-invoicing B2B France, e-reporting B2B international, reception obligatoire, annuaire/routage, formats et integration ERP. Le e-reporting paiement est reduit si l'option TVA sur les debits est bien appliquee aux prestations concernees."
};

export const applicableContextCases = [
  {
    id: "ctx-emission-2027",
    domain: "Socle reforme",
    title: "Obligation d'emission au 01/09/2027",
    applicability: "Applicable",
    priority: "Haute",
    matchedCaseIds: [1, 9, 10, 36, 41, 42, 44],
    obligations: ["Reception avant emission", "Choix PDP/PA ou architecture via partenaire EDI", "Tests de conformite", "Annuaire et routage"],
    explanation:
      "Votre obligation d'emission vise 2027, mais la reception et la preparation de routage doivent etre pretes avant. Le partenaire EDI devient un point d'architecture: verifier s'il est PDP, PA, OD ou connecte a une PDP.",
    hierarchy: ["Plateforme", "Annuaire", "Format", "Controle", "ERP"],
    example:
      "Une entite du groupe emet une facture B2B France depuis l'ERP. L'EDI transforme en UBL/CII/Factur-X, route via PDP, puis recupere les statuts de cycle de vie.",
    erpActions: ["Cartographier EDI -> PDP", "Tester Factur-X/UBL/CII", "Synchroniser annuaire", "Journaliser depots/rejets/statuts"]
  },
  {
    id: "ctx-centralized-billing",
    domain: "Clients",
    title: "Centres de facturation centralises avec meme SIREN et etablissements distincts",
    applicability: "Applicable",
    priority: "Haute",
    matchedCaseIds: [1, 9, 10],
    obligations: ["E-invoicing B2B domestique", "Routage par SIRET/code routage", "Qualite fiche client"],
    explanation:
      "Le point critique n'est pas seulement le SIREN: il faut identifier le bon etablissement, l'adresse de routage et la plateforme de reception dans l'annuaire.",
    hierarchy: ["Acheteur", "SIREN/SIRET", "Code routage", "Plateforme reception", "Statut facture"],
    example:
      "Client A a un SIREN unique mais plusieurs centres de facturation. La facture doit porter le bon etablissement et router vers la plateforme associee au centre cible.",
    erpActions: ["Rendre le SIRET facturable obligatoire", "Gerer les codes routage", "Eviter les adresses PDP codees en dur"]
  },
  {
    id: "ctx-advance-payments-customers",
    domain: "Clients",
    title: "Demandes de paiements d'avance",
    applicability: "Applicable",
    priority: "Haute",
    matchedCaseIds: [18],
    obligations: ["Facture d'acompte", "Chainage acompte -> facture finale", "TVA selon nature biens/services et option fiscale"],
    explanation:
      "Les paiements d'avance se traitent comme acomptes lorsqu'ils donnent lieu a facture. Le chainage documentaire devient essentiel pour eviter doubles montants et erreurs TVA.",
    hierarchy: ["Commande", "Facture d'acompte", "Paiement", "Facture finale", "Solde"],
    example:
      "Un client verse 30% avant demarrage d'un projet. Une facture d'acompte est emise, puis la facture finale deduit l'acompte deja facture.",
    erpActions: ["Creer type document acompte", "Stocker reference facture finale", "Controler deduction et TVA"]
  },
  {
    id: "ctx-foreign-vat-sales",
    domain: "Clients",
    title: "Facturation soumise a TVA etrangere, exemple TVA espagnole",
    applicability: "A qualifier",
    priority: "Haute",
    matchedCaseIds: [41, 42, 43, 44],
    obligations: ["Qualification territoriale", "E-reporting B2B international si champ applicable", "Gestion TVA etrangere hors schema FR standard"],
    explanation:
      "La TVA etrangere impose une qualification fiscale avant routage. Ce n'est pas automatiquement un e-invoicing B2B France; cela peut relever de l'e-reporting international ou d'obligations locales etrangeres.",
    hierarchy: ["Pays client", "Lieu operation", "TVA appliquee", "Flux FR applicable", "Declaration locale eventuelle"],
    example:
      "Une prestation est facturee avec TVA espagnole. L'ERP doit distinguer le traitement FR reforme du traitement TVA local espagnol.",
    erpActions: ["Ajouter pays de taxation", "Bloquer mapping TVA FR si TVA etrangere", "Identifier obligations locales"]
  },
  {
    id: "ctx-customer-supplier-offset",
    domain: "Clients/Fournisseurs",
    title: "Compensation de factures clients avec factures fournisseurs des memes tiers",
    applicability: "Applicable hors flux facture",
    priority: "Moyenne",
    matchedCaseIds: [2, 8, 32, 38],
    obligations: ["Factures emises et recues restent a traiter separement", "Paiement/lettrage a documenter", "Statuts a synchroniser"],
    explanation:
      "La compensation n'annule pas l'obligation de facturer ou recevoir. Elle concerne le reglement/lettrage: les documents doivent circuler normalement, puis l'ERP justifie la compensation.",
    hierarchy: ["Facture client", "Facture fournisseur", "Accord de compensation", "Lettrage", "Statut reglement"],
    example:
      "Un client est aussi fournisseur. Deux factures circulent via les plateformes, puis la tresorerie compense les soldes dans l'ERP.",
    erpActions: ["Tracer accord de compensation", "Conserver deux pistes documentaires", "Eviter annulation artificielle de facture"]
  },
  {
    id: "ctx-bad-debt-vat",
    domain: "Clients",
    title: "Clients douteux, creance devenue perte certaine",
    applicability: "A qualifier",
    priority: "Moyenne",
    matchedCaseIds: [16, 24, 32],
    obligations: ["Traitement avoir/regularisation si applicable", "Statut litige ou rejet si avant acceptation", "Impact TVA a cadrer fiscalement"],
    explanation:
      "La perte certaine releve d'un traitement comptable/fiscal distinct du simple refus de facture. L'app doit l'identifier comme scenario de regularisation ou dossier fiscal, pas comme suppression de facture.",
    hierarchy: ["Facture initiale", "Recouvrement", "Perte certaine", "Regularisation/avoir", "Justificatifs TVA"],
    example:
      "Une facture acceptee devient irrecouvrable. Le traitement doit garder la facture initiale et documenter l'eventuelle regularisation TVA.",
    erpActions: ["Creer motif client douteux", "Lier justificatifs", "Separer statut facture et provision/perte"]
  },
  {
    id: "ctx-eu-import-cleared-nl-es",
    domain: "Fournisseurs",
    title: "Importations hors UE dedouanees NL/ES puis livrees en France",
    applicability: "A qualifier",
    priority: "Haute",
    matchedCaseIds: [41, 42, 43],
    obligations: ["Qualification acquisition intracommunautaire", "Pas d'e-invoicing emission FR fournisseur etranger", "TVA/DEB/EMEBI a articuler"],
    explanation:
      "Si les biens sont dedouanes dans un autre Etat membre puis circulent vers la France, le flux peut ressembler a une acquisition intracommunautaire. La reforme facture electronique ne remplace pas les obligations douane/TVA existantes.",
    hierarchy: ["Pays dedouanement", "Fournisseur", "Flux marchandises", "Facture recue", "Declarations TVA/statistiques"],
    example:
      "Une importation Chine est dedouanee aux Pays-Bas puis livree en France. La facture fournisseur et le flux logistique doivent etre qualifies separement.",
    erpActions: ["Capturer pays de dedouanement", "Identifier regime intracom", "Ne pas forcer e-invoicing emission FR"]
  },
  {
    id: "ctx-import-france",
    domain: "Fournisseurs",
    title: "Importations dedouanees directement en France",
    applicability: "Hors e-invoicing fournisseur",
    priority: "Moyenne",
    matchedCaseIds: [41, 44],
    obligations: ["Gestion douane/TVA import", "Facture fournisseur hors dispositif domestique", "Articulation declarations existantes"],
    explanation:
      "L'achat a un fournisseur hors UE ne devient pas une facture electronique B2B France emise par le fournisseur. Le point principal reste TVA import/douane et integration comptable.",
    hierarchy: ["Fournisseur hors UE", "Document douane", "Facture recue", "TVA import", "Comptabilisation"],
    example:
      "Un fournisseur US facture une marchandise importee et dedouanee en France. L'ERP conserve la facture et les documents douaniers.",
    erpActions: ["Lier facture et DAU/document douane", "Maintenir regime TVA import", "Controler devise"]
  },
  {
    id: "ctx-services-vs-goods",
    domain: "Fournisseurs",
    title: "Distinction prestations de services vs ventes de marchandises",
    applicability: "Applicable",
    priority: "Haute",
    matchedCaseIds: [1, 19, 20, 29, 41],
    obligations: ["Cadre facture biens/services", "Regime TVA", "Lignes article/service", "E-reporting international selon nature"],
    explanation:
      "Cette distinction pilote le type de facture, la TVA, les donnees de lignes, et parfois l'obligation de paiement. Elle doit etre une donnee ERP, pas une interpretation manuelle.",
    hierarchy: ["Nature operation", "Cadre facturation", "Lignes", "TVA", "Flux applicable"],
    example:
      "Une facture mixte combine support logiciel et materiel. L'ERP doit separer lignes service et marchandises.",
    erpActions: ["Classifier les articles/services", "Interdire lignes non qualifiees", "Mapper cadre B/S/M"]
  },
  {
    id: "ctx-advance-payments-suppliers",
    domain: "Fournisseurs",
    title: "Paiements d'avance fournisseurs saisonniers ou commandes en cours",
    applicability: "Applicable cote reception/controle",
    priority: "Moyenne",
    matchedCaseIds: [18, 30],
    obligations: ["Reception facture acompte si fournisseur FR", "Controle chainage facture finale", "Qualification si fournisseur etranger"],
    explanation:
      "Cote fournisseur, l'enjeu est surtout reception, rapprochement et controle. Si le fournisseur est francais, vous recevrez une facture electronique d'acompte.",
    hierarchy: ["Commande", "Facture acompte fournisseur", "Paiement", "Facture finale", "Rapprochement"],
    example:
      "Un fournisseur saisonnier demande une avance. La facture d'acompte recue doit etre rapprochee de la commande et du solde.",
    erpActions: ["Rapprocher acompte fournisseur", "Controler deduction sur solde", "Traiter fournisseur etranger a part"]
  },
  {
    id: "ctx-supplier-fx-invoices",
    domain: "Fournisseurs",
    title: "Factures recues en devises",
    applicability: "Applicable",
    priority: "Moyenne",
    matchedCaseIds: [41, 44],
    obligations: ["Devise facture", "Conversion comptable/TVA", "Qualification fournisseur FR vs etranger"],
    explanation:
      "La devise ne suffit pas a qualifier le flux. Une facture B2B FR en devise peut rester e-invoicing; une facture etrangere reste a traiter selon son regime.",
    hierarchy: ["Devise", "Pays fournisseur", "TVA", "Montant devise", "Montant comptable"],
    example:
      "Un fournisseur facture en USD. L'ERP conserve devise, taux, date de taux et contre-valeur comptable.",
    erpActions: ["Stocker taux de change", "Gerer devise TVA", "Controler arrondis"]
  },
  {
    id: "ctx-holding-not-vat",
    domain: "Intra-groupe",
    title: "Holding non assujettie a la TVA",
    applicability: "A qualifier",
    priority: "Haute",
    matchedCaseIds: [27, 35],
    obligations: ["Verifier statut assujetti/non assujetti", "Peut sortir du B2B e-invoicing si non assujetti", "Possible e-reporting selon operation"],
    explanation:
      "Le fait qu'une holding soit non assujettie change le traitement: on ne doit pas automatiquement la traiter comme client/fournisseur B2B domestique assujetti.",
    hierarchy: ["Entite juridique", "Statut TVA", "Nature flux", "Facture ou reporting", "Declaration TVA"],
    example:
      "Une filiale facture une prestation a une holding non assujettie. Le flux doit etre qualifie avant routage.",
    erpActions: ["Ajouter statut assujetti par entite", "Bloquer routage B2B automatique", "Creer workflow revue fiscale"]
  },
  {
    id: "ctx-long-term-rental-no-invoice",
    domain: "Fournisseurs",
    title: "Locations longue duree sans emission de facture par le bailleur",
    applicability: "Risque de non-conformite fournisseur",
    priority: "Moyenne",
    matchedCaseIds: [30, 41],
    obligations: ["Reception facture electronique si bailleur FR assujetti", "Piece justificative a cadrer si absence facture", "Controle fournisseur"],
    explanation:
      "Si la location est soumise a TVA et le bailleur est assujetti FR, une facture electronique devrait etre attendue. L'absence de facture devient un point de controle fournisseur.",
    hierarchy: ["Contrat", "Loyer", "Facture attendue", "TVA", "Rapprochement"],
    example:
      "Un bailleur preleve un loyer recurrent sans facture. Le process fournisseur doit detecter l'absence de piece.",
    erpActions: ["Lister fournisseurs sans facture", "Mettre controle P2P", "Demander canal de reception"]
  },
  {
    id: "ctx-cash-advances-intragroup",
    domain: "Intra-groupe",
    title: "Avances de tresorerie entre filiales",
    applicability: "A qualifier hors facture",
    priority: "Moyenne",
    matchedCaseIds: [27, 38],
    obligations: ["Distinguer financement vs prestation facturee", "Pas de facture si pur mouvement financier hors champ", "Documenter intercompany"],
    explanation:
      "Une avance de tresorerie n'est pas automatiquement une facture. Si elle remunere un service ou des interets factures, elle redevient un cas a qualifier.",
    hierarchy: ["Contrat intragroupe", "Flux financier", "Interets/eventuelle prestation", "Facture si applicable", "Justificatif"],
    example:
      "Une filiale avance de la tresorerie a une autre. Sans service facture, le flux est traite en tresorerie, pas en facture electronique.",
    erpActions: ["Identifier nature financement", "Separer tresorerie et facturation", "Conserver contrats intragroupe"]
  },
  {
    id: "ctx-employee-expenses",
    domain: "Notes de frais",
    title: "Depenses et frais des salaries",
    applicability: "Hors emission mais impact reception/justificatifs",
    priority: "Moyenne",
    matchedCaseIds: [5, 6, 26],
    obligations: ["Justificatifs d'achat", "TVA deductible selon piece", "Pas de facture e-invoicing emise par le salarie"],
    explanation:
      "Les notes de frais ne sont pas un flux facture electronique emis par le salarie. Mais les justificatifs sous-jacents peuvent evoluer selon le fournisseur.",
    hierarchy: ["Salarie", "Justificatif", "Note de frais", "TVA deductible", "Comptabilisation"],
    example:
      "Un salarie paie un hotel. L'entreprise traite la note de frais et conserve la piece justificative.",
    erpActions: ["Qualifier les pieces", "Ne pas router le salarie comme fournisseur PDP", "Controler TVA deductible"]
  },
  {
    id: "ctx-factoring-payments",
    domain: "Flux financiers",
    title: "Reglement de factures via societes d'affacturage",
    applicability: "Applicable",
    priority: "Haute",
    matchedCaseIds: [8, 15, 32],
    obligations: ["IBAN factor/beneficiaire paiement", "Statuts de paiement", "Tracabilite de la cession de creance"],
    explanation:
      "Le factor impacte les donnees de paiement et le suivi de statut, sans changer la nature de la facture initiale.",
    hierarchy: ["Facture", "Cession", "Beneficiaire paiement", "Statut mise en paiement", "Encaissement"],
    example:
      "Une facture client est cedee a un factor. Le paiement doit aller au compte du factor et les statuts doivent rester visibles.",
    erpActions: ["Parametrer IBAN factor", "Verrouiller modifications paiement", "Conserver contrat de cession"]
  },
  {
    id: "ctx-commissionnaire",
    domain: "Clients/Tiers",
    title: "Activite de commissionnaire, ventes pour le compte de tiers",
    applicability: "Applicable a qualifier",
    priority: "Haute",
    matchedCaseIds: [10, 15, 17, 37],
    obligations: ["Mandat tiers", "Roles fournisseur/tiers/client", "Autofacturation ou facturation par mandat selon schema"],
    explanation:
      "L'activite pour compte de tiers impose de representer correctement les roles dans la facture et de conserver le mandat.",
    hierarchy: ["Mandant", "Commissionnaire", "Client final", "Facture", "Mandat"],
    example:
      "Une entite vend pour le compte d'un tiers. La facture doit indiquer le fournisseur reel et le role de l'emetteur.",
    erpActions: ["Modeliser roles de parties", "Stocker mandat", "Controler numerotation par mandant"]
  },
  {
    id: "ctx-client-deductions",
    domain: "Clients",
    title: "Deductions operees par les clients et avoirs a emettre",
    applicability: "Applicable",
    priority: "Haute",
    matchedCaseIds: [16, 18, 32],
    obligations: ["Avoir d'annulation ou financier", "Reference facture si deduction ciblee", "Gestion litige"],
    explanation:
      "Une deduction client doit etre transformee en flux documente: avoir lie a une facture si correction precise, ou avoir financier si remise globale.",
    hierarchy: ["Deduction client", "Analyse motif", "Avoir", "Reference facture", "Lettrage"],
    example:
      "Un client deduit une penalite logistique. L'ERP decide si un avoir doit etre emis et s'il reference la facture initiale.",
    erpActions: ["Codifier motifs deduction", "Automatiser creation avoir", "Lier litige et avoir"]
  },
  {
    id: "ctx-master-data",
    domain: "ERP/Data",
    title: "Mise en conformite des fiches clients et fournisseurs",
    applicability: "Applicable transverse",
    priority: "Critique",
    matchedCaseIds: [1, 9, 10, 17, 41, 44],
    obligations: ["SIREN/SIRET", "TVA", "Pays", "Statut assujetti", "Adresse de routage", "Plateforme reception"],
    explanation:
      "C'est le pre-requis de presque tous les cas. Sans master data fiable, les choix e-invoicing/e-reporting/routage seront faux.",
    hierarchy: ["Tiers", "Entite juridique", "Etablissement", "Routage", "Regime fiscal"],
    example:
      "Un client avec plusieurs etablissements doit avoir un SIRET facturable, un code routage et une PDP de reception.",
    erpActions: ["Lancer campagne data quality", "Ajouter champs reforme", "Mettre controles bloquants"]
  }
];

export const trainingExpectations = [
  {
    title: "Clarifier e-invoicing vs e-reporting",
    matchedContextIds: ["ctx-emission-2027", "ctx-foreign-vat-sales", "ctx-services-vs-goods"]
  },
  {
    title: "Comprendre les flux complexes",
    matchedContextIds: ["ctx-centralized-billing", "ctx-customer-supplier-offset", "ctx-commissionnaire", "ctx-client-deductions"]
  },
  {
    title: "Articuler avec TVA, DEB/EMEBI, douane",
    matchedContextIds: ["ctx-eu-import-cleared-nl-es", "ctx-import-france", "ctx-foreign-vat-sales"]
  },
  {
    title: "Anticiper les evolutions declaratives",
    matchedContextIds: ["ctx-master-data", "ctx-emission-2027", "ctx-factoring-payments"]
  }
];
