import day1 from "@/content/episodes/day-001.json";
import day2 from "@/content/episodes/day-002.json";
import day3 from "@/content/episodes/day-003.json";
import { publishableSources } from "@/content/sources";
import { checkEpisodes, episodeSchema, type Episode, type Source } from "./schema";

// New days: add the JSON file and one import line above.
const raw: unknown[] = [day1, day2, day3];

const sourceIds = new Set(publishableSources.map((s) => s.id));

export const episodes: Episode[] = raw
  .map((r) => episodeSchema.parse(r))
  .sort((a, b) => a.day - b.day);

const problems = checkEpisodes(episodes, sourceIds);
if (problems.length) throw new Error(`Episode data is invalid:\n- ${problems.join("\n- ")}`);

export const latest = (): Episode => episodes[episodes.length - 1];

export const byDay = (day: number): Episode | undefined => episodes.find((e) => e.day === day);

export const neighbours = (day: number) => ({ prev: byDay(day - 1), next: byDay(day + 1) });

export const sourceById = (id: string): Source | undefined => publishableSources.find((s) => s.id === id);

/** "Day 03": the frame number printed on film frames and tickets. */
export const dayCode = (day: number) => `Day ${String(day).padStart(2, "0")}`;

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d} ${months[m - 1]} ${y}`;
}

/** Display words for what was issued. Unknown days never get a guessed label. */
export function issuedLabel(ep: Episode): string {
  return ep.issued.value?.label ?? "Contents unconfirmed";
}

/** Shorter label for the small register cells. */
export function cellLabel(ep: Episode): string {
  return ep.issued.value?.label ?? "Unconfirmed";
}

export const STATUS_TEXT = {
  confirmed: "Confirmed",
  reported: "Reported, not yet confirmed",
  unknown: "Not yet known",
} as const;
