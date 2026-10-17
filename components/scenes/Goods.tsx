import type { Episode } from "@/lib/schema";
import { dayCode } from "@/lib/episodes";
import styles from "./Goods.module.css";

/** The three printing plates of one issued good. Each plate is a layer the stage can move. */
export type Plates = { stock: React.ReactNode; ink: React.ReactNode; mark: React.ReactNode };

const PACKET =
  "M0 22 " +
  Array.from({ length: 10 }, (_, i) => `L${i * 20 + 10} 4 L${i * 20 + 20} 22`).join(" ") +
  " V260 H0 Z";

export function sugarPlates(ep: Episode): Plates {
  return {
    stock: (
      <svg viewBox="0 0 200 260" className={styles.svg} aria-hidden="true">
        <path d={PACKET} fill="var(--paper)" />
      </svg>
    ),
    ink: (
      <>
        <svg viewBox="0 0 200 260" className={styles.svg} aria-hidden="true">
          <path d={PACKET} fill="none" stroke="var(--ink-umber)" strokeWidth="2.5" />
          <path d="M0 40 H200" stroke="var(--ink-umber)" strokeWidth="1.5" />
          <path d="M14 222 H186" stroke="var(--ink-umber)" strokeWidth="1.5" />
        </svg>
        <span className={styles.labels} data-good="packet">
          <span className={styles.name}>Sugar</span>
          <span className={styles.sub}>Ration · daily</span>
          <span className={styles.no}>{dayCode(ep.day)}</span>
        </span>
      </>
    ),
    mark: (
      <svg viewBox="0 0 200 260" className={styles.svg} aria-hidden="true">
        <rect x="64" y="118" width="72" height="72" fill="currentColor" />
        <rect x="0" y="232" width="200" height="12" fill="currentColor" />
      </svg>
    ),
  };
}

export function proteinPlates(ep: Episode): Plates {
  const tin = "M18 260 V96 A82 82 0 0 1 182 96 V260 Z";
  return {
    stock: (
      <svg viewBox="0 0 200 260" className={styles.svg} aria-hidden="true">
        <path d={tin} fill="var(--paper)" />
      </svg>
    ),
    ink: (
      <>
        <svg viewBox="0 0 200 260" className={styles.svg} aria-hidden="true">
          <path d={tin} fill="none" stroke="var(--ink-umber)" strokeWidth="2.5" />
          <path d="M18 104 H182" stroke="var(--ink-umber)" strokeWidth="1.5" />
          <path d="M18 112 H182" stroke="var(--ink-umber)" strokeWidth="1.5" />
          <path d="M30 226 H170" stroke="var(--ink-umber)" strokeWidth="1.5" />
        </svg>
        <span className={styles.labels} data-good="tin">
          <span className={styles.name}>Whey</span>
          <span className={styles.sub}>Protein</span>
          <span className={styles.no}>{dayCode(ep.day)}</span>
        </span>
      </>
    ),
    mark: (
      <svg viewBox="0 0 200 260" className={styles.svg} aria-hidden="true">
        <path d="M72 188 V148 a28 28 0 0 1 56 0 V188 Z" fill="currentColor" />
        <rect x="18" y="236" width="164" height="12" fill="currentColor" />
      </svg>
    ),
  };
}
