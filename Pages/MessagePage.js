import { ControlUtils } from "./ControlUtils";
import { Consts } from "./Consts";

export class MessagePage {
  static Button_Role = "button";
  static Textbox_Role = "textbox";

  static MessagesTabIcon_Identifier = "#tab-button-messages";
  static ChatTab_Text = "Chat";
  static EmailsTab_Text = "Emails";
  static AnnouncementsTab_Text = "Announcements";
  static GotItButton_RoleName = "Got It";
  static StartNewChatButton_RoleName = "Start new chat";
  static NewChatHeading_Text = "New chat";
  static CustomGroupOption_Text = "Custom Group";
  static SelectMembersHeading_Text = "Select Members";
  static SearchMembers_Placeholder = "Search members";
  static CreateGroupChatHeading_Text = "Create Group Chat";
  static GroupDescription_Placeholder = "Description";
  static Create_Button_Text = "Create";
  static Message_Placeholder = "Message";
  static Urgent_Text = "Urgent";
  static Attachment_Text = "Attachment";
  static Poll_Text = "Poll";
  static Event_Text = "Event";
  static PracticePlan_Text = "PracticePlan";
  static PlaybookDrawing_Text = "Playbook";
  static File_Text = "File";
  static SelectEventHeading_Text = "Select Event";
  static ShareEvent_RoleName = "Share Event";
  static CreatePollHeading_Text = "Create a Poll";
  static PollQuestion_Placeholder = "Enter your poll question";
  static PollOption1_Placeholder = "Option 1";
  static PollOption2_Placeholder = "Option 2";
  static CreatePoll_RoleName = "Create Poll";
  static SelectPracticePlanHeading_Text = "Select Practice Plan";
  static SharePlan_RoleName = "Share Plan";
  static SelectDrawingHeading_Text = "Select Drawing";
  static SelectFileHeading_Text = "Select File";
  static ShareFile_RoleName = "Share File";

  // ---- Navigation ----

  static MessagesTabIcon() {
    return ControlUtils.WaitForVisible(global.page.locator(this.MessagesTabIcon_Identifier));
  }

  static ChatTab() {
    return global.page.getByText(this.ChatTab_Text, { exact: true });
  }

  static ChatConversationList() {
    return global.page.getByPlaceholder("Search conversations");
  }

  // The onboarding "Guide" carousel is always rendered inside this custom
  // element (confirmed via DOM inspection); scoping to it avoids matching an
  // unrelated "close"-labeled control elsewhere on the page.
  static GuideModal() {
    return global.page.locator("app-onboarding-modal");
  }

  /**
   * The Guide can be a single slide (just "Get Started") or a multi-slide
   * carousel (Next -> ... -> Get Started), and its close icon is an
   * <ion-button> with aria-label="Close guide". Try the close button first,
   * then whichever nav button is present, looping until the heading is gone.
   */
  static async DismissGuideCarousel(maxAttempts = 6) {
    const modal = this.GuideModal();
    const guideHeading = modal.getByRole("heading", { name: "Guide" });
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (!(await guideHeading.isVisible({ timeout: 500 }).catch(() => false))) {
        return;
      }
      const closeButton = modal.getByRole("button", { name: /close/i });
      const getStarted = modal.getByRole("button", { name: "Get Started", exact: true });
      const next = modal.getByRole("button", { name: "Next", exact: true });
      if (await closeButton.isVisible({ timeout: 500 }).catch(() => false)) {
        await ControlUtils.Click(closeButton).catch(() => {});
      } else if (await getStarted.isVisible({ timeout: 500 }).catch(() => false)) {
        await ControlUtils.Click(getStarted).catch(() => {});
      } else if (await next.isVisible({ timeout: 500 }).catch(() => false)) {
        await ControlUtils.Click(next).catch(() => {});
      } else {
        await ControlUtils.Click(guideHeading.locator("xpath=following::button[1]")).catch(() => {});
      }
      await global.page.waitForTimeout(500);
    }
  }

  static async DismissGuideIfPresent(timeout = 2500) {
    // "A note about messages" (Got It) can appear before the Guide carousel;
    // closing it first is what allows the Guide to show up next.
    const gotIt = this.GotItButton();
    if (await gotIt.isVisible({ timeout }).catch(() => false)) {
      await ControlUtils.Click(gotIt).catch(() => {});
      await global.page.waitForTimeout(500);
    }
    const guideHeading = this.GuideModal().getByRole("heading", { name: "Guide" });
    if (await guideHeading.isVisible({ timeout }).catch(() => false)) {
      await this.DismissGuideCarousel();
    }
  }

  static GotItButton() {
    return global.page.getByRole(this.Button_Role, { name: this.GotItButton_RoleName });
  }

  /**
   * Several first-visit "Guide" tooltips are triggered contextually (opening a
   * conversation, starting a new chat, etc.) and can render a moment after the
   * navigating click, at an unpredictable delay (observed 2-6s+ under load, since
   * the tip content loads from Contentful). Poll for a few seconds afterwards,
   * dismissing any Guide tooltip that shows up, rather than a single fixed check.
   */
  static async ClickAndDismissGuide(locator) {
    await this.DismissGuideIfPresent();
    await ControlUtils.ResilientClick(locator);
    for (let attempt = 0; attempt < 8; attempt++) {
      await global.page.waitForTimeout(1000);
      await this.DismissGuideIfPresent(500);
    }
  }

  static async DismissNoteAboutMessagesIfPresent() {
    const gotIt = this.GotItButton();
    if (await gotIt.isVisible({ timeout: 4000 }).catch(() => false)) {
      await ControlUtils.Click(gotIt);
      await global.page.waitForTimeout(500);
    }
  }

  /**
   * The Messages tab shows a first-visit "Guide" modal and a "note about messages"
   * storage-notice modal, but they render asynchronously (Contentful-backed content
   * that can take several seconds under load) and in either order, so a single pass
   * can miss one entirely. Poll directly for the target (Start new chat button)
   * becoming available, dismissing whichever onboarding modal shows up meanwhile,
   * rather than inferring readiness from "no modal currently detected".
   */
  static async DismissMessagesOnboardingModals() {
    const target = global.page.getByRole(this.Button_Role, {
      name: this.StartNewChatButton_RoleName,
    });
    const guideHeading = this.GuideModal().getByRole("heading", { name: "Guide" });
    for (let attempt = 0; attempt < 15; attempt++) {
      await global.page.waitForTimeout(1000);
      if (await guideHeading.isVisible().catch(() => false)) {
        await this.DismissGuideCarousel();
      }
      if (await this.GotItButton().isVisible().catch(() => false)) {
        await ControlUtils.Click(this.GotItButton()).catch(() => {});
      }
      if (await target.isVisible().catch(() => false)) return;
    }
  }

  // ---- Start new chat / New chat screen ----

  static StartNewChatButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.StartNewChatButton_RoleName })
    );
  }

  static NewChatHeading() {
    return global.page.getByText(this.NewChatHeading_Text, { exact: true });
  }

  static NewChatModal() {
    return global.page.locator("ion-modal.show-modal").last();
  }

  static CustomGroupOption() {
    return this.NewChatModal().getByText(this.CustomGroupOption_Text, { exact: true });
  }

  static MemberRow(memberName = Consts.MessageTeamMemberName) {
    return this.NewChatModal().getByText(memberName, { exact: true }).first();
  }

  static MemberRowContainer(memberName = Consts.MessageTeamMemberName) {
    // The name and email render as sibling <div>s inside <ion-label> (neither
    // div contains both), so no "div" ever satisfies both hasText filters.
    // Scope to the row's <ion-item>, which legitimately contains both as
    // descendants.
    return this.NewChatModal()
      .locator("ion-item")
      .filter({ hasText: memberName })
      .filter({ hasText: "@" })
      .first();
  }

  static async GetMemberEmail(memberName = Consts.MessageTeamMemberName) {
    const text = await ControlUtils.GetText(this.MemberRowContainer(memberName));
    const match = text && text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
    return match ? match[0] : null;
  }

  // ---- Custom group creation ----

  static SelectMembersModal() {
    return global.page.locator("ion-modal.show-modal").last();
  }

  static SelectMembersHeading() {
    return this.SelectMembersModal().getByText(this.SelectMembersHeading_Text, { exact: true });
  }

  static GroupMemberOption(memberName) {
    return this.SelectMembersModal().getByText(memberName, { exact: true }).first();
  }

  static CreateGroupWithMembersButton() {
    return this.SelectMembersModal().getByRole(this.Button_Role, {
      name: /Create Group with \d+ Member/i,
    });
  }

  static CreateGroupChatDialog() {
    return global.page.locator("ion-modal.show-modal, .alert-wrapper").last();
  }

  static CreateGroupChatHeading() {
    return global.page.getByText(this.CreateGroupChatHeading_Text, { exact: true });
  }

  static GroupNameInput() {
    return this.CreateGroupChatDialog().getByRole(this.Textbox_Role).first();
  }

  static GroupDescriptionInput() {
    return this.CreateGroupChatDialog().getByPlaceholder(this.GroupDescription_Placeholder);
  }

  static CreateGroupConfirmButton() {
    return this.CreateGroupChatDialog().getByRole(this.Button_Role, {
      name: this.Create_Button_Text,
      exact: true,
    });
  }

  static async FillGroupNameAndDescription(groupName, description) {
    const nameInput = this.GroupNameInput();
    await nameInput.click();
    await nameInput.fill(groupName);
    const descriptionInput = this.GroupDescriptionInput();
    await descriptionInput.click();
    await descriptionInput.fill(description);
  }

  // ---- Chat header / composer ----

  static ChatHeaderTitle(name) {
    // "#main-content h2" actually matches the sidebar conversation-list item
    // (its container is Tailwind "hidden xl:flex", so it never becomes visible
    // below the xl breakpoint - e.g. the 1280px headless default viewport).
    // The real open-conversation header lives in the room's own toolbar title.
    return global.page.locator("app-chat-room ion-title.chat-room-toolbar-title").filter({ hasText: name });
  }

  static MessageComposerInput() {
    return global.page.getByPlaceholder(this.Message_Placeholder);
  }

  static ComposerAttachButton() {
    return this.MessageComposerInput().locator("xpath=preceding::button[1]");
  }

  static async OpenAttachMenu() {
    await ControlUtils.Click(this.MessageComposerInput());
    await ControlUtils.Click(this.ComposerAttachButton());
    await global.page.waitForTimeout(600);
  }

  static async TypeMessage(text) {
    const composer = this.MessageComposerInput();
    await composer.click();
    await composer.fill(text);
  }

  static async SendMessage(text) {
    await this.TypeMessage(text);
    await global.page.keyboard.press("Enter");
  }

  static MessageBubble(text) {
    return global.page.getByText(text, { exact: true }).last();
  }

  // ---- Attachment menu options ----

  static AttachOption(label) {
    return global.page.getByText(label, { exact: true });
  }

  static UrgentOption() {
    return this.AttachOption(this.Urgent_Text);
  }

  static AttachmentOption() {
    return this.AttachOption(this.Attachment_Text);
  }

  static PollOption() {
    return this.AttachOption(this.Poll_Text);
  }

  static EventOption() {
    return this.AttachOption(this.Event_Text);
  }

  static PracticePlanOption() {
    return this.AttachOption(this.PracticePlan_Text);
  }

  static PlaybookDrawingOption() {
    // The menu label is rendered as "Playbook<br>Drawing", so its text never
    // equals "Playbook Drawing" with a space; an unscoped exact match instead
    // caught a shared-drawing message bubble's caption elsewhere on the page,
    // whose click opens nothing. Scope to the attach options menu itself.
    return global.page
      .locator(".options-menu")
      .getByText(/Playbook\s*Drawing/i)
      .first();
    return global.page.getByText("Playbook Drawing", { exact: true }).first();
  }

  static FileOption() {
    return this.AttachOption(this.File_Text);
  }

  static FileUploadInput() {
    return global.page.locator("input[type='file']");
  }

  // ---- Event picker ----

  static SelectEventHeading() {
    // The Event picker no longer renders a "Select Event" heading - it opens
    // straight into a calendar/day browser (<app-event-browser>). Assert on
    // that container instead of text that no longer exists in the UI.
    return global.page.locator("app-event-browser");
    return global.page.getByText(this.SelectEventHeading_Text, { exact: false });
  }

  static EventPickerModal() {
    return global.page.locator("ion-modal.show-modal").last();
  }

  // The header's only real <button> (the close control and month title are an
  // icon and a span, not buttons) toggles the picker from the default
  // calendar/day view into the scrollable event list.
  static EventListViewToggleButton() {
    return this.EventPickerModal().locator("ion-header button").first();
  }

  static FirstEventRow() {
    return this.EventPickerModal().locator("div.cursor-pointer").first();
  }

  static ShareEventButton() {
    return global.page.getByRole(this.Button_Role, { name: this.ShareEvent_RoleName });
  }

  // ---- Poll form ----

  static CreatePollHeading() {
    return global.page.getByText(this.CreatePollHeading_Text, { exact: true });
  }

  static PollQuestionInput() {
    return global.page.getByPlaceholder(this.PollQuestion_Placeholder).last();
  }

  static PollOption1Input() {
    return global.page.getByPlaceholder(this.PollOption1_Placeholder).last();
  }

  static PollOption2Input() {
    return global.page.getByPlaceholder(this.PollOption2_Placeholder).last();
  }

  static CreatePollButton() {
    return global.page.getByRole(this.Button_Role, { name: this.CreatePoll_RoleName, exact: true });
  }

  static async FillPollQuestionAndOptions(question, option1, option2) {
    await ControlUtils.Click(this.PollQuestionInput());
    await ControlUtils.Fill(this.PollQuestionInput(), question);
    await ControlUtils.Click(this.PollOption1Input());
    await ControlUtils.Fill(this.PollOption1Input(), option1);
    await ControlUtils.Click(this.PollOption2Input());
    await ControlUtils.Fill(this.PollOption2Input(), option2);
  }

  // ---- Practice Plan picker ----

  static SelectPracticePlanHeading() {
    return global.page.getByText(this.SelectPracticePlanHeading_Text, { exact: false });
  }

  static PracticePlanPickerModal() {
    return global.page.locator("ion-modal.show-modal").last();
  }

  static FirstPracticePlanRow() {
    return this.PracticePlanPickerModal().locator("div.cursor-pointer").first();
  }

  static SharePlanButton() {
    return global.page.getByRole(this.Button_Role, { name: this.SharePlan_RoleName });
  }

  // ---- Playbook Drawing picker ----

  static SelectDrawingHeading() {
    return global.page.getByText(this.SelectDrawingHeading_Text, { exact: false });
  }

  static DrawingPickerModal() {
    return global.page.locator("ion-modal.show-modal").last();
  }

  static FirstDrawingRow() {
    return this.DrawingPickerModal().locator("div.cursor-pointer").first();
  }

  static ShareDrawingButton() {
    return this.DrawingPickerModal().getByRole(this.Button_Role, {
      name: /Select \d+ Drawing/i,
    });
  }

  // ---- File picker ----

  static SelectFileHeading() {
    return global.page.getByText(this.SelectFileHeading_Text, { exact: false });
  }

  static FilePickerModal() {
    return global.page.locator("ion-modal.show-modal").last();
  }

  static FirstFileRow() {
    return this.FilePickerModal().locator("div.cursor-pointer").first();
  }

  static ShareFileButton() {
    return global.page.getByRole(this.Button_Role, { name: this.ShareFile_RoleName });
  }

  // ---- Unread badges / read receipts ----

  static HomeMessagesTile() {
    return global.page.locator("div").filter({ hasText: /^Messages$/ }).first();
  }

  static HomeMessagesTileBadge() {
    return global.page
      .locator("div")
      .filter({ has: global.page.getByText("Messages", { exact: true }) })
      .locator("span, div")
      .filter({ hasText: /^\d+$/ })
      .first();
  }

  static ConversationRowByPreviewText(previewText) {
    // A "div" filter with .last() picks the innermost matching div (the one
    // that wraps only the preview <p>), which excludes the unread <ion-badge>
    // rendered as its sibling. Scope to the row's own <ion-item> instead.
    // Each conversation also renders a second, desktop-sidebar copy of its
    // <ion-item> that stays hidden below Tailwind's xl breakpoint (see
    // ChatHeaderTitle) - match only the one actually visible at the current
    // viewport, since :visible without that filter can pick either copy.
    return global.page.locator("ion-item:visible").filter({ hasText: previewText }).last();
  }

  static UnreadBadgeInRow(rowLocator) {
    // The unread count renders as an <ion-badge>, not a span/div. Its text
    // node has surrounding whitespace (" 1 "); filter's RegExp hasText tests
    // raw (non-normalized) text, so an anchored /^\d+$/ never matches it.
    return rowLocator.locator("ion-badge, span, div").filter({ hasText: /^\s*\d+\s*$/ }).last();
  }

  static SeenReadReceipt() {
    return global.page.locator("div.double-check-container[title='Seen']");
  }
}
