import { Children } from "react";
import type { Status } from "@/lib/schema";
import styles from "./Registration.module.css";

type Props = {
  /** reported and hypothesis print slightly out of focus. */
  state: Status | "hypothesis" | "plain";
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div";
};

/** Plain text of string and number children; null when anything else is inside. */
function textOf(children: React.ReactNode): string | null {
  let out = "";
  for (const c of Children.toArray(children)) {
    if (typeof c !== "string" && typeof c !== "number") return null;
    out += c;
  }
  return out;
}

/**
 * Focus as certainty: confirmed text is sharp; reported text carries a faint, slightly offset
 * second image, like a lens a touch off; an open question is softer still. The second image is
 * drawn by CSS from `data-soft`, so the words exist once for search, selection and screen readers.
 * The softness is information, so it stays under reduced motion. Display sizes only.
 */
export function Registration({ state, children, className, as: Tag = "span" }: Props) {
  const soft = state === "reported" || state === "hypothesis" ? textOf(children) : null;
  return (
    <Tag className={[styles.reg, className].filter(Boolean).join(" ")} data-state={state} data-soft={soft ?? undefined}>
      {children}
    </Tag>
  );
}
