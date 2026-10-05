import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { PracticePlanPage } from "../Pages/PracticePlanPage.js";
import { SchedulePage } from "../Pages/SchedulePage.js";
import { DrillPage } from "../Pages/DrillPage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import { LoginFlow } from "../Flows/LoginFlow.js";
import { DrillManagementTestCaseNames } from "../Pages/TestCaseNames.js";
import { AppFlow } from "../Flows/AppFlow.js";

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("--OXYM-- Drill Management Module Test Suite", () => {
  test(`TC-OXYM-DRILL-01: ${DrillManagementTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create Drill Category";
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
    await softAssert(
      async () => expect(DrillPage.ManageDrillsButton()).toBeVisible(),
      Strings.MessagePassManageDrillsButtonVisible,
      Strings.MessageFailManageDrillsButtonVisible
    );
    await ControlUtils.Click(DrillPage.ManageDrillsButton());
    await ControlUtils.Click(DrillPage.DrillCategoriesTab());
    await softAssert(
      async () => expect(DrillPage.DrillCategoriesListContainer()).toBeVisible(),
      Strings.MessagePassDrillCategoriesListLoaded,
      Strings.MessageFailDrillCategoriesListLoaded
    );
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await ControlUtils.Click(DrillPage.AddCategoryOption());
    await ControlUtils.Click(DrillPage.CategoryNameInput());
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toBeVisible(),
      Strings.MessagePassAddCategoryFormOpened,
      Strings.MessageFailAddCategoryFormOpened
    );
    await ControlUtils.Fill(DrillPage.CategoryNameInput(), Consts.DrillCategoryTitle);
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toHaveValue(Consts.DrillCategoryTitle),
      Strings.MessagePassCategoryNameEntered,
      Strings.MessageFailCategoryNameEntered
    );
    await ControlUtils.Click(DrillPage.CreateButton());
    const categoryAlreadyExists = await Promise.race([
      DrillPage.CategoryAlreadyExistsToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => true),
      DrillPage.CategoryCreatedToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => false),
    ]).catch(() => false);
    if (categoryAlreadyExists) {
      await softAssert(
        async () => expect(DrillPage.CategoryAlreadyExistsToast()).toBeVisible(),
        Strings.MessagePassCategoryAlreadyExistsValidated,
        Strings.MessageFailCategoryAlreadyExistsValidated
      );
      await ControlUtils.CloseOpenModals();
    } else {
      await softAssert(
        async () => expect(DrillPage.CategoryCreatedToast()).toBeVisible(),
        Strings.MessagePassCategoryCreated,
        Strings.MessageFailCategoryCreated
      );
    }

    testInfo.scenario = "SC-2: Verify Created Drill Category is Visible in List";
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassDrillCategoryVisible,
      Strings.MessageFailDrillCategoryVisible
    );

    testInfo.scenario = "SC-3: Delete Drill Category";
    await ControlUtils.Click(DrillPage.DrillCategoryOptionsMenu(Consts.DrillCategoryTitle));
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryOption());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryOption()).toBeVisible(),
      Strings.MessagePassDeleteCategoryOptionVisible,
      Strings.MessageFailDeleteCategoryOptionVisible
    );
    await ControlUtils.Click(DrillPage.DeleteCategoryOption());
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryModal());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryModal()).toBeVisible(),
      Strings.MessagePassDeleteCategoryModalOpened,
      Strings.MessageFailDeleteCategoryModalOpened
    );
    await ControlUtils.Click(DrillPage.ConfirmDeleteCategoryButton());
    await softAssert(
      async () => expect(DrillPage.CategoryDeletedToast()).toBeVisible(),
      Strings.MessagePassCategoryDeleted,
      Strings.MessageFailCategoryDeleted
    );
  });

  test(`TC-OXYM-DRILL-02: ${DrillManagementTestCaseNames["TC-02"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create Drill Category";
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
    await softAssert(
      async () => expect(DrillPage.ManageDrillsButton()).toBeVisible(),
      Strings.MessagePassManageDrillsButtonVisible,
      Strings.MessageFailManageDrillsButtonVisible
    );
    await ControlUtils.Click(DrillPage.ManageDrillsButton());
    await ControlUtils.Click(DrillPage.DrillCategoriesTab());
    await softAssert(
      async () => expect(DrillPage.DrillCategoriesListContainer()).toBeVisible(),
      Strings.MessagePassDrillCategoriesListLoaded,
      Strings.MessageFailDrillCategoriesListLoaded
    );
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await ControlUtils.Click(DrillPage.AddCategoryOption());
    await ControlUtils.Click(DrillPage.CategoryNameInput());
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toBeVisible(),
      Strings.MessagePassAddCategoryFormOpened,
      Strings.MessageFailAddCategoryFormOpened
    );
    await ControlUtils.Fill(DrillPage.CategoryNameInput(), Consts.DrillCategoryTitle);
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toHaveValue(Consts.DrillCategoryTitle),
      Strings.MessagePassCategoryNameEntered,
      Strings.MessageFailCategoryNameEntered
    );
    await ControlUtils.Click(DrillPage.CreateButton());
    if (await Promise.race([
      DrillPage.CategoryAlreadyExistsToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => true),
      DrillPage.CategoryCreatedToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => false),
    ]).catch(() => false)) {
      await softAssert(
        async () => expect(DrillPage.CategoryAlreadyExistsToast()).toBeVisible(),
        Strings.MessagePassCategoryAlreadyExistsValidated,
        Strings.MessageFailCategoryAlreadyExistsValidated
      );
      await ControlUtils.CloseOpenModals();
    } else {
      await softAssert(
        async () => expect(DrillPage.CategoryCreatedToast()).toBeVisible(),
        Strings.MessagePassCategoryCreated,
        Strings.MessageFailCategoryCreated
      );
    }
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassDrillCategoryVisible,
      Strings.MessageFailDrillCategoryVisible
    );
    const tc01InitialDrillCount = parseInt((await ControlUtils.GetText(DrillPage.DrillsCountBadge(Consts.DrillCategoryTitle))).match(/\d+/)[0], 10);

    testInfo.scenario = "SC-2: Create New Drill within Category";
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await softAssert(
      async () => expect(DrillPage.AddDrillOption()).toBeVisible(),
      Strings.MessagePassAddDrillOptionVisible,
      Strings.MessageFailAddDrillOptionVisible
    );
    await ControlUtils.Click(DrillPage.AddDrillOption());
    await softAssert(
      async () => expect(DrillPage.AddNewDrillHeading()).toBeVisible(),
      Strings.MessagePassAddNewDrillFormOpened,
      Strings.MessageFailAddNewDrillFormOpened
    );
    await ControlUtils.Click(DrillPage.SelectCategoryButton());
    await ControlUtils.Click(DrillPage.CategorySelectOption(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.SelectedCategoryInForm(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassCategorySelected,
      Strings.MessageFailCategorySelected
    );
    await ControlUtils.Fill(DrillPage.DrillTitleInput(), Consts.DrillTitle);
    await softAssert(
      async () => expect(DrillPage.DrillTitleInput()).toHaveValue(Consts.DrillTitle),
      Strings.MessagePassDrillTitleEntered,
      Strings.MessageFailDrillTitleEntered
    );
    await ControlUtils.Fill(DrillPage.DrillDescriptionInput(), Consts.DrillDescription);
    await softAssert(
      async () => expect(DrillPage.DrillDescriptionInput()).toHaveValue(Consts.DrillDescription),
      Strings.MessagePassDrillDescriptionEntered,
      Strings.MessageFailDrillDescriptionEntered
    );
    await ControlUtils.Fill(DrillPage.DrillDurationInput(), Consts.DrillDuration);
    await softAssert(
      async () => expect(DrillPage.DrillDurationInput()).toHaveValue(Consts.DrillDuration),
      Strings.MessagePassDrillDurationEntered,
      Strings.MessageFailDrillDurationEntered
    );
    await ControlUtils.Fill(DrillPage.VideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(DrillPage.VideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassDrillVideoLinkEntered,
      Strings.MessageFailDrillVideoLinkEntered
    );
    await ControlUtils.Click(DrillPage.AddLinkButton());
    await ControlUtils.Click(DrillPage.AddDrillButton());
    await softAssert(
      async () => expect(DrillPage.DrillAddedToast()).toBeVisible(),
      Strings.MessagePassDrillAdded,
      Strings.MessageFailDrillAdded
    );
    await softAssert(
      async () => expect(DrillPage.DrillsCountInCategory(Consts.DrillCategoryTitle, tc01InitialDrillCount + 1)).toBeVisible(),
      Strings.MessagePassDrillCountUpdated,
      Strings.MessageFailDrillCountUpdated
    );
    await ControlUtils.Click(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.DrillListItem(Consts.DrillTitle)).toBeVisible(),
      Strings.MessagePassDrillTitleVisible,
      Strings.MessageFailDrillTitleVisible
    );

    testInfo.scenario = "SC-3: Delete Drill Category";
    await ControlUtils.Click(DrillPage.DrillBankBackButton(Consts.DrillCategoryTitle));
    await ControlUtils.Click(DrillPage.DrillCategoryOptionsMenu(Consts.DrillCategoryTitle));
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryOption());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryOption()).toBeVisible(),
      Strings.MessagePassDeleteCategoryOptionVisible,
      Strings.MessageFailDeleteCategoryOptionVisible
    );
    await ControlUtils.Click(DrillPage.DeleteCategoryOption());
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryModal());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryModal()).toBeVisible(),
      Strings.MessagePassDeleteCategoryModalOpened,
      Strings.MessageFailDeleteCategoryModalOpened
    );
    await ControlUtils.Click(DrillPage.ConfirmDeleteCategoryButton());
    await softAssert(
      async () => expect(DrillPage.CategoryDeletedToast()).toBeVisible(),
      Strings.MessagePassCategoryDeleted,
      Strings.MessageFailCategoryDeleted
    );
  });

  test(`TC-OXYM-DRILL-03: ${DrillManagementTestCaseNames["TC-03"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create Drill Category";

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
    await softAssert(
      async () => expect(DrillPage.ManageDrillsButton()).toBeVisible(),
      Strings.MessagePassManageDrillsButtonVisible,
      Strings.MessageFailManageDrillsButtonVisible
    );
    await ControlUtils.Click(DrillPage.ManageDrillsButton());
    await ControlUtils.Click(DrillPage.DrillCategoriesTab());
    await softAssert(
      async () => expect(DrillPage.DrillCategoriesListContainer()).toBeVisible(),
      Strings.MessagePassDrillCategoriesListLoaded,
      Strings.MessageFailDrillCategoriesListLoaded
    );
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await ControlUtils.Click(DrillPage.AddCategoryOption());
    await ControlUtils.Click(DrillPage.CategoryNameInput());
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toBeVisible(),
      Strings.MessagePassAddCategoryFormOpened,
      Strings.MessageFailAddCategoryFormOpened
    );
    await ControlUtils.Fill(DrillPage.CategoryNameInput(), Consts.DrillCategoryTitle);
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toHaveValue(Consts.DrillCategoryTitle),
      Strings.MessagePassCategoryNameEntered,
      Strings.MessageFailCategoryNameEntered
    );
    await ControlUtils.Click(DrillPage.CreateButton());
    if (await Promise.race([
      DrillPage.CategoryAlreadyExistsToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => true),
      DrillPage.CategoryCreatedToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => false),
    ]).catch(() => false)) {
      await softAssert(
        async () => expect(DrillPage.CategoryAlreadyExistsToast()).toBeVisible(),
        Strings.MessagePassCategoryAlreadyExistsValidated,
        Strings.MessageFailCategoryAlreadyExistsValidated
      );
      await ControlUtils.CloseOpenModals();
    } else {
      await softAssert(
        async () => expect(DrillPage.CategoryCreatedToast()).toBeVisible(),
        Strings.MessagePassCategoryCreated,
        Strings.MessageFailCategoryCreated
      );
    }
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassDrillCategoryVisible,
      Strings.MessageFailDrillCategoryVisible
    );
    const tc02InitialDrillCount = parseInt((await ControlUtils.GetText(DrillPage.DrillsCountBadge(Consts.DrillCategoryTitle))).match(/\d+/)[0], 10);

    testInfo.scenario = "SC-2: Create Drill within Category";
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await softAssert(
      async () => expect(DrillPage.AddDrillOption()).toBeVisible(),
      Strings.MessagePassAddDrillOptionVisible,
      Strings.MessageFailAddDrillOptionVisible
    );
    await ControlUtils.Click(DrillPage.AddDrillOption());
    await softAssert(
      async () => expect(DrillPage.AddNewDrillHeading()).toBeVisible(),
      Strings.MessagePassAddNewDrillFormOpened,
      Strings.MessageFailAddNewDrillFormOpened
    );
    await ControlUtils.Click(DrillPage.SelectCategoryButton());
    await ControlUtils.Click(DrillPage.CategorySelectOption(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.SelectedCategoryInForm(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassCategorySelected,
      Strings.MessageFailCategorySelected
    );
    await ControlUtils.Fill(DrillPage.DrillTitleInput(), Consts.DrillTitle);
    await softAssert(
      async () => expect(DrillPage.DrillTitleInput()).toHaveValue(Consts.DrillTitle),
      Strings.MessagePassDrillTitleEntered,
      Strings.MessageFailDrillTitleEntered
    );
    await ControlUtils.Fill(DrillPage.DrillDescriptionInput(), Consts.DrillDescription);
    await softAssert(
      async () => expect(DrillPage.DrillDescriptionInput()).toHaveValue(Consts.DrillDescription),
      Strings.MessagePassDrillDescriptionEntered,
      Strings.MessageFailDrillDescriptionEntered
    );
    await ControlUtils.Fill(DrillPage.DrillDurationInput(), Consts.DrillDuration);
    await softAssert(
      async () => expect(DrillPage.DrillDurationInput()).toHaveValue(Consts.DrillDuration),
      Strings.MessagePassDrillDurationEntered,
      Strings.MessageFailDrillDurationEntered
    );
    await ControlUtils.Fill(DrillPage.VideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(DrillPage.VideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassDrillVideoLinkEntered,
      Strings.MessageFailDrillVideoLinkEntered
    );
    await ControlUtils.Click(DrillPage.AddLinkButton());
    await ControlUtils.Click(DrillPage.AddDrillButton());
    await softAssert(
      async () => expect(DrillPage.DrillAddedToast()).toBeVisible(),
      Strings.MessagePassDrillAdded,
      Strings.MessageFailDrillAdded
    );
    await softAssert(
      async () => expect(DrillPage.DrillsCountInCategory(Consts.DrillCategoryTitle, tc02InitialDrillCount + 1)).toBeVisible(),
      Strings.MessagePassDrillCountUpdated,
      Strings.MessageFailDrillCountUpdated
    );

    testInfo.scenario = "SC-3: Edit Drill within Category";
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassDrillCategoryVisible,
      Strings.MessageFailDrillCategoryVisible
    );
    await ControlUtils.Click(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.DrillListItem(Consts.DrillTitle)).toBeVisible(),
      Strings.MessagePassDrillTitleVisible,
      Strings.MessageFailDrillTitleVisible
    );
    await ControlUtils.Click(DrillPage.DrillOptionsMenu(Consts.DrillTitle));
    await ControlUtils.WaitForVisible(DrillPage.EditOption());
    await softAssert(
      async () => expect(DrillPage.EditOption()).toBeVisible(),
      Strings.MessagePassDrillEditOptionVisible,
      Strings.MessageFailDrillEditOptionVisible
    );
    await ControlUtils.WaitBeforeClick(DrillPage.EditOption());
    await ControlUtils.WaitForVisible(DrillPage.EditDrillHeading());
    await ControlUtils.Click(DrillPage.EditModalDrillTitleInput());
    await softAssert(
      async () => expect(DrillPage.EditModalDrillTitleInput()).toBeVisible(),
      Strings.MessagePassEditDrillFormOpened,
      Strings.MessageFailEditDrillFormOpened
    );
    await ControlUtils.Fill(DrillPage.EditModalDrillTitleInput(), Consts.UpdatedDrillTitle);
    await softAssert(
      async () => expect(DrillPage.EditModalDrillTitleInput()).toHaveValue(Consts.UpdatedDrillTitle),
      Strings.MessagePassUpdatedDrillTitleEntered,
      Strings.MessageFailUpdatedDrillTitleEntered
    );
    await ControlUtils.Fill(DrillPage.EditModalDrillDescriptionInput(), Consts.UpdatedDrillDescription);
    await softAssert(
      async () => expect(DrillPage.EditModalDrillDescriptionInput()).toHaveValue(Consts.UpdatedDrillDescription),
      Strings.MessagePassUpdatedDrillDescriptionEntered,
      Strings.MessageFailUpdatedDrillDescriptionEntered
    );
    await ControlUtils.Fill(DrillPage.EditModalDrillDurationInput(), Consts.UpdatedDrillDuration);
    await softAssert(
      async () => expect(DrillPage.EditModalDrillDurationInput()).toHaveValue(Consts.UpdatedDrillDuration),
      Strings.MessagePassUpdatedDrillDurationEntered,
      Strings.MessageFailUpdatedDrillDurationEntered
    );
    await ControlUtils.Click(DrillPage.VideoLinksSection());
    await ControlUtils.Click(DrillPage.DeleteExistingVideoLinkButton());
    await softAssert(
      async () => expect(DrillPage.VideoLinkItemInEditModal(Consts.ScheduleVideoLinkUrl)).not.toBeVisible(),
      Strings.MessagePassExistingVideoLinkDeleted,
      Strings.MessageFailExistingVideoLinkDeleted
    );
    await ControlUtils.Fill(DrillPage.EditModalVideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(DrillPage.EditModalVideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassUpdatedDrillVideoLinkEntered,
      Strings.MessageFailUpdatedDrillVideoLinkEntered
    );
    await ControlUtils.Click(DrillPage.EditModalAddLinkButton());
    await ControlUtils.Click(DrillPage.UpdateButton());
    await softAssert(
      async () => expect(DrillPage.DrillUpdatedToast()).toBeVisible(),
      Strings.MessagePassDrillUpdated,
      Strings.MessageFailDrillUpdated
    );
    await softAssert(
      async () => expect(DrillPage.DrillListItem(Consts.UpdatedDrillTitle)).toBeVisible(),
      Strings.MessagePassUpdatedDrillVisible,
      Strings.MessageFailUpdatedDrillVisible
    );

    testInfo.scenario = "SC-4: Edit Drill Category";
    await ControlUtils.Click(DrillPage.DrillBankBackButton(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassDrillCategoryVisible,
      Strings.MessageFailDrillCategoryVisible
    );
    await ControlUtils.Click(DrillPage.DrillCategoryOptionsMenu(Consts.DrillCategoryTitle));
    await ControlUtils.WaitForVisible(DrillPage.EditOption());
    await softAssert(
      async () => expect(DrillPage.EditOption()).toBeVisible(),
      Strings.MessagePassDrillEditOptionVisible,
      Strings.MessageFailDrillEditOptionVisible
    );
    await ControlUtils.Click(DrillPage.EditOption());
    await ControlUtils.Click(DrillPage.EditCategoryOption());
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toBeVisible(),
      Strings.MessagePassEditCategoryFormOpened,
      Strings.MessageFailEditCategoryFormOpened
    );
    await ControlUtils.Fill(DrillPage.CategoryNameInput(), Consts.UpdatedDrillCategoryTitle);
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toHaveValue(Consts.UpdatedDrillCategoryTitle),
      Strings.MessagePassUpdatedCategoryNameEntered,
      Strings.MessageFailUpdatedCategoryNameEntered
    );
    await ControlUtils.Click(DrillPage.UpdateButton());
    await softAssert(
      async () => expect(DrillPage.CategoryUpdatedToast()).toBeVisible(),
      Strings.MessagePassCategoryUpdated,
      Strings.MessageFailCategoryUpdated
    );
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.UpdatedDrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassUpdatedCategoryVisible,
      Strings.MessageFailUpdatedCategoryVisible
    );

    testInfo.scenario = "SC-5: Delete Drill Category";
    await ControlUtils.Click(DrillPage.DrillCategoryOptionsMenu(Consts.UpdatedDrillCategoryTitle));
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryOption());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryOption()).toBeVisible(),
      Strings.MessagePassDeleteCategoryOptionVisible,
      Strings.MessageFailDeleteCategoryOptionVisible
    );
    await ControlUtils.Click(DrillPage.DeleteCategoryOption());
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryModal());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryModal()).toBeVisible(),
      Strings.MessagePassDeleteCategoryModalOpened,
      Strings.MessageFailDeleteCategoryModalOpened
    );
    await ControlUtils.Click(DrillPage.ConfirmDeleteCategoryButton());
    await softAssert(
      async () => expect(DrillPage.CategoryDeletedToast()).toBeVisible(),
      Strings.MessagePassCategoryDeleted,
      Strings.MessageFailCategoryDeleted
    );
  });

  test(`TC-OXYM-DRILL-04: ${DrillManagementTestCaseNames["TC-04"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create Drill Category";

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
    await softAssert(
      async () => expect(DrillPage.ManageDrillsButton()).toBeVisible(),
      Strings.MessagePassManageDrillsButtonVisible,
      Strings.MessageFailManageDrillsButtonVisible
    );
    await ControlUtils.Click(DrillPage.ManageDrillsButton());
    await ControlUtils.Click(DrillPage.DrillCategoriesTab());
    await softAssert(
      async () => expect(DrillPage.DrillCategoriesListContainer()).toBeVisible(),
      Strings.MessagePassDrillCategoriesListLoaded,
      Strings.MessageFailDrillCategoriesListLoaded
    );
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await ControlUtils.Click(DrillPage.AddCategoryOption());
    await ControlUtils.Click(DrillPage.CategoryNameInput());
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toBeVisible(),
      Strings.MessagePassAddCategoryFormOpened,
      Strings.MessageFailAddCategoryFormOpened
    );
    await ControlUtils.Fill(DrillPage.CategoryNameInput(), Consts.DrillCategoryTitle);
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toHaveValue(Consts.DrillCategoryTitle),
      Strings.MessagePassCategoryNameEntered,
      Strings.MessageFailCategoryNameEntered
    );
    await ControlUtils.Click(DrillPage.CreateButton());
    if (await Promise.race([
      DrillPage.CategoryAlreadyExistsToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => true),
      DrillPage.CategoryCreatedToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => false),
    ]).catch(() => false)) {
      await softAssert(
        async () => expect(DrillPage.CategoryAlreadyExistsToast()).toBeVisible(),
        Strings.MessagePassCategoryAlreadyExistsValidated,
        Strings.MessageFailCategoryAlreadyExistsValidated
      );
      await ControlUtils.CloseOpenModals();
    } else {
      await softAssert(
        async () => expect(DrillPage.CategoryCreatedToast()).toBeVisible(),
        Strings.MessagePassCategoryCreated,
        Strings.MessageFailCategoryCreated
      );
    }
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassDrillCategoryVisible,
      Strings.MessageFailDrillCategoryVisible
    );

    testInfo.scenario = "SC-2: Search Drill Category";
    await ControlUtils.Click(DrillPage.CategorySearchInput());
    await softAssert(
      async () => expect(DrillPage.CategorySearchInput()).toBeVisible(),
      Strings.MessagePassCategorySearchInputVisible,
      Strings.MessageFailCategorySearchInputVisible
    );
    await ControlUtils.Fill(DrillPage.CategorySearchInput(), Consts.DrillCategoryTitle);
    await softAssert(
      async () => expect(DrillPage.CategorySearchInput()).toHaveValue(Consts.DrillCategoryTitle),
      Strings.MessagePassCategorySearchTextEntered,
      Strings.MessageFailCategorySearchTextEntered
    );
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassSearchedCategoryVisible,
      Strings.MessageFailSearchedCategoryVisible
    );
    await softAssert(
      async () => expect(DrillPage.DrillBankListItems()).toHaveCount(1),
      Strings.MessagePassOnlyOneCategoryInResults,
      Strings.MessageFailOnlyOneCategoryInResults
    );
    await ControlUtils.Click(DrillPage.SearchClearButton());
    await softAssert(
      async () => expect(DrillPage.CategorySearchInput()).toHaveValue(''),
      Strings.MessagePassCategorySearchCleared,
      Strings.MessageFailCategorySearchCleared
    );
    await softAssert(
      async () => expect(DrillPage.SearchProgressBar()).not.toBeVisible(),
      Strings.MessagePassSearchLoadingGone,
      Strings.MessageFailSearchLoadingGone
    );
    await softAssert(
      async () => expect(await DrillPage.DrillBankListItems().count()).toBeGreaterThan(1),
      Strings.MessagePassCategoryListReverted,
      Strings.MessageFailCategoryListReverted
    );
    const tc04InitialDrillCount = parseInt((await ControlUtils.GetText(DrillPage.DrillsCountBadge(Consts.DrillCategoryTitle))).match(/\d+/)[0], 10);

    testInfo.scenario = "SC-3: Add Two Drills within Category";
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await softAssert(
      async () => expect(DrillPage.AddDrillOption()).toBeVisible(),
      Strings.MessagePassAddDrillOptionVisible,
      Strings.MessageFailAddDrillOptionVisible
    );
    await ControlUtils.Click(DrillPage.AddDrillOption());
    await softAssert(
      async () => expect(DrillPage.AddNewDrillHeading()).toBeVisible(),
      Strings.MessagePassAddNewDrillFormOpened,
      Strings.MessageFailAddNewDrillFormOpened
    );
    await ControlUtils.Click(DrillPage.SelectCategoryButton());
    await ControlUtils.Click(DrillPage.CategorySelectOption(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.SelectedCategoryInForm(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassCategorySelected,
      Strings.MessageFailCategorySelected
    );
    await ControlUtils.Fill(DrillPage.DrillTitleInput(), Consts.DrillTitle);
    await softAssert(
      async () => expect(DrillPage.DrillTitleInput()).toHaveValue(Consts.DrillTitle),
      Strings.MessagePassDrillTitleEntered,
      Strings.MessageFailDrillTitleEntered
    );
    await ControlUtils.Fill(DrillPage.DrillDescriptionInput(), Consts.DrillDescription);
    await softAssert(
      async () => expect(DrillPage.DrillDescriptionInput()).toHaveValue(Consts.DrillDescription),
      Strings.MessagePassDrillDescriptionEntered,
      Strings.MessageFailDrillDescriptionEntered
    );
    await ControlUtils.Fill(DrillPage.DrillDurationInput(), Consts.DrillDuration);
    await softAssert(
      async () => expect(DrillPage.DrillDurationInput()).toHaveValue(Consts.DrillDuration),
      Strings.MessagePassDrillDurationEntered,
      Strings.MessageFailDrillDurationEntered
    );
    await ControlUtils.Fill(DrillPage.VideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(DrillPage.VideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassDrillVideoLinkEntered,
      Strings.MessageFailDrillVideoLinkEntered
    );
    await ControlUtils.Click(DrillPage.AddLinkButton());
    await ControlUtils.Click(DrillPage.AddDrillButton());
    await softAssert(
      async () => expect(DrillPage.DrillAddedToast()).toBeVisible(),
      Strings.MessagePassDrillAdded,
      Strings.MessageFailDrillAdded
    );
    await softAssert(
      async () => expect(DrillPage.DrillsCountInCategory(Consts.DrillCategoryTitle, tc04InitialDrillCount + 1)).toBeVisible(),
      Strings.MessagePassDrillCountUpdated,
      Strings.MessageFailDrillCountUpdated
    );
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await ControlUtils.Click(DrillPage.AddDrillOption());
    await softAssert(
      async () => expect(DrillPage.AddNewDrillHeading()).toBeVisible(),
      Strings.MessagePassAddNewDrillFormOpened,
      Strings.MessageFailAddNewDrillFormOpened
    );
    await ControlUtils.Click(DrillPage.SelectCategoryButton());
    await ControlUtils.Click(DrillPage.CategorySelectOption(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.SelectedCategoryInForm(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassCategorySelected,
      Strings.MessageFailCategorySelected
    );
    await ControlUtils.Fill(DrillPage.DrillTitleInput(), Consts.DrillTitle2);
    await softAssert(
      async () => expect(DrillPage.DrillTitleInput()).toHaveValue(Consts.DrillTitle2),
      Strings.MessagePassSecondDrillTitleEntered,
      Strings.MessageFailSecondDrillTitleEntered
    );
    await ControlUtils.Fill(DrillPage.DrillDescriptionInput(), Consts.DrillDescription);
    await ControlUtils.Fill(DrillPage.DrillDurationInput(), Consts.DrillDuration);
    await ControlUtils.Fill(DrillPage.VideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await ControlUtils.Click(DrillPage.AddLinkButton());
    await ControlUtils.Click(DrillPage.AddDrillButton());
    await softAssert(
      async () => expect(DrillPage.DrillAddedToast()).toBeVisible(),
      Strings.MessagePassSecondDrillAdded,
      Strings.MessageFailSecondDrillAdded
    );
    await softAssert(
      async () => expect(DrillPage.DrillsCountInCategory(Consts.DrillCategoryTitle, tc04InitialDrillCount + 2)).toBeVisible(),
      Strings.MessagePassDrillCountUpdatedToTwo,
      Strings.MessageFailDrillCountUpdatedToTwo
    );

    testInfo.scenario = "SC-4: Search Drill within Category";
    await ControlUtils.Click(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.DrillBankListItems()).toHaveCount(2),
      Strings.MessagePassBothDrillsVisibleBeforeSearch,
      Strings.MessageFailBothDrillsVisibleBeforeSearch
    );
    await ControlUtils.Click(DrillPage.DrillSearchInput());
    await softAssert(
      async () => expect(DrillPage.DrillSearchInput()).toBeVisible(),
      Strings.MessagePassDrillSearchInputVisible,
      Strings.MessageFailDrillSearchInputVisible
    );
    await ControlUtils.Fill(DrillPage.DrillSearchInput(), Consts.DrillTitle);
    await softAssert(
      async () => expect(DrillPage.DrillSearchInput()).toHaveValue(Consts.DrillTitle),
      Strings.MessagePassDrillSearchTextEntered,
      Strings.MessageFailDrillSearchTextEntered
    );
    await softAssert(
      async () => expect(DrillPage.DrillListItem(Consts.DrillTitle)).toBeVisible(),
      Strings.MessagePassSearchedDrillVisible,
      Strings.MessageFailSearchedDrillVisible
    );
    await softAssert(
      async () => expect(DrillPage.DrillListItem(Consts.DrillTitle2)).not.toBeVisible(),
      Strings.MessagePassNonMatchingDrillHidden,
      Strings.MessageFailNonMatchingDrillHidden
    );
    await softAssert(
      async () => expect(DrillPage.DrillBankListItems()).toHaveCount(1),
      Strings.MessagePassOnlyOneSearchedDrillVisible,
      Strings.MessageFailOnlyOneSearchedDrillVisible
    );
    await ControlUtils.Click(DrillPage.SearchClearButton());
    await softAssert(
      async () => expect(DrillPage.DrillSearchInput()).toHaveValue(''),
      Strings.MessagePassDrillSearchCleared,
      Strings.MessageFailDrillSearchCleared
    );
    await softAssert(
      async () => expect(DrillPage.DrillBankListItems()).toHaveCount(2),
      Strings.MessagePassBothDrillsVisibleAfterClear,
      Strings.MessageFailBothDrillsVisibleAfterClear
    );

    testInfo.scenario = "SC-5: Delete Drill Category";
    await ControlUtils.Click(DrillPage.DrillBankBackButton(Consts.DrillCategoryTitle));
    await ControlUtils.Click(DrillPage.DrillCategoryOptionsMenu(Consts.DrillCategoryTitle));
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryOption());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryOption()).toBeVisible(),
      Strings.MessagePassDeleteCategoryOptionVisible,
      Strings.MessageFailDeleteCategoryOptionVisible
    );
    await ControlUtils.Click(DrillPage.DeleteCategoryOption());
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryModal());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryModal()).toBeVisible(),
      Strings.MessagePassDeleteCategoryModalOpened,
      Strings.MessageFailDeleteCategoryModalOpened
    );
    await ControlUtils.Click(DrillPage.ConfirmDeleteCategoryButton());
    await softAssert(
      async () => expect(DrillPage.CategoryDeletedToast()).toBeVisible(),
      Strings.MessagePassCategoryDeleted,
      Strings.MessageFailCategoryDeleted
    );
  });

  test(`TC-OXYM-DRILL-05: ${DrillManagementTestCaseNames["TC-05"]}`, async ({ softAssert }, testInfo) => {
    const uniqueDrillTitle = `${Consts.DrillTitle} ${Math.floor(1000 + Math.random() * 9000)}`;
    testInfo.scenario = "SC-1: Create Drill Category and Add Drill";

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
    await softAssert(
      async () => expect(DrillPage.ManageDrillsButton()).toBeVisible(),
      Strings.MessagePassManageDrillsButtonVisible,
      Strings.MessageFailManageDrillsButtonVisible
    );
    await ControlUtils.Click(DrillPage.ManageDrillsButton());
    await ControlUtils.Click(DrillPage.DrillCategoriesTab());
    await softAssert(
      async () => expect(DrillPage.DrillCategoriesListContainer()).toBeVisible(),
      Strings.MessagePassDrillCategoriesListLoaded,
      Strings.MessageFailDrillCategoriesListLoaded
    );
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await ControlUtils.Click(DrillPage.AddCategoryOption());
    await ControlUtils.Click(DrillPage.CategoryNameInput());
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toBeVisible(),
      Strings.MessagePassAddCategoryFormOpened,
      Strings.MessageFailAddCategoryFormOpened
    );
    await ControlUtils.Fill(DrillPage.CategoryNameInput(), Consts.DrillCategoryTitle);
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toHaveValue(Consts.DrillCategoryTitle),
      Strings.MessagePassCategoryNameEntered,
      Strings.MessageFailCategoryNameEntered
    );
    await ControlUtils.Click(DrillPage.CreateButton());
    if (await Promise.race([
      DrillPage.CategoryAlreadyExistsToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => true),
      DrillPage.CategoryCreatedToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => false),
    ]).catch(() => false)) {
      await softAssert(
        async () => expect(DrillPage.CategoryAlreadyExistsToast()).toBeVisible(),
        Strings.MessagePassCategoryAlreadyExistsValidated,
        Strings.MessageFailCategoryAlreadyExistsValidated
      );
      await ControlUtils.CloseOpenModals();
    } else {
      await softAssert(
        async () => expect(DrillPage.CategoryCreatedToast()).toBeVisible(),
        Strings.MessagePassCategoryCreated,
        Strings.MessageFailCategoryCreated
      );
    }
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassDrillCategoryVisible,
      Strings.MessageFailDrillCategoryVisible
    );
    const tc05InitialDrillCount = parseInt((await ControlUtils.GetText(DrillPage.DrillsCountBadge(Consts.DrillCategoryTitle))).match(/\d+/)[0], 10);
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await softAssert(
      async () => expect(DrillPage.AddDrillOption()).toBeVisible(),
      Strings.MessagePassAddDrillOptionVisible,
      Strings.MessageFailAddDrillOptionVisible
    );
    await ControlUtils.Click(DrillPage.AddDrillOption());
    await softAssert(
      async () => expect(DrillPage.AddNewDrillHeading()).toBeVisible(),
      Strings.MessagePassAddNewDrillFormOpened,
      Strings.MessageFailAddNewDrillFormOpened
    );
    await ControlUtils.Click(DrillPage.SelectCategoryButton());
    await ControlUtils.Click(DrillPage.CategorySelectOption(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.SelectedCategoryInForm(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassCategorySelected,
      Strings.MessageFailCategorySelected
    );
    await ControlUtils.Fill(DrillPage.DrillTitleInput(), uniqueDrillTitle);
    await softAssert(
      async () => expect(DrillPage.DrillTitleInput()).toHaveValue(uniqueDrillTitle),
      Strings.MessagePassDrillTitleEntered,
      Strings.MessageFailDrillTitleEntered
    );
    await ControlUtils.Fill(DrillPage.DrillDescriptionInput(), Consts.DrillDescription);
    await ControlUtils.Fill(DrillPage.DrillDurationInput(), Consts.DrillDuration);
    await ControlUtils.Click(DrillPage.AddDrillButton());
    await softAssert(
      async () => expect(DrillPage.DrillAddedToast()).toBeVisible(),
      Strings.MessagePassDrillAdded,
      Strings.MessageFailDrillAdded
    );
    await softAssert(
      async () => expect(DrillPage.DrillsCountInCategory(Consts.DrillCategoryTitle, tc05InitialDrillCount + 1)).toBeVisible(),
      Strings.MessagePassDrillCountUpdated,
      Strings.MessageFailDrillCountUpdated
    );
    await ControlUtils.Click(DrillPage.DrillBankHeaderBackButton());

    testInfo.scenario = "SC-2: Create Practice Plan";
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
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanListItem(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanInListVisible,
      Strings.MessageFailPracticePlanInListVisible
    );

    testInfo.scenario = "SC-3: Add Drill to Practice Plan";
    await ControlUtils.Click(PracticePlanPage.PracticePlanListItem(Consts.PracticePlanTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.AddFirstDrillButton());
    await softAssert(
      async () => expect(PracticePlanPage.AddFirstDrillButton()).toBeVisible(),
      Strings.MessagePassAddFirstDrillButtonVisible,
      Strings.MessageFailAddFirstDrillButtonVisible
    );
    await ControlUtils.Click(PracticePlanPage.AddFirstDrillButton());
    await ControlUtils.Click(PracticePlanPage.SelectDrillsOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.SelectDrillsOption());
    await softAssert(
      async () => expect(PracticePlanPage.SelectDrillsOption()).toBeVisible(),
      Strings.MessagePassSelectDrillsOptionVisible,
      Strings.MessageFailSelectDrillsOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DrillCheckboxInPlan(uniqueDrillTitle));
    await softAssert(
      async () => expect(PracticePlanPage.DrillCheckboxInPlan(uniqueDrillTitle)).toBeVisible(),
      Strings.MessagePassDrillSelectedForAddition,
      Strings.MessageFailDrillSelectedForAddition
    );
    await ControlUtils.Click(PracticePlanPage.AddDrillsToPlanButton(1));
    await softAssert(
      async () => expect(PracticePlanPage.DrillsAddedToPlanToast()).toBeVisible(),
      Strings.MessagePassDrillsAddedToPlanToast,
      Strings.MessageFailDrillsAddedToPlanToast
    );
    await softAssert(
      async () => expect(PracticePlanPage.DrillInPracticePlan(uniqueDrillTitle)).toBeVisible(),
      Strings.MessagePassDrillVisibleInPracticePlan,
      Strings.MessageFailDrillVisibleInPracticePlan
    );

    testInfo.scenario = "SC-4: Delete Drill from Practice Plan";
    await ControlUtils.Click(PracticePlanPage.PracticePlanDrillOptionsButton(uniqueDrillTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteOptionVisible,
      Strings.MessageFailDeleteOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteDrillFromPlanModal());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteDrillFromPlanModal()).toBeVisible(),
      Strings.MessagePassDeleteDrillFromPlanModalOpened,
      Strings.MessageFailDeleteDrillFromPlanModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.DrillRemovedFromPlanToast(uniqueDrillTitle)).toBeVisible(),
      Strings.MessagePassDrillRemovedFromPlan,
      Strings.MessageFailDrillRemovedFromPlan
    );
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetAfterRemoval,
      Strings.MessageFailNoDrillsYetAfterRemoval
    );

  });

  test(`TC-OXYM-DRILL-06: ${DrillManagementTestCaseNames["TC-06"]}`, async ({softAssert }, testInfo) => {
   const uniqueDrillTitle = `${Consts.DrillTitle} ${Math.floor(1000 + Math.random() * 9000)}`;
   testInfo.scenario = "SC-1: Create Drill Category and Add Drill within category";
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
    await softAssert(
      async () => expect(DrillPage.ManageDrillsButton()).toBeVisible(),
      Strings.MessagePassManageDrillsButtonVisible,
      Strings.MessageFailManageDrillsButtonVisible
    );
    await ControlUtils.Click(DrillPage.ManageDrillsButton());
    await ControlUtils.Click(DrillPage.DrillCategoriesTab());
    await softAssert(
      async () => expect(DrillPage.DrillCategoriesListContainer()).toBeVisible(),
      Strings.MessagePassDrillCategoriesListLoaded,
      Strings.MessageFailDrillCategoriesListLoaded
    );
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await ControlUtils.Click(DrillPage.AddCategoryOption());
    await ControlUtils.Click(DrillPage.CategoryNameInput());
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toBeVisible(),
      Strings.MessagePassAddCategoryFormOpened,
      Strings.MessageFailAddCategoryFormOpened
    );
    await ControlUtils.Fill(DrillPage.CategoryNameInput(), Consts.DrillCategoryTitle);
    await softAssert(
      async () => expect(DrillPage.CategoryNameInput()).toHaveValue(Consts.DrillCategoryTitle),
      Strings.MessagePassCategoryNameEntered,
      Strings.MessageFailCategoryNameEntered
    );
    await ControlUtils.Click(DrillPage.CreateButton());
    if (await Promise.race([
      DrillPage.CategoryAlreadyExistsToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => true),
      DrillPage.CategoryCreatedToast().waitFor({ state: 'visible', timeout: 15000 }).then(() => false),
    ]).catch(() => false)) {
      await softAssert(
        async () => expect(DrillPage.CategoryAlreadyExistsToast()).toBeVisible(),
        Strings.MessagePassCategoryAlreadyExistsValidated,
        Strings.MessageFailCategoryAlreadyExistsValidated
      );
      await ControlUtils.CloseOpenModals();
    } else {
      await softAssert(
        async () => expect(DrillPage.CategoryCreatedToast()).toBeVisible(),
        Strings.MessagePassCategoryCreated,
        Strings.MessageFailCategoryCreated
      );
    }
    await softAssert(
      async () => expect(DrillPage.DrillCategoryListItem(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassDrillCategoryVisible,
      Strings.MessageFailDrillCategoryVisible
    );
    const tc06InitialDrillCount = parseInt((await ControlUtils.GetText(DrillPage.DrillsCountBadge(Consts.DrillCategoryTitle))).match(/\d+/)[0], 10);
    await ControlUtils.Click(DrillPage.AddDrillOrCategoryButton());
    await softAssert(
      async () => expect(DrillPage.AddDrillOption()).toBeVisible(),
      Strings.MessagePassAddDrillOptionVisible,
      Strings.MessageFailAddDrillOptionVisible
    );
    await ControlUtils.Click(DrillPage.AddDrillOption());
    await softAssert(
      async () => expect(DrillPage.AddNewDrillHeading()).toBeVisible(),
      Strings.MessagePassAddNewDrillFormOpened,
      Strings.MessageFailAddNewDrillFormOpened
    );
    await ControlUtils.Click(DrillPage.SelectCategoryButton());
    await ControlUtils.Click(DrillPage.CategorySelectOption(Consts.DrillCategoryTitle));
    await softAssert(
      async () => expect(DrillPage.SelectedCategoryInForm(Consts.DrillCategoryTitle)).toBeVisible(),
      Strings.MessagePassCategorySelected,
      Strings.MessageFailCategorySelected
    );
    await ControlUtils.Fill(DrillPage.DrillTitleInput(), uniqueDrillTitle);
    await softAssert(
      async () => expect(DrillPage.DrillTitleInput()).toHaveValue(uniqueDrillTitle),
      Strings.MessagePassDrillTitleEntered,
      Strings.MessageFailDrillTitleEntered
    );
    await ControlUtils.Fill(DrillPage.DrillDescriptionInput(), Consts.DrillDescription);
    await ControlUtils.Fill(DrillPage.DrillDurationInput(), Consts.DrillDuration);
    await ControlUtils.Click(DrillPage.AddDrillButton());
    await softAssert(
      async () => expect(DrillPage.DrillAddedToast()).toBeVisible(),
      Strings.MessagePassDrillAdded,
      Strings.MessageFailDrillAdded
    );
    await softAssert(
      async () => expect(DrillPage.DrillsCountInCategory(Consts.DrillCategoryTitle, tc06InitialDrillCount + 1)).toBeVisible(),
      Strings.MessagePassDrillCountUpdated,
      Strings.MessageFailDrillCountUpdated
    );
    await ControlUtils.Click(DrillPage.DrillBankHeaderBackButton());

    testInfo.scenario = "SC-2: Create Practice Plan";
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
    await ControlUtils.Click(PracticePlanPage.BackButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanListItem(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanInListVisible,
      Strings.MessageFailPracticePlanInListVisible
    );

    testInfo.scenario = "SC-3: Add Drill to Practice Plan";
    await ControlUtils.Click(PracticePlanPage.PracticePlanListItem(Consts.PracticePlanTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.AddFirstDrillButton());
    await softAssert(
      async () => expect(PracticePlanPage.AddFirstDrillButton()).toBeVisible(),
      Strings.MessagePassAddFirstDrillButtonVisible,
      Strings.MessageFailAddFirstDrillButtonVisible
    );
    await ControlUtils.Click(PracticePlanPage.AddFirstDrillButton());
    await ControlUtils.Click(PracticePlanPage.SelectDrillsOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.SelectDrillsOption());
    await softAssert(
      async () => expect(PracticePlanPage.SelectDrillsOption()).toBeVisible(),
      Strings.MessagePassSelectDrillsOptionVisible,
      Strings.MessageFailSelectDrillsOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DrillCheckboxInPlan(uniqueDrillTitle));
    await softAssert(
      async () => expect(PracticePlanPage.DrillCheckboxInPlan(uniqueDrillTitle)).toBeVisible(),
      Strings.MessagePassDrillSelectedForAddition,
      Strings.MessageFailDrillSelectedForAddition
    );
    await ControlUtils.Click(PracticePlanPage.AddDrillsToPlanButton(1));
    await softAssert(
      async () => expect(PracticePlanPage.DrillsAddedToPlanToast()).toBeVisible(),
      Strings.MessagePassDrillsAddedToPlanToast,
      Strings.MessageFailDrillsAddedToPlanToast
    );
    await softAssert(
      async () => expect(PracticePlanPage.DrillInPracticePlan(uniqueDrillTitle)).toBeVisible(),
      Strings.MessagePassDrillVisibleInPracticePlan,
      Strings.MessageFailDrillVisibleInPracticePlan
    );

    testInfo.scenario = "SC-4: Edit Drill in Practice Plan";
    await ControlUtils.Click(PracticePlanPage.PracticePlanDrillOptionsButton(uniqueDrillTitle));
    await ControlUtils.WaitForVisible(PracticePlanPage.EditOption());
    await softAssert(
      async () => expect(PracticePlanPage.EditOption()).toBeVisible(),
      Strings.MessagePassEditDrillOptionVisibleInPlan,
      Strings.MessageFailEditDrillOptionVisibleInPlan
    );
    await ControlUtils.Click(PracticePlanPage.EditOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.DrillNameInputInPlan());
    await softAssert(
      async () => expect(PracticePlanPage.DrillNameInputInPlan()).toBeVisible(),
      Strings.MessagePassEditDrillFormOpenedInPlan,
      Strings.MessageFailEditDrillFormOpenedInPlan
    );
    await ControlUtils.Fill(PracticePlanPage.DrillNameInputInPlan(), Consts.UpdatedDrillNameInPlan);
    await softAssert(
      async () => expect(PracticePlanPage.DrillNameInputInPlan()).toHaveValue(Consts.UpdatedDrillNameInPlan),
      Strings.MessagePassDrillNameUpdatedInPlan,
      Strings.MessageFailDrillNameUpdatedInPlan
    );
    await ControlUtils.Fill(PracticePlanPage.DrillDurationInputInPlan(), Consts.UpdatedDrillDurationInPlan);
    await softAssert(
      async () => expect(PracticePlanPage.DrillDurationInputInPlan()).toHaveValue(Consts.UpdatedDrillDurationInPlan),
      Strings.MessagePassDrillDurationUpdatedInPlan,
      Strings.MessageFailDrillDurationUpdatedInPlan
    );
    await ControlUtils.Fill(PracticePlanPage.DrillCustomDescriptionInputInPlan(), Consts.UpdatedDrillDescriptionInPlan);
    await softAssert(
      async () => expect(PracticePlanPage.DrillCustomDescriptionInputInPlan()).toHaveValue(Consts.UpdatedDrillDescriptionInPlan),
      Strings.MessagePassDrillDescriptionUpdatedInPlan,
      Strings.MessageFailDrillDescriptionUpdatedInPlan
    );
    await ControlUtils.Click(PracticePlanPage.CustomizeNotesToggle());
    await ControlUtils.Fill(PracticePlanPage.PlanSpecificNotesInput(), Consts.PlanSpecificNotes);
    await softAssert(
      async () => expect(PracticePlanPage.PlanSpecificNotesInput()).toHaveValue(Consts.PlanSpecificNotes),
      Strings.MessagePassPlanSpecificNotesFilled,
      Strings.MessageFailPlanSpecificNotesFilled
    );
    await ControlUtils.Click(PracticePlanPage.UpdateForThisPlanButton());
    await softAssert(
      async () => expect(PracticePlanPage.DrillConfigUpdatedToast()).toBeVisible(),
      Strings.MessagePassDrillConfigUpdated,
      Strings.MessageFailDrillConfigUpdated
    );
    await softAssert(
      async () => expect(PracticePlanPage.DrillNameInPracticePlan(Consts.UpdatedDrillNameInPlan)).toBeVisible(),
      Strings.MessagePassUpdatedDrillNameVisibleInPlan,
      Strings.MessageFailUpdatedDrillNameVisibleInPlan
    );
    await softAssert(
      async () => expect(PracticePlanPage.DrillInPracticePlan(Consts.UpdatedDrillDescriptionInPlan)).toBeVisible(),
      Strings.MessagePassUpdatedDrillDescriptionVisibleInPlan,
      Strings.MessageFailUpdatedDrillDescriptionVisibleInPlan
    );

    testInfo.scenario = "SC-5: Delete Drill, Practice Plan, and Drill Category";
    await ControlUtils.Click(PracticePlanPage.PracticePlanDrillOptionsButton(Consts.UpdatedDrillNameInPlan));
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteOption());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteOption()).toBeVisible(),
      Strings.MessagePassDeleteOptionVisible,
      Strings.MessageFailDeleteOptionVisible
    );
    await ControlUtils.Click(PracticePlanPage.DeleteOption());
    await ControlUtils.WaitForVisible(PracticePlanPage.DeleteDrillFromPlanModal());
    await softAssert(
      async () => expect(PracticePlanPage.DeleteDrillFromPlanModal()).toBeVisible(),
      Strings.MessagePassDeleteDrillFromPlanModalOpened,
      Strings.MessageFailDeleteDrillFromPlanModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.DrillRemovedFromPlanToast(Consts.UpdatedDrillNameInPlan)).toBeVisible(),
      Strings.MessagePassDrillRemovedFromPlan,
      Strings.MessageFailDrillRemovedFromPlan
    );
    await softAssert(
      async () => expect(PracticePlanPage.NoDrillsYetHeading()).toBeVisible(),
      Strings.MessagePassNoDrillsYetAfterRemoval,
      Strings.MessageFailNoDrillsYetAfterRemoval
    );
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
      async () => expect(PracticePlanPage.DeletePracticePlanModal()).toBeVisible(),
      Strings.MessagePassDeletePracticePlanModalOpened,
      Strings.MessageFailDeletePracticePlanModalOpened
    );
    await ControlUtils.Click(PracticePlanPage.ConfirmDeleteButton());
    await softAssert(
      async () => expect(PracticePlanPage.PracticePlanDeletedToast(Consts.PracticePlanTitle)).toBeVisible(),
      Strings.MessagePassPracticePlanDeleted,
      Strings.MessageFailPracticePlanDeleted
    );
    await ControlUtils.Click(DrillPage.ManageDrillsButton());
    await ControlUtils.Click(DrillPage.DrillCategoriesTab());
    await ControlUtils.Click(DrillPage.DrillCategoryOptionsMenu(Consts.DrillCategoryTitle));
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryOption());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryOption()).toBeVisible(),
      Strings.MessagePassDeleteCategoryOptionVisible,
      Strings.MessageFailDeleteCategoryOptionVisible
    );
    await ControlUtils.Click(DrillPage.DeleteCategoryOption());
    await ControlUtils.WaitForVisible(DrillPage.DeleteCategoryModal());
    await softAssert(
      async () => expect(DrillPage.DeleteCategoryModal()).toBeVisible(),
      Strings.MessagePassDeleteCategoryModalOpened,
      Strings.MessageFailDeleteCategoryModalOpened
    );
    await ControlUtils.Click(DrillPage.ConfirmDeleteCategoryButton());
    await softAssert(
      async () => expect(DrillPage.CategoryDeletedToast()).toBeVisible(),
      Strings.MessagePassCategoryDeleted,
      Strings.MessageFailCategoryDeleted
    );
  });
});
