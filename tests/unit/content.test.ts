import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { checkEpisodes, episodeSchema, type Episode } from "@/lib/schema";
import { episodes } from "@/lib/episodes";
import { publishableSources, sources } from "@/content/sources";
import { media } from "@/content/media";
import day3 from "@/content/episodes/day-003.json";

const ids = new Set(publishableSources.map((s) => s.id));

describe("episode content", () => {
  it("seed days validate and run 1..n without gaps", () => {
    expect(episodes.map((e) => e.day)).toEqual([1, 2, 3]);
    expect(checkEpisodes(episodes, ids)).toEqual([]);
  });

  it("Day 2 stays unknown: no invented food", () => {
    const d2 = episodes[1];
    expect(d2.issued.status).toBe("unknown");
    expect(d2.issued.value).toBeNull();
    expect(d2.observations).toEqual([]);
  });

  it("no day claims observations or measurements nobody recorded", () => {
    for (const e of episodes) {
      expect(e.measurements).toEqual([]);
      expect(e.observations.every((o) => o.status !== "confirmed")).toBe(true);
    }
  });

  it("food issued on Days 1 and 3 is reported, not confirmed", () => {
    expect(episodes[0].issued).toMatchObject({ status: "reported", by: "project-owner", value: { food: "sugar" } });
    expect(episodes[2].issued).toMatchObject({ status: "reported", by: "project-owner", value: { food: "protein" } });
  });

  it("rejects an unknown claim that carries a value", () => {
    const bad = { ...day3, issued: { ...day3.issued, status: "unknown" } };
    expect(episodeSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a reported claim with no value", () => {
    const bad = { ...day3, issued: { value: null, status: "reported" } };
    expect(episodeSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a measurement without a method", () => {
    const bad = { ...day3, measurements: [{ label: "Ants at drop", value: 40, unit: "ants", method: "" }] };
    expect(episodeSchema.safeParse(bad).success).toBe(false);
  });

  it("flags gaps, unknown sources and dangling related days", () => {
    const d = (n: number, extra: Partial<Episode> = {}) =>
      ({ ...episodes[0], day: n, date: `2026-10-${10 + n}`, science: [], related: [], ...extra }) as Episode;
    const problems = checkEpisodes([d(1, { science: ["S6"] }), d(3, { related: [{ day: 9, reason: "x" }] })], ids);
    expect(problems.join("\n")).toMatch(/contiguous/);
    expect(problems.join("\n")).toMatch(/S6/);
    expect(problems.join("\n")).toMatch(/missing day 9/);
  });
});

describe("sources", () => {
  it("only publishes sources verified at abstract level or better, each with a DOI", () => {
    for (const s of publishableSources) {
      expect(s.verified).not.toBe("citation-only");
      expect(s.doi).toMatch(/^10\./);
    }
  });

  it("keeps unverified sources out of public pages", () => {
    expect(sources.find((s) => s.id === "S6")?.publishable).toBe(false);
    expect(ids.has("S6")).toBe(false);
  });

  it("states the limits of the protein study", () => {
    expect(sources.find((s) => s.id === "S8")?.limits).toMatch(/Queenless laboratory/);
  });
});

describe("media", () => {
  it("marks every supplied photograph as a stand-in with no claimed licence", () => {
    for (const m of Object.values(media)) {
      expect(m.role).toBe("stand-in");
      expect(m.licence).toBeUndefined();
      expect(m.alt.length).toBeGreaterThan(20);
    }
  });

  it("has every declared photo width built on disk", () => {
    for (const m of Object.values(media)) {
      const base = join(process.cwd(), "public", m.photo);
      for (const w of m.widths) {
        expect(existsSync(`${base}-${w}.avif`), `${m.id} ${w} avif`).toBe(true);
        expect(existsSync(`${base}-${w}.webp`), `${m.id} ${w} webp`).toBe(true);
      }
      expect(existsSync(`${base}-soft.webp`), `${m.id} soft`).toBe(true);
    }
  });
});
