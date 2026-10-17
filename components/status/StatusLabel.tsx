import type { Status } from "@/lib/schema";
import { STATUS_TEXT } from "@/lib/episodes";
import styles from "./StatusLabel.module.css";

type Props = { status: Status | "science" | "hypothesis"; children?: React.ReactNode };

const TEXT = { ...STATUS_TEXT, science: "Published study", hypothesis: "Open question" } as const;

/** The words that carry a fact's status. Colour repeats it; it never carries it alone. */
export function StatusLabel({ status, children }: Props) {
  return (
    <span className={styles.label} data-status={status}>
      <span className={styles.swatch} aria-hidden="true" />
      {children ?? TEXT[status]}
    </span>
  );
}
