import Link from "next/link";
import { latest } from "@/lib/episodes";
import styles from "../../not-found.module.css";

export default function DayNotFound() {
  const last = latest();
  return (
    <section className={`wrap ${styles.page}`} aria-labelledby="nf-title">
      <div className={styles.box}>
        <h1 id="nf-title" className={styles.title}>
          Not yet filmed
        </h1>
      </div>
      <p className={styles.text}>
        No reel exists for that day yet. The latest is Day {last.day}.
      </p>
      <p className={styles.links}>
        <Link href={`/days/${last.day}`}>Go to Day {last.day}</Link>
        <Link href="/days">See every day</Link>
      </p>
    </section>
  );
}
