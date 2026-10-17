import type { Episode } from "@/lib/schema";
import { RegisterTable } from "@/components/register/RegisterTable";
import { StatusLabel } from "@/components/status/StatusLabel";
import styles from "./Evidence.module.css";

export function Evidence({ episodes }: { episodes: Episode[] }) {
  const confirmedIssues = episodes.filter((e) => e.issued.status === "confirmed").length;
  return (
    <section className={styles.scene} aria-labelledby="evidence-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.head}>
          <h2 id="evidence-title" className={styles.title}>
            The register so far
          </h2>
          <p className={styles.intro}>
            One row per day. Dates come from the reels themselves. What was issued comes from people who watched them, and
            stays marked until someone checks.
          </p>
        </div>
        <RegisterTable episodes={episodes} caption="The register: one row per day" />
        <dl className={styles.legend}>
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
              Someone who watched the reel says so. {confirmedIssues === 0 ? "Every issue so far sits here." : null}
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
            What the register cannot show
          </h3>
          <p>
            One colony, one feeding spot, one phone camera, no counts. The register can show what changed in front of the
            lens. It cannot show why, and it cannot speak for ants in general.
          </p>
        </aside>
      </div>
    </section>
  );
}
