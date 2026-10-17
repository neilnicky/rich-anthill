// Turns stand-in photographs into one-ink halftone plates (45° dot screen, transparent PNG).
// The site uses each plate as a CSS mask filled with an ink token, so dots follow the theme.
// Usage: pnpm plates
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = join(import.meta.dirname, "..");
const out = join(root, "public", "media", "plates");
mkdirSync(out, { recursive: true });

const plates = {
  bark: "assets/Hero Grade Ants Colony Macro.jpg",
  crumb: "assets/Feeding Ants Colony Macro.jpg",
  specimen: "assets/Ant Custom Illustrations.jpg",
  core: "assets/Feeding Ants Colony Macro (1).jpg",
  scout: "assets/Ant Macro Photography (2).jpg",
};

// [output width, screen pitch in px]. Smaller files get a coarser screen so dots stay crisp on phones.
const sizes = [
  [1800, 9],
  [900, 6],
];

async function plate(id, src, width, pitch) {
  const { data, info } = await sharp(join(root, src))
    .resize({ width })
    .grayscale()
    .normalise({ lower: 3, upper: 97 })
    .linear(1.2, -0.1 * 255)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const lum = (x, y) => {
    const xi = Math.min(w - 1, Math.max(0, Math.round(x)));
    const yi = Math.min(h - 1, Math.max(0, Math.round(y)));
    return data[yi * w + xi] / 255;
  };
  const cos = Math.SQRT1_2;
  const span = Math.ceil((w + h) / pitch) + 2;
  const dots = [];
  for (let i = -span; i <= span; i++) {
    for (let j = -span; j <= span; j++) {
      // 45° lattice
      const x = (i - j) * pitch * cos + w / 2;
      const y = (i + j) * pitch * cos + h / 2;
      if (x < -pitch || y < -pitch || x > w + pitch || y > h + pitch) continue;
      const q = pitch / 3;
      const avg = (lum(x, y) * 2 + lum(x - q, y) + lum(x + q, y) + lum(x, y - q) + lum(x, y + q)) / 6;
      const ink = Math.pow(1 - avg, 1.15); // slight shadow lift keeps detail on board grey
      const r = (pitch / 2) * Math.sqrt(ink) * 1.18;
      if (r < 0.35) continue;
      dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}"/>`);
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><g fill="#000" shape-rendering="crispEdges">${dots.join("")}</g></svg>`;
  const file = join(out, `${id}-${width}.png`);
  const res = await sharp(Buffer.from(svg)).png({ palette: true, colours: 2, dither: 0, compressionLevel: 9, effort: 10 }).toFile(file);
  console.log(`${id}-${width}.png ${w}×${h} ${(res.size / 1024).toFixed(0)} KB`);
}

for (const [id, src] of Object.entries(plates)) {
  for (const [width, pitch] of sizes) await plate(id, src, width, pitch);
}
