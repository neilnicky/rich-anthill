import type { Episode } from "@/lib/schema";
import { formatDate } from "@/lib/episodes";
import { media } from "@/content/media";
import { StatusLabel } from "@/components/status/StatusLabel";
import { HalftonePlate } from "@/components/media/HalftonePlate";
import { SugarMark } from "@/components/marks/Marks";
import styles from "./Customer.module.css";

export function Customer({ episodes }: { episodes: Episode[] }) {
  const first = episodes[0];
  const rows: { term: string; value: React.ReactNode; status: "confirmed" | "reported" | "unknown" | "policy" }[] = [
    { term: "Customer", value: "One wild ant colony, outdoors", status: "reported" },
    { term: "Species", value: "Not yet identified", status: "unknown" },
    { term: "Members", value: "Not counted", status: "unknown" },
    { term: "Larvae", value: "Unknown. This matters for protein.", status: "unknown" },
    { term: "Address", value: "Withheld to protect the colony", status: "policy" },
    {
      term: "Customer since",
      value: (
        <>
          <SugarMark size={14} className={styles.inlineMark} /> {formatDate(first.date)}
        </>
      ),
      status: "confirmed",
    },
    { term: "Reels on record", value: `${episodes.length}`, status: "confirmed" },
  ];
  return (
    <section className={styles.customer} aria-labelledby="customer-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <h2 id="customer-title" className={styles.title}>
            The customer
          </h2>
          <p className={styles.body}>
            The customer is one wild ant colony. Nobody has identified the species or counted the ants, and the Service
            keeps the address private. Everything this register says about the colony itself comes from the reels.
          </p>
        </div>
        <div className={styles.cardArea}>
          <HalftonePlate media={media.core} ratio="4 / 3" className={styles.plate} captionTop />
          <div className={styles.card}>
            <p className={styles.cardHead}>
              <span>Customer record</span>
              <span className={styles.cardNo}>Account № 001</span>
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
      </div>
    </section>
  );
}
