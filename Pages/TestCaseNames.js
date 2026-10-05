// Legacy dictionary (still used by some specs like AutoCode / ProjectTest)
const TestCaseNames = {
  "TC-01": "Go to Team's Home page",
  "TC-02": "Navigate to Notes tab",
  "TC-03": "Open Add note form",
  "TC-04": "Create note with title and body",
  "TC-05": "Open note from list",
  "TC-06": "Edit note content",
  "TC-07": "Delete note with confirmation",
};

// Notes-specific test case names (used by Notes.spec.js)
const NotesTestCaseNames = {
  "TC-01": "Create a New Note",
  "TC-02": "Open note from list",
  "TC-03": "Edit note content",
  "TC-04": "Delete note with confirmation",
};

// Notes step names (used for per-step scenarios in Notes.spec.js)
const NotesStepNames = {
  "Step-01": "Go to Team's Home page",
  "Step-02": "Navigate to Notes tab",
  "Step-03": "Open Add note form",
  "Step-04": "Create note with title and body",
  "Step-05": "Open note from list",
  "Step-06": "Edit note content",
  "Step-07": "Delete note with confirmation",
};

const WalletTestCaseNames = {
  "TC-01": "Create New Invoice",
  "TC-02": "Verify Transfer to People working",
  "TC-03": "Verify Transfer to Instant Banking working",
  "TC-04": "Verify Transfer to Standard Banking working",
  "TC-05": "Send Reminder for Overdue invoices is working",
  "TC-06": "Verify that send reminder functionality for Unpaid is working",
  "TC-07": "Verify that transaction view is working",
};

const WalletStepNames = {
  "Step-01": "Open Wallet module",
  "Step-02": "Verify Wallet invoices page loaded",
  "Step-03": "Open Create request and verify New Request page",
  "Step-04": "Enter payment request title",
  "Step-05": "Enter amount per person",
  "Step-06": "Enter payment description",
  "Step-07": "Open due date calendar",
  "Step-08": "Select due date one week ahead",
  "Step-09": "Confirm selected due date",
  "Step-10": "Proceed to Select People step",
  "Step-11": "Select team and member",
  "Step-12": "Click Select All",
  "Step-13": "Proceed to Review step and send request",
};

const WalletTransferStepNames = {
  "Step-01": "Open Wallet module",
  "Step-02": "Verify Wallet page loaded",
  "Step-03": "Click Transfer tab",
  "Step-04": "Select Transfer to People",
  "Step-05": "Select recipients and click Next",
  "Step-06": "Enter transfer amounts and click Next",
  "Step-07": "Slide to confirm transfer",
  "Step-08": "Verify transfer success message",
};

const WalletInstantBankTransferStepNames = {
  "Step-01": "Open Wallet module",
  "Step-02": "Verify Wallet page loaded",
  "Step-03": "Click Transfer tab",
  "Step-04": "Select Transfer to Bank",
  "Step-05": "Enter transfer amount",
  "Step-06": "Select Instant banking option",
  "Step-07": "Slide to confirm transfer",
  "Step-08": "Verify transfer success message",
};

const WalletStandardBankTransferStepNames = {
  "Step-01": "Open Wallet module",
  "Step-02": "Verify Wallet page loaded",
  "Step-03": "Click Transfer tab",
  "Step-04": "Select Transfer to Bank",
  "Step-05": "Enter transfer amount",
  "Step-06": "Select Standard banking option",
  "Step-07": "Slide to confirm transfer",
  "Step-08": "Verify transfer success message",
};

const WalletOverdueReminderStepNames = {
  "Step-01": "Open Wallet module",
  "Step-02": "Click Dashboard tab",
  "Step-03": "Open Overdue section",
  "Step-04": "Open overdue invoice menu",
  "Step-05": "Click Send Reminder",
  "Step-06": "Verify reminder success message",
};

const WalletUnpaidReminderStepNames = {
  "Step-01": "Open Wallet module",
  "Step-02": "Click Dashboard tab",
  "Step-03": "Open Unpaid section",
  "Step-04": "Open unpaid invoice menu",
  "Step-05": "Click Send Reminder",
  "Step-06": "Verify reminder success message",
};

const WalletTransactionViewStepNames = {
  "Step-01": "Open Wallet module",
  "Step-02": "Click Dashboard tab",
  "Step-03": "Open View Transactions",
  "Step-04": "Verify transaction data is present",
  "Step-05": "Switch to Monthly view and verify data loads",
  "Step-06": "Switch to Yearly view and verify data loads",
  "Step-07": "Apply year filter and verify data loads",
  "Step-08": "Apply month filter and verify data loads",
};

const FilesTestCaseNames = {
  "TC-01": "Add a Folder in Files module",
  "TC-02": "Add a File in Files module",
  "TC-03": "Delete File in Files module",
  "TC-04": "Delete Folder in Files module",
};

const FilesNavStepNames = {
  "Step-01": "Verify Guide page is visible",
  "Step-02": "Verify team switched successfully",
  "Step-03": "Verify Files module is opened",
};

const FilesStepNames = {
  "Step-01": "Click on Files tile",
  "Step-02": "Click on the floating Add files button",
  "Step-03": "Select Add new folder option",
  "Step-04": "Verify Add new Folder popup appears",
  "Step-05": "Enter a folder name",
  "Step-06": "Click on Add button",
  "Step-07": "Verify folder created successfully",
};

const FilesUploadStepNames = {
  "Step-01": "Click on the floating Add files button",
  "Step-02": "Select Add new Files option",
  "Step-03": "Verify Add New File popup appears",
  "Step-04": "Click on file upload box and upload file",
  "Step-05": "Click on Save File button",
  "Step-06": "Verify file uploaded successfully toast",
  "Step-07": "Verify file is visible in the file list",
  "Step-08": "Verify new file is displaying in recent section",
};

const FilesDeleteStepNames = {
  "Step-01": "Click on the first folder",
  "Step-02": "Upload file inside the folder",
  "Step-03": "Search for uploaded file and verify presence",
  "Step-04": "Click on the ellipsis icon of uploaded file",
  "Step-05": "Select the Delete option",
  "Step-06": "Verify Delete confirmation popup appears",
  "Step-07": "Click the Delete button",
  "Step-08": "Verify file deleted successfully toast",
  "Step-09": "Verify file no longer appears in the list",
};

const FilesDeleteFolderStepNames = {
  "Step-01": "Search for folder and verify presence",
  "Step-02": "Click on the ellipsis icon of the folder",
  "Step-03": "Select the Delete option",
  "Step-04": "Verify Delete confirmation popup appears",
  "Step-05": "Click the Delete button",
  "Step-06": "Verify folder deleted successfully toast",
  "Step-07": "Verify folder no longer appears in the list",
};

const MessageTestCaseNames = {
  "TC-01": "Start a new chat with a team member and send a message",
  "TC-02": "Attach a file/image to a message",
  "TC-03": "Share an Event in a message",
  "TC-04": "Share a Practice Plan in a message",
  "TC-05": "Share a Playbook Drawing in a message",
  "TC-06": "Create a Poll in a group conversation",
  "TC-07": "Create a Custom Group and send a message",
  "TC-08": "Unread badge, reply and read-receipt across two users",
};

const MessageNavStepNames = {
  "Step-01": "Verify Guide page is visible",
  "Step-02": "Verify team switched successfully",
  "Step-03": "Verify Messages module is opened with Chat list",
};

const MessageNewChatStepNames = {
  "Step-01": "Click the Start new chat floating button",
  "Step-02": "Verify New chat screen is opened",
  "Step-03": "Select a team member from the Members list",
  "Step-04": "Verify the 1:1 conversation is opened",
  "Step-05": "Type a message in the composer",
  "Step-06": "Send the message and verify it is visible in the conversation",
};

const MessageAttachmentStepNames = {
  "Step-01": "Click the plus icon next to the composer to open attachment options",
  "Step-02": "Verify attachment options menu is visible",
  "Step-03": "Upload a file/image via the Attachment option",
  "Step-04": "Verify the attachment is visible in the conversation",
};

const MessageEventStepNames = {
  "Step-01": "Click the plus icon next to the composer to open attachment options",
  "Step-02": "Click the Event option",
  "Step-03": "Verify Select Event picker is opened",
  "Step-04": "Select an event and click Share Event",
  "Step-05": "Verify the event is visible in the conversation",
};

const MessagePracticePlanStepNames = {
  "Step-01": "Click the plus icon next to the composer to open attachment options",
  "Step-02": "Click the Practice Plan option",
  "Step-03": "Verify Select Practice Plan picker is opened",
  "Step-04": "Select a practice plan and click Share Plan",
  "Step-05": "Verify the practice plan is visible in the conversation",
};

const MessageDrawingStepNames = {
  "Step-01": "Click the plus icon next to the composer to open attachment options",
  "Step-02": "Click the Playbook Drawing option",
  "Step-03": "Verify Select Drawing picker is opened",
  "Step-04": "Select a drawing and share it",
  "Step-05": "Verify the drawing is visible in the conversation",
};

const MessagePollStepNames = {
  "Step-01": "Open a group conversation",
  "Step-02": "Click the plus icon next to the composer to open attachment options",
  "Step-03": "Click the Poll option and verify Create a Poll form is opened",
  "Step-04": "Enter the poll question and options",
  "Step-05": "Click Create Poll and verify the poll is visible in the conversation",
};

const MessageCustomGroupStepNames = {
  "Step-01": "Click the Start new chat floating button",
  "Step-02": "Click the Custom Group option",
  "Step-03": "Verify Select Members screen is opened",
  "Step-04": "Select two or more members",
  "Step-05": "Click Create Group and enter a group name and description",
  "Step-06": "Click Create and verify the group conversation is opened",
  "Step-07": "Type and send a message in the group conversation",
};

const MessageUnreadCycleStepNames = {
  "Step-01": "Open the 1:1 conversation with the team member and capture the member's email",
  "Step-02": "Send a unique message to the team member",
  "Step-03": "Sign out of the main account",
  "Step-04": "Sign in as the team member using the captured email",
  "Step-05": "Verify the Home page Messages tile shows an unread badge count",
  "Step-06": "Open Messages and verify the conversation shows an unread badge",
  "Step-07": "Open the conversation and verify the unread message is visible",
  "Step-08": "Reply to the message",
  "Step-09": "Verify the unread badge is cleared for the conversation",
  "Step-10": "Sign out and sign back in as the main account",
  "Step-11": "Open the conversation and verify the sent message shows the Seen (double-tick) read receipt",
};

const AccountTestCaseNames = {
  "TC-01": "Navigate to Account Screen and verify role-gated menu (OA)",
  "TC-02": "Verify Account Screen hides Org Settings/Billing for a non-OA role",
};

const AccountNavStepNames = {
  "Step-01": "Verify Organization Admin is logged in",
  "Step-02": "Click the Account tab on bottom navigation",
  "Step-03": "Verify the Account screen is opened",
};

const AccountOAMenuStepNames = {
  "Step-01": "Verify profile picture is visible on the Account screen",
  "Step-02": "Verify logged-in user's full name is visible on the Account screen",
  "Step-03": "Verify Profile menu item is visible",
  "Step-04": "Verify Settings menu item is visible",
  "Step-05": "Verify Organization Settings menu item is visible",
  "Step-06": "Verify Billing menu item is visible",
  "Step-07": "Verify Help menu item is visible",
  "Step-08": "Verify Logout (Sign Out) menu item is visible",
  "Step-09": "Open each menu item and return to the Account screen via Go back",
};

const AccountNoOrgMenuStepNames = {
  "Step-01": "Sign out of the Organization Admin account",
  "Step-02": "Sign in as the non-OA player account",
  "Step-03": "Click the Account tab on bottom navigation",
  "Step-04": "Verify the Account screen is opened",
  "Step-05": "Verify Profile, Settings, Help and Logout are visible",
  "Step-06": "Verify Organization Settings is not visible",
  "Step-07": "Verify Billing is not visible",
};

const AccountSettingTestCaseNames = {
  "TC-01": "Navigate to Settings screen from Account page",
  "TC-02": "Settings menu item is visible for every role",
  "TC-03": "Turn Notifications off",
  "TC-04": "Turn Notifications back on",
  "TC-05": 'Toggle "Do Not Sell My Personal Information" on and off',
  "TC-06": "Settings persist across login sessions",
};

const AccountSettingNavStepNames = {
  "Step-01": "Click the Account tab on bottom navigation",
  "Step-02": "Tap Settings from the Account screen",
  "Step-03": "Verify the Settings screen opens showing a Notifications toggle and a Do Not Sell My Personal Information toggle",
};

/** TC-02: role is looped by the caller against every account it has credentials for. */
const AccountSettingRoleVisibilityStepNames = {
  "Step-01": "Sign in as the given role",
  "Step-02": "Open the Account screen",
  "Step-03": "Verify Settings is visible and tappable in the menu regardless of role",
};

const AccountSettingNotificationsOffStepNames = {
  "Step-01": "Open Account Settings",
  "Step-02": "Toggle Notifications off",
  "Step-03": "Verify the toggle visually reflects the off state",
  "Step-04": "Refresh the page",
  "Step-05": "Verify Notifications remains off after reload",
};

const AccountSettingNotificationsOnStepNames = {
  "Step-01": "Open Account Settings with Notifications currently off",
  "Step-02": "Toggle Notifications on",
  "Step-03": "Wait for the loading spinner to clear (OXYD-6738)",
  "Step-04": "Verify the toggle shows the on state",
  "Step-05": "Verify the on state persists after reload",
};

const AccountSettingDoNotSellStepNames = {
  "Step-01": "Open Account Settings",
  "Step-02": 'Toggle "Do Not Sell My Personal Information" on',
  "Step-03": "Verify the toggle reflects the on state and persists after reload",
  "Step-04": 'Toggle "Do Not Sell My Personal Information" off',
  "Step-05": "Verify the toggle reflects the off state and persists after reload",
};

const AccountSettingPersistAcrossSessionsStepNames = {
  "Step-01": 'Open Account Settings and set Notifications off and "Do Not Sell My Personal Information" on',
  "Step-02": "Log out",
  "Step-03": "Log back in with the same account",
  "Step-04": "Open Account Settings",
  "Step-05": "Verify both toggles retain the values set before logout",
};

const OrganizationSettingTestCaseNames = {
  "TC-01": "Navigate to Organization Settings and view organizations list",
  "TC-02": "Create a new organization",
  "TC-03": "View Organization Detail page",
  "TC-04": "Edit organization name with validation",
  "TC-05": "Copy Organization ID to clipboard",
  "TC-06": "Navigate from Organization Detail to a Team Home page",
  "TC-07": "Delete a disposable test organization (full lifecycle)",
};

const OrganizationSettingListStepNames = {
  "Step-01": "Open Account and tap Organization Settings",
  "Step-02": "Verify the Organizations list page opens",
  "Step-03": "Verify it lists an organization where this user has Organization Admin permissions",
  "Step-04": 'Verify a "Create New Organization" action is visible',
};

const OrganizationSettingCreateStepNames = {
  "Step-01": "Open Account Organization Settings",
  "Step-02": 'Tap "Create New Organization"',
  "Step-03": "Enter a unique organization title",
  "Step-04": "Submit the new organization",
  "Step-05": "Verify the new organization appears in the Organizations list",
};

const OrganizationSettingDetailStepNames = {
  "Step-01": "Open Account Organization Settings",
  "Step-02": "Select an organization from the list",
  "Step-03": "Verify the Organization Detail page shows organization name, Organization ID, Organization Admins section and Teams section",
};

const OrganizationSettingEditNameStepNames = {
  "Step-01": "Open an Organization Detail page",
  "Step-02": "Clear the organization name field and attempt to save with an empty value",
  "Step-03": "Verify validation blocks the save with an error message",
  "Step-04": "Enter a valid new name and save",
  "Step-05": "Verify success feedback is shown and the updated name displays on the page",
  "Step-06": "Rename the organization back to its original name",
};

const OrganizationSettingCopyIdStepNames = {
  "Step-01": "Open an Organization Detail page",
  "Step-02": "Tap the copy icon next to the Organization ID",
  "Step-03": "Verify success feedback (toast) is shown",
  "Step-04": "Read the clipboard contents and verify they match the displayed Organization ID",
};

const OrganizationSettingTeamNavStepNames = {
  "Step-01": "Open an Organization Detail page",
  "Step-02": "Check whether the Teams section lists any teams",
  "Step-03": "If no teams are listed, verify the empty-state message and skip the remaining steps",
  "Step-04": "If teams are listed, tap a team in the Teams section",
  "Step-05": "Verify navigation lands on that team's Team Home page",
};

const OrganizationSettingDeleteStepNames = {
  "Step-01": "Create a disposable test organization",
  "Step-02": "Open that organization's Detail page",
  "Step-03": 'Tap "Delete Organization"',
  "Step-04": "Verify a confirmation bottom sheet warns that all linked teams will also be deleted",
  "Step-05": "Confirm deletion",
  "Step-06": "Verify the organization no longer appears in the Organizations list",
};

const ScheduleModuleTestCaseNames = {
  "TC-01": "Verify User Can Create a Game Event Successfully",
  "TC-02": "Verify User Can Edit a Game Event Successfully",
  "TC-03": "Verify User Can Create a Practice Event Successfully",
  "TC-04": "Verify User Can Edit an Practice Event Successfully",
  "TC-05": "Verify User Can Create a Meeting Event Successfully",
  "TC-06": "Verify User Can Edit Meeting Event Successfully",
};

const PracticePlanTestCaseNames = {
  "TC-01": "Verify Practice Plan Creation Functionality",
  "TC-02": "Verify Practice Plan within Folder Creation Functionality",
  "TC-03": "Verify Rename Functionality in Practice Plan Module",
  "TC-04": "Verify Search Functionality in Practice Plan Module",
  "TC-05": "Verify Search Functionality within Practice Plan Folder",
  "TC-06": "Verify Comment Adding Functionality in Practice Plan Module",
  "TC-07": "Verify Edit Comment Functionality in Practice Plan Module",
};

const DrillManagementTestCaseNames = {
  "TC-01": "Verify Drill Category Creation Functionality in Drill Management Module",
  "TC-02": "Verify Drill Creation within Category Functionality in Drill Management Module",
  "TC-03": "Verify Edit Functionality of Drill Management Module",
  "TC-04": "Verify Search Functionality in Drill Management Module",
  "TC-05": "Verify Drill Adding Functionality in Practice Plan",
  "TC-06": "Verify Edit Drill Functionality in Practice Plan",
};

module.exports = {
  TestCaseNames,
  ScheduleModuleTestCaseNames,
  PracticePlanTestCaseNames,
  DrillManagementTestCaseNames,
  NotesTestCaseNames,
  NotesStepNames,
  WalletTestCaseNames,
  WalletStepNames,
  WalletTransferStepNames,
  WalletInstantBankTransferStepNames,
  WalletStandardBankTransferStepNames,
  WalletOverdueReminderStepNames,
  WalletUnpaidReminderStepNames,
  WalletTransactionViewStepNames,
  FilesTestCaseNames,
  FilesNavStepNames,
  FilesStepNames,
  FilesUploadStepNames,
  FilesDeleteStepNames,
  FilesDeleteFolderStepNames,
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
  AccountTestCaseNames,
  AccountNavStepNames,
  AccountOAMenuStepNames,
  AccountNoOrgMenuStepNames,
  AccountSettingTestCaseNames,
  AccountSettingNavStepNames,
  AccountSettingRoleVisibilityStepNames,
  AccountSettingNotificationsOffStepNames,
  AccountSettingNotificationsOnStepNames,
  AccountSettingDoNotSellStepNames,
  AccountSettingPersistAcrossSessionsStepNames,
  OrganizationSettingTestCaseNames,
  OrganizationSettingListStepNames,
  OrganizationSettingCreateStepNames,
  OrganizationSettingDetailStepNames,
  OrganizationSettingEditNameStepNames,
  OrganizationSettingCopyIdStepNames,
  OrganizationSettingTeamNavStepNames,
  OrganizationSettingDeleteStepNames,
};
