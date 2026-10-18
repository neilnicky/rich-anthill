import type { Episode, Status } from "@/lib/schema";
import { media } from "@/content/media";
import { formatDate } from "@/lib/episodes";
import { Frame } from "@/components/media/Frame";
import { StatusLabel } from "@/components/status/StatusLabel";
import styles from "./Colony.module.css";

type Row = { term: string; value: string; status: Status | "policy" };

/**
 * The colony: a still frame held in place while its record slides up over it,
 * the way a specimen label sits beside the specimen. Most rows are blanks, on purpose.
 */
export function Colony({ episodes }: { episodes: Episode[] }) {
  const first = episodes[0];
  const rows: Row[] = [
    { term: "Subject", value: "One wild ant colony, outdoors", status: "reported" },
    { term: "Species", value: "Not yet identified", status: "unknown" },
    { term: "Workers", value: "Not counted", status: "unknown" },
    { term: "Larvae", value: "Not seen. This matters for protein.", status: "unknown" },
    { term: "Location", value: "Withheld to protect the colony", status: "policy" },
    { term: "First reel", value: formatDate(first.date), status: "confirmed" },
    { term: "Reels so far", value: String(episodes.length), status: "confirmed" },
  ];
  return (
    <section className={styles.colony} aria-labelledby="colony-title">
      <div className={styles.held}>
        <Frame media={media.mound} sizes="100vw" className={styles.frame} superAt="top" />
      </div>
      <div className={styles.over}>
        <div className={`sheet ${styles.label}`}>
          <h2 id="colony-title" className={styles.title}>
            The colony
          </h2>
          <p className={styles.intro}>
            Nobody has identified the species or counted the ants, and the location stays private. Everything known
            about this colony comes from the reels.
          </p>
          <dl className={styles.rows}>
            {rows.map((r) => (
              <div key={r.term} className={styles.row} data-status={r.status}>
                <dt>{r.term}</dt>
                <dd>
                  <span className={styles.value}>{r.value}</span>
                  {r.status !== "policy" ? <StatusLabel status={r.status} /> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
