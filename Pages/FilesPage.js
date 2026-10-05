import { ControlUtils } from "./ControlUtils";
import { Consts } from "./Consts";

export class FilesPage {
  static Button_Role = "button";
  static Textbox_Role = "textbox";
  static Status_Identifier = "[role='status']";

  static AddFilesButton_RoleName = "Add files";
  static AddNewFolderOption_Text = "Add New Folder";
  static AddNewFileOption_Text = "Add New File";
  static AddNewFilePopup_Text = "Add New File";
  static ClickToUpload_Text = "Click to upload or drag and";
  static FolderTitleTextbox_RoleName = "Folder title";
  static FolderTitlePlaceholder_Text = "Folder title";
  static AddFolderButton_RoleName = "Add";
  static AddNewFolderPopup_Text = "Add new folder";
  static SaveFileButton_NamePattern = /Save \(\d+ file/i;
  static SearchFolderOrFileTextbox_RoleName = "Search Folder or File";
  static DeleteOption_Text = "Delete";
  static ConfirmDeleteHeading_RoleName = "Confirm Delete";
  static ConfirmDeleteButton_RoleName = "Delete";

  static FilesTile() {
    return global.page.getByText("Files", { exact: true });
  }

  static AddFilesButton() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Button_Role, { name: this.AddFilesButton_RoleName })
    );
  }

  static AddNewFolderOption() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(this.AddNewFolderOption_Text, { exact: true })
    );
  }

  static FolderTitleTextbox() {
    return global.page.getByPlaceholder(this.FolderTitlePlaceholder_Text);
  }

  static AddNewFolderPopupHeading() {
    return global.page.getByText(this.AddNewFolderPopup_Text, { exact: true });
  }

  static AddFolderButton() {
    return global.page
      .locator("ion-modal.show-modal")
      .getByRole(this.Button_Role, {
        name: this.AddFolderButton_RoleName,
        exact: true,
      });
  }

  static async FillFolderTitle(folderName = Consts.FilesFolderTitle) {
    const textbox = this.FolderTitleTextbox();
    await textbox.click();
    await textbox.clear();
    await textbox.fill(folderName);
  }

  static FolderCreatedToast(folderName = Consts.FilesFolderTitle) {
    const escapedFolderName = folderName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return global.page
      .locator("ion-toast")
      .filter({
        hasText: new RegExp(`Folder\\s+${escapedFolderName}\\s+created successfully!?`, "i"),
      });
  }

  static FolderCreatedMessage() {
    return ControlUtils.WaitForVisible(
      global.page
        .locator(this.Status_Identifier)
        .filter({ hasText: Consts.FilesFolderCreatedMessage })
    );
  }

  static FilesListItem(fileName = Consts.FileTitle) {
    return global.page.locator('div[title="Automation Testing"]').first();
  }
  static FirstFileListItem(fileName = Consts.FileTitle) {
    return ControlUtils.WaitForVisible(this.FilesListItem(fileName), 30000);
  }

  static FolderListItem(folderName = Consts.FolderTitle) {
    const filesApp = global.page.locator("app-files");
    return filesApp
      .locator(`div[title="${folderName}"]`)
      .first()
      .or(filesApp.getByText(folderName, { exact: true }).first());
  }

  static FirstFolderListItem(folderName = Consts.FolderTitle) {
    return ControlUtils.WaitForVisible(this.FolderListItem(folderName), 30000);
  }

  static SearchResultsMain() {
    return global.page.locator("app-files").getByRole("main");
  }

  static FolderInSearchResults(folderName = Consts.FolderTitle) {
    return this.SearchResultsMain().filter({ hasText: folderName }).first();
  }

  static FirstSearchResultRow() {
    return this.SearchResultsMain()
      .locator("tr")
      .first()
      .or(this.SearchResultsMain().locator("div").filter({ has: global.page.getByRole("button") }).first());
  }

  static FirstSearchResultEllipsisButton(folderName = Consts.FolderTitle) {
    const namedRow = this.FolderInSearchResults(folderName);
    return namedRow
      .getByRole(this.Button_Role)
      .last()
      .or(namedRow.locator("ion-button").last())
      .or(this.FirstSearchResultRow().getByRole(this.Button_Role).last());
  }

  static async SearchForFolder(searchText = Consts.FolderTitle) {
    const searchBox = global.page.getByRole(this.Textbox_Role, {
      name: this.SearchFolderOrFileTextbox_RoleName,
    });
    await searchBox.click();
    await searchBox.clear();
    await searchBox.fill(searchText);
    await this.SearchResultsMain()
      .waitFor({ state: "visible", timeout: 15000 })
      .catch(() => {});
  }

  static FolderEllipsisButton(folderName = Consts.FolderTitle) {
    return this.FirstSearchResultEllipsisButton(folderName);
  }

  static FolderNameText(folderName = Consts.FolderTitle) {
    return global.page.locator("app-files").getByText(folderName, { exact: true });
  }

  static NoFilesFoundMessage() {
    return global.page.getByText("No Files Found", { exact: true });
  }

  static FolderBreadcrumbBackButton() {
    return global.page.locator("app-files").getByRole(this.Button_Role).first();
  }

  static AddNewFileOption() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(this.AddNewFileOption_Text)
    );
  }

  static AddNewFilePopupHeading() {
    return global.page.getByText(this.AddNewFileOption_Text);
  }

  static ClickToUploadArea() {
    return global.page.getByText(this.ClickToUpload_Text);
  }

  static FileUploadInput() {
    return global.page.locator("input[type='file']");
  }

  static SaveFileButton() {
    return global.page.getByRole(this.Button_Role, { name: this.SaveFileButton_NamePattern });
  }

  static FileUploadedToast() {
    return global.page
      .locator("ion-toast")
      .filter({ hasText: Consts.FilesFileUploadedMessagePattern });
  }

  static FileInList(fileName = Consts.FilesUploadFileDisplayName) {
    return global.page.locator("app-files swiper-container").getByText(fileName);
  }

  static FileInRecentSection(fileName = Consts.FilesUploadFileDisplayName) {
    return global.page.locator("span").filter({ hasText: fileName });
  }

  static SearchFolderOrFileTextbox() {
    return ControlUtils.WaitForVisible(
      global.page.getByRole(this.Textbox_Role, { name: this.SearchFolderOrFileTextbox_RoleName })
    );
  }

  static RecentFilesSection() {
    return global.page.locator("app-files").getByText("Recent Files", { exact: true });
  }

  static RecentFilesCarousel() {
    return global.page.locator("app-files swiper-container");
  }

  static MainFilesList() {
    return global.page.locator("app-files").getByRole("main");
  }

  static MainFileSearchResult(fileName = Consts.FilesUploadFileDisplayName) {
    return this.MainFilesList().getByText(fileName, { exact: true }).first();
  }

  static RecentFileSearchResult(fileName = Consts.FilesUploadFileDisplayName) {
    return global.page.locator("app-files swiper-slide").filter({ hasText: fileName }).first();
  }

  /** First file row in the main Files list (not Recent Files carousel). */
  static FileCardForDelete(fileName = Consts.FilesUploadFileDisplayName) {
    return this.MainFileSearchResult(fileName);
  }

  static FileInSearchResults(fileName = Consts.FilesUploadFileDisplayName) {
    return this.MainFileSearchResult(fileName);
  }

  /** Ellipsis (3 dots) on the first matching row in the main Files list. */
  static FileEllipsisButton(fileName = Consts.FilesUploadFileDisplayName) {
    return this.MainFilesList().getByRole(this.Button_Role).first();
  }

  static async isFilePresentInSearchResults(fileName = Consts.FilesUploadFileDisplayName) {
    const inMain = await this.MainFileSearchResult(fileName)
      .isVisible({ timeout: 10000 })
      .catch(() => false);
    if (inMain) return true;
    return this.RecentFileSearchResult(fileName)
      .isVisible({ timeout: 5000 })
      .catch(() => false);
  }

  static async SearchForFile(searchText = Consts.FilesUploadFileSearchText) {
    const searchBox = global.page.getByRole(this.Textbox_Role, {
      name: this.SearchFolderOrFileTextbox_RoleName,
    });
    await searchBox.click();
    await searchBox.clear();
    await searchBox.fill(searchText);
    await this.MainFileSearchResult()
      .waitFor({ state: "visible", timeout: 15000 })
      .catch(() =>
        this.RecentFileSearchResult().waitFor({ state: "visible", timeout: 5000 }).catch(() => {})
      );
  }

  static DeleteFileOption() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(this.DeleteOption_Text, { exact: true })
    );
  }

  static ConfirmDeletePopupHeading() {
    return global.page.getByRole("heading", { name: this.ConfirmDeleteHeading_RoleName });
  }

  static ConfirmDeletePopup() {
    return global.page.locator("ion-modal.show-modal").last();
  }

  static ConfirmDeleteButton() {
    const popup = this.ConfirmDeletePopup();
    return popup
      .locator("ion-button")
      .filter({ hasText: new RegExp(`^\\s*${this.ConfirmDeleteButton_RoleName}\\s*$`, "i") })
      .or(popup.getByRole(this.Button_Role, { name: this.ConfirmDeleteButton_RoleName }))
      .or(
        global.page.getByRole(this.Button_Role, {
          name: this.ConfirmDeleteButton_RoleName,
          exact: true,
        }).last()
      );
  }

  static async WaitForConfirmDeletePopupReady(timeout = 30000) {
    await this.ConfirmDeletePopupHeading().waitFor({ state: "visible", timeout });
    await this.ConfirmDeletePopup().waitFor({ state: "visible", timeout });
    await this.ConfirmDeleteButton().waitFor({ state: "visible", timeout });
  }

  static async ClickConfirmDeleteButton() {
    await this.WaitForConfirmDeletePopupReady();
    await ControlUtils.ResilientClick(this.ConfirmDeleteButton(), { timeout: 30000 });
    await this.WaitForConfirmDeletePopupClosed();
  }

  static async WaitForConfirmDeletePopupClosed(timeout = 30000) {
    await this.ConfirmDeletePopupHeading()
      .waitFor({ state: "hidden", timeout })
      .catch(() => {});
    await this.ConfirmDeletePopup()
      .waitFor({ state: "hidden", timeout })
      .catch(() => {});
  }

  static FileDeletedToast() {
    return global.page
      .locator("ion-toast")
      .filter({ hasText: Consts.FilesFileDeletedMessagePattern });
  }

  static DeleteFolderOption() {
    return ControlUtils.WaitForVisible(
      global.page.getByText(this.DeleteOption_Text, { exact: true })
    );
  }

  static FolderDeletedToast() {
    return global.page
      .locator("ion-toast")
      .filter({ hasText: Consts.FilesFolderDeletedMessagePattern });
  }
}
