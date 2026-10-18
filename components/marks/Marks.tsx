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

/** The site mark: a crumb resting on the ground line. */
export function ServiceMark(p: MarkProps) {
  return (
    <Svg {...p}>
      <path d="M1.5 17.25h21" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12.5" r="4" fill="currentColor" />
    </Svg>
  );
}

/** Sugar: a cube drawn in line. */
export function SugarMark(p: MarkProps) {
  return (
    <Svg {...p}>
      <path
        d="M12 3.5l7.5 4.25v8.5L12 20.5l-7.5-4.25v-8.5zM4.5 7.75L12 12l7.5-4.25M12 12v8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** Protein: a heaped scoop of powder. */
export function ProteinMark(p: MarkProps) {
  return (
    <Svg {...p}>
      <path d="M3.5 12.5h13a6.5 6.5 0 0 1-13 0z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M5.5 12.5c1.2-3.2 3-4.6 4.5-4.6s3.3 1.4 4.5 4.6" fill="currentColor" />
      <path d="M16.5 12.5l5-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </Svg>
  );
}

/** Something was given; nobody has confirmed what. */
export function UnconfirmedMark(p: MarkProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2.4 2.6" />
    </Svg>
  );
}

export function FoodMark({ episode, ...p }: MarkProps & { episode: Episode }) {
  const food = episode.issued.value?.food;
  if (food === "sugar") return <SugarMark {...p} />;
  if (food === "protein") return <ProteinMark {...p} />;
  return <UnconfirmedMark {...p} />;
}
