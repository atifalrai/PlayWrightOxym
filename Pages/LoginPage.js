import { ControlUtils } from "./ControlUtils";

export class LoginPage {

  static Email_Identifier = "//input[@placeholder='Username' or @placeholder='Email address' or @id='email' or @name='email']";
  static Password_Identifier = "//input[@placeholder='Password' or @id='password' or @name='password']";
  static LoginInButton_Identifier = "//button[@type='submit' or normalize-space()='Sign in' or normalize-space()='Login']";
  static YopMailEmailField_Identifier = "//input[@placeholder='Enter your inbox here']";
  static YopMailCheckInbox_Identifier = "//button[@title='Check Inbox @yopmail.com']";
  static YopMailVerificationCode_Identifier = "//*[@id='mail']//td/p/b[2]";
  static VerificationCodeField_Identifier = "//input[@id='code']";
  static ProfileIcon_Identifier = "//ion-label[text()='Profile']/parent::ion-tab-button//*[name()='svg']";
  static SignOutLink_Identifier = "//button[text()=' Sign Out ']";
  static SignOutButton_Identifier = "//button[contains(text(),'Cancel')]/parent::div/button[text()='Sign Out']";


  static Email() {
    return ControlUtils.WaitForVisible(global.page.locator(this.Email_Identifier));
  }

  static Password() {
    return ControlUtils.WaitForVisible(global.page.locator(this.Password_Identifier));
  }

  static LoginButton() {
    return ControlUtils.WaitForVisible(global.page.locator(this.LoginInButton_Identifier));
  }

  static YopMailCheckInbox() {
    return ControlUtils.WaitForVisible(global.page.locator(this.YopMailCheckInbox_Identifier));
  }

  static YopMailEmailField() {
    return ControlUtils.WaitForVisible(global.page.locator(this.YopMailEmailField_Identifier));
  }

  static VerificationCodeField() {
    return ControlUtils.WaitForVisible(global.page.locator(this.VerificationCodeField_Identifier));
  }

  static YopMailVerificationCode() {
    return ControlUtils.WaitForVisible(global.page.locator(this.YopMailVerificationCode_Identifier));
  }

  static ProfileIcon() {
    return global.page.locator('#tab-button-account').getByText('Account');
  }
  static SignOutLink() {
    return global.page.getByRole('button', { name: 'Sign Out' });
  }
  static SignOutButton() {
    return global.page.locator('ion-modal.account-sign-out-modal').getByRole('button', { name: 'Sign Out' });
  }

}








