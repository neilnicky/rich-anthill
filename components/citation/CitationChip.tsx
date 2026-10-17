"use client";

import { useId, useRef, useState } from "react";
import type { Source } from "@/lib/schema";
import styles from "./CitationChip.module.css";

const SETTING = { lab: "Laboratory study", field: "Field study", review: "Review" } as const;

/** [S8] chip that opens the full reference in place. */
export function CitationChip({ source }: { source: Source }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  return (
    <>
      <button
        ref={button}
        type="button"
        className={styles.chip}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">{source.id}</span>
        <span className="visually-hidden">
          {open ? "Hide" : "Show"} source {source.id}: {source.authors}, {source.year}
        </span>
      </button>
      <span
        id={id}
        role="region"
        aria-label={`Source ${source.id}`}
        className={styles.panel}
        hidden={!open}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            button.current?.focus();
          }
        }}
      >
        <span className={styles.meta}>
          {source.id} · {SETTING[source.setting]}
          {source.species ? (
            <>
              {" · "}
              <i>{source.species}</i>
            </>
          ) : null}
        </span>
        <span className={styles.finding}>{source.finding}</span>
        {source.limits ? <span className={styles.limits}>Limits: {source.limits}</span> : null}
        <span className={styles.ref}>
          {source.authors} ({source.year}). {source.title}. <i>{source.journal}</i>
          {source.volume ? ` ${source.volume}` : ""}
          {source.pages ? `: ${source.pages}` : ""}.{" "}
          {source.doi ? (
            <a href={`https://doi.org/${source.doi}`} target="_blank" rel="noopener noreferrer">
              doi:{source.doi}
            </a>
          ) : null}
        </span>
      </span>
    </>
  );
}
