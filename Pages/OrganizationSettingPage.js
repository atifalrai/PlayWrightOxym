import { ControlUtils } from "./ControlUtils";

export class OrganizationSettingPage {
  static Button_Role = "button";
  static Heading_Role = "heading";
  static Textbox_Role = "textbox";

  static CreateNewOrganizationButton_RoleName = "Create New Organization";
  static OrganizationNameTextbox_RoleName = "Organization Name";
  static SubmitButton_RoleName = "Submit";
  static EditOrganizationNameButton_RoleName = "Edit organization name";
  static CopyOrganizationIdButton_RoleName = "Copy organization ID";
  static OrganizationOptionsButton_RoleName = "Organization options";
  static DeleteOrganizationButton_RoleName = "Delete Organization";
  static ConfirmDeleteOrganizationButton_RoleName = "Yes, delete organization";
  static GoBackButton_RoleName = "Go back";

  static OrganizationsListHeading_Text = "My Organizations";
  static OrganizationRenamedToast_Text = "Organization renamed";
  static OrganizationIdCopiedToast_Text = "Organization ID copied to";
  static OrganizationCreatedToast_Text = "Organization created";
  static DeletingOrganizationText = "Deleting organization";

  // ---- Organizations list page ----

  static OrganizationsListHeading() {
    return global.page.getByText(this.OrganizationsListHeading_Text, { exact: false }).first();
  }

  static CreateNewOrganizationButton() {
    return global.page.getByRole(this.Button_Role, { name: this.CreateNewOrganizationButton_RoleName });
  }

  /**
   * Each row in the Organizations list renders as a button whose accessible
   * name is "<org name> <N> Teams / <N> Administrators" (confirmed via a live
   * DOM snapshot: e.g. "Cinnova Testingt 5 Teams / 2 Administrators"), so
   * match on a name PREFIX rather than an exact label - the trailing counts
   * are not something a test can predict, and matching must NOT require a
   * word boundary right after orgName: the shared "Cinnova Testing" org was
   * manually renamed to "Cinnova Testingt" in an earlier exploratory session
   * (no boundary between the "g" and the trailing "t"), and this prefix match
   * needs to keep matching it as the environment drifts.
   */
  static OrganizationCard(orgName) {
    const escapedName = orgName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return global.page.getByRole(this.Button_Role, { name: new RegExp(`^${escapedName}`) }).first();
  }

  static async OpenOrganization(orgName) {
    await ControlUtils.ResilientClick(this.OrganizationCard(orgName));
  }

  // ---- Organization Detail page ----

  /**
   * Verifies the Detail page's OWN name field shows orgName - scoped to the
   * element right after the "Organization Name" label rather than a bare
   * page-wide text search. A page-wide search is ambiguous here: the live
   * environment has a team named identically to its organization ("Cinnova
   * Testing" the org contains a team also named "Cinnova Testing"), so
   * getByText(orgName) can match that team's row instead of the organization
   * name field, and .first() does not reliably prefer the "right" one.
   */
  static OrganizationNameText(orgName) {
    return this.OrganizationNameValue().filter({ hasText: orgName });
  }

  /**
   * The Detail page (confirmed via live DOM snapshot) renders:
   *   text "Organization Name" -> paragraph <name> -> button "Edit organization name"
   * "following-sibling" assumes the paragraph is a direct sibling of the
   * label, which is not guaranteed by the snapshot alone (the accessibility
   * tree does not show real DOM nesting) - walk forward through the whole
   * document instead, to the next element that has its own non-whitespace
   * text, which is far more likely to land on the paragraph regardless of
   * how the label and value are actually nested.
   */
  static OrganizationNameValue() {
    return global.page
      .getByText("Organization Name", { exact: true })
      .locator("xpath=following::*[normalize-space(text())][1]");
  }

  static async GetOrganizationDetailName() {
    return ControlUtils.GetText(this.OrganizationNameValue());
  }

  /**
   * The Detail page's "Edit organization name" button (used to confirm the
   * page has loaded) renders before the name paragraph's own text has been
   * populated from its data fetch, so a check immediately after landing on
   * the page can race that population and find an empty/stale paragraph.
   * Poll for non-empty text before treating the page as ready.
   */
  static async WaitForOrganizationNameLoaded(timeout = 15000) {
    const deadline = Date.now() + timeout;
    while (Date.now() < deadline) {
      const text = await ControlUtils.GetText(this.OrganizationNameValue()).catch(() => "");
      if (text && text.trim().length > 0) return;
      await global.page.waitForTimeout(300);
    }
  }

  static OrganizationIdLabel() {
    return global.page.getByText("Organization ID", { exact: false }).first();
  }

  /** Extracts the UUID rendered next to the "Organization ID" label. */
  static async GetDisplayedOrganizationId() {
    const container = this.OrganizationIdLabel().locator("xpath=ancestor::*[1]");
    const text = await ControlUtils.GetText(container);
    const match = text && text.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
    return match ? match[0] : null;
  }

  static OrganizationAdminsSectionHeading() {
    return global.page.getByText(/Organization Admin/i).first();
  }

  static TeamsSectionHeading() {
    return global.page.getByText(/^Teams\s*\(\d+\)/i).first();
  }

  /** Parses the "Teams (N)" count from the section heading - confirmed present even at N=0. */
  static async GetTeamsCount() {
    const text = await ControlUtils.GetText(this.TeamsSectionHeading()).catch(() => null);
    const match = text && text.match(/Teams\s*\((\d+)\)/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  static EditOrganizationNameButton() {
    return global.page.getByRole(this.Button_Role, { name: this.EditOrganizationNameButton_RoleName });
  }

  static OrganizationNameTextbox() {
    return global.page.getByRole(this.Textbox_Role, { name: this.OrganizationNameTextbox_RoleName });
  }

  static SubmitButton() {
    return global.page.getByRole(this.Button_Role, { name: this.SubmitButton_RoleName });
  }

  static ValidationErrorText() {
    return global.page.getByText(/required|cannot be empty|please enter/i).first();
  }

  /**
   * Opens the edit form and clears the name field, then confirms the clear
   * actually stuck rather than trusting a single fill(''). Two distinct
   * races are possible here: the textbox is attached and visible as soon as
   * the edit form opens, but its value is populated asynchronously afterward
   * (bound to the org's current name once that data resolves), so clearing
   * immediately can land before the pre-fill and get silently overwritten a
   * moment later; and some builds re-sync the bound value back into the
   * field shortly after user input even once the pre-fill has already
   * happened. Wait for a non-empty value first, then retry the clear itself
   * until it is confirmed empty (rather than a single fire-and-check).
   */
  static async OpenEditFormAndClear() {
    await ControlUtils.ResilientClick(this.EditOrganizationNameButton());
    const textbox = this.OrganizationNameTextbox();
    await textbox.waitFor({ state: "visible", timeout: 15000 });

    const prefillDeadline = Date.now() + 10000;
    while (Date.now() < prefillDeadline) {
      const value = await ControlUtils.GetInputValue(textbox).catch(() => "");
      if (value && value.trim().length > 0) break;
      await global.page.waitForTimeout(300);
    }

    const clearDeadline = Date.now() + 8000;
    while (Date.now() < clearDeadline) {
      await ControlUtils.Clear(textbox);
      await global.page.waitForTimeout(400);
      const value = await ControlUtils.GetInputValue(textbox).catch(() => "");
      if (!value) return;
    }
  }

  static async SetOrganizationName(newName) {
    await this.OpenEditFormAndClear();
    if (newName) {
      await ControlUtils.Fill(this.OrganizationNameTextbox(), newName);
    }
    await ControlUtils.ResilientClick(this.SubmitButton());
    // Wait for the confirmation round-trip before returning, so callers that
    // immediately assert on the new name aren't racing the update.
    await this.OrganizationRenamedToast().waitFor({ state: "visible", timeout: 15000 }).catch(() => {});
    await ControlUtils.WaitForToastsHidden().catch(() => {});
  }

  static CopyOrganizationIdButton() {
    return global.page.getByRole(this.Button_Role, { name: this.CopyOrganizationIdButton_RoleName });
  }

  static OrganizationRenamedToast() {
    return global.page.getByText(this.OrganizationRenamedToast_Text);
  }

  static OrganizationIdCopiedToast() {
    return global.page.getByText(this.OrganizationIdCopiedToast_Text);
  }

  static OrganizationCreatedToast() {
    return global.page.getByText(this.OrganizationCreatedToast_Text);
  }

  /**
   * Clipboard permissions are not granted at browser-context creation time
   * (see BrowserManager), so grant them lazily here - only the copy-id test
   * needs them, and requesting it up front for every spec is unnecessary.
   * MUST be called before clicking the copy button, not after: the app's own
   * click handler calls the Clipboard API to WRITE the id, and without
   * "clipboard-write" granted first that write can fail silently in-page,
   * which would also explain why no "copied" toast appears.
   */
  static async GrantClipboardPermissions() {
    await global.context.grantPermissions(["clipboard-read", "clipboard-write"]);
  }

  static async ReadClipboardText() {
    return global.page.evaluate(() => navigator.clipboard.readText());
  }

  // ---- Create organization ----

  static async CreateOrganization(orgName) {
    await ControlUtils.ResilientClick(this.CreateNewOrganizationButton());
    await ControlUtils.Fill(this.OrganizationNameTextbox(), orgName);
    await ControlUtils.ResilientClick(this.SubmitButton());
  }

  // ---- Teams section ----

  /**
   * On a populated organization the control next to "Teams (N)" renders as a
   * bare icon button with no "Add Teams" accessible name (confirmed via a
   * live screenshot: a plain "+" icon, not a labelled button) - so this is
   * unreliable and kept only as a best-effort fallback.
   */
  static AddTeamsButton() {
    return global.page.getByRole(this.Button_Role, { name: /Add Teams/i });
  }

  static TeamRow(teamName) {
    return global.page.getByText(teamName, { exact: true }).first();
  }

  /**
   * Each populated team row renders an avatar image immediately followed by
   * the team name (confirmed via a live screenshot showing avatar + name +
   * plan badge per row, with no "Add Teams" labelled button to anchor on
   * instead). Anchoring on the avatar's row container is a best-effort guess
   * - there is no accessibility-tree evidence for this state, only a raster
   * screenshot, so this locator most needs live verification.
   */
  static TeamRows() {
    return this.TeamsSectionHeading()
      .locator("xpath=following::img/ancestor::*[self::li or self::div][1]");
  }

  /**
   * Picks a team row to click for navigation, skipping any row whose name
   * equals the organization's own name. On the live environment the first
   * team happened to be literally named the same as its organization
   * ("Cinnova Testing" the org contains a team also named "Cinnova
   * Testing") - clicking that ambiguous row was the one that intermittently
   * failed to land on (and stay on) a team home page, while other rows are
   * unaffected. Falls back to the first row if every row collides.
   */
  static async GetPreferredTeamRow(orgName) {
    const rows = this.TeamRows();
    const count = await rows.count().catch(() => 0);
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const text = ((await ControlUtils.GetText(row).catch(() => "")) || "").trim();
      if (text && text !== orgName.trim()) return row;
    }
    return rows.first();
  }

  static NoTeamsMessage() {
    return global.page.getByText(/no teams/i).first();
  }

  // ---- Delete organization ----

  static OrganizationOptionsButton() {
    return global.page.getByRole(this.Button_Role, { name: this.OrganizationOptionsButton_RoleName });
  }

  static DeleteOrganizationMenuButton() {
    return global.page.getByRole(this.Button_Role, { name: this.DeleteOrganizationButton_RoleName });
  }

  static DeleteOrganizationHeading() {
    return global.page.getByRole(this.Heading_Role, { name: this.DeleteOrganizationButton_RoleName });
  }

  static DeleteOrganizationTeamsWarningText() {
    return global.page.getByText(/teams?.*(will|also).*delete/i).first();
  }

  static ConfirmDeleteOrganizationButton() {
    return global.page.getByRole(this.Button_Role, { name: this.ConfirmDeleteOrganizationButton_RoleName });
  }

  /**
   * "Delete Organization" is a directly visible footer (contentinfo) button on
   * the Detail page - confirmed via live DOM snapshot - not tucked behind the
   * banner's "Organization options" menu, so no menu click is needed first.
   */
  static async DeleteOrganization() {
    await ControlUtils.ResilientClick(this.DeleteOrganizationMenuButton());
    await this.DeleteOrganizationHeading().waitFor({ state: "visible", timeout: 15000 });
    await ControlUtils.ResilientClick(this.ConfirmDeleteOrganizationButton());
  }

  static GoBackButton() {
    return global.page.getByRole(this.Button_Role, { name: this.GoBackButton_RoleName }).last();
  }

  /**
   * Organization Settings and its Detail page are full-page routes that
   * replace the tabbed shell entirely (confirmed via live DOM snapshot: only
   * a banner/main/contentinfo, no bottom tab bar) - so LoginFlow.SignOut(),
   * which clicks the bottom-nav Account tab in every afterEach, cannot run
   * until a test has backed out of these routes. Callers must invoke this
   * before returning, regardless of pass/fail. It only needs to get the
   * bottom tab bar back on screen - SignOut() clicks the Account tab itself,
   * so there is no need to also drive all the way into the Account screen's
   * own content first.
   *
   * Two different classes of screen can be active when this runs:
   *  - A normal, tab-based screen (e.g. a team's home screen, reached via
   *    TC-06 clicking into a team) - its tab bar is already visible, so the
   *    fastest and most reliable way back is to click the Account tab
   *    directly rather than hunting for a "Go back" button that doesn't
   *    exist there (confirmed via live DOM snapshot: clicking it in this
   *    case previously wasted up to ~6 minutes retrying a button that would
   *    never appear).
   *  - A stacked Organization Settings / Detail route with no tab bar at
   *    all - back out one level at a time via its own "Go back" button,
   *    which can take a few seconds to become interactive right after a
   *    navigation (e.g. immediately after TC-07 deletes an organization and
   *    returns to the list), so give it a real timeout rather than bailing
   *    after a token check.
   */
  static async ReturnToAccountScreen(accountOptionsNavLocator, maxAttempts = 5) {
    const accountTab = global.page
      .locator("#tab-button-account")
      .or(global.page.getByRole("tab", { name: "Account" }))
      .first();

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const onAccountScreen = await accountOptionsNavLocator.isVisible({ timeout: 3000 }).catch(() => false);
      if (onAccountScreen) return;

      const tabBarVisible = await accountTab.isVisible({ timeout: 3000 }).catch(() => false);
      if (tabBarVisible) {
        await accountTab.click({ timeout: 8000 }).catch(() => {});
        continue;
      }

      const backButton = this.GoBackButton();
      const backButtonAppeared = await backButton
        .waitFor({ state: "visible", timeout: 8000 })
        .then(() => true)
        .catch(() => false);
      if (!backButtonAppeared) return;
      await backButton.click({ timeout: 8000 }).catch(() => {});
    }
  }
}
