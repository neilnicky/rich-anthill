import Link from "next/link";
import type { Episode } from "@/lib/schema";
import { cellLabel } from "@/lib/episodes";
import { FoodMark } from "@/components/marks/Marks";
import { NewBadge } from "./NewBadge";
import styles from "./RegisterStrip.module.css";

const pad = (day: number) => String(day).padStart(2, "0");

type Props = {
  episodes: Episode[];
  variant: "hero" | "compact" | "row";
  upcoming?: number;
  /** Day currently shown on the page, if any (gets aria-current="page"). */
  current?: number;
  label?: string;
};

/**
 * The days as a run of film frames, oldest first. The latest day carries the red tally light;
 * days not yet filmed are empty frames.
 */
export function RegisterStrip({ episodes, variant, upcoming = 7, current, label = "Days in the register" }: Props) {
  const latest = episodes[episodes.length - 1];
  const next = latest.day + 1;
  return (
    <nav aria-label={label} className={styles.strip} data-variant={variant}>
      <ol className={styles.track}>
        {episodes.map((ep) => {
          const isLatest = ep.day === latest.day;
          return (
            <li key={ep.day} className={styles.item}>
              <Link
                href={`/days/${ep.day}`}
                className={styles.cell}
                data-latest={isLatest || undefined}
                data-status={ep.issued.status}
                aria-current={current === ep.day ? "page" : isLatest ? "date" : undefined}
              >
                <span className={styles.code} aria-hidden="true">
                  <span className={styles.codeWord}>Day </span>
                  {pad(ep.day)}
                </span>
                <FoodMark episode={ep} size={variant === "compact" ? 13 : 22} className={styles.mark} />
                <span className={styles.food}>
                  <span className="visually-hidden">Day {ep.day}: </span>
                  {cellLabel(ep)}
                  {ep.issued.status === "reported" ? <span className="visually-hidden"> (reported)</span> : null}
                </span>
                <NewBadge day={ep.day} className={styles.new} />
              </Link>
            </li>
          );
        })}
        {Array.from({ length: upcoming }, (_, i) => (
          <li key={`u${i}`} className={styles.item} aria-hidden={i > 0 || undefined}>
            <span className={styles.cell} data-empty>
              <span className={styles.code} aria-hidden="true">
                <span className={styles.codeWord}>Day </span>
                {pad(next + i)}
              </span>
              <span className={styles.food}>
                {i === 0 ? (
                  <>
                    <span className="visually-hidden">Day {next}: </span>Not yet filmed
                  </>
                ) : null}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
