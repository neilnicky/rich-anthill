import type { Episode } from "@/lib/schema";
import { formatDate } from "@/lib/episodes";
import { issueSentence, issuedLine } from "@/lib/copy";
import { Registration } from "@/components/status/Registration";
import { StatusLabel } from "@/components/status/StatusLabel";
import { RegisterStrip } from "@/components/register/RegisterStrip";
import Link from "next/link";
import styles from "./Opening.module.css";

export function Opening({ episodes }: { episodes: Episode[] }) {
  const last = episodes[episodes.length - 1];
  const reported = episodes.some((e) => e.issued.status === "reported");
  return (
    <section className={styles.opening} aria-labelledby="today-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.notice}>
          <h1 id="today-title" className={styles.headline}>
            <span className={styles.l1}>Day {last.day}</span>
            <Registration state={last.issued.status} className={styles.l2}>
              {issuedLine(last)}
            </Registration>
            <span className={styles.l3}>Outcome unknown</span>
          </h1>
          <div className={styles.rule} aria-hidden="true" />
          <p className={styles.lead}>
            Every day, the Ant Life Improvement Service leaves food at one wild anthill and films the result.{" "}
            {issueSentence(episodes)} You are reading its register.
          </p>
          {reported ? (
            <p className={styles.status}>
              <StatusLabel status="reported">What was issued: reported, not yet checked against the reels</StatusLabel>
            </p>
          ) : null}
          <div className={styles.actions}>
            <a className={styles.primary} href={last.reel.url} target="_blank" rel="noopener noreferrer">
              Watch Day {last.day} on Instagram
              <span aria-hidden="true"> ↗</span>
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <Link className={styles.secondary} href="/days">
              Open the register
            </Link>
          </div>
        </div>
        <div className={styles.column}>
          <RegisterStrip episodes={episodes} variant="hero" upcoming={4} />
        </div>
        <p className={styles.slug}>
          <StatusLabel status="confirmed">
            Day {last.day} posted {formatDate(last.date)}
            {last.reel.audio ? ` · ${last.reel.audio}` : ""}
            {last.reel.hashtags.length ? ` · ${last.reel.hashtags.join(" ")}` : ""}
          </StatusLabel>
        </p>
      </div>
    </section>
  );
}
