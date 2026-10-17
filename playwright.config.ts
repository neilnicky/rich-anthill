import { defineConfig, devices } from "@playwright/test";

const PORT = 3300;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    // Run next directly: a pnpm wrapper swallows SIGTERM and teardown hangs
    command: `node_modules/.bin/next start --port ${PORT}`,
    gracefulShutdown: { signal: "SIGTERM", timeout: 2_000 },
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    {
      name: "reduced-motion",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, contextOptions: { reducedMotion: "reduce" } },
      testMatch: /motion\.spec\.ts/,
    },
  ],
});
