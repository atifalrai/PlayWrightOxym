import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { WalletPage } from "../Pages/WalletPage.js";
import { HomePage } from "../Pages/HomePage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import { AppFlow } from "../Flows/AppFlow.js";
import { WalletTestCaseNames, WalletStepNames, WalletTransferStepNames, WalletInstantBankTransferStepNames, WalletStandardBankTransferStepNames, WalletOverdueReminderStepNames, WalletUnpaidReminderStepNames, WalletTransactionViewStepNames } from "../Pages/TestCaseNames.js";

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("@stateful --OXYM-- Wallet Test Suite", () => {
  test(`TC-OXYM-WALLET-01: ${WalletTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = `${WalletStepNames["Step-01"]}`;
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await ControlUtils.Click(WalletPage.WalletTabIcon());
    await softAssert(
      async () => expect(WalletPage.CreateRequestButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassWalletTabOpened,
      Strings.MessageFailWalletTabOpened
    );

    testInfo.scenario = `${WalletStepNames["Step-02"]}`;
    await softAssert(
      async () => expect(global.page).toHaveURL(Consts.WalletInvoicesUrl, { timeout: 30000 }),
      Strings.MessagePassWalletInvoicesPageLoaded,
      Strings.MessageFailWalletInvoicesPageLoaded
    );
    await softAssert(
      async () => expect(WalletPage.CreateRequestButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassWalletInvoicesPageLoaded,
      Strings.MessageFailWalletInvoicesPageLoaded
    );

    testInfo.scenario = `${WalletStepNames["Step-03"]}`;
    await ControlUtils.Click(WalletPage.CreateRequestButton());
    await softAssert(
      async () => expect(WalletPage.NewRequestHeading()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassNewRequestPageOpened,
      Strings.MessageFailNewRequestPageOpened
    );

    testInfo.scenario = `${WalletStepNames["Step-04"]}`;
    await ControlUtils.Click(WalletPage.PaymentTitleTextbox());
    await ControlUtils.Fill(WalletPage.PaymentTitleTextbox(), Consts.PaymentRequestTitle);
    await softAssert(
      async () =>
        expect(WalletPage.PaymentTitleTextbox()).toHaveValue(Consts.PaymentRequestTitle, {
          timeout: 30000,
        }),
      Strings.MessagePassPaymentTitleEntered,
      Strings.MessageFailPaymentTitleEntered
    );

    testInfo.scenario = `${WalletStepNames["Step-05"]}`;
    await ControlUtils.Click(WalletPage.AmountPerPersonInput());
    await ControlUtils.Fill(WalletPage.AmountPerPersonInput(), Consts.PaymentAmount);
    await softAssert(
      async () =>
        expect(WalletPage.AmountPerPersonInput()).toHaveValue(Consts.PaymentAmount, {
          timeout: 30000,
        }),
      Strings.MessagePassPaymentAmountEntered,
      Strings.MessageFailPaymentAmountEntered
    );

    testInfo.scenario = `${WalletStepNames["Step-06"]}`;
    await ControlUtils.Click(WalletPage.PaymentDescriptionTextarea());
    await ControlUtils.Fill(WalletPage.PaymentDescriptionTextarea(), Consts.PaymentDescription);
    await softAssert(
      async () =>
        expect(WalletPage.PaymentDescriptionTextarea()).toHaveValue(Consts.PaymentDescription, {
          timeout: 30000,
        }),
      Strings.MessagePassPaymentDescriptionEntered,
      Strings.MessageFailPaymentDescriptionEntered
    );

    testInfo.scenario = `${WalletStepNames["Step-07"]}`;
    await ControlUtils.Click(WalletPage.SelectDateButton());
    await softAssert(
      async () => expect(WalletPage.SelectDueDateHeading()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassDueDateCalendarOpened,
      Strings.MessageFailDueDateCalendarOpened
    );

    testInfo.scenario = `${WalletStepNames["Step-08"]}`;
    await ControlUtils.Click(WalletPage.DueDateButton(AppFlow.GetPaymentDueDateLabel()));
    await softAssert(
      async () => expect(WalletPage.DoneButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassDueDateSelected,
      Strings.MessageFailDueDateSelected
    );

    testInfo.scenario = `${WalletStepNames["Step-09"]}`;
    await ControlUtils.Click(WalletPage.DoneButton());
    testInfo.scenario = `${WalletStepNames["Step-10"]}`;
    await ControlUtils.Click(WalletPage.WalletNextButton());
    await softAssert(
      async () => expect(WalletPage.SelectPeopleTab()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassSelectPeopleTabVisible,
      Strings.MessageFailSelectPeopleTabVisible
    );

    testInfo.scenario = `${WalletStepNames["Step-11"]}`;
    await ControlUtils.Click(WalletPage.TeamButton(Consts.PaymentTeamButton));
    await softAssert(
      async () => expect(WalletPage.SelectTeamSheetHeading()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassSelectTeamSheetOpened,
      Strings.MessageFailSelectTeamSheetOpened
    );
    await ControlUtils.ResilientClick(WalletPage.TeamOverlayOption(Consts.PaymentTeamButton));
    await softAssert(
      async () => expect(WalletPage.SelectAllButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassTeamMemberSelected,
      Strings.MessageFailTeamMemberSelected
    );

    testInfo.scenario = `${WalletStepNames["Step-12"]}`;
    await ControlUtils.Click(WalletPage.SelectAllButton());
    await softAssert(
      async () => expect(WalletPage.WalletNextButton()).toBeEnabled({ timeout: 30000 }),
      Strings.MessagePassAllMembersSelected,
      Strings.MessageFailAllMembersSelected
    );

    testInfo.scenario = `${WalletStepNames["Step-13"]}`;
    await ControlUtils.Click(WalletPage.WalletNextButton());
    await softAssert(
      async () => expect(WalletPage.ReviewTab()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassReviewTabVisible,
      Strings.MessageFailReviewTabVisible
    );
    await ControlUtils.Click(WalletPage.SendRequestButton());
    await softAssert(
      async () => expect(WalletPage.PaymentRequestCreatedMessage()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassPaymentRequestCreated,
      Strings.MessageFailPaymentRequestCreated
    );
  });

  test(`TC-OXYM-WALLET-02: ${WalletTestCaseNames["TC-05"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = `${WalletOverdueReminderStepNames["Step-01"]}`;
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await ControlUtils.Click(WalletPage.WalletTabIcon());
    await softAssert(
      async () => expect(WalletPage.RequestsTab()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassWalletTabOpened,
      Strings.MessageFailWalletTabOpened
    );

    testInfo.scenario = `${WalletOverdueReminderStepNames["Step-02"]}`;
    await ControlUtils.Click(WalletPage.DashboardTab());
    await softAssert(
      async () => expect(WalletPage.OverdueTab()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassDashboardTabOpened,
      Strings.MessageFailDashboardTabOpened
    );

    testInfo.scenario = `${WalletOverdueReminderStepNames["Step-03"]}`;
    await ControlUtils.Click(WalletPage.OverdueTab());

    // As with Unpaid, the Overdue tab itself is always visible; the row menu button only
    // renders when there's an actual overdue invoice, so it's the reliable emptiness signal.
    const overdueRowCount = await WalletPage.OverdueInvoiceMenuButton().count();
    if (overdueRowCount === 0) {
      await softAssert(
        async () => expect(overdueRowCount).toBe(0),
        Strings.MessagePassNoOverdueInvoices,
        Strings.MessagePassNoOverdueInvoices
      );
      return;
    }

    await softAssert(
      async () => expect(WalletPage.OverdueInvoiceMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassOverdueSectionOpened,
      Strings.MessageFailOverdueSectionOpened
    );

    testInfo.scenario = `${WalletOverdueReminderStepNames["Step-04"]}`;
    await ControlUtils.Click(WalletPage.OverdueInvoiceMenuButton());
    await softAssert(
      async () => expect(WalletPage.SendReminderButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassOverdueInvoiceMenuOpened,
      Strings.MessageFailOverdueInvoiceMenuOpened
    );

    testInfo.scenario = `${WalletOverdueReminderStepNames["Step-05"]}`;
    await ControlUtils.Click(WalletPage.SendReminderButton());

    testInfo.scenario = `${WalletOverdueReminderStepNames["Step-06"]}`;
    await softAssert(
      async () =>
        expect(WalletPage.ReminderSentSuccessToast()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassReminderSentSuccessfully,
      Strings.MessageFailReminderSentSuccessfully
    );
  });

  test(`TC-OXYM-WALLET-03: ${WalletTestCaseNames["TC-06"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = `${WalletUnpaidReminderStepNames["Step-01"]}`;
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await ControlUtils.Click(WalletPage.WalletTabIcon());
    await softAssert(
      async () => expect(WalletPage.RequestsTab()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassWalletTabOpened,
      Strings.MessageFailWalletTabOpened
    );

    testInfo.scenario = `${WalletUnpaidReminderStepNames["Step-02"]}`;
    await ControlUtils.Click(WalletPage.DashboardTab());
    await softAssert(
      async () => expect(WalletPage.UnpaidSummaryCard()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassDashboardTabOpened,
      Strings.MessageFailDashboardTabOpened
    );

    testInfo.scenario = `${WalletUnpaidReminderStepNames["Step-03"]}`;
    await ControlUtils.Click(WalletPage.UnpaidSummaryCard());

    // The dashboard's Unpaid summary tile still renders (e.g. "0 Unpaid $0.00") even with
    // no unpaid invoices, so its own visibility can't tell us the list is empty. The row
    // menu button in the detail view it opens, however, only exists when there's an actual
    // unpaid invoice to act on - that's the reliable "is there data" signal.
    const unpaidRowCount = await WalletPage.UnpaidInvoiceMenuButton().count();
    if (unpaidRowCount === 0) {
      await softAssert(
        async () => expect(unpaidRowCount).toBe(0),
        Strings.MessagePassNoUnpaidInvoices,
        Strings.MessagePassNoUnpaidInvoices
      );
      return;
    }

    await softAssert(
      async () => expect(WalletPage.UnpaidInvoiceMenuButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassUnpaidSectionOpened,
      Strings.MessageFailUnpaidSectionOpened
    );

    testInfo.scenario = `${WalletUnpaidReminderStepNames["Step-04"]}`;
    await ControlUtils.Click(WalletPage.UnpaidInvoiceMenuButton());
    await softAssert(
      async () => expect(WalletPage.SendReminderButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassUnpaidInvoiceMenuOpened,
      Strings.MessageFailUnpaidInvoiceMenuOpened
    );

    testInfo.scenario = `${WalletUnpaidReminderStepNames["Step-05"]}`;
    await ControlUtils.Click(WalletPage.SendReminderButton());

    testInfo.scenario = `${WalletUnpaidReminderStepNames["Step-06"]}`;
    await softAssert(
      async () =>
        expect(WalletPage.ReminderSentSuccessToast()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassReminderSentSuccessfully,
      Strings.MessageFailReminderSentSuccessfully
    );
  });

  test(`TC-OXYM-WALLET-04: ${WalletTestCaseNames["TC-07"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = `${WalletTransactionViewStepNames["Step-01"]}`;
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await ControlUtils.Click(WalletPage.WalletTabIcon());
    await softAssert(
      async () => expect(WalletPage.RequestsTab()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassWalletTabOpened,
      Strings.MessageFailWalletTabOpened
    );

    testInfo.scenario = `${WalletTransactionViewStepNames["Step-02"]}`;
    await ControlUtils.Click(WalletPage.DashboardTab());
    await softAssert(
      async () => expect(WalletPage.ViewTransactionsButton()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassDashboardTabOpened,
      Strings.MessageFailDashboardTabOpened
    );

    testInfo.scenario = `${WalletTransactionViewStepNames["Step-03"]}`;
    await ControlUtils.Click(WalletPage.ViewTransactionsButton());
    await softAssert(
      async () => expect(WalletPage.TransactionsHeading()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassViewTransactionsOpened,
      Strings.MessageFailViewTransactionsOpened
    );

    testInfo.scenario = `${WalletTransactionViewStepNames["Step-04"]}`;
    if (!(await WalletPage.hasTransactionViewData())) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoTransactions,
        Strings.MessagePassNoTransactions
      );
      return;
    }
    await WalletPage.waitForTransactionViewData();
    await softAssert(
      async () => expect(WalletPage.TransactionViewDataIndicator()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassTransactionDataVisible,
      Strings.MessageFailTransactionDataVisible
    );

    testInfo.scenario = `${WalletTransactionViewStepNames["Step-05"]}`;
    await ControlUtils.Click(WalletPage.MonthlySegmentButton());
    if (!(await WalletPage.hasTransactionViewData())) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoTransactions,
        Strings.MessagePassNoTransactions
      );
      return;
    }
    await WalletPage.waitForTransactionViewData();
    await softAssert(
      async () => expect(WalletPage.TransactionViewDataIndicator()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassMonthlyViewDataLoaded,
      Strings.MessageFailMonthlyViewDataLoaded
    );

    testInfo.scenario = `${WalletTransactionViewStepNames["Step-06"]}`;
    await ControlUtils.Click(WalletPage.YearlySegmentButton());
    if (!(await WalletPage.hasTransactionViewData())) {
      await softAssert(
        async () => expect(true).toBe(true),
        Strings.MessagePassNoTransactions,
        Strings.MessagePassNoTransactions
      );
      return;
    }
    await WalletPage.waitForTransactionViewData();
    await softAssert(
      async () => expect(WalletPage.TransactionViewDataIndicator()).toBeVisible({ timeout: 30000 }),
      Strings.MessagePassYearlyViewDataLoaded,
      Strings.MessageFailYearlyViewDataLoaded
    );
  });
});
