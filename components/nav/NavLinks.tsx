"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

export const DESTINATIONS = [
  { href: "/", label: "Today", glyph: "today" },
  { href: "/days", label: "Days", glyph: "days" },
  { href: "/science", label: "Science", glyph: "science" },
  { href: "/experiment", label: "The experiment", glyph: "experiment" },
] as const;

function isCurrent(path: string, href: string) {
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

function Glyph({ name }: { name: (typeof DESTINATIONS)[number]["glyph"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      {name === "today" ? (
        <>
          <path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        </>
      ) : null}
      {name === "days" ? (
        <>
          <rect x="2.5" y="6.5" width="5.5" height="11" />
          <rect x="9.25" y="6.5" width="5.5" height="11" />
          <rect x="16" y="6.5" width="5.5" height="11" strokeDasharray="2 1.7" />
        </>
      ) : null}
      {name === "science" ? (
        <>
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="M15 15l6 6" />
        </>
      ) : null}
      {name === "experiment" ? (
        <>
          <path d="M2 17.5h20" />
          <circle cx="12" cy="13" r="3.25" fill="currentColor" stroke="none" />
        </>
      ) : null}
    </svg>
  );
}

export function TopLinks() {
  const path = usePathname();
  return (
    <ul className={styles.top}>
      {DESTINATIONS.map((d) => (
        <li key={d.href}>
          <Link href={d.href} aria-current={isCurrent(path, d.href) ? "page" : undefined} className={styles.topLink}>
            {d.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function BottomNav() {
  const path = usePathname();
  return (
    <nav aria-label="Main" className={styles.bottom}>
      <ul>
        {DESTINATIONS.map((d) => (
          <li key={d.href}>
            <Link href={d.href} aria-current={isCurrent(path, d.href) ? "page" : undefined} className={styles.bottomLink}>
              <Glyph name={d.glyph} />
              <span>{d.label === "The experiment" ? "Experiment" : d.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function LatestLink({ day }: { day: number }) {
  const path = usePathname();
  const here = path === `/days/${day}`;
  return (
    <Link
      href={`/days/${day}`}
      className={styles.latest}
      aria-current={here ? "page" : undefined}
      aria-label={here ? "Latest day" : `Day ${day}, the latest day`}
    >
      <span className={styles.latestLight} aria-hidden="true" />
      {here ? "Latest day" : `Day ${day}`}
    </Link>
  );
}
