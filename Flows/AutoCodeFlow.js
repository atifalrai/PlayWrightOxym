import { ControlUtils } from "../Pages/ControlUtils.js";
import { HomePage } from "../Pages/HomePage.js";

export class AutoCodeFlow {
  static async ClickBannerButton() {
    await ControlUtils.Click(HomePage.BannerButton());
  }
}
