export class PracticePlanPage {
  static PracticePlansTab() {
    return global.page.locator('div').filter({ hasText: /^Practice Plans$/ });
  }
  static PracticePlansHeading () {
    return global.page.getByRole('banner').getByText('Practice Plans');
  }
  static AddPracticePlanButton() {
    return global.page.getByLabel('Add practice plan');
  }
  static AddNewPracticePlanOption() {
    return global.page.getByText('Add New Practice Plan');
  }
  static AddNewFolderOption() {
    return global.page.getByText('Add New Folder');
  }
  static AddNewFolderHeading() {
    return global.page.getByRole('heading', { name: 'Add new folder' });
  }
  static FolderTitleInput() {
    return global.page.getByPlaceholder('Folder title');
  }
  static FolderCreatedToast(folderName) {
    return global.page.getByText(new RegExp(`Folder ${folderName} created`, 'i'));
  }
  static NoPracticePlansYetHeading() {
    return global.page.getByRole('heading', { name: 'No Practice Plans Yet' });
  }
  static CreatePracticePlanButton() {
    return global.page.getByRole('button', { name: 'Create Practice Plan' });
  }
  static SaveToFolderToggle() {
    return global.page.locator('label').filter({ hasText: 'Save to folder' }).locator('path');
  }
  static SelectFolderHeading() {
    return global.page.getByRole('heading', { name: 'Select Folder' });
  }
  static FolderOption(folderName) {
    return global.page.getByTitle(folderName);
  }
  static PracticePlanCreatedInFolderToast(planName) {
    return global.page.getByText(`Practice Plan ${planName} created successfully in`);
  }
  static FolderInList(folderName) {
    return global.page.getByText(folderName, { exact: true });
  }
  static PracticePlanInFolderList(planName) {
    return global.page.locator('app-practice-plans').locator('div.rounded-2xl').filter({ hasText: planName });
  }
  static FolderOptionsMenu(folderName) {
    return global.page.locator('app-practice-plans').locator('div.rounded-2xl').filter({ has: global.page.locator('div.flex-1').filter({ hasText: new RegExp(`^${folderName}`) }) }).locator('button');
  }
  static DeleteFolderModal() {
    return global.page.getByText('Delete Folder');
  }
  static FolderDeletedToast(folderName) {
    return global.page.getByText(new RegExp(`Folder ${folderName}.*deleted`, 'i'));
  }
  static PracticePlanTitleInput() {
    return global.page.getByPlaceholder('Practice Plan title');
  }
  static AddButton() {
    return global.page.getByRole('button', { name: 'Add' });
  }
  static PracticePlanCreatedToast(planName) {
    return global.page.getByText(`Practice Plan ${planName} created successfully !`);
  }
  static NoDrillsYetHeading() {
    return global.page.getByRole('heading', { name: 'No Drills Yet' });
  }
  static BackButton() {
    return global.page.getByRole('button').first();
  }
  static RecentTab() {
    return global.page.getByText('Recent', { exact: true });
  }
  static PracticePlanCardInSwiper(planName) {
    return global.page.locator('app-practice-plans swiper-container').getByText(planName).first();
  }
  static PracticePlanListItem(planName) {
    return global.page.getByText(planName).nth(1);
  }
  static PracticePlanOptionsMenu(planName) {
    return global.page.locator('app-practice-plans').locator('div.rounded-2xl').filter({ hasText: planName }).locator('button');
  }
  static RenameOption() {
    return global.page.getByText('Rename', { exact: true });
  }
  static RenamePracticePlanHeading() {
    return global.page.getByRole('heading', { name: 'Rename Practice Plan' });
  }
  static PracticePlanNameInput() {
    return global.page.getByPlaceholder('Practice Plan name');
  }
  static RenameButton() {
    return global.page.getByRole('button', { name: 'Rename' });
  }
  static PracticePlanRenamedToast() {
    return global.page.getByText('Practice Plan renamed');
  }
  static RenameFolderHeading() {
    return global.page.getByRole('heading', { name: 'Rename Folder' });
  }
  static FolderNameInput() {
    return global.page.getByPlaceholder('Folder name');
  }
  static FolderRenamedToast() {
    return global.page.getByText('Folder renamed successfully!');
  }
  static SearchInput() {
    return global.page.getByRole('textbox', { name: 'Search Practice Plans' });
  }
  static SearchClearButton() {
    return global.page.locator('app-search-bar').getByRole('button');
  }
  static SearchResultItems() {
    return global.page.locator('app-practice-plans').locator('div.rounded-2xl');
  }
  static DeleteOption() {
    return global.page.getByText('Delete', { exact: true });
  }
  static DeletePracticePlanModal() {
    return global.page.getByText('Delete Practice Plan');
  }
  static ConfirmDeleteButton() {
    return global.page.getByRole('button', { name: 'Delete' });
  }
  static PracticePlanDeletedToast(planName) {
    return global.page.getByText(new RegExp(`Practice Plan ${planName}.*deleted`, 'i'));
  }
  static CommentsTab() {
    return global.page.locator('ion-segment-button').filter({ hasText: 'Comments' });
  }
  static ZeroCommentsText() {
    return global.page.getByText('0 Comments', { exact: true });
  }
  static AddFirstCommentButton() {
    return global.page.getByRole('button', { name: 'Add First Comment' });
  }
  static AddCommentHeading() {
    return global.page.getByRole('heading', { name: 'Add Comment' });
  }
  static CommentInput() {
    return global.page.getByPlaceholder('Write your comment...');
  }
  static AddCommentButton() {
    return global.page.getByRole('button', { name: 'Add Comment' });
  }
  static CommentAddedToast() {
    return global.page.getByText('Comment added successfully!');
  }
  static CommentText(commentText) {
    return global.page.locator('app-pp-detail').getByText(commentText);
  }
  static OneCommentText() {
    return global.page.getByText('1 Comment', { exact: true });
  }
  static CommentOptionsButton() {
    return global.page.locator('app-pp-detail ion-content button');
  }
  static DeleteCommentModal() {
    return global.page.getByText('Delete Comment');
  }
  static CommentDeletedToast() {
    return global.page.getByText('Comment deleted successfully!');
  }
  static EditOption() {
    return global.page.getByText('Edit', { exact: true });
  }
  static EditCommentHeading() {
    return global.page.getByRole('heading', { name: 'Edit Comment' });
  }
  static EditCommentInput() {
    return global.page.getByPlaceholder('Edit your comment...');
  }
  static UpdateCommentButton() {
    return global.page.getByRole('button', { name: 'Update Comment' });
  }
  static CommentUpdatedToast() {
    return global.page.getByText('Comment updated successfully!');
  }
  static AddFirstDrillButton() {
    return global.page.getByRole('button', { name: 'Add First Drill' });
  }
  static SelectDrillsOption() {
    return global.page.getByText('Select Drills');
  }
  static DrillCategoryButton(categoryName) {
    return global.page.locator('button').filter({ hasText: new RegExp(`^${categoryName}$`) });
  }
  static DrillCheckboxInPlan(drillName) {
    return global.page.locator('label').filter({ hasText: drillName }).locator('path').first();
  }
  static AddDrillsToPlanButton(count) {
    return global.page.getByRole('button', { name: new RegExp(`Add ${count} Drill`) });
  }
  static DrillsAddedToPlanToast() {
    return global.page.getByText('drill(s) added successfully!');
  }
  static DrillInPracticePlan(drillName) {
    return global.page.locator('app-pp-detail').getByText(drillName);
  }
  static PracticePlanDrillOptionsButton(drillName) {
    return global.page.locator('[id^="cdk-drop-list"]').filter({ hasText: drillName }).getByRole('button');
  }
  static DeleteDrillFromPlanModal() {
    return global.page.getByText('Delete Drill');
  }
  static DrillRemovedFromPlanToast(drillName) {
    return global.page.getByText(`${drillName} removed`);
  }
  static DrillNameInputInPlan() {
    return global.page.getByPlaceholder('Drill name');
  }
  static DrillDurationInputInPlan() {
    return global.page.getByPlaceholder('Minutes (1-120)');
  }
  static DrillCustomDescriptionInputInPlan() {
    return global.page.getByPlaceholder('Add a custom description for');
  }
  static CustomizeNotesToggle() {
    return global.page.getByText('✓ Customized from default drill description');
  }
  static PlanSpecificNotesInput() {
    return global.page.getByPlaceholder('Add notes specific to this');
  }
  static UpdateForThisPlanButton() {
    return global.page.getByRole('button', { name: 'Update for This Plan' });
  }
  static DrillConfigUpdatedToast() {
    return global.page.getByText('Drill configuration updated');
  }
  static DrillNameInPracticePlan(drillName) {
    return global.page.locator('app-pp-detail').getByText(drillName, { exact: true });
  }
}
