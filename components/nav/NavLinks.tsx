"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

export const DESTINATIONS = [
  { href: "/", label: "Today", glyph: "today" },
  { href: "/days", label: "Register", glyph: "register" },
  { href: "/science", label: "Science", glyph: "science" },
  { href: "/experiment", label: "The experiment", glyph: "experiment" },
] as const;

function isCurrent(path: string, href: string) {
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

function Glyph({ name }: { name: (typeof DESTINATIONS)[number]["glyph"] }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      {name === "today" ? (
        <>
          <circle cx="12" cy="9" r="6" fill="currentColor" />
          <rect x="6" y="17" width="12" height="3" fill="currentColor" />
        </>
      ) : null}
      {name === "register" ? (
        <g fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="2.5" y="7" width="6.5" height="10" />
          <rect x="9" y="7" width="6.5" height="10" />
          <rect x="15.5" y="7" width="6" height="10" strokeDasharray="2 1.6" />
        </g>
      ) : null}
      {name === "science" ? (
        <>
          <circle cx="10" cy="10" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path d="M14.5 14.5 21 21" stroke="currentColor" strokeWidth="2.25" />
        </>
      ) : null}
      {name === "experiment" ? <path d="M6 21V11a6 6 0 0 1 12 0v10z" fill="currentColor" /> : null}
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
