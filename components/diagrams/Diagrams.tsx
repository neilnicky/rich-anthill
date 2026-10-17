import styles from "./Diagrams.module.css";

/** A schematic worker: head, thorax, gaster, six legs, two antennae. Not any particular species. */
function Ant({ x, y, r = 0, s = 1, crop = false }: { x: number; y: number; r?: number; s?: number; crop?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M-1 -2 L-6 -9 M1 -2 L5 -10 M0 2 L-7 6 M1 2 L6 7 M-2 0 L-8 -1 M2 0 L8 1" />
        <path d="M-12 -2 L-17 -8 M-12 2 L-17 7" />
      </g>
      <circle cx="-11" cy="0" r="3.6" fill="currentColor" />
      <ellipse cx="0" cy="0" rx="4.4" ry="2.6" fill="currentColor" />
      <ellipse cx="10" cy="0" rx="6.4" ry="4.6" fill={crop ? "var(--paper)" : "currentColor"} stroke="currentColor" strokeWidth="1.4" />
      {crop ? <circle cx="9" cy="0" r="2.6" fill="currentColor" /> : null}
    </g>
  );
}

function Label({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "end" | "middle" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={styles.label}>
      {children}
    </text>
  );
}

function Leader({ d }: { d: string }) {
  return <path d={d} pathLength={1} className={`${styles.leader} ${styles.draw}`} />;
}

export function TrailDiagram() {
  return (
    <svg viewBox="0 0 320 300" className={styles.svg} role="img" aria-labelledby="d-trail">
      <title id="d-trail">
        Diagram: a scout walks from a large food drop back to the nest, laying a trail that other workers follow.
      </title>
      <path d="M20 262 H300" className={styles.ground} />
      <path d="M28 262 a46 34 0 0 1 92 0z" fill="currentColor" />
      <path d="M72 238 C120 170 170 220 210 150 S262 96 252 92" className={styles.trail} />
      <rect x="236" y="62" width="34" height="34" fill="currentColor" />
      <Ant x={214} y={146} r={-62} s={0.9} />
      <Ant x={170} y={196} r={-18} s={0.9} />
      <Ant x={118} y={204} r={150} s={0.9} />
      <Leader d="M283 72 L300 46" />
      <Label x={300} y={38} anchor="end">
        More than one crop holds
      </Label>
      <Leader d="M224 128 L270 160" />
      <Label x={274} y={176}>
        Scout
      </Label>
      <Label x={274} y={190}>
        lays a trail
      </Label>
      <Label x={74} y={290} anchor="middle">
        Nest
      </Label>
      <Label x={190} y={290} anchor="start">
        Recruits follow
      </Label>
      <Leader d="M188 282 L168 212" />
    </svg>
  );
}

export function CropDiagram() {
  return (
    <svg viewBox="0 40 320 224" className={styles.svg} role="img" aria-labelledby="d-crop">
      <title id="d-crop">
        Diagram: two workers face each other, mouths touching. The forager passes liquid from its crop to the other worker.
      </title>
      <Ant x={118} y={150} r={180} s={3} crop />
      <Ant x={202} y={150} r={0} s={3} />
      <circle cx="160" cy="150" r="4" className={styles.drop} />
      <Leader d="M90 162 L60 214" />
      <Label x={20} y={232}>
        Crop: food held
      </Label>
      <Label x={20} y={246}>
        to share
      </Label>
      <Leader d="M160 142 L160 84" />
      <Label x={160} y={64} anchor="middle">
        Mouth to mouth
      </Label>
      <Label x={160} y={78} anchor="middle">
        (trophallaxis)
      </Label>
      <Label x={112} y={196} anchor="middle">
        Forager
      </Label>
      <Label x={214} y={196} anchor="middle">
        Nestmate
      </Label>
    </svg>
  );
}

export function DietDiagram() {
  return (
    <svg viewBox="0 0 320 300" className={styles.svg} role="img" aria-labelledby="d-diet">
      <title id="d-diet">
        Diagram: foragers bring two kinds of food into the nest. Workers use the carbohydrate; larvae take the protein.
      </title>
      <Ant x={160} y={44} r={90} s={1.4} />
      <Label x={186} y={40}>
        A few foragers
      </Label>
      <Leader d="M150 78 L84 140" />
      <Leader d="M170 78 L236 140" />
      <rect x="62" y="150" width="40" height="40" fill="currentColor" />
      <path d="M218 192 V164 a20 20 0 0 1 40 0 V192z" fill="currentColor" />
      <Label x={82} y={214} anchor="middle">
        Carbohydrate
      </Label>
      <Label x={238} y={214} anchor="middle">
        Protein
      </Label>
      <Ant x={74} y={256} r={0} s={1.4} />
      <g transform="translate(222 256)" fill="currentColor">
        <ellipse cx="0" cy="0" rx="7" ry="9" />
        <ellipse cx="13" cy="1" rx="7" ry="10" />
        <ellipse cx="26" cy="0" rx="6.5" ry="9" />
        <ellipse cx="37" cy="-1" rx="5" ry="7" />
      </g>
      <Label x={82} y={290} anchor="middle">
        Workers
      </Label>
      <Label x={240} y={290} anchor="middle">
        Larvae
      </Label>
    </svg>
  );
}
