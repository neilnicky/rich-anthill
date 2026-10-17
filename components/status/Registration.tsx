import type { Status } from "@/lib/schema";
import styles from "./Registration.module.css";

type Props = {
  /** reported and hypothesis print a chitin ghost plate out of register. */
  state: Status | "hypothesis" | "plain";
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div";
};

/**
 * Prints its children twice: an offset ghost plate (aria-hidden) and the ink plate.
 * The offset is information (how sure we are), so it stays under reduced motion.
 * Use at display sizes (≥ 24px) only; small text relies on the status label.
 */
export function Registration({ state, children, className, as: Tag = "span" }: Props) {
  const ghost = state === "reported" || state === "hypothesis";
  return (
    <Tag className={[styles.reg, className].filter(Boolean).join(" ")} data-state={state}>
      {ghost ? (
        <span className={styles.ghost} aria-hidden="true">
          {children}
        </span>
      ) : null}
      <span className={styles.ink}>{children}</span>
    </Tag>
  );
}
