const { chromium } = require('playwright');
global.page = null;
global.browser = null;
global.context = null;

export class BrowserManager {
 static async BrowserInitialization() {
  global.browser = await chromium.launch({
    headless: process.env.HEADLESS === "true",
    args: [
      "--disable-popup-blocking",
      "--disable-infobars"
    ]
  });
    global.context = await global.browser.newContext({
    ignoreHTTPSErrors: true,
    permissions: ["notifications"]
  });
  global.page = await global.context.newPage();
  await global.page.setDefaultNavigationTimeout(120000);
  await global.page.setDefaultTimeout(60000);
  global.page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[BROWSER ${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });
  global.page.on('pageerror', err => {
    console.log(`[PAGE ERROR] ${err.message}`);
  });
  global.page.on('requestfailed', req => {
    console.log(`[REQUEST FAILED] ${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });
  global.page.on('response', async res => {
    if (res.status() >= 400) {
      console.log(`[HTTP ${res.status()}] ${res.request().method()} ${res.url()}`);
    }
  });
}
  static async OpenNewTab() {
    if (!global.page) {
      throw new Error("Page not initialized. Call BrowserInitialization() first.");
    }
   const newPage = await global.page.context().newPage(); //  opens tab in same window
  //  const newPage = global.page; // ❌ opens new window
   return newPage;
  }
  static async CloseBrowser() {
    if (global.browser) {
      await global.page.close();
      await global.browser.close();
    }
  }
}
