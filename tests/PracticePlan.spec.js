import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { PracticePlanPage } from "../Pages/PracticePlanPage.js";
import { SchedulePage } from "../Pages/SchedulePage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import { LoginFlow } from "../Flows/LoginFlow.js";
import { PracticePlanTestCaseNames } from "../Pages/TestCaseNames.js";
import { AppFlow } from "../Flows/AppFlow.js";

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("--OXYM-- Practice Plan Module Test Suite", () => {
  test(`TC-OXYM-PP-01: ${PracticePlanTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a Practice Plan";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(PracticePlanPage.PracticePlansTab());
     await softAssert(
       async () => {},
       (await HomePage.DismissGuideIfPresent())
         ? Strings.MessagePassPracticeGuideDismissed
         : Strings.MessagePassPracticeGuideNotShown,
       Strings.MessageFailGuideHandling
     );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlansHeading()).toBeVisible(),
      Strings.MessagePassPracticePlansTabOpened,
      Strings.MessageFailPracticePlansTabOpened
    );
    await ControlUtils.Click(PracticePlanPage.AddPracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.AddNewPracticePlanOption());
    await ControlUtils.Click(PracticePlanPage.PracticePlanTitleInput());
    await ControlUtils.Fill(PracticePlanPage.PracticePlanTitleInput(), Consts.PracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toHaveValue(Consts.PracticePlanTitle),
      Strings.MessagePassPracticePlanTitleEntered,
      Strings.MessageFailPracticePlanTitleEntered
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanCreatedToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanCreated,
      Strings.MessageFailPracticePlanCreated
    );

    testInfo.scenario = "SC-2: Verify Practice Plan Appears in Recent Section and List";
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetVisible,
      Strings.MessageFailNoDrillsYetVisible
    );
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await ControlUtils.Click(PracticePlanPage.RecentTab());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanCardInSwiper(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanInRecentVisible,
      Strings.MessageFailPracticePlanInRecentVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanListItem(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanInListVisible,
      Strings.MessageFailPracticePlanInListVisible
    );

    testInfo.scenario = "SC-3: Delete Practice Plan";
    await ControlUtils.Click(PracticePlanPage.PracticePlanOptionsMenu(Consts.PracticePlanTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteOptionVisible,
      Strings.MessageFailDeleteOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.ConfirmDeleteButton()).toBeVisible(),
      Strings.MessagePassDeletePracticePlanModalOpened,
      Strings.MessageFailDeletePracticePlanModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanDeletedToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanDeleted,
      Strings.MessageFailPracticePlanDeleted
    );
  });

  test(`TC-OXYM-PP-02: ${PracticePlanTestCaseNames["TC-02"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a Practice Plan Folder";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(PracticePlanPage.PracticePlansTab());
    await softAssert(
      async () => {},
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassPracticeGuideDismissed
        : Strings.MessagePassPracticeGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlansHeading()).toBeVisible(),
      Strings.MessagePassPracticePlansTabOpened,
      Strings.MessageFailPracticePlansTabOpened
    );
    await ControlUtils.Click(PracticePlanPage.AddPracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.AddNewFolderOption());
    await ControlUtils.Click(PracticePlanPage.FolderTitleInput());
    await softAssert(
      async () => expect(PracticePlanPage.AddNewFolderHeading()).toBeVisible(),
      Strings.MessagePassAddNewFolderFormOpened,
      Strings.MessageFailAddNewFolderFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.FolderTitleInput(), Consts.PracticePlanFolderTitle);
    await softAssert(
      async () => expect(PracticePlanPage.FolderTitleInput()).toHaveValue(Consts.PracticePlanFolderTitle),
      Strings.MessagePassFolderTitleEntered,
      Strings.MessageFailFolderTitleEntered
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.FolderCreatedToast(Consts.PracticePlanFolderTitle)).toBeVisible(),
      Strings.MessagePassFolderCreated,
      Strings.MessageFailFolderCreated
    );

    testInfo.scenario = "SC-2: Create a Practice Plan Inside a Folder";
    await softAssert(
      async () => expect(PracticePlanPage.NoPracticePlansYetHeading()).toBeVisible(),
      Strings.MessagePassNoPracticePlansYetVisible,
      Strings.MessageFailNoPracticePlansYetVisible
    );
    await ControlUtils.Click(PracticePlanPage.CreatePracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.PracticePlanTitleInput());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toBeVisible(),
      Strings.MessagePassAddNewPracticePlanFormOpened,
      Strings.MessageFailAddNewPracticePlanFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.PracticePlanTitleInput(), Consts.PracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toHaveValue(Consts.PracticePlanTitle),
      Strings.MessagePassPracticePlanTitleEnteredInFolder,
      Strings.MessageFailPracticePlanTitleEnteredInFolder
    );
    await ControlUtils.Click(PracticePlanPage.SaveToFolderToggle());
    await softAssert(
      async () => expect(PracticePlanPage.SelectFolderHeading()).toBeVisible(),
      Strings.MessagePassSelectFolderHeadingVisible,
      Strings.MessageFailSelectFolderHeadingVisible
    );
    await ControlUtils.Click(PracticePlanPage.FolderOption(Consts.PracticePlanFolderTitle));
    await softAssert(
      async () => expect(PracticePlanPage.SelectFolderHeading()).not.toBeVisible(),
      Strings.MessagePassFolderSelected,
      Strings.MessageFailFolderSelected
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await ControlUtils.Click(PracticePlanPage.NoDrillsYetHeading());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanCreatedInFolderToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanCreatedInFolder,
      Strings.MessageFailPracticePlanCreatedInFolder
    );

    testInfo.scenario = "SC-3: Verify Practice Plan Listed Within Practice Plan Folder and Visible in List";
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetInFolderVisible,
      Strings.MessageFailNoDrillsYetInFolderVisible
    );
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).not.toBeVisible(),
      Strings.MessagePassNoDrillsYetInFolderNotVisible,
      Strings.MessageFailNoDrillsYetInFolderNotVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.FolderInList(Consts.PracticePlanFolderTitle)).toBeVisible(),
      Strings.MessagePassFolderVisibleInList,
      Strings.MessageFailFolderVisibleInList
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanInFolderList(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanInFolderListVisible,
      Strings.MessageFailPracticePlanInFolderListVisible
    );
    await ControlUtils.Click(PracticePlanPage.FolderInList(Consts.PracticePlanFolderTitle));

    testInfo.scenario = "SC-4: Delete Practice Plan Folder";
    await ControlUtils.Click(PracticePlanPage.FolderOptionsMenu(Consts.PracticePlanFolderTitle));
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteFolderOptionVisible,
      Strings.MessageFailDeleteFolderOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.ConfirmDeleteButton()).toBeVisible(),
      Strings.MessagePassDeleteFolderModalOpened,
      Strings.MessageFailDeleteFolderModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.FolderDeletedToast(Consts.PracticePlanFolderTitle)).toBeVisible(),
      Strings.MessagePassFolderDeleted,
      Strings.MessageFailFolderDeleted
    );
  });

  test(`TC-OXYM-PP-03: ${PracticePlanTestCaseNames["TC-03"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a Practice Plan Folder";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(PracticePlanPage.PracticePlansTab());
    await softAssert(
      async () => {},
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassPracticeGuideDismissed
        : Strings.MessagePassPracticeGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlansHeading()).toBeVisible(),
      Strings.MessagePassPracticePlansTabOpened,
      Strings.MessageFailPracticePlansTabOpened
    );
    await ControlUtils.Click(PracticePlanPage.AddPracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.AddNewFolderOption());
    await ControlUtils.Click(PracticePlanPage.FolderTitleInput());
    await softAssert(
      async () => expect(PracticePlanPage.AddNewFolderHeading()).toBeVisible(),
      Strings.MessagePassAddNewFolderFormOpened,
      Strings.MessageFailAddNewFolderFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.FolderTitleInput(), Consts.PracticePlanFolderTitle);
    await softAssert(
      async () => expect(PracticePlanPage.FolderTitleInput()).toHaveValue(Consts.PracticePlanFolderTitle),
      Strings.MessagePassFolderTitleEntered,
      Strings.MessageFailFolderTitleEntered
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.FolderCreatedToast(Consts.PracticePlanFolderTitle)).toBeVisible(),
      Strings.MessagePassFolderCreated,
      Strings.MessageFailFolderCreated
    );

    testInfo.scenario = "SC-2: Create a Practice Plan Inside a Folder";
    await softAssert(
      async () => expect(PracticePlanPage.NoPracticePlansYetHeading()).toBeVisible(),
      Strings.MessagePassNoPracticePlansYetVisible,
      Strings.MessageFailNoPracticePlansYetVisible
    );
    await ControlUtils.Click(PracticePlanPage.CreatePracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.PracticePlanTitleInput());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toBeVisible(),
      Strings.MessagePassAddNewPracticePlanFormOpened,
      Strings.MessageFailAddNewPracticePlanFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.PracticePlanTitleInput(), Consts.PracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toHaveValue(Consts.PracticePlanTitle),
      Strings.MessagePassPracticePlanTitleEnteredInFolder,
      Strings.MessageFailPracticePlanTitleEnteredInFolder
    );
    await ControlUtils.Click(PracticePlanPage.SaveToFolderToggle());
    await softAssert(
      async () => expect(PracticePlanPage.SelectFolderHeading()).toBeVisible(),
      Strings.MessagePassSelectFolderHeadingVisible,
      Strings.MessageFailSelectFolderHeadingVisible
    );
    await ControlUtils.Click(PracticePlanPage.FolderOption(Consts.PracticePlanFolderTitle));
    await softAssert(
      async () => expect(PracticePlanPage.SelectFolderHeading()).not.toBeVisible(),
      Strings.MessagePassFolderSelected,
      Strings.MessageFailFolderSelected
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanCreatedInFolderToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanCreatedInFolder,
      Strings.MessageFailPracticePlanCreatedInFolder
    );

    testInfo.scenario = "SC-3: Verify Practice Plan Listed Within Practice Plan Folder and Visible in List";
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetInFolderVisible,
      Strings.MessageFailNoDrillsYetInFolderVisible
    );
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).not.toBeVisible(),
      Strings.MessagePassNoDrillsYetInFolderNotVisible,
      Strings.MessageFailNoDrillsYetInFolderNotVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.FolderInList(Consts.PracticePlanFolderTitle)).toBeVisible(),
      Strings.MessagePassFolderVisibleInList,
      Strings.MessageFailFolderVisibleInList
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanInFolderList(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanInFolderListVisible,
      Strings.MessageFailPracticePlanInFolderListVisible
    );

    testInfo.scenario = "SC-4: Rename Practice Plan within Folder";
    await ControlUtils.Click(PracticePlanPage.PracticePlanOptionsMenu(Consts.PracticePlanTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.RenameOption());
    await softAssert(
      async () => expect(PracticePlanPage.RenameOption()).toBeVisible(),
      Strings.MessagePassRenamePracticePlanOptionVisible,
      Strings.MessageFailRenamePracticePlanOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.RenameOption());
    await ControlUtils.Click(PracticePlanPage.PracticePlanNameInput());
    await ControlUtils.WaitForVisible(PracticePlanPage.RenamePracticePlanHeading());
    await softAssert(
      async () => expect(PracticePlanPage.RenamePracticePlanHeading()).toBeVisible(),
      Strings.MessagePassRenamePracticePlanFormOpened,
      Strings.MessageFailRenamePracticePlanFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.PracticePlanNameInput(), Consts.UpdatedPracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanNameInput()).toHaveValue(Consts.UpdatedPracticePlanTitle),
      Strings.MessagePassUpdatedPracticePlanNameEntered,
      Strings.MessageFailUpdatedPracticePlanNameEntered
    );
    await ControlUtils.Click(PracticePlanPage.RenameButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanRenamedToast()).toBeVisible(),
      Strings.MessagePassPracticePlanRenamed,
      Strings.MessageFailPracticePlanRenamed
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanInFolderList(Consts.UpdatedPracticePlanTitle)).toBeVisible(),
      Strings.MessagePassUpdatedPracticePlanVisible,
      Strings.MessageFailUpdatedPracticePlanVisible
    );

    testInfo.scenario = "SC-5: Rename Practice Plan Folder";
    await ControlUtils.Click(PracticePlanPage.FolderInList(Consts.PracticePlanFolderTitle));
    await ControlUtils.Click(PracticePlanPage.FolderOptionsMenu(Consts.PracticePlanFolderTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.RenameOption());
    await softAssert(
      async () => expect(PracticePlanPage.RenameOption()).toBeVisible(),
      Strings.MessagePassRenameFolderOptionVisible,
      Strings.MessageFailRenameFolderOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.RenameOption());
    await ControlUtils.Click(PracticePlanPage.FolderNameInput());
    await ControlUtils.WaitForVisible(PracticePlanPage.RenameFolderHeading());
    await softAssert(
      async () => expect(PracticePlanPage.RenameFolderHeading()).toBeVisible(),
      Strings.MessagePassRenameFolderFormOpened,
      Strings.MessageFailRenameFolderFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.FolderNameInput(), Consts.UpdatedPracticePlanFolderTitle);
    await softAssert(
      async () => expect(PracticePlanPage.FolderNameInput()).toHaveValue(Consts.UpdatedPracticePlanFolderTitle),
      Strings.MessagePassUpdatedFolderNameEntered,
      Strings.MessageFailUpdatedFolderNameEntered
    );
    await ControlUtils.Click(PracticePlanPage.RenameButton());
    await softAssert(
      async () => expect(PracticePlanPage.FolderRenamedToast()).toBeVisible(),
      Strings.MessagePassFolderRenamed,
      Strings.MessageFailFolderRenamed
    );
    await softAssert(
      async () => expect(PracticePlanPage.FolderInList(Consts.UpdatedPracticePlanFolderTitle)).toBeVisible(),
      Strings.MessagePassUpdatedFolderVisible,
      Strings.MessageFailUpdatedFolderVisible
    );

    testInfo.scenario = "SC-6: Delete Updated Practice Plan Folder";
    await ControlUtils.Click(PracticePlanPage.FolderOptionsMenu(Consts.UpdatedPracticePlanFolderTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteFolderOptionVisible,
      Strings.MessageFailDeleteFolderOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.ConfirmDeleteButton()).toBeVisible(),
      Strings.MessagePassDeleteFolderModalOpened,
      Strings.MessageFailDeleteFolderModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.FolderDeletedToast(Consts.UpdatedPracticePlanFolderTitle)).toBeVisible(),
      Strings.MessagePassFolderDeleted,
      Strings.MessageFailFolderDeleted
    );
  });

  test(`TC-OXYM-PP-04: ${PracticePlanTestCaseNames["TC-04"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a Practice Plan";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(PracticePlanPage.PracticePlansTab());
    await softAssert(
      async () => {},
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassPracticeGuideDismissed
        : Strings.MessagePassPracticeGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlansHeading()).toBeVisible(),
      Strings.MessagePassPracticePlansTabOpened,
      Strings.MessageFailPracticePlansTabOpened
    );
    await ControlUtils.Click(PracticePlanPage.AddPracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.AddNewPracticePlanOption());
    await ControlUtils.Click(PracticePlanPage.PracticePlanTitleInput());
    await ControlUtils.Fill(PracticePlanPage.PracticePlanTitleInput(), Consts.PracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toHaveValue(Consts.PracticePlanTitle),
      Strings.MessagePassPracticePlanTitleEntered,
      Strings.MessageFailPracticePlanTitleEntered
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanCreatedToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanCreated,
      Strings.MessageFailPracticePlanCreated
    );
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetVisible,
      Strings.MessageFailNoDrillsYetVisible
    );

    testInfo.scenario = "SC-2: Search Practice Plan";
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await ControlUtils.Click(PracticePlanPage.SearchInput());
    await softAssert(
      async () => expect(PracticePlanPage.SearchInput()).toBeVisible(),
      Strings.MessagePassSearchInputVisible,
      Strings.MessageFailSearchInputVisible
    );
    await ControlUtils.Fill(PracticePlanPage.SearchInput(), Consts.PracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.SearchInput()).toHaveValue(Consts.PracticePlanTitle),
      Strings.MessagePassSearchTextEntered,
      Strings.MessageFailSearchTextEntered
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanInFolderList(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassSearchedPracticePlanVisible,
      Strings.MessageFailSearchedPracticePlanVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.SearchResultItems()).toHaveCount(1),
      Strings.MessagePassOnlyOneResultVisible,
      Strings.MessageFailOnlyOneResultVisible
    );

    testInfo.scenario = "SC-3: Clear Search and Verify Full List Restored";
    await ControlUtils.Click(PracticePlanPage.SearchClearButton());
    await softAssert(
      async () => expect(PracticePlanPage.SearchInput()).toHaveValue(''),
      Strings.MessagePassSearchInputCleared,
      Strings.MessageFailSearchInputCleared
    );
    await softAssert(
      async () => expect(await PracticePlanPage.SearchResultItems().count()).toBeGreaterThan(1),
      Strings.MessagePassMultipleItemsVisible,
      Strings.MessageFailMultipleItemsVisible
    );

    testInfo.scenario = "SC-4: Delete Practice Plan";
    await ControlUtils.Click(PracticePlanPage.PracticePlanOptionsMenu(Consts.PracticePlanTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteOptionVisible,
      Strings.MessageFailDeleteOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.ConfirmDeleteButton()).toBeVisible(),
      Strings.MessagePassDeletePracticePlanModalOpened,
      Strings.MessageFailDeletePracticePlanModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanDeletedToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanDeleted,
      Strings.MessageFailPracticePlanDeleted
    );
  });

  test(`TC-OXYM-PP-05: ${PracticePlanTestCaseNames["TC-05"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a Practice Plan Folder";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(PracticePlanPage.PracticePlansTab());
    await softAssert(
      async () => {},
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassPracticeGuideDismissed
        : Strings.MessagePassPracticeGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlansHeading()).toBeVisible(),
      Strings.MessagePassPracticePlansTabOpened,
      Strings.MessageFailPracticePlansTabOpened
    );
    await ControlUtils.Click(PracticePlanPage.AddPracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.AddNewFolderOption());
    await ControlUtils.Click(PracticePlanPage.FolderTitleInput());
    await softAssert(
      async () => expect(PracticePlanPage.AddNewFolderHeading()).toBeVisible(),
      Strings.MessagePassAddNewFolderFormOpened,
      Strings.MessageFailAddNewFolderFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.FolderTitleInput(), Consts.PracticePlanFolderTitle);
    await softAssert(
      async () => expect(PracticePlanPage.FolderTitleInput()).toHaveValue(Consts.PracticePlanFolderTitle),
      Strings.MessagePassFolderTitleEntered,
      Strings.MessageFailFolderTitleEntered
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.FolderCreatedToast(Consts.PracticePlanFolderTitle)).toBeVisible(),
      Strings.MessagePassFolderCreated,
      Strings.MessageFailFolderCreated
    );

    testInfo.scenario = "SC-2: Create First Practice Plan Inside the Folder";
    await softAssert(
      async () => expect(PracticePlanPage.NoPracticePlansYetHeading()).toBeVisible(),
      Strings.MessagePassNoPracticePlansYetVisible,
      Strings.MessageFailNoPracticePlansYetVisible
    );
    await ControlUtils.Click(PracticePlanPage.CreatePracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.PracticePlanTitleInput());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toBeVisible(),
      Strings.MessagePassAddNewPracticePlanFormOpened,
      Strings.MessageFailAddNewPracticePlanFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.PracticePlanTitleInput(), Consts.PracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toHaveValue(Consts.PracticePlanTitle),
      Strings.MessagePassPracticePlanTitleEnteredInFolder,
      Strings.MessageFailPracticePlanTitleEnteredInFolder
    );
    await ControlUtils.Click(PracticePlanPage.SaveToFolderToggle());
    await softAssert(
      async () => expect(PracticePlanPage.SelectFolderHeading()).toBeVisible(),
      Strings.MessagePassSelectFolderHeadingVisible,
      Strings.MessageFailSelectFolderHeadingVisible
    );
    await ControlUtils.Click(PracticePlanPage.FolderOption(Consts.PracticePlanFolderTitle));
    await softAssert(
      async () => expect(PracticePlanPage.SelectFolderHeading()).not.toBeVisible(),
      Strings.MessagePassFolderSelected,
      Strings.MessageFailFolderSelected
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanCreatedInFolderToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanCreatedInFolder,
      Strings.MessageFailPracticePlanCreatedInFolder
    );
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetInFolderVisible,
      Strings.MessageFailNoDrillsYetInFolderVisible
    );

    testInfo.scenario = "SC-3: Create Second Practice Plan Inside the Folder";
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanInFolderList(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassFirstPlanVisibleBeforeSecond,
      Strings.MessageFailFirstPlanVisibleBeforeSecond
    );
    await ControlUtils.Click(PracticePlanPage.AddPracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.AddNewPracticePlanOption());
    await ControlUtils.Click(PracticePlanPage.PracticePlanTitleInput());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toBeVisible(),
      Strings.MessagePassAddNewPracticePlanFormOpened,
      Strings.MessageFailAddNewPracticePlanFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.PracticePlanTitleInput(), Consts.PracticePlanTitle2);
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toHaveValue(Consts.PracticePlanTitle2),
      Strings.MessagePassSecondPracticePlanTitleEntered,
      Strings.MessageFailSecondPracticePlanTitleEntered
    );
    await ControlUtils.Click(PracticePlanPage.SaveToFolderToggle());
    await softAssert(
      async () => expect(PracticePlanPage.SelectFolderHeading()).toBeVisible(),
      Strings.MessagePassSelectFolderHeadingVisible,
      Strings.MessageFailSelectFolderHeadingVisible
    );
    await ControlUtils.Click(PracticePlanPage.FolderOption(Consts.PracticePlanFolderTitle));
    await softAssert(
      async () => expect(PracticePlanPage.SelectFolderHeading()).not.toBeVisible(),
      Strings.MessagePassFolderSelected,
      Strings.MessageFailFolderSelected
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanCreatedInFolderToast(Consts.PracticePlanTitle2)).toBeVisible(),
      Strings.MessagePassSecondPracticePlanCreatedInFolder,
      Strings.MessageFailSecondPracticePlanCreatedInFolder
    );
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetInFolderVisible,
      Strings.MessageFailNoDrillsYetInFolderVisible
    );

    testInfo.scenario = "SC-4: Search Practice Plan within Folder";
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await ControlUtils.Click(PracticePlanPage.SearchInput());
    await softAssert(
      async () => expect(PracticePlanPage.SearchInput()).toBeVisible(),
      Strings.MessagePassSearchInputVisible,
      Strings.MessageFailSearchInputVisible
    );
    await ControlUtils.Fill(PracticePlanPage.SearchInput(), Consts.PracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.SearchInput()).toHaveValue(Consts.PracticePlanTitle),
      Strings.MessagePassSearchTextEntered,
      Strings.MessageFailSearchTextEntered
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanInFolderList(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassSearchedPracticePlanVisible,
      Strings.MessageFailSearchedPracticePlanVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.SearchResultItems()).toHaveCount(1),
      Strings.MessagePassOnlyOneResultVisible,
      Strings.MessageFailOnlyOneResultVisible
    );

    testInfo.scenario = "SC-5: Clear Search and Verify Both Practice Plans Visible";
    await ControlUtils.Click(PracticePlanPage.SearchClearButton());
    await softAssert(
      async () => expect(PracticePlanPage.SearchInput()).toHaveValue(''),
      Strings.MessagePassSearchInputCleared,
      Strings.MessageFailSearchInputCleared
    );
    await softAssert(
      async () => expect(await PracticePlanPage.SearchResultItems().count()).toBe(2),
      Strings.MessagePassTwoPracticePlansVisible,
      Strings.MessageFailTwoPracticePlansVisible
    );

    testInfo.scenario = "SC-6: Delete Practice Plan Folder";
    await ControlUtils.Click(PracticePlanPage.FolderInList(Consts.PracticePlanFolderTitle));
    await ControlUtils.Click(PracticePlanPage.FolderOptionsMenu(Consts.PracticePlanFolderTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteFolderOptionVisible,
      Strings.MessageFailDeleteFolderOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.ConfirmDeleteButton()).toBeVisible(),
      Strings.MessagePassDeleteFolderModalOpened,
      Strings.MessageFailDeleteFolderModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.FolderDeletedToast(Consts.PracticePlanFolderTitle)).toBeVisible(),
      Strings.MessagePassFolderDeleted,
      Strings.MessageFailFolderDeleted
    );
  });

  test(`TC-OXYM-PP-06: ${PracticePlanTestCaseNames["TC-06"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a Practice Plan";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(PracticePlanPage.PracticePlansTab());
    await softAssert(
      async () => {},
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassPracticeGuideDismissed
        : Strings.MessagePassPracticeGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlansHeading()).toBeVisible(),
      Strings.MessagePassPracticePlansTabOpened,
      Strings.MessageFailPracticePlansTabOpened
    );
    await ControlUtils.Click(PracticePlanPage.AddPracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.AddNewPracticePlanOption());
    await ControlUtils.Click(PracticePlanPage.PracticePlanTitleInput());
    await ControlUtils.Fill(PracticePlanPage.PracticePlanTitleInput(), Consts.PracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toHaveValue(Consts.PracticePlanTitle),
      Strings.MessagePassPracticePlanTitleEntered,
      Strings.MessageFailPracticePlanTitleEntered
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanCreatedToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanCreated,
      Strings.MessageFailPracticePlanCreated
    );

    testInfo.scenario = "SC-2: Navigate to Comments Tab and add comment in practice plan";
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetVisible,
      Strings.MessageFailNoDrillsYetVisible
    );
    await ControlUtils.Click(PracticePlanPage.CommentsTab());
    await softAssert(
      async () => expect(PracticePlanPage.CommentsTab()).toBeVisible(),
      Strings.MessagePassCommentsTabVisible,
      Strings.MessageFailCommentsTabVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.ZeroCommentsText()).toBeVisible(),
      Strings.MessagePassZeroCommentsVisible,
      Strings.MessageFailZeroCommentsVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.AddFirstCommentButton()).toBeVisible(),
      Strings.MessagePassAddFirstCommentButtonVisible,
      Strings.MessageFailAddFirstCommentButtonVisible
    );
    await ControlUtils.Click(PracticePlanPage.AddFirstCommentButton());
    await ControlUtils.Click(PracticePlanPage.CommentInput());
    await ControlUtils.WaitForVisible(PracticePlanPage.AddCommentHeading());
    await softAssert(
      async () => expect(PracticePlanPage.AddCommentHeading()).toBeVisible(),
      Strings.MessagePassAddCommentFormOpened,
      Strings.MessageFailAddCommentFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.CommentInput(), Consts.PracticePlanComment);
    await softAssert(
      async () => expect(PracticePlanPage.CommentInput()).toHaveValue(Consts.PracticePlanComment),
      Strings.MessagePassCommentTextEntered,
      Strings.MessageFailCommentTextEntered
    );
    await ControlUtils.Click(PracticePlanPage.AddCommentButton());
    await softAssert(
      async () => expect(PracticePlanPage.CommentAddedToast()).toBeVisible(),
      Strings.MessagePassCommentAdded,
      Strings.MessageFailCommentAdded
    );

    testInfo.scenario = "SC-3: Verify added Comment is Visible in comment tab";
    await softAssert(
      async () => expect(PracticePlanPage.CommentText(Consts.PracticePlanComment)).toBeVisible(),
      Strings.MessagePassCommentTextVisible,
      Strings.MessageFailCommentTextVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.OneCommentText()).toBeVisible(),
      Strings.MessagePassOneCommentVisible,
      Strings.MessageFailOneCommentVisible
    );

    testInfo.scenario = "SC-4: Delete added Comment";
    await ControlUtils.Click(PracticePlanPage.CommentOptionsButton());
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteCommentOptionVisible,
      Strings.MessageFailDeleteCommentOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteCommentModal());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteCommentModal()).toBeVisible(),
      Strings.MessagePassDeleteCommentModalOpened,
      Strings.MessageFailDeleteCommentModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.CommentDeletedToast()).toBeVisible(),
      Strings.MessagePassCommentDeleted,
      Strings.MessageFailCommentDeleted
    );
    await softAssert(
      async () => expect(PracticePlanPage.ZeroCommentsText()).toBeVisible(),
      Strings.MessagePassCommentCountReturnedToZero,
      Strings.MessageFailCommentCountReturnedToZero
    );

    testInfo.scenario = "SC-6: Delete Practice Plan";
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await ControlUtils.Click(PracticePlanPage.PracticePlanOptionsMenu(Consts.PracticePlanTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteOptionVisible,
      Strings.MessageFailDeleteOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.ConfirmDeleteButton()).toBeVisible(),
      Strings.MessagePassDeletePracticePlanModalOpened,
      Strings.MessageFailDeletePracticePlanModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanDeletedToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanDeleted,
      Strings.MessageFailPracticePlanDeleted
    );
  });

  test(`TC-OXYM-PP-07: ${PracticePlanTestCaseNames["TC-07"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a Practice Plan";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(PracticePlanPage.PracticePlansTab());
    await softAssert(
      async () => {},
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassPracticeGuideDismissed
        : Strings.MessagePassPracticeGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlansHeading()).toBeVisible(),
      Strings.MessagePassPracticePlansTabOpened,
      Strings.MessageFailPracticePlansTabOpened
    );
    await ControlUtils.Click(PracticePlanPage.AddPracticePlanButton());
    await ControlUtils.Click(PracticePlanPage.AddNewPracticePlanOption());
    await ControlUtils.Click(PracticePlanPage.PracticePlanTitleInput());
    await ControlUtils.Fill(PracticePlanPage.PracticePlanTitleInput(), Consts.PracticePlanTitle);
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanTitleInput()).toHaveValue(Consts.PracticePlanTitle),
      Strings.MessagePassPracticePlanTitleEntered,
      Strings.MessageFailPracticePlanTitleEntered
    );
    await ControlUtils.Click(PracticePlanPage.AddButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanCreatedToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanCreated,
      Strings.MessageFailPracticePlanCreated
    );
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetVisible,
      Strings.MessageFailNoDrillsYetVisible
    );

    testInfo.scenario = "SC-2: Navigate to Comments Tab and Add comment on practice plan";
    await ControlUtils.Click(PracticePlanPage.CommentsTab());
    await softAssert(
      async () => expect(PracticePlanPage.CommentsTab()).toBeVisible(),
      Strings.MessagePassCommentsTabVisible,
      Strings.MessageFailCommentsTabVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.ZeroCommentsText()).toBeVisible(),
      Strings.MessagePassZeroCommentsVisible,
      Strings.MessageFailZeroCommentsVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.AddFirstCommentButton()).toBeVisible(),
      Strings.MessagePassAddFirstCommentButtonVisible,
      Strings.MessageFailAddFirstCommentButtonVisible
    );
    await ControlUtils.Click(PracticePlanPage.AddFirstCommentButton());
    await ControlUtils.Click(PracticePlanPage.CommentInput());
    await ControlUtils.WaitForVisible(PracticePlanPage.AddCommentHeading());
    await softAssert(
      async () => expect(PracticePlanPage.AddCommentHeading()).toBeVisible(),
      Strings.MessagePassAddCommentFormOpened,
      Strings.MessageFailAddCommentFormOpened
    );
    await ControlUtils.Fill(PracticePlanPage.CommentInput(), Consts.PracticePlanComment);
    await softAssert(
      async () => expect(PracticePlanPage.CommentInput()).toHaveValue(Consts.PracticePlanComment),
      Strings.MessagePassCommentTextEntered,
      Strings.MessageFailCommentTextEntered
    );
    await ControlUtils.Click(PracticePlanPage.AddCommentButton());
    await softAssert(
      async () => expect(PracticePlanPage.CommentAddedToast()).toBeVisible(),
      Strings.MessagePassCommentAdded,
      Strings.MessageFailCommentAdded
    );

    testInfo.scenario = "SC-3: Verify Comment is Added";
    await softAssert(
      async () => expect(PracticePlanPage.CommentText(Consts.PracticePlanComment)).toBeVisible(),
      Strings.MessagePassCommentTextVisible,
      Strings.MessageFailCommentTextVisible
    );
    await softAssert(
      async () => expect(PracticePlanPage.OneCommentText()).toBeVisible(),
      Strings.MessagePassOneCommentVisible,
      Strings.MessageFailOneCommentVisible
    );

    testInfo.scenario = "SC-4: Edit added Comment and verify changes";
    await ControlUtils.Click(PracticePlanPage.CommentOptionsButton());
    await ControlUtils.WaitForVisible(PracticePlanPage.EditOption());
    await softAssert(
      async () => expect(PracticePlanPage.EditOption()).toBeVisible(),
      Strings.MessagePassEditCommentOptionVisible,
      Strings.MessageFailEditCommentOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.EditOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.EditCommentHeading());
    await softAssert(
      async () => expect(PracticePlanPage.EditCommentHeading()).toBeVisible(),
      Strings.MessagePassEditCommentFormOpened,
      Strings.MessageFailEditCommentFormOpened
    );
    await ControlUtils.Click(PracticePlanPage.EditCommentInput());
    await ControlUtils.Fill(PracticePlanPage.EditCommentInput(), Consts.UpdatedPracticePlanComment);
    await softAssert(
      async () => expect(PracticePlanPage.EditCommentInput()).toHaveValue(Consts.UpdatedPracticePlanComment),
      Strings.MessagePassUpdatedCommentTextEntered,
      Strings.MessageFailUpdatedCommentTextEntered
    );
    await ControlUtils.Click(PracticePlanPage.UpdateCommentButton());
    await softAssert(
      async () => expect(PracticePlanPage.CommentUpdatedToast()).toBeVisible(),
      Strings.MessagePassCommentUpdated,
      Strings.MessageFailCommentUpdated
    );
    await softAssert(
      async () => expect(PracticePlanPage.CommentText(Consts.UpdatedPracticePlanComment)).toBeVisible(),
      Strings.MessagePassUpdatedCommentTextVisible,
      Strings.MessageFailUpdatedCommentTextVisible
    );

    testInfo.scenario = "SC-5: Delete added Comment";
    await ControlUtils.Click(PracticePlanPage.CommentOptionsButton());
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteCommentOptionVisible,
      Strings.MessageFailDeleteCommentOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteCommentModal());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteCommentModal()).toBeVisible(),
      Strings.MessagePassDeleteCommentModalOpened,
      Strings.MessageFailDeleteCommentModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.CommentDeletedToast()).toBeVisible(),
      Strings.MessagePassCommentDeleted,
      Strings.MessageFailCommentDeleted
    );
    await softAssert(
      async () => expect(PracticePlanPage.ZeroCommentsText()).toBeVisible(),
      Strings.MessagePassCommentCountReturnedToZero,
      Strings.MessageFailCommentCountReturnedToZero
    );

    testInfo.scenario = "SC-6: Delete Practice Plan";
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await ControlUtils.Click(PracticePlanPage.PracticePlanOptionsMenu(Consts.PracticePlanTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteOptionVisible,
      Strings.MessageFailDeleteOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.ConfirmDeleteButton()).toBeVisible(),
      Strings.MessagePassDeletePracticePlanModalOpened,
      Strings.MessageFailDeletePracticePlanModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanDeletedToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanDeleted,
      Strings.MessageFailPracticePlanDeleted
    );
  });
});
