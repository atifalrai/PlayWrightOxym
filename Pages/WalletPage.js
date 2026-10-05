import { ControlUtils } from "./ControlUtils";
import { Consts } from "./Consts";

export class WalletPage {
  static Button_Role = "button";
  static Textbox_Role = "textbox";
  static Status_Identifier = "[role='status']";

  static WalletTab_Identifier = "#tab-button-wallet";
  static CreateRequestButton_RoleName = "Create request";
  static PaymentTitleTextbox_RoleName = "Enter title";
  static AmountPerPerson_FilterText = /^Amount per person\$$/;
  static AmountPlaceholder = "0.00";
  static SelectDateButton_RoleName = "Select Date";
  static DueDateLabel_Text = "Due Date";
  static SelectDueDateHeading_RoleName = "Select Due Date";
  static DoneButton_RoleName = "Done";
  static WalletNextButton_RoleName = "Next";
  static SelectPeopleTab_Text = "Select People";
  static SelectAllButton_RoleName = "Select All";
  static ReviewTab_Text = "Review";
  static SendRequestButton_RoleName = "Send Request";
  static RequestsTab_Text = "Requests";
  static TransferTab_Text = "Transfer";
  static DashboardTab_Text = "Dashboard";
  static OverdueTab_Text = "Overdue";
  static UnpaidSummary_TextPattern = Consts.UnpaidSummary_TextPattern;
  static SendReminderButton_RoleName = "Send Reminder Notify unpaid";
  static DashboardDetail_Identifier = "app-dashboard-detail";
  static OverdueInvoiceMenuButton_Identifier = "ion-header ion-buttons:nth-of-type(2) button";
  static UnpaidInvoiceMenuButton_Identifier = "ion-header ion-buttons:nth-of-type(2) button";
  static TransferToPeopleButton_RoleName = "Transfer to People Send to";
  static TransferToBankButton_RoleName = "Transfer to Bank Move funds";
  static InstantBankButton_RoleName = "Instant ~30 minutes";
  static StandardBankButton_RoleName = "Standard 2-5 business days";
  static AllTeamsButton_RoleName = "All Teams";
  static SlideToConfirmSlider_RoleName = "Slide to confirm";
  static ViewTransactionsButton_RoleName = Consts.ViewTransactionsButton_RoleName;
  static MonthlySegment_Text = "Monthly";
  static YearlySegment_Text = "Yearly";
  static IonSegmentButton_Identifier = "ion-segment-button";

  static WalletTabIcon() {
    return global.page.locator(this.WalletTab_Identifier).getByRole("img");
  }

  static WalletBannerHeading() {
    return global.page.getByRole("button", { name: "Cinnova Testing" });
  }

  static CreateRequestButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.CreateRequestButton_RoleName })
    );
  }

  static NewRequestHeading() {
    return ControlUtils.WaitForVisible(
      global.page.locator('app-new-request span:text-is("New Request")')
    );
  }

  static PaymentTitleTextbox() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Textbox_Role, { name: this.PaymentTitleTextbox_RoleName })
    );
  }

  static AmountPerPersonInput() {
    return ControlUtils.WaitForVisible(
      global.page
        .locator("div")
        .filter({ hasText: this.AmountPerPerson_FilterText })
        .getByPlaceholder(this.AmountPlaceholder)
    );
  }

  static PaymentDescriptionTextarea() {
    return ControlUtils.WaitForVisible(global.page.locator("textarea").first());
  }

  static SelectDateButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.SelectDateButton_RoleName })
    );
  }

  static DueDateInput(expectedDate) {
    return ControlUtils.WaitForVisible(global.page.getByDisplayValue(expectedDate));
  }

  static SelectDueDateHeading() {
    return ControlUtils.WaitForVisible(
      global.page.getByText('Select Due Date', { exact: true })
    );
  }

  static DueDateButton(dateLabel) {
    return global.page.getByRole(this.Button_Role, { name: dateLabel });
  }

  static DoneButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.DoneButton_RoleName })
    );
  }

  static WalletNextButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.WalletNextButton_RoleName })
    );
  }

  static SelectPeopleTab() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(this.SelectPeopleTab_Text, { exact: true })
    );
  }

  /**
   * The team-selector chip on the Select People screen (a teal-bordered
   * pill button with a chevron icon). Scoped to its distinctive class rather
   * than role/name alone, since the same team name renders as plain text or
   * a differently-styled button elsewhere on the page (e.g. the Wallet
   * banner), which would otherwise collide with an unscoped match.
   */
  static TeamButton(teamName) {
    return ControlUtils.WaitForVisible(
      global.page
        .locator('button[class*="border-[#0ABAB4]"]')
        .filter({ hasText: teamName })
        .first()
    );
  }

  /**
   * Clicking TeamButton opens an Ionic overlay (dynamically id'd, e.g.
   * "ion-overlay-21") rendered as a bottom sheet titled "Select Team",
   * listing the selectable teams.
   */
  static SelectTeamSheetHeading() {
    return ControlUtils.WaitForVisible(
      global.page
        .locator('[id^="ion-overlay-"]')
        .getByText("Select Team", { exact: true })
        .filter({ visible: true })
        .first()
    );
  }

  /**
   * The target team's name is picked from inside that same overlay, not
   * from the page at large - a page-wide text match can hit the team's name
   * rendered elsewhere (e.g. the button that opened the overlay) instead of
   * the actual list item.
   */
  static TeamOverlayOption(teamName) {
    return ControlUtils.WaitForVisible(
      global.page
        .locator('[id^="ion-overlay-"]')
        .getByText(teamName, { exact: true })
        .filter({ visible: true })
        .first()
    );
  }

  static SelectAllButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.SelectAllButton_RoleName })
    );
  }

  static ReviewTab() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(this.ReviewTab_Text, { exact: true })
    );
  }

  static SendRequestButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.SendRequestButton_RoleName })
    );
  }

  static PaymentRequestCreatedMessage() {
    return ControlUtils.WaitForVisible(
      global.page
        .locator(this.Status_Identifier)
        .filter({ hasText: Consts.PaymentRequestCreatedMessage })
    );
  }

  static RequestsTab() {
    return global.page.getByText(this.RequestsTab_Text, { exact: true });
  }

  static TransferTab() {
    return global.page.getByText(this.TransferTab_Text, { exact: true });
  }

  static DashboardTab() {
    return global.page.getByText(this.DashboardTab_Text, { exact: true });
  }

  static OverdueTab() {
    return global.page.getByText(this.OverdueTab_Text, { exact: true });
  }

  static UnpaidSummaryCard() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(this.UnpaidSummary_TextPattern)
    );
  }

  static UnpaidInvoiceMenuButton() {
    return ControlUtils.WaitForVisible(
      global.page
        .locator(this.DashboardDetail_Identifier)
        .locator(this.UnpaidInvoiceMenuButton_Identifier)
        .first()
    );
  }

  static OverdueInvoiceMenuButton() {
    return ControlUtils.WaitForVisible(
      global.page
        .locator(this.DashboardDetail_Identifier)
        .locator(this.OverdueInvoiceMenuButton_Identifier)
        .first()
    );
  }

  static SendReminderButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.SendReminderButton_RoleName })
    );
  }

  static ReminderSentSuccessToast() {
    return global.page
      .locator("ion-toast")
      .getByText(Consts.ReminderSentSuccessMessagePattern);
  }

  static ReminderSentSuccessIndicator() {
    return WalletPage.ReminderSentSuccessToast();
  }

  static TransferToPeopleButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.TransferToPeopleButton_RoleName })
    );
  }

  static TransferToBankButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.TransferToBankButton_RoleName })
    );
  }

  static InstantBankButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.InstantBankButton_RoleName })
    );
  }

  static StandardBankButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.StandardBankButton_RoleName })
    );
  }

  static BankTransferAmountInput() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Textbox_Role, { name: this.AmountPlaceholder }).first()
    );
  }

  static TransferAvailableBalanceLoaded() {
    return global.page.getByText(/Available balance:\s*\$(?!0\.00)[\d,]+\.\d{2}/);
  }

  static BankTransferAvailableBalanceLoaded() {
    return WalletPage.TransferAvailableBalanceLoaded();
  }

  static async waitForTransferAvailableBalance(timeout = 30000) {
    await WalletPage.TransferAvailableBalanceLoaded().waitFor({
      state: "visible",
      timeout,
    });
  }

  static async waitForBankTransferAvailableBalance(timeout = 30000) {
    await WalletPage.waitForTransferAvailableBalance(timeout);
  }

  static AllTeamsButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.AllTeamsButton_RoleName })
    );
  }

  static TransferRecipientButton(recipientName) {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: recipientName })
    );
  }

  static TransferAmountInput(index = 0) {
    return ControlUtils.WaitForVisible(
      this.TransferAmountInputs().nth(index)
    );
  }

  static TransferAmountInputs() {
    return global.page.getByRole(this.Textbox_Role, { name: this.AmountPlaceholder });
  }

  static SlideToConfirmSlider() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole("slider", { name: this.SlideToConfirmSlider_RoleName })
    );
  }

  static SlideToConfirmTrack() {
    return WalletPage.SlideToConfirmSlider().locator(
      'xpath=ancestor::div[contains(@class,"relative")][1]'
    );
  }

  static TransferCompletedMessageLocator() {
    return global.page.getByText(Consts.TransferCompletedMessage, { exact: true });
  }

  static TransferCompletedToast() {
    return global.page
      .locator("ion-toast")
      .getByText(Consts.TransferCompletedMessage, { exact: true });
  }

  static TransferInitiatedToast() {
    return global.page
      .locator("ion-toast")
      .getByText(Consts.TransferInitiatedMessage, { exact: true });
  }

  static TransactionsHeading() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(Consts.TransactionsHeading_Text, { exact: true })
    );
  }

  static PeopleTransferEntry() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(Consts.PeopleTransfer_Text, { exact: true }).first()
    );
  }

  static TransferSuccessIndicator() {
    return WalletPage.TransferCompletedToast();
  }

  static TransferInitiatedMessageLocator() {
    return global.page.getByText(Consts.TransferInitiatedMessage, { exact: true });
  }

  static BankTransferSuccessIndicator() {
    return WalletPage.TransactionsHeading();
  }

  static InstantBankTransferEntry() {
    return WalletPage.InstantTransferEntry();
  }

  static StandardBankTransferEntry() {
    return WalletPage.StandardTransferEntry();
  }

  static TransferCompletedMessage() {
    return ControlUtils.WaitForVisible(WalletPage.TransferCompletedToast());
  }

  static ViewTransactionsButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.ViewTransactionsButton_RoleName })
    );
  }

  static MonthlySegmentButton() {
    return ControlUtils.WaitForVisible(
      global.page.locator(this.IonSegmentButton_Identifier).filter({ hasText: this.MonthlySegment_Text })
    );
  }

  static YearlySegmentButton() {
    return ControlUtils.WaitForVisible(
      global.page.locator(this.IonSegmentButton_Identifier).filter({ hasText: this.YearlySegment_Text })
    );
  }

  static YearFilterButton(year) {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: year })
    );
  }

  static YearFilterOption(year) {
    return ControlUtils.WaitForVisible(
      global.page.locator("div").filter({ hasText: new RegExp(`^${year}$`) })
    );
  }

  static MonthFilterOption(month) {
    return ControlUtils.WaitForVisible(
      global.page.locator("div").filter({ hasText: new RegExp(`^${month}$`) })
    );
  }

  static StandardTransferEntry() {
    return global.page.getByText(Consts.StandardTransfer_Text).first();
  }

  static InstantTransferEntry() {
    return global.page.getByText(Consts.InstantTransfer_Text).first();
  }

  static CollectedSummary() {
    return global.page.getByText(Consts.CollectedAmount_TextPattern).first();
  }

  static TransferredSummary() {
    return global.page.getByText(Consts.TransferredAmount_TextPattern).first();
  }

  static TransactionViewDataIndicator() {
    return global.page
      .getByText(Consts.StandardTransfer_Text)
      .or(global.page.getByText(Consts.InstantTransfer_Text))
      .or(global.page.getByText(Consts.PeopleTransfer_Text))
      .first();
  }

  static TransactionsLoadingText() {
    return global.page.getByText("Loading transactions...");
  }

  static async waitForTransactionViewData(timeout = 30000) {
    await WalletPage.TransactionsLoadingText()
      .waitFor({ state: "hidden", timeout })
      .catch(() => {});
    await Promise.race([
      WalletPage.StandardTransferEntry().waitFor({ state: "visible", timeout }),
      WalletPage.InstantTransferEntry().waitFor({ state: "visible", timeout }),
      global.page.getByText(Consts.PeopleTransfer_Text).first().waitFor({ state: "visible", timeout }),
    ]);
  }

  /**
   * Non-throwing check for whether the current transaction view (overall/monthly/yearly)
   * has any rows. Used to distinguish "genuinely empty" from a real load failure, since
   * waitForTransactionViewData() throws on both.
   */
  static async hasTransactionViewData(timeout = 15000) {
    await WalletPage.TransactionsLoadingText()
      .waitFor({ state: "hidden", timeout })
      .catch(() => {});
    const [standardCount, instantCount, peopleCount] = await Promise.all([
      WalletPage.StandardTransferEntry().count(),
      WalletPage.InstantTransferEntry().count(),
      global.page.getByText(Consts.PeopleTransfer_Text).first().count(),
    ]);
    return standardCount + instantCount + peopleCount > 0;
  }

  static async SlideToConfirm() {
    const page = global.page;
    const slider = WalletPage.SlideToConfirmSlider();
    const track = WalletPage.SlideToConfirmTrack();
    await slider.scrollIntoViewIfNeeded();
    const trackBox = await track.boundingBox();
    if (!trackBox) {
      throw new Error("Slide to confirm track not found");
    }

    const thumbBox = await slider.boundingBox();
    if (!thumbBox) {
      throw new Error("Slide to confirm handle not found");
    }

    const y = trackBox.y + trackBox.height / 2;
    const startX = thumbBox.x + thumbBox.width / 2;
    const endX = trackBox.x + trackBox.width - 20;

    try {
      await slider.dragTo(track, {
        sourcePosition: { x: thumbBox.width / 2, y: thumbBox.height / 2 },
        targetPosition: { x: trackBox.width - 20, y: trackBox.height / 2 },
        force: true,
      });
    } catch {
      await page.mouse.move(startX, y);
      await page.mouse.down();
      await page.mouse.move(endX, y, { steps: 60 });
      await page.mouse.up();
    }
  }
}
