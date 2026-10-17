import Link from "next/link";
import { episodes, latest } from "@/lib/episodes";
import { ServiceMark } from "@/components/marks/Marks";
import { RegisterStrip } from "@/components/register/RegisterStrip";
import { BottomNav, LatestLink, TopLinks } from "./NavLinks";
import styles from "./Nav.module.css";

export function Header() {
  const last = latest();
  return (
    <>
      <header className={styles.header}>
        <div className={`wrap ${styles.bar}`}>
          <Link href="/" className={styles.brand}>
            <ServiceMark size={28} />
            <span className={styles.brandText}>
              <span className={styles.brandName}>Rich Anthill</span>
              <span className={styles.brandSub}>Ant Life Improvement Service · register</span>
            </span>
          </Link>
          <nav aria-label="Main" className={styles.topNav}>
            <TopLinks />
          </nav>
          <div className={styles.tools}>
            <div className={styles.compact}>
              <RegisterStrip episodes={episodes} variant="compact" upcoming={2} label="Days, compact" />
            </div>
            <LatestLink day={last.day} />
          </div>
        </div>
      </header>
      <BottomNav />
    </>
  );
}
