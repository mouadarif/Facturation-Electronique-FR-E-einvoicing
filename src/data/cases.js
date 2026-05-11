const AFNOR_SOURCES = ["afnor-014", "afnor-014-annexe-a", "afnor-012"];
const AFNOR_ANNEX_A_PATH = "docs_tech/afnor/afnor_xp_z12_014_annexe_a_cas_usage_b2b.pdf";
const AFNOR_MAIN_PATH = "docs_tech/afnor/afnor_xp_z12_014_cas_usage_b2b.pdf";

export const categories = [
  { id: "all", label: "Tous les cas", tone: "neutral" },
  { id: "b2b-dom", label: "B2B domestique", tone: "indigo" },
  { id: "b2b-int", label: "International", tone: "teal" },
  { id: "b2c", label: "B2C / e-reporting", tone: "green" },
  { id: "sectoriel", label: "Cas particuliers", tone: "amber" },
  { id: "statuts", label: "Cycle de vie et paiements", tone: "rose" },
  { id: "plateforme", label: "Plateformes et formats", tone: "blue" }
];

function afnorCase({
  id,
  afnorCase,
  category = "sectoriel",
  type = "AFNOR XP Z12-014",
  title,
  description,
  example,
  format = "EN16931 / EXTENDED-CTC-FR selon le cas",
  erp,
  annexPage = null,
  sources = AFNOR_SOURCES
}) {
  const localRelativePath = annexPage ? AFNOR_ANNEX_A_PATH : AFNOR_MAIN_PATH;
  return {
    id,
    afnorCase,
    category,
    type,
    title,
    description,
    example,
    format,
    erp,
    sources,
    afnorSource: {
      sourceTitle: annexPage
        ? "XP Z12-014 Annexe A - cas d'usage B2B"
        : "XP Z12-014 - cas d'usage B2B",
      localRelativePath,
      localUrl: `/${localRelativePath}${annexPage ? `#page=${annexPage}` : ""}`,
      page: annexPage,
      pageLabel: annexPage ? `Page ${annexPage}` : "Document AFNOR",
      afnorCase
    }
  };
}

export const cases = [
  afnorCase({
    id: 1,
    afnorCase: "Cas n°1",
    category: "b2b-dom",
    title: "Multi-commande / multi-livraison",
    description: "Facture couvrant plusieurs commandes ou plusieurs livraisons, avec références portées au niveau facture ou ligne.",
    example: "Une facture regroupe plusieurs commandes clients et plusieurs adresses de livraison.",
    erp: "Autoriser les références de commande/livraison à la ligne et contrôler leur export dans le profil étendu.",
    annexPage: 25
  }),
  afnorCase({
    id: 2,
    afnorCase: "Cas n°2",
    category: "statuts",
    type: "Facture déjà payée",
    title: "Facture déjà payée par l'acheteur ou un tiers payeur au moment de l'émission",
    description: "Facture émise alors que le règlement est déjà intervenu, avec montant à payer nul ou déjà soldé.",
    example: "Une commande réglée à l'avance donne lieu à une facture transmise après paiement.",
    format: "Facture avec montant payé et montant restant dû cohérents",
    erp: "Rapprocher paiement existant, date de paiement et facture émise.",
    annexPage: 25
  }),
  afnorCase({
    id: 3,
    afnorCase: "Cas n°3",
    category: "statuts",
    type: "Tiers payeur",
    title: "Facture à payer par un tiers payeur connu au moment de la facturation",
    description: "Le débiteur économique et le payeur opérationnel sont distincts dès l'émission.",
    example: "Une assurance ou un organisme tiers règle directement la facture au vendeur.",
    erp: "Modéliser le tiers payeur et ne pas confondre acheteur, destinataire et bénéficiaire du paiement.",
    annexPage: 26
  }),
  afnorCase({
    id: 4,
    afnorCase: "Cas n°4",
    category: "statuts",
    type: "Prise en charge partielle",
    title: "Facture à payer par l'acheteur avec prise en charge partielle par un tiers",
    description: "Une partie seulement du montant est supportée par un tiers connu au moment de la facturation.",
    example: "Une subvention ou assurance prend en charge une partie du prix facturé.",
    erp: "Séparer la part acheteur, la part tiers et les statuts de paiement associés.",
    annexPage: 29
  }),
  afnorCase({
    id: 5,
    afnorCase: "Cas n°5",
    category: "sectoriel",
    type: "Notes de frais",
    title: "Frais payés par des collaborateurs avec facture au nom de l'entreprise",
    description: "Le collaborateur avance le paiement, mais la facture est juridiquement adressée à l'entreprise.",
    example: "Un salarié paie un hôtel avec une facture établie au nom de son employeur.",
    erp: "Relier note de frais, justificatif, fournisseur réel et facture B2B.",
    annexPage: 32
  }),
  afnorCase({
    id: 6,
    afnorCase: "Cas n°6",
    category: "b2c",
    type: "Notes de frais",
    title: "Frais payés par des collaborateurs sans facture adressée à l'entreprise",
    description: "Le collaborateur dispose d'un ticket ou d'une facture à son nom, non adressée à l'entreprise.",
    example: "Un salarié transmet un ticket de caisse pour remboursement.",
    format: "Hors facture B2B directe, e-reporting B2C côté vendeur si applicable",
    erp: "Distinguer remboursement interne, justificatif et éventuelle déductibilité TVA.",
    annexPage: 33
  }),
  afnorCase({
    id: 7,
    afnorCase: "Cas n°7",
    category: "statuts",
    type: "Carte logée",
    title: "Facture suite à un achat payé avec carte logée / carte d'achat",
    description: "Achat déjà payé via une carte ou un dispositif centralisé de paiement.",
    example: "Des frais de déplacement sont réglés via une carte logée puis facturés à l'entreprise.",
    erp: "Identifier le moyen de paiement, le relevé carte et la facture correspondante.",
    annexPage: 33
  }),
  afnorCase({
    id: 8,
    afnorCase: "Cas n°8 à n°10",
    category: "statuts",
    type: "Tiers bénéficiaire / affacturage",
    title: "Factures à payer à un tiers : affacturage, centralisation, dépositaire ou bénéficiaire inconnu",
    description: "Regroupe les cas où le paiement doit être dirigé vers un tiers déterminé, gestionnaire ou bénéficiaire non connu à l'émission.",
    example: "Une facture est cédée à un factor ou payée via une centralisation de trésorerie.",
    format: "Profil étendu si les rôles de tiers doivent être portés dans la facture",
    erp: "Tracer tiers bénéficiaire, changement de compte à payer, subrogation et statuts de cession.",
    annexPage: 36
  }),
  afnorCase({
    id: 9,
    afnorCase: "Cas n°11",
    category: "plateforme",
    type: "Tiers adressé à",
    title: "Facture devant être reçue et traitée par un tiers pour le compte de l'acheteur",
    description: "Un tiers reçoit ou traite la facture à la place de l'acheteur, sans être l'acheteur juridique.",
    example: "Un prestataire comptable reçoit les factures fournisseurs pour le compte d'un client.",
    erp: "Gérer le tiers adressé à, les droits d'accès et le routage.",
    annexPage: 44
  }),
  afnorCase({
    id: 10,
    afnorCase: "Cas n°12",
    category: "plateforme",
    type: "Intermédiaire transparent",
    title: "Intermédiaire transparent gestionnaire de facture pour son commettant acheteur",
    description: "Un intermédiaire agit pour le compte de l'acheteur dans la gestion des factures.",
    example: "Une entité centralise la réception et le contrôle de factures pour des sociétés clientes.",
    erp: "Modéliser le commettant, l'intermédiaire et l'adresse de facturation dédiée.",
    annexPage: 48
  }),
  afnorCase({
    id: 11,
    afnorCase: "Cas n°13",
    category: "sectoriel",
    type: "Sous-traitance",
    title: "Sous-traitance avec paiement direct ou délégation de paiement",
    description: "Facturation impliquant sous-traitant, titulaire et acheteur final avec paiement direct ou délégué.",
    example: "Un sous-traitant est payé directement dans le cadre d'un marché.",
    erp: "Gérer le lien entre facture principale, facture de sous-traitance et tiers payeur.",
    annexPage: 52
  }),
  afnorCase({
    id: 12,
    afnorCase: "Cas n°14",
    category: "sectoriel",
    type: "Co-traitance",
    title: "Co-traitance B2B",
    description: "Plusieurs entreprises interviennent conjointement dans une opération de facturation.",
    example: "Un groupement de co-traitants facture une prestation à un acheteur B2B.",
    erp: "Tracer mandataire, co-traitants, part de chacun et paiement direct éventuel.",
    annexPage: 59
  }),
  afnorCase({
    id: 13,
    afnorCase: "Cas n°15",
    category: "sectoriel",
    type: "Commande par tiers",
    title: "Facture de vente suite à commande ou paiement éventuel d'un tiers pour le compte de l'acheteur",
    description: "Un tiers intervient dans la commande ou le paiement pour le compte de l'acheteur.",
    example: "Une agence commande une prestation pour le compte d'un client final.",
    erp: "Distinguer donneur d'ordre, acheteur, payeur et destinataire.",
    annexPage: 63
  }),
  afnorCase({
    id: 14,
    afnorCase: "Cas n°16",
    category: "sectoriel",
    type: "Débours",
    title: "Facture de débours pour remboursement de la facture de vente payée par le tiers",
    description: "Remboursement d'une facture initialement payée par un tiers.",
    example: "Un intermédiaire paie une dépense puis refacture le débours à son commettant.",
    erp: "Identifier la facture source, le tiers ayant payé et le remboursement demandé.",
    annexPage: 67
  }),
  afnorCase({
    id: 15,
    afnorCase: "Cas n°17a / n°17b",
    category: "plateforme",
    type: "Marketplace / intermédiaire de paiement",
    title: "Facture à payer à un tiers intermédiaire de paiement, avec ou sans mandat de facturation",
    description: "Cas marketplace ou intermédiaire de paiement, éventuellement aussi tiers facturant sous mandat.",
    example: "Une marketplace collecte le paiement et peut émettre la facture sous mandat.",
    erp: "Gérer intermédiaire de paiement, tiers facturant, mandat et bénéficiaire de paiement.",
    annexPage: 67
  }),
  afnorCase({
    id: 16,
    afnorCase: "Cas n°18",
    category: "statuts",
    type: "Note de débit",
    title: "Gestion des notes de débit",
    description: "Document de débit à traiter dans le cycle de facturation et de correction.",
    example: "Un acheteur émet une note de débit liée à un écart prix ou quantité.",
    erp: "Qualifier note de débit, avoir, facture rectificative et impact comptable.",
    annexPage: 73
  }),
  afnorCase({
    id: 17,
    afnorCase: "Cas n°19a / n°19b",
    category: "sectoriel",
    type: "Mandat / auto-facturation",
    title: "Facture émise par un tiers facturant avec mandat et auto-facturation",
    description: "Facture émise par un tiers pour le compte du vendeur, ou par l'acheteur en auto-facturation.",
    example: "Un mandataire crée la facture pour le vendeur, ou l'acheteur émet la facture au nom du vendeur.",
    erp: "Conserver les mandats, inverser correctement les rôles et contrôler la numérotation.",
    annexPage: 74
  }),
  afnorCase({
    id: 18,
    afnorCase: "Cas n°20 et n°21",
    category: "b2b-dom",
    type: "Acompte",
    title: "Facture d'acompte après acompte payé ou à payer puis facture définitive / finale",
    description: "Chaîne facture d'acompte puis facture finale, avec acompte déjà payé ou encore à payer.",
    example: "Un acompte est facturé à la commande, puis déduit sur la facture finale.",
    erp: "Chaîner commande, acompte, paiement, facture finale et solde restant dû.",
    annexPage: 81
  }),
  afnorCase({
    id: 19,
    afnorCase: "Cas n°22a",
    category: "statuts",
    type: "Escompte / encaissement",
    title: "Facture payée avec escompte - prestations de services avec TVA due à l'encaissement",
    description: "Escompte appliqué à une prestation de services lorsque la TVA devient exigible à l'encaissement.",
    example: "Un client règle rapidement une prestation et bénéficie d'un escompte.",
    erp: "Réconcilier montant facturé, montant encaissé, escompte et TVA exigible.",
    annexPage: 86
  }),
  afnorCase({
    id: 20,
    afnorCase: "Cas n°22b",
    category: "statuts",
    type: "Escompte / débits",
    title: "Facture payée avec escompte - livraisons de biens ou TVA sur les débits",
    description: "Escompte appliqué à une livraison de biens ou prestation avec option TVA sur les débits.",
    example: "Un escompte réduit le montant payé d'une facture de marchandises.",
    erp: "Gérer l'écart de paiement sans casser la ventilation fiscale initiale.",
    annexPage: 88
  }),
  afnorCase({
    id: 21,
    afnorCase: "Cas n°23",
    category: "b2c",
    type: "Auto-facturation B2C/B2B",
    title: "Flux en auto-facturation entre un particulier et un professionnel",
    description: "Cas de flux en auto-facturation impliquant un particulier et un professionnel.",
    example: "Un professionnel formalise une opération avec un particulier via un flux d'auto-facturation.",
    erp: "Qualifier le statut du particulier et le périmètre e-reporting/e-invoicing.",
    annexPage: 90
  }),
  afnorCase({
    id: 22,
    afnorCase: "Cas n°24",
    category: "sectoriel",
    type: "Arrhes",
    title: "Gestion des arrhes",
    description: "Sommes versées à titre d'arrhes, à distinguer des acomptes et du prix taxable.",
    example: "Un client verse des arrhes avant confirmation définitive d'une opération.",
    erp: "Distinguer arrhes, acompte, indemnité et facture taxable.",
    annexPage: 91
  }),
  afnorCase({
    id: 23,
    afnorCase: "Cas n°25",
    category: "sectoriel",
    type: "Bons / cartes cadeaux",
    title: "Gestion des bons et cartes cadeaux",
    description: "Traitement des bons à usage unique ou multiple et des cartes cadeaux.",
    example: "Une entreprise achète des cartes cadeaux ou bons utilisables chez un tiers.",
    erp: "Séparer émission, utilisation, commission et régime TVA du bon.",
    annexPage: 91
  }),
  afnorCase({
    id: 24,
    afnorCase: "Cas n°26",
    category: "sectoriel",
    type: "Réserve contractuelle",
    title: "Factures avec clause de réserve contractuelle",
    description: "Facture intégrant une réserve contractuelle ayant un impact sur traitement ou paiement.",
    example: "Une partie du montant est retenue jusqu'à levée d'une réserve.",
    erp: "Tracer réserve, échéance, retenue et statut de traitement.",
    annexPage: 93
  }),
  afnorCase({
    id: 25,
    afnorCase: "Cas n°27",
    category: "sectoriel",
    type: "Péage",
    title: "Gestion des tickets de péage vendus à un assujetti",
    description: "Traitement des tickets de péage lorsqu'ils sont vendus à un assujetti.",
    example: "Un opérateur facture des péages à une entreprise de transport.",
    erp: "Qualifier justificatif, facture, TVA et regroupement éventuel.",
    annexPage: 94
  }),
  afnorCase({
    id: 26,
    afnorCase: "Cas n°28",
    category: "sectoriel",
    type: "Restaurant",
    title: "Gestion des notes de restaurant émises par un vendeur assujetti établi en France",
    description: "Traitement des notes de restaurant selon seuil, destinataire et obligations associées.",
    example: "Un restaurant remet une note à un client professionnel ou non assujetti.",
    erp: "Contrôler seuils, justificatifs, déductibilité et éventuel e-reporting.",
    annexPage: 95
  }),
  afnorCase({
    id: 27,
    afnorCase: "Cas n°29",
    category: "sectoriel",
    type: "Assujetti unique",
    title: "Assujetti unique au sens de l'article 256 C du CGI",
    description: "Cas de groupe TVA / assujetti unique et interactions entre membres.",
    example: "Deux membres d'un assujetti unique échangent une prestation.",
    erp: "Identifier les membres, le représentant et les flux internes/externes.",
    annexPage: 97
  }),
  afnorCase({
    id: 28,
    afnorCase: "Cas n°30",
    category: "b2c",
    type: "TVA déjà collectée",
    title: "TVA déjà collectée : opération traitée initialement en e-reporting B2C avec facture a posteriori",
    description: "Une opération déjà déclarée en e-reporting fait ensuite l'objet d'une facture.",
    example: "Un client demande après coup une facture pour une vente initialement B2C.",
    erp: "Eviter la double collecte TVA et marquer le cadre de facturation dédié.",
    annexPage: 97
  }),
  afnorCase({
    id: 29,
    afnorCase: "Cas n°31",
    category: "sectoriel",
    type: "Facture mixte",
    title: "Factures mixtes mentionnant une opération principale et une opération accessoire",
    description: "Facture combinant opération principale et accessoire avec qualification commune ou distincte.",
    example: "Une vente de bien inclut une retouche, livraison ou installation accessoire.",
    erp: "Qualifier lignes principales/accessoires et régime TVA applicable.",
    annexPage: 99
  }),
  afnorCase({
    id: 30,
    afnorCase: "Cas n°32",
    category: "statuts",
    type: "Paiements mensuels",
    title: "Paiements mensuels",
    description: "Paiements périodiques avec complément, trop-perçu ou régularisation finale.",
    example: "Un client verse des mensualités puis reçoit une régularisation.",
    erp: "Gérer échéancier, régularisation, trop-perçu et statut d'encaissement.",
    annexPage: 101
  }),
  afnorCase({
    id: 31,
    afnorCase: "Cas n°33",
    category: "sectoriel",
    type: "TVA sur marge",
    title: "Opérations soumises au régime de la marge bénéficiaire",
    description: "Régime particulier où la TVA est calculée sur la marge et non sur le prix total.",
    example: "Vente de biens d'occasion sous régime de marge.",
    erp: "Bloquer le calcul TVA standard et utiliser les mentions/régimes dédiés.",
    annexPage: 105
  }),
  afnorCase({
    id: 32,
    afnorCase: "Cas n°34",
    category: "statuts",
    type: "Encaissement",
    title: "Encaissement partiel et annulation d'encaissement",
    description: "Gestion d'encaissements fractionnés ou annulés dans le cycle de vie.",
    example: "Un paiement partiel est reçu puis une écriture d'encaissement est annulée.",
    erp: "Tracer chaque encaissement, annulation, montant et date.",
    annexPage: 107
  }),
  afnorCase({
    id: 33,
    afnorCase: "Cas n°35",
    category: "sectoriel",
    type: "Droits d'auteur",
    title: "Notes d'auteur",
    description: "Traitement spécifique des notes ou factures liées aux droits d'auteur.",
    example: "Un auteur transmet une note à une société cliente.",
    erp: "Qualifier auteur, assujettissement, retenues et régime TVA.",
    annexPage: 108
  }),
  afnorCase({
    id: 34,
    afnorCase: "Cas n°36",
    category: "sectoriel",
    type: "Secret professionnel",
    title: "Opérations soumises au secret professionnel et échanges de données sensibles",
    description: "Opérations où certaines données de facture ou d'échange sont sensibles.",
    example: "Une prestation protégée par secret professionnel nécessite un traitement restreint.",
    erp: "Contrôler visibilité, droits d'accès, données exposées et audit.",
    annexPage: 108
  }),
  afnorCase({
    id: 35,
    afnorCase: "Cas complémentaire",
    category: "sectoriel",
    title: "Sociétés en participation",
    description: "Facturation impliquant une société en participation ou un schéma assimilé.",
    example: "Des partenaires opèrent conjointement sans structure sociétaire classique visible dans la facture.",
    erp: "Documenter les parties, mandats, quote-parts et responsabilités fiscales."
  }),
  afnorCase({
    id: 36,
    afnorCase: "Cas complémentaire",
    category: "sectoriel",
    title: "Factures avec sous-lignes et regroupements de lignes",
    description: "Factures dont les lignes agrègent des sous-lignes ou détails opérationnels.",
    example: "Une facture d'énergie ou transport regroupe plusieurs index, services ou taxes.",
    erp: "Maintenir détail opérationnel, ligne fiscale et regroupement lisible."
  }),
  afnorCase({
    id: 37,
    afnorCase: "Cas complémentaire",
    category: "plateforme",
    title: "Facture multi-vendeurs / intermédiaire transparent regroupant des ventes de plusieurs vendeurs",
    description: "Un intermédiaire regroupe des ventes réalisées par plusieurs vendeurs.",
    example: "Une plateforme agrège des ventes de plusieurs fournisseurs sur un document ou processus.",
    erp: "Ne pas perdre le vendeur réel, les montants par vendeur et les mandats."
  }),
  afnorCase({
    id: 38,
    afnorCase: "Cas complémentaire",
    category: "statuts",
    type: "Compensation",
    title: "Paiements groupés, netting ou compensation en cas d'achat / vente croisés",
    description: "Règlement par compensation ou netting entre factures clients et fournisseurs.",
    example: "Deux entreprises sont à la fois clientes et fournisseurs et compensent leurs soldes.",
    erp: "Conserver chaque facture séparément et tracer l'accord de compensation."
  }),
  afnorCase({
    id: 39,
    afnorCase: "Cas complémentaire",
    category: "sectoriel",
    title: "Sociétés de barter",
    description: "Opérations d'échange, barter ou compensation commerciale organisée.",
    example: "Des prestations sont échangées via un réseau de barter plutôt que réglées directement en numéraire.",
    erp: "Qualifier contrepartie, valorisation, TVA et lettrage."
  }),
  afnorCase({
    id: 40,
    afnorCase: "Cas complémentaire",
    category: "sectoriel",
    title: "Gestion de la détaxe",
    description: "Traitement des opérations de détaxe et des justificatifs associés.",
    example: "Une vente peut donner lieu à détaxe selon le client, le territoire et les justificatifs.",
    erp: "Contrôler éligibilité, preuve, statut fiscal et régularisation éventuelle."
  }),
  afnorCase({
    id: 41,
    afnorCase: "Cas complémentaire",
    category: "b2b-int",
    type: "B2B international / e-reporting",
    title: "Factures B2B internationales et e-reporting",
    description: "Factures B2B hors périmètre domestique mais pouvant relever de l'e-reporting.",
    example: "Une société française facture une entreprise étrangère.",
    format: "E-reporting transaction selon qualification",
    erp: "Identifier pays, TVA, client assujetti, devise et flux de reporting.",
    sources: [...AFNOR_SOURCES, "transaction-data-local", "legifrance-cgi-annexe-iv"]
  }),
  afnorCase({
    id: 42,
    afnorCase: "Cas complémentaire",
    category: "b2b-int",
    type: "Opération internationale",
    title: "Opérations triangulaires",
    description: "Opérations impliquant plusieurs parties situées dans plusieurs pays.",
    example: "A vend à B mais la marchandise est livrée directement de C vers le client final.",
    format: "Qualification TVA et e-reporting selon circuit",
    erp: "Tracer pays des parties, flux physique, flux facture et régime TVA."
  }),
  afnorCase({
    id: 43,
    afnorCase: "Cas complémentaire",
    category: "b2b-int",
    type: "Intracommunautaire",
    title: "Transferts de stocks assimilés à des livraisons intracommunautaires",
    description: "Transfert de stocks pouvant être assimilé fiscalement à une livraison intracommunautaire.",
    example: "Une entreprise déplace des stocks entre États membres sans vente immédiate.",
    format: "Qualification TVA / e-reporting selon régime",
    erp: "Relier mouvement de stock, établissement, pays et traitement TVA."
  }),
  afnorCase({
    id: 44,
    afnorCase: "Cas complémentaire",
    category: "b2b-int",
    type: "Territoires",
    title: "Transactions avec les DROM / COM / TAAF",
    description: "Opérations avec territoires ultramarins nécessitant une qualification territoriale.",
    example: "Une société de métropole facture ou livre vers un DROM, une COM ou les TAAF.",
    format: "Qualification territoriale avant e-invoicing/e-reporting",
    erp: "Maintenir tables territoires, pays, TVA, exonérations et routage."
  })
];
