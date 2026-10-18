import { ImageResponse } from "next/og";
import { crumbOgB64, literataB64, literataItalicB64, martianB64 } from "./fonts.generated";

// Decoded once per isolate; no fs, so it runs identically in Node and workerd.
const decode = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer;
const literata = decode(literataB64);
const literataItalic = decode(literataItalicB64);
const martian = decode(martianB64);
const photo = `data:image/jpeg;base64,${crumbOgB64}`;

export const ogSize = { width: 1200, height: 630 };

const C = { soil: "#17110c", bone: "#ece6da", bone2: "#b3aa9c", ant: "#e0612b" };
const SUPER = "Stand-in photograph · other ants, not this colony";

/** The share card: the opening frame in its viewfinder, with the day's three narration lines. */
export function ticket({ code, lines, foot }: { code: string; lines: [string, string, string]; foot: string }) {
  const tick = (pos: Record<string, number>, w: number, h: number) => (
    <div style={{ position: "absolute", width: w, height: h, background: C.bone, ...pos }} />
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: C.soil }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", background: "rgba(23,17,12,0.45)" }} />
        {tick({ top: 28, left: 28 }, 34, 2)}
        {tick({ top: 28, left: 28 }, 2, 34)}
        {tick({ top: 28, right: 28 }, 34, 2)}
        {tick({ top: 28, right: 28 }, 2, 34)}
        {tick({ bottom: 28, left: 28 }, 34, 2)}
        {tick({ bottom: 28, left: 28 }, 2, 34)}
        {tick({ bottom: 28, right: 28 }, 34, 2)}
        {tick({ bottom: 28, right: 28 }, 2, 34)}
        <div
          style={{
            position: "absolute",
            top: 52,
            left: 52,
            display: "flex",
            padding: "5px 10px",
            background: "rgba(23,17,12,0.85)",
            color: C.bone,
            fontFamily: "Martian",
            fontSize: 18,
          }}
        >
          {SUPER}
        </div>
        <div style={{ position: "absolute", top: 56, right: 60, display: "flex", fontFamily: "Martian", fontSize: 20, color: C.bone2 }}>
          {code}
        </div>
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 60,
            right: 64,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Literata", fontSize: 92, lineHeight: 1, letterSpacing: -3, color: C.bone }}>
            <span>{lines[0]}.</span>
            <span>{lines[1]}.</span>
            <span style={{ fontFamily: "LiterataItalic", color: C.ant }}>{lines[2]}.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 26, fontFamily: "Martian", fontSize: 20, color: C.bone }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: C.ant, marginRight: 14 }} />
            <span>{foot}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Literata", data: literata, weight: 300, style: "normal" },
        { name: "LiterataItalic", data: literataItalic, weight: 300, style: "italic" },
        { name: "Martian", data: martian, weight: 400, style: "normal" },
      ],
    },
  );
}
