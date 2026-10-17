"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** ← / → move between days, unless the visitor is typing or inside an open panel. */
export function DayKeys({ prev, next }: { prev?: number; next?: number }) {
  const router = useRouter();
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || e.defaultPrevented) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input, textarea, select, [contenteditable], [role=region], iframe")) return;
      if (e.key === "ArrowLeft" && prev) router.push(`/days/${prev}`);
      if (e.key === "ArrowRight" && next) router.push(`/days/${next}`);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, router]);
  return null;
}
