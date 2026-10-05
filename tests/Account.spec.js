import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { AccountPage } from "../Pages/AccountPage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import { LoginFlow } from "../Flows/LoginFlow.js";
import {
  AccountTestCaseNames,
  AccountNavStepNames,
  AccountOAMenuStepNames,
  AccountNoOrgMenuStepNames,
} from "../Pages/TestCaseNames.js";

/**
 * The Account tab lives on the bottom nav of every authenticated screen, so no
 * team switch is needed here - only the post-login Guide overlay has to be
 * dismissed, since it covers the bottom nav until it is closed.
 */
async function navigateToAccountScreen(softAssert, testInfo) {
  testInfo.scenario = `${AccountNavStepNames["Step-01"]}`;
  await softAssert(
    async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
    (await HomePage.DismissGuideIfPresent())
      ? Strings.MessagePassGuideDismissed
      : Strings.MessagePassGuideNotShown,
    Strings.MessageFailGuideHandling
  );
  await HomePage.DismissGuideIfPresent();

  testInfo.scenario = `${AccountNavStepNames["Step-02"]}`;
  await AccountPage.OpenAccountTab();
  await HomePage.DismissGuideIfPresent();

  testInfo.scenario = `${AccountNavStepNames["Step-03"]}`;
  await softAssert(
    async () => expect(AccountPage.AccountOptionsNav()).toBeVisible({ timeout: 30000 }),
    Strings.MessagePassAccountScreenOpened,
    Strings.MessageFailAccountScreenOpened
  );
}

/**
 * Signing in immediately after a sign-out silently no-ops: the login page has
 * just remounted, and values filled before Angular binds its reactive form
 * leave the form invalid, so Sign in does nothing and the app stays on
 * /auth/login. Wait for the field, let the binding settle, then submit - and
 * treat "still on /auth/login" as a retry rather than a login failure.
 *
 * @returns {Promise<boolean>} whether the app left the login page
 */
async function signInAsUser(email, password, maxAttempts = 3) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await HomePage.Email().waitFor({ state: "visible", timeout: 30000 }).catch(() => {});
    await global.page.waitForTimeout(1500);
    await ControlUtils.Fill(HomePage.Email(), email);
    await ControlUtils.Fill(HomePage.Password(), password);
    await ControlUtils.Click(HomePage.SignInButton()).catch(() => {});
    // 60s, not 30s: under load the app has been observed taking well over 30s
    // to leave /auth/login, which burned all three attempts on a slow run.
    const signedIn = await global.page
      .waitForURL(/^(?!.*auth\/login).*/, { timeout: 60000 })
      .then(() => true)
      .catch(() => false);
    if (signedIn) return true;
  }
  return false;
}

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("--OXYM-- Account Module Test Suite", () => {
  test(`TC-OXYM-ACC-01: ${AccountTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    await navigateToAccountScreen(softAssert, testInfo);

    testInfo.scenario = `${AccountOAMenuStepNames["Step-01"]}`;
    await softAssert(
      async () => expect(AccountPage.ProfilePicture()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountProfilePictureVisible,
      Strings.MessageFailAccountProfilePictureVisible
    );

    testInfo.scenario = `${AccountOAMenuStepNames["Step-02"]}`;
    await softAssert(
      async () =>
        expect(AccountPage.ProfileFullName(Consts.AccountFullName)).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountFullNameVisible,
      Strings.MessageFailAccountFullNameVisible
    );

    testInfo.scenario = `${AccountOAMenuStepNames["Step-03"]}`;
    await softAssert(
      async () => expect(AccountPage.ProfileMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountProfileMenuVisible,
      Strings.MessageFailAccountProfileMenuVisible
    );

    testInfo.scenario = `${AccountOAMenuStepNames["Step-04"]}`;
    await softAssert(
      async () => expect(AccountPage.SettingsMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountSettingsMenuVisible,
      Strings.MessageFailAccountSettingsMenuVisible
    );

    testInfo.scenario = `${AccountOAMenuStepNames["Step-05"]}`;
    await softAssert(
      async () =>
        expect(AccountPage.OrganizationSettingsMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountOrgSettingsMenuVisible,
      Strings.MessageFailAccountOrgSettingsMenuVisible
    );

    testInfo.scenario = `${AccountOAMenuStepNames["Step-06"]}`;
    await softAssert(
      async () => expect(AccountPage.BillingMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountBillingMenuVisible,
      Strings.MessageFailAccountBillingMenuVisible
    );

    testInfo.scenario = `${AccountOAMenuStepNames["Step-07"]}`;
    await softAssert(
      async () => expect(AccountPage.HelpMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountHelpMenuVisible,
      Strings.MessageFailAccountHelpMenuVisible
    );

    testInfo.scenario = `${AccountOAMenuStepNames["Step-08"]}`;
    await softAssert(
      async () => expect(AccountPage.SignOutMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountSignOutMenuVisible,
      Strings.MessageFailAccountSignOutMenuVisible
    );

    // Sign Out is asserted for visibility only: opening it would end the
    // session and break the remaining navigation checks.
    testInfo.scenario = `${AccountOAMenuStepNames["Step-09"]}`;
    const menuItems = [
      AccountPage.ProfileButton_RoleName,
      AccountPage.SettingsButton_RoleName,
      AccountPage.TeamsButton_RoleName,
      AccountPage.OrganizationSettingsButton_RoleName,
      AccountPage.BillingButton_RoleName,
      AccountPage.HelpButton_RoleName,
    ];
    for (const menuItem of menuItems) {
      await AccountPage.OpenMenuItemAndGoBack(menuItem);
      await softAssert(
        async () => expect(AccountPage.AccountOptionsNav()).toBeVisible({ timeout: 30000 }),
        `${menuItem}: ${Strings.MessagePassAccountMenuItemOpened}`,
        `${menuItem}: ${Strings.MessageFailAccountMenuItemOpened}`
      );
    }
    await AccountPage.OpenWhatsNewAndClose();
    await softAssert(
      async () => expect(AccountPage.AccountOptionsNav()).toBeVisible({ timeout: 30000 }),
      `${AccountPage.WhatsNewButton_RoleName}: ${Strings.MessagePassAccountMenuItemOpened}`,
      `${AccountPage.WhatsNewButton_RoleName}: ${Strings.MessageFailAccountMenuItemOpened}`
    );
  });

  test(`TC-OXYM-ACC-02: ${AccountTestCaseNames["TC-02"]}`, async ({ softAssert }, testInfo) => {
    // TC-01 covers the OA; this case runs against a separate non-OA player
    // account that belongs to no organization and owns its own team. BaseTest
    // logs in as the OA, so sign that session out first.
    testInfo.scenario = `${AccountNoOrgMenuStepNames["Step-01"]}`;
    await HomePage.DismissGuideIfPresent();
    await LoginFlow.SignOut();
    await softAssert(
      async () => expect(HomePage.Email()).toBeVisible({ timeout: 20000 }),
      Strings.MessagePassSignedOutForUserSwitch,
      Strings.MessageFailSignedOutForUserSwitch
    );

    testInfo.scenario = `${AccountNoOrgMenuStepNames["Step-02"]}`;
    const signedIn = await signInAsUser(Consts.AccountNoOrgEmail, Consts.AccountNoOrgPassword);
    await HomePage.DismissGuideIfPresent();
    await softAssert(
      async () => {
        expect(signedIn).toBe(true);
        await expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 });
      },
      Strings.MessagePassAccountNoOrgUserLoggedIn,
      Strings.MessageFailAccountNoOrgUserLoggedIn
    );
    await HomePage.DismissGuideIfPresent();

    testInfo.scenario = `${AccountNoOrgMenuStepNames["Step-03"]}`;
    await AccountPage.OpenAccountTab();
    await HomePage.DismissGuideIfPresent();

    testInfo.scenario = `${AccountNoOrgMenuStepNames["Step-04"]}`;
    await softAssert(
      async () => expect(AccountPage.AccountOptionsNav()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountScreenOpened,
      Strings.MessageFailAccountScreenOpened
    );

    testInfo.scenario = `${AccountNoOrgMenuStepNames["Step-05"]}`;
    await softAssert(
      async () => expect(AccountPage.ProfileMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountProfileMenuVisible,
      Strings.MessageFailAccountProfileMenuVisible
    );
    await softAssert(
      async () => expect(AccountPage.SettingsMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountSettingsMenuVisible,
      Strings.MessageFailAccountSettingsMenuVisible
    );
    await softAssert(
      async () => expect(AccountPage.HelpMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountHelpMenuVisible,
      Strings.MessageFailAccountHelpMenuVisible
    );
    await softAssert(
      async () => expect(AccountPage.SignOutMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAccountSignOutMenuVisible,
      Strings.MessageFailAccountSignOutMenuVisible
    );

    testInfo.scenario = `${AccountNoOrgMenuStepNames["Step-06"]}`;
    await softAssert(
      async () => expect(AccountPage.OrganizationSettingsMenuButton()).not.toBeVisible(),
      Strings.MessagePassAccountOrgSettingsMenuHidden,
      Strings.MessageFailAccountOrgSettingsMenuHidden
    );

    testInfo.scenario = `${AccountNoOrgMenuStepNames["Step-07"]}`;
    await softAssert(
      async () => expect(AccountPage.BillingMenuButton()).not.toBeVisible(),
      Strings.MessagePassAccountBillingMenuHidden,
      Strings.MessageFailAccountBillingMenuHidden
    );
  });
});
