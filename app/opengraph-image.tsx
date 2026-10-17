import { latest, dayCode } from "@/lib/episodes";
import { issuedLine } from "@/lib/copy";
import { ogSize, ticket } from "./_og/ticket";

export const alt = "The Rich Anthill register: today's issue and an outcome nobody knows yet.";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const ep = latest();
  return ticket({
    code: dayCode(ep.day),
    lines: [`Day ${ep.day}`, issuedLine(ep), "Outcome unknown"],
    foot: "Reported, not yet confirmed · @rich_anthill",
  });
}
