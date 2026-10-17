import { openQuestions } from "@/content/questions";
import { Registration } from "@/components/status/Registration";
import { Cite } from "@/components/citation/Cite";
import styles from "./OpenQuestions.module.css";

export function OpenQuestions() {
  return (
    <section className={styles.scene} aria-labelledby="questions-title">
      <div className="wrap">
        <div className={styles.head}>
          <h2 id="questions-title" className={styles.title}>
            Open questions
          </h2>
          <p className={styles.intro}>
            Viewers raised these in the comments under the reels. Each one prints out of register, because nobody can
            answer it yet.
          </p>
        </div>
        <ol className={styles.list}>
          {openQuestions.map((q) => (
            <li key={q.id} className={styles.item}>
              <h3 className={styles.q}>
                <Registration state="hypothesis">{q.question}</Registration>
              </h3>
              <dl className={styles.readings}>
                {q.readings.map((r) => (
                  <div key={r.label} className={styles.reading}>
                    <dt>{r.label}</dt>
                    <dd>
                      {r.text}
                      {r.sources?.map((s) => <Cite key={s} id={s} />)}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className={styles.needs}>
                <span className={styles.needsLabel}>To answer it, the series needs</span>
                {q.needs}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
