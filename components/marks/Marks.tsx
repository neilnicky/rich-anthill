import type { Episode } from "@/lib/schema";

type MarkProps = { size?: number; className?: string; title?: string };

function Svg({ size = 24, className, title, children }: MarkProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** The office itself: a disc over a bar. */
export function ServiceMark(p: MarkProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="9" r="7" fill="currentColor" />
      <rect x="5" y="18.5" width="14" height="3.5" fill="currentColor" />
    </Svg>
  );
}

/** Sugar: a solid cube. */
export function SugarMark(p: MarkProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="4" width="16" height="16" fill="currentColor" />
    </Svg>
  );
}

/** Protein: an arch-topped tin. */
export function ProteinMark(p: MarkProps) {
  return (
    <Svg {...p}>
      <path d="M5 21V10a7 7 0 0 1 14 0v11z" fill="currentColor" />
    </Svg>
  );
}

/** Something was issued; nobody has confirmed what. */
export function UnconfirmedMark(p: MarkProps) {
  return (
    <Svg {...p}>
      <rect x="4.75" y="4.75" width="14.5" height="14.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 19L19 5" stroke="currentColor" strokeWidth="1.5" />
    </Svg>
  );
}

export function FoodMark({ episode, ...p }: MarkProps & { episode: Episode }) {
  const food = episode.issued.value?.food;
  if (food === "sugar") return <SugarMark {...p} />;
  if (food === "protein") return <ProteinMark {...p} />;
  return <UnconfirmedMark {...p} />;
}
