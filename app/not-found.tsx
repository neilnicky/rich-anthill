import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`wrap ${styles.page}`} aria-labelledby="nf-title">
      <div className={styles.box}>
        <p className={styles.code}>Page not on record</p>
        <h1 id="nf-title" className={styles.title}>
          Nothing here
        </h1>
      </div>
      <p className={styles.text}>The register has no page at this address.</p>
      <p className={styles.links}>
        <Link href="/">Today&apos;s issue</Link>
        <Link href="/days">See every day</Link>
      </p>
    </section>
  );
}
