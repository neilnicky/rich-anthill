import type { Metadata } from "next";
import Link from "next/link";
import { episodes, formatDate } from "@/lib/episodes";
import { media } from "@/content/media";
import { footageNeeded } from "@/content/footage";
import { StatusLabel } from "@/components/status/StatusLabel";
import { Cite } from "@/components/citation/Cite";
import { HalftonePlate } from "@/components/media/HalftonePlate";
import styles from "./experiment.module.css";

export const metadata: Metadata = {
  title: "The experiment",
  description:
    "Who runs the Rich Anthill series, what goes into the anthill each day, how it is filmed, why the location stays private, and what the experiment cannot show.",
};

const USED_IN: Record<string, string> = {
  core: "Homepage, the customer record",
  crumb: "Homepage, after the drop",
  specimen: "Science, what the experiment measures",
  bark: "Not shown",
  scout: "The experiment, closing plate",
};

export default function ExperimentPage() {
  const first = episodes[0];
  return (
    <>
      <header className={`wrap ${styles.head}`}>
        <h1 className={styles.title}>The experiment</h1>
        <p className={styles.intro}>
          One person, one anthill, one delivery a day, one reel a day. The plan as far as anyone outside can tell, and what
          it cannot tell us.
        </p>
      </header>

      <div className={`wrap ${styles.doc}`}>
        <section className={styles.sec} aria-labelledby="who">
          <h2 id="who" className={styles.h2}>
            Who
          </h2>
          <div className={styles.text}>
            <p>
              The creator posts as <a href="https://www.instagram.com/rich_anthill/">@rich_anthill</a>, under the name Ant
              Life Improvement Service. The first reel went up on {formatDate(first.date)}. The account describes itself as
              &ldquo;an everyday series about ants&rdquo;.
            </p>
            <StatusLabel status="confirmed" />
            <p>
              This website is an independent concept built around that series. The creator did not make, commission or
              review it.
            </p>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="what">
          <h2 id="what" className={styles.h2}>
            What goes in
          </h2>
          <div className={styles.text}>
            <p>
              On Day 1 the creator promises the colony sugar every day. On Day 3 he brings whey protein. Nobody has yet
              checked the reels for exact words, amounts or what Day 2 contained.
            </p>
            <StatusLabel status="reported" />
            <p>
              Quantity, form (dry or dissolved), time of day and whether leftovers are removed are all{" "}
              <strong>not yet known</strong>.
            </p>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="how">
          <h2 id="how" className={styles.h2}>
            How it is recorded
          </h2>
          <div className={styles.text}>
            <p>
              One short vertical video a day, posted to Instagram with a day number. There are no counts, weights or fixed
              camera positions on record. The register logs each reel and leaves observation fields empty until someone
              watches and writes them up.
            </p>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="where">
          <h2 id="where" className={styles.h2}>
            Where
          </h2>
          <div className={styles.text}>
            <p>
              Outdoors, at one wild colony. This site will never publish the place, the region or anything that could lead
              someone to the nest.
            </p>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="welfare">
          <h2 id="welfare" className={styles.h2}>
            Looking after the customer
          </h2>
          <div className={styles.text}>
            <p>
              Lab studies found that a high-protein, low-carbohydrate diet shortened worker lives in black garden ants
              <Cite id="S8" />, and that larvae reduce that cost
              <Cite id="S7" />. A wild colony has other food and may cope differently. Still, the register suggests:
            </p>
            <ul className={styles.list}>
              <li>Keep each day&apos;s amount small and the same.</li>
              <li>Clear leftovers so the drop does not draw pests or spoil.</li>
              <li>Watch for fewer ants, dead workers near the drop, or mould, and stop if they appear.</li>
              <li>Avoid salt, sweeteners and anything a person would not eat.</li>
            </ul>
            <p className={styles.small}>These are suggestions from this site, not a description of what the creator does.</p>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="limits">
          <h2 id="limits" className={styles.h2}>
            What it cannot show
          </h2>
          <div className={styles.text}>
            <p>
              One colony cannot speak for ants. One camera sees the surface, not the nest. A change on one day might come
              from the food, the weather, a rival colony or chance. Without counts, nobody can say the colony grew or
              shrank.
            </p>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="footage">
          <h2 id="footage" className={styles.h2}>
            Footage still needed
          </h2>
          <div className={styles.text}>
            <p>No creator footage appears on this site yet. Each of these shots would replace a stand-in or fill a gap.</p>
            <ol className={styles.shots}>
              {footageNeeded.map((f, i) => (
                <li key={i} className={styles.shot}>
                  <span className={styles.shotNo}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.shotText}>{f.shot}</span>
                  <span className={styles.shotWhy}>
                    {f.why}
                    {f.replaces ? ` Replaces the stand-in “${f.replaces}”.` : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.sec} aria-labelledby="standins">
          <h2 id="standins" className={styles.h2}>
            Stand-ins on this site
          </h2>
          <div className={styles.text}>
            <p>
              Every photograph here shows other ants in other places. Each prints as a one-ink halftone with a label. None has
              a confirmed source or licence yet.
            </p>
            <table className={styles.inventory}>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Shows</th>
                  <th scope="col">Used in</th>
                  <th scope="col">Licence</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(media).map((m) => (
                  <tr key={m.id}>
                    <th scope="row">{m.id}</th>
                    <td>{m.alt}</td>
                    <td>{USED_IN[m.id] ?? "Not shown"}</td>
                    <td>{m.licence ?? "Unconfirmed"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.small}>
              To replace one: drop the new file in <code>assets/</code>, point its entry in <code>content/media.ts</code> at
              it, set its role, credit and licence, and run <code>pnpm plates</code>.
            </p>
          </div>
        </section>
      </div>

      <div className={`wrap ${styles.plateRow}`}>
        <HalftonePlate media={media.scout} ratio="16 / 7" caption="One ant on moss, somewhere else entirely." />
        <p className={styles.back}>
          <Link href="/days">See every day in the register</Link>
        </p>
      </div>
    </>
  );
}
