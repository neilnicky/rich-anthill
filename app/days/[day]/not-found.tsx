import Link from "next/link";
import { latest } from "@/lib/episodes";
import styles from "../../not-found.module.css";

export default function DayNotFound() {
  const last = latest();
  return (
    <section className={`wrap ${styles.page}`} aria-labelledby="nf-title">
      <div className={styles.box}>
        <p className={styles.code}>Day not on record</p>
        <h1 id="nf-title" className={styles.title}>
          Not yet issued
        </h1>
      </div>
      <p className={styles.text}>
        The register has no entry for that day. The latest entry is Day {last.day}.
      </p>
      <p className={styles.links}>
        <Link href={`/days/${last.day}`}>Go to Day {last.day}</Link>
        <Link href="/days">See every day</Link>
      </p>
    </section>
  );
}
