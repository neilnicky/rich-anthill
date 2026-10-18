"use client";

import { usePathname } from "next/navigation";

/** Renders its children everywhere except on the given path. */
export function NotOn({ path, children }: { path: string; children: React.ReactNode }) {
  return usePathname() === path ? null : children;
}
