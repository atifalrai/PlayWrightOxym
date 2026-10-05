import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { AccountPage } from "../Pages/AccountPage.js";
import { OrganizationSettingPage } from "../Pages/OrganizationSettingPage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import {
  OrganizationSettingTestCaseNames,
  OrganizationSettingListStepNames,
  OrganizationSettingCreateStepNames,
  OrganizationSettingDetailStepNames,
  OrganizationSettingEditNameStepNames,
  OrganizationSettingCopyIdStepNames,
  OrganizationSettingTeamNavStepNames,
  OrganizationSettingDeleteStepNames,
} from "../Pages/TestCaseNames.js";

/**
 * Opens Account > Organization Settings and waits for the Organizations list
 * to render. The caller sets testInfo.scenario for its own step labels
 * before and after invoking this, since the step wording differs per test.
 */
async function openOrganizationSettings(softAssert, testInfo, openStepLabel, verifyStepLabel) {
  await HomePage.DismissGuideIfPresent();
  await AccountPage.OpenAccountTab();
  await HomePage.DismissGuideIfPresent();

  testInfo.scenario = openStepLabel;
  await ControlUtils.ResilientClick(AccountPage.OrganizationSettingsMenuButton());

  testInfo.scenario = verifyStepLabel;
  await softAssert(
    async () => expect(OrganizationSettingPage.CreateNewOrganizationButton()).toBeVisible({ timeout: 30000 }),
    Strings.MessagePassOrganizationSettingsOpened,
    Strings.MessageFailOrganizationSettingsOpened
  );
}

/** Opens Organization Settings and drills into the given organization's Detail page. */
async function openOrganizationDetail(softAssert, testInfo, orgName = Consts.OrganizationName) {
  await openOrganizationSettings(
    softAssert,
    testInfo,
    OrganizationSettingDetailStepNames["Step-01"],
    OrganizationSettingDetailStepNames["Step-01"]
  );

  testInfo.scenario = `${OrganizationSettingDetailStepNames["Step-02"]}`;
  await OrganizationSettingPage.OpenOrganization(orgName);
  await softAssert(
    async () => expect(OrganizationSettingPage.EditOrganizationNameButton()).toBeVisible({ timeout: 30000 }),
    Strings.MessagePassOrganizationDetailOpened,
    Strings.MessageFailOrganizationDetailOpened
  );
  // The edit button renders before the name paragraph's own data fetch
  // resolves - wait for it so callers don't race an empty/stale name.
  await OrganizationSettingPage.WaitForOrganizationNameLoaded();
}

/**
 * Organization Settings and its Detail page replace the tabbed shell
 * entirely, hiding the bottom nav that LoginFlow.SignOut() (run by every
 * afterEach) depends on. Every test must call this before returning -
 * including on a failure path - so sign-out in afterEach can still run.
 */
async function returnToAccountScreen() {
  await OrganizationSettingPage.ReturnToAccountScreen(AccountPage.AccountOptionsNav());
}

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("--OXYM-- Organization Settings Module Test Suite", () => {
  test(`TC-OXYM-ORGSET-01: ${OrganizationSettingTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    try {
      await openOrganizationSettings(
        softAssert,
        testInfo,
        OrganizationSettingListStepNames["Step-01"],
        OrganizationSettingListStepNames["Step-02"]
      );

      testInfo.scenario = `${OrganizationSettingListStepNames["Step-03"]}`;
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationCard(Consts.OrganizationName)).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassOrganizationListedForAdmin,
        Strings.MessageFailOrganizationListedForAdmin
      );

      testInfo.scenario = `${OrganizationSettingListStepNames["Step-04"]}`;
      await softAssert(
        async () => expect(OrganizationSettingPage.CreateNewOrganizationButton()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassCreateOrganizationButtonVisible,
        Strings.MessageFailCreateOrganizationButtonVisible
      );
    } finally {
      await returnToAccountScreen();
    }
  });

  test(`TC-OXYM-ORGSET-02: ${OrganizationSettingTestCaseNames["TC-02"]}`, async ({ softAssert }, testInfo) => {
    try {
      await openOrganizationSettings(
        softAssert,
        testInfo,
        OrganizationSettingCreateStepNames["Step-01"],
        OrganizationSettingCreateStepNames["Step-01"]
      );

      const orgName = Consts.getDisposableOrganizationName();

      testInfo.scenario = `${OrganizationSettingCreateStepNames["Step-02"]}`;
      await ControlUtils.ResilientClick(OrganizationSettingPage.CreateNewOrganizationButton());
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationNameTextbox()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassCreateOrganizationFormOpened,
        Strings.MessageFailCreateOrganizationFormOpened
      );

      testInfo.scenario = `${OrganizationSettingCreateStepNames["Step-03"]}`;
      await ControlUtils.Fill(OrganizationSettingPage.OrganizationNameTextbox(), orgName);
      await softAssert(
        async () => expect(await ControlUtils.GetInputValue(OrganizationSettingPage.OrganizationNameTextbox())).toBe(orgName),
        Strings.MessagePassOrganizationTitleEntered,
        Strings.MessageFailOrganizationTitleEntered
      );

      testInfo.scenario = `${OrganizationSettingCreateStepNames["Step-04"]}`;
      await ControlUtils.ResilientClick(OrganizationSettingPage.SubmitButton());
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationCreatedToast()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassOrganizationCreated,
        Strings.MessageFailOrganizationCreated
      );

      // Submitting lands directly on the new organization's Detail page, not
      // back on the Organizations list (confirmed via live DOM snapshot) -
      // go back a level before checking that the list shows it.
      testInfo.scenario = `${OrganizationSettingCreateStepNames["Step-05"]}`;
      await ControlUtils.ResilientClick(OrganizationSettingPage.GoBackButton());
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationCard(orgName)).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassNewOrganizationVisibleInList,
        Strings.MessageFailNewOrganizationVisibleInList
      );
    } finally {
      await returnToAccountScreen();
    }
  });

  test(`TC-OXYM-ORGSET-03: ${OrganizationSettingTestCaseNames["TC-03"]}`, async ({ softAssert }, testInfo) => {
    try {
      await openOrganizationDetail(softAssert, testInfo);

      // Checked individually (rather than one combined assertion) so a
      // failure pinpoints exactly which element is missing instead of just
      // reporting "one of these four is wrong".
      testInfo.scenario = `${OrganizationSettingDetailStepNames["Step-03"]}`;
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationNameText(Consts.OrganizationName)).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassOrganizationDetailNameVisible,
        Strings.MessageFailOrganizationDetailNameVisible
      );
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationIdLabel()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassOrganizationDetailIdVisible,
        Strings.MessageFailOrganizationDetailIdVisible
      );
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationAdminsSectionHeading()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassOrganizationDetailAdminsVisible,
        Strings.MessageFailOrganizationDetailAdminsVisible
      );
      await softAssert(
        async () => expect(OrganizationSettingPage.TeamsSectionHeading()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassOrganizationDetailTeamsVisible,
        Strings.MessageFailOrganizationDetailTeamsVisible
      );
    } finally {
      await returnToAccountScreen();
    }
  });

  test(`TC-OXYM-ORGSET-04: ${OrganizationSettingTestCaseNames["TC-04"]}`, async ({ softAssert }, testInfo) => {
    try {
      await openOrganizationDetail(softAssert, testInfo);

      // Capture whatever the organization is actually named right now rather
      // than assuming Consts.OrganizationName - the shared org has already
      // drifted once (renamed to "Cinnova Testingt" in a prior manual
      // session), so restoring to a hardcoded value could just be wrong again.
      const originalName = (await OrganizationSettingPage.GetOrganizationDetailName())?.trim();

      try {
        testInfo.scenario = `${OrganizationSettingEditNameStepNames["Step-02"]}`;
        await OrganizationSettingPage.OpenEditFormAndClear();
        await softAssert(
          async () => expect(await ControlUtils.GetInputValue(OrganizationSettingPage.OrganizationNameTextbox())).toBe(""),
          Strings.MessagePassOrganizationNameCleared,
          Strings.MessageFailOrganizationNameCleared
        );

        testInfo.scenario = `${OrganizationSettingEditNameStepNames["Step-03"]}`;
        await ControlUtils.ResilientClick(OrganizationSettingPage.SubmitButton());
        await softAssert(
          async () => {
            const stillOnForm = await OrganizationSettingPage.OrganizationNameTextbox().isVisible({ timeout: 5000 }).catch(() => false);
            const validationVisible = await OrganizationSettingPage.ValidationErrorText().isVisible({ timeout: 5000 }).catch(() => false);
            expect(stillOnForm || validationVisible).toBe(true);
          },
          Strings.MessagePassOrganizationNameValidationShown,
          Strings.MessageFailOrganizationNameValidationShown
        );

        testInfo.scenario = `${OrganizationSettingEditNameStepNames["Step-04"]}`;
        await ControlUtils.Clear(OrganizationSettingPage.OrganizationNameTextbox());
        await ControlUtils.Fill(OrganizationSettingPage.OrganizationNameTextbox(), Consts.OrganizationNameEdited);
        await ControlUtils.ResilientClick(OrganizationSettingPage.SubmitButton());

        testInfo.scenario = `${OrganizationSettingEditNameStepNames["Step-05"]}`;
        await softAssert(
          async () => {
            await expect(OrganizationSettingPage.OrganizationRenamedToast()).toBeVisible({ timeout: 30000 });
            await expect(OrganizationSettingPage.OrganizationNameText(Consts.OrganizationNameEdited)).toBeVisible({ timeout: 30000 });
          },
          Strings.MessagePassOrganizationRenamed,
          Strings.MessageFailOrganizationRenamed
        );
      } finally {
        // Always restore the shared organization's original name, even on
        // assertion failure - every other spec depends on it existing.
        testInfo.scenario = `${OrganizationSettingEditNameStepNames["Step-06"]}`;
        const restoreName = originalName || Consts.OrganizationName;
        await OrganizationSettingPage.SetOrganizationName(restoreName);
        await softAssert(
          async () => expect(OrganizationSettingPage.OrganizationNameText(restoreName)).toBeVisible({ timeout: 30000 }),
          Strings.MessagePassOrganizationNameRestored,
          Strings.MessageFailOrganizationNameRestored
        );
      }
    } finally {
      await returnToAccountScreen();
    }
  });

  test(`TC-OXYM-ORGSET-05: ${OrganizationSettingTestCaseNames["TC-05"]}`, async ({ softAssert }, testInfo) => {
    try {
      await openOrganizationDetail(softAssert, testInfo);

      const displayedId = await OrganizationSettingPage.GetDisplayedOrganizationId();

      testInfo.scenario = `${OrganizationSettingCopyIdStepNames["Step-02"]}`;
      // Must be granted BEFORE the click: the app's own click handler writes
      // to the clipboard, and without "clipboard-write" already in place that
      // write can fail silently in-page - which would also explain no toast.
      await OrganizationSettingPage.GrantClipboardPermissions();
      await ControlUtils.ResilientClick(OrganizationSettingPage.CopyOrganizationIdButton());

      testInfo.scenario = `${OrganizationSettingCopyIdStepNames["Step-03"]}`;
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationIdCopiedToast()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassOrganizationIdCopiedToastVisible,
        Strings.MessageFailOrganizationIdCopiedToastVisible
      );

      testInfo.scenario = `${OrganizationSettingCopyIdStepNames["Step-04"]}`;
      await softAssert(
        async () => {
          expect(displayedId).toBeTruthy();
          const clipboardText = await OrganizationSettingPage.ReadClipboardText();
          expect(clipboardText).toBe(displayedId);
        },
        Strings.MessagePassClipboardMatchesOrganizationId,
        Strings.MessageFailClipboardMatchesOrganizationId
      );
    } finally {
      await returnToAccountScreen();
    }
  });

  test(`TC-OXYM-ORGSET-06: ${OrganizationSettingTestCaseNames["TC-06"]}`, async ({ softAssert }, testInfo) => {
    try {
      await openOrganizationDetail(softAssert, testInfo);

      testInfo.scenario = `${OrganizationSettingTeamNavStepNames["Step-02"]}`;
      const teamsCount = await OrganizationSettingPage.GetTeamsCount();

      if (teamsCount === 0) {
        testInfo.scenario = `${OrganizationSettingTeamNavStepNames["Step-03"]}`;
        await softAssert(
          async () => expect(OrganizationSettingPage.NoTeamsMessage()).toBeVisible({ timeout: 15000 }),
          Strings.MessagePassNoTeamsListedForOrganization,
          Strings.MessagePassNoTeamsListedForOrganization
        );
        return;
      }

      testInfo.scenario = `${OrganizationSettingTeamNavStepNames["Step-04"]}`;
      // Skip any row whose name collides with the organization's own name -
      // clicking that specific row was the one observed to bounce back to
      // Organization Details right after landing on the team screen.
      const teamRow = await OrganizationSettingPage.GetPreferredTeamRow(Consts.OrganizationName);
      const teamRowVisible = await teamRow.isVisible({ timeout: 15000 }).catch(() => false);
      if (!teamRowVisible) {
        await softAssert(
          async () => expect(teamRowVisible).toBe(true),
          Strings.MessagePassTeamHomePageOpened,
          Strings.MessageFailNoTeamRowClickable
        );
        return;
      }
      await ControlUtils.ResilientClick(teamRow);

      testInfo.scenario = `${OrganizationSettingTeamNavStepNames["Step-05"]}`;
      await softAssert(
        async () => {
          await global.page.waitForURL(/team-screen/, { timeout: 30000 });
          // Confirm the navigation actually sticks rather than bouncing back
          // to Organization Details a moment later.
          await global.page.waitForTimeout(2000);
          await expect(global.page).toHaveURL(/team-screen/);
        },
        Strings.MessagePassTeamHomePageOpened,
        Strings.MessageFailTeamHomePageOpened
      );
    } finally {
      await returnToAccountScreen();
    }
  });

  test(`TC-OXYM-ORGSET-07: ${OrganizationSettingTestCaseNames["TC-07"]}`, async ({ softAssert }, testInfo) => {
    try {
      await openOrganizationSettings(
        softAssert,
        testInfo,
        OrganizationSettingDeleteStepNames["Step-01"],
        OrganizationSettingDeleteStepNames["Step-01"]
      );

      const orgName = Consts.getDisposableOrganizationName();

      // Creating an organization lands directly on its Detail page (confirmed
      // via live DOM snapshot), so there is no separate "open it" step.
      testInfo.scenario = `${OrganizationSettingDeleteStepNames["Step-01"]}`;
      await OrganizationSettingPage.CreateOrganization(orgName);
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationNameText(orgName)).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassDisposableOrganizationCreated,
        Strings.MessageFailDisposableOrganizationCreated
      );

      testInfo.scenario = `${OrganizationSettingDeleteStepNames["Step-02"]}`;
      await softAssert(
        async () => expect(OrganizationSettingPage.EditOrganizationNameButton()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassOrganizationDetailOpened,
        Strings.MessageFailOrganizationDetailOpened
      );

      testInfo.scenario = `${OrganizationSettingDeleteStepNames["Step-03"]}`;
      await ControlUtils.ResilientClick(OrganizationSettingPage.DeleteOrganizationMenuButton());

      testInfo.scenario = `${OrganizationSettingDeleteStepNames["Step-04"]}`;
      await softAssert(
        async () => {
          await expect(OrganizationSettingPage.DeleteOrganizationHeading()).toBeVisible({ timeout: 15000 });
          await expect(OrganizationSettingPage.DeleteOrganizationTeamsWarningText()).toBeVisible({ timeout: 15000 });
        },
        Strings.MessagePassDeleteOrganizationConfirmVisible,
        Strings.MessageFailDeleteOrganizationConfirmVisible
      );

      testInfo.scenario = `${OrganizationSettingDeleteStepNames["Step-05"]}`;
      await ControlUtils.ResilientClick(OrganizationSettingPage.ConfirmDeleteOrganizationButton());

      testInfo.scenario = `${OrganizationSettingDeleteStepNames["Step-06"]}`;
      await softAssert(
        async () => expect(OrganizationSettingPage.OrganizationCard(orgName)).not.toBeVisible({ timeout: 30000 }),
        Strings.MessagePassOrganizationDeleted,
        Strings.MessageFailOrganizationDeleted
      );
    } finally {
      await returnToAccountScreen();
    }
  });
});
