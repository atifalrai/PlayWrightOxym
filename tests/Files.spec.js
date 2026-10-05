import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { SchedulePage } from "../Pages/SchedulePage.js";
import { FilesPage } from "../Pages/FilesPage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import { FilesTestCaseNames, FilesNavStepNames, FilesStepNames, FilesUploadStepNames, FilesDeleteStepNames, FilesDeleteFolderStepNames } from "../Pages/TestCaseNames.js";

async function navigateToFilesModule(softAssert, testInfo) {
  testInfo.scenario = `${FilesNavStepNames["Step-01"]}`;
  await softAssert(
    async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
    (await HomePage.DismissGuideIfPresent())
      ? Strings.MessagePassGuideDismissed
      : Strings.MessagePassGuideNotShown,
    Strings.MessageFailGuideHandling
  );
  await HomePage.SwitchToTeam(Consts.TeamName);
  testInfo.scenario = `${FilesNavStepNames["Step-02"]}`;
  await softAssert(
    async () => expect(SchedulePage.PollsTab()).toBeVisible(),
    Strings.MessagePassTeamSwitchedSuccessfully,
    Strings.MessageFailTeamSwitchedSuccessfully
  );
  await ControlUtils.Click(FilesPage.FilesTile());
  testInfo.scenario = `${FilesNavStepNames["Step-03"]}`;
  await softAssert(
    async () => expect(FilesPage.AddFilesButton()).toBeVisible({ timeout: 30000 }),
    Strings.MessagePassFilesModuleOpened,
    Strings.MessageFailFilesModuleOpened
  );
}

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("--OXYM-- Files Module Test Suite", () => {
  test(`TC-OXYM-FILES-01: ${FilesTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    const folderName = Consts.FolderTitle;

    await navigateToFilesModule(softAssert, testInfo);

    testInfo.scenario = `${FilesStepNames["Step-02"]}`;
    await ControlUtils.Click(FilesPage.AddFilesButton());
    await softAssert(
      async () => expect(FilesPage.AddNewFolderOption()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAddFilesButtonClicked,
      Strings.MessageFailAddFilesButtonClicked
    );

    testInfo.scenario = `${FilesStepNames["Step-03"]}`;
    await ControlUtils.Click(FilesPage.AddNewFolderOption());
    await softAssert(
      async () => expect(FilesPage.FolderTitleTextbox()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAddNewFolderOptionSelected,
      Strings.MessageFailAddNewFolderOptionSelected
    );

    testInfo.scenario = `${FilesStepNames["Step-04"]}`;
    await softAssert(
      async () => expect(FilesPage.FolderTitleTextbox()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAddNewFolderPopupVisible,
      Strings.MessageFailAddNewFolderPopupVisible
    );

    testInfo.scenario = `${FilesStepNames["Step-05"]}`;
    await FilesPage.FillFolderTitle(folderName);
    await softAssert(
      async () =>
        expect(FilesPage.FolderTitleTextbox()).toHaveValue(folderName, {
          timeout: 30000,
        }),
      Strings.MessagePassFolderTitleEntered,
      Strings.MessageFailFolderTitleEntered
    );

    testInfo.scenario = `${FilesStepNames["Step-06"]}`;
    await ControlUtils.ResilientClick(FilesPage.AddFolderButton());
    await softAssert(
      async () => expect(FilesPage.FolderCreatedToast(folderName)).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassFolderCreated,
      Strings.MessageFailFolderCreated
    );

    // testInfo.scenario = `${FilesStepNames["Step-07"]}`;
    // await softAssert(
    //   async () => expect(FilesPage.FolderNameText(folderName)).toBeVisible({ timeout: 30000 }),
    //   Strings.MessagePassFolderOpenedWithCorrectName,
    //   Strings.MessageFailFolderOpenedWithCorrectName
    // );
    testInfo.scenario = `Verify new folder shows empty state`;
    await softAssert(
      async () => expect(FilesPage.NoFilesFoundMessage()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNewFolderEmptyState,
      Strings.MessageFailNewFolderEmptyState
    );
    await ControlUtils.Click(FilesPage.FolderBreadcrumbBackButton());
  });

  test(`TC-OXYM-FILES-02: ${FilesTestCaseNames["TC-02"]}`, async ({ softAssert }, testInfo) => {
    const uploadedFileName = Consts.FilesUploadFileDisplayName;

    await navigateToFilesModule(softAssert, testInfo);

    testInfo.scenario = `${FilesUploadStepNames["Step-01"]}`;
    await ControlUtils.Click(FilesPage.AddFilesButton());
    await softAssert(
      async () => expect(FilesPage.AddNewFileOption()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAddFilesButtonClicked,
      Strings.MessageFailAddFilesButtonClicked
    );

    testInfo.scenario = `${FilesUploadStepNames["Step-03"]}`;
    await softAssert(
      async () => expect(FilesPage.AddNewFilePopupHeading()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAddNewFilePopupVisible,
      Strings.MessageFailAddNewFilePopupVisible
    );
    testInfo.scenario = `${FilesUploadStepNames["Step-02"]}`;
    
    await ControlUtils.Click(FilesPage.AddNewFileOption());
    await softAssert(
      async () => expect(FilesPage.ClickToUploadArea()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAddNewFileOptionSelected,
      Strings.MessageFailAddNewFileOptionSelected
    );

    testInfo.scenario = `${FilesUploadStepNames["Step-04"]}`;
    await ControlUtils.UploadFile(FilesPage.FileUploadInput(), Consts.FilesUploadFilePath);
    await softAssert(
      async () => expect(FilesPage.SaveFileButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassFileUploaded,
      Strings.MessageFailFileUploaded
    );

    testInfo.scenario = `${FilesUploadStepNames["Step-05"]}`;
    await ControlUtils.Click(FilesPage.SaveFileButton());
    await softAssert(
      async () => expect(FilesPage.AddNewFilePopupHeading()).toBeHidden({ timeout: 30000 }),
      Strings.MessagePassSaveFileButtonClicked,
      Strings.MessageFailSaveFileButtonClicked
    );

    testInfo.scenario = `${FilesUploadStepNames["Step-06"]}`;
    await softAssert(
      async () => expect(FilesPage.FileUploadedToast()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassFileUploadedToast,
      Strings.MessageFailFileUploadedToast
    );

  //   testInfo.scenario = `${FilesUploadStepNames["Step-07"]}`;
  //   await softAssert(
  //     async () => expect(FilesPage.FileInList(uploadedFileName)).toBeVisible({ timeout: 30000 }),
  //     Strings.MessagePassFileVisibleInList,
  //     Strings.MessageFailFileVisibleInList
  //   );

  //   testInfo.scenario = `${FilesUploadStepNames["Step-08"]}`;
  //   await softAssert(
  //     async () =>
  //       expect(FilesPage.FileInRecentSection(uploadedFileName)).toBeVisible({ timeout: 30000 }),
  //     Strings.MessagePassFileVisibleInRecentSection,
  //     Strings.MessageFailFileVisibleInRecentSection
  //   );
   });

  test(`TC-OXYM-FILES-03: ${FilesTestCaseNames["TC-03"]}`, async ({ softAssert }, testInfo) => {
    const uploadedFileName = Consts.FilesUploadFileDisplayName;

    await navigateToFilesModule(softAssert, testInfo);

    testInfo.scenario = `${FilesDeleteStepNames["Step-03"]}`;
    await FilesPage.SearchForFile(Consts.FilesUploadFileSearchText);

    const isFilePresent = await FilesPage.isFilePresentInSearchResults(uploadedFileName);

    if (!isFilePresent) {
      testInfo.scenario = `${FilesDeleteStepNames["Step-02"]}`;
      await ControlUtils.Click(FilesPage.AddFilesButton());
      await ControlUtils.Click(FilesPage.AddNewFileOption());
      await softAssert(
        async () => expect(FilesPage.ClickToUploadArea()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassAddNewFileOptionSelected,
        Strings.MessageFailAddNewFileOptionSelected
      );
      await ControlUtils.UploadFile(FilesPage.FileUploadInput(), Consts.FilesUploadFilePath);
      await ControlUtils.Click(FilesPage.SaveFileButton());
      await softAssert(
        async () => expect(FilesPage.FileUploadedToast()).toBeVisible({ timeout: 30000 }),
        Strings.MessagePassFileUploadedInFolder,
        Strings.MessageFailFileUploadedInFolder
      );
      await FilesPage.SearchForFile(Consts.FilesUploadFileSearchText);
      await softAssert(
        async () =>
          expect(await FilesPage.isFilePresentInSearchResults(uploadedFileName)).toBe(true),
        Strings.MessagePassFilePresentForDelete,
        Strings.MessageFailFilePresentForDelete
      );
    } else {
      await softAssert(
        async () =>
          expect(await FilesPage.isFilePresentInSearchResults(uploadedFileName)).toBe(true),
        Strings.MessagePassFileUploadSkipped,
        Strings.MessageFailFileUploadSkipped
      );
    }

    testInfo.scenario = `${FilesDeleteStepNames["Step-04"]}`;
    await ControlUtils.ResilientClick(FilesPage.FileEllipsisButton(uploadedFileName));
    await softAssert(
      async () => expect(FilesPage.DeleteFileOption()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassFileEllipsisClicked,
      Strings.MessageFailFileEllipsisClicked
    );

    testInfo.scenario = `${FilesDeleteStepNames["Step-05"]}`;
    await ControlUtils.Click(FilesPage.DeleteFileOption());

    testInfo.scenario = `Verify Delete confirmation popup appears`;
    await softAssert(
      async () => expect(FilesPage.ConfirmDeletePopupHeading()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassConfirmDeletePopupVisible,
      Strings.MessageFailConfirmDeletePopupVisible
    );

    testInfo.scenario = `${FilesDeleteStepNames["Step-07"]}`;
    await FilesPage.ClickConfirmDeleteButton();

    testInfo.scenario = `${FilesDeleteStepNames["Step-08"]}`;
    await softAssert(
      async () => expect(FilesPage.FileDeletedToast()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassFileDeletedToast,
      Strings.MessageFailFileDeletedToast
    );
  });

  test(`TC-OXYM-FILES-04: ${FilesTestCaseNames["TC-04"]}`, async ({ softAssert }, testInfo) => {
    const folderName = Consts.FolderTitle;

    await navigateToFilesModule(softAssert, testInfo);

    testInfo.scenario = `${FilesDeleteFolderStepNames["Step-01"]}`;
    await FilesPage.SearchForFolder(folderName);

    const isFolderPresent = await FilesPage.FolderInSearchResults(folderName)
      .isVisible({ timeout: 10000 })
      .catch(() => false);

    if (!isFolderPresent) {
      await softAssert(
        async () => expect(FilesPage.FolderInSearchResults(folderName)).not.toBeVisible(),
        Strings.MessagePassFolderNotPresentForDelete,
        Strings.MessageFailFolderNotPresentForDelete
      );
      return;
    }

    await softAssert(
      async () => expect(FilesPage.FolderInSearchResults(folderName)).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassFolderPresentForDelete,
      Strings.MessageFailFolderPresentForDelete
    );

    testInfo.scenario = `${FilesDeleteFolderStepNames["Step-02"]}`;
    await ControlUtils.ResilientClick(FilesPage.FirstSearchResultEllipsisButton(folderName));
    await softAssert(
      async () => expect(FilesPage.DeleteFolderOption()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassFolderEllipsisClicked,
      Strings.MessageFailFolderEllipsisClicked
    );

    testInfo.scenario = `${FilesDeleteFolderStepNames["Step-03"]}`;
    await ControlUtils.Click(FilesPage.DeleteFolderOption());

    testInfo.scenario = `${FilesDeleteFolderStepNames["Step-04"]}`;
    await softAssert(
      async () => expect(FilesPage.ConfirmDeletePopupHeading()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassDeleteFolderOptionSelected,
      Strings.MessageFailDeleteFolderOptionSelected
    );
    testInfo.scenario = `Verify Delete confirmation popup appears`;
    await softAssert(
      async () => expect(FilesPage.ConfirmDeletePopupHeading()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassConfirmDeleteFolderPopupVisible,
      Strings.MessageFailConfirmDeleteFolderPopupVisible
    );

    testInfo.scenario = `${FilesDeleteFolderStepNames["Step-05"]}`;
    await FilesPage.ClickConfirmDeleteButton();

    testInfo.scenario = `${FilesDeleteFolderStepNames["Step-06"]}`;
    await softAssert(
      async () => expect(FilesPage.FolderDeletedToast()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassFolderDeletedToast,
      Strings.MessageFailFolderDeletedToast
    );

    // testInfo.scenario = `${FilesDeleteFolderStepNames["Step-07"]}`;
    // await FilesPage.SearchForFolder(folderName);
    // await softAssert(
    //   async () => expect(FilesPage.FolderInSearchResults(folderName)).not.toBeVisible({ timeout: 30000 }),
    //   Strings.MessagePassFolderRemovedFromList,
    //   Strings.MessageFailFolderRemovedFromList
    // );
  });
});
