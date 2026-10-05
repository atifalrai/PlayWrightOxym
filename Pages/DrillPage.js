export class DrillPage {
  static ManageDrillsButton() {
    return global.page.getByRole('button', { name: 'Manage Drills' });
  }
  static DrillCategoriesTab() {
    return global.page.getByText('Drill Categories', { exact: true });
  }
  static AddDrillOrCategoryButton() {
    return global.page.getByLabel('Add drill or category');
  }
  static AddCategoryOption() {
    return global.page.getByText('Add Category', { exact: true });
  }
  static CategoryNameInput() {
    return global.page.getByPlaceholder('Enter category name');
  }
  static CreateButton() {
    return global.page.getByRole('button', { name: 'Create' });
  }
  static CategoryCreatedToast() {
    return global.page.getByText('Category created successfully');
  }
  static CategoryAlreadyExistsToast() {
    return global.page.getByRole('status').filter({ hasText: 'A category with this name' });
  }
  static DrillCategoriesListContainer() {
    return global.page.locator('app-drill-bank').locator('div.grid.grid-cols-1');
  }
  static DrillCategoryListItem(categoryName) {
    return global.page.locator('app-drill-bank').locator('div.font-bold.text-gray-900').filter({ hasText: categoryName });
  }
  static DrillCategoryOptionsMenu(categoryName) {
    return global.page.locator('app-drill-bank').locator('div.rounded-2xl').filter({ has: global.page.locator('div.font-bold.text-gray-900').filter({ hasText: categoryName }) }).locator('button.options-trigger');
  }
  static DeleteCategoryOption() {
    return global.page.getByText('Delete', { exact: true });
  }
  static DeleteCategoryModal() {
    return global.page.getByText('Delete Category');
  }
  static ConfirmDeleteCategoryButton() {
    return global.page.getByRole('button', { name: 'Delete' });
  }
  static CategoryDeletedToast() {
    return global.page.getByText('Category deleted successfully');
  }
  static AddDrillOption() {
    return global.page.getByText('Add Drill', { exact: true });
  }
  static AddNewDrillHeading() {
    return global.page.locator('ion-modal').getByText('Add new Drill', { exact: true });
  }
  static SelectCategoryButton() {
    return global.page.getByRole('button', { name: 'Select Category' });
  }
  static CategorySelectOption(categoryName) {
    return global.page.locator('ion-modal').last().getByText(categoryName, { exact: true });
  }
  static SelectedCategoryInForm(categoryName) {
    return global.page.locator('ion-modal').getByText(categoryName, { exact: true });
  }
  static DrillTitleInput() {
    return global.page.getByRole('textbox', { name: 'Enter drill title (3-40' });
  }
  static DrillDescriptionInput() {
    return global.page.getByRole('textbox', { name: 'Enter drill description (max' });
  }
  static DrillDurationInput() {
    return global.page.getByRole('spinbutton');
  }
  static VideoLinkInput() {
    return global.page.getByRole('textbox', { name: 'Video Link URL (e.g., https' });
  }
  static AddLinkButton() {
    return global.page.getByRole('button', { name: 'Add link' });
  }
  static AddDrillButton() {
    return global.page.getByRole('button', { name: 'Add', exact: true });
  }
  static DrillAddedToast() {
    return global.page.getByText('Drill added successfully');
  }
  static DrillsCountInCategory(categoryName, count) {
    return global.page.locator('app-drill-bank').locator('div.rounded-2xl').filter({ has: global.page.locator('div.font-bold.text-gray-900').filter({ hasText: categoryName }) }).getByText(`Drills: ${count}`);
  }
  static DrillsCountBadge(categoryName) {
    return global.page.locator('app-drill-bank').locator('div.rounded-2xl').filter({ has: global.page.locator('div.font-bold.text-gray-900').filter({ hasText: categoryName }) }).getByText(/Drills: \d+/);
  }
  static DrillListItem(drillName) {
    return global.page.locator('div.font-bold.text-gray-900').filter({ hasText: drillName });
  }
  static DrillBankBackButton(categoryName) {
    return global.page.locator('app-drill-bank ion-content').filter({ hasText: categoryName }).getByRole('img').first();
  }
  static DrillOptionsMenu(drillName) {
    return global.page.locator('div.rounded-2xl').filter({ has: global.page.locator('div.font-bold.text-gray-900').filter({ hasText: drillName }) }).locator('button.options-trigger').first();
  }
  static EditOption() {
    return global.page.getByText('Edit', { exact: true });
  }
  static EditDrillHeading() {
    return global.page.locator('app-edit-drill-modal').getByText('Edit Drill', { exact: true });
  }
  static EditModalDrillTitleInput() {
    return global.page.locator('app-edit-drill-modal').getByRole('textbox', { name: 'Enter drill title (3-40' });
  }
  static EditModalDrillDescriptionInput() {
    return global.page.locator('app-edit-drill-modal').getByRole('textbox', { name: 'Enter drill description (max' });
  }
  static EditModalDrillDurationInput() {
    return global.page.locator('app-edit-drill-modal').getByRole('spinbutton');
  }
  static EditModalVideoLinkInput() {
    return global.page.locator('app-edit-drill-modal').getByRole('textbox', { name: 'Video Link URL (e.g., https' });
  }
  static EditModalAddLinkButton() {
    return global.page.locator('app-edit-drill-modal').getByRole('button', { name: 'Add link' });
  }
  static EditCategoryOption() {
    return global.page.getByText('Edit Category', { exact: true });
  }
  static VideoLinksSection() {
    return global.page.locator('app-edit-drill-modal').getByText('Video Links', { exact: true });
  }
  static DeleteExistingVideoLinkButton() {
    return global.page.locator('app-edit-drill-modal').getByRole('button').nth(2);
  }
  static VideoLinkItemInEditModal(url) {
    return global.page.locator('app-edit-drill-modal').getByText(url);
  }
  static UpdateButton() {
    return global.page.getByRole('button', { name: 'Update', exact: true });
  }
  static DrillUpdatedToast() {
    return global.page.getByText('Drill updated successfully');
  }
  static CategoryUpdatedToast() {
    return global.page.getByText('Category updated successfully');
  }
  static CategorySearchInput() {
    return global.page.getByPlaceholder('Search drills and categories...');
  }
  static DrillSearchInput() {
    return global.page.getByPlaceholder('Search Drills');
  }
  static SearchClearButton() {
    return global.page.locator('app-search-bar').getByRole('button');
  }
  static DrillBankListItems() {
    return global.page.locator('app-drill-bank').locator('div.rounded-2xl');
  }
  static DrillBankHeaderBackButton() {
    return global.page.locator('app-drill-bank ion-toolbar').getByRole('button').first();
  }
  static SearchProgressBar() {
    return global.page.getByRole('progressbar').locator('circle');
  }
}
