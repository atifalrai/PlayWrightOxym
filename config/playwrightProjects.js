// @ts-check
const { device } = require("./playwrightDevices");

const headless = process.env.HEADLESS === "true";

/** @type {import('@playwright/test').Project[]} */
const crossBrowserProjects = [
  // --- Windows desktop ---
  {
    name: "desktop-chrome",
    use: {
      ...device("Desktop Chrome"),
      channel: "chrome",
      headless,
      viewport: null,
      deviceScaleFactor: undefined,
      launchOptions: { args: ["--start-maximized"] },
    },
  },
  // {
  //   name: "desktop-edge",
  //   use: {
  //     ...device("Desktop Edge"),
  //     channel: "msedge",
  //     headless,
  //     viewport: null,
  //     launchOptions: { args: ["--start-maximized"] },
  //   },
  // },
  // Safari on macOS (WebKit engine + Desktop Safari user agent)
  {
    name: "desktop-safari-mac",
    use: {
      ...device("Desktop Safari"),
      headless,
    },
  },

  // --- iOS (WebKit) — do not set viewport: null (keeps device viewport) ---
  //{ name: "iphone-14-pro", use: { ...device("iPhone 14 Pro"), headless } },
  { name: "iphone-16", use: { ...device("iPhone 16"), headless } },
  // "iPhone XE" mapped to iPhone SE (compact iPhone)
  // { name: "iphone-se", use: { ...device("iPhone SE"), headless } },
  // { name: "iphone-12", use: { ...device("iPhone 12"), headless } },
  // { name: "ipad", use: { ...device("iPad (gen 7)"), headless } },
  { name: "ipad-pro", use: { ...device("iPad Pro 11"), headless } },

  // --- Android (Chromium) ---
  { name: "galaxy-s22", use: { ...device("Galaxy S22"), headless } },
  { name: "galaxy-s24", use: { ...device("Galaxy S24"), headless } },
  // { name: "pixel-7", use: { ...device("Pixel 7"), headless } },
  // { name: "galaxy-s9-plus", use: { ...device("Galaxy S9+"), headless } },
  // { name: "galaxy-tab-s4", use: { ...device("Galaxy Tab S4"), headless } },
];

const ALL_PROJECT_NAMES = crossBrowserProjects.map((p) => p.name);
const DEFAULT_PROJECT = "desktop-chrome";

/**
 * All projects are registered so `npx playwright test --project=<name>` works.
 * Optional env PLAYWRIGHT_PROJECT limits which projects are registered (comma-separated).
 *
 * @returns {import('@playwright/test').Project[]}
 */
function resolveProjects() {
  const raw = process.env.PLAYWRIGHT_PROJECT || process.env.PLAYWRIGHT_PROJECTS;
  if (!raw) {
    return crossBrowserProjects;
  }
  const selected = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const matched = crossBrowserProjects.filter(
    (p) => typeof p.name === "string" && selected.includes(p.name)
  );
  if (matched.length === 0) {
    console.warn(
      `[playwright] No projects matched PLAYWRIGHT_PROJECT="${raw}". ` +
        `Using all projects. Available: ${ALL_PROJECT_NAMES.join(", ")}`
    );
    return crossBrowserProjects;
  }
  return matched;
}

module.exports = {
  crossBrowserProjects,
  resolveProjects,
  ALL_PROJECT_NAMES,
  DEFAULT_PROJECT,
};
