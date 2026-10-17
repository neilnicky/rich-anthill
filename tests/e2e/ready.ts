import type { Page } from "@playwright/test";

/**
 * Navigate, then wait for hydration. `goto` resolves on load, which can land before React
 * attaches handlers (Suspense islands hydrate after `main`), and an early click does nothing.
 */
export async function gotoReady(page: Page, path: string) {
  const res = await page.goto(path);
  await page.waitForFunction(() => {
    const live = (el: Element) => Object.keys(el).some((k) => k.startsWith("__reactProps"));
    const main = document.getElementById("content");
    return !!main && live(main) && [...document.querySelectorAll("button, header a")].every(live);
  });
  return res;
}
