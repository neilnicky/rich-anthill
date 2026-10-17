import type { Episode } from "./schema";

const SHORT: Record<string, string> = { sugar: "Sugar", protein: "Protein", other: "Food" };

/** "Protein issued" / "Contents unconfirmed" — the second line of the opening headline. */
export function issuedLine(ep: Episode): string {
  const v = ep.issued.value;
  return v ? `${SHORT[v.food]} issued` : "Contents unconfirmed";
}

/** "Day 1 was sugar. Day 3 was protein." Only days with a value; unknown days stay silent. */
export function issueSentence(episodes: Episode[]): string {
  return episodes
    .filter((e) => e.issued.value)
    .map((e) => `Day ${e.day} was ${SHORT[e.issued.value!.food].toLowerCase()}.`)
    .join(" ");
}
