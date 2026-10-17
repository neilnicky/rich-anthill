export type OpenQuestion = {
  id: string;
  question: string;
  /** What would point one way, what would point the other. Each line names its basis. */
  readings: { label: string; text: string; sources?: string[] }[];
  /** What the series would have to record to answer it. */
  needs: string;
};

// Paraphrased from the themes of the reels' comment sections (army, giant ants, economy, harm).
// No usernames, no quotes.
export const openQuestions: OpenQuestion[] = [
  {
    id: "grow",
    question: "Will the colony grow?",
    readings: [
      { label: "It might", text: "More food can mean more brood, if the colony has a queen and larvae to feed." },
      { label: "It might not", text: "A colony can store, share out or ignore extra food. Size depends on far more than one supply." },
    ],
    needs: "Counts of workers at the drop, filmed the same way, over weeks.",
  },
  {
    id: "protein",
    question: "Will the protein hurt it?",
    readings: [
      {
        label: "Lab colonies suffered",
        text: "Workers on high-protein diets died younger in queenless lab colonies.",
        sources: ["S8"],
      },
      {
        label: "Larvae change the picture",
        text: "Larvae consume protein, and the harm from excess protein shrank when larvae were present.",
        sources: ["S7"],
      },
    ],
    needs: "Whether this colony has larvae, how much whey it takes, and what it leaves behind.",
  },
  {
    id: "trail",
    question: "Will the trail get stronger?",
    readings: [
      {
        label: "Expect more traffic",
        text: "Richer sugar sources draw more trail-laying in lab colonies.",
        sources: ["S1", "S3"],
      },
      { label: "Expect noise", text: "Weather, rival colonies and where the food lands all change traffic from day to day." },
    ],
    needs: "A fixed camera frame of the path between nest and drop, at the same time each day.",
  },
  {
    id: "neighbours",
    question: "Will the neighbours notice?",
    readings: [
      { label: "Probably", text: "Other ants, flies and birds find reliable food. The reels may show visitors." },
      { label: "Unclear what follows", text: "A steady food source can shift how ants treat the species around them." },
    ],
    needs: "Wider shots of the drop, noting every other species that arrives.",
  },
];
