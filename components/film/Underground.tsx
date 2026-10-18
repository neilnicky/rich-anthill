import type { Media } from "@/lib/schema";
import { media } from "@/content/media";
import { Frame } from "@/components/media/Frame";
import { Cite } from "@/components/citation/Cite";
import { StatusLabel } from "@/components/status/StatusLabel";
import styles from "./Underground.module.css";

/** `side`: where the sheet sits. The pin's leader runs away from it, so the ring is never under the sheet. */
type Beat = { id: string; media: Media; pin: string; side: "left" | "right"; caption?: string; title: string; body: React.ReactNode };

/** Each finding with the stand-in it holds on. The pin names what the photograph shows, never what this colony did. */
const BEATS: Beat[] = [
  {
    id: "scout",
    media: media.scout,
    pin: "Antennae raised",
    side: "left",
    title: "A scout finds it",
    body: (
      <p>
        A black garden ant scout that finds more food than it can carry heads home laying a scent trail. In lab tests, 90%
        of scouts at large sugar drops did.
        <Cite id="S3" /> Richer sugar draws more trail, and that alone can steer a colony to the better of two sources.
        <Cite id="S1" />
      </p>
    ),
  },
  {
    id: "trail",
    media: media.orange,
    pin: "Many workers, one food",
    side: "right",
    title: "The trail decides the effort",
    body: (
      <p>
        Trail pheromone does more than mark a route. With the memories of individual ants, it sets how hard a colony works
        each food source it knows about.
        <Cite id="S2" />
      </p>
    ),
  },
  {
    id: "crop",
    media: media.handling,
    pin: "Workers handling food",
    side: "left",
    caption: "Sharing by mouth happens inside the nest, out of shot",
    title: "Food travels mouth to mouth",
    body: (
      <>
        <p>
          Foragers carry liquid food in the crop and pass it mouth to mouth. In carpenter ants, that fluid also carries
          proteins and a growth hormone that changes how larvae develop.
          <Cite id="S4" />
        </p>
        <p>
          In another carpenter ant, how full the receivers were set how fast food flowed in, and how full the foragers were
          set how often they went out.
          <Cite id="S5" /> The reels show the foragers. The sharing happens out of sight.
        </p>
      </>
    ),
  },
  {
    id: "diet",
    media: media.pulp,
    pin: "Workers along the fruit",
    side: "right",
    title: "Workers burn sugar. Larvae take protein.",
    body: (
      <>
        <p>
          A few workers collect food for the whole colony. Adult workers run on carbohydrate; larvae consume the protein.
          In lab colonies, foragers kept the carbohydrate and threw out protein they could not use.
          <Cite id="S7" />
        </p>
        <p>
          Argentine ant colonies denied sugar, but not prey, slowed down and fought less.
          <Cite id="S9" />
        </p>
      </>
    ),
  },
];

/**
 * What happens after the food is found. The light drops as the camera loses the ants into
 * the ground; each published finding holds on a stand-in frame while its sheet slides over it.
 * Every claim here is about other colonies, and says which study it comes from.
 */
export function Underground() {
  return (
    <section className={styles.under} aria-labelledby="under-title">
      <div className={styles.entry}>
        <div className={styles.entryPhoto}>
          <Frame media={media.twig} sizes="100vw" className={styles.entryFrame} superAt="top" />
        </div>
        <div className={`wrap ${styles.entryText}`}>
          <h2 id="under-title" className={styles.title}>
            Out of sight
          </h2>
          <p className={styles.lead}>
            The camera sees the surface: ants arriving, gathering, leaving. Most of what happens next happens in the
            nest, where a phone cannot follow. Studies of other colonies describe it. None of them studied this one.
          </p>
          <StatusLabel status="science">From here down: published studies of other colonies</StatusLabel>
        </div>
      </div>

      {BEATS.map((b) => (
        <article key={b.id} className={styles.beat} data-side={b.side} aria-labelledby={`u-${b.id}`}>
          <div className={styles.held}>
            <Frame media={b.media} sizes="100vw" className={styles.plate} caption={b.caption}>
              <span
                className={styles.pin}
                style={{ left: `${b.media.focal.x * 100}%`, top: `${b.media.focal.y * 100}%` }}
                aria-hidden="true"
              >
                <span className={styles.pinLabel}>{b.pin}</span>
              </span>
            </Frame>
          </div>
          <div className={styles.over}>
            <div className={`sheet ${styles.sheet}`}>
              <h3 id={`u-${b.id}`} className={styles.h3}>
                {b.title}
              </h3>
              {b.body}
              <StatusLabel status="science" />
            </div>
          </div>
        </article>
      ))}

      <div className={`wrap ${styles.protein}`}>
        <h3 className={styles.proteinTitle}>Too much protein</h3>
        <p className={styles.proteinLead}>
          In queenless lab colonies of the black garden ant, workers on a high-protein, low-carbohydrate diet died far
          younger. One day on that diet was enough to do harm.
          <Cite id="S8" />
        </p>
        <ul className={styles.compare}>
          <li className={styles.case}>
            <p className={styles.caseText}>In a lab colony with no queen and no larvae, workers on high protein died younger.</p>
            <StatusLabel status="science">Study S8</StatusLabel>
          </li>
          <li className={styles.case}>
            <p className={styles.caseText}>With larvae present, the harm from excess protein was far smaller.</p>
            <StatusLabel status="science">Study S7</StatusLabel>
          </li>
          <li className={`${styles.case} ${styles.unknownCase}`}>
            <p className={styles.caseText}>This wild colony: larvae, other food, how much whey it takes.</p>
            <StatusLabel status="unknown" />
          </li>
        </ul>
      </div>
    </section>
  );
}
