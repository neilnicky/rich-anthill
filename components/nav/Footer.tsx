import Link from "next/link";
import { ServiceMark } from "@/components/marks/Marks";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.colophon}>
          <ServiceMark size={40} />
          <p className={styles.notice}>
            An independent concept for <a href="https://www.instagram.com/rich_anthill/">@rich_anthill</a>, the Ant Life
            Improvement Service. Not made, endorsed or reviewed by the creator.
          </p>
        </div>
        <dl className={styles.facts}>
          <div>
            <dt>Footage</dt>
            <dd>Belongs to the creator. This site links to the reels and embeds them only when you ask.</dd>
          </div>
          <div>
            <dt>Photographs</dt>
            <dd>Every photograph here is a stand-in of other ants, printed as a halftone and labelled. None shows this colony.</dd>
          </div>
          <div>
            <dt>Science</dt>
            <dd>
              Each claim names its study. <Link href="/science#sources">All sources</Link>
            </dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>Never published, to protect the colony.</dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
