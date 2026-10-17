import Link from "next/link";
import type { Episode } from "@/lib/schema";
import { dayCode } from "@/lib/episodes";
import { RegisterStrip } from "@/components/register/RegisterStrip";
import { SeenRecorder } from "@/components/register/SeenRecorder";
import styles from "./NextIssue.module.css";

export function NextIssue({ episodes }: { episodes: Episode[] }) {
  const last = episodes[episodes.length - 1];
  const next = last.day + 1;
  return (
    <section className={styles.scene} aria-labelledby="next-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.box}>
          <p className={styles.code}>{dayCode(next)}</p>
          <h2 id="next-title" className={styles.title}>
            Not yet issued
          </h2>
        </div>
        <div className={styles.copy}>
          <p className={styles.lead}>
            Day {next} has not been issued. The Service posts one reel a day on Instagram, and this register adds a row when
            it does.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="https://www.instagram.com/rich_anthill/" target="_blank" rel="noopener noreferrer">
              Follow @rich_anthill<span aria-hidden="true"> ↗</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <Link className={styles.secondary} href="/days">
              See every day
            </Link>
          </div>
        </div>
        <div className={styles.row}>
          <RegisterStrip episodes={episodes} variant="row" upcoming={7} label="Days in the register, closing row" />
        </div>
      </div>
      <SeenRecorder day={last.day} />
    </section>
  );
}
