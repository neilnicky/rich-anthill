// Builds the responsive photographs in public/media/photos from the originals in assets/.
// For each photo: AVIF + WebP at several widths, and a pre-blurred "soft" layer used for the
// rack focus (cross-fading two images is far cheaper on phones than animating CSS blur).
// Run: pnpm photos
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT = "public/media/photos";
mkdirSync(OUT, { recursive: true });

const WIDTHS = [640, 1080, 1600, 2400];

/** id → source file. Must match content/media.ts. */
const PHOTOS = {
  crumb: "assets/Feeding Ants Colony Macro.jpg",
  mound: "assets/Hero Grade Ants Colony.jpg",
  scout: "assets/Ant Macro Photography.jpg",
  twig: "assets/Hero Grade Ants Colony Macro (1).jpg",
  orange: "assets/Feeding Ants Colony Macro (2).jpg",
  handling: "assets/Feeding Ants Colony Macro (3).jpg",
  pulp: "assets/Hero Grade Ants Colony Macro.jpg",
  worker: "assets/Ant Scientific Illustrations.jpg",
  specimen: "assets/Ant Custom Illustrations.jpg",
  moss: "assets/Ant Macro Photography (2).jpg",
};

for (const [id, src] of Object.entries(PHOTOS)) {
  const meta = await sharp(src).metadata();
  for (const w of WIDTHS) {
    if (w > meta.width) continue;
    const img = sharp(src).rotate().resize({ width: w });
    await img.clone().avif({ quality: 50, effort: 5 }).toFile(`${OUT}/${id}-${w}.avif`);
    await img.clone().webp({ quality: 74 }).toFile(`${OUT}/${id}-${w}.webp`);
  }
  await sharp(src).rotate().resize({ width: 960 }).blur(14).webp({ quality: 60 }).toFile(`${OUT}/${id}-soft.webp`);
  console.log(id, `${meta.width}x${meta.height}`);
}

// Share card background: the opening frame, cropped to 1200×630 around the crumb. JPEG, because
// the share-image renderer reads JPEG and PNG only.
await sharp(PHOTOS.crumb)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .modulate({ brightness: 0.82 })
  .jpeg({ quality: 78, mozjpeg: true })
  .toFile("app/_og/crumb-og.jpg");
console.log("og", "1200x630");
