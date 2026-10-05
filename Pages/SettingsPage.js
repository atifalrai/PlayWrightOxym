import { ControlUtils } from "./ControlUtils";

export class SettingsPage {
  static Switch_Role = "switch";
  static Heading_Role = "heading";

  static PushNotificationsHeading_RoleName = "Push Notifications";
  static PushNotificationsSwitch_RoleName = "Push notifications";
  static DoNotSellHeading_RoleName = "Do Not Sell or Share My";
  static DoNotSellSwitch_RoleName = "Do not sell or share my";

  static PushNotificationsHeading() {
    return global.page.getByRole(this.Heading_Role, { name: this.PushNotificationsHeading_RoleName });
  }

  static PushNotificationsSwitch() {
    return global.page.getByRole(this.Switch_Role, { name: this.PushNotificationsSwitch_RoleName });
  }

  static DoNotSellHeading() {
    return global.page.getByRole(this.Heading_Role, { name: this.DoNotSellHeading_RoleName });
  }

  static DoNotSellSwitch() {
    return global.page.getByRole(this.Switch_Role, { name: this.DoNotSellSwitch_RoleName });
  }

  /**
   * @param {import('playwright').Locator} switchLocator
   * @returns {Promise<boolean>}
   */
  static async IsSwitchOn(switchLocator) {
    const state = await switchLocator.getAttribute("aria-checked");
    return state === "true";
  }

  /**
   * Clicks the toggle only if it isn't already in the desired state, then waits
   * for aria-checked to flip. The Push Notifications toggle in particular can
   * take up to ~15s to settle after the click (per known delay, OXYD-6738).
   */
  static async SetSwitch(switchLocator, desiredOn, timeout = 20000) {
    if ((await this.IsSwitchOn(switchLocator)) === desiredOn) return;
    await ControlUtils.ResilientClick(switchLocator);
    await ControlUtils.WaitForToastsHidden().catch(() => {});
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      if ((await this.IsSwitchOn(switchLocator)) === desiredOn) return;
      await global.page.waitForTimeout(1000);
    }
  }
}
