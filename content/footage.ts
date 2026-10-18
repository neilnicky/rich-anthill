/** Shots the series would need to replace stand-ins and turn reels into evidence. */
export const footageNeeded: { shot: string; why: string; replaces?: string }[] = [
  {
    shot: "A fixed tripod frame of the feeding spot: same framing, same time each day, a ruler or coin in shot.",
    why: "Makes days comparable. Becomes the opening shot and the evidence frame on every day page.",
    replaces: "crumb",
  },
  {
    shot: "A close shot of the first ants reaching the food.",
    why: "Shows discovery and recruitment, the first science beat.",
    replaces: "scout",
  },
  {
    shot: "Two to five unbroken minutes of the path between nest and food.",
    why: "Shows whether a trail forms or strengthens over the days.",
    replaces: "twig",
  },
  {
    shot: "A close shot of ants feeding and meeting at the food.",
    why: "Possible mouth-to-mouth sharing. Labelled 'possible' unless it is clear.",
    replaces: "handling",
  },
  {
    shot: "A wide shot of the habitat with no landmarks, street signs or buildings.",
    why: "Introduces the colony without giving away the location.",
    replaces: "mound",
  },
  {
    shot: "The packaging or a weighed portion of each day's food.",
    why: "Moves 'Given' from reported to confirmed.",
  },
  {
    shot: "The spot one to two hours after feeding.",
    why: "Records leftovers and whether they were cleared.",
  },
];
