// @ts-check
const { devices } = require("@playwright/test");

/**
 * Custom device profiles for models not bundled in @playwright/test.
 * Built-in presets: https://playwright.dev/docs/emulation#devices
 */
const customDevices = {
  /** iPhone 16 — based on iPhone 15 Pro dimensions (Playwright 1.52 has no preset yet). */
  "iPhone 16": {
    ...devices["iPhone 15 Pro"],
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  },
  /** Samsung Galaxy S22 */
  "Galaxy S22": {
    ...devices["Galaxy S9+"],
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    viewport: { width: 360, height: 780 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  },
  /** Samsung Galaxy S24 */
  "Galaxy S24": {
    ...devices["Galaxy S9+"],
    userAgent:
      "Mozilla/5.0 (Linux; Android 14; SM-S921B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  },
};

/**
 * @param {string} name
 * @returns {import('@playwright/test').PlaywrightTestOptions}
 */
function device(name) {
  return customDevices[name] || devices[name];
}

module.exports = { device, customDevices, devices };
