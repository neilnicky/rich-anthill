import Link from "next/link";
import type { Episode } from "@/lib/schema";
import { media } from "@/content/media";
import { Frame } from "@/components/media/Frame";
import { RegisterStrip } from "@/components/register/RegisterStrip";
import { SeenRecorder } from "@/components/register/SeenRecorder";
import styles from "./NextDay.module.css";

/** The close: back on the surface in daylight, recording, the next frame still empty. */
export function NextDay({ episodes }: { episodes: Episode[] }) {
  const last = episodes[episodes.length - 1];
  const next = last.day + 1;
  return (
    <section className={styles.next} aria-labelledby="next-title">
      <div className={styles.finder}>
        <Frame media={media.moss} sizes="100vw" className={styles.light} superAt="top" />
        <span className={styles.empty} aria-hidden="true" />
        <p className={styles.rec}>
          <span className={styles.dot} aria-hidden="true" />
          Waiting for day {next}
        </p>
        <div className={styles.body}>
          <h2 id="next-title" className={styles.title}>
            Day {next}.
            <span className={styles.sub}>Not yet filmed.</span>
          </h2>
          <p className={styles.lead}>
            The account posts one reel a day. When day {next} goes up, it gets a frame here, with what it shows and
            nothing it does not.
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="https://www.instagram.com/rich_anthill/" target="_blank" rel="noopener noreferrer">
              Follow @rich_anthill<span aria-hidden="true"> ↗</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <Link className={styles.secondary} href="/days">
              Every day so far
            </Link>
          </div>
        </div>
        <div className={styles.strip}>
          <RegisterStrip episodes={episodes} variant="row" upcoming={5} label="Days in the register, closing row" />
        </div>
      </div>
      <SeenRecorder day={last.day} />
    </section>
  );
}
