import type { Status } from "@/lib/schema";
import { STATUS_TEXT } from "@/lib/episodes";
import styles from "./StatusLabel.module.css";

type Props = { status: Status | "science" | "hypothesis"; children?: React.ReactNode };

const TEXT = { ...STATUS_TEXT, science: "Published study", hypothesis: "Open question" } as const;

/**
 * The words that carry a fact's status, led by a focus mark: sharp for confirmed, soft for
 * reported, an empty dashed ring for unknown. The mark repeats the words; it never replaces them.
 */
export function StatusLabel({ status, children }: Props) {
  return (
    <span className={styles.label} data-status={status}>
      <span className={styles.mark} aria-hidden="true" />
      {children ?? TEXT[status]}
    </span>
  );
}
