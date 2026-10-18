import type { Episode } from "./schema";

/** "Whey protein" / "Contents unconfirmed": the middle line of the opening headline. */
export function issuedLine(ep: Episode): string {
  return ep.issued.value?.label ?? "Contents unconfirmed";
}

/** "Day 1 was sugar. Day 3 was whey protein." Only days with a value; unknown days stay silent. */
export function issueSentence(episodes: Episode[]): string {
  return episodes
    .filter((e) => e.issued.value)
    .map((e) => `Day ${e.day} was ${e.issued.value!.label.toLowerCase()}.`)
    .join(" ");
}
