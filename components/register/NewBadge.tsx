"use client";

import { useSyncExternalStore } from "react";
import { readLastSeen } from "@/lib/lastSeen";

const subscribe = () => () => {};

/** Shows "New" on days published since this browser last looked. Silent without storage. */
export function NewBadge({ day, className }: { day: number; className?: string }) {
  const lastSeen = useSyncExternalStore(subscribe, readLastSeen, () => null);
  if (lastSeen === null || day <= lastSeen) return null;
  return <span className={className}>New</span>;
}
