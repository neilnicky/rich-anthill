import { byDay, dayCode, episodes } from "@/lib/episodes";
import { issuedLine } from "@/lib/copy";
import { ogSize, ticket } from "../../_og/ticket";

export const alt = "One day of the Rich Anthill series: what was given and what is still unknown.";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return episodes.map((e) => ({ day: String(e.day) }));
}

export default async function Image({ params }: { params: Promise<{ day: string }> }) {
  const ep = byDay(Number((await params).day));
  if (!ep) return ticket({ code: "—", lines: ["Day", "not yet", "issued"], foot: "@rich_anthill" });
  const status = ep.issued.status === "confirmed" ? "Confirmed" : ep.issued.status === "reported" ? "Reported, not yet confirmed" : "Not yet known";
  return ticket({
    code: dayCode(ep.day),
    lines: [`Day ${ep.day}`, issuedLine(ep), "Outcome unknown"],
    foot: `${status} · @rich_anthill`,
  });
}
