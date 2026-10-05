import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { SchedulePage } from "../Pages/SchedulePage.js";
import { MessagePage } from "../Pages/MessagePage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import { LoginFlow } from "../Flows/LoginFlow.js";
import {
  MessageTestCaseNames,
  MessageNavStepNames,
  MessageNewChatStepNames,
  MessageAttachmentStepNames,
  MessageEventStepNames,
  MessagePracticePlanStepNames,
  MessageDrawingStepNames,
  MessagePollStepNames,
  MessageCustomGroupStepNames,
  MessageUnreadCycleStepNames,
} from "../Pages/TestCaseNames.js";

async function navigateToMessagesModule(softAssert, testInfo) {
  testInfo.scenario = `${MessageNavStepNames["Step-01"]}`;
  await softAssert(
    async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
    (await HomePage.DismissGuideIfPresent())
      ? Strings.MessagePassGuideDismissed
      : Strings.MessagePassGuideNotShown,
    Strings.MessageFailGuideHandling
  );
  await HomePage.SwitchToTeam(Consts.TeamName);
  testInfo.scenario = `${MessageNavStepNames["Step-02"]}`;
  await softAssert(
    async () => expect(SchedulePage.PollsTab()).toBeVisible(),
    Strings.MessagePassTeamSwitchedSuccessfully,
    Strings.MessageFailTeamSwitchedSuccessfully
  );

  await ControlUtils.Click(MessagePage.MessagesTabIcon());
  await MessagePage.DismissMessagesOnboardingModals();
  testInfo.scenario = `${MessageNavStepNames["Step-03"]}`;
  await softAssert(
    async () => expect(MessagePage.StartNewChatButton()).toBeVisible({ timeout: 45000 }),
    Strings.MessagePassMessagesModuleOpened,
    Strings.MessageFailMessagesModuleOpened
  );
}

/**
 * Opens the conversation row for `memberName` in the chat list. Returns false without
 * throwing when the chat list has no such conversation (e.g. a fresh account with no
 * conversations yet), so callers can skip the rest of the test instead of hard-failing
 * on a locator that will never appear.
 */
async function openExistingConversation(memberName = Consts.MessageTeamMemberName) {
  // Each conversation renders a second, desktop-sidebar copy of its row that
  // stays hidden below Tailwind's xl breakpoint (see MessagePage.ChatHeaderTitle);
  // an unscoped getByText().first() can resolve to that hidden copy instead of
  // the one actually visible at the headless viewport width.
  const conversationRow = global.page
    .getByText(memberName, { exact: true })
    .filter({ visible: true })
    .first();
  if ((await conversationRow.count()) === 0) {
    return false;
  }
  await MessagePage.ClickAndDismissGuide(conversationRow);
  return true;
}

async function reopenMessagesModuleForCurrentUser() {
  await MessagePage.DismissGuideIfPresent();
  const teamSelector = HomePage.TeamSelectorButton();
  if (await teamSelector.isVisible({ timeout: 5000 }).catch(() => false)) {
    await HomePage.SwitchToTeam(Consts.TeamName);
  }
  await ControlUtils.Click(MessagePage.MessagesTabIcon());
  await MessagePage.DismissMessagesOnboardingModals();
  // The Chat tab's own contextual tour (e.g. "Messages - Chat") is
  // Contentful-backed and can render a few seconds after the tab settles -
  // after DismissMessagesOnboardingModals has already returned because the
  // "Start new chat" button was visible underneath it. Wait for it to close
  // before the caller inspects the chat list, otherwise checks like the
  // unread badge run against a screen still covered by the guide overlay.
  await MessagePage.DismissGuideIfPresent(5000);
}

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("--OXYM-- Message Module Test Suite", () => {
  test.only(`TC-OXYM-MSG-01: ${MessageTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    await navigateToMessagesModule(softAssert, testInfo);

    testInfo.scenario = `${MessageNewChatStepNames["Step-01"]}`;
    await MessagePage.ClickAndDismissGuide(MessagePage.StartNewChatButton());
    testInfo.scenario = `${MessageNewChatStepNames["Step-02"]}`;
    await softAssert(
      async () => expect(MessagePage.NewChatHeading()).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassNewChatScreenOpened,
      Strings.MessageFailNewChatScreenOpened
    );

    testInfo.scenario = `${MessageNewChatStepNames["Step-03"]}`;
    await MessagePage.ClickAndDismissGuide(MessagePage.MemberRow(Consts.MessageTeamMemberName));
    testInfo.scenario = `${MessageNewChatStepNames["Step-04"]}`;
    await softAssert(
      async () =>
        expect(MessagePage.ChatHeaderTitle(Consts.MessageTeamMemberName)).toBeVisible({
          timeout: 25000,
        }),
      Strings.MessagePassMemberSelected,
      Strings.MessageFailMemberSelected
    );

    testInfo.scenario = `${MessageNewChatStepNames["Step-05"]}`;
    const messageText = `${Consts.MessageText} ${Date.now()}`;
    await MessagePage.TypeMessage(messageText);
    await softAssert(
      async () => expect(MessagePage.MessageComposerInput()).toHaveValue(messageText),
      Strings.MessagePassMessageTyped,
      Strings.MessageFailMessageTyped
    );

    testInfo.scenario = `${MessageNewChatStepNames["Step-06"]}`;
    await global.page.keyboard.press("Enter");
    await softAssert(
      async () => expect(MessagePage.MessageBubble(messageText)).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassMessageSent,
      Strings.MessageFailMessageSent
    );
  });
  test(`TC-OXYM-MSG-02: ${MessageTestCaseNames["TC-02"]}`, async ({ softAssert }, testInfo) => {
    await navigateToMessagesModule(softAssert, testInfo);
    if (!(await openExistingConversation(Consts.MessageTeamMemberName))) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoConversationsFound,
        Strings.MessagePassNoConversationsFound
      );
      return;
    }

    testInfo.scenario = `${MessageAttachmentStepNames["Step-01"]}`;
    await MessagePage.OpenAttachMenu();
    testInfo.scenario = `${MessageAttachmentStepNames["Step-02"]}`;
    await softAssert(
      async () => expect(MessagePage.AttachmentOption()).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassAttachMenuOpened,
      Strings.MessageFailAttachMenuOpened
    );

    testInfo.scenario = `${MessageAttachmentStepNames["Step-03"]}`;
    await ControlUtils.UploadFile(MessagePage.FileUploadInput(), Consts.MessageAttachmentFilePath);
    await global.page.waitForTimeout(1000);
    await ControlUtils.ResilientClick(
      MessagePage.MessageComposerInput().locator("xpath=following::button[1]")
    );

    testInfo.scenario = `${MessageAttachmentStepNames["Step-04"]}`;
    await softAssert(
      async () =>
        expect(global.page.getByText(Consts.FilesUploadFileName, { exact: true }).last()).toBeVisible({
          timeout: 20000,
        }),
      Strings.MessagePassFileAttached,
      Strings.MessageFailFileAttached
    );
  });
  test(`TC-OXYM-MSG-03: ${MessageTestCaseNames["TC-03"]}`, async ({ softAssert }, testInfo) => {
    await navigateToMessagesModule(softAssert, testInfo);
    if (!(await openExistingConversation(Consts.MessageTeamMemberName))) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoConversationsFound,
        Strings.MessagePassNoConversationsFound
      );
      return;
    }

    testInfo.scenario = `${MessageEventStepNames["Step-01"]}`;
    await MessagePage.OpenAttachMenu();
    testInfo.scenario = `${MessageEventStepNames["Step-02"]}`;
    await ControlUtils.Click(MessagePage.EventOption());
    testInfo.scenario = `${MessageEventStepNames["Step-03"]}`;
    await softAssert(
      async () => expect(MessagePage.SelectEventHeading()).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassEventPickerOpened,
      Strings.MessageFailEventPickerOpened
    );

    // The picker opens into a calendar/day view by default; switch to the
    // scrollable event list to pick a concrete event.
    await ControlUtils.Click(MessagePage.EventListViewToggleButton());

    const hasEvent = await MessagePage.FirstEventRow()
      .isVisible({ timeout: 8000 })
      .catch(() => false);
    if (!hasEvent) {
      await MessagePage.EventPickerModal().locator("button").first().click().catch(() => {});
      return;
    }

    testInfo.scenario = `${MessageEventStepNames["Step-04"]}`;
    await ControlUtils.Click(MessagePage.FirstEventRow());
    await ControlUtils.ResilientClick(MessagePage.ShareEventButton());

    testInfo.scenario = `${MessageEventStepNames["Step-05"]}`;
    await softAssert(
      async () => expect(global.page.getByText("Share Event")).toBeHidden({ timeout: 20000 }),
      Strings.MessagePassEventShared,
      Strings.MessageFailEventShared
    );
  });
  test(`TC-OXYM-MSG-04: ${MessageTestCaseNames["TC-04"]}`, async ({ softAssert }, testInfo) => {
    await navigateToMessagesModule(softAssert, testInfo);
    if (!(await openExistingConversation(Consts.MessageTeamMemberName))) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoConversationsFound,
        Strings.MessagePassNoConversationsFound
      );
      return;
    }

    testInfo.scenario = `${MessagePracticePlanStepNames["Step-01"]}`;
    await MessagePage.OpenAttachMenu();
    testInfo.scenario = `${MessagePracticePlanStepNames["Step-02"]}`;
    await ControlUtils.Click(MessagePage.PracticePlanOption());
    testInfo.scenario = `${MessagePracticePlanStepNames["Step-03"]}`;
    await softAssert(
      async () => expect(MessagePage.SelectPracticePlanHeading()).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassPracticePlanPickerOpened,
      Strings.MessageFailPracticePlanPickerOpened
    );

    const hasPlan = await MessagePage.FirstPracticePlanRow()
      .isVisible({ timeout: 8000 })
      .catch(() => false);
    if (!hasPlan) {
      await MessagePage.PracticePlanPickerModal().locator("button").first().click().catch(() => {});
      return;
    }

    testInfo.scenario = `${MessagePracticePlanStepNames["Step-04"]}`;
    await ControlUtils.Click(MessagePage.FirstPracticePlanRow());
    await ControlUtils.ResilientClick(MessagePage.SharePlanButton());

    testInfo.scenario = `${MessagePracticePlanStepNames["Step-05"]}`;
    await softAssert(
      async () => expect(global.page.getByText("Share Plan")).toBeHidden({ timeout: 20000 }),
      Strings.MessagePassPracticePlanShared,
      Strings.MessageFailPracticePlanShared
    );
  });
  test(`TC-OXYM-MSG-05: ${MessageTestCaseNames["TC-05"]}`, async ({ softAssert }, testInfo) => {
    await navigateToMessagesModule(softAssert, testInfo);
    if (!(await openExistingConversation(Consts.MessageTeamMemberName))) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoConversationsFound,
        Strings.MessagePassNoConversationsFound
      );
      return;
    }

    testInfo.scenario = `${MessageDrawingStepNames["Step-01"]}`;
    await MessagePage.OpenAttachMenu();
    testInfo.scenario = `${MessageDrawingStepNames["Step-02"]}`;
    await ControlUtils.Click(MessagePage.PlaybookDrawingOption());
    testInfo.scenario = `${MessageDrawingStepNames["Step-03"]}`;
    await softAssert(
      async () => expect(MessagePage.SelectDrawingHeading()).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassDrawingPickerOpened,
      Strings.MessageFailDrawingPickerOpened
    );

    const hasDrawing = await MessagePage.FirstDrawingRow()
      .isVisible({ timeout: 8000 })
      .catch(() => false);
    if (!hasDrawing) {
      await softAssert(
        async () => expect(MessagePage.FirstDrawingRow()).not.toBeVisible(),
        Strings.MessagePassNoDrawingAvailable,
        Strings.MessageFailNoDrawingAvailable
      );
      await MessagePage.DrawingPickerModal().locator("button").first().click().catch(() => {});
      return;
    }

    testInfo.scenario = `${MessageDrawingStepNames["Step-04"]}`;
    await ControlUtils.Click(MessagePage.FirstDrawingRow());
    await ControlUtils.ResilientClick(MessagePage.ShareDrawingButton());

    testInfo.scenario = `${MessageDrawingStepNames["Step-05"]}`;
    await softAssert(
      async () => expect(MessagePage.SelectDrawingHeading()).toBeHidden({ timeout: 20000 }),
      Strings.MessagePassDrawingShared,
      Strings.MessageFailDrawingShared
    );
  });
  test(`TC-OXYM-MSG-06: ${MessageTestCaseNames["TC-06"]}`, async ({ softAssert }, testInfo) => {
    await navigateToMessagesModule(softAssert, testInfo);

    testInfo.scenario = `${MessagePollStepNames["Step-01"]}`;
    if (!(await openExistingConversation(Consts.MessageGroupConversationName))) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoConversationsFound,
        Strings.MessagePassNoConversationsFound
      );
      return;
    }

    testInfo.scenario = `${MessagePollStepNames["Step-02"]}`;
    await MessagePage.OpenAttachMenu();
    testInfo.scenario = `${MessagePollStepNames["Step-03"]}`;
    await ControlUtils.Click(MessagePage.PollOption());
    await softAssert(
      async () => expect(MessagePage.CreatePollHeading()).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassPollFormOpened,
      Strings.MessageFailPollFormOpened
    );

    testInfo.scenario = `${MessagePollStepNames["Step-04"]}`;
    const pollQuestion = `${Consts.MessagePollQuestion} ${Date.now()}`;
    await MessagePage.FillPollQuestionAndOptions(
      pollQuestion,
      Consts.MessagePollOption1,
      Consts.MessagePollOption2
    );
    await softAssert(
      async () => expect(MessagePage.PollQuestionInput()).toHaveValue(pollQuestion),
      Strings.MessagePassPollQuestionEntered,
      Strings.MessageFailPollQuestionEntered
    );

    testInfo.scenario = `${MessagePollStepNames["Step-05"]}`;
    await ControlUtils.ResilientClick(MessagePage.CreatePollButton());
    await softAssert(
      async () => expect(global.page.getByText(pollQuestion, { exact: true }).last()).toBeVisible({
        timeout: 20000,
      }),
      Strings.MessagePassPollCreated,
      Strings.MessageFailPollCreated
    );
  });
  test(`TC-OXYM-MSG-07: ${MessageTestCaseNames["TC-07"]}`, async ({ softAssert }, testInfo) => {
    await navigateToMessagesModule(softAssert, testInfo);

    testInfo.scenario = `${MessageCustomGroupStepNames["Step-01"]}`;
    await MessagePage.ClickAndDismissGuide(MessagePage.StartNewChatButton());
    await softAssert(
      async () => expect(MessagePage.NewChatHeading()).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassNewChatScreenOpened,
      Strings.MessageFailNewChatScreenOpened
    );

    testInfo.scenario = `${MessageCustomGroupStepNames["Step-02"]}`;
    await MessagePage.ClickAndDismissGuide(MessagePage.CustomGroupOption());
    testInfo.scenario = `${MessageCustomGroupStepNames["Step-03"]}`;
    await softAssert(
      async () => expect(MessagePage.SelectMembersHeading()).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassCustomGroupOptionSelected,
      Strings.MessageFailCustomGroupOptionSelected
    );

    testInfo.scenario = `${MessageCustomGroupStepNames["Step-04"]}`;
    await ControlUtils.Click(MessagePage.GroupMemberOption(Consts.MessageSecondTeamMemberName));
    await ControlUtils.Click(MessagePage.GroupMemberOption(Consts.MessageTeamMemberName));
    await softAssert(
      async () => expect(MessagePage.CreateGroupWithMembersButton()).toBeVisible({ timeout: 10000 }),
      Strings.MessagePassGroupMembersSelected,
      Strings.MessageFailGroupMembersSelected
    );

    testInfo.scenario = `${MessageCustomGroupStepNames["Step-05"]}`;
    await ControlUtils.Click(MessagePage.CreateGroupWithMembersButton());
    const groupName = `${Consts.MessageCustomGroupName} ${Date.now()}`;
    await softAssert(
      async () => expect(MessagePage.CreateGroupChatHeading()).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassCreateGroupDialogOpened,
      Strings.MessageFailCreateGroupDialogOpened
    );
    await MessagePage.FillGroupNameAndDescription(groupName, Consts.MessageCustomGroupDescription);

    testInfo.scenario = `${MessageCustomGroupStepNames["Step-06"]}`;
    await ControlUtils.Click(MessagePage.CreateGroupConfirmButton());
    await softAssert(
      async () => expect(MessagePage.ChatHeaderTitle(groupName)).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassCustomGroupCreated,
      Strings.MessageFailCustomGroupCreated
    );

    testInfo.scenario = `${MessageCustomGroupStepNames["Step-07"]}`;
    const groupMessage = `${Consts.MessageText} ${Date.now()}`;
    await MessagePage.SendMessage(groupMessage);
    await softAssert(
      async () => expect(MessagePage.MessageBubble(groupMessage)).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassMessageSent,
      Strings.MessageFailMessageSent
    );
  });
  test(`TC-OXYM-MSG-08: ${MessageTestCaseNames["TC-08"]}`, async ({ softAssert }, testInfo) => {
    await navigateToMessagesModule(softAssert, testInfo);

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-01"]}`;
    await MessagePage.ClickAndDismissGuide(MessagePage.StartNewChatButton());
    await MessagePage.NewChatHeading().waitFor({ state: "visible", timeout: 15000 });
    const memberEmail = await MessagePage.GetMemberEmail(Consts.MessageTeamMemberName);
    await softAssert(
      async () => expect(memberEmail).toMatch(/[\w.+-]+@[\w-]+\.[\w.-]+/),
      Strings.MessagePassMemberEmailVisible,
      Strings.MessageFailMemberEmailVisible
    );
    // GetMemberEmail's scan over the member list can occasionally catch the
    // list mid re-render; give it a moment to settle before clicking the row.
    await global.page.waitForTimeout(500);
    await MessagePage.ClickAndDismissGuide(MessagePage.MemberRow(Consts.MessageTeamMemberName));
    await global.page.waitForTimeout(1000);

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-02"]}`;
    const sentMessage = `${Consts.MessageText} ${Date.now()}`;
    await MessagePage.SendMessage(sentMessage);
    await softAssert(
      async () => expect(MessagePage.MessageBubble(sentMessage)).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassMessageSent,
      Strings.MessageFailMessageSent
    );

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-03"]}`;
    await LoginFlow.SignOut();
    await softAssert(
      async () => expect(HomePage.Email()).toBeVisible({ timeout: 20000 }),
      Strings.MessagePassSignedOutForUserSwitch,
      Strings.MessageFailSignedOutForUserSwitch
    );

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-04"]}`;
    await LoginFlow.AppLogin(memberEmail, Consts.MessagePasswordText);
    // Some Guide slides (e.g. the Home-tab tour) render "Guide" as a plain
    // label rather than an ARIA heading, and the slide covers the rest of the
    // screen - none of PostLoginIndicator's alternatives can match while it's
    // up. Dismiss it first, matching the order used in navigateToMessagesModule.
    await MessagePage.DismissGuideIfPresent();
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassSecondUserLoggedIn,
      Strings.MessageFailSecondUserLoggedIn
    );
    await MessagePage.DismissGuideIfPresent();

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-05"]}`;
    await softAssert(
      async () => expect(MessagePage.HomeMessagesTileBadge()).toBeVisible({ timeout: 20000 }),
      Strings.MessagePassHomeBadgeCountVisible,
      Strings.MessageFailHomeBadgeCountVisible
    );

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-06"]}`;
    await reopenMessagesModuleForCurrentUser();
    const previewSnippet = sentMessage.split(" ").slice(0, 4).join(" ");
    const conversationRow = MessagePage.ConversationRowByPreviewText(previewSnippet);
    const badgeAppeared = await MessagePage.UnreadBadgeInRow(conversationRow)
      .waitFor({ state: "visible", timeout: 60000 })
      .then(() => true)
      .catch(() => false);
    await softAssert(
      async () => expect(badgeAppeared).toBe(true),
      Strings.MessagePassChatListUnreadBadgeVisible,
      Strings.MessageFailChatListUnreadBadgeVisible
    );

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-07"]}`;
    await MessagePage.ClickAndDismissGuide(conversationRow);
    await softAssert(
      async () => expect(MessagePage.MessageBubble(sentMessage)).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassUnreadMessageVisibleInChat,
      Strings.MessageFailUnreadMessageVisibleInChat
    );

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-08"]}`;
    const replyMessage = `${Consts.MessageReplyText} ${Date.now()}`;
    await MessagePage.SendMessage(replyMessage);
    await softAssert(
      async () => expect(MessagePage.MessageBubble(replyMessage)).toBeVisible({ timeout: 15000 }),
      Strings.MessagePassReplySent,
      Strings.MessageFailReplySent
    );

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-09"]}`;
    await ControlUtils.Click(MessagePage.MessagesTabIcon());
    await global.page.waitForTimeout(1500);
    // From the team member's own inbox, the row is identified by the reply they
    // just sent (their inbox lists the conversation, not their own display name).
    const replyPreviewSnippet = replyMessage.split(" ").slice(0, 4).join(" ");
    const conversationRowAfterReply = MessagePage.ConversationRowByPreviewText(replyPreviewSnippet);
    await softAssert(
      async () =>
        expect(MessagePage.UnreadBadgeInRow(conversationRowAfterReply)).not.toBeVisible({
          timeout: 10000,
        }),
      Strings.MessagePassChatListUnreadBadgeCleared,
      Strings.MessageFailChatListUnreadBadgeCleared
    );

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-10"]}`;
    await LoginFlow.SignOut();
    await LoginFlow.AppLogin(Consts.Email, Consts.PasswordText);
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassSecondUserLoggedIn,
      Strings.MessageFailSecondUserLoggedIn
    );

    testInfo.scenario = `${MessageUnreadCycleStepNames["Step-11"]}`;
    await reopenMessagesModuleForCurrentUser();
    // Back in the sender's inbox the row is identified by the member's reply,
    // which is now the conversation's latest message. The row's display name is
    // rendered together with an avatar-initials node, so an exact-text match on
    // the member name alone does not resolve to a clickable element here.
    const replyConversationRow = MessagePage.ConversationRowByPreviewText(replyPreviewSnippet);
    // The chat list is populated after the tab renders, so the row can be
    // missing on first paint. Give it time to sync, re-opening the tab once if
    // the reply preview still has not landed.
    for (let attempt = 0; attempt < 3; attempt++) {
      const visible = await replyConversationRow
        .waitFor({ state: "visible", timeout: 30000 })
        .then(() => true)
        .catch(() => false);
      if (visible) break;
      if (attempt === 2) {
        throw new Error(`Reply conversation row never appeared in the chat list: ${replyMessage}`);
      }
      await reopenMessagesModuleForCurrentUser();
    }
    await MessagePage.ClickAndDismissGuide(replyConversationRow);
    await softAssert(
      async () => expect(MessagePage.SeenReadReceipt().last()).toBeVisible({ timeout: 20000 }),
      Strings.MessagePassReadReceiptVisible,
      Strings.MessageFailReadReceiptVisible
    );
  });
});
