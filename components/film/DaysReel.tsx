import Link from "next/link";
import type { Episode } from "@/lib/schema";
import { dayCode, formatDate, issuedLabel } from "@/lib/episodes";
import { FoodMark } from "@/components/marks/Marks";
import { ReelCell } from "@/components/media/ReelCell";
import { StatusLabel } from "@/components/status/StatusLabel";
import styles from "./DaysReel.module.css";

/**
 * One hold per frame: the strip rests on each frame, then advances by exactly one frame width.
 * Generated because the number of frames grows with the series.
 */
function runKeyframes(frames: number): string {
  const step = "(var(--frame-w) + var(--s-5))";
  const span = 100 / frames;
  const stops: string[] = [];
  for (let k = 0; k < frames; k++) {
    const x = `translateX(calc(${step} * ${-k}))`;
    const a = k === 0 ? 0 : k * span + span * 0.3;
    const b = k === frames - 1 ? 100 : (k + 1) * span - span * 0.05;
    stops.push(`${a.toFixed(2)}%,${b.toFixed(2)}%{transform:${x}}`);
  }
  return `@keyframes days-run{${stops.join("")}}`;
}

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/**
 * The days as a strip of film. Scrolling down runs the strip sideways, one day per frame,
 * ending on the empty frame for the day that has not been filmed. Without scroll timelines
 * the strip scrolls sideways by touch or trackpad instead.
 */
export function DaysReel({ episodes }: { episodes: Episode[] }) {
  const last = episodes[episodes.length - 1];
  const next = last.day + 1;
  const count = WORDS[episodes.length] ?? String(episodes.length);
  const frames = episodes.length + 2;
  return (
    <section
      className={styles.days}
      aria-labelledby="days-title"
      style={{ "--frames": frames, "--run": "days-run" } as React.CSSProperties}
    >
      <style href="days-run" precedence="default">
        {runKeyframes(frames)}
      </style>
      <div className={styles.track}>
        <div className={styles.stage}>
          <div className={styles.rail}>
            <header className={styles.lead}>
              <dl className={styles.slate} aria-label="Series slate">
                <div>
                  <dt>Production</dt>
                  <dd>Ant Life Improvement Service</dd>
                </div>
                <div>
                  <dt>Account</dt>
                  <dd>@rich_anthill</dd>
                </div>
                <div>
                  <dt>Subject</dt>
                  <dd>One wild colony</dd>
                </div>
                <div>
                  <dt>Roll</dt>
                  <dd>
                    {dayCode(episodes[0].day)} to {dayCode(last.day)}
                  </dd>
                </div>
                <div>
                  <dt>Filmed</dt>
                  <dd>
                    {formatDate(episodes[0].date)} to {formatDate(last.date)}
                  </dd>
                </div>
                <div>
                  <dt>Next</dt>
                  <dd>{dayCode(next)}, not yet posted</dd>
                </div>
              </dl>
              <h2 id="days-title" className={styles.title}>
                {count} days so far
              </h2>
              <p className={styles.intro}>
                One reel a day. The dates come from the reels. What was given comes from people who watched them, and
                stays marked until someone checks.
              </p>
              <p className={styles.hint} aria-hidden="true">
                Keep scrolling: the strip runs forward a day at a time
              </p>
            </header>

            {episodes.map((ep) => (
              <article key={ep.day} className={styles.frame} aria-labelledby={`reel-${ep.day}`}>
                <div className={styles.reel}>
                  <ReelCell episode={ep} size="s" />
                </div>
                <div className={styles.text}>
                  <p className={styles.num} aria-hidden="true">
                    {String(ep.day).padStart(2, "0")}
                  </p>
                  <p className={styles.date}>
                    <span className="visually-hidden">Day {ep.day}, </span>
                    <time dateTime={ep.date}>{formatDate(ep.date)}</time>
                  </p>
                  <h3 id={`reel-${ep.day}`} className={styles.dayTitle}>
                    {ep.title}
                  </h3>
                  <div className={styles.given} data-status={ep.issued.status}>
                    <FoodMark episode={ep} size={20} className={styles.mark} />
                    <span>
                      <span className={styles.givenLabel}>Given</span> {issuedLabel(ep)}
                    </span>
                  </div>
                  <StatusLabel status={ep.issued.status} />
                  <p className={styles.summary}>{ep.summary}</p>
                  <Link className={styles.open} href={`/days/${ep.day}`}>
                    Open day {ep.day}
                    <span aria-hidden="true"> →</span>
                  </Link>
                </div>
              </article>
            ))}

            <article className={`${styles.frame} ${styles.blank}`} aria-labelledby="reel-next">
              <div className={styles.reel}>
                <div className={styles.empty} aria-hidden="true">
                  <span className={styles.rec} />
                </div>
              </div>
              <div className={styles.text}>
                <p className={styles.num} aria-hidden="true">
                  {String(next).padStart(2, "0")}
                </p>
                <p className={styles.date}>
                  <span className="visually-hidden">Day {next}, </span>not yet posted
                </p>
                <h3 id="reel-next" className={styles.dayTitle}>
                  The next frame is empty
                </h3>
                <p className={styles.summary}>
                  When day {next} goes up on Instagram, it joins this strip with whatever it shows, and nothing it does
                  not.
                </p>
                <a className={styles.open} href="https://www.instagram.com/rich_anthill/" target="_blank" rel="noopener noreferrer">
                  Follow @rich_anthill
                  <span aria-hidden="true"> ↗</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </div>
            </article>
          </div>
          <div className={styles.time} aria-hidden="true">
            <span className={styles.timeFill} />
          </div>
        </div>
      </div>
    </section>
  );
}
