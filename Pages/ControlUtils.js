
export class ControlUtils {

  static async Click(locator) {
    const resolvedLocator = await locator;
    return resolvedLocator.click();
  }

  /**
   * Waits for visible Ionic toast overlays to dismiss so they do not block clicks.
   * @param {number} [timeout=20000]
   */
  static async WaitForToastsHidden(timeout = 20000) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const visibleToast = global.page.locator("ion-toast").filter({ visible: true });
      if ((await visibleToast.count()) === 0) {
        return;
      }
      await visibleToast
        .first()
        .waitFor({ state: "hidden", timeout: Math.max(deadline - Date.now(), 500) })
        .catch(() => {});
    }
  }

  /**
   * @param {import('playwright').Locator} locator
   * @param {{ forceOnRetry?: boolean, timeout?: number }} [options]
   */
  static async ResilientClick(locator, options = {}) {
    const { forceOnRetry = true, timeout = 30000 } = options;
    const resolvedLocator = await locator;
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await ControlUtils.WaitForToastsHidden(Math.min(timeout, 10000));
        await resolvedLocator.waitFor({ state: "visible", timeout });
        await resolvedLocator.scrollIntoViewIfNeeded();
        await resolvedLocator.click({
          timeout,
          force: attempt > 0 && forceOnRetry,
        });
        return;
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  }

  static WaitForVisible(locator, timeout = 120000) {
    // Not awaited so callers can keep returning a Locator synchronously (required by
    // expect(...).toBeVisible()'s own polling). Without the catch, a locator that never
    // becomes visible (e.g. no matching record) rejects ~`timeout` later as an unhandled
    // promise rejection and fails whatever test happens to be running at that moment.
    locator.waitFor({ state: 'visible', timeout }).catch(() => {});
    return locator
  }

  static async CloseOpenModals() {
    const openModals = global.page.locator("ion-modal.show-modal");
    const modalCount = await openModals.count();
    for (let i = 0; i < modalCount; i++) {
      const closeButton = openModals.nth(i).getByRole("button", { name: /close/i });
      if (await closeButton.isVisible().catch(() => false)) {
        await closeButton.click().catch(() => {});
      }
    }
    if ((await openModals.count()) > 0) {
      await global.page.keyboard.press("Escape").catch(() => {});
    }
    await openModals
      .first()
      .waitFor({ state: "hidden", timeout: 5000 })
      .catch(() => {});
  }

  static async Fill(locator, text) {
    const resolvedLocator = await locator;
    return resolvedLocator.fill(text);
  }

  static async TakeScreenShot(description, testInfo) {
    const screenshot = await global.page.screenshot({ fullPage: true });
    const scenario = testInfo && testInfo.scenario ? testInfo.scenario : 'Default';
    await testInfo.attach(`${scenario}-${description}`, {
      contentType: 'image/png',
      body: screenshot,
    });
  }

  static async Clear(element) {
    ControlUtils.Fill(element, '');
  }

  static async GetInputValue(locator) {
    const resolvedLocator = await locator;
    return resolvedLocator.inputValue();
  }

  static async GetText(locator) {
    const resolvedLocator = await locator;
    return resolvedLocator.textContent();
  }

  static async ScrollIntoView(locator) {
    const resolvedLocator = await locator;
    await resolvedLocator.scrollIntoViewIfNeeded();
  }
  static async TypeValue(value) {
    await global.page.keyboard.type(value);
  }

  static async PressEnter() {
    await global.page.keyboard.press('Enter');
  }

  static async IsChecked(locator) {
    const resolvedLocator = await locator;
    return resolvedLocator.isChecked();
  }

  static async LoadingState(locator) {
    const resolvedLocator = await locator;
    await resolvedLocator.waitFor({ state: 'hidden', timeout: 120000 });

  }

  static async RefreshPage() {
    // 'networkidle' can hang indefinitely on apps that keep a background
    // connection open (e.g. a push subscription once notifications are
    // granted), so wait for 'load' and let callers wait for their own
    // post-reload element instead.
    await global.page.reload({ waitUntil: 'load', timeout: 50000 });
  }


   static async WaitBeforeClick(locator) {
    await global.page.waitForTimeout(3000);
    const resolvedLocator = await locator;
    return resolvedLocator.click();
  }



  static async CloseTab(tabIndex) {
    const pages = global.page.context().pages();
    if (pages.length > tabIndex) {
      await pages[tabIndex].close();
    }
  }

  static async SwitchToTab(tabIndex) {
    const pages = global.page.context().pages();
    if (pages.length > tabIndex) {
      global.page = pages[tabIndex];
    }
  }

  static async RefreshPage() {
    // 'networkidle' can hang indefinitely on apps that keep a background
    // connection open (e.g. a push subscription once notifications are
    // granted), so wait for 'load' and let callers wait for their own
    // post-reload element instead.
    await global.page.reload({ waitUntil: 'load', timeout: 50000 });
  }
  
  static async UploadFile(locator, filePath) {
    const resolvedLocator = await locator;
    await resolvedLocator.waitFor({ state: 'attached', timeout: 10000 });
    await resolvedLocator.setInputFiles(filePath);
  }

  static async SwitchToIFrame(frameNameOrSelector) {
    await global.page.waitForSelector(`iframe[name="${frameNameOrSelector}"]`, { state: 'attached' });
    const frame = await global.page.frame({ name: frameNameOrSelector });
    if (!frame) throw new Error(`Frame '${frameNameOrSelector}' not found.`);
    return frame;
  }
}


export function formatString(template, values) {
  return template.replace(/{(\w+)}/g, (match, key) => values[key] ?? match);
}
