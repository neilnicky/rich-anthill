import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { checkEpisodes, episodeSchema } from "../lib/schema.ts";

// Mirrors lib/episodes.ts but reads every file on disk, so a forgotten import is caught.
const dir = join(import.meta.dirname, "..", "content", "episodes");
const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
const errors: string[] = [];
const episodes = files.flatMap((f) => {
  const r = episodeSchema.safeParse(JSON.parse(readFileSync(join(dir, f), "utf8")));
  if (!r.success) {
    errors.push(`${f}: ${r.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
    return [];
  }
  return [r.data];
});

const sourcesFile = readFileSync(join(import.meta.dirname, "..", "content", "sources.ts"), "utf8");
const publishable = new Set(
  [...sourcesFile.matchAll(/id: "(S\d+)"[\s\S]*?publishable: (true|false)/g)].filter((m) => m[2] === "true").map((m) => m[1]),
);
errors.push(...checkEpisodes(episodes, publishable));

const imported = readFileSync(join(import.meta.dirname, "..", "lib", "episodes.ts"), "utf8");
files.forEach((f) => {
  if (!imported.includes(f)) errors.push(`${f} is not imported in lib/episodes.ts`);
});

if (errors.length) {
  console.error(`Content invalid:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Content valid: ${episodes.length} days, ${publishable.size} publishable sources.`);
