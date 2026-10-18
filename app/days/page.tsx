import type { Metadata } from "next";
import Link from "next/link";
import { episodes, dayCode, formatDate, issuedLabel } from "@/lib/episodes";
import { FoodMark } from "@/components/marks/Marks";
import { StatusLabel } from "@/components/status/StatusLabel";
import { RegisterStrip } from "@/components/register/RegisterStrip";
import { SeenRecorder } from "@/components/register/SeenRecorder";
import styles from "./days.module.css";

export const metadata: Metadata = {
  title: "Every day",
  description: "Every day of the Rich Anthill experiment in order: what was given, what the reel shows, and how sure anyone is.",
};

export default function DaysPage() {
  const last = episodes[episodes.length - 1];
  const newestFirst = [...episodes].reverse();
  return (
    <>
      <header className={`wrap ${styles.head}`}>
        <h1 className={styles.title}>Every day</h1>
        <p className={styles.intro}>
          One entry per reel since {formatDate(episodes[0].date)}, newest at the top. Each entry keeps what went in apart
          from what the camera saw.
        </p>
        <RegisterStrip episodes={episodes} variant="row" upcoming={5} />
      </header>

      <div className={`wrap ${styles.ledger}`}>
        <div className={styles.future}>
          <span className={styles.futureDot} aria-hidden="true" />
          <span className={styles.futureCode}>{dayCode(last.day + 1)}</span>
          <span className={styles.futureText}>Not yet filmed. One reel a day on Instagram; a new entry follows each one.</span>
        </div>
        <ol className={styles.list} reversed>
          {newestFirst.map((ep) => (
            <li key={ep.day} className={styles.entry} data-status={ep.issued.status}>
              <div className={styles.rail}>
                <span className={styles.num} aria-hidden="true">
                  {String(ep.day).padStart(2, "0")}
                </span>
                <span className="visually-hidden">Day {ep.day}, </span>
                <time dateTime={ep.date} className={styles.date}>
                  {formatDate(ep.date)}
                </time>
              </div>
              <div className={styles.body}>
                <h2 className={styles.entryTitle}>
                  <Link href={`/days/${ep.day}`}>{ep.title}</Link>
                </h2>
                <p className={styles.summary}>{ep.summary}</p>
                <dl className={styles.facts}>
                  <div>
                    <dt>Given</dt>
                    <dd>
                      <span className={styles.issued}>
                        <FoodMark episode={ep} size={18} className={styles.mark} />
                        {issuedLabel(ep)}
                      </span>
                      <StatusLabel status={ep.issued.status} />
                    </dd>
                  </div>
                  <div>
                    <dt>Seen in the reel</dt>
                    <dd>
                      {ep.observations.length ? (
                        `${ep.observations.length} recorded`
                      ) : (
                        <span className={styles.empty}>Not yet recorded</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Measured</dt>
                    <dd>
                      {ep.measurements.length ? `${ep.measurements.length} values` : <span className={styles.empty}>Nothing measured</span>}
                    </dd>
                  </div>
                </dl>
                <p className={styles.links}>
                  <Link href={`/days/${ep.day}`} className={styles.open}>
                    Open Day {ep.day}
                  </Link>
                  <a href={ep.reel.url} target="_blank" rel="noopener noreferrer">
                    Reel on Instagram<span aria-hidden="true"> ↗</span>
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <SeenRecorder day={last.day} />
    </>
  );
}
