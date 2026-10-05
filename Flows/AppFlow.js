import { Consts } from "../Pages/Consts";
import { ControlUtils } from '../Pages/ControlUtils';
import { faker } from '@faker-js/faker';
import { HomePage } from "../Pages/HomePage";

export class AppFlow {
  static async NavigateToHome() {
    const options = { waitUntil: "domcontentloaded", timeout: 120000 };
    try {
      await global.page.goto(Consts.Url, options);
    } catch (error) {
      console.warn("Initial navigation timed out, retrying once:", error.message);
      await global.page.goto(Consts.Url, { ...options, waitUntil: "load" });
    }
  }

  static async SearchText(locator, searchtext) {
    await ControlUtils.Click(locator);
    await ControlUtils.Fill(locator, searchtext);
  }

  static TempID() {
    return `CID-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  static GenerateDummySentence() {
    return `Report: ${faker.lorem.sentence()}`;
  }

  static AdministrativeNotes() {
    return `Note: ${faker.lorem.paragraph()}`;
  }
  static async ClickBannerButton() {
    await ControlUtils.Click(HomePage.BannerButton());
  }

  static GetTodayLongDateLabel() {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
    const day = today.getDate();
    const month = today.toLocaleDateString("en-US", { month: "long" });
    return `Today, ${weekday} ${day} ${month}`;
  }

  static GetTomorrowDateLabel() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekday = tomorrow.toLocaleDateString("en-US", { weekday: "long" });
    const day = tomorrow.getDate();
    const month = tomorrow.toLocaleDateString("en-US", { month: "long" });
    return `${weekday} ${day} ${month}`;
  }

  static GetTomorrowDay() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.getDate();
  }

  static GetTomorrowMonth() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.getMonth() + 1;
  }

  static GetTomorrowYear() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.getFullYear();
  }

  static GetDayAfterTomorrowDay() {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dayAfterTomorrow.getDate();
  }

  static GetDayAfterTomorrowMonth() {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dayAfterTomorrow.getMonth() + 1;
  }

  static GetDayAfterTomorrowYear() {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dayAfterTomorrow.getFullYear();
  }

  static GetTodayShortDateLabel() {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "short" });
    const month = today.toLocaleDateString("en-US", { month: "short" });
    const day = today.getDate();
    return `${weekday}, ${month} ${day}`;
  }

  static GetTomorrowShortDateLabel() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const day = d.getDate();
    return `${weekday}, ${month} ${day},`;
  }

  static GetDayAfterTomorrowShortDateLabel() {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const day = d.getDate();
    return `${weekday}, ${month} ${day}`;
  }

  static GetThreeDaysFromNowDay() {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.getDate();
  }

  static GetThreeDaysFromNowMonth() {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.getMonth() + 1;
  }

  static GetThreeDaysFromNowYear() {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.getFullYear();
  }

  static GetPaymentDueDateLabel(daysAhead = Consts.PaymentDueDateDaysAhead) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
};
