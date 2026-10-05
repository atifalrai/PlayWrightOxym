// @ts-check

/** Browser context fields copied from project `use` (device emulation, etc.). */
const CONTEXT_OPTION_KEYS = [
  "acceptDownloads",
  "bypassCSP",
  "clientCertificates",
  "colorScheme",
  "deviceScaleFactor",
  "extraHTTPHeaders",
  "hasTouch",
  "geolocation",
  "httpCredentials",
  "ignoreHTTPSErrors",
  "isMobile",
  "javaScriptEnabled",
  "locale",
  "offline",
  "permissions",
  "proxy",
  "storageState",
  "viewport",
  "screen",
  "timezoneId",
  "userAgent",
  "baseURL",
  "serviceWorkers",
];

/**
 * @param {Partial<import('@playwright/test').PlaywrightTestOptions> | undefined} use
 * @returns {import('playwright').BrowserContextOptions}
 */
function contextOptionsFromProjectUse(use) {
  /** @type {import('playwright').BrowserContextOptions} */
  const options = {};
  const source = use ?? {};
  for (const key of CONTEXT_OPTION_KEYS) {
    if (source[key] !== undefined) {
      options[key] = source[key];
    }
  }

  // Desktop projects use viewport: null (full window). Playwright rejects
  // deviceScaleFactor / screen together with null viewport.
  if (options.viewport === null) {
    delete options.deviceScaleFactor;
    delete options.screen;
  }

  return options;
}

module.exports = { contextOptionsFromProjectUse };
