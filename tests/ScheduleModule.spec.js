import { expect } from "@playwright/test";
import { test } from "../fixtures/softAssertFixture.js";
import { BaseTest } from "../Pages/BaseTest.js";
import { Consts } from "../Pages/Consts.js";
import { Strings } from "../Pages/String.js";
import { HomePage } from "../Pages/HomePage.js";
import { SchedulePage } from "../Pages/SchedulePage.js";
import { ControlUtils } from "../Pages/ControlUtils.js";
import { LoginFlow } from "../Flows/LoginFlow.js";
import { ScheduleModuleTestCaseNames } from "../Pages/TestCaseNames.js";
import { AppFlow } from "../Flows/AppFlow.js";

test.beforeEach(async () => {
  await BaseTest.BeforeEach();
});

test.afterEach(async ({}, testInfo) => {
  await BaseTest.AfterEach(testInfo);
});

test.describe("--OXYM-- Schedule Module Test Suite", () => {
  test(`TC-OXYM-SCHED-01: ${ScheduleModuleTestCaseNames["TC-01"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a New Game Event";

    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(SchedulePage.ScheduleTabIcon());
    await softAssert(
      async () => expect(SchedulePage.ScheduleBannerHeading()).toBeVisible(),
      Strings.MessagePassScheduleTabOpened,
      Strings.MessageFailScheduleTabOpened
    );
    await ControlUtils.Click(SchedulePage.AddEventButton());
    await ControlUtils.Click(SchedulePage.AddNewOption());
    await ControlUtils.Click(SchedulePage.GameEventTypeOption());
    await softAssert(
      async () => expect(SchedulePage.TitleLocationStepHeading()).toBeVisible(),
      Strings.MessagePassAddEventFormOpened,
      Strings.MessageFailAddEventFormOpened
    );

    testInfo.scenario = "SC-2: Enter Title & Location Details";

    await ControlUtils.Click(SchedulePage.EventTitleInput());
    await ControlUtils.Fill(SchedulePage.EventTitleInput(), Consts.ScheduleEventTitle);
    await softAssert(
      async () => expect(SchedulePage.EventTitleInput()).toHaveValue(Consts.ScheduleEventTitle),
      Strings.MessagePassEventTitleEntered,
      Strings.MessageFailEventTitleEntered
    );
    await ControlUtils.Click(SchedulePage.EventVenueInput());
    await ControlUtils.Fill(SchedulePage.EventVenueInput(), Consts.ScheduleVenue);
    await softAssert(
      async () => expect(SchedulePage.EventVenueInput()).toHaveValue(Consts.ScheduleVenue),
      Strings.MessagePassEventVenueEntered,
      Strings.MessageFailEventVenueEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.OpponentTeamNameInput()).toBeVisible(),
      Strings.MessagePassVenueCountrySelected,
      Strings.MessageFailVenueCountrySelected
    );

    testInfo.scenario = "SC-3: Enter Opponent Details";

    await ControlUtils.Click(SchedulePage.OpponentTeamNameInput());
    await ControlUtils.Fill(SchedulePage.OpponentTeamNameInput(), Consts.OpponentTeamName);
    await softAssert(
      async () => expect(SchedulePage.OpponentTeamNameInput()).toHaveValue(Consts.OpponentTeamName),
      Strings.MessagePassOpponentTeamNameEntered,
      Strings.MessageFailOpponentTeamNameEntered
    );
    await ControlUtils.Click(SchedulePage.CoachNameInput());
    await ControlUtils.Fill(SchedulePage.CoachNameInput(), Consts.OpponentCoachName);
    await softAssert(
      async () => expect(SchedulePage.CoachNameInput()).toHaveValue(Consts.OpponentCoachName),
      Strings.MessagePassCoachNameEntered,
      Strings.MessageFailCoachNameEntered
    );
    await ControlUtils.Click(SchedulePage.CountryCodeDropdownButton());
    await ControlUtils.Click(SchedulePage.CountryCodeOption(Consts.OpponentCountryCode));
    await softAssert(
      async () => expect(SchedulePage.CountryCodeOption(Consts.OpponentCountryCode)).not.toBeVisible(),
      Strings.MessagePassCountryCodeSelected,
      Strings.MessageFailCountryCodeSelected
    );
    await ControlUtils.Click(SchedulePage.PhoneNumberField());
    await ControlUtils.Fill(SchedulePage.PhoneNumberField(), Consts.OpponentPhoneNumber);
    await softAssert(
      async () => expect(SchedulePage.PhoneNumberField()).toHaveValue(Consts.OpponentPhoneNumber),
      Strings.MessagePassPhoneNumberEntered,
      Strings.MessageFailPhoneNumberEntered
    );
    await ControlUtils.Click(SchedulePage.OpponentEmailInput());
    await ControlUtils.Fill(SchedulePage.OpponentEmailInput(), Consts.OpponentEmail);
    await softAssert(
      async () => expect(SchedulePage.OpponentEmailInput()).toHaveValue(Consts.OpponentEmail),
      Strings.MessagePassOpponentEmailEntered,
      Strings.MessageFailOpponentEmailEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.ProposalsHeading()).toBeVisible(),
      Strings.MessagePassProposalsStepOpened,
      Strings.MessageFailProposalsStepOpened
    );
    await ControlUtils.Click(SchedulePage.NoButton());
    await softAssert(
      async () => expect(SchedulePage.ProposalsHeading()).not.toBeVisible(),
      Strings.MessagePassDateTimeStepOpened,
      Strings.MessageFailDateTimeStepOpened
    );

    testInfo.scenario = "SC-4: Enter Date and Time Details";

    const tomorrowDay = AppFlow.GetTomorrowDay();
    const tomorrowMonth = AppFlow.GetTomorrowMonth();
    const tomorrowYear = AppFlow.GetTomorrowYear();
    await ControlUtils.Click(SchedulePage.SelectDateButton());
    await ControlUtils.Click(SchedulePage.CalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear)).toBeVisible(),
      Strings.MessagePassEventDateSelected,
      Strings.MessageFailEventDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.SelectStartTimeOption());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassStartTimeSelected,
      Strings.MessageFailStartTimeSelected
    );
    await ControlUtils.Click(SchedulePage.DurationInput());
    await ControlUtils.Fill(SchedulePage.DurationInput(), Consts.ScheduleEventDuration);
    await softAssert(
      async () => expect(SchedulePage.DurationInput()).toHaveValue(Consts.ScheduleEventDuration),
      Strings.MessagePassDurationEntered,
      Strings.MessageFailDurationEntered
    );
    await ControlUtils.Click(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText)).toBeVisible(),
      Strings.MessagePassArrivalTimeSelected,
      Strings.MessageFailArrivalTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NotifyParticipantsToggle());
    await softAssert(
      async () => expect(SchedulePage.NotifyParticipantsToggle()).toBeVisible(),
      Strings.MessagePassNotifyToggleEnabled,
      Strings.MessageFailNotifyToggleEnabled
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPSettingsBannerHeading()).toBeVisible(),
      Strings.MessagePassRSVPStepOpened,
      Strings.MessageFailRSVPStepOpened
    );

    testInfo.scenario = "SC-5: Configure RSVP Settings";

    await ControlUtils.Click(SchedulePage.RSVPToggleSwitch());
    await softAssert(
      async () => expect(SchedulePage.RSVPToggleSwitch()).toBeEnabled(),
      Strings.MessagePassRSVPToggleEnabled,
      Strings.MessageFailRSVPToggleEnabled
    );
    const rsvpDay = AppFlow.GetDayAfterTomorrowDay();
    const rsvpMonth = AppFlow.GetDayAfterTomorrowMonth();
    const rsvpYear = AppFlow.GetDayAfterTomorrowYear();
    await ControlUtils.WaitBeforeClick(SchedulePage.RSVPByDateButton(AppFlow.GetTodayShortDateLabel()));
    await ControlUtils.WaitBeforeClick(SchedulePage.CalendarDayButton(rsvpDay, rsvpMonth, rsvpYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(rsvpDay, rsvpMonth, rsvpYear)).toBeVisible(),
      Strings.MessagePassRSVPDateSelected,
      Strings.MessageFailRSVPDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.RSVPTimeButton());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPTimeButton()).toBeVisible(),
      Strings.MessagePassRSVPTimeSelected,
      Strings.MessageFailRSVPTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddLinksOption()).toBeVisible(),
      Strings.MessagePassLinksAttachmentsStepOpened,
      Strings.MessageFailLinksAttachmentsStepOpened
    );

    testInfo.scenario = "SC-6: Add Links, Attachments and Notes";

    await ControlUtils.UploadFile(SchedulePage.AttachmentUploadInput(), Consts.ScheduleAttachmentFilePath);
    await softAssert(
      async () => expect(SchedulePage.FileUploadedToast()).toBeVisible(),
      Strings.MessagePassAttachmentUploaded,
      Strings.MessageFailAttachmentUploaded
    );
    await ControlUtils.Click(SchedulePage.AddLinksOption());
    await ControlUtils.Fill(SchedulePage.LinkUrlInput(), Consts.ScheduleLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.LinkUrlInput()).toHaveValue(Consts.ScheduleLinkUrl),
      Strings.MessagePassLinkUrlEntered,
      Strings.MessageFailLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddLinkRowButton());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrl)).toBeVisible(),
      Strings.MessagePassLinkAdded,
      Strings.MessageFailLinkAdded
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinksOption());
    await ControlUtils.Fill(SchedulePage.VideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.VideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassVideoLinkUrlEntered,
      Strings.MessageFailVideoLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinkButton());
    await softAssert(
      async () => expect(SchedulePage.VideoLinkAddedToast()).toBeVisible(),
      Strings.MessagePassVideoLinkAdded,
      Strings.MessageFailVideoLinkAdded
    );
    await ControlUtils.Click(SchedulePage.NotesTextarea());
    await ControlUtils.Fill(SchedulePage.NotesTextarea(), Consts.ScheduleEventNotes);
    await softAssert(
      async () => expect(SchedulePage.NotesTextarea()).toHaveValue(Consts.ScheduleEventNotes),
      Strings.MessagePassNotesEntered,
      Strings.MessageFailNotesEntered
    );
    await ControlUtils.Click(SchedulePage.PrivateNotesTextarea());
    await ControlUtils.Fill(SchedulePage.PrivateNotesTextarea(), Consts.ScheduleEventPrivateNotes);
    await softAssert(
      async () => expect(SchedulePage.PrivateNotesTextarea()).toHaveValue(Consts.ScheduleEventPrivateNotes),
      Strings.MessagePassPrivateNotesEntered,
      Strings.MessageFailPrivateNotesEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddParticipantsHeading()).toBeVisible(),
      Strings.MessagePassParticipantsStepOpened,
      Strings.MessageFailParticipantsStepOpened
    );

    testInfo.scenario = "SC-7: Add Participants and Create Event";

    await ControlUtils.Click(SchedulePage.SelectAllButton());
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassParticipantsSelected,
      Strings.MessageFailParticipantsSelected
    );
    await ControlUtils.Click(SchedulePage.CreatePublicEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventCreatedToast()).toBeVisible(),
      Strings.MessagePassEventCreated,
      Strings.MessageFailEventCreated
    );
    await softAssert(
      async () => expect(SchedulePage.GameEventCreatedHeading()).toBeVisible(),
      Strings.MessagePassGameEventCreatedHeadingVisible,
      Strings.MessageFailGameEventCreatedHeadingVisible
    );

    testInfo.scenario = "SC-8: Verify Event Details";

    await ControlUtils.Click(SchedulePage.NoButton());
    await softAssert(
      async () => expect(SchedulePage.EventDetailBannerTitle(Consts.ScheduleEventTitle)).toBeVisible(),
      Strings.MessagePassEventTitleVisibleInDetail,
      Strings.MessageFailEventTitleVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventVenueText()).toBeVisible(),
      Strings.MessagePassEventVenueVisibleInDetail,
      Strings.MessageFailEventVenueVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.OpponentTeamNameText());
    await softAssert(
      async () => expect(SchedulePage.OpponentTeamNameText()).toBeVisible(),
      Strings.MessagePassOpponentInfoVisibleInDetail,
      Strings.MessageFailOpponentInfoVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.AttachmentsHeadingDetailPage());
    await softAssert(
      async () => expect(SchedulePage.AttachmentFileNameTextonDetailPage()).toBeVisible(),
      Strings.MessagePassAttachmentVisibleInDetail,
      Strings.MessageFailAttachmentVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrl)).toBeVisible(),
      Strings.MessagePassLinksVisibleInDetail,
      Strings.MessageFailLinksVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventNotesText());
    await softAssert(
      async () => expect(SchedulePage.EventNotesText()).toBeVisible(),
      Strings.MessagePassNotesVisibleInDetail,
      Strings.MessageFailNotesVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventPrivateNotesText()).toBeVisible(),
      Strings.MessagePassPrivateNotesVisibleInDetail,
      Strings.MessageFailPrivateNotesVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventOptionsMenuButton());
    await ControlUtils.Click(SchedulePage.DeleteOptionButton());
    await ControlUtils.Click(SchedulePage.ConfirmDeleteEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventDeletedToast()).toBeVisible(),
      Strings.MessagePassEventDeleted,
      Strings.MessageFailEventDeleted
    );
  });

  test(`TC-OXYM-SCHED-02: ${ScheduleModuleTestCaseNames["TC-02"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create Event for Editing";

     await softAssert(
       async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
       (await HomePage.DismissGuideIfPresent())
         ? Strings.MessagePassGuideDismissed
         : Strings.MessagePassGuideNotShown,
       Strings.MessageFailGuideHandling
     );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(SchedulePage.ScheduleTabIcon());
    await softAssert(
      async () => expect(SchedulePage.ScheduleBannerHeading()).toBeVisible(),
      Strings.MessagePassScheduleTabOpened,
      Strings.MessageFailScheduleTabOpened
    );
    await ControlUtils.Click(SchedulePage.AddEventButton());
    await ControlUtils.Click(SchedulePage.AddNewOption());
    await ControlUtils.Click(SchedulePage.GameEventTypeOption());
    await softAssert(
      async () => expect(SchedulePage.TitleLocationStepHeading()).toBeVisible(),
      Strings.MessagePassAddEventFormOpened,
      Strings.MessageFailAddEventFormOpened
    );

    await ControlUtils.Click(SchedulePage.EventTitleInput());
    await ControlUtils.Fill(SchedulePage.EventTitleInput(), Consts.ScheduleEventTitle);
    await softAssert(
      async () => expect(SchedulePage.EventTitleInput()).toHaveValue(Consts.ScheduleEventTitle),
      Strings.MessagePassEventTitleEntered,
      Strings.MessageFailEventTitleEntered
    );
    await ControlUtils.Click(SchedulePage.EventVenueInput());
    await ControlUtils.Fill(SchedulePage.EventVenueInput(), Consts.ScheduleVenue);
    await softAssert(
      async () => expect(SchedulePage.EventVenueInput()).toHaveValue(Consts.ScheduleVenue),
      Strings.MessagePassEventVenueEntered,
      Strings.MessageFailEventVenueEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.OpponentTeamNameInput()).toBeVisible(),
      Strings.MessagePassVenueCountrySelected,
      Strings.MessageFailVenueCountrySelected
    );
    await ControlUtils.Click(SchedulePage.OpponentTeamNameInput());
    await ControlUtils.Fill(SchedulePage.OpponentTeamNameInput(), Consts.OpponentTeamName);
    await softAssert(
      async () => expect(SchedulePage.OpponentTeamNameInput()).toHaveValue(Consts.OpponentTeamName),
      Strings.MessagePassOpponentTeamNameEntered,
      Strings.MessageFailOpponentTeamNameEntered
    );
    await ControlUtils.Click(SchedulePage.CoachNameInput());
    await ControlUtils.Fill(SchedulePage.CoachNameInput(), Consts.OpponentCoachName);
    await softAssert(
      async () => expect(SchedulePage.CoachNameInput()).toHaveValue(Consts.OpponentCoachName),
      Strings.MessagePassCoachNameEntered,
      Strings.MessageFailCoachNameEntered
    );
    await ControlUtils.Click(SchedulePage.CountryCodeDropdownButton());
    await ControlUtils.Click(SchedulePage.CountryCodeOption(Consts.OpponentCountryCode));
    await softAssert(
      async () => expect(SchedulePage.CountryCodeOption(Consts.OpponentCountryCode)).not.toBeVisible(),
      Strings.MessagePassCountryCodeSelected,
      Strings.MessageFailCountryCodeSelected
    );
    await ControlUtils.Click(SchedulePage.PhoneNumberField());
    await ControlUtils.Fill(SchedulePage.PhoneNumberField(), Consts.OpponentPhoneNumber);
    await softAssert(
      async () => expect(SchedulePage.PhoneNumberField()).toHaveValue(Consts.OpponentPhoneNumber),
      Strings.MessagePassPhoneNumberEntered,
      Strings.MessageFailPhoneNumberEntered
    );
    await ControlUtils.Click(SchedulePage.OpponentEmailInput());
    await ControlUtils.Fill(SchedulePage.OpponentEmailInput(), Consts.OpponentEmail);
    await softAssert(
      async () => expect(SchedulePage.OpponentEmailInput()).toHaveValue(Consts.OpponentEmail),
      Strings.MessagePassOpponentEmailEntered,
      Strings.MessageFailOpponentEmailEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.ProposalsHeading()).toBeVisible(),
      Strings.MessagePassProposalsStepOpened,
      Strings.MessageFailProposalsStepOpened
    );
    await ControlUtils.Click(SchedulePage.NoButton());
    await softAssert(
      async () => expect(SchedulePage.ProposalsHeading()).not.toBeVisible(),
      Strings.MessagePassDateTimeStepOpened,
      Strings.MessageFailDateTimeStepOpened
    );
    const tomorrowDay = AppFlow.GetTomorrowDay();
    const tomorrowMonth = AppFlow.GetTomorrowMonth();
    const tomorrowYear = AppFlow.GetTomorrowYear();
    await ControlUtils.Click(SchedulePage.SelectDateButton());
    await ControlUtils.Click(SchedulePage.CalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear)).toBeVisible(),
      Strings.MessagePassEventDateSelected,
      Strings.MessageFailEventDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.SelectStartTimeOption());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassStartTimeSelected,
      Strings.MessageFailStartTimeSelected
    );
    await ControlUtils.Click(SchedulePage.DurationInput());
    await ControlUtils.Fill(SchedulePage.DurationInput(), Consts.ScheduleEventDuration);
    await softAssert(
      async () => expect(SchedulePage.DurationInput()).toHaveValue(Consts.ScheduleEventDuration),
      Strings.MessagePassDurationEntered,
      Strings.MessageFailDurationEntered
    );
    await ControlUtils.Click(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText)).toBeVisible(),
      Strings.MessagePassArrivalTimeSelected,
      Strings.MessageFailArrivalTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NotifyParticipantsToggle());
    await softAssert(
      async () => expect(SchedulePage.NotifyParticipantsToggle()).toBeVisible(),
      Strings.MessagePassNotifyToggleEnabled,
      Strings.MessageFailNotifyToggleEnabled
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPSettingsBannerHeading()).toBeVisible(),
      Strings.MessagePassRSVPStepOpened,
      Strings.MessageFailRSVPStepOpened
    );

    await ControlUtils.Click(SchedulePage.RSVPToggleSwitch());
    await softAssert(
      async () => expect(SchedulePage.RSVPToggleSwitch()).toBeEnabled(),
      Strings.MessagePassRSVPToggleEnabled,
      Strings.MessageFailRSVPToggleEnabled
    );
    const rsvpDay = AppFlow.GetDayAfterTomorrowDay();
    const rsvpMonth = AppFlow.GetDayAfterTomorrowMonth();
    const rsvpYear = AppFlow.GetDayAfterTomorrowYear();
    await ControlUtils.Click(SchedulePage.RSVPByDateButton(AppFlow.GetTodayShortDateLabel()));
    await ControlUtils.WaitBeforeClick(SchedulePage.CalendarDayButton(rsvpDay, rsvpMonth, rsvpYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(rsvpDay, rsvpMonth, rsvpYear)).toBeVisible(),
      Strings.MessagePassRSVPDateSelected,
      Strings.MessageFailRSVPDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.RSVPTimeButton());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPTimeButton()).toBeVisible(),
      Strings.MessagePassRSVPTimeSelected,
      Strings.MessageFailRSVPTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddLinksOption()).toBeVisible(),
      Strings.MessagePassLinksAttachmentsStepOpened,
      Strings.MessageFailLinksAttachmentsStepOpened
    );

    await ControlUtils.UploadFile(SchedulePage.AttachmentUploadInput(), Consts.ScheduleAttachmentFilePath);
    await softAssert(
      async () => expect(SchedulePage.FileUploadedToast()).toBeVisible(),
      Strings.MessagePassAttachmentUploaded,
      Strings.MessageFailAttachmentUploaded
    );
    await ControlUtils.Click(SchedulePage.AddLinksOption());
    await ControlUtils.Fill(SchedulePage.LinkUrlInput(), Consts.ScheduleLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.LinkUrlInput()).toHaveValue(Consts.ScheduleLinkUrl),
      Strings.MessagePassLinkUrlEntered,
      Strings.MessageFailLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddLinkRowButton());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrl)).toBeVisible(),
      Strings.MessagePassLinkAdded,
      Strings.MessageFailLinkAdded
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinksOption());
    await ControlUtils.Fill(SchedulePage.VideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.VideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassVideoLinkUrlEntered,
      Strings.MessageFailVideoLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinkButton());
    await softAssert(
      async () => expect(SchedulePage.VideoLinkAddedToast()).toBeVisible(),
      Strings.MessagePassVideoLinkAdded,
      Strings.MessageFailVideoLinkAdded
    );
    await ControlUtils.Click(SchedulePage.NotesTextarea());
    await ControlUtils.Fill(SchedulePage.NotesTextarea(), Consts.ScheduleEventNotes);
    await softAssert(
      async () => expect(SchedulePage.NotesTextarea()).toHaveValue(Consts.ScheduleEventNotes),
      Strings.MessagePassNotesEntered,
      Strings.MessageFailNotesEntered
    );
    await ControlUtils.Click(SchedulePage.PrivateNotesTextarea());
    await ControlUtils.Fill(SchedulePage.PrivateNotesTextarea(), Consts.ScheduleEventPrivateNotes);
    await softAssert(
      async () => expect(SchedulePage.PrivateNotesTextarea()).toHaveValue(Consts.ScheduleEventPrivateNotes),
      Strings.MessagePassPrivateNotesEntered,
      Strings.MessageFailPrivateNotesEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddParticipantsHeading()).toBeVisible(),
      Strings.MessagePassParticipantsStepOpened,
      Strings.MessageFailParticipantsStepOpened
    );

    await ControlUtils.Click(SchedulePage.SelectAllButton());
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassParticipantsSelected,
      Strings.MessageFailParticipantsSelected
    );
    await ControlUtils.Click(SchedulePage.CreatePublicEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventCreatedToast()).toBeVisible(),
      Strings.MessagePassEventCreated,
      Strings.MessageFailEventCreated
    );
    await softAssert(
      async () => expect(SchedulePage.GameEventCreatedHeading()).toBeVisible(),
      Strings.MessagePassGameEventCreatedHeadingVisible,
      Strings.MessageFailGameEventCreatedHeadingVisible
    );
    await ControlUtils.Click(SchedulePage.NoButton());
    await ControlUtils.Click(SchedulePage.EventOptionsMenuButton());
    await ControlUtils.Click(SchedulePage.EditOptionButton());

    testInfo.scenario = "SC-2: Edit Title & Location Details";
    await softAssert(
      async () => expect(SchedulePage.TitleLocationStepHeading()).toBeVisible(),
      Strings.MessagePassEditEventFormOpened,
      Strings.MessageFailEditEventFormOpened
    );
    await ControlUtils.Click(SchedulePage.EditEventTitleInput());
    await ControlUtils.Fill(SchedulePage.EditEventTitleInput(), Consts.ScheduleEventTitleUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditEventTitleInput()).toHaveValue(Consts.ScheduleEventTitleUpdated),
      Strings.MessagePassEventTitleUpdated,
      Strings.MessageFailEventTitleUpdated
    );
    await ControlUtils.Click(SchedulePage.EditEventVenueInput());
    await ControlUtils.Fill(SchedulePage.EditEventVenueInput(), Consts.ScheduleVenueUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditEventVenueInput()).toHaveValue(Consts.ScheduleVenueUpdated),
      Strings.MessagePassEventVenueUpdated,
      Strings.MessageFailEventVenueUpdated
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.EditOpponentTeamNameInput()).toBeVisible(),
      Strings.MessagePassVenueCountrySelected,
      Strings.MessageFailVenueCountrySelected
    );

    testInfo.scenario = "SC-3: Edit Opponent Details";
    await ControlUtils.Click(SchedulePage.EditOpponentTeamNameInput());
    await ControlUtils.Fill(SchedulePage.EditOpponentTeamNameInput(), Consts.OpponentTeamNameUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditOpponentTeamNameInput()).toHaveValue(Consts.OpponentTeamNameUpdated),
      Strings.MessagePassOpponentTeamNameUpdated,
      Strings.MessageFailOpponentTeamNameUpdated
    );
    await ControlUtils.Click(SchedulePage.EditCoachNameInput());
    await ControlUtils.Fill(SchedulePage.EditCoachNameInput(), Consts.OpponentCoachNameUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditCoachNameInput()).toHaveValue(Consts.OpponentCoachNameUpdated),
      Strings.MessagePassCoachNameUpdated,
      Strings.MessageFailCoachNameUpdated
    );
    await ControlUtils.Click(SchedulePage.EditPhoneNumberField());
    await ControlUtils.Fill(SchedulePage.EditPhoneNumberField(), Consts.OpponentPhoneNumberUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditPhoneNumberField()).toHaveValue(Consts.OpponentPhoneNumberUpdated),
      Strings.MessagePassPhoneNumberUpdated,
      Strings.MessageFailPhoneNumberUpdated
    );
    await ControlUtils.Click(SchedulePage.EditOpponentEmailInput());
    await ControlUtils.Fill(SchedulePage.EditOpponentEmailInput(), Consts.OpponentEmailUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditOpponentEmailInput()).toHaveValue(Consts.OpponentEmailUpdated),
      Strings.MessagePassOpponentEmailUpdated,
      Strings.MessageFailOpponentEmailUpdated
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.EditDurationInput()).toBeVisible(),
      Strings.MessagePassDateandTimeStepOpened,
      Strings.MessageFailDateandTimeStepOpened
    );
   

    testInfo.scenario = "SC-4: Edit Date & Time Details";
    const editEventDay = AppFlow.GetDayAfterTomorrowDay();
    const editEventMonth = AppFlow.GetDayAfterTomorrowMonth();
    const editEventYear = AppFlow.GetDayAfterTomorrowYear();
    await ControlUtils.Click(SchedulePage.EditSelectDateButton(AppFlow.GetTomorrowShortDateLabel()));
    await ControlUtils.Click(SchedulePage.CalendarDayButton(editEventDay, editEventMonth, editEventYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(editEventDay, editEventMonth, editEventYear)).toBeVisible(),
      Strings.MessagePassEditEventDateSelected,
      Strings.MessageFailEditEventDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.SelectStartTimeOption());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassStartTimeSelected,
      Strings.MessageFailStartTimeSelected
    );
    await ControlUtils.Click(SchedulePage.EditDurationInput());
    await ControlUtils.Fill(SchedulePage.EditDurationInput(), Consts.ScheduleEventDurationUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditDurationInput()).toHaveValue(Consts.ScheduleEventDurationUpdated),
      Strings.MessagePassEditDurationUpdated,
      Strings.MessageFailEditDurationUpdated
    );
    await ControlUtils.Click(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPSettingsBannerHeading()).toBeVisible(),
      Strings.MessagePassRSVPStepOpened,
      Strings.MessageFailRSVPStepOpened
    );

    testInfo.scenario = "SC-5: Edit RSVP Settings";
    const editRsvpDay = AppFlow.GetThreeDaysFromNowDay();
    const editRsvpMonth = AppFlow.GetThreeDaysFromNowMonth();
    const editRsvpYear = AppFlow.GetThreeDaysFromNowYear();
    await ControlUtils.WaitBeforeClick(SchedulePage.RSVPByDateButton(AppFlow.GetDayAfterTomorrowShortDateLabel()));
    await ControlUtils.WaitBeforeClick(SchedulePage.CalendarDayButton(editRsvpDay, editRsvpMonth, editRsvpYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(editRsvpDay, editRsvpMonth, editRsvpYear)).toBeVisible(),
      Strings.MessagePassEditRSVPDateSelected,
      Strings.MessageFailEditRSVPDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.RSVPTimeButton());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPTimeButton()).toBeVisible(),
      Strings.MessagePassRSVPTimeSelected,
      Strings.MessageFailRSVPTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddLinksOption()).toBeVisible(),
      Strings.MessagePassLinksAttachmentsStepOpened,
      Strings.MessageFailLinksAttachmentsStepOpened
    );

    testInfo.scenario = "SC-6: Edit Links, Attachments and Notes";
    await ControlUtils.UploadFile(SchedulePage.AttachmentUploadInput(), Consts.ScheduleAttachmentFilePathUpdated);
    await softAssert(
      async () => expect(SchedulePage.FileUploadedToast()).toBeVisible(),
      Strings.MessagePassAttachmentUploaded,
      Strings.MessageFailAttachmentUploaded
    );
    await ControlUtils.Click(SchedulePage.AddLinksOption());
    await ControlUtils.Fill(SchedulePage.EditLinkUrlInput(), Consts.ScheduleLinkUrlUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditLinkUrlInput()).toHaveValue(Consts.ScheduleLinkUrlUpdated),
      Strings.MessagePassLinkUrlEntered,
      Strings.MessageFailLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddLinkRowButton());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrlUpdated)).toBeVisible(),
      Strings.MessagePassLinkAdded,
      Strings.MessageFailLinkAdded
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinksOption());
    await ControlUtils.Fill(SchedulePage.EditVideoLinkInput(), Consts.ScheduleVideoLinkUrlUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditVideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrlUpdated),
      Strings.MessagePassVideoLinkUrlEntered,
      Strings.MessageFailVideoLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinkButton());
    await softAssert(
      async () => expect(SchedulePage.VideoLinkAddedToast()).toBeVisible(),
      Strings.MessagePassVideoLinkAdded,
      Strings.MessageFailVideoLinkAdded
    );
    await ControlUtils.Click(SchedulePage.EditNotesTextarea(Consts.ScheduleEventNotes));
    await ControlUtils.Fill(SchedulePage.EditNotesTextarea(Consts.ScheduleEventNotes), Consts.ScheduleEventNotesUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditNotesTextarea(Consts.ScheduleEventNotesUpdated)).toHaveValue(Consts.ScheduleEventNotesUpdated),
      Strings.MessagePassEditNotesUpdated,
      Strings.MessageFailEditNotesUpdated
    );
    await ControlUtils.Click(SchedulePage.EditPrivateNotesTextarea(Consts.ScheduleEventPrivateNotes));
    await ControlUtils.Fill(SchedulePage.EditPrivateNotesTextarea(Consts.ScheduleEventPrivateNotes), Consts.ScheduleEventPrivateNotesUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditPrivateNotesTextarea(Consts.ScheduleEventPrivateNotesUpdated)).toHaveValue(Consts.ScheduleEventPrivateNotesUpdated),
      Strings.MessagePassEditPrivateNotesUpdated,
      Strings.MessageFailEditPrivateNotesUpdated
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddParticipantsHeading()).toBeVisible(),
      Strings.MessagePassParticipantsStepOpened,
      Strings.MessageFailParticipantsStepOpened
    );

    testInfo.scenario = "SC-7: Edit Participants and Save Changes";
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassParticipantsSelected,
      Strings.MessageFailParticipantsSelected
    );
    await ControlUtils.Click(SchedulePage.UpdatePublicEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventUpdatedToast()).toBeVisible(),
      Strings.MessagePassEventUpdated,
      Strings.MessageFailEventUpdated
    );
    await softAssert(
      async () => expect(SchedulePage.EventUpdatedToast()).not.toBeVisible(),
      Strings.MessagePassUpdateEventRedirection,
      Strings.MessageFailUpdateEventRedirection
    );

    testInfo.scenario = "SC-8: Verify Updated Event Details";
    await softAssert(
      async () => expect(SchedulePage.EventDetailBannerTitle(Consts.ScheduleEventTitleUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedTitleVisibleInDetail,
      Strings.MessageFailUpdatedTitleVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventDetailVenueText(Consts.ScheduleVenueUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedVenueVisibleInDetail,
      Strings.MessageFailUpdatedVenueVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventDetailOpponentText());
    await softAssert(
      async () => expect(SchedulePage.EventDetailOpponentText(Consts.OpponentTeamNameUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedOpponentVisibleInDetail,
      Strings.MessageFailUpdatedOpponentVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.AttachmentsHeadingDetailPage());
    await softAssert(
      async () => expect(SchedulePage.UpdatedAttachmentFileNameText()).toBeVisible(),
      Strings.MessagePassUpdatedAttachmentVisibleInDetail,
      Strings.MessageFailUpdatedAttachmentVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.LinksHeadingDetailPage());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrlUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedLinkVisibleInDetail,
      Strings.MessageFailUpdatedLinkVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.AddedVideoLinkAnchor(Consts.ScheduleVideoLinkUrlUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedVideoLinkVisibleInDetail,
      Strings.MessageFailUpdatedVideoLinkVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventDetailNotesText((Consts.ScheduleEventNotesUpdated)));
    await softAssert(
      async () => expect(SchedulePage.EventDetailNotesText(Consts.ScheduleEventNotesUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedNotesVisibleInDetail,
      Strings.MessageFailUpdatedNotesVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventDetailNotesText(Consts.ScheduleEventPrivateNotesUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedPrivateNotesVisibleInDetail,
      Strings.MessageFailUpdatedPrivateNotesVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventOptionsMenuButton());
    await ControlUtils.Click(SchedulePage.DeleteOptionButton());
    await ControlUtils.Click(SchedulePage.ConfirmDeleteEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventDeletedToast()).toBeVisible(),
      Strings.MessagePassEventDeleted,
      Strings.MessageFailEventDeleted
    );
    await softAssert(
      async () => expect(SchedulePage.DeletedEventTitleText(Consts.ScheduleEventTitleUpdated)).not.toBeVisible(),
      Strings.MessagePassEventRemovedFromSchedule,
      Strings.MessageFailEventRemovedFromSchedule
    );
  });

  test(`TC-OXYM-SCHED-03: ${ScheduleModuleTestCaseNames["TC-03"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a New Practice Event";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(SchedulePage.ScheduleTabIcon());
    await softAssert(
      async () => expect(SchedulePage.ScheduleBannerHeading()).toBeVisible(),
      Strings.MessagePassScheduleTabOpened,
      Strings.MessageFailScheduleTabOpened
    );
    await ControlUtils.Click(SchedulePage.AddEventButton());
    await ControlUtils.Click(SchedulePage.AddNewOption());
    await ControlUtils.Click(SchedulePage.PracticeEventTypeOption());
    await softAssert(
      async () => expect(SchedulePage.TitleLocationStepHeading()).toBeVisible(),
      Strings.MessagePassPracticeEventFormOpened,
      Strings.MessageFailPracticeEventFormOpened
    );

    testInfo.scenario = "SC-2: Enter Title & Location Details";
    await ControlUtils.Click(SchedulePage.EventTitleInput());
    await ControlUtils.Fill(SchedulePage.EventTitleInput(), Consts.ScheduleEventTitle);
    await softAssert(
      async () => expect(SchedulePage.EventTitleInput()).toHaveValue(Consts.ScheduleEventTitle),
      Strings.MessagePassEventTitleEntered,
      Strings.MessageFailEventTitleEntered
    );
    await ControlUtils.Click(SchedulePage.EventVenueInput());
    await ControlUtils.Fill(SchedulePage.EventVenueInput(), Consts.ScheduleVenue);
    await softAssert(
      async () => expect(SchedulePage.EventVenueInput()).toHaveValue(Consts.ScheduleVenue),
      Strings.MessagePassEventVenueEntered,
      Strings.MessageFailEventVenueEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.SelectDateButton()).toBeVisible(),
      Strings.MessagePassPracticeDateTimeStepOpened,
      Strings.MessageFailPracticeDateTimeStepOpened
    );

    testInfo.scenario = "SC-3: Enter Date & Time Details";
    const tomorrowDay = AppFlow.GetTomorrowDay();
    const tomorrowMonth = AppFlow.GetTomorrowMonth();
    const tomorrowYear = AppFlow.GetTomorrowYear();
    await ControlUtils.Click(SchedulePage.SelectDateButton());
    await ControlUtils.Click(SchedulePage.CalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear)).toBeVisible(),
      Strings.MessagePassEventDateSelected,
      Strings.MessageFailEventDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.SelectStartTimeOption());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassStartTimeSelected,
      Strings.MessageFailStartTimeSelected
    );
    await ControlUtils.Click(SchedulePage.PracticePlanDurationInput());
    await ControlUtils.Fill(SchedulePage.PracticePlanDurationInput(), Consts.ScheduleEventDuration);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanDurationInput()).toHaveValue(Consts.ScheduleEventDuration),
      Strings.MessagePassDurationEntered,
      Strings.MessageFailDurationEntered
    );
    await ControlUtils.Click(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText)).toBeVisible(),
      Strings.MessagePassArrivalTimeSelected,
      Strings.MessageFailArrivalTimeSelected
    );
    await ControlUtils.Click(SchedulePage.PracticePlanNotifyParticipantsToggle());
    await softAssert(
      async () => expect(SchedulePage.PracticePlanNotifyParticipantsToggleEnabled()).toBeVisible(),
      Strings.MessagePassNotifyToggleEnabled,
      Strings.MessageFailNotifyToggleEnabled
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPSettingsBannerHeading()).toBeVisible(),
      Strings.MessagePassRSVPStepOpened,
      Strings.MessageFailRSVPStepOpened
    );

    testInfo.scenario = "SC-4: Configure RSVP Settings";
    await ControlUtils.Click(SchedulePage.RSVPToggleSwitch());
    await softAssert(
      async () => expect(SchedulePage.RSVPToggleSwitch()).toBeEnabled(),
      Strings.MessagePassRSVPToggleEnabled,
      Strings.MessageFailRSVPToggleEnabled
    );
    const rsvpDay = AppFlow.GetDayAfterTomorrowDay();
    const rsvpMonth = AppFlow.GetDayAfterTomorrowMonth();
    const rsvpYear = AppFlow.GetDayAfterTomorrowYear();
    await ControlUtils.WaitBeforeClick(SchedulePage.RSVPByDateButton(AppFlow.GetTodayShortDateLabel()));
    await ControlUtils.WaitBeforeClick(SchedulePage.CalendarDayButton(rsvpDay, rsvpMonth, rsvpYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(rsvpDay, rsvpMonth, rsvpYear)).toBeVisible(),
      Strings.MessagePassRSVPDateSelected,
      Strings.MessageFailRSVPDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassRSVPTimeSelected,
      Strings.MessageFailRSVPTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddLinksOption()).toBeVisible(),
      Strings.MessagePassLinksAttachmentsStepOpened,
      Strings.MessageFailLinksAttachmentsStepOpened
    );

    testInfo.scenario = "SC-5: Add Links, Attachments and Notes";
    await ControlUtils.UploadFile(SchedulePage.AttachmentUploadInput(), Consts.ScheduleAttachmentFilePath);
    await softAssert(
      async () => expect(SchedulePage.FileUploadedToast()).toBeVisible(),
      Strings.MessagePassAttachmentUploaded,
      Strings.MessageFailAttachmentUploaded
    );
    await ControlUtils.Click(SchedulePage.AddLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticePlanLinkUrlInput(), Consts.ScheduleLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanLinkUrlInput()).toHaveValue(Consts.ScheduleLinkUrl),
      Strings.MessagePassLinkUrlEntered,
      Strings.MessageFailLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddLinkRowButton());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrl)).toBeVisible(),
      Strings.MessagePassLinkAdded,
      Strings.MessageFailLinkAdded
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticePlanVideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanVideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassVideoLinkUrlEntered,
      Strings.MessageFailVideoLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.PracticePlanAddVideoLinkButton());
    await softAssert(
      async () => expect(SchedulePage.VideoLinkAddedToast()).toBeVisible(),
      Strings.MessagePassVideoLinkAdded,
      Strings.MessageFailVideoLinkAdded
    );
    await ControlUtils.Click(SchedulePage.NotesTextarea());
    await ControlUtils.Fill(SchedulePage.NotesTextarea(), Consts.ScheduleEventNotes);
    await softAssert(
      async () => expect(SchedulePage.NotesTextarea()).toHaveValue(Consts.ScheduleEventNotes),
      Strings.MessagePassNotesEntered,
      Strings.MessageFailNotesEntered
    );
    await ControlUtils.Click(SchedulePage.PrivateNotesTextarea());
    await ControlUtils.Fill(SchedulePage.PrivateNotesTextarea(), Consts.ScheduleEventPrivateNotes);
    await softAssert(
      async () => expect(SchedulePage.PrivateNotesTextarea()).toHaveValue(Consts.ScheduleEventPrivateNotes),
      Strings.MessagePassPrivateNotesEntered,
      Strings.MessageFailPrivateNotesEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddPlansOption()).toBeVisible(),
      Strings.MessagePassPracticePlanStepOpened,
      Strings.MessageFailPracticePlanStepOpened
    );

    testInfo.scenario = "SC-6: Add Practice Plan";
    await ControlUtils.Click(SchedulePage.AddPlansOption());
    await ControlUtils.Click(SchedulePage.SelectAllButton());
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassPracticePlanSelected,
      Strings.MessageFailPracticePlanSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());

    testInfo.scenario = "SC-7: Add Participants and Create Event";
    await ControlUtils.Click(SchedulePage.SelectAllButton());
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassParticipantsSelected,
      Strings.MessageFailParticipantsSelected
    );
    await ControlUtils.Click(SchedulePage.CreatePublicEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventCreatedToast()).toBeVisible(),
      Strings.MessagePassPracticeEventCreated,
      Strings.MessageFailPracticeEventCreated
    );

    testInfo.scenario = "SC-8: Verify Practice Event Details";
    await softAssert(
      async () => expect(SchedulePage.EventDetailBannerTitle(Consts.ScheduleEventTitle)).toBeVisible(),
      Strings.MessagePassEventTitleVisibleInDetail,
      Strings.MessageFailEventTitleVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventVenueText()).toBeVisible(),
      Strings.MessagePassEventVenueVisibleInDetail,
      Strings.MessageFailEventVenueVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.FirstUpdatedAttachmentFileNameText());
    await softAssert(
      async () => expect(SchedulePage.FirstUpdatedAttachmentFileNameText()).toBeVisible(),
      Strings.MessagePassAttachmentVisibleInDetail,
      Strings.MessageFailAttachmentVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrl)).toBeVisible(),
      Strings.MessagePassLinksVisibleInDetail,
      Strings.MessageFailLinksVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.AddedVideoLinkAnchor(Consts.ScheduleVideoLinkUrl)).toBeVisible(),
      Strings.MessagePassVideoLinkVisibleInDetail,
      Strings.MessageFailVideoLinkVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventNotesText());
    await softAssert(
      async () => expect(SchedulePage.EventNotesText()).toBeVisible(),
      Strings.MessagePassNotesVisibleInDetail,
      Strings.MessageFailNotesVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventPrivateNotesText()).toBeVisible(),
      Strings.MessagePassPrivateNotesVisibleInDetail,
      Strings.MessageFailPrivateNotesVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.PracticePlansDetailText());
    await softAssert(
      async () => expect(SchedulePage.PracticePlansDetailText()).toBeVisible(),
      Strings.MessagePassPracticePlansVisibleInDetail,
      Strings.MessageFailPracticePlansVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventOptionsMenuButton());
    await ControlUtils.Click(SchedulePage.DeleteOptionButton());
    await ControlUtils.Click(SchedulePage.ConfirmDeleteEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventDeletedToast()).toBeVisible(),
      Strings.MessagePassEventDeleted,
      Strings.MessageFailEventDeleted
    );
  });

  test(`TC-OXYM-SCHED-04: ${ScheduleModuleTestCaseNames["TC-04"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create Practice Event for Editing";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(SchedulePage.ScheduleTabIcon());
    await softAssert(
      async () => expect(SchedulePage.ScheduleBannerHeading()).toBeVisible(),
      Strings.MessagePassScheduleTabOpened,
      Strings.MessageFailScheduleTabOpened
    );
    await ControlUtils.Click(SchedulePage.AddEventButton());
    await ControlUtils.Click(SchedulePage.AddNewOption());
    await ControlUtils.Click(SchedulePage.PracticeEventTypeOption());
    await softAssert(
      async () => expect(SchedulePage.TitleLocationStepHeading()).toBeVisible(),
      Strings.MessagePassPracticeEventFormOpened,
      Strings.MessageFailPracticeEventFormOpened
    );
    await ControlUtils.Click(SchedulePage.EventTitleInput());
    await ControlUtils.Fill(SchedulePage.EventTitleInput(), Consts.ScheduleEventTitle);
    await softAssert(
      async () => expect(SchedulePage.EventTitleInput()).toHaveValue(Consts.ScheduleEventTitle),
      Strings.MessagePassEventTitleEntered,
      Strings.MessageFailEventTitleEntered
    );
    await ControlUtils.Click(SchedulePage.EventVenueInput());
    await ControlUtils.Fill(SchedulePage.EventVenueInput(), Consts.ScheduleVenue);
    await softAssert(
      async () => expect(SchedulePage.EventVenueInput()).toHaveValue(Consts.ScheduleVenue),
      Strings.MessagePassEventVenueEntered,
      Strings.MessageFailEventVenueEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.SelectDateButton()).toBeVisible(),
      Strings.MessagePassPracticeDateTimeStepOpened,
      Strings.MessageFailPracticeDateTimeStepOpened
    );
    const tomorrowDay = AppFlow.GetTomorrowDay();
    const tomorrowMonth = AppFlow.GetTomorrowMonth();
    const tomorrowYear = AppFlow.GetTomorrowYear();
    await ControlUtils.Click(SchedulePage.SelectDateButton());
    await ControlUtils.Click(SchedulePage.CalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear)).toBeVisible(),
      Strings.MessagePassEventDateSelected,
      Strings.MessageFailEventDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.SelectStartTimeOption());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassStartTimeSelected,
      Strings.MessageFailStartTimeSelected
    );
    await ControlUtils.Click(SchedulePage.PracticePlanDurationInput());
    await ControlUtils.Fill(SchedulePage.PracticePlanDurationInput(), Consts.ScheduleEventDuration);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanDurationInput()).toHaveValue(Consts.ScheduleEventDuration),
      Strings.MessagePassDurationEntered,
      Strings.MessageFailDurationEntered
    );
    await ControlUtils.Click(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText)).toBeVisible(),
      Strings.MessagePassArrivalTimeSelected,
      Strings.MessageFailArrivalTimeSelected
    );
    await ControlUtils.Click(SchedulePage.PracticePlanNotifyParticipantsToggle());
    await softAssert(
      async () => expect(SchedulePage.PracticePlanNotifyParticipantsToggleEnabled()).toBeVisible(),
      Strings.MessagePassNotifyToggleEnabled,
      Strings.MessageFailNotifyToggleEnabled
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPSettingsBannerHeading()).toBeVisible(),
      Strings.MessagePassRSVPStepOpened,
      Strings.MessageFailRSVPStepOpened
    );
    await ControlUtils.Click(SchedulePage.RSVPToggleSwitch());
    await softAssert(
      async () => expect(SchedulePage.RSVPToggleSwitch()).toBeEnabled(),
      Strings.MessagePassRSVPToggleEnabled,
      Strings.MessageFailRSVPToggleEnabled
    );
    const rsvpDay = AppFlow.GetDayAfterTomorrowDay();
    const rsvpMonth = AppFlow.GetDayAfterTomorrowMonth();
    const rsvpYear = AppFlow.GetDayAfterTomorrowYear();
    await ControlUtils.WaitBeforeClick(SchedulePage.RSVPByDateButton(AppFlow.GetTodayShortDateLabel()));
    await ControlUtils.WaitBeforeClick(SchedulePage.CalendarDayButton(rsvpDay, rsvpMonth, rsvpYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(rsvpDay, rsvpMonth, rsvpYear)).toBeVisible(),
      Strings.MessagePassRSVPDateSelected,
      Strings.MessageFailRSVPDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassRSVPTimeSelected,
      Strings.MessageFailRSVPTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddLinksOption()).toBeVisible(),
      Strings.MessagePassLinksAttachmentsStepOpened,
      Strings.MessageFailLinksAttachmentsStepOpened
    );
    await ControlUtils.UploadFile(SchedulePage.AttachmentUploadInput(), Consts.ScheduleAttachmentFilePath);
    await softAssert(
      async () => expect(SchedulePage.FileUploadedToast()).toBeVisible(),
      Strings.MessagePassAttachmentUploaded,
      Strings.MessageFailAttachmentUploaded
    );
    await ControlUtils.Click(SchedulePage.AddLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticePlanLinkUrlInput(), Consts.ScheduleLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanLinkUrlInput()).toHaveValue(Consts.ScheduleLinkUrl),
      Strings.MessagePassLinkUrlEntered,
      Strings.MessageFailLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddLinkRowButton());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrl)).toBeVisible(),
      Strings.MessagePassLinkAdded,
      Strings.MessageFailLinkAdded
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticePlanVideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanVideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassVideoLinkUrlEntered,
      Strings.MessageFailVideoLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.PracticePlanAddVideoLinkButton());
    await softAssert(
      async () => expect(SchedulePage.VideoLinkAddedToast()).toBeVisible(),
      Strings.MessagePassVideoLinkAdded,
      Strings.MessageFailVideoLinkAdded
    );
    await ControlUtils.Click(SchedulePage.NotesTextarea());
    await ControlUtils.Fill(SchedulePage.NotesTextarea(), Consts.ScheduleEventNotes);
    await softAssert(
      async () => expect(SchedulePage.NotesTextarea()).toHaveValue(Consts.ScheduleEventNotes),
      Strings.MessagePassNotesEntered,
      Strings.MessageFailNotesEntered
    );
    await ControlUtils.Click(SchedulePage.PrivateNotesTextarea());
    await ControlUtils.Fill(SchedulePage.PrivateNotesTextarea(), Consts.ScheduleEventPrivateNotes);
    await softAssert(
      async () => expect(SchedulePage.PrivateNotesTextarea()).toHaveValue(Consts.ScheduleEventPrivateNotes),
      Strings.MessagePassPrivateNotesEntered,
      Strings.MessageFailPrivateNotesEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddPlansOption()).toBeVisible(),
      Strings.MessagePassPracticePlanStepOpened,
      Strings.MessageFailPracticePlanStepOpened
    );
    await ControlUtils.Click(SchedulePage.AddPlansOption());
    await ControlUtils.Click(SchedulePage.SelectAllButton());
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassPracticePlanSelected,
      Strings.MessageFailPracticePlanSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddParticipantsHeading()).toBeVisible(),
      Strings.MessagePassParticipantsStepOpened,
      Strings.MessageFailParticipantsStepOpened
    );
    await ControlUtils.Click(SchedulePage.SelectAllButton());
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassParticipantsSelected,
      Strings.MessageFailParticipantsSelected
    );
    await ControlUtils.Click(SchedulePage.CreatePublicEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventCreatedToast()).toBeVisible(),
      Strings.MessagePassPracticeEventCreated,
      Strings.MessageFailPracticeEventCreated
    );
    await softAssert(
      async () => expect(SchedulePage.EventDetailBannerTitle(Consts.ScheduleEventTitle)).toBeVisible(),
      Strings.MessagePassEventTitleVisibleInDetail,
      Strings.MessageFailEventTitleVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventOptionsMenuButton());
    await ControlUtils.Click(SchedulePage.EditOptionButton());

    testInfo.scenario = "SC-2: Edit Title & Location Details";
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).not.toBeVisible(),
      Strings.MessagePassPracticeEditEventFormOpened,
      Strings.MessageFailPracticeEditEventFormOpened
    );
    await ControlUtils.Click(SchedulePage.PracticeEditTitleInput());
    await ControlUtils.Fill(SchedulePage.PracticeEditTitleInput(), Consts.ScheduleEventTitleUpdated);
    await softAssert(
      async () => expect(SchedulePage.PracticeEditTitleInput()).toHaveValue(Consts.ScheduleEventTitleUpdated),
      Strings.MessagePassEventTitleUpdated,
      Strings.MessageFailEventTitleUpdated
    );
    await ControlUtils.Click(SchedulePage.PracticeEditVenueInput());
    await ControlUtils.Fill(SchedulePage.PracticeEditVenueInput(), Consts.ScheduleVenueUpdated);
    await softAssert(
      async () => expect(SchedulePage.PracticeEditVenueInput()).toHaveValue(Consts.ScheduleVenueUpdated),
      Strings.MessagePassEventVenueUpdated,
      Strings.MessageFailEventVenueUpdated
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.PracticeEditDurationInput()).toBeVisible(),
      Strings.MessagePassPracticeEditDateTimeStepOpened,
      Strings.MessageFailPracticeEditDateTimeStepOpened
    );

    testInfo.scenario = "SC-3: Edit Date & Time Details";
    const editEventDay = AppFlow.GetDayAfterTomorrowDay();
    const editEventMonth = AppFlow.GetDayAfterTomorrowMonth();
    const editEventYear = AppFlow.GetDayAfterTomorrowYear();
    await ControlUtils.Click(SchedulePage.EditSelectDateButton(AppFlow.GetTomorrowShortDateLabel()));
    await ControlUtils.Click(SchedulePage.CalendarDayButton(editEventDay, editEventMonth, editEventYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(editEventDay, editEventMonth, editEventYear)).toBeVisible(),
      Strings.MessagePassEditEventDateSelected,
      Strings.MessageFailEditEventDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.SelectStartTimeOption());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassStartTimeSelected,
      Strings.MessageFailStartTimeSelected
    );
    await ControlUtils.Click(SchedulePage.PracticeEditDurationInput());
    await ControlUtils.Fill(SchedulePage.PracticeEditDurationInput(), Consts.ScheduleEventDurationUpdated);
    await softAssert(
      async () => expect(SchedulePage.PracticeEditDurationInput()).toHaveValue(Consts.ScheduleEventDurationUpdated),
      Strings.MessagePassEditDurationUpdated,
      Strings.MessageFailEditDurationUpdated
    );
    await ControlUtils.Click(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPSettingsBannerHeading()).toBeVisible(),
      Strings.MessagePassRSVPStepOpened,
      Strings.MessageFailRSVPStepOpened
    );

    testInfo.scenario = "SC-4: Edit RSVP Settings";
    const editRsvpDay = AppFlow.GetThreeDaysFromNowDay();
    const editRsvpMonth = AppFlow.GetThreeDaysFromNowMonth();
    const editRsvpYear = AppFlow.GetThreeDaysFromNowYear();
    await ControlUtils.WaitBeforeClick(SchedulePage.RSVPByDateButton(AppFlow.GetDayAfterTomorrowShortDateLabel()));
    await ControlUtils.WaitBeforeClick(SchedulePage.CalendarDayButton(editRsvpDay, editRsvpMonth, editRsvpYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(editRsvpDay, editRsvpMonth, editRsvpYear)).toBeVisible(),
      Strings.MessagePassEditRSVPDateSelected,
      Strings.MessageFailEditRSVPDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassRSVPTimeSelected,
      Strings.MessageFailRSVPTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddLinksOption()).toBeVisible(),
      Strings.MessagePassLinksAttachmentsStepOpened,
      Strings.MessageFailLinksAttachmentsStepOpened
    );

    testInfo.scenario = "SC-5: Edit Links, Attachments and Notes";
    await ControlUtils.UploadFile(SchedulePage.AttachmentUploadInput(), Consts.ScheduleAttachmentFilePathUpdated);
    await softAssert(
      async () => expect(SchedulePage.FileUploadedToast()).toBeVisible(),
      Strings.MessagePassAttachmentUploaded,
      Strings.MessageFailAttachmentUploaded
    );
    await ControlUtils.Click(SchedulePage.AddLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticeEditLinkUrlInput(), Consts.ScheduleLinkUrlUpdated);
    await softAssert(
      async () => expect(SchedulePage.PracticeEditLinkUrlInput()).toHaveValue(Consts.ScheduleLinkUrlUpdated),
      Strings.MessagePassLinkUrlEntered,
      Strings.MessageFailLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddLinkRowButton());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrlUpdated)).toBeVisible(),
      Strings.MessagePassLinkAdded,
      Strings.MessageFailLinkAdded
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticeEditVideoLinkInput(), Consts.ScheduleVideoLinkUrlUpdated);
    await softAssert(
      async () => expect(SchedulePage.PracticeEditVideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrlUpdated),
      Strings.MessagePassVideoLinkUrlEntered,
      Strings.MessageFailVideoLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.PracticePlanAddVideoLinkButton());
    await softAssert(
      async () => expect(SchedulePage.VideoLinkAddedToast()).toBeVisible(),
      Strings.MessagePassVideoLinkAdded,
      Strings.MessageFailVideoLinkAdded
    );
    await ControlUtils.Click(SchedulePage.EditNotesTextarea(Consts.ScheduleEventNotes));
    await ControlUtils.Fill(SchedulePage.EditNotesTextarea(Consts.ScheduleEventNotes), Consts.ScheduleEventNotesUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditNotesTextarea(Consts.ScheduleEventNotesUpdated)).toHaveValue(Consts.ScheduleEventNotesUpdated),
      Strings.MessagePassEditNotesUpdated,
      Strings.MessageFailEditNotesUpdated
    );
    await ControlUtils.Click(SchedulePage.EditPrivateNotesTextarea(Consts.ScheduleEventPrivateNotes));
    await ControlUtils.Fill(SchedulePage.EditPrivateNotesTextarea(Consts.ScheduleEventPrivateNotes), Consts.ScheduleEventPrivateNotesUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditPrivateNotesTextarea(Consts.ScheduleEventPrivateNotesUpdated)).toHaveValue(Consts.ScheduleEventPrivateNotesUpdated),
      Strings.MessagePassEditPrivateNotesUpdated,
      Strings.MessageFailEditPrivateNotesUpdated
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddPlansOption()).toBeVisible(),
      Strings.MessagePassEditPracticePlanStepOpened,
      Strings.MessageFailEditPracticePlanStepOpened
    );

    testInfo.scenario = "SC-6: Edit Practice Plan";
    await ControlUtils.Click(SchedulePage.AddPlansOption());
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassEditPracticePlanSelected,
      Strings.MessageFailEditPracticePlanSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddParticipantsHeading()).toBeVisible(),
      Strings.MessagePassParticipantsStepOpened,
      Strings.MessageFailParticipantsStepOpened
    );

    testInfo.scenario = "SC-7: Edit Participants and Save Changes";
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassParticipantsSelected,
      Strings.MessageFailParticipantsSelected
    );
    await ControlUtils.Click(SchedulePage.UpdatePublicEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventUpdatedToast()).toBeVisible(),
      Strings.MessagePassPracticeEventUpdated,
      Strings.MessageFailPracticeEventUpdated
    );
    await softAssert(
      async () => expect(SchedulePage.EventUpdatedToast()).not.toBeVisible(),
      Strings.MessagePassUpdateEventRedirection,
      Strings.MessageFailUpdateEventRedirection
    );

    testInfo.scenario = "SC-8: Verify Updated Practice Event Details";
    await softAssert(
      async () => expect(SchedulePage.EventDetailBannerTitle(Consts.ScheduleEventTitleUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedTitleVisibleInDetail,
      Strings.MessageFailUpdatedTitleVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventDetailVenueText(Consts.ScheduleVenueUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedVenueVisibleInDetail,
      Strings.MessageFailUpdatedVenueVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.AttachmentsHeadingDetailPage());
    await softAssert(
      async () => expect(SchedulePage.UpdatedAttachmentFileNameText()).toBeVisible(),
      Strings.MessagePassUpdatedAttachmentVisibleInDetail,
      Strings.MessageFailUpdatedAttachmentVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.LinksHeadingDetailPage());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrlUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedLinkVisibleInDetail,
      Strings.MessageFailUpdatedLinkVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.AddedVideoLinkAnchor(Consts.ScheduleVideoLinkUrlUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedVideoLinkVisibleInDetail,
      Strings.MessageFailUpdatedVideoLinkVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventDetailNotesText(Consts.ScheduleEventNotesUpdated));
    await softAssert(
      async () => expect(SchedulePage.EventDetailNotesText(Consts.ScheduleEventNotesUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedNotesVisibleInDetail,
      Strings.MessageFailUpdatedNotesVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventDetailNotesText(Consts.ScheduleEventPrivateNotesUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedPrivateNotesVisibleInDetail,
      Strings.MessageFailUpdatedPrivateNotesVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.PracticePlansDetailText());
    await softAssert(
      async () => expect(SchedulePage.PracticePlansDetailText()).toBeVisible(),
      Strings.MessagePassUpdatedPracticePlansVisibleInDetail,
      Strings.MessageFailUpdatedPracticePlansVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventOptionsMenuButton());
    await ControlUtils.Click(SchedulePage.DeleteOptionButton());
    await ControlUtils.Click(SchedulePage.ConfirmDeleteEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventDeletedToast()).toBeVisible(),
      Strings.MessagePassEventDeleted,
      Strings.MessageFailEventDeleted
    );
    await softAssert(
      async () => expect(SchedulePage.DeletedEventTitleText(Consts.ScheduleEventTitleUpdated)).not.toBeVisible(),
      Strings.MessagePassEventRemovedFromSchedule,
      Strings.MessageFailEventRemovedFromSchedule
    );
  });

  test(`TC-OXYM-SCHED-05: ${ScheduleModuleTestCaseNames["TC-05"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create a New Meeting Event";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(SchedulePage.ScheduleTabIcon());
    await softAssert(
      async () => expect(SchedulePage.ScheduleBannerHeading()).toBeVisible(),
      Strings.MessagePassScheduleTabOpened,
      Strings.MessageFailScheduleTabOpened
    );
    await ControlUtils.Click(SchedulePage.AddEventButton());
    await ControlUtils.Click(SchedulePage.AddNewOption());
    await ControlUtils.Click(SchedulePage.MeetingEventTypeOption());
    await softAssert(
      async () => expect(SchedulePage.TitleLocationStepHeading()).toBeVisible(),
      Strings.MessagePassMeetingEventFormOpened,
      Strings.MessageFailMeetingEventFormOpened
    );

    testInfo.scenario = "SC-2: Enter Title & Location Details";
    await ControlUtils.Click(SchedulePage.EventTitleInput());
    await ControlUtils.Fill(SchedulePage.EventTitleInput(), Consts.ScheduleEventTitle);
    await softAssert(
      async () => expect(SchedulePage.EventTitleInput()).toHaveValue(Consts.ScheduleEventTitle),
      Strings.MessagePassEventTitleEntered,
      Strings.MessageFailEventTitleEntered
    );
    await ControlUtils.Click(SchedulePage.EventVenueInput());
    await ControlUtils.Fill(SchedulePage.EventVenueInput(), Consts.ScheduleVenue);
    await softAssert(
      async () => expect(SchedulePage.EventVenueInput()).toHaveValue(Consts.ScheduleVenue),
      Strings.MessagePassEventVenueEntered,
      Strings.MessageFailEventVenueEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.SelectDateButton()).toBeVisible(),
      Strings.MessagePassMeetingDateTimeStepOpened,
      Strings.MessageFailMeetingDateTimeStepOpened
    );

    testInfo.scenario = "SC-3: Enter Date & Time Details";
    const tomorrowDay = AppFlow.GetTomorrowDay();
    const tomorrowMonth = AppFlow.GetTomorrowMonth();
    const tomorrowYear = AppFlow.GetTomorrowYear();
    await ControlUtils.Click(SchedulePage.SelectDateButton());
    await ControlUtils.Click(SchedulePage.CalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear)).toBeVisible(),
      Strings.MessagePassEventDateSelected,
      Strings.MessageFailEventDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.SelectStartTimeOption());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassStartTimeSelected,
      Strings.MessageFailStartTimeSelected
    );
    await ControlUtils.Click(SchedulePage.PracticePlanDurationInput());
    await ControlUtils.Fill(SchedulePage.PracticePlanDurationInput(), Consts.ScheduleEventDuration);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanDurationInput()).toHaveValue(Consts.ScheduleEventDuration),
      Strings.MessagePassDurationEntered,
      Strings.MessageFailDurationEntered
    );
    await ControlUtils.Click(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText)).toBeVisible(),
      Strings.MessagePassArrivalTimeSelected,
      Strings.MessageFailArrivalTimeSelected
    );
    await ControlUtils.Click(SchedulePage.MeetingNotifyParticipantsToggle());
    await softAssert(
      async () => expect(SchedulePage.MeetingNotifyParticipantsToggleEnabled()).toBeVisible(),
      Strings.MessagePassNotifyToggleEnabled,
      Strings.MessageFailNotifyToggleEnabled
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPSettingsBannerHeading()).toBeVisible(),
      Strings.MessagePassRSVPStepOpened,
      Strings.MessageFailRSVPStepOpened
    );

    testInfo.scenario = "SC-4: Configure RSVP Settings";
    await ControlUtils.Click(SchedulePage.RSVPToggleSwitch());
    await softAssert(
      async () => expect(SchedulePage.RSVPToggleSwitch()).toBeEnabled(),
      Strings.MessagePassRSVPToggleEnabled,
      Strings.MessageFailRSVPToggleEnabled
    );
    const rsvpDay = AppFlow.GetDayAfterTomorrowDay();
    const rsvpMonth = AppFlow.GetDayAfterTomorrowMonth();
    const rsvpYear = AppFlow.GetDayAfterTomorrowYear();
    await ControlUtils.WaitBeforeClick(SchedulePage.RSVPByDateButton(AppFlow.GetTodayShortDateLabel()));
    await ControlUtils.WaitBeforeClick(SchedulePage.CalendarDayButton(rsvpDay, rsvpMonth, rsvpYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(rsvpDay, rsvpMonth, rsvpYear)).toBeVisible(),
      Strings.MessagePassRSVPDateSelected,
      Strings.MessageFailRSVPDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassRSVPTimeSelected,
      Strings.MessageFailRSVPTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddLinksOption()).toBeVisible(),
      Strings.MessagePassLinksAttachmentsStepOpened,
      Strings.MessageFailLinksAttachmentsStepOpened
    );

    testInfo.scenario = "SC-5: Add Links, Attachments and Notes";
    await ControlUtils.UploadFile(SchedulePage.AttachmentUploadInput(), Consts.ScheduleAttachmentFilePath);
    await softAssert(
      async () => expect(SchedulePage.FileUploadedToast()).toBeVisible(),
      Strings.MessagePassAttachmentUploaded,
      Strings.MessageFailAttachmentUploaded
    );
    await ControlUtils.Click(SchedulePage.AddLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticePlanLinkUrlInput(), Consts.ScheduleLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanLinkUrlInput()).toHaveValue(Consts.ScheduleLinkUrl),
      Strings.MessagePassLinkUrlEntered,
      Strings.MessageFailLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddLinkRowButton());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrl)).toBeVisible(),
      Strings.MessagePassLinkAdded,
      Strings.MessageFailLinkAdded
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticePlanVideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanVideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassVideoLinkUrlEntered,
      Strings.MessageFailVideoLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinkButton());
    await softAssert(
      async () => expect(SchedulePage.VideoLinkAddedToast()).toBeVisible(),
      Strings.MessagePassVideoLinkAdded,
      Strings.MessageFailVideoLinkAdded
    );
    await ControlUtils.Click(SchedulePage.NotesTextarea());
    await ControlUtils.Fill(SchedulePage.NotesTextarea(), Consts.ScheduleEventNotes);
    await softAssert(
      async () => expect(SchedulePage.NotesTextarea()).toHaveValue(Consts.ScheduleEventNotes),
      Strings.MessagePassNotesEntered,
      Strings.MessageFailNotesEntered
    );
    await ControlUtils.Click(SchedulePage.PrivateNotesTextarea());
    await ControlUtils.Fill(SchedulePage.PrivateNotesTextarea(), Consts.ScheduleEventPrivateNotes);
    await softAssert(
      async () => expect(SchedulePage.PrivateNotesTextarea()).toHaveValue(Consts.ScheduleEventPrivateNotes),
      Strings.MessagePassPrivateNotesEntered,
      Strings.MessageFailPrivateNotesEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddParticipantsHeading()).toBeVisible(),
      Strings.MessagePassParticipantsStepOpened,
      Strings.MessageFailParticipantsStepOpened
    );

    testInfo.scenario = "SC-6: Add Participants and Create Event";
    await ControlUtils.Click(SchedulePage.SelectAllButton());
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassParticipantsSelected,
      Strings.MessageFailParticipantsSelected
    );
    await ControlUtils.Click(SchedulePage.CreatePublicEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventCreatedToast()).toBeVisible(),
      Strings.MessagePassMeetingEventCreated,
      Strings.MessageFailMeetingEventCreated
    );


    testInfo.scenario = "SC-7: Verify Meeting Event Details";
    await softAssert(
      async () => expect(SchedulePage.EventDetailBannerTitle(Consts.ScheduleEventTitle)).toBeVisible(),
      Strings.MessagePassEventTitleVisibleInDetail,
      Strings.MessageFailEventTitleVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventVenueText()).toBeVisible(),
      Strings.MessagePassEventVenueVisibleInDetail,
      Strings.MessageFailEventVenueVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.AttachmentsHeadingDetailPage());
    await softAssert(
      async () => expect(SchedulePage.AttachmentFileNameTextonDetailPage()).toBeVisible(),
      Strings.MessagePassAttachmentVisibleInDetail,
      Strings.MessageFailAttachmentVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrl)).toBeVisible(),
      Strings.MessagePassLinksVisibleInDetail,
      Strings.MessageFailLinksVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.AddedVideoLinkAnchor(Consts.ScheduleVideoLinkUrl)).toBeVisible(),
      Strings.MessagePassVideoLinkVisibleInDetail,
      Strings.MessageFailVideoLinkVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventNotesText());
    await softAssert(
      async () => expect(SchedulePage.EventNotesText()).toBeVisible(),
      Strings.MessagePassNotesVisibleInDetail,
      Strings.MessageFailNotesVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventPrivateNotesText()).toBeVisible(),
      Strings.MessagePassPrivateNotesVisibleInDetail,
      Strings.MessageFailPrivateNotesVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventOptionsMenuButton());
    await ControlUtils.Click(SchedulePage.DeleteOptionButton());
    await ControlUtils.Click(SchedulePage.ConfirmDeleteEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventDeletedToast()).toBeVisible(),
      Strings.MessagePassEventDeleted,
      Strings.MessageFailEventDeleted
    );
  });

  test(`TC-OXYM-SCHED-06: ${ScheduleModuleTestCaseNames["TC-06"]}`, async ({ softAssert }, testInfo) => {
    testInfo.scenario = "SC-1: Create Meeting Event for Editing";
    await softAssert(
      async () => expect(HomePage.PostLoginIndicator()).toBeVisible({ timeout: 30000 }),
      (await HomePage.DismissGuideIfPresent())
        ? Strings.MessagePassGuideDismissed
        : Strings.MessagePassGuideNotShown,
      Strings.MessageFailGuideHandling
    );
    await HomePage.SwitchToTeam(Consts.TeamName);
    await softAssert(
      async () => expect(SchedulePage.PollsTab()).toBeVisible(),
      Strings.MessagePassTeamSwitchedSuccessfully,
      Strings.MessageFailTeamSwitchedSuccessfully
    );
    await ControlUtils.Click(SchedulePage.ScheduleTabIcon());
    await softAssert(
      async () => expect(SchedulePage.ScheduleBannerHeading()).toBeVisible(),
      Strings.MessagePassScheduleTabOpened,
      Strings.MessageFailScheduleTabOpened
    );
    await ControlUtils.Click(SchedulePage.AddEventButton());
    await ControlUtils.Click(SchedulePage.AddNewOption());
    await ControlUtils.Click(SchedulePage.MeetingEventTypeOption());
    await softAssert(
      async () => expect(SchedulePage.TitleLocationStepHeading()).toBeVisible(),
      Strings.MessagePassMeetingEventFormOpened,
      Strings.MessageFailMeetingEventFormOpened
    );
    await ControlUtils.Click(SchedulePage.EventTitleInput());
    await ControlUtils.Fill(SchedulePage.EventTitleInput(), Consts.ScheduleEventTitle);
    await softAssert(
      async () => expect(SchedulePage.EventTitleInput()).toHaveValue(Consts.ScheduleEventTitle),
      Strings.MessagePassEventTitleEntered,
      Strings.MessageFailEventTitleEntered
    );
    await ControlUtils.Click(SchedulePage.EventVenueInput());
    await ControlUtils.Fill(SchedulePage.EventVenueInput(), Consts.ScheduleVenue);
    await softAssert(
      async () => expect(SchedulePage.EventVenueInput()).toHaveValue(Consts.ScheduleVenue),
      Strings.MessagePassEventVenueEntered,
      Strings.MessageFailEventVenueEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.SelectDateButton()).toBeVisible(),
      Strings.MessagePassMeetingDateTimeStepOpened,
      Strings.MessageFailMeetingDateTimeStepOpened
    );
    const tomorrowDay = AppFlow.GetTomorrowDay();
    const tomorrowMonth = AppFlow.GetTomorrowMonth();
    const tomorrowYear = AppFlow.GetTomorrowYear();
    await ControlUtils.Click(SchedulePage.SelectDateButton());
    await ControlUtils.Click(SchedulePage.CalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(tomorrowDay, tomorrowMonth, tomorrowYear)).toBeVisible(),
      Strings.MessagePassEventDateSelected,
      Strings.MessageFailEventDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.SelectStartTimeOption());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassStartTimeSelected,
      Strings.MessageFailStartTimeSelected
    );
    await ControlUtils.Click(SchedulePage.PracticePlanDurationInput());
    await ControlUtils.Fill(SchedulePage.PracticePlanDurationInput(), Consts.ScheduleEventDuration);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanDurationInput()).toHaveValue(Consts.ScheduleEventDuration),
      Strings.MessagePassDurationEntered,
      Strings.MessageFailDurationEntered
    );
    await ControlUtils.Click(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText)).toBeVisible(),
      Strings.MessagePassArrivalTimeSelected,
      Strings.MessageFailArrivalTimeSelected
    );
    await ControlUtils.Click(SchedulePage.MeetingNotifyParticipantsToggle());
    await softAssert(
      async () => expect(SchedulePage.MeetingNotifyParticipantsToggleEnabled()).toBeVisible(),
      Strings.MessagePassNotifyToggleEnabled,
      Strings.MessageFailNotifyToggleEnabled
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPSettingsBannerHeading()).toBeVisible(),
      Strings.MessagePassRSVPStepOpened,
      Strings.MessageFailRSVPStepOpened
    );

    await ControlUtils.Click(SchedulePage.RSVPToggleSwitch());
    await softAssert(
      async () => expect(SchedulePage.RSVPToggleSwitch()).toBeEnabled(),
      Strings.MessagePassRSVPToggleEnabled,
      Strings.MessageFailRSVPToggleEnabled
    );
    const rsvpDay = AppFlow.GetDayAfterTomorrowDay();
    const rsvpMonth = AppFlow.GetDayAfterTomorrowMonth();
    const rsvpYear = AppFlow.GetDayAfterTomorrowYear();
    await ControlUtils.WaitBeforeClick(SchedulePage.RSVPByDateButton(AppFlow.GetTodayShortDateLabel()));
    await ControlUtils.WaitBeforeClick(SchedulePage.CalendarDayButton(rsvpDay, rsvpMonth, rsvpYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(rsvpDay, rsvpMonth, rsvpYear)).toBeVisible(),
      Strings.MessagePassRSVPDateSelected,
      Strings.MessageFailRSVPDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassRSVPTimeSelected,
      Strings.MessageFailRSVPTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddLinksOption()).toBeVisible(),
      Strings.MessagePassLinksAttachmentsStepOpened,
      Strings.MessageFailLinksAttachmentsStepOpened
    );
    await ControlUtils.UploadFile(SchedulePage.AttachmentUploadInput(), Consts.ScheduleAttachmentFilePath);
    await softAssert(
      async () => expect(SchedulePage.FileUploadedToast()).toBeVisible(),
      Strings.MessagePassAttachmentUploaded,
      Strings.MessageFailAttachmentUploaded
    );
    await ControlUtils.Click(SchedulePage.AddLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticePlanLinkUrlInput(), Consts.ScheduleLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanLinkUrlInput()).toHaveValue(Consts.ScheduleLinkUrl),
      Strings.MessagePassLinkUrlEntered,
      Strings.MessageFailLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddLinkRowButton());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrl)).toBeVisible(),
      Strings.MessagePassLinkAdded,
      Strings.MessageFailLinkAdded
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinksOption());
    await ControlUtils.Fill(SchedulePage.PracticePlanVideoLinkInput(), Consts.ScheduleVideoLinkUrl);
    await softAssert(
      async () => expect(SchedulePage.PracticePlanVideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrl),
      Strings.MessagePassVideoLinkUrlEntered,
      Strings.MessageFailVideoLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinkButton());
    await softAssert(
      async () => expect(SchedulePage.VideoLinkAddedToast()).toBeVisible(),
      Strings.MessagePassVideoLinkAdded,
      Strings.MessageFailVideoLinkAdded
    );
    await ControlUtils.Click(SchedulePage.NotesTextarea());
    await ControlUtils.Fill(SchedulePage.NotesTextarea(), Consts.ScheduleEventNotes);
    await softAssert(
      async () => expect(SchedulePage.NotesTextarea()).toHaveValue(Consts.ScheduleEventNotes),
      Strings.MessagePassNotesEntered,
      Strings.MessageFailNotesEntered
    );
    await ControlUtils.Click(SchedulePage.PrivateNotesTextarea());
    await ControlUtils.Fill(SchedulePage.PrivateNotesTextarea(), Consts.ScheduleEventPrivateNotes);
    await softAssert(
      async () => expect(SchedulePage.PrivateNotesTextarea()).toHaveValue(Consts.ScheduleEventPrivateNotes),
      Strings.MessagePassPrivateNotesEntered,
      Strings.MessageFailPrivateNotesEntered
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddParticipantsHeading()).toBeVisible(),
      Strings.MessagePassParticipantsStepOpened,
      Strings.MessageFailParticipantsStepOpened
    );
    await ControlUtils.Click(SchedulePage.SelectAllButton());
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassParticipantsSelected,
      Strings.MessageFailParticipantsSelected
    );
    await ControlUtils.Click(SchedulePage.CreatePublicEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventCreatedToast()).toBeVisible(),
      Strings.MessagePassMeetingEventCreated,
      Strings.MessageFailMeetingEventCreated
    );
    await softAssert(
      async () => expect(SchedulePage.EventDetailBannerTitle(Consts.ScheduleEventTitle)).toBeVisible(),
      Strings.MessagePassEventTitleVisibleInDetail,
      Strings.MessageFailEventTitleVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventOptionsMenuButton());
    await ControlUtils.Click(SchedulePage.EditOptionButton());

    testInfo.scenario = "SC-2: Edit Title & Location Details";
    await softAssert(
      async () => expect(SchedulePage.TitleLocationStepHeading()).toBeVisible(),
      Strings.MessagePassMeetingEditEventFormOpened,
      Strings.MessageFailMeetingEditEventFormOpened
    );
    await ControlUtils.Click(SchedulePage.MeetingEditTitleInput());
    await ControlUtils.Fill(SchedulePage.MeetingEditTitleInput(), Consts.ScheduleEventTitleUpdated);
    await softAssert(
      async () => expect(SchedulePage.MeetingEditTitleInput()).toHaveValue(Consts.ScheduleEventTitleUpdated),
      Strings.MessagePassEventTitleUpdated,
      Strings.MessageFailEventTitleUpdated
    );
    await ControlUtils.Click(SchedulePage.MeetingEditVenueInput());
    await ControlUtils.Fill(SchedulePage.MeetingEditVenueInput(), Consts.ScheduleVenueUpdated);
    await softAssert(
      async () => expect(SchedulePage.MeetingEditVenueInput()).toHaveValue(Consts.ScheduleVenueUpdated),
      Strings.MessagePassEventVenueUpdated,
      Strings.MessageFailEventVenueUpdated
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.MeetingEditDurationInput()).toBeVisible(),
      Strings.MessagePassMeetingEditDateTimeStepOpened,
      Strings.MessageFailMeetingEditDateTimeStepOpened
    );

    testInfo.scenario = "SC-3: Edit Date & Time Details";
    const editEventDay = AppFlow.GetDayAfterTomorrowDay();
    const editEventMonth = AppFlow.GetDayAfterTomorrowMonth();
    const editEventYear = AppFlow.GetDayAfterTomorrowYear();
    await ControlUtils.Click(SchedulePage.EditSelectDateButton(AppFlow.GetTomorrowShortDateLabel()));
    await ControlUtils.Click(SchedulePage.CalendarDayButton(editEventDay, editEventMonth, editEventYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(editEventDay, editEventMonth, editEventYear)).toBeVisible(),
      Strings.MessagePassEditEventDateSelected,
      Strings.MessageFailEditEventDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.SelectStartTimeOption());
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassStartTimeSelected,
      Strings.MessageFailStartTimeSelected
    );
    await ControlUtils.Click(SchedulePage.MeetingEditDurationInput());
    await ControlUtils.Fill(SchedulePage.MeetingEditDurationInput(), Consts.ScheduleEventDurationUpdated);
    await softAssert(
      async () => expect(SchedulePage.MeetingEditDurationInput()).toHaveValue(Consts.ScheduleEventDurationUpdated),
      Strings.MessagePassEditDurationUpdated,
      Strings.MessageFailEditDurationUpdated
    );
    await ControlUtils.Click(SchedulePage.TimeButtonByText(Consts.ScheduleArrivalTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.RSVPSettingsBannerHeading()).toBeVisible(),
      Strings.MessagePassRSVPStepOpened,
      Strings.MessageFailRSVPStepOpened
    );

    testInfo.scenario = "SC-4: Edit RSVP Settings";
    const editRsvpDay = AppFlow.GetThreeDaysFromNowDay();
    const editRsvpMonth = AppFlow.GetThreeDaysFromNowMonth();
    const editRsvpYear = AppFlow.GetThreeDaysFromNowYear();
    await ControlUtils.WaitBeforeClick(SchedulePage.RSVPByDateButton(AppFlow.GetDayAfterTomorrowShortDateLabel()));
    await ControlUtils.WaitBeforeClick(SchedulePage.CalendarDayButton(editRsvpDay, editRsvpMonth, editRsvpYear));
    await softAssert(
      async () => expect(SchedulePage.SelectedCalendarDayButton(editRsvpDay, editRsvpMonth, editRsvpYear)).toBeVisible(),
      Strings.MessagePassEditRSVPDateSelected,
      Strings.MessageFailEditRSVPDateSelected
    );
    await ControlUtils.Click(SchedulePage.DoneButton());
    await ControlUtils.Click(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText));
    await ControlUtils.Click(SchedulePage.DoneButton());
    await softAssert(
      async () => expect(SchedulePage.TimeOptionButton(Consts.ScheduleStartTimeButtonText)).toBeVisible(),
      Strings.MessagePassRSVPTimeSelected,
      Strings.MessageFailRSVPTimeSelected
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddLinksOption()).toBeVisible(),
      Strings.MessagePassLinksAttachmentsStepOpened,
      Strings.MessageFailLinksAttachmentsStepOpened
    );

    testInfo.scenario = "SC-5: Edit Links, Attachments and Notes";
    await ControlUtils.UploadFile(SchedulePage.AttachmentUploadInput(), Consts.ScheduleAttachmentFilePathUpdated);
    await softAssert(
      async () => expect(SchedulePage.FileUploadedToast()).toBeVisible(),
      Strings.MessagePassAttachmentUploaded,
      Strings.MessageFailAttachmentUploaded
    );
    await ControlUtils.Click(SchedulePage.AddLinksOption());
    await ControlUtils.Fill(SchedulePage.MeetingEditLinkUrlInput(), Consts.ScheduleLinkUrlUpdated);
    await softAssert(
      async () => expect(SchedulePage.MeetingEditLinkUrlInput()).toHaveValue(Consts.ScheduleLinkUrlUpdated),
      Strings.MessagePassUpdatedLinkUrlEntered,
      Strings.MessageFailUpdatedLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddLinkRowButton());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrlUpdated)).toBeVisible(),
      Strings.MessagePassLinkAdded,
      Strings.MessageFailLinkAdded
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinksOption());
    await ControlUtils.Fill(SchedulePage.MeetingEditVideoLinkInput(), Consts.ScheduleVideoLinkUrlUpdated);
    await softAssert(
      async () => expect(SchedulePage.MeetingEditVideoLinkInput()).toHaveValue(Consts.ScheduleVideoLinkUrlUpdated),
      Strings.MessagePassUpdatedVideoLinkUrlEntered,
      Strings.MessageFailUpdatedVideoLinkUrlEntered
    );
    await ControlUtils.Click(SchedulePage.AddVideoLinkButton());
    await softAssert(
      async () => expect(SchedulePage.VideoLinkAddedToast()).toBeVisible(),
      Strings.MessagePassVideoLinkAdded,
      Strings.MessageFailVideoLinkAdded
    );
    await ControlUtils.Click(SchedulePage.EditNotesTextarea(Consts.ScheduleEventNotes));
    await ControlUtils.Fill(SchedulePage.EditNotesTextarea(Consts.ScheduleEventNotes), Consts.ScheduleEventNotesUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditNotesTextarea(Consts.ScheduleEventNotesUpdated)).toHaveValue(Consts.ScheduleEventNotesUpdated),
      Strings.MessagePassEditNotesUpdated,
      Strings.MessageFailEditNotesUpdated
    );
    await ControlUtils.Click(SchedulePage.EditPrivateNotesTextarea(Consts.ScheduleEventPrivateNotes));
    await ControlUtils.Fill(SchedulePage.EditPrivateNotesTextarea(Consts.ScheduleEventPrivateNotes), Consts.ScheduleEventPrivateNotesUpdated);
    await softAssert(
      async () => expect(SchedulePage.EditPrivateNotesTextarea(Consts.ScheduleEventPrivateNotesUpdated)).toHaveValue(Consts.ScheduleEventPrivateNotesUpdated),
      Strings.MessagePassEditPrivateNotesUpdated,
      Strings.MessageFailEditPrivateNotesUpdated
    );
    await ControlUtils.Click(SchedulePage.NextButton());
    await softAssert(
      async () => expect(SchedulePage.AddParticipantsHeading()).toBeVisible(),
      Strings.MessagePassParticipantsStepOpened,
      Strings.MessageFailParticipantsStepOpened
    );

    testInfo.scenario = "SC-6: Edit Participants and Save Changes";
    await softAssert(
      async () => expect(SchedulePage.ParticipantsSelectedText()).toBeVisible(),
      Strings.MessagePassParticipantsSelected,
      Strings.MessageFailParticipantsSelected
    );
    await ControlUtils.Click(SchedulePage.UpdatePublicEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventUpdatedToast()).toBeVisible(),
      Strings.MessagePassMeetingEventUpdated,
      Strings.MessageFailMeetingEventUpdated
    );
    await softAssert(
      async () => expect(SchedulePage.EventUpdatedToast()).not.toBeVisible(),
      Strings.MessagePassUpdateEventRedirection,
      Strings.MessageFailUpdateEventRedirection
    );

    testInfo.scenario = "SC-7: Verify Updated Meeting Event Details";
    await softAssert(
      async () => expect(SchedulePage.EventDetailBannerTitle(Consts.ScheduleEventTitleUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedTitleVisibleInDetail,
      Strings.MessageFailUpdatedTitleVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventDetailVenueText(Consts.ScheduleVenueUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedVenueVisibleInDetail,
      Strings.MessageFailUpdatedVenueVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.AttachmentsHeadingDetailPage());
    await softAssert(
      async () => expect(SchedulePage.UpdatedAttachmentFileNameText()).toBeVisible(),
      Strings.MessagePassUpdatedAttachmentVisibleInDetail,
      Strings.MessageFailUpdatedAttachmentVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.LinksHeadingDetailPage());
    await softAssert(
      async () => expect(SchedulePage.AddedLinkText(Consts.ScheduleLinkUrlUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedLinkVisibleInDetail,
      Strings.MessageFailUpdatedLinkVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.AddedVideoLinkAnchor(Consts.ScheduleVideoLinkUrlUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedVideoLinkVisibleInDetail,
      Strings.MessageFailUpdatedVideoLinkVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventDetailNotesText(Consts.ScheduleEventNotesUpdated));
    await softAssert(
      async () => expect(SchedulePage.EventDetailNotesText(Consts.ScheduleEventNotesUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedNotesVisibleInDetail,
      Strings.MessageFailUpdatedNotesVisibleInDetail
    );
    await softAssert(
      async () => expect(SchedulePage.EventDetailNotesText(Consts.ScheduleEventPrivateNotesUpdated)).toBeVisible(),
      Strings.MessagePassUpdatedPrivateNotesVisibleInDetail,
      Strings.MessageFailUpdatedPrivateNotesVisibleInDetail
    );
    await ControlUtils.Click(SchedulePage.EventOptionsMenuButton());
    await ControlUtils.Click(SchedulePage.DeleteOptionButton());
    await ControlUtils.Click(SchedulePage.ConfirmDeleteEventButton());
    await softAssert(
      async () => expect(SchedulePage.EventDeletedToast()).toBeVisible(),
      Strings.MessagePassEventDeleted,
      Strings.MessageFailEventDeleted
    );
    await softAssert(
      async () => expect(SchedulePage.DeletedEventTitleText(Consts.ScheduleEventTitleUpdated)).not.toBeVisible(),
      Strings.MessagePassEventRemovedFromSchedule,
      Strings.MessageFailEventRemovedFromSchedule
    );
  });
});
