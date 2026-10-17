import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { byDay, dayCode, episodes, formatDate, issuedLabel, neighbours, sourceById } from "@/lib/episodes";
import { issuedLine } from "@/lib/copy";
import { FoodMark } from "@/components/marks/Marks";
import { Registration } from "@/components/status/Registration";
import { StatusLabel } from "@/components/status/StatusLabel";
import { ReelCell } from "@/components/media/ReelCell";
import { Cite } from "@/components/citation/Cite";
import { RegisterStrip } from "@/components/register/RegisterStrip";
import { SeenRecorder } from "@/components/register/SeenRecorder";
import { DayKeys } from "./DayKeys";
import styles from "./day.module.css";

export function generateStaticParams() {
  return episodes.map((e) => ({ day: String(e.day) }));
}

function parse(day: string) {
  return /^\d+$/.test(day) ? byDay(Number(day)) : undefined;
}

export async function generateMetadata({ params }: PageProps<"/days/[day]">): Promise<Metadata> {
  const ep = parse((await params).day);
  if (!ep) return { title: "Day not issued" };
  return {
    title: `Day ${ep.day} · ${issuedLine(ep)}`,
    description: `${formatDate(ep.date)}. ${ep.summary}`,
  };
}

export default async function DayPage({ params }: PageProps<"/days/[day]">) {
  const ep = parse((await params).day);
  if (!ep) notFound();
  const { prev, next } = neighbours(ep.day);
  const last = episodes[episodes.length - 1];
  const science = ep.science.map((id) => sourceById(id)!).filter(Boolean);

  return (
    <article className={styles.page} aria-labelledby="day-title">
      <header className={`wrap ${styles.head}`}>
        <p className={styles.code}>
          {dayCode(ep.day)}
          <span className={styles.date}>
            <StatusLabel status="confirmed">Posted {formatDate(ep.date)}</StatusLabel>
          </span>
        </p>
        <h1 id="day-title" className={styles.title}>
          <span className="visually-hidden">Day {ep.day}: </span>
          {ep.title}
        </h1>
        <p className={styles.summary}>{ep.summary}</p>
      </header>

      <div className={`wrap ${styles.grid}`}>
        <div className={styles.reel}>
          <ReelCell episode={ep} size="l" />
        </div>

        <div className={styles.record}>
          <section className={styles.block} aria-labelledby="issued-h">
            <h2 id="issued-h" className={styles.h2}>
              Issued
            </h2>
            <p className={styles.issued} data-status={ep.issued.status}>
              <FoodMark episode={ep} size={40} className={styles.mark} />
              <Registration state={ep.issued.status}>{issuedLabel(ep)}</Registration>
            </p>
            <StatusLabel status={ep.issued.status} />
            {ep.issued.value?.quantity ? <p>Quantity: {ep.issued.value.quantity}</p> : null}
            {ep.issued.note ? <p className={styles.note}>{ep.issued.note}</p> : null}
          </section>

          <section className={styles.block} aria-labelledby="observed-h">
            <h2 id="observed-h" className={styles.h2}>
              Observed in the reel
            </h2>
            {ep.observations.length ? (
              <ul className={styles.obs}>
                {ep.observations.map((o, i) => (
                  <li key={i}>
                    <span>{o.value ?? "Not yet known"}</span> <StatusLabel status={o.status} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>
                Not yet recorded. Nobody has logged what this reel shows yet. The register leaves the space empty rather than
                guess.
              </p>
            )}
          </section>

          <section className={styles.block} aria-labelledby="measured-h">
            <h2 id="measured-h" className={styles.h2}>
              Measured
            </h2>
            {ep.measurements.length ? (
              <table className={styles.measures}>
                <thead>
                  <tr>
                    <th scope="col">Measure</th>
                    <th scope="col">Value</th>
                    <th scope="col">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {ep.measurements.map((m) => (
                    <tr key={m.label}>
                      <th scope="row">{m.label}</th>
                      <td>
                        {m.value} {m.unit}
                      </td>
                      <td>{m.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.empty}>Nothing measured on this day.</p>
            )}
          </section>

          {science.length ? (
            <section className={styles.block} aria-labelledby="context-h">
              <h2 id="context-h" className={styles.h2}>
                Background from other colonies
              </h2>
              <ul className={styles.context}>
                {science.map((s) => (
                  <li key={s.id}>
                    {s.finding}
                    <Cite id={s.id} />
                  </li>
                ))}
              </ul>
              <StatusLabel status="science" />
            </section>
          ) : null}

          {ep.related.length ? (
            <section className={styles.block} aria-labelledby="related-h">
              <h2 id="related-h" className={styles.h2}>
                Related days
              </h2>
              <ul className={styles.related}>
                {ep.related.map((r) => {
                  const other = byDay(r.day)!;
                  return (
                    <li key={r.day}>
                      <Link href={`/days/${r.day}`} className={styles.relLink}>
                        <span className={styles.relCode}>{dayCode(r.day)}</span>
                        <FoodMark episode={other} size={18} />
                        <span>{r.reason}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
        </div>
      </div>

      <nav className={`wrap ${styles.pager}`} aria-label="Previous and next day">
        {prev ? (
          <Link href={`/days/${prev.day}`} className={styles.ticket} rel="prev">
            <span className={styles.dir}>← Previous</span>
            <span className={styles.tCode}>{dayCode(prev.day)}</span>
            <span className={styles.tTitle}>{prev.title}</span>
          </Link>
        ) : (
          <span className={`${styles.ticket} ${styles.blank}`}>
            <span className={styles.dir}>Start of the register</span>
            <span className={styles.tTitle}>Day 1 is the first entry.</span>
          </span>
        )}
        {next ? (
          <Link href={`/days/${next.day}`} className={`${styles.ticket} ${styles.right}`} rel="next">
            <span className={styles.dir}>Next →</span>
            <span className={styles.tCode}>{dayCode(next.day)}</span>
            <span className={styles.tTitle}>{next.title}</span>
          </Link>
        ) : (
          <span className={`${styles.ticket} ${styles.right} ${styles.blank}`}>
            <span className={styles.dir}>Next</span>
            <span className={styles.tCode}>{dayCode(ep.day + 1)}</span>
            <span className={styles.tTitle}>Not yet issued</span>
          </span>
        )}
        <p className={styles.hint}>
          <kbd>←</kbd> <kbd>→</kbd> move between days
        </p>
      </nav>

      <div className={`wrap ${styles.strip}`}>
        <RegisterStrip episodes={episodes} variant="row" upcoming={4} current={ep.day} label="All days" />
      </div>
      <DayKeys prev={prev?.day} next={next?.day} />
      {ep.day === last.day ? <SeenRecorder day={ep.day} /> : null}
    </article>
  );
}
