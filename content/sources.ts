import type { Source } from "@/lib/schema";

/**
 * Every finding below paraphrases an abstract read on 2026-10-17
 * (PubMed, eLife API, PMC or the publisher's indexed abstract).
 * Bibliographic fields were checked against Crossref.
 * Only `publishable: true` records may render on the site.
 */
export const sources: Source[] = [
  {
    id: "S1",
    authors: "Beckers R, Deneubourg J-L, Goss S",
    year: 1993,
    title:
      "Modulation of trail laying in the ant Lasius niger (Hymenoptera: Formicidae) and its role in the collective selection of a food source",
    journal: "Journal of Insect Behavior",
    volume: "6(6)",
    pages: "751–759",
    doi: "10.1007/BF01201674",
    species: "Lasius niger",
    setting: "lab",
    finding:
      "Foragers coming back from a richer sugar source laid more trail marks. In the authors' model, that alone steers a colony towards the richer of two sources.",
    verified: "abstract",
    publishable: true,
  },
  {
    id: "S2",
    authors: "Czaczkes TJ, Grüter C, Ratnieks FLW",
    year: 2015,
    title: "Trail pheromones: an integrative view of their role in social insect colony organization",
    journal: "Annual Review of Entomology",
    volume: "60",
    pages: "581–599",
    doi: "10.1146/annurev-ento-010814-020627",
    setting: "review",
    finding:
      "Trail pheromones do more than mark a route. Through positive and negative feedback they set how hard a colony works each food source it knows about, alongside individual memory.",
    verified: "abstract",
    publishable: true,
  },
  {
    id: "S3",
    authors: "Mailleux A-C, Deneubourg J-L, Detrain C",
    year: 2000,
    title: "How do ants assess food volume?",
    journal: "Animal Behaviour",
    volume: "59(5)",
    pages: "1061–1069",
    doi: "10.1006/anbe.2000.1396",
    species: "Lasius niger",
    setting: "lab",
    finding:
      "A scout recruits nestmates when it can drink its own 'desired volume' at a drop. At sucrose drops bigger than a crop, 90% of scouts went straight home laying a trail.",
    verified: "abstract",
    publishable: true,
  },
  {
    id: "S4",
    authors: "LeBoeuf AC, Waridel P, Brent CS, et al.",
    year: 2016,
    title: "Oral transfer of chemical cues, growth proteins and hormones in social insects",
    journal: "eLife",
    volume: "5",
    pages: "e20375",
    doi: "10.7554/eLife.20375",
    species: "Camponotus floridanus",
    setting: "lab",
    finding:
      "The fluid ants pass mouth to mouth carries proteins, hydrocarbons, microRNAs and juvenile hormone. Adding the hormone to workers' food made the larvae they fed twice as likely to complete metamorphosis.",
    verified: "abstract",
    publishable: true,
  },
  {
    id: "S5",
    authors: "Greenwald EE, Baltiansky L, Feinerman O",
    year: 2018,
    title: "Individual crop loads provide local control for collective food intake in ant colonies",
    journal: "eLife",
    volume: "7",
    pages: "e31730",
    doi: "10.7554/eLife.31730",
    species: "Camponotus sanctus",
    setting: "lab",
    finding:
      "How full the receiving ants are sets how fast food flows in; how full the foragers are sets how often they go out. No forager needs to know the state of the whole colony.",
    verified: "abstract",
    publishable: true,
  },
  {
    id: "S6",
    authors: "Csata E, Dussutour A",
    year: 2019,
    title: "Nutrient regulation in ants (Hymenoptera: Formicidae): a review",
    journal: "Myrmecological News",
    volume: "29",
    pages: "111–124",
    doi: "10.25849/myrmecol.news_029:111",
    setting: "review",
    finding: "Review of how ant colonies regulate macronutrient intake.",
    verified: "citation-only",
    publishable: false,
  },
  {
    id: "S7",
    authors: "Dussutour A, Simpson SJ",
    year: 2009,
    title: "Communal nutrition in ants",
    journal: "Current Biology",
    volume: "19(9)",
    pages: "740–744",
    doi: "10.1016/j.cub.2009.03.015",
    setting: "lab",
    finding:
      "A few workers collect food for everyone; workers burn carbohydrate and larvae consume protein. Foragers kept carbohydrate and ejected protein. Processing excess protein shortened their lives, far less so when larvae were present.",
    verified: "abstract",
    publishable: true,
  },
  {
    id: "S8",
    authors: "Dussutour A, Simpson SJ",
    year: 2012,
    title: "Ant workers die young and colonies collapse when fed a high-protein diet",
    journal: "Proceedings of the Royal Society B",
    volume: "279(1737)",
    pages: "2402–2408",
    doi: "10.1098/rspb.2012.0051",
    species: "Lasius niger",
    setting: "lab",
    finding:
      "Workers on high-protein, low-carbohydrate diets lived far shorter lives, driven by the protein itself. A single day on such a diet harmed workers and colony size.",
    limits: "Queenless laboratory colonies of 200 workers on synthetic diets.",
    verified: "abstract",
    publishable: true,
  },
  {
    id: "S9",
    authors: "Grover CD, Kay AD, Monson JA, Marsh TC, Holway DA",
    year: 2007,
    title:
      "Linking nutrition and behavioural dominance: carbohydrate scarcity limits aggression and activity in Argentine ants",
    journal: "Proceedings of the Royal Society B",
    volume: "274(1628)",
    pages: "2951–2957",
    doi: "10.1098/rspb.2007.1065",
    species: "Linepithema humile",
    setting: "lab",
    finding:
      "Colonies denied sugar, but not those denied prey, became less aggressive and less active, and their workers carried less fat.",
    limits: "Laboratory colonies of an invasive species.",
    verified: "abstract",
    publishable: true,
  },
];

export const publishableSources = sources.filter((s) => s.publishable);
