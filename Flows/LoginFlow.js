
import { ControlUtils } from "../Pages/ControlUtils.js";
import { Consts } from "../Pages/Consts.js";
import { HomePage } from "../Pages/HomePage.js";
import { LoginPage } from "../Pages/LoginPage.js";

export class LoginFlow {

  static async EnterEmail(email) {
    await ControlUtils.Fill(HomePage.Email(), email);
  }

  static async EnterPassword(password) {
    await ControlUtils.Fill(HomePage.Password(), password);
  }

  static async ClickSignIn() {
    await ControlUtils.Click(HomePage.SignInButton());
  }

  static async AppLogin(email, password) {
    await LoginFlow.EnterEmail(email);
    await LoginFlow.EnterPassword(password);
    await HomePage.SignInButton().click({ timeout: 30000 });
    await global.page.waitForTimeout(4000);
    await global.page.waitForURL(/^(?!.*auth\/login).*/, { timeout: 120000 }).catch(() => {});
  }

  static async SignOut() {
    await ControlUtils.CloseOpenModals();
    await ControlUtils.WaitForToastsHidden();
    await ControlUtils.Click(LoginPage.ProfileIcon());
    await ControlUtils.WaitForToastsHidden();
    await ControlUtils.Click(LoginPage.SignOutLink());

    const modal = global.page.locator("ion-modal.account-sign-out-modal");
    await modal.waitFor({ state: "visible", timeout: 15000 });
    await ControlUtils.WaitForToastsHidden();

    await ControlUtils.ResilientClick(
      LoginPage.SignOutButton().filter({ visible: true }).first()
    );
    await modal.waitFor({ state: "hidden", timeout: 15000 }).catch(() => {});
  }
}