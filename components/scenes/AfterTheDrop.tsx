import { media } from "@/content/media";
import { HalftonePlate } from "@/components/media/HalftonePlate";
import { Cite } from "@/components/citation/Cite";
import { StatusLabel } from "@/components/status/StatusLabel";
import { CropDiagram, DietDiagram, TrailDiagram } from "@/components/diagrams/Diagrams";
import styles from "./AfterTheDrop.module.css";

export function AfterTheDrop() {
  return (
    <section className={styles.scene} aria-labelledby="drop-title">
      <div className={styles.opening}>
        <HalftonePlate
          media={media.crumb}
          ratio="21 / 9"
          bleed
          className={styles.plate}
          caption="A food drop on bare ground, other ants, another place."
        />
        <div className={`wrap ${styles.titleWrap}`}>
          <h2 id="drop-title" className={styles.title}>
            After the drop
          </h2>
          <p className={styles.intro}>
            The camera sees the surface: ants arriving, gathering, leaving. Published studies of other colonies describe
            what happens next. None of them studied this one.
          </p>
        </div>
      </div>

      <div className="wrap">
        <article className={styles.panel} aria-labelledby="p-scout">
          <div className={styles.text}>
            <h3 id="p-scout" className={styles.h3}>
              A scout finds it
            </h3>
            <p>
              A black garden ant scout that finds more food than its crop can hold heads home laying a scent trail. In lab
              tests, 90% of scouts at large sugar drops did so.
              <Cite id="S3" /> Richer sugar draws more trail-laying, and that alone can steer a colony to the better of two
              sources.
              <Cite id="S1" />
            </p>
            <p>
              The trail also sets how hard a colony works each food source it knows about, alongside the memories of
              individual ants.
              <Cite id="S2" />
            </p>
            <StatusLabel status="science" />
          </div>
          <figure className={styles.figure}>
            <TrailDiagram />
            <figcaption className={styles.cap}>Diagram, not to scale.</figcaption>
          </figure>
        </article>

        <article className={styles.panel} aria-labelledby="p-crop">
          <div className={styles.text}>
            <h3 id="p-crop" className={styles.h3}>
              Food travels mouth to mouth
            </h3>
            <p>
              Foragers carry liquid food in the crop and pass it mouth to mouth. In carpenter ants, that fluid also carries
              proteins and a growth hormone that changes how larvae develop.
              <Cite id="S4" />
            </p>
            <p>
              In another carpenter ant species, the receivers&apos; fullness set how fast food flowed in, and the
              foragers&apos; fullness set how often they went out.
              <Cite id="S5" /> The reels show the foragers. The sharing happens out of sight.
            </p>
            <StatusLabel status="science" />
          </div>
          <figure className={styles.figure}>
            <CropDiagram />
            <figcaption className={styles.cap}>Diagram, not to scale.</figcaption>
          </figure>
        </article>

        <article className={styles.panel} aria-labelledby="p-diet">
          <div className={styles.text}>
            <h3 id="p-diet" className={styles.h3}>
              Workers burn sugar, larvae take protein
            </h3>
            <p>
              A few workers collect food for the whole colony. Adult workers run on carbohydrate; larvae consume the
              protein. In lab colonies, foragers kept the carbohydrate and threw out protein they could not use.
              <Cite id="S7" />
            </p>
            <p>
              Argentine ant colonies denied sugar, but not prey, slowed down and fought less.
              <Cite id="S9" />
            </p>
            <StatusLabel status="science" />
          </div>
          <figure className={styles.figure}>
            <DietDiagram />
            <figcaption className={styles.cap}>Diagram, not to scale.</figcaption>
          </figure>
        </article>

        <article className={`${styles.panel} ${styles.warning}`} aria-labelledby="p-protein">
          <div className={styles.text}>
            <h3 id="p-protein" className={styles.h3}>
              Too much protein
            </h3>
            <p>
              In queenless lab colonies of the black garden ant, workers on a high-protein, low-carbohydrate diet died far
              younger. One day on that diet was enough to do harm.
              <Cite id="S8" />
            </p>
            <p>
              Larvae change the picture: in another study, the cost of processing excess protein shrank when larvae were
              present.
              <Cite id="S7" />
            </p>
          </div>
          <div className={styles.compare}>
            <div className={styles.ticket}>
              <p className={styles.tHead}>Lab colony · no queen, no larvae</p>
              <p className={styles.tBody}>High protein: workers died younger.</p>
              <p className={styles.tRef}>S8</p>
            </div>
            <div className={styles.ticket}>
              <p className={styles.tHead}>Lab colony · larvae present</p>
              <p className={styles.tBody}>The harm from excess protein was far smaller.</p>
              <p className={styles.tRef}>S7</p>
            </div>
            <div className={`${styles.ticket} ${styles.open}`}>
              <p className={styles.tHead}>This colony · wild</p>
              <p className={styles.tBody}>Larvae, other food, how much whey it takes: not yet known.</p>
              <StatusLabel status="unknown" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
