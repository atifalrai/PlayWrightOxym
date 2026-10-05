import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { AccountPage } from "../Pages/AccountPage.js";
import { SettingsPage } from "../Pages/SettingsPage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import { LoginFlow } from "../Flows/LoginFlow.js";
import {
  AccountSettingTestCaseNames,
  AccountSettingNavStepNames,
  AccountSettingRoleVisibilityStepNames,
  AccountSettingNotificationsOffStepNames,
  AccountSettingNotificationsOnStepNames,
  AccountSettingDoNotSellStepNames,
  AccountSettingPersistAcrossSessionsStepNames,
} from "../Pages/TestCaseNames.js";

/**
 * Only the Org Admin (BaseTest's default login) and the non-OA player from
 * Consts.AccountNoOrgEmail have credentials in this repo. TC-02 in the source
 * spreadsheet also calls for Regular Coach, Player, Parent and Family Member,
 * but no accounts for those roles are configured (see Consts.js) - add
 * OXYM_<ROLE>_EMAIL / OXYM_<ROLE>_PASSWORD overrides there, following the
 * AccountNoOrgEmail pattern, before those roles can be exercised.
 */
const ROLES_UNDER_TEST = [
  { label: "Organization Admin", email: Consts.Email, password: Consts.PasswordText },
  { label: "Player (non-OA)", email: Consts.AccountNoOrgEmail, password: Consts.AccountNoOrgPassword },
];

async function navigateToAccountScreen() {
  await HomePage.DismissGuideIfPresent();
  await AccountPage.OpenAccountTab();
  await HomePage.DismissGuideIfPresent();
}

/** Opens Account > Settings and waits for the Settings screen to render. */
async function openAccountSettings(softAssert, testInfo) {
  await navigateToAccountScreen();

  testInfo.scenario = `${AccountSettingNavStepNames["Step-01"]}`;
  await softAssert(
    async () => expect(AccountPage.AccountOptionsNav()).toBeVisible({ timeout: 30000 }),
    Strings.MessagePassAccountScreenOpened,
    Strings.MessageFailAccountScreenOpened
  );

  testInfo.scenario = `${AccountSettingNavStepNames["Step-02"]}`;
  await ControlUtils.ResilientClick(AccountPage.SettingsMenuButton());

  testInfo.scenario = `${AccountSettingNavStepNames["Step-03"]}`;
  await softAssert(
    async () => {
      await expect(SettingsPage.PushNotificationsHeading()).toBeVisible({ timeout: 30000 });
      await expect(SettingsPage.DoNotSellHeading()).toBeVisible({ timeout: 30000 });
    },
    Strings.MessagePassSettingsScreenOpened,
    Strings.MessageFailSettingsScreenOpened
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

test.describe("--OXYM-- Account Settings Module Test Suite", () => {
  test(`TC-OXYM-ACCSET-01: ${AccountSettingTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    await openAccountSettings(softAssert, testInfo);
  });

  test(`TC-OXYM-ACCSET-02: ${AccountSettingTestCaseNames["TC-02"]}`, async ({ softAssert }, testInfo) => {
    for (const role of ROLES_UNDER_TEST) {
      testInfo.scenario = `${role.label}: ${AccountSettingRoleVisibilityStepNames["Step-01"]}`;
      await HomePage.DismissGuideIfPresent();
      await LoginFlow.SignOut();
      await softAssert(
        async () => expect(HomePage.Email()).toBeVisible({ timeout: 20000 }),
        `${role.label}: ${Strings.MessagePassSignedOutForUserSwitch}`,
        `${role.label}: ${Strings.MessageFailSignedOutForUserSwitch}`
      );

      const signedIn = await signInAsUser(role.email, role.password);
      await HomePage.DismissGuideIfPresent();
      await softAssert(
        async () => {
          expect(signedIn).toBe(true);
          await expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 });
        },
        `${role.label}: ${Strings.MessagePassAccountNoOrgUserLoggedIn}`,
        `${role.label}: ${Strings.MessageFailAccountNoOrgUserLoggedIn}`
      );
      await HomePage.DismissGuideIfPresent();

      testInfo.scenario = `${role.label}: ${AccountSettingRoleVisibilityStepNames["Step-02"]}`;
      await navigateToAccountScreen();
      await softAssert(
        async () => expect(AccountPage.AccountOptionsNav()).toBeVisible({ timeout: 30000 }),
        `${role.label}: ${Strings.MessagePassAccountScreenOpened}`,
        `${role.label}: ${Strings.MessageFailAccountScreenOpened}`
      );

      testInfo.scenario = `${role.label}: ${AccountSettingRoleVisibilityStepNames["Step-03"]}`;
      await softAssert(
        async () => expect(AccountPage.SettingsMenuButton()).toBeVisible({ timeout: 30000 }),
        `${role.label}: ${Strings.MessagePassSettingsMenuVisible}`,
        `${role.label}: ${Strings.MessageFailSettingsMenuVisible}`
      );
    }
  });

  test(`TC-OXYM-ACCSET-03: ${AccountSettingTestCaseNames["TC-03"]}`, async ({ softAssert }, testInfo) => {
    await openAccountSettings(softAssert, testInfo);

    testInfo.scenario = `${AccountSettingNotificationsOffStepNames["Step-02"]}`;
    const wasAlreadyOff = (await SettingsPage.IsSwitchOn(SettingsPage.PushNotificationsSwitch())) === false;
    await SettingsPage.SetSwitch(SettingsPage.PushNotificationsSwitch(), false);

    testInfo.scenario = `${AccountSettingNotificationsOffStepNames["Step-03"]}`;
    await softAssert(
      async () => expect(await SettingsPage.IsSwitchOn(SettingsPage.PushNotificationsSwitch())).toBe(false),
      wasAlreadyOff ? Strings.MessagePassNotificationsAlreadyOff : Strings.MessagePassNotificationsToggleOff,
      Strings.MessageFailNotificationsToggleOff
    );

    testInfo.scenario = `${AccountSettingNotificationsOffStepNames["Step-04"]}`;
    await ControlUtils.RefreshPage();
    await SettingsPage.PushNotificationsHeading().waitFor({ state: "visible", timeout: 30000 }).catch(() => {});

    testInfo.scenario = `${AccountSettingNotificationsOffStepNames["Step-05"]}`;
    await softAssert(
      async () => expect(await SettingsPage.IsSwitchOn(SettingsPage.PushNotificationsSwitch())).toBe(false),
      Strings.MessagePassNotificationsToggleOffPersisted,
      Strings.MessageFailNotificationsToggleOffPersisted
    );
  });

  test(`TC-OXYM-ACCSET-04: ${AccountSettingTestCaseNames["TC-04"]}`, async ({ softAssert }, testInfo) => {
    await openAccountSettings(softAssert, testInfo);

    testInfo.scenario = `${AccountSettingNotificationsOnStepNames["Step-02"]}`;
    testInfo.scenario = `${AccountSettingNotificationsOnStepNames["Step-03"]}`;
    const wasAlreadyOn = (await SettingsPage.IsSwitchOn(SettingsPage.PushNotificationsSwitch())) === true;
    // SetSwitch already polls up to 20s for aria-checked to flip, covering the
    // known ~15s spinner delay (OXYD-6738).
    await SettingsPage.SetSwitch(SettingsPage.PushNotificationsSwitch(), true);

    testInfo.scenario = `${AccountSettingNotificationsOnStepNames["Step-04"]}`;
    await softAssert(
      async () => expect(await SettingsPage.IsSwitchOn(SettingsPage.PushNotificationsSwitch())).toBe(true),
      wasAlreadyOn ? Strings.MessagePassNotificationsAlreadyOn : Strings.MessagePassNotificationsToggleOn,
      Strings.MessageFailNotificationsToggleOn
    );

    testInfo.scenario = `${AccountSettingNotificationsOnStepNames["Step-05"]}`;
    await ControlUtils.RefreshPage();
    await SettingsPage.PushNotificationsHeading().waitFor({ state: "visible", timeout: 30000 }).catch(() => {});
    await softAssert(
      async () => expect(await SettingsPage.IsSwitchOn(SettingsPage.PushNotificationsSwitch())).toBe(true),
      Strings.MessagePassNotificationsToggleOnPersisted,
      Strings.MessageFailNotificationsToggleOnPersisted
    );
  });

  test(`TC-OXYM-ACCSET-05: ${AccountSettingTestCaseNames["TC-05"]}`, async ({ softAssert }, testInfo) => {
    await openAccountSettings(softAssert, testInfo);

    testInfo.scenario = `${AccountSettingDoNotSellStepNames["Step-02"]}`;
    await SettingsPage.SetSwitch(SettingsPage.DoNotSellSwitch(), true);

    testInfo.scenario = `${AccountSettingDoNotSellStepNames["Step-03"]}`;
    await softAssert(
      async () => expect(await SettingsPage.IsSwitchOn(SettingsPage.DoNotSellSwitch())).toBe(true),
      Strings.MessagePassDoNotSellToggleOn,
      Strings.MessageFailDoNotSellToggleOn
    );
    await ControlUtils.RefreshPage();
    await SettingsPage.DoNotSellHeading().waitFor({ state: "visible", timeout: 30000 }).catch(() => {});
    await softAssert(
      async () => expect(await SettingsPage.IsSwitchOn(SettingsPage.DoNotSellSwitch())).toBe(true),
      Strings.MessagePassDoNotSellToggleOnPersisted,
      Strings.MessageFailDoNotSellToggleOnPersisted
    );

    testInfo.scenario = `${AccountSettingDoNotSellStepNames["Step-04"]}`;
    await SettingsPage.SetSwitch(SettingsPage.DoNotSellSwitch(), false);

    testInfo.scenario = `${AccountSettingDoNotSellStepNames["Step-05"]}`;
    await softAssert(
      async () => expect(await SettingsPage.IsSwitchOn(SettingsPage.DoNotSellSwitch())).toBe(false),
      Strings.MessagePassDoNotSellToggleOff,
      Strings.MessageFailDoNotSellToggleOff
    );
    await ControlUtils.RefreshPage();
    await SettingsPage.DoNotSellHeading().waitFor({ state: "visible", timeout: 30000 }).catch(() => {});
    await softAssert(
      async () => expect(await SettingsPage.IsSwitchOn(SettingsPage.DoNotSellSwitch())).toBe(false),
      Strings.MessagePassDoNotSellToggleOffPersisted,
      Strings.MessageFailDoNotSellToggleOffPersisted
    );
  });

  test(`TC-OXYM-ACCSET-06: ${AccountSettingTestCaseNames["TC-06"]}`, async ({ softAssert }, testInfo) => {
    await openAccountSettings(softAssert, testInfo);

    testInfo.scenario = `${AccountSettingPersistAcrossSessionsStepNames["Step-01"]}`;
    await SettingsPage.SetSwitch(SettingsPage.PushNotificationsSwitch(), false);
    await SettingsPage.SetSwitch(SettingsPage.DoNotSellSwitch(), true);

    testInfo.scenario = `${AccountSettingPersistAcrossSessionsStepNames["Step-02"]}`;
    await LoginFlow.SignOut();
    await softAssert(
      async () => expect(HomePage.Email()).toBeVisible({ timeout: 20000 }),
      Strings.MessagePassSignedOutForUserSwitch,
      Strings.MessageFailSignedOutForUserSwitch
    );

    testInfo.scenario = `${AccountSettingPersistAcrossSessionsStepNames["Step-03"]}`;
    const signedIn = await signInAsUser(Consts.Email, Consts.PasswordText);
    await HomePage.DismissGuideIfPresent();
    await softAssert(
      async () => {
        expect(signedIn).toBe(true);
        await expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 });
      },
      Strings.MessagePassAccountNoOrgUserLoggedIn,
      Strings.MessageFailAccountNoOrgUserLoggedIn
    );

    testInfo.scenario = `${AccountSettingPersistAcrossSessionsStepNames["Step-04"]}`;
    await openAccountSettings(softAssert, testInfo);

    testInfo.scenario = `${AccountSettingPersistAcrossSessionsStepNames["Step-05"]}`;
    await softAssert(
      async () => {
        expect(await SettingsPage.IsSwitchOn(SettingsPage.PushNotificationsSwitch())).toBe(false);
        expect(await SettingsPage.IsSwitchOn(SettingsPage.DoNotSellSwitch())).toBe(true);
      },
      Strings.MessagePassSettingsPersistedAcrossSessions,
      Strings.MessageFailSettingsPersistedAcrossSessions
    );
  });
});
