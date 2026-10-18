import { z } from "zod";

/**
 * confirmed: an editor saw it in the reel.
 * reported:  someone says so (project owner, creator, press); not yet checked.
 * unknown:   nobody knows yet. The value must be null.
 */
export const statusSchema = z.enum(["confirmed", "reported", "unknown"]);
export type Status = z.infer<typeof statusSchema>;

export const claimSchema = <T extends z.ZodType>(value: T) =>
  z
    .object({
      value: value.nullable(),
      status: statusSchema,
      by: z.enum(["reel", "creator", "project-owner"]).optional(),
      note: z.string().optional(),
    })
    .refine((c: { status: Status; value?: unknown }) => (c.status === "unknown") === (c.value === null), {
      message: "unknown claims must have a null value, and only unknown claims may",
    });

export const foodSchema = z.enum(["sugar", "protein", "other"]);
export type Food = z.infer<typeof foodSchema>;

export const sourceIdSchema = z.string().regex(/^S\d+$/);

export const episodeSchema = z.object({
  day: z.number().int().positive(),
  date: z.iso.date(),
  title: z.string().min(4).max(90),
  reel: z.object({
    shortcode: z.string().regex(/^[A-Za-z0-9_-]{6,}$/),
    url: z.url(),
    status: z.enum(["available", "unavailable"]),
    audio: z.string().optional(),
    hashtags: z.array(z.string().startsWith("#")),
  }),
  issued: claimSchema(
    z.object({
      food: foodSchema,
      label: z.string(),
      quantity: z.string().optional(),
      form: z.string().optional(),
    }),
  ),
  summary: z.string().max(280),
  observations: z.array(claimSchema(z.string())),
  measurements: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
      unit: z.string(),
      method: z.string().min(4),
    }),
  ),
  science: z.array(sourceIdSchema),
  related: z.array(z.object({ day: z.number().int().positive(), reason: z.string() })),
  still: z.string().optional(),
});
export type Episode = z.infer<typeof episodeSchema>;
export type Claim<T> = { value: T | null; status: Status; by?: string; note?: string };

export const sourceSchema = z.object({
  id: sourceIdSchema,
  authors: z.string(),
  year: z.number().int(),
  title: z.string(),
  journal: z.string(),
  volume: z.string().optional(),
  pages: z.string().optional(),
  doi: z.string().optional(),
  species: z.string().optional(),
  setting: z.enum(["lab", "field", "review"]),
  finding: z.string(),
  limits: z.string().optional(),
  verified: z.enum(["abstract", "full-text", "citation-only"]),
  publishable: z.boolean(),
});
export type Source = z.infer<typeof sourceSchema>;

export const mediaSchema = z.object({
  id: z.string(),
  src: z.string(),
  /** Base path of the responsive set built by `pnpm photos`: {photo}-{width}.avif|webp and {photo}-soft.webp */
  photo: z.string(),
  widths: z.array(z.number().int()).min(1),
  width: z.number().int(),
  height: z.number().int(),
  alt: z.string().min(12),
  role: z.enum(["stand-in", "reel-still", "diagram"]),
  credit: z.string().optional(),
  licence: z.string().optional(),
  focal: z.object({ x: z.number().min(0).max(1), y: z.number().min(0).max(1) }),
});
export type Media = z.infer<typeof mediaSchema>;

/** Cross-record rules the per-record schemas cannot express. Returns a list of problems. */
export function checkEpisodes(episodes: Episode[], sourceIds: Set<string>): string[] {
  const problems: string[] = [];
  const sorted = [...episodes].sort((a, b) => a.day - b.day);
  sorted.forEach((ep, i) => {
    if (ep.day !== i + 1) problems.push(`days must be contiguous from 1; found day ${ep.day} at position ${i + 1}`);
    if (i > 0 && ep.date <= sorted[i - 1].date) problems.push(`day ${ep.day} date must be after day ${sorted[i - 1].day}`);
    ep.science.forEach((id) => {
      if (!sourceIds.has(id)) problems.push(`day ${ep.day} cites ${id}, which is not a publishable source`);
    });
    ep.related.forEach((r) => {
      if (!sorted.some((e) => e.day === r.day)) problems.push(`day ${ep.day} relates to missing day ${r.day}`);
      if (r.day === ep.day) problems.push(`day ${ep.day} relates to itself`);
    });
  });
  return problems;
}
