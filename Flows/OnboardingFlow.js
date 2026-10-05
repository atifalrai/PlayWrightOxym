/** Dismisses the post-login onboarding sheet that blocks underlying clicks. */
export class OnboardingFlow {
  static OnboardingModalSelector = "ion-modal.onboarding-modal-sheet";
  static OnboardingActionTimeout = 30000;

  /**
   * Ionic carousels keep every slide in the DOM; target only the visible footer button.
   * @param {import('playwright').Locator} modal
   * @param {string|RegExp} name
   */
  static visibleButton(modal, name) {
    return modal.getByRole("button", { name, exact: true }).filter({ visible: true });
  }

  static visibleActionButton(modal) {
    return modal
      .getByRole("button", { name: /^(Next|Get Started|Skip)$/ })
      .filter({ visible: true });
  }

  /**
   * @param {import('playwright').Locator} locator
   * @param {{ forceOnRetry?: boolean, timeout?: number }} [options]
   */
  static async safeClick(locator, options = {}) {
    const { forceOnRetry = true, timeout = OnboardingFlow.OnboardingActionTimeout } = options;
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await locator.waitFor({ state: "visible", timeout });
        await locator.scrollIntoViewIfNeeded();
        await locator.click({
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

  static async DismissIfPresent() {
    const modal = global.page.locator(OnboardingFlow.OnboardingModalSelector);
    const isOpen = await modal
      .waitFor({ state: "visible", timeout: 10000 })
      .then(() => true)
      .catch(() => false);
    if (!isOpen) {
      return;
    }

    await OnboardingFlow.visibleActionButton(modal)
      .first()
      .waitFor({ state: "visible", timeout: OnboardingFlow.OnboardingActionTimeout })
      .catch(() => {});

    const next = OnboardingFlow.visibleButton(modal, "Next");
    const getStarted = OnboardingFlow.visibleButton(modal, "Get Started");
    const skip = OnboardingFlow.visibleButton(modal, "Skip");

    const maxSteps = 12;
    for (let step = 0; step < maxSteps; step++) {
      if (!(await modal.isVisible().catch(() => false))) {
        return;
      }

      if (await getStarted.isVisible().catch(() => false)) {
        await OnboardingFlow.safeClick(getStarted.first());
        await modal.waitFor({ state: "hidden", timeout: 30000 }).catch(() => {});
        return;
      }

      if (await skip.isVisible().catch(() => false)) {
        await OnboardingFlow.safeClick(skip.first());
        await modal.waitFor({ state: "hidden", timeout: 30000 }).catch(() => {});
        return;
      }

      if (await next.isVisible().catch(() => false)) {
        await OnboardingFlow.safeClick(next.first());
        await OnboardingFlow.visibleActionButton(modal)
          .first()
          .waitFor({ state: "visible", timeout: OnboardingFlow.OnboardingActionTimeout })
          .catch(() => {});
        continue;
      }

      break;
    }

    if (await modal.isVisible().catch(() => false)) {
      await global.page.keyboard.press("Escape").catch(() => {});
      await modal.waitFor({ state: "hidden", timeout: 15000 }).catch(() => {});
    }
  }
}
