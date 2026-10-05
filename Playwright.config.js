// @ts-check
const { resolveProjects } = require("./config/playwrightProjects");

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: "./tests",
  timeout: 600000,
  globalTimeout: 3600000,
  // Keep false: tests share one logged-in page per worker (see fixtures/softAssertFixture.js).
  // Notes.spec.js uses describe.serial for ordered steps on that page.
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  // Parallel across spec files and projects. Override: PLAYWRIGHT_WORKERS=4
  // workers: process.env.PLAYWRIGHT_WORKERS
  //   ? Number(process.env.PLAYWRIGHT_WORKERS)
  //   : process.env.CI
  //     ? 1
  //     : "50%",
  workers: 1, // ← Run one worker only
  reporter: [
    ["./CustomHtmlReporter.js", { outputDir: "custom-report" }],
    ["html", { outputFolder: "playwright-DefalutReport", open: "never" }],
    ["junit", { outputFile: "results/testcases-result.xml" }],
  ],

  use: {
    trace: "on-first-retry",
    screenshot: "off",
    video: "on-first-retry",
    actionTimeout: 60000,
    ignoreHTTPSErrors: true,
    navigationTimeout: 120000,
  },
  expect: {
    timeout: 60000,
  },

  projects: resolveProjects(),
};

module.exports = config;
