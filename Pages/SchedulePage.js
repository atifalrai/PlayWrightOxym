export class SchedulePage {
  static AnnouncementsNav() {
    return global.page.getByText('Announcements');
  }
  static ScheduleTabIcon() {
    return global.page.locator('#tab-button-schedule').getByRole('img');
  }
  static ScheduleBannerHeading() {
    return global.page.locator('app-schedule').getByRole('button', { name: 'Cinnova Testing' });
  }
  static SwitchedTeamNameHeading() {
    return global.page.getByRole('banner').getByText('Cinnova Testing');
  }
  static PollsTab() {
    return global.page.locator('span').filter({ hasText: 'Polls' });
  }
  static AddEventButton() {
    return global.page.getByLabel('Add event');
  }
  static AddNewOption() {
    return global.page.getByText('Add New');
  }
  static EventTypeOverlay_Identifier = '[id^="ion-overlay-"]';
  static AddNewSheetHeading_Text = "Add New";
  static EventTypeOption(label) {
    return global.page.locator(this.EventTypeOverlay_Identifier).filter({ hasText: this.AddNewSheetHeading_Text }).getByText(label, { exact: true });
  }

  static GameEventTypeOption() {
    return this.EventTypeOption('Game');
  }
  static PracticeEventTypeOption() {
    return this.EventTypeOption('Practice');
  }
  static MeetingEventTypeOption() {
    return this.EventTypeOption('Meeting');
  }
  static MeetingEventCreatedHeading() {
    return global.page.getByText('Meeting Event Created', { exact: true });
  }
  static AddPlansOption() {
    return global.page.getByText('Add Plans');
  }
  static PracticeEventCreatedHeading() {
    return global.page.getByText('Practice Event Created', { exact: true });
  }
  static PracticePlansDetailText() {
    return global.page.locator('app-event-detail').getByText('Practice Plans');
  }
  static TitleLocationStepHeading() {
    return global.page.getByText('Title & Location');
  }
  static EventTitleInput() {
    return global.page.locator('#ion-input-0');
  }
  static EventVenueInput() {
    return global.page.locator('#ion-input-1');
  }
  static SearchForAddressOption() {
    return global.page.getByText('Search for an address');
  }
  static AddressSearchField() {
    return global.page.getByLabel('search text');
  }
  static CountryResultHeading(countryName) {
    return global.page.getByRole('heading', { name: countryName, exact: true });
  }
  static NextButton() {
    return global.page.getByRole('button', { name: 'Next' });
  }
  static OpponentSelectionHeading() {
    return global.page.getByText('Opponent Selection');
  }
  static OpponentInformationHeading() {
    return global.page.getByText('Opponent Information');
  }
  static OpponentTeamNameInput() {
    return global.page.locator('#ion-input-3');
  }
  static CoachNameInput() {
    return global.page.locator('#ion-input-4');
  }
  static CountryCodeDropdownButton() {
    return global.page.getByRole('button', { name: '+' });
  }
  static CountryCodeOption(name) {
    return global.page.getByRole('option', { name });
  }
  static PhoneNumberField() {
    return global.page.getByLabel('Phone Number');
  }
  static OpponentEmailInput() {
    return global.page.locator('#ion-input-5');
  }
  static ProposalsHeading() {
    return global.page.getByRole('heading', { name: 'Proposals' });
  }
  static NoButton() {
    return global.page.getByRole('button', { name: 'No' });
  }
  static DateTimeBannerHeading() {
    return global.page.getByRole('banner').getByText('Date & Time');
  }
  static SelectDateButton() {
    return global.page.getByRole('button', { name: 'Select date' });
  }
  static DateOption(label) {
    return global.page.getByLabel(label);
  }
  static CalendarDayButton(day, month, year) {
    return global.page.locator(`button.calendar-day[data-day="${day}"][data-month="${month}"][data-year="${year}"]:not([disabled])`).last();
  }
  static SelectedCalendarDayButton(day, month, year) {
    return global.page.locator(`button.calendar-day[data-day="${day}"][data-month="${month}"][data-year="${year}"][aria-selected="true"]`).last();
  }
  static DoneButton() {
    return global.page.getByRole('button', { name: 'Done' });
  }
  static TimeOptionButton(label) {
    // `label` only carries the meridiem (e.g. Consts.ScheduleStartTimeButtonText = ":00 PM");
    // the button's actual displayed time is dynamic ("6:52 PM"), so match any time in that
    // meridiem instead of the literal ":00" minute value, which only matches on the hour.
    const meridiem = /AM|PM/i.exec(label)?.[0] ?? '';
    return global.page.getByRole('button', { name: new RegExp(`^\\d{1,2}:\\d{2}\\s?${meridiem}$`, 'i') });
  }
  static SelectStartTimeOption() {
    return global.page.getByText('Select Start Time');
  }
  static RSVPTimeButton() {
    // The RSVP time button's default label is whatever time it currently is
    // (e.g. "6:52 PM"), not a fixed value, so match any time-formatted button
    // instead of a hardcoded string.
    return global.page.getByRole('button', { name: /^\d{1,2}:\d{2}\s?(AM|PM)$/i });
  }
  static DurationInput() {
    return global.page.locator('#ion-input-6');
  }
  static PracticePlanDurationInput() {  
    return global.page.locator('#ion-input-2');
  }
  static TimeButtonByText(text) {
    // Same fix as TimeOptionButton: `text` only carries the meridiem (e.g. ":00 AM"), and the
    // button's real label is a dynamic time, so match on meridiem rather than the literal minutes.
    const meridiem = /AM|PM/i.exec(text)?.[0] ?? '';
    return global.page.locator('button').filter({ hasText: new RegExp(`\\d{1,2}:\\d{2}\\s?${meridiem}`, 'i') });
  }
  static NotifyParticipantsToggle() {
    return global.page.locator('div:nth-child(7) > ion-toggle > .toggle-wrapper > .native-wrapper > .toggle-icon > .toggle-icon-wrapper > .toggle-inner');
  }
  static PracticePlanNotifyParticipantsToggle() {
    return global.page.locator('div:nth-child(4) > div > ion-toggle > .toggle-wrapper > .native-wrapper > .toggle-icon > .toggle-icon-wrapper > .toggle-inner');
  }
  static PracticePlanNotifyParticipantsToggleEnabled() {
    return global.page.locator('div:nth-child(4) > div > ion-toggle > .toggle-wrapper > .native-wrapper > .toggle-icon');
  }
    static MeetingNotifyParticipantsToggle() {
    return global.page.locator('div:nth-child(6) > ion-toggle > .toggle-wrapper > .native-wrapper > .toggle-icon > .toggle-icon-wrapper');
  }
  static MeetingNotifyParticipantsToggleEnabled() {
    return global.page.locator('div:nth-child(6) > ion-toggle > .toggle-wrapper > .native-wrapper > .toggle-icon');
  }
  static RSVPSettingsBannerHeading() {
    return global.page.getByRole('banner').getByText('RSVP Settings');
  }
  static RSVPToggleSwitch() {
    return global.page.getByRole('switch').locator('div').nth(3);
  }
  static RSVPByLabel() {
    return global.page.getByText('RSVP By');
  }
  static RSVPByDateButton(label) {
    // `label` is a best-effort guess (e.g. "today" or "day after tomorrow") at what date is
    // currently configured, but the real value can shift underneath it — e.g. editing the
    // event's own date earlier in the same flow can push the RSVP-by date to a different day
    // than whatever was set at creation. Match on the date's format ("Sat, Sep 19", optionally
    // followed by more text such as a year) instead of a precomputed value, and don't anchor
    // the match so it stays as forgiving as the plain-string match it replaced.
    return global.page.getByRole('button', { name: /[A-Za-z]{3},\s*[A-Za-z]{3}\s+\d{1,2}/ });
  }
  static LinksAttachmentsStepHeading() {
    return global.page.getByText('Links & Attachments');
  }
  static AttachmentsHeadingDetailPage() {
    return global.page.getByText('Attachments');
  }
  static LinksHeadingDetailPage() {
    return global.page.getByText('Links');
  }
  static AttachmentUploadInput() {
    return global.page.locator('form').locator('input[type="file"]');
  }
  static FileUploadedToast() {
    return global.page.getByText('File uploaded successfully');
  }
  static AddLinksOption() {
    return global.page.getByText('Add Links');
  }
  static AddLinkRowButton() {
    return global.page.locator('div').filter({ hasText: /^Link URLAdd$/ }).locator('span');
  }
  static LinkUrlInput() {
    return global.page.locator('#ion-input-7');
  }
  static PracticePlanLinkUrlInput() {
    return global.page.locator('#ion-input-3');
  }
  static PracticePlanLinkUrlInput() {
    return global.page.locator('#ion-input-3');
  }
  static AddedLinkExpandIcon() {
    return global.page.locator('.mt-4 > div > div > .w-8');
  }
  static AddedLinkText(url) {
    return global.page.getByText(url);
  }
  static AddVideoLinksOption() {
    return global.page.getByText('Add Video Links');
  }
  static VideoLinkInput() {
    return global.page.locator('#ion-input-8');
  }
  static PracticePlanVideoLinkInput() {
    return global.page.locator('#ion-input-4');
  }
  static AddVideoLinkButton() {
    return global.page.locator('div').filter({ hasText: /^Add$/ }).locator('span');
  }
  static PracticePlanAddVideoLinkButton() {
    return global.page.getByRole('button', { name: 'Add link' });
  }
  static VideoLinkAddedToast() {
    return global.page.getByText('Video link added successfully');
  }
  static AddedVideoLinkAnchor(urlPattern) {
    return global.page.getByRole('link', { name: urlPattern });
  }
  static NotesLabel() {
    return global.page.getByText('Notes', { exact: true });
  }
  static NotesTextarea() {
    return global.page.locator('#ion-textarea-0');
  }
  static PrivateNotesLabel() {
    return global.page.getByText('Private Notes (Coaches only)');
  }
  static PrivateNotesTextarea() {
    return global.page.locator('#ion-textarea-1');
  }
  static AddParticipantsHeading() {
    return global.page.getByText('Add Participants');
  }
  static SelectAllButton() {
    return global.page.getByRole('button', { name: 'Select All' });
  }
  static ParticipantsSelectedText() {
    return global.page.getByText('selected');
  }
  static CreatePublicEventButton() {
    return global.page.getByRole('button', { name: 'Create Public Event' });
  }
  static EventCreatedToast() {
    return global.page.getByText('Event created successfully!');
  }
  // Rendered as a plain <div>, not a semantic heading / role="heading" element,
  // so match on its text instead of getByRole('heading', ...) which never resolves.
  static GameEventCreatedHeading() {
    return global.page.getByText('Game Event Created', { exact: true });
  }
  static EventDetailBannerTitle(title) {
    return global.page.getByRole('banner').getByText(title);
  }
  static EventDateText(label) {
    return global.page.getByText(label);
  }
  static EventTimeRangeText(label) {
    return global.page.locator('span').filter({ hasText: label });
  }
  static ArriveByText(label) {
    return global.page.getByText(label);
  }
  static RSVPByText(label) {
    return global.page.getByText(label);
  }
  static EventVenueText() {
    return global.page.getByText('venue');
  }
  static EventCountryText() {
    return global.page.getByText('United States');
  }
  static OpponentTeamNameText() {
    return global.page.getByText('test opponent name');
  }
  static AttachmentFileNameText() {
    return global.page.getByText('juke-team-import-template.xlsx');
  }
  static AttachmentFileNameTextonDetailPage() {
    return global.page.getByText('Juke.xlsx');
  }
  static EventNotesText() {
    return global.page.getByText('test notes', { exact: true });
  }
  static EventPrivateNotesText() {
    return global.page.getByText('private notes', { exact: true });
  }
  static EventOptionsMenuButton() {
    return global.page.locator('button').filter({ has: global.page.locator('circle[cy="5"][fill="white"]') });
  }
  static DeleteOptionButton() {
    return global.page.getByRole('button', { name: 'Delete' });
  }
  static ConfirmDeleteEventButton() {
    return global.page.getByLabel('Delete Event').getByRole('button', { name: 'Delete' });
  }
  static EventDeletedToast() {
    return global.page.getByText('Event deleted successfully');
  }
  static NoEventsScheduledText() {
    return global.page.getByText('No events scheduled for this');
  }
  // Other Schedule Module test cases create their own events on the same date,
  // so the list is never fully empty after one test deletes its own event.
  // Assert the deleted event's own title is gone instead of the empty-state text.
  static DeletedEventTitleText(title) {
    return global.page.getByText(title, { exact: true });
  }
  static EditEventTitleInput() {
    return global.page.locator('#ion-input-9');
  }
  static EditEventVenueInput() {
    return global.page.locator('#ion-input-10');
  }
  static EditOpponentTeamNameInput() {
    return global.page.locator('#ion-input-12');
  }
  static EditCoachNameInput() {
    return global.page.locator('#ion-input-13');
  }
  static EditPhoneNumberField() {
    return global.page.getByRole('textbox', { name: 'Phone Number' });
  }
  static EditOpponentEmailInput() {
    return global.page.locator('#ion-input-14');
  }
  static EditDurationInput() {
    return global.page.locator('#ion-input-15');
  }
  static EditLinkUrlInput() {
    return global.page.locator('#ion-input-16');
  }
  static EditVideoLinkInput() {
    return global.page.locator('#ion-input-17');
  }
  static PracticeEditTitleInput() {
    return global.page.locator('#ion-input-5');
  }
  static PracticeEditVenueInput() {
    return global.page.locator('#ion-input-6');
  }
  static PracticeEditDurationInput() {
    return global.page.locator('#ion-input-7');
  }
  static PracticeEditLinkUrlInput() {
    return global.page.locator('#ion-input-8');
  }
  static PracticeEditVideoLinkInput() {
    return global.page.locator('#ion-input-9');
  }
  static MeetingEditTitleInput() {
    return global.page.locator('#ion-input-5');
  }
  static MeetingEditVenueInput() {
    return global.page.locator('#ion-input-6');
  }
  static MeetingEditDurationInput() {
    return global.page.locator('#ion-input-7');
  }
  static MeetingEditLinkUrlInput() {
    return global.page.locator('#ion-input-8');
  }
  static MeetingEditVideoLinkInput() {
    return global.page.locator('#ion-input-9');
  }
  static EditNotesTextarea(label) {
    return global.page.getByLabel(label);
  }
  static EditPrivateNotesTextarea(label) {
    return global.page.getByLabel(label);
  }
  static UpdatedAttachmentFileNameTextonDetailPage() {
    return global.page.getByText('juke-team-import-template-updated.xlsx');
  }
  static EditSelectDateButton(label) {
    return global.page.getByRole('button', { name: label });
  }
  static EditOptionButton() {
    return global.page.getByRole('button', { name: 'Edit' });
  }
  static UpdatePublicEventButton() {
    return global.page.getByRole('button', { name: 'Submit' });
  }
  static EventUpdatedToast() {
    return global.page.getByText('Event updated successfully');
  }
  static EventDetailVenueText(venue) {
    return global.page.getByText(venue);
  }
  static UpdatedAttachmentFileNameText() {
    return global.page.getByText('File 2');
  }
  static FirstUpdatedAttachmentFileNameText() {
    return global.page.getByText('File 1');
  }
  static EventDetailOpponentText(name) {
    return global.page.getByText('updated opponent name');
  }
  static EventDetailNotesText(notes) {
    return global.page.getByText(notes, { exact: true });
  }
}
