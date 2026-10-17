"use client";

import { useEffect, useRef, useState } from "react";
import type { Episode } from "@/lib/schema";
import { dayCode, issuedLabel } from "@/lib/episodes";
import { FoodMark } from "@/components/marks/Marks";
import styles from "./ReelCell.module.css";

type State = "idle" | "loading" | "ready" | "failed";

const TIMEOUT_MS = 8000;

/**
 * Click-to-load facade for an Instagram reel. Nothing from instagram.com loads
 * until the visitor asks; a blocked or slow embed falls back to a plain link.
 */
export function ReelCell({ episode, size = "m" }: { episode: Episode; size?: "m" | "l" }) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<number | undefined>(undefined);
  const frame = useRef<HTMLIFrameElement>(null);
  const { reel, day } = episode;
  const embed = `https://www.instagram.com/reel/${reel.shortcode}/embed/`;

  // The iframe fires `load` even when the request is blocked, so only a message from the embed
  // itself counts as loaded. Instagram posts LOADING, MEASURE and MOUNTED to the parent.
  useEffect(() => {
    if (state !== "loading") return;
    timer.current = window.setTimeout(() => setState("failed"), TIMEOUT_MS);
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://www.instagram.com" || e.source !== frame.current?.contentWindow) return;
      window.clearTimeout(timer.current);
      setState("ready");
    }
    window.addEventListener("message", onMessage);
    return () => {
      window.clearTimeout(timer.current);
      window.removeEventListener("message", onMessage);
    };
  }, [state]);

  if (reel.status === "unavailable") {
    return (
      <div className={styles.cell} data-size={size} data-state="gone">
        <p className={styles.message}>Reel no longer available on Instagram.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.cell} data-size={size} data-state={state} data-status={episode.issued.status}>
        {state === "idle" || state === "failed" ? (
          <div className={styles.face}>
            <span className={styles.code}>{dayCode(day)}</span>
            <FoodMark episode={episode} size={size === "l" ? 112 : 72} className={styles.mark} />
            <span className={styles.food}>{issuedLabel(episode)}</span>
            <span className={styles.meta}>
              {[reel.audio, ...reel.hashtags].filter(Boolean).join(" · ") || "No caption"}
            </span>
            {state === "idle" ? (
              <button type="button" className={styles.play} onClick={() => setState("loading")}>
                <span className={styles.playIcon} aria-hidden="true" />
                Play Day {day} reel
                <span className={styles.note}>Loads Instagram</span>
              </button>
            ) : (
              <p className={styles.message} role="status">
                This reel would not load here.{" "}
                <a href={reel.url} target="_blank" rel="noopener noreferrer">
                  Watch it on Instagram
                </a>
                .
              </p>
            )}
          </div>
        ) : null}
        {state === "loading" || state === "ready" ? (
          <>
            {state === "loading" ? (
              <p className={styles.loading} role="status">
                Loading reel…
              </p>
            ) : null}
            <iframe
              ref={frame}
              className={styles.frame}
              src={embed}
              title={`Day ${day} reel by @rich_anthill on Instagram`}
              allow="encrypted-media; picture-in-picture"
              loading="lazy"
            />
          </>
        ) : null}
      </div>
      <a className={styles.out} href={reel.url} target="_blank" rel="noopener noreferrer">
        Open Day {day} on Instagram
        <span aria-hidden="true"> ↗</span>
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
