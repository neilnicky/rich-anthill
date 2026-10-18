import type { Media } from "@/lib/schema";
import { Photo } from "./Photo";
import styles from "./Frame.module.css";

export const STAND_IN_SUPER = "Stand-in photograph · other ants, not this colony";

type Props = {
  media: Media;
  sizes: string;
  /** What the frame is for in this scene, after the stand-in super. */
  caption?: string;
  className?: string;
  priority?: boolean;
  /** Where the super sits on the frame. */
  superAt?: "bottom" | "top";
  children?: React.ReactNode;
};

/**
 * A photograph in a viewfinder: corner ticks and a broadcast-style super. Every stand-in
 * carries the super on the frame itself, so a crop or screenshot keeps the disclosure.
 */
export function Frame({ media, sizes, caption, className, priority, superAt = "bottom", children }: Props) {
  const standIn = media.role === "stand-in";
  return (
    <figure className={`${styles.frame} ${className ?? ""}`} data-super={superAt}>
      <Photo media={media} sizes={sizes} priority={priority} className={styles.photo} />
      <span className={styles.ticks} aria-hidden="true" />
      {children}
      <figcaption className={styles.caption}>
        {standIn ? <span className={styles.super}>{STAND_IN_SUPER}</span> : null}
        {caption ? <span className={styles.note}>{caption}</span> : null}
      </figcaption>
    </figure>
  );
}
