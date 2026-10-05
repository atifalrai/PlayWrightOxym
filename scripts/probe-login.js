const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--disable-popup-blocking','--disable-notifications','--disable-infobars'] });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  page.setDefaultTimeout(120000);
  await page.goto('https://uat.juke.team/', { waitUntil: 'domcontentloaded', timeout: 120000 });
  console.log('initial', page.url());
  await page.locator("//input[@id='email']").fill('oxymtesting@gmail.com');
  await page.locator("//input[@id='password']").fill('Cinnova@123');
  await page.locator("//button[normalize-space()='Sign in']").click();
  await page.waitForTimeout(15000);
  console.log('after click', page.url());
  console.log('body text sample', (await page.locator('body').innerText()).slice(0, 4000));
  await browser.close();
})();
