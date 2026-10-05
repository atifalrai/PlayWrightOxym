export class Consts {

    static Url = "https://uat.juke.team";
    static LoginUrl = "https://uat.juke.team/auth/login";
    static Email = "oxymtesting@gmail.com";
    static PasswordText = "Cinnova@123";
    static Sport = "Soccer";
    /** Team every spec works against; selected from the Team Pages overlay. */
    static TeamName = "Cinnova Testing";
    static NoteTitle = "test first note";
    static NoteTitleUpdated = "test first note update";
    static NoteBody = "note for the first time";
    static NoteBodyUpdated = "note for the first time update";
    static NoteCreatedMessage = "Note test first note created successfully!";
    static NoteUpdatedMessage = "Note test first note update";
    static NoteDeletedMessage = "Note deleted successfully!";

    static WalletInvoicesUrl = "https://uat.juke.team/tabs/wallet/invoices";
    static PaymentRequestTitle = "Testing Payment";
    static PaymentAmount = "100";
    static PaymentDescription = "This is added with automation scrypt";
    static PaymentDueDateDaysAhead = 7;
    static PaymentTeamButton = "Cinnova Testing";
    static PaymentRequestCreatedMessage = "Payment request created";

    static WalletTransactionsUrl = "https://uat.juke.team/tabs/wallet/transactions";
    static TransferAmount = "20";
    static TransferTeamMember = "Cinnova Testing";
    static TransferOrgAdmin = "Player";
    static TransferTestCatcher = "Test Catcher";
    static TransferCompletedMessage = "Transfer completed successfully";
    static TransactionsHeading_Text = "Transactions";
    static PeopleTransfer_Text = "People Transfer";
    static TransferInitiatedMessage = "Transfer initiated";
    static BankTransferInstantAmount = "23";
    static BankTransferStandardAmount = "12";
    static ReminderSentSuccessMessagePattern = /Successfully sent \d+ reminders?/;
    static UnpaidSummary_TextPattern = /\d+ Unpaid \$/;
    static ViewTransactionsButton_RoleName = "View Transactions";
    static StandardTransfer_Text = "Standard Transfer";
    static InstantTransfer_Text = "Instant Transfer";
    static CollectedAmount_TextPattern = /\+\s*\$[\d,]+\.\d{2}\s+Collected/;
    static TransferredAmount_TextPattern = /-\s*\$[\d,]+\.\d{2}\s+Transferred/;
    static TransactionViewMonthFilter = "Apr";

    static getTransactionViewCurrentYear() {
        return new Date().getFullYear().toString();
    }

    static getTransactionViewPreviousYear() {
        return (new Date().getFullYear() - 1).toString();
    }

     // Schedule Module - Game Event
    static ScheduleEventTitle = "Test Tiltle";
    static ScheduleVenue = "venue";
    static ScheduleVenueSearchText = "usa";
    static ScheduleVenueCountry = "USA";
    static ScheduleVenueCountryDisplay = "United States";
    static OpponentTeamName = "test opponent name";
    static OpponentCoachName = "coach name";
    static OpponentCountryCode = "United States (+1)";
    static OpponentPhoneNumber = "(222) 222-2222";
    static OpponentEmail = "testadress@gmail.com";
    static ScheduleEventDuration = "20";
    static ScheduleArrivalTimeButtonText = ":00 AM";
    static ScheduleStartTimeButtonText = ":00 PM";
    static ScheduleAttachmentFileName = "juke-team-import-template.xlsx";
    static ScheduleAttachmentFilePath = "data/juke-team-import-template.xlsx";
    static ScheduleLinkUrl = "https://example.com";
    static ScheduleVideoLinkUrl = "https://youtube.com";
    static ScheduleEventNotes = "test notes";
    static ScheduleEventPrivateNotes = "private notes";
    static FileUploadedMessage = "File uploaded successfully";
    static VideoLinkAddedMessage = "Video link added successfully";
    static EventCreatedMessage = "Event created successfully!";
    static GameEventCreatedHeading = "Game Event Created";
    static EventDeletedMessage = "Event deleted successfully!";
    static NoEventsScheduledMessage = "No events scheduled for this";
    static ScheduleEventTitleUpdated = "Test Title Updated";
    static ScheduleVenueUpdated = "venue updated";
    static OpponentTeamNameUpdated = "updated opponent name";
    static OpponentCoachNameUpdated = "updated coach name";
    static OpponentPhoneNumberUpdated = "(333) 333-3333";
    static OpponentEmailUpdated = "updatedaddress@gmail.com";
    static ScheduleEventDurationUpdated = "30";
    static ScheduleAttachmentFilePathUpdated = "data/juke-team-import-template-updated.xlsx";
    static ScheduleAttachmentFileNameUpdatedDisplay = "juke-team-import-template-updated.xlsx";
    static ScheduleLinkUrlUpdated = "https://updatedexample.com";
    static ScheduleVideoLinkUrlUpdated = "https://vimeo.com";
    static ScheduleEventNotesUpdated = "updated notes";
    static ScheduleEventPrivateNotesUpdated = "updated private notes";
    static EventUpdatedMessage = "Event updated successfully";

    // Files Module
    static FolderTitle = "Automation Folder";
    static FileTitle = "Automation Testing";
    static FilesFolderCreatedMessage = "Folder Automation Folder created successfully!";
    static FilesFolderCreatedMessagePattern = /folder.*created successfully/i;
    static FilesUploadFileName = "Automation Testing.txt";
    static FilesUploadFilePath = "data/Automation Testing.txt";
    static FilesUploadFileDisplayName = "Automation Testing";
    static FilesUploadFileSearchText = "automation testing";
    static FilesFileUploadedMessage = "file uploaded successfully!";
    static FilesFileUploadedMessagePattern = /file uploaded successfully/i;
    static FilesFileDeletedMessagePattern = /deleted successfully/i;
    static FilesFolderDeletedMessagePattern = /folder.*deleted successfully/i;

    // Practice Plan Module
    static PracticePlanTitle = "Test Practice Plan";
    static PracticePlanFolderTitle = "Test Practice Folder";
    static UpdatedPracticePlanTitle = "Updated Practice Plan";
    static UpdatedPracticePlanFolderTitle = "Updated Practice Plan Folder";
    static PracticePlanTitle2 = "Second Practice Plan";
    static PracticePlanComment = "test comment";
    static UpdatedPracticePlanComment = "updated comment";

    // Drill Management Module
    static DrillCategoryTitle = "Test Automation Category";
    static DrillTitle = "Drill Title";
    static DrillDescription = "Drill Description";
    static DrillDuration = "30";
    static UpdatedDrillTitle = "Updated Drill Title";
    static UpdatedDrillDescription = "Updated Drill Description";
    static UpdatedDrillDuration = "60";
    static UpdatedDrillCategoryTitle = "Updated Test Category";
    static DrillTitle2 = "Another Drill";
    static UpdatedDrillNameInPlan = "Updated Drill";
    static UpdatedDrillDurationInPlan = "50";
    static UpdatedDrillDescriptionInPlan = "updated Drill description";
    static PlanSpecificNotes = "Test Practice plan notes";

    // Message Module
    // These must match the exact display names in the current staging environment's
    // "Cinnova Testing" team member list, not what the account names "should" be -
    // the coach account's profile name was overwritten during manual testing.
    static MessageTeamMemberName = "Test loing name of the user to check AdminCoach if this is wokring of not";
    static MessageSecondTeamMemberName = "Player Catcher";
    static MessageGroupConversationName = "Team Coaches";
    static MessageText = "Automation test message";
    static MessageReplyText = "Automation reply message";
    static MessageAttachmentFilePath = Consts.FilesUploadFilePath;
    static MessageCustomGroupName = "Automation Custom Group";
    static MessageCustomGroupDescription = "Group created by automation";
    static MessagePollQuestion = "Is this automated poll working?";
    static MessagePollOption1 = "Yes";
    static MessagePollOption2 = "No";
    static MessagePasswordText = Consts.PasswordText;

    // Account Module
    static AccountFullName = "Oxym Testing";
    static AccountPasswordText = Consts.PasswordText;
    /**
     * Non-OA account used by TC-02: a player that belongs to no organization
     * and owns its own team, so Organization Settings and Billing are hidden.
     * Override per environment with OXYM_NO_ORG_EMAIL / OXYM_NO_ORG_PASSWORD.
     */
    static AccountNoOrgEmail = process.env.OXYM_NO_ORG_EMAIL || "oxymtesting+catcher@gmail.com";
    static AccountNoOrgPassword = process.env.OXYM_NO_ORG_PASSWORD || Consts.PasswordText;

    // Organization Settings Module
    /** The Org Admin's existing organization, reused across read-only checks. */
    static OrganizationName = "Cinnova Testing";
    /**
     * TC-04 renames this organization then renames it back to OrganizationName
     * at the end of the test, since other specs assume "Cinnova Testing" exists.
     */
    static OrganizationNameEdited = "Cinnova Testing Edited";

    static getDisposableOrganizationName() {
        return `Automation Org ${Date.now()}`;
    }

}


