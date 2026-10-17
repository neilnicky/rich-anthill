import type { MetadataRoute } from "next";
import { episodes } from "@/lib/episodes";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const last = episodes[episodes.length - 1].date;
  return [
    { url: `${SITE}/`, lastModified: last, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/days`, lastModified: last, changeFrequency: "daily", priority: 0.9 },
    ...episodes.map((e) => ({ url: `${SITE}/days/${e.day}`, lastModified: e.date, priority: 0.7 })),
    { url: `${SITE}/science`, priority: 0.6 },
    { url: `${SITE}/experiment`, priority: 0.5 },
  ];
}
