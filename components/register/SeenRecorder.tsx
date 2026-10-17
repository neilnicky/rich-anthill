"use client";

import { useEffect } from "react";
import { writeLastSeen } from "@/lib/lastSeen";

/** Marks a day as seen after the visitor has stayed four seconds. */
export function SeenRecorder({ day }: { day: number }) {
  useEffect(() => {
    const t = window.setTimeout(() => writeLastSeen(day), 4000);
    return () => window.clearTimeout(t);
  }, [day]);
  return null;
}
