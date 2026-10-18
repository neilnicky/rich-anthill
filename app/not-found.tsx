import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`wrap ${styles.page}`} aria-labelledby="nf-title">
      <div className={styles.box}>
        <h1 id="nf-title" className={styles.title}>
          Nothing here
        </h1>
      </div>
      <p className={styles.text}>There is no page at this address.</p>
      <p className={styles.links}>
        <Link href="/">Back to the start</Link>
        <Link href="/days">See every day</Link>
      </p>
    </section>
  );
}
