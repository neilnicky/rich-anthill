import { expect, test } from "@playwright/test";
import { gotoReady } from "./ready";

test("no Instagram request until the visitor plays a reel", async ({ page }) => {
  const hits: string[] = [];
  page.on("request", (r) => r.url().includes("instagram.com") && hits.push(r.url()));
  await page.route("**/*instagram.com/**", (route) => route.fulfill({ status: 200, contentType: "text/html", body: "<p>stub</p>" }));
  await gotoReady(page, "/days/3");
  await page.waitForLoadState("networkidle");
  expect(hits).toEqual([]);
  await page.getByRole("button", { name: /Play Day 3 reel/ }).click();
  await expect(page.locator("iframe[title='Day 3 reel by @rich_anthill on Instagram']")).toBeAttached();
  await expect.poll(() => hits.length).toBeGreaterThan(0);
});

test("a blocked embed falls back to a plain link", async ({ page }) => {
  await page.route("**/*instagram.com/**", (route) => route.abort());
  await gotoReady(page, "/days/1");
  await page.getByRole("button", { name: /Play Day 1 reel/ }).click();
  await expect(page.getByText("This reel would not load here.")).toBeVisible({ timeout: 10_000 });
  await expect(page.getByRole("link", { name: "Watch it on Instagram" })).toHaveAttribute("href", /Deewk4GuUZa/);
});

test("every stand-in photograph says it is not this colony", async ({ page }) => {
  for (const path of ["/", "/science", "/experiment"]) {
    await page.goto(path);
    const plates = page.locator("figure:has([role='img'][aria-label])").filter({ has: page.locator("figcaption") });
    const n = await plates.count();
    for (let i = 0; i < n; i++) {
      const fig = plates.nth(i);
      if ((await fig.locator("svg").count()) > 0) continue; // diagrams
      await expect(fig.locator("figcaption")).toContainText("Not this colony");
    }
  }
});

test("citation chips open their reference", async ({ page }) => {
  await gotoReady(page, "/");
  // Match both states: the name flips to "Hide source S8" once open
  const chip = page.getByRole("button", { name: /(Show|Hide) source S8/ }).first();
  await chip.scrollIntoViewIfNeeded();
  await chip.click();
  await expect(chip).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("link", { name: "doi:10.1098/rspb.2012.0051" }).first()).toBeVisible();
});

test("new days are marked for returning visitors", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("rich-anthill:lastSeenDay", "2"));
  await gotoReady(page, "/days");
  // The archive shows the badge; the compact header strip has no room for it
  await expect(page.getByRole("main").getByText("New", { exact: true }).first()).toBeVisible();
});

test("the site works when storage is blocked", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("blocked"); } });
  });
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("New", { exact: true })).toHaveCount(0);
  expect(errors).toEqual([]);
});
