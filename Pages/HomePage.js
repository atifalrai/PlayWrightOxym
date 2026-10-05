
import { Consts } from "./Consts";
import { ControlUtils } from "./ControlUtils";

export class HomePage {
  static Email_Identifier = "//input[@id='email' or @name='email' or @placeholder='Email address']";
  static Password_Identifier = "//input[@id='password' or @name='password' or @placeholder='Password']";
  static SignInButton_Identifier = "//button[normalize-space()='Sign in' or normalize-space()='Login' or @type='submit']";

  static GuideHeading_RoleName = "Guide";
  static SportButton_RoleName = Consts.Sport;
  static NotesTab_Text = "Notes";
  static AddNoteButton_RoleName = "Add note";
  static NotesSearchTextbox_RoleName = "Search Notes";
  static AddTitleTextbox_RoleName = "Title";
  static EditTitleTextbox_RoleName = "Title...";
  static AddNoteSubmitButton_RoleName = "Save";
  static UpdateNoteButton_RoleName = "Update Note";
  static ConfirmDeleteHeading_RoleName = "Confirm Delete";
  static ConfirmDeleteButton_RoleName = "Yes";
  static DeleteMenuItem_Text = "Delete";
  static DeleteNoteHeading_Text = "Delete Note";
  static DeleteNoteConfirmMessage_Text = "Are you sure you want to delete this note?";
  static EditMenuItem_Text = "Edit";
  static Button_Role = "button";
  static ActionIcon = ".self-stretch"
  static Textbox_Role = "textbox";
  static Paragraph_Role = "paragraph";
  static NoteEditor_Identifier = "quill-editor div";
  static NoteQuillEditor_Identifier = "quill-editor .ql-editor";
  static NoteEditor_Index = 2;
  static NoteBodyEditor_Index = 3;
  static NoteDetailModal_Identifier = "ion-modal.note-detail-modal";
  static NoteTitleListItem_Identifier =
    "div.font-semibold.text-base.text-black.mb-1.line-clamp-1.truncate";
  static NoteUpdatedMessage_Identifier = "//div[text()='Note test first note updated successfully!']";
  static NoteDeletedMessage_Identifier = "//div[text()='Note deleted successfully!']";
  static Status_Identifier = "[role='status']";
  static NextButton_Identifier = "//button[normalize-space()='Next']";
  static GetStartedButton_Identifier = "//button[normalize-space()='Get Started']";
  static Banner_Role = "banner";
  static BannerButton_Role = "button";
  static TeamPagesOverlay_Identifier = '[id^="ion-overlay-"]';
  static TeamPagesHeading_Text = "Team Pages";

  static PostLoginIndicator() {
    // An already-onboarded account (e.g. a re-login mid-session) can land
    // straight on its team dashboard, showing none of the Guide/Notes-tab
    // alternatives above. The bottom nav's Messages tab is present on every
    // authenticated screen regardless of onboarding state or last-visited tab.
    return global.page
      .getByRole("heading", { name: this.GuideHeading_RoleName })
      .or(global.page.locator(this.NextButton_Identifier))
      .or(global.page.locator("div").filter({ hasText: /^Notes$/ }))
      .or(global.page.getByRole("button", { name: this.AddNoteButton_RoleName }))
      .or(global.page.locator("#tab-button-messages"));
  }

  static Email() {
    return ControlUtils.WaitForVisible(global.page.locator(this.Email_Identifier));
  }

  static Password() {
    return ControlUtils.WaitForVisible(global.page.locator(this.Password_Identifier));
  }

  static SignInButton() {
    return ControlUtils.WaitForVisible(global.page.locator(this.SignInButton_Identifier));
  }

  static GuideHeading() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole("heading", { name: this.GuideHeading_RoleName })
    );
  }

  /**
   * Plain locator for the Guide heading. Unlike GuideHeading() this does not go
   * through ControlUtils.WaitForVisible, whose un-awaited 120s waitFor rejects
   * later as an unhandled rejection and fails whichever test is then running.
   */
  static GuideHeadingLocator() {
    return global.page.getByRole("heading", { name: this.GuideHeading_RoleName });
  }

  static GuideModal() {
    return global.page.locator("app-onboarding-modal");
  }

  /**
   * The Guide is a first-visit onboarding popup: it appears for a fresh account
   * or a fresh browser profile and stays dismissed afterwards. Its absence is
   * therefore normal and must never fail a test - callers treat a missing Guide
   * as a skipped step. Closes it when present, handling both the single-slide
   * ("Get Started") and multi-slide ("Next" ... "Get Started") forms.
   *
   * @returns {Promise<boolean>} true when a Guide was found and dismissed
   */
  static async DismissGuideIfPresent(timeout = 3000, maxAttempts = 6) {
    const heading = this.GuideHeadingLocator();
    // waitFor, not isVisible: isVisible() samples the DOM once and returns
    // immediately, so a Guide that renders a moment after the click would be
    // missed and then block every later interaction.
    const present = await heading
      .waitFor({ state: "visible", timeout })
      .then(() => true)
      .catch(() => false);
    if (!present) return false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (!(await heading.isVisible({ timeout: 500 }).catch(() => false))) break;
      // The Guide usually renders inside <app-onboarding-modal>; scoping there
      // avoids matching an unrelated "close" control elsewhere on the page.
      const inModal = (await this.GuideModal().count().catch(() => 0)) > 0;
      const scope = inModal ? this.GuideModal() : global.page;
      const candidates = [
        scope.getByRole(this.Button_Role, { name: /close/i }),
        scope.getByRole(this.Button_Role, { name: "Get Started", exact: true }),
        scope.getByRole(this.Button_Role, { name: "Next", exact: true }),
      ];
      let clicked = false;
      for (const candidate of candidates) {
        if (await candidate.first().isVisible({ timeout: 500 }).catch(() => false)) {
          await candidate.first().click().catch(() => {});
          clicked = true;
          break;
        }
      }
      if (!clicked) break;
      await global.page.waitForTimeout(500);
    }
    return true;
  }

  static BannerButton() {
    return ControlUtils.WaitForVisible(
      global.page
        .getByRole(this.Banner_Role)
        .getByRole(this.BannerButton_Role).first()
    );
  }

  static SportButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.SportButton_RoleName })
    );
  }

  static NotesTab() {
    return ControlUtils.WaitForVisible(
      global.page
        .locator("div")
        .filter({ hasText: new RegExp(`^${this.NotesTab_Text}$`) })
        .locator("path")
    );
  }

  static AddNoteButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.AddNoteButton_RoleName })
    );
  }

  static AddTitleTextbox() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Textbox_Role, { name: this.AddTitleTextbox_RoleName })
    );
  }

  static NoteEditorBody() {
    return ControlUtils.WaitForVisible(
      global.page.locator(this.NoteEditor_Identifier).nth(this.NoteEditor_Index)
    );
  }

  static AddNoteSubmitButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.AddNoteSubmitButton_RoleName })
    );
  }

  static NoteTitleText(title) {
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return global.page
      .locator(this.NoteTitleListItem_Identifier)
      .filter({ hasText: new RegExp(`^\\s*${escapedTitle}\\s*$`) })
      .first();
  }

  static NotesSearchTextbox() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Textbox_Role, { name: this.NotesSearchTextbox_RoleName })
    );
  }

  static NoteSearchResultPreviewText(bodyText = Consts.NoteBody, titleText = Consts.NoteTitle) {
    const bodySnippet = bodyText.split(" ").slice(0, 3).join(" ");
    return `${titleText} ${bodySnippet}`;
  }

  static NoteSearchResult(bodyText = Consts.NoteBody, titleText = Consts.NoteTitle) {
    return ControlUtils.WaitForVisible(
      global.page.getByText(this.NoteSearchResultPreviewText(bodyText, titleText)).first()
    );
  }

  /** Empty-state heading shown when the Notes list has no notes at all. */
  static NoNotesHeading() {
    return global.page.getByText("No Notes Yet", { exact: true });
  }

  static FirstButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role).first()
    );
  }

  static NoteDetailHeader() {
    return global.page.locator("ion-header[role='banner']").filter({ visible: true }).last();
  }

  static NoteDetailContent(titleText = Consts.NoteTitle) {
    return global.page.locator("ion-content").filter({ visible: true }).last();
  }

  static async WaitForNoteDetailOpened(titleText = Consts.NoteTitle) {
    await global.page.waitForURL(/\/notes\//, { timeout: 30000 });
    await this.NoteDetailHeader().locator("button").nth(2).waitFor({ state: "visible", timeout: 30000 });
  }

  static NoteDetailRoot(titleText = Consts.NoteTitle) {
    return this.NoteDetailContent(titleText);
  }

  static NoteDetailView(titleText = Consts.NoteTitle) {
    return this.NoteDetailRoot(titleText);
  }

  static NoteDetailModal(titleText = Consts.NoteTitle) {
    return this.NoteDetailRoot(titleText);
  }

  static NoteMenuButton(titleText = Consts.NoteTitle) {
    return ControlUtils.WaitForVisible(
      this.NoteDetailHeader().locator("button").nth(2)
    );
  }

  static EditFirstNoteButton() {
    return this.NoteEditButton();
  }

  static NoteDetailBannerDiv(titleText = Consts.NoteTitle) {
    return ControlUtils.WaitForVisible(this.NoteDetailHeader());
  }

  static NoteEditButton(titleText = Consts.NoteTitle) {
    return ControlUtils.WaitForVisible(
      this.NoteDetailHeader().locator("button").nth(1)
    );
  }

  static EditTitleTextbox(titleText = Consts.NoteTitle) {
    return ControlUtils.WaitForVisible(
      this.NoteDetailContent(titleText).getByPlaceholder(this.EditTitleTextbox_RoleName)
    );
  }

  static EditNoteBodyField(titleText = Consts.NoteTitle) {
    return ControlUtils.WaitForVisible(
      this.NoteDetailContent(titleText).locator(this.NoteQuillEditor_Identifier).last()
    );
  }

  static SaveNoteButton(titleText = Consts.NoteTitle) {
    return ControlUtils.WaitForVisible(
      this.NoteDetailHeader().locator("button").filter({ hasText: /^Save$/ })
    );
  }

  static EditMenuItem() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(this.EditMenuItem_Text, { exact: true })
    );
  }

  static NoteParagraph(titleText = Consts.NoteTitle, bodyText = Consts.NoteBody) {
    return ControlUtils.WaitForVisible(
      this.NoteDetailContent(titleText).getByText(bodyText).first()
    );
  }

  static NoteBodyEditor(bodyText) {
    return ControlUtils.WaitForVisible(
      global.page
        .locator("div")
        .filter({ hasText: new RegExp(`^${bodyText}$`) })
        .nth(this.NoteBodyEditor_Index)
    );
  }

  static UpdateNoteButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.UpdateNoteButton_RoleName })
    );
  }

  static NoteDeleteButton(titleText = Consts.NoteTitle) {
    return ControlUtils.WaitForVisible(
      this.NoteDetailHeader().locator("button").nth(2)
    );
  }

  static NoteDeleteConfirmPopup() {
    return global.page
      .locator("div")
      .filter({ has: global.page.getByRole("heading", { name: this.DeleteNoteHeading_Text }) })
      .filter({ visible: true })
      .last();
  }

  static DeleteNoteConfirmPopup() {
    return ControlUtils.WaitForVisible(
      this.NoteDeleteConfirmPopup().getByText(this.DeleteNoteConfirmMessage_Text)
    );
  }

  static ConfirmDeleteButton() {
    return ControlUtils.WaitForVisible(
      this.NoteDeleteConfirmPopup()
        .locator("button")
        .filter({ hasText: new RegExp(`^\\s*${this.ConfirmDeleteButton_RoleName}\\s*$`) })
    );
  }

  static NoteCreatedMessage() {
    return ControlUtils.WaitForVisible(
      global.page.locator(this.Status_Identifier).filter({ hasText: Consts.NoteCreatedMessage })
    );
  }

  static NoteUpdatedMessageLocator() {
    return ControlUtils.WaitForVisible(
      global.page.locator(this.Status_Identifier).filter({ hasText: Consts.NoteUpdatedMessage })
    );
  }

  static NoteDeletedMessageLocator() {
    return ControlUtils.WaitForVisible(
      global.page.locator(this.Status_Identifier).filter({ hasText: Consts.NoteDeletedMessage })
    );
  }

  static TeamSwitchButton() {
    return global.page.getByRole('button', { name: 'Cinnova Testing' });
  }

  /**
   * The team selector in the banner. Matched by class, not by the team name:
   * its label IS the currently-selected team, so a hardcoded name (the old
   * TeamSwitchButton) only matched while that one team happened to be active.
   */
  static TeamSelectorButton() {
    return global.page.locator("button.team-selector-btn").first();
  }

  /**
   * Resolves the control that opens the Team Pages overlay. Prefers the
   * class-based selector; only if that is absent does it fall back to the
   * banner's first button. These must not be combined with .or().first(),
   * which picks by DOM order and can land on an unrelated banner button.
   */
  static async ResolveTeamSelector() {
    const byClass = this.TeamSelectorButton();
    if (await byClass.isVisible().catch(() => false)) return byClass;
    return global.page.getByRole(this.Banner_Role).getByRole(this.BannerButton_Role).first();
  }

  static TeamPagesOverlay() {
    return global.page
      .locator(this.TeamPagesOverlay_Identifier)
      .filter({ hasText: this.TeamPagesHeading_Text });
  }

  /**
   * A team row in the Team Pages overlay. The clickable element is a plain
   * rounded-xl <div> wrapping the name <span> - there is no button or ion-item
   * role to target, so walk up to that wrapper.
   */
  static TeamCard(teamName = Consts.TeamName) {
    return this.TeamPagesOverlay()
      .getByText(teamName, { exact: true })
      .locator('xpath=ancestor::div[contains(@class,"rounded-xl")][1]')
      .first();
  }

  /**
   * Opens the team selector and switches to teamName, landing on that team's
   * team-screen. Replaces the old three-click sequence (BannerButton ->
   * TeamSwitchButton -> TeamSwitchOption): the first two resolved to the SAME
   * banner button, so the second click was swallowed by the overlay the first
   * one opened and every spec timed out there without ever switching team.
   */
  static async SwitchToTeam(teamName = Consts.TeamName) {
    await this.DismissGuideIfPresent();
    const overlay = this.TeamPagesOverlay();
    if (!(await overlay.first().isVisible().catch(() => false))) {
      await ControlUtils.ResilientClick(await this.ResolveTeamSelector());
      await overlay.first().waitFor({ state: "visible", timeout: 30000 });
    }
    await ControlUtils.ResilientClick(this.TeamCard(teamName));
    await overlay.first().waitFor({ state: "hidden", timeout: 30000 }).catch(() => {});
    await global.page
      .waitForURL(/team-screen/, { timeout: 30000 })
      .catch(() => {});
    await this.DismissGuideIfPresent();
  }

  /** Team name shown as the heading of the opened team screen. */
  static TeamScreenHeading(teamName = Consts.TeamName) {
    return global.page.getByText(teamName).first();
  }
  static TeamSwitchOption(teamName = 'Cinnova Testing') {
    return global.page.locator(this.TeamPagesOverlay_Identifier).filter({ hasText: this.TeamPagesHeading_Text }).getByText(teamName, { exact: true });
  }
}
