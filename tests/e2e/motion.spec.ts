import { expect, test, type Page } from "@playwright/test";
import { gotoReady } from "./ready";

const descent = "section[aria-labelledby='today-title']";
const days = "section[aria-labelledby='days-title']";

/** Scroll so that `fraction` of the section's pinned range has elapsed. */
async function scrollInto(page: Page, selector: string, fraction: number) {
  await page.evaluate(
    ([sel, f]) => {
      const s = document.querySelector(sel as string) as HTMLElement;
      const top = s.getBoundingClientRect().top + scrollY;
      scrollTo(0, top + (s.offsetHeight - innerHeight) * (f as number));
    },
    [selector, fraction],
  );
  await page.waitForTimeout(350);
}

const hasSticky = (page: Page, selector: string) =>
  page.locator(selector).evaluate((s) => [...s.querySelectorAll("*")].some((el) => getComputedStyle(el).position === "sticky"));

test("the descent pins only when motion is allowed", async ({ page }, info) => {
  await gotoReady(page, "/");
  const sticky = await hasSticky(page, descent);
  if (info.project.name === "reduced-motion") {
    expect(sticky).toBe(false);
    // Every narration beat is still there, in reading order
    const stage = page.locator(descent);
    await expect(stage.getByText(/Stand up, and it is a patch of bare ground/)).toBeVisible();
    await expect(stage.getByText(/the creator promised sugar/)).toBeVisible();
    await expect(stage.getByText(/nobody has filmed long enough to know/)).toBeVisible();
  } else {
    expect(sticky).toBe(true);
  }
});

test("scrolling the descent pushes the camera in and pulls focus onto the food", async ({ page }, info) => {
  test.skip(info.project.name === "reduced-motion", "no scroll choreography under reduced motion");
  await gotoReady(page, "/");
  const read = () =>
    page.evaluate((sel) => {
      const s = document.querySelector(sel)!;
      const camera = s.querySelector("figure > div") as HTMLElement;
      const soft = s.querySelector("img[aria-hidden='true']") as HTMLElement;
      return {
        scale: new DOMMatrixReadOnly(getComputedStyle(camera).transform).a,
        soft: Number(getComputedStyle(soft).opacity),
      };
    }, descent);

  await scrollInto(page, descent, 0.02);
  const start = await read();
  await scrollInto(page, descent, 0.7);
  const deep = await read();

  expect(start.scale).toBeLessThan(1.15);
  expect(start.soft).toBeGreaterThanOrEqual(0.5);
  expect(deep.scale).toBeGreaterThan(1.3);
  expect(deep.soft).toBeLessThan(0.1);
});

test("the days strip rests one frame further on at each hold", async ({ page }, info) => {
  await gotoReady(page, "/");
  if (info.project.name === "reduced-motion") {
    expect(await hasSticky(page, days)).toBe(false);
    const scrolls = await page
      .locator(days)
      .evaluate((s) => getComputedStyle(s.querySelector("article")!.parentElement!).overflowX);
    expect(scrolls).toBe("auto");
    return;
  }
  const frames = await page.locator(days).evaluate((s) => s.querySelectorAll(":scope article").length + 1);
  // The first hold after the title card sits a third of the way into its step
  await scrollInto(page, days, (1 + 0.65) / frames);
  const { x, step } = await page.locator(days).evaluate((s) => {
    const rail = s.querySelector("article")!.parentElement!;
    const [a, b] = [rail.children[0], rail.children[1]].map((c) => c.getBoundingClientRect().left);
    return { x: new DOMMatrixReadOnly(getComputedStyle(rail).transform).e, step: b - a };
  });
  expect(Math.abs(x + step)).toBeLessThan(2);
});

test("no scene widens the page, with or without motion", async ({ page }) => {
  for (const path of ["/", "/days", "/science", "/experiment"]) {
    await page.goto(path);
    const [inner, scroll] = await page.evaluate(() => [innerWidth, document.documentElement.scrollWidth]);
    expect(scroll, path).toBeLessThanOrEqual(inner);
  }
});
