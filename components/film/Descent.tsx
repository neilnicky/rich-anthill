import Link from "next/link";
import type { Episode } from "@/lib/schema";
import { media } from "@/content/media";
import { issuedLine } from "@/lib/copy";
import { formatDate } from "@/lib/episodes";
import { Photo } from "@/components/media/Photo";
import { STAND_IN_SUPER } from "@/components/media/Frame";
import { Registration } from "@/components/status/Registration";
import { StatusLabel } from "@/components/status/StatusLabel";
import { RegisterStrip } from "@/components/register/RegisterStrip";
import styles from "./Descent.module.css";

const STEPS = ["Wide", "Closer", "Close", "At the food"];

/**
 * Opening scene. The scroll is the camera: it starts high and soft over the ground and pushes
 * in on the food until the crumb is sharp. Four narration beats play like subtitles on the way
 * down. Without scroll timelines, or with reduced motion, the beats stack under the photograph.
 */
export function Descent({ episodes }: { episodes: Episode[] }) {
  const last = episodes[episodes.length - 1];
  const first = episodes[0];
  const sugar = episodes.find((e) => e.issued.value?.food === "sugar");
  const protein = episodes.find((e) => e.issued.value?.food === "protein");
  const reported = last.issued.status === "reported";
  return (
    <section className={styles.descent} aria-labelledby="today-title">
      <div className={styles.track}>
        <div className={styles.stage}>
          <figure className={styles.frame}>
            <div className={styles.camera}>
              <Photo media={media.crumb} sizes="200vw" priority soft className={styles.photo} softClassName={styles.soft} />
            </div>
            <span className={styles.shade} aria-hidden="true" />
            <span className={styles.ticks} aria-hidden="true" />
            <figcaption className={styles.super}>{STAND_IN_SUPER}</figcaption>
          </figure>

          <div className={styles.gauge} aria-hidden="true">
            <span className={styles.gaugeTitle}>Camera</span>
            <ol className={styles.gaugeScale}>
              {STEPS.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
            <span className={styles.gaugeMarker} />
          </div>

          <div className={styles.beats}>
            <div className={`${styles.beat} ${styles.b1}`}>
              <h1 id="today-title" className={styles.headline}>
                <span className={styles.line}>Day {last.day}.</span>
                <Registration state={last.issued.status} className={styles.line} as="span">
                  {issuedLine(last)}.
                </Registration>
                <span className={`${styles.line} ${styles.open}`}>Outcome unknown.</span>
              </h1>
              <p className={styles.lead}>
                Since {formatDate(first.date)}, the Instagram account @rich_anthill has
                left food at one wild anthill every day and filmed what the ants do.
              </p>
              {reported ? (
                <p className={styles.status}>
                  <StatusLabel status="reported">What was given: reported, not yet checked against the reels</StatusLabel>
                </p>
              ) : null}
              <div className={styles.actions}>
                <a className={styles.primary} href={last.reel.url} target="_blank" rel="noopener noreferrer">
                  Watch Day {last.day}
                  <span aria-hidden="true"> ↗</span>
                  <span className="visually-hidden"> on Instagram (opens in a new tab)</span>
                </a>
                <Link className={styles.secondary} href="/days">
                  Every day so far
                </Link>
              </div>
              <div className={styles.strip}>
                <RegisterStrip episodes={episodes} variant="hero" upcoming={3} />
              </div>
            </div>

            <p className={`${styles.beat} ${styles.b2} ${styles.narr}`}>
              Stand up, and it is a patch of bare ground. Get down to ant height, and the ground is moving.
            </p>

            <div className={`${styles.beat} ${styles.b3}`}>
              {sugar ? (
                <p className={styles.narr}>
                  On day {sugar.day}, the creator promised sugar, every day, from now on.
                  <StatusLabel status={sugar.issued.status} />
                </p>
              ) : null}
              {protein ? (
                <p className={styles.narr}>
                  On day {protein.day}, the food was whey protein.
                  <StatusLabel status={protein.issued.status} />
                </p>
              ) : null}
            </div>

            <p className={`${styles.beat} ${styles.b4} ${styles.narr}`}>
              Ants handle sugar and protein in different ways. What this colony will do with a daily supply of either,
              nobody has filmed long enough to know.
            </p>
          </div>

          <p className={styles.cue} aria-hidden="true">
            Scroll to move in on the food
          </p>
        </div>
      </div>
    </section>
  );
}
