import type { Metadata } from "next";
import Link from "next/link";
import { publishableSources } from "@/content/sources";
import { media } from "@/content/media";
import { HalftonePlate } from "@/components/media/HalftonePlate";
import { StatusLabel } from "@/components/status/StatusLabel";
import { Registration } from "@/components/status/Registration";
import styles from "./science.module.css";

export const metadata: Metadata = {
  title: "Science",
  description:
    "What published studies say about how ant colonies find, share and use sugar and protein, what the Rich Anthill reels can and cannot show, and every source.",
};

const TOPICS: { title: string; lede: string; ids: string[] }[] = [
  {
    title: "Finding food",
    lede: "How a colony goes from one scout at a food drop to a stream of workers.",
    ids: ["S3", "S1", "S2"],
  },
  {
    title: "Sharing food",
    lede: "What happens to food after it leaves the drop, out of the camera's sight.",
    ids: ["S4", "S5"],
  },
  {
    title: "Sugar and protein",
    lede: "Why the switch from sugar on Day 1 to protein on Day 3 matters.",
    ids: ["S7", "S8", "S9"],
  },
];

const SETTING = { lab: "Laboratory study", field: "Field study", review: "Review of many studies" } as const;

export default function SciencePage() {
  const byId = new Map(publishableSources.map((s) => [s.id, s]));
  return (
    <>
      <header className={`wrap ${styles.head}`}>
        <h1 className={styles.title}>The science, and its limits</h1>
        <p className={styles.intro}>
          Researchers have studied how ant colonies handle food for decades, mostly in the lab, mostly with other species.
          Their findings explain what the reels might show. They cannot say what this colony will do.
        </p>
      </header>

      <section className={`wrap ${styles.kinds}`} aria-labelledby="kinds-title">
        <h2 id="kinds-title" className={styles.h2}>
          Four kinds of statement
        </h2>
        <dl className={styles.kindList}>
          <div className={styles.kind}>
            <dt>
              <Registration state="plain">Published study</Registration>
            </dt>
            <dd>
              <StatusLabel status="science" />
              Established knowledge from named studies of other colonies. Background, never evidence about this one.
            </dd>
          </div>
          <div className={styles.kind}>
            <dt>
              <Registration state="confirmed">Confirmed</Registration>
            </dt>
            <dd>
              <StatusLabel status="confirmed" />
              Checked against the reel or its Instagram page: dates, hashtags, audio so far.
            </dd>
          </div>
          <div className={styles.kind}>
            <dt>
              <Registration state="reported">Reported</Registration>
            </dt>
            <dd>
              <StatusLabel status="reported" />
              Someone who watched the reel says so. Printed off register until checked.
            </dd>
          </div>
          <div className={styles.kind}>
            <dt>
              <Registration state="hypothesis">Open question</Registration>
            </dt>
            <dd>
              <StatusLabel status="hypothesis" />
              A reading the evidence might support later. Nobody can answer it yet.
            </dd>
          </div>
        </dl>
      </section>

      {TOPICS.map((t) => (
        <section key={t.title} className={`wrap ${styles.topic}`} aria-labelledby={`t-${t.ids[0]}`}>
          <div className={styles.topicHead}>
            <h2 id={`t-${t.ids[0]}`} className={styles.h2}>
              {t.title}
            </h2>
            <p className={styles.lede}>{t.lede}</p>
          </div>
          <ol className={styles.findings}>
            {t.ids.map((id) => {
              const s = byId.get(id)!;
              return (
                <li key={id} className={styles.finding}>
                  <p className={styles.fMeta}>
                    <a href={`#${id}`}>{id}</a> · {SETTING[s.setting]}
                    {s.species ? (
                      <>
                        {" "}
                        · <i>{s.species}</i>
                      </>
                    ) : null}{" "}
                    · {s.year}
                  </p>
                  <p className={styles.fText}>{s.finding}</p>
                  {s.limits ? <p className={styles.fLimits}>Limits: {s.limits}</p> : null}
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      <section className={`wrap ${styles.measures}`} aria-labelledby="measures-title">
        <div>
          <h2 id="measures-title" className={styles.h2}>
            What the experiment measures
          </h2>
          <p className={styles.lede}>Today: nothing. The reels are short videos, not records.</p>
          <p>
            To turn the series into evidence, each day would need the same camera position, the same time of day, a scale in
            frame, a weighed amount of food and a note of what was left over. The{" "}
            <Link href="/experiment#footage">footage list</Link> sets this out.
          </p>
          <p>
            Until then the register keeps every observation separate from every interpretation, and the open questions stay
            open. <Link href="/#questions-title">Read the open questions</Link>.
          </p>
        </div>
        <HalftonePlate
          media={media.specimen}
          ratio="1 / 1"
          caption="A cleared specimen under a microscope: the kind of detail a phone camera at an anthill cannot reach."
        />
      </section>

      <section className={`wrap ${styles.sources}`} aria-labelledby="sources">
        <h2 id="sources" className={styles.h2}>
          Sources
        </h2>
        <p className={styles.lede}>
          Each finding above paraphrases the study&apos;s abstract, read on 17 October 2026. Details were checked against
          Crossref, PubMed or the publisher.
        </p>
        <ol className={styles.refs}>
          {publishableSources.map((s) => (
            <li key={s.id} id={s.id} className={styles.ref}>
              <span className={styles.refId}>{s.id}</span>
              <span>
                {s.authors} ({s.year}). {s.title}. <i>{s.journal}</i>
                {s.volume ? ` ${s.volume}` : ""}
                {s.pages ? `: ${s.pages}` : ""}.{" "}
                {s.doi ? (
                  <a href={`https://doi.org/${s.doi}`} target="_blank" rel="noopener noreferrer">
                    doi:{s.doi}
                  </a>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
