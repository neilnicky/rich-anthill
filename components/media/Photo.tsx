import type { Media } from "@/lib/schema";
import styles from "./Photo.module.css";

type Props = {
  media: Media;
  /** The `sizes` attribute: how wide the photo renders at each breakpoint. */
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Adds the pre-blurred layer on top, for focus pulls. Opacity is set by the scene. */
  soft?: boolean;
  softClassName?: string;
  /** Decorative when the scene already describes the photo in text. */
  decorative?: boolean;
};

/** A responsive photograph that fills its box, cropped around its focal point. */
export function Photo({ media, sizes, priority, className, soft, softClassName, decorative }: Props) {
  const position = `${media.focal.x * 100}% ${media.focal.y * 100}%`;
  const set = (ext: string) => media.widths.map((w) => `${media.photo}-${w}.${ext} ${w}w`).join(", ");
  const fallback = `${media.photo}-${media.widths[Math.min(1, media.widths.length - 1)]}.webp`;
  return (
    <span className={`${styles.photo} ${className ?? ""}`} style={{ "--pos": position } as React.CSSProperties}>
      <picture>
        <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
        <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
        <img
          src={fallback}
          alt={decorative ? "" : media.alt}
          width={media.width}
          height={media.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding={priority ? "sync" : "async"}
          className={styles.img}
        />
      </picture>
      {soft ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`${media.photo}-soft.webp`} alt="" aria-hidden="true" className={`${styles.img} ${styles.soft} ${softClassName ?? ""}`} />
      ) : null}
    </span>
  );
}
