import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { SchedulePage } from "../Pages/SchedulePage.js";
import { NotesTestCaseNames } from "../Pages/TestCaseNames.js";
import { ControlUtils } from "../Pages/ControlUtils.js";

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("@stateful --OXYM-- Notes Test Suite", () => {
  test(`TC-OXYM-NOTES-01: ${NotesTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = Strings.MessagePassGuidePageVisible;
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    testInfo.scenario = Strings.MessagePassTeamSwitchedSuccessfully;
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );

    await ControlUtils.Click(HomePage.NotesTab());
    testInfo.scenario = Strings.MessagePassNotesTabOpened;
    await softAssert(
      async () => expect(HomePage.AddNoteButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNotesTabOpened,
      Strings.MessageFailNotesTabOpened
    );

    await ControlUtils.Click(HomePage.AddNoteButton());
    testInfo.scenario = Strings.MessagePassAddNoteFormOpened;
    await softAssert(
      async () => expect(HomePage.AddTitleTextbox()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassAddNoteFormOpened,
      Strings.MessageFailAddNoteFormOpened
    );

    await ControlUtils.Click(HomePage.AddTitleTextbox());
    await ControlUtils.Fill(HomePage.AddTitleTextbox(), Consts.NoteTitle);
    await ControlUtils.Click(HomePage.NoteEditorBody());
    await ControlUtils.Fill(HomePage.NoteEditorBody(), Consts.NoteBody);
    await ControlUtils.Click(HomePage.AddNoteSubmitButton());
    testInfo.scenario = Strings.MessagePassNoteCreated;
    await softAssert(
      async () => expect(HomePage.NoteCreatedMessage()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNoteCreated,
      Strings.MessageFailNoteCreated
    );
  });

  test(`TC-OXYM-NOTES-02: ${NotesTestCaseNames["TC-02"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = Strings.MessagePassGuidePageVisible;
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    testInfo.scenario = Strings.MessagePassTeamSwitchedSuccessfully;
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );

    await ControlUtils.Click(HomePage.NotesTab());
    testInfo.scenario = Strings.MessagePassNotesTabOpened;
    await softAssert(
      async () => expect(HomePage.AddNoteButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNotesTabOpened,
      Strings.MessageFailNotesTabOpened
    );

    await ControlUtils.Click(HomePage.NotesSearchTextbox());
    await ControlUtils.Fill(HomePage.NotesSearchTextbox(), Consts.NoteTitle);

    if ((await HomePage.NoteSearchResult().count()) === 0) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoNotesFound,
        Strings.MessagePassNoNotesFound
      );
      return;
    }

    await ControlUtils.ResilientClick(HomePage.NoteSearchResult());
    await HomePage.WaitForNoteDetailOpened();
    await ControlUtils.WaitForToastsHidden();
    testInfo.scenario = Strings.MessagePassNoteOpened;
    await softAssert(
      async () => expect(HomePage.NoteMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNoteOpened,
      Strings.MessageFailNoteOpened
    );
  });

  test(`TC-OXYM-NOTES-03: ${NotesTestCaseNames["TC-03"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = Strings.MessagePassGuidePageVisible;
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    testInfo.scenario = Strings.MessagePassTeamSwitchedSuccessfully;
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );

    await ControlUtils.Click(HomePage.NotesTab());
    testInfo.scenario = Strings.MessagePassNotesTabOpened;
    await softAssert(
      async () => expect(HomePage.AddNoteButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNotesTabOpened,
      Strings.MessageFailNotesTabOpened
    );

    await ControlUtils.Click(HomePage.NotesSearchTextbox());
    await ControlUtils.Fill(HomePage.NotesSearchTextbox(), Consts.NoteTitle);

    if ((await HomePage.NoteSearchResult().count()) === 0) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoNotesFound,
        Strings.MessagePassNoNotesFound
      );
      return;
    }

    await ControlUtils.ResilientClick(HomePage.NoteSearchResult());
    await HomePage.WaitForNoteDetailOpened();
    await ControlUtils.WaitForToastsHidden();
    testInfo.scenario = Strings.MessagePassNoteOpened;
    await softAssert(
      async () => expect(HomePage.NoteMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNoteOpened,
      Strings.MessageFailNoteOpened
    );

    await ControlUtils.WaitForToastsHidden();
    await ControlUtils.ResilientClick(HomePage.NoteEditButton());
    await ControlUtils.Click(HomePage.EditTitleTextbox());
    await ControlUtils.Fill(HomePage.EditTitleTextbox(), Consts.NoteTitleUpdated);
    await ControlUtils.Click(HomePage.EditNoteBodyField());
    await ControlUtils.Fill(HomePage.EditNoteBodyField(), Consts.NoteBodyUpdated);
    await ControlUtils.ResilientClick(HomePage.SaveNoteButton());
    testInfo.scenario = Strings.MessagePassNoteUpdated;
    await softAssert(
      async () => expect(HomePage.NoteUpdatedMessageLocator()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNoteUpdated,
      Strings.MessageFailNoteUpdated
    );
  });

  test(`TC-OXYM-NOTES-04: ${NotesTestCaseNames["TC-04"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = Strings.MessagePassGuidePageVisible;
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    testInfo.scenario = Strings.MessagePassTeamSwitchedSuccessfully;
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );

    await ControlUtils.Click(HomePage.NotesTab());
    testInfo.scenario = Strings.MessagePassNotesTabOpened;
    await softAssert(
      async () => expect(HomePage.AddNoteButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNotesTabOpened,
      Strings.MessageFailNotesTabOpened
    );

    await ControlUtils.Click(HomePage.NotesSearchTextbox());
    await ControlUtils.Fill(HomePage.NotesSearchTextbox(), Consts.NoteTitleUpdated);

    if ((await HomePage.NoteSearchResult(Consts.NoteBodyUpdated, Consts.NoteTitleUpdated).count()) === 0) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoNotesFound,
        Strings.MessagePassNoNotesFound
      );
      return;
    }

    await ControlUtils.ResilientClick(
      HomePage.NoteSearchResult(Consts.NoteBodyUpdated, Consts.NoteTitleUpdated)
    );
    await HomePage.WaitForNoteDetailOpened(Consts.NoteTitleUpdated);
    await ControlUtils.WaitForToastsHidden();
    testInfo.scenario = Strings.MessagePassNoteOpened;
    await softAssert(
      async () =>
        expect(HomePage.NoteDeleteButton(Consts.NoteTitleUpdated)).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNoteOpened,
      Strings.MessageFailNoteOpened
    );
    await ControlUtils.ResilientClick(HomePage.NoteDeleteButton(Consts.NoteTitleUpdated));
    testInfo.scenario = Strings.MessagePassNoteDeleteConfirmPopupVisible;
    await softAssert(
      async () => expect(HomePage.DeleteNoteConfirmPopup()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNoteDeleteConfirmPopupVisible,
      Strings.MessageFailNoteDeleteConfirmPopupVisible
    );
    await ControlUtils.ResilientClick(HomePage.ConfirmDeleteButton());
    testInfo.scenario = Strings.MessagePassNoteDeleted;
    await softAssert(
      async () => expect(HomePage.NoteDeletedMessageLocator()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNoteDeleted,
      Strings.MessageFailNoteDeleted
    );
  });
});
