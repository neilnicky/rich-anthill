import { ImageResponse } from "next/og";
import { archivoB64, martianB64 } from "./fonts.generated";

// Decoded once per isolate; no fs, so it runs identically in Node and workerd.
const decode = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer;
const archivo = decode(archivoB64);
const martian = decode(martianB64);

export const ogSize = { width: 1200, height: 630 };

const C = { board: "#d4d0c6", paper: "#e4e1d9", umber: "#2b2219", chitin: "#a33a17", fleck: "#7a7368" };

/** The share card: a kiosk ticket with the day's three-line notice. */
export function ticket({ code, lines, foot }: { code: string; lines: [string, string, string]; foot: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.board, padding: 48 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: `3px solid ${C.umber}`,
            background: C.paper,
            padding: "40px 48px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Martian", fontSize: 26, color: C.umber }}>
            <span>{code}</span>
            <span>Ant Life Improvement Service</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Archivo", fontSize: 104, lineHeight: 0.9 }}>
            <span style={{ color: C.umber }}>{lines[0].toUpperCase()}</span>
            <span style={{ color: C.umber }}>{lines[1].toUpperCase()}</span>
            <span style={{ color: C.chitin }}>{lines[2].toUpperCase()}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Martian", fontSize: 22, color: C.umber }}>
            <div style={{ width: 22, height: 22, background: C.chitin }} />
            <span>{foot}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Archivo", data: archivo, weight: 800, style: "normal" },
        { name: "Martian", data: martian, weight: 400, style: "normal" },
      ],
    },
  );
}
