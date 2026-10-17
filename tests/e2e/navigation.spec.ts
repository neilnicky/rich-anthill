import { expect, test } from "@playwright/test";
import { gotoReady } from "./ready";

test("opening states the latest day and links the register", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Rich Anthill/);
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toContainText("Day 3");
  await expect(h1).toContainText("Protein issued");
  await expect(h1).toContainText("Outcome unknown");
  await expect(page.getByText("What was issued: reported, not yet checked against the reels")).toBeVisible();
});

test("register strip marks today and opens a day", async ({ page }) => {
  await gotoReady(page, "/");
  const strip = page.getByRole("navigation", { name: "Days in the register", exact: true });
  await expect(strip.locator('[aria-current="date"]')).toHaveAttribute("href", "/days/3");
  await strip.getByRole("link", { name: /Day 1:/ }).click();
  await expect(page).toHaveURL(/\/days\/1$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("The Service opens an account");
});

test("return-to-latest reaches the newest day", async ({ page }) => {
  await gotoReady(page, "/science");
  await page.getByRole("link", { name: /Day 3, the latest day/ }).click();
  await expect(page).toHaveURL(/\/days\/3$/);
});

test("arrow keys move between days", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard paging is a desktop affordance");
  await gotoReady(page, "/days/2");
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/\/days\/3$/);
  await page.keyboard.press("ArrowLeft");
  await expect(page).toHaveURL(/\/days\/2$/);
});

test("Day 2 shows its gap instead of a guess", async ({ page }) => {
  await page.goto("/days/2");
  await expect(page.getByText("Contents unconfirmed").first()).toBeVisible();
  await expect(page.getByText(/Not yet recorded/)).toBeVisible();
});

test("an unissued day returns 404 with the empty ticket", async ({ page }) => {
  const res = await page.goto("/days/99");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Not yet issued" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Go to Day 3" })).toBeVisible();
});

test("the right navigation shows for the viewport", async ({ page, isMobile }) => {
  await page.goto("/");
  const bottom = page.locator("nav[aria-label='Main']").last();
  if (isMobile) await expect(bottom).toBeVisible();
  else await expect(bottom).toBeHidden();
});

for (const path of ["/", "/days", "/days/3", "/science", "/experiment"]) {
  test(`no horizontal overflow on ${path}`, async ({ page }) => {
    await page.goto(path);
    const vw = page.viewportSize()!.width;
    const widths = await page.evaluate(() => [innerWidth, document.documentElement.scrollWidth]);
    expect(Math.max(...widths)).toBeLessThanOrEqual(vw);
  });
}

test("compact header strip keeps descriptive link names", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "the compact strip shows from 1200px");
  await page.goto("/science");
  const compact = page.getByRole("navigation", { name: "Days, compact" });
  await expect(compact.getByRole("link", { name: /Day 1: Sugar/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Day 3, the latest day" })).toBeVisible();
});
