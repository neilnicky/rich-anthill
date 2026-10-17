import type { CSSProperties } from "react";
import type { Media } from "@/lib/schema";
import styles from "./HalftonePlate.module.css";

type Props = {
  media: Media;
  /** CSS aspect-ratio for the frame, e.g. "4 / 5". Defaults to the source ratio. */
  ratio?: string;
  caption?: React.ReactNode;
  className?: string;
  bleed?: boolean;
  /** Put the caption above the frame, for layouts that overlap the plate's lower edge. */
  captionTop?: boolean;
};

const STAND_IN = "Stand-in photograph. Not this colony. Source unconfirmed.";

/**
 * A one-ink halftone plate. The dot screen is a 1-bit mask filled with the umber token,
 * so it prints correctly on both board and night grounds.
 * Stand-ins always carry the stand-in caption, whatever else the caller adds.
 */
export function HalftonePlate({ media, ratio, caption, className, bleed, captionTop }: Props) {
  const style = {
    "--plate-s": `url(${media.plate}-900.png)`,
    "--plate-l": `url(${media.plate}-1800.png)`,
    "--fx": `${media.focal.x * 100}%`,
    "--fy": `${media.focal.y * 100}%`,
    aspectRatio: ratio ?? `${media.width} / ${media.height}`,
  } as CSSProperties;
  return (
    <figure
      className={[styles.figure, className].filter(Boolean).join(" ")}
      data-bleed={bleed || undefined}
      data-caption-top={captionTop || undefined}
    >
      <div className={styles.frame} style={style}>
        <div className={styles.dots} role="img" aria-label={media.alt} />
      </div>
      <figcaption className={styles.caption}>
        {media.role === "stand-in" ? <span className={styles.provenance}>{STAND_IN}</span> : null}
        {caption ? <span>{caption}</span> : null}
      </figcaption>
    </figure>
  );
}
