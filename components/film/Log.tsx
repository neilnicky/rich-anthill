import type { Episode } from "@/lib/schema";
import { RegisterTable } from "@/components/register/RegisterTable";
import { StatusLabel } from "@/components/status/StatusLabel";
import styles from "./Log.module.css";

/**
 * Back on the surface with the evidence: the log, printed on an ash sheet laid over the soil.
 * The blank cells are the point. They show how much has not been checked yet.
 */
export function Log({ episodes }: { episodes: Episode[] }) {
  const confirmedGiven = episodes.filter((e) => e.issued.status === "confirmed").length;
  return (
    <section className={styles.log} aria-labelledby="log-title">
      <div className={`sheet ${styles.sheet}`}>
        <div className={styles.head}>
          <h2 id="log-title" className={styles.title}>
            The log so far
          </h2>
          <p className={styles.intro}>
            One row per day. Every blank is a question nobody has answered from the footage yet. The log fills in as
            the reels are checked.
          </p>
        </div>

        <RegisterTable episodes={episodes} caption="The log: one row per day" />

        <div className={styles.foot}>
          <dl className={styles.legend} aria-label="How sure each statement is">
            <div>
              <dt>
                <StatusLabel status="confirmed" />
              </dt>
              <dd>Checked against the reel or its Instagram page. So far: dates, hashtags, audio.</dd>
            </div>
            <div>
              <dt>
                <StatusLabel status="reported" />
              </dt>
              <dd>
                Someone who watched the reel says so.{" "}
                {confirmedGiven === 0 ? "Everything given so far sits here." : null}
              </dd>
            </div>
            <div>
              <dt>
                <StatusLabel status="unknown" />
              </dt>
              <dd>Nobody has checked, or nobody can tell from the footage.</dd>
            </div>
            <div>
              <dt>
                <StatusLabel status="science" />
              </dt>
              <dd>A named study of other colonies. Background, never evidence about this one.</dd>
            </div>
          </dl>

          <aside className={styles.limits} aria-labelledby="limits-title">
            <h3 id="limits-title" className={styles.limitsTitle}>
              What the log cannot show
            </h3>
            <p>
              One colony, one feeding spot, one phone camera, no counts. The log can show what changed in front of the
              lens. It cannot show why, and it cannot speak for ants in general.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
