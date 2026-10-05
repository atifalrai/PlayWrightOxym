import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { SchedulePage } from "../Pages/SchedulePage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import { LoginFlow } from "../Flows/LoginFlow.js";
//import { NotesFlow } from "../Flows/NotesFlow.js";
import { TestCaseNames } from "../Pages/TestCaseNames.js";
import { AppFlow } from "../Flows/AppFlow.js";

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});


test.describe("--OXYM-- Login and Sport Selection Test Suite", () => {
  test(`TC-OXYM-PROJECT-01: ${TestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Login with valid credentials";
   

    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
  });
});
