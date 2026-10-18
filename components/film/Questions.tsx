import { openQuestions } from "@/content/questions";
import { Cite } from "@/components/citation/Cite";
import { Registration } from "@/components/status/Registration";
import styles from "./Questions.module.css";

/**
 * Open questions: a quiet passage after the dense one. Each question stays a touch out of
 * focus, because nobody can answer it yet; each says what the camera would have to record.
 */
export function Questions() {
  return (
    <section className={styles.questions} aria-labelledby="questions-title">
      <div className="wrap">
        <div className={styles.head}>
          <h2 id="questions-title" className={styles.title}>
            Still out of focus
          </h2>
          <p className={styles.intro}>
            The reels raise these. Nobody can answer them yet, so they stay soft here until the footage brings them
            into focus.
          </p>
        </div>
        <ol className={styles.list}>
          {openQuestions.map((q) => (
            <li key={q.id} className={styles.item}>
              <h3 className={styles.q}>
                <Registration state="hypothesis">{q.question}</Registration>
              </h3>
              <ul className={styles.readings}>
                {q.readings.map((r) => (
                  <li key={r.label} className={styles.reading}>
                    <strong className={styles.readingLead}>{r.label}.</strong> {r.text}
                    {r.sources?.map((s) => <Cite key={s} id={s} />)}
                  </li>
                ))}
              </ul>
              <p className={styles.needs}>
                To answer it, film {q.needs.charAt(0).toLowerCase() + q.needs.slice(1)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
