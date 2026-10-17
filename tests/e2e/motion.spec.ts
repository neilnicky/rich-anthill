import { expect, test } from "@playwright/test";
import { gotoReady } from "./ready";

test("the issue stage pins only when motion is allowed", async ({ page }, info) => {
  await gotoReady(page, "/");
  const stage = page.locator("section[aria-labelledby='issue-title']");
  await stage.scrollIntoViewIfNeeded();
  const hasSticky = await stage.evaluate((s) =>
    [...s.querySelectorAll("*")].some((el) => getComputedStyle(el).position === "sticky"),
  );
  if (info.project.name === "reduced-motion") {
    expect(hasSticky).toBe(false);
    // Final state is still shown: both goods and all three lines
    await expect(stage.getByRole("img", { name: /Sugar ration packet/ })).toBeVisible();
    await expect(stage.getByText("The Service brings whey protein instead.")).toBeVisible();
  } else {
    expect(hasSticky).toBe(true);
  }
});

test("scrolling the stage brings plates towards register", async ({ page }, info) => {
  test.skip(info.project.name === "reduced-motion", "no scroll choreography under reduced motion");
  await gotoReady(page, "/");
  const stage = page.locator("section[aria-labelledby='issue-title']");
  const top = await stage.evaluate((s) => s.getBoundingClientRect().top + scrollY);
  const inkOffset = async () =>
    page.evaluate(() => {
      const ink = document.querySelector("[aria-label^='Sugar ration packet'] > div:last-child") as HTMLElement;
      const m = new DOMMatrixReadOnly(getComputedStyle(ink).transform);
      return Math.hypot(m.m41, m.m42);
    });
  await page.evaluate((y) => scrollTo(0, y), top + 5);
  await page.waitForTimeout(300);
  const before = await inkOffset();
  const height = await stage.evaluate((s) => (s as HTMLElement).offsetHeight - innerHeight);
  await page.evaluate((y) => scrollTo(0, y), top + height * 0.35);
  await page.waitForTimeout(400);
  const after = await inkOffset();
  expect(before).toBeGreaterThan(15);
  expect(after).toBeLessThan(4);
  expect(after).toBeGreaterThan(1); // reported facts stop a step short of register
});
