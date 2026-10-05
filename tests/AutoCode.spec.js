import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { SchedulePage } from "../Pages/SchedulePage.js";
import { AutoCodeFlow } from "../Flows/AutoCodeFlow.js";
import { TestCaseNames } from "../Pages/TestCaseNames.js";

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("--OXYM-- Auto Code Test Suite", () => {
  test(`TC-OXYM-AUTOCODE-01: ${TestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Click banner button";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await softAssert(
      async () => expect(HomePage.BannerButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassBannerButtonVisible,
      Strings.MessageFailBannerButtonVisible
    );

    // Selecting the team opens its home page. The bare banner click this
    // replaced only opened the Team Pages overlay and left it open, which
    // then blocked the sign-out in teardown.
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    // await softAssert(
    //   async () => expect(HomePage.BannerButton()).toBeVisible({ timeout: 30000 }),
    //   Strings.MessagePassBannerButtonClicked,
    //   Strings.MessageFailBannerButtonClicked
    // );
  });
});
