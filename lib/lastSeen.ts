const KEY = "rich-anthill:lastSeenDay";

/** Returns the last day this browser saw, or null when unknown or storage is unavailable. */
export function readLastSeen(): number | null {
  try {
    const v = window.localStorage.getItem(KEY);
    const n = v === null ? NaN : Number(v);
    return Number.isInteger(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
}

export function writeLastSeen(day: number): void {
  try {
    const prev = readLastSeen();
    if (prev === null || day > prev) window.localStorage.setItem(KEY, String(day));
  } catch {
    // Private mode or blocked storage: the new-day marker stays off.
  }
}
