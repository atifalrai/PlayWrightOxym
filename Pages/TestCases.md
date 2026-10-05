# Notes Test Cases (from Notes.spec.js)

---

**Test Case Title:** NTC-01: Select Soccer sport

**Steps:**
1. Log in to the application (automated in `beforeAll`).
2. Click the **Soccer** sport button.

**Expected Result:** Soccer sport is selected.

---

**Test Case Title:** NTC-02: Navigate to Notes tab

**Steps:**
1. Open the **Notes** tab (icon under the Notes label).

**Expected Result:** Notes tab is opened.

---

**Test Case Title:** NTC-03: Open Add note form

**Steps:**
1. Click **Add note**.

**Expected Result:** Add note form is opened.

---

**Test Case Title:** NTC-04: Create note with title and body

**Steps:**
1. Click the **Add Title** textbox and enter `test first note`.
2. Click the note editor and enter `typingg`.
3. Click **Add Note**.

**Expected Result:** Note is created and visible in the list.

---

**Test Case Title:** NTC-05: Open note from list

**Steps:**
1. Click the note title `test first note` (exact match).

**Expected Result:** Note detail view is opened.

---

**Test Case Title:** NTC-06: Open note in edit mode

**Steps:**
1. From the note detail view, click the first header **button** (actions).
2. Click the note **menu** icon.
3. Click **Edit**.

**Expected Result:** Note is opened in edit mode.

---

**Test Case Title:** NTC-07: Update note content

**Steps:**
1. With the note in edit mode, click the note **paragraph**.
2. Update the body from `typingg` to `typingg-update`.
3. Click **Update Note**.

**Expected Result:** Note content is updated successfully and a success message is shown.

---

**Test Case Title:** NTC-08: Delete note with confirmation

**Steps:**
1. From the note detail view, click the first header **button** (actions).
2. Click the note **menu** icon.
3. Click **Delete**.
4. Click **Delete** on the confirmation dialog.

**Expected Result:** Note is deleted successfully.

---

# Wallet Test Cases (from Wallet.spec.js)

---

**Test Case Title:** NTC-01: Open Wallet module

**Steps:**
1. Log in to the application (automated in `beforeAll`).
2. Click the **Wallet** tab.

**Expected Result:** Wallet module opens.

---

**Test Case Title:** NTC-02: Verify Wallet invoices page loaded

**Steps:**
1. After opening Wallet, verify the page URL and content.

**Expected Result:** URL is `https://uat.juke.team/tabs/wallet/invoices` and the Wallet invoices page is visible.

---

**Test Case Title:** NTC-03: Open Create request and verify New Request page

**Steps:**
1. Click **Create request**.

**Expected Result:** New Request page opens with heading **New Request**.

---

**Test Case Title:** NTC-04: Enter payment request title

**Steps:**
1. Enter `Testing Payment` in the **Enter title** field.

**Expected Result:** Title is entered successfully.

---

**Test Case Title:** NTC-05: Enter amount per person

**Steps:**
1. Enter `100` in the **Amount per person** field.

**Expected Result:** Amount is entered successfully.

---

**Test Case Title:** NTC-06: Enter late fee

**Steps:**
1. Enter `10` in the **Late fee** field.

**Expected Result:** Late fee is entered successfully.

---

**Test Case Title:** NTC-07: Enter payment description

**Steps:**
1. Enter description text in the description field.

**Expected Result:** Description is entered successfully.

---

**Test Case Title:** NTC-08: Open due date calendar

**Steps:**
1. Click **Select Date**.

**Expected Result:** Calendar bottom pop-up appears with heading **Select Due Date**.

---

**Test Case Title:** NTC-09: Select due date one week ahead

**Steps:**
1. Select a date that is 7 days from today.

**Expected Result:** Due date is selected in the calendar.

---

**Test Case Title:** NTC-10: Confirm selected due date

**Steps:**
1. Click **Done**.

**Expected Result:** Calendar closes and due date is applied.

---

**Test Case Title:** NTC-11: Proceed to Select People step

**Steps:**
1. Click **Next**.

**Expected Result:** **Select People** tab/step of New Request is displayed.

---

**Test Case Title:** NTC-12: Select team and member

**Steps:**
1. Click team **Cinnova Testing**.
2. Select **Cinnova Testing**.

**Expected Result:** Team and member are selected.

---

**Test Case Title:** NTC-13: Click Select All

**Steps:**
1. Click **Select All**.

**Expected Result:** All members in the selection list are selected.

---

**Test Case Title:** NTC-14: Proceed to Review step and send request

**Steps:**
1. Click **Next**.
2. Verify **Review** tab is displayed.
3. Click **Send Request**.
4. Observe the success notification.

**Expected Result:** **Review** tab is displayed and success message **Payment request created** is shown.
