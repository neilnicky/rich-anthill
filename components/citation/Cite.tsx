import { sourceById } from "@/lib/episodes";
import { CitationChip } from "./CitationChip";

/** Server wrapper: looks up a publishable source and renders its chip. Unknown ids fail the build. */
export function Cite({ id }: { id: string }) {
  const source = sourceById(id);
  if (!source) throw new Error(`Cite: ${id} is not a publishable source`);
  return <CitationChip source={source} />;
}
