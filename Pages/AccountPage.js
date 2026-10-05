import { ControlUtils } from "./ControlUtils";
import { Consts } from "./Consts";

export class AccountPage {
  static Button_Role = "button";
  static Tab_Role = "tab";
  static Navigation_Role = "navigation";

  static AccountTab_Identifier = "#tab-button-account";
  static AccountTab_RoleName = "Account";
  static AccountOptionsNav_RoleName = "Account options";
  static ProfileCard_Identifier = "app-account-profile-card";
  static ProfileButton_RoleName = "Profile";
  static SettingsButton_RoleName = "Settings";
  static TeamsButton_RoleName = "Teams";
  static OrganizationSettingsButton_RoleName = "Organization Settings";
  static BillingButton_RoleName = "Billing";
  static HelpButton_RoleName = "Help";
  static WhatsNewButton_RoleName = "What's New";
  static SignOutButton_RoleName = "Sign Out";
  static GoBackButton_RoleName = "Go back";
  static Close_Label = "Close";

  // ---- Navigation ----

  /**
   * Plain locator - deliberately NOT routed through ControlUtils.WaitForVisible,
   * which starts a 120s locator.waitFor() without awaiting or catching it. That
   * floating promise rejects long after the caller moved on, and Playwright
   * turns the unhandled rejection into a failure of whichever test is running,
   * with every step already reported green. OpenAccountTab below waits for
   * visibility explicitly instead.
   */
  static AccountTab() {
    return global.page
      .locator(this.AccountTab_Identifier)
      .or(global.page.getByRole(this.Tab_Role, { name: this.AccountTab_RoleName }))
      .first();
  }

  static AccountOptionsNav() {
    return global.page.getByRole(this.Navigation_Role, { name: this.AccountOptionsNav_RoleName });
  }

  /**
   * Clicks the bottom-nav Account tab and waits for the Account screen shell
   * (the "Account options" menu list) to render. The Account tab is present on
   * every authenticated screen, so no team switch is required first.
   *
   * The tab bar is painted before the app shell finishes hydrating, and a click
   * that lands in that gap is swallowed with no navigation and no error - so
   * re-click until the options nav actually appears rather than clicking once.
   */
  static async OpenAccountTab(maxAttempts = 4) {
    const nav = this.AccountOptionsNav();
    const tab = this.AccountTab();
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const tabReady = await tab
        .waitFor({ state: "visible", timeout: 30000 })
        .then(() => true)
        .catch(() => false);
      if (!tabReady) {
        await global.page.waitForTimeout(2000);
        continue;
      }
      await ControlUtils.ResilientClick(tab).catch(() => {});
      const opened = await nav
        .waitFor({ state: "visible", timeout: 15000 })
        .then(() => true)
        .catch(() => false);
      if (opened) return;
      await global.page.waitForTimeout(2000);
    }
  }

  // ---- Profile header ----

  static ProfileCard() {
    return global.page.locator(this.ProfileCard_Identifier);
  }

  static ProfileFullName(fullName = Consts.AccountFullName) {
    return this.ProfileCard().getByText(fullName).first();
  }

  /**
   * The avatar renders either as an <img> (uploaded picture) or as an
   * ion-avatar/initials placeholder when the user has no picture, so accept
   * whichever the account under test has.
   */
  static ProfilePicture() {
    const card = this.ProfileCard();
    return card
      .locator("img")
      .or(card.locator("ion-avatar"))
      .or(card.locator("ion-icon"))
      .first();
  }

  // ---- Menu items ----

  /**
   * Menu rows are <button>s inside the "Account options" navigation. Exact
   * matching matters: "Settings" is a prefix of "Organization Settings", so a
   * substring match would make the negative role-gating assertions pass
   * against the wrong row. Falls back to a page-level lookup for rows rendered
   * outside the navigation landmark (e.g. Sign Out).
   *
   * Billing is special-cased: its row includes an app-billing-status-icon
   * with aria-label (e.g. "Payment overdue"), which the accessible-name
   * algorithm folds into the button's computed name ("Payment overdue
   * Billing"), breaking an exact role/name match on "Billing" alone.
   */
  static MenuButton(name) {
    if (name === this.BillingButton_RoleName) {
      return this.BillingMenuButton();
    }
    return this.AccountOptionsNav()
      .getByRole(this.Button_Role, { name, exact: true })
      .or(global.page.getByRole(this.Button_Role, { name, exact: true }))
      .first();
  }

  static ProfileMenuButton() {
    return this.MenuButton(this.ProfileButton_RoleName);
  }

  static SettingsMenuButton() {
    return this.MenuButton(this.SettingsButton_RoleName);
  }

  static TeamsMenuButton() {
    return this.MenuButton(this.TeamsButton_RoleName);
  }

  static OrganizationSettingsMenuButton() {
    return this.MenuButton(this.OrganizationSettingsButton_RoleName);
  }

  /**
   * Matched on DOM structure rather than accessible name: the row is
   * <button class="account-menu-row"> containing a
   * <span class="account-menu-row__label"> with the exact row text, plus a
   * status icon whose aria-label otherwise pollutes the button's computed
   * accessible name (see MenuButton above).
   */
  static BillingMenuButton() {
    const selector = `button.account-menu-row:has(.account-menu-row__label:text-is("${this.BillingButton_RoleName}"))`;
    return this.AccountOptionsNav()
      .locator(selector)
      .or(global.page.locator(selector))
      .first();
  }

  static HelpMenuButton() {
    return this.MenuButton(this.HelpButton_RoleName);
  }

  static WhatsNewMenuButton() {
    return this.MenuButton(this.WhatsNewButton_RoleName);
  }

  static SignOutMenuButton() {
    return this.MenuButton(this.SignOutButton_RoleName);
  }

  static GoBackButton() {
    return global.page.getByRole(this.Button_Role, { name: this.GoBackButton_RoleName }).last();
  }

  static WhatsNewCloseButton() {
    return global.page.getByLabel(this.Close_Label).last();
  }

  /**
   * @param {import('playwright').Locator} locator
   * @returns {Promise<boolean>}
   */
  static async IsVisible(locator, timeout = 15000) {
    return locator.isVisible({ timeout }).catch(() => false);
  }

  /** Opens a menu row, then returns to the Account screen via Go back. */
  static async OpenMenuItemAndGoBack(name) {
    await ControlUtils.ResilientClick(this.MenuButton(name));
    await ControlUtils.WaitForToastsHidden();
    await ControlUtils.ResilientClick(this.GoBackButton());
    await this.AccountOptionsNav()
      .waitFor({ state: "visible", timeout: 30000 })
      .catch(() => {});
  }

  /** What's New opens a modal closed by its Close icon, not a Go back button. */
  static async OpenWhatsNewAndClose() {
    await ControlUtils.ResilientClick(this.WhatsNewMenuButton());
    await ControlUtils.WaitForToastsHidden();
    await ControlUtils.ResilientClick(this.WhatsNewCloseButton());
    await this.AccountOptionsNav()
      .waitFor({ state: "visible", timeout: 30000 })
      .catch(() => {});
  }
}
