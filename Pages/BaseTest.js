
import { expect } from "@playwright/test";
import { AppFlow } from "../Flows/AppFlow";
import { OnboardingFlow } from "../Flows/OnboardingFlow.js";
import { BrowserManager } from "../Pages/BrowserManager";
import { Consts } from "./Consts";
import { ControlUtils } from "../Pages/ControlUtils";
import { HomePage } from "./HomePage.js";
const { LoginFlow } = require("../Flows/LoginFlow");
export class BaseTest {
  static async Initialization() {
    try {
      await AppFlow.NavigateToHome(Consts.Url);
      await LoginFlow.AppLogin(Consts.Email, Consts.PasswordText);
    } catch (error) {
      console.error("Browser initialization failed:", error);
      throw error;
    }
  }

  static async BeforeAll() {
    await BrowserManager.BrowserInitialization();
  }

  static async BeforeEach() {
    await BrowserManager.BrowserInitialization();
    await BaseTest.Initialization();
  }

  static async AfterEach(testInfo) {
    if (testInfo && testInfo.error) {
      let errMsg = testInfo.error.message || String(testInfo.error);
      let errStack = testInfo.error.stack || '';
      // Clean up ANSI codes from both message and stack
      const clean = str => str ? str.replace(/\x1b\[[0-9;]*[a-zA-Z]/g, '')
        .replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '')
        .replace(/\033\[[0-9;]*[a-zA-Z]/g, '')
        .replace(/\e\[[0-9;]*[a-zA-Z]/g, '')
        .replace(/\x1b\][0-9];.*?\x07/g, '')
        .replace(/\x1b[>=]/g, '')
        .replace(/\x1b\(B/g, '')
        .replace(/\x07/g, '') : '';
      errMsg = clean(errMsg);
      errStack = clean(errStack);
      const shortMsg = 'Test failed with error';
      const fullError = errStack && !errStack.includes(errMsg) ? `${errMsg}\n${errStack}` : errStack || errMsg;
      if (typeof ControlUtils.TakeScreenShot === 'function') {
        await ControlUtils.TakeScreenShot('Exception', testInfo);
      }
      await testInfo.attach('custom-message', {
        contentType: 'application/json',
        body: Buffer.from(
          JSON.stringify({ message: shortMsg, status: 'failed', scenario: 'Test End', error: fullError }),
          'utf8'
        ),
      });
    }
    await LoginFlow.SignOut();
    await BrowserManager.CloseBrowser();
  }
}