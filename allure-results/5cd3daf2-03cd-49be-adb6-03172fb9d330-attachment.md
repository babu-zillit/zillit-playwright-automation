# Test info

- Name: Calendar >> Member calendar >> verify the create the new event for memebrs and edit → delete a event
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/04_calendarTest.spec.js:34:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[placeholder="Enter Email"]') to be visible

    at Calendar.addOutSiderUser (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/calendar.js:152:26)
    at Calendar.createEventForMember (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/calendar.js:186:9)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/04_calendarTest.spec.js:35:13
```

# Page snapshot

```yaml
- complementary:
  - img "Zillit Logo"
  - img
  - paragraph: Turn on Notification
  - paragraph: Get notified of a new message or call on computer.
  - button "Turn on desktop notification"
  - menu:
    - menuitem "FilmTools Logo Home":
      - img "FilmTools Logo"
      - text: Home
    - menuitem "Email":
      - img
      - text: Email
    - menuitem "FilmTools Logo Tools":
      - img "FilmTools Logo"
      - text: Tools
    - menuitem "FilmTools Logo C & C":
      - img "FilmTools Logo"
      - text: C & C
    - menuitem "FilmTools Logo Settings":
      - img "FilmTools Logo"
      - text: Settings
    - menuitem "FilmTools Logo SOS":
      - img "FilmTools Logo"
      - text: SOS
    - menuitem "question Zillit Help":
      - img "question"
      - text: Zillit Help
    - menuitem "poweroff Logout":
      - img "poweroff"
      - text: Logout
  - img "user"
  - button "Zl automation50 down":
    - strong: Zl automation50
    - img "down"
- main:
  - tablist:
    - tab "Bulletin"
    - tab "Calendar" [selected]
    - tab "Call Sheet"
  - tabpanel "Calendar"
  - button "Add Event"
  - button "Received-Events"
  - button "Created-Events"
  - button "Previous month":
    - img: 
  - button "Next month":
    - img: 
  - heading "September 2025" [level=2]
  - button "month" [pressed]
  - button "week"
  - grid:
    - rowgroup:
      - row "Sunday Monday Tuesday Wednesday Thursday Friday Saturday":
        - columnheader "Sunday": Sun
        - columnheader "Monday": Mon
        - columnheader "Tuesday": Tue
        - columnheader "Wednesday": Wed
        - columnheader "Thursday": Thu
        - columnheader "Friday": Fri
        - columnheader "Saturday": Sat
    - rowgroup:
      - row "August 31, 2025 September 1, 2025 September 2, 2025 September 3, 2025 September 4, 2025 September 5, 2025 September 6, 2025":
        - gridcell "August 31, 2025": "31"
        - gridcell "September 1, 2025": "1"
        - gridcell "September 2, 2025": "2"
        - gridcell "September 3, 2025": "3"
        - gridcell "September 4, 2025": "4"
        - gridcell "September 5, 2025": "5"
        - gridcell "September 6, 2025": "6"
      - row "September 7, 2025 September 8, 2025 September 9, 2025 September 10, 2025 September 11, 2025 September 12, 2025 September 13, 2025":
        - gridcell "September 7, 2025": "7"
        - gridcell "September 8, 2025": "8"
        - gridcell "September 9, 2025": "9"
        - gridcell "September 10, 2025": "10"
        - gridcell "September 11, 2025": "11"
        - gridcell "September 12, 2025": "12"
        - gridcell "September 13, 2025": "13"
      - row "September 14, 2025 September 15, 2025 September 16, 2025 September 17, 2025 September 18, 2025 September 19, 2025 September 20, 2025":
        - gridcell "September 14, 2025": "14"
        - gridcell "September 15, 2025": "15"
        - gridcell "September 16, 2025": "16"
        - gridcell "September 17, 2025": "17"
        - gridcell "September 18, 2025": "18"
        - gridcell "September 19, 2025": "19"
        - gridcell "September 20, 2025": "20"
      - row "September 21, 2025 September 22, 2025 September 23, 2025 September 24, 2025 September 25, 2025 September 26, 2025 September 27, 2025":
        - gridcell "September 21, 2025": "21"
        - gridcell "September 22, 2025": "22"
        - gridcell "September 23, 2025": "23"
        - gridcell "September 24, 2025": "24"
        - gridcell "September 25, 2025": "25"
        - gridcell "September 26, 2025": "26"
        - gridcell "September 27, 2025": "27"
      - row "September 28, 2025 September 29, 2025 September 30, 2025 October 1, 2025 October 2, 2025 October 3, 2025 October 4, 2025":
        - gridcell "September 28, 2025": "28"
        - gridcell "September 29, 2025": "29"
        - gridcell "September 30, 2025": "30"
        - gridcell "October 1, 2025": "1"
        - gridcell "October 2, 2025": "2"
        - gridcell "October 3, 2025": "3"
        - gridcell "October 4, 2025": "4"
      - row "October 5, 2025 October 6, 2025 October 7, 2025 October 8, 2025 October 9, 2025 October 10, 2025 October 11, 2025":
        - gridcell "October 5, 2025": "5"
        - gridcell "October 6, 2025": "6"
        - gridcell "October 7, 2025": "7"
        - gridcell "October 8, 2025": "8"
        - gridcell "October 9, 2025": "9"
        - gridcell "October 10, 2025": "10"
        - gridcell "October 11, 2025": "11"
- dialog "Create New Event Members Personal":
  - button "Close":
    - img "close"
  - paragraph: Create New Event
  - radio "Members" [checked]
  - text: Members
  - radio "Personal"
  - text: Personal * Title
  - textbox "* Title": Babu1
  - text: Full Day
  - switch "Full Day"
  - text: "* Start Date"
  - textbox "* Start Date": Oct 25, 2025
  - img "calendar"
  - text: "* Start Time"
  - combobox "* Start Time"
  - text: 12:45 PM * End Time
  - combobox "* End Time"
  - text: 11:45 PM * End Date
  - textbox "* End Date" [disabled]: Oct 25, 2025
  - img "calendar"
  - text: Repeat Status
  - combobox "Repeat Status"
  - text: Every Day * Repeat End Date
  - textbox "* Repeat End Date": Oct 26, 2025
  - img "calendar"
  - text: Time Zone
  - combobox "Time Zone"
  - text: (GMT+05:30) Asia/Kolkata Add Notification
  - combobox "Add Notification"
  - text: 10 Minute Before Location
  - button "Location": 1706-1709, Central Auto Market, Block B, Sector 16, Noida, Uttar Pradesh 201301, India
  - text: Invitees
  - button "1 invitee"
  - text: "* Call Type"
  - combobox "* Call Type"
  - text: Audio Call
  - checkbox "The organizer will not be a part of this event."
  - text: The organizer will not be a part of this event. Select Color
  - button "#008000"
  - button
  - text: Add Outsider User Add Outsider User
  - button "Reset"
  - text: Description
  - textbox "Description"
  - button "Cancel"
  - button "Submit"
- dialog "Outside User":
  - button "Close":
    - img "close"
  - text: Outside User
  - textbox "Type Email..."
  - img
  - text: No outsider users added
  - button "Submit" [disabled]
```

# Test source

```ts
   52 |
   53 |     async clickAddEvent(){
   54 |         await this.addEvent.click();
   55 |     }
   56 |
   57 |     async navigateToMembers(){
   58 |         await this.membersTab.click();
   59 |     }
   60 |
   61 |     async navigateToPersonal(){
   62 |         await this.personalTab.click();
   63 |     }
   64 |
   65 |     async fillEventName(eventName){
   66 |         await this.eventNameInput.fill(eventName);
   67 |     }
   68 |
   69 |     async selectStartTime(){
   70 |         await this.startDate.click();
   71 |         await this.page.locator('.ant-picker-header-next-btn').click(); // next month
   72 |         await this.page.locator('.ant-picker-cell:not(.ant-picker-cell-disabled) >> text=25').click();
   73 |     }
   74 |
   75 |     async selectEndTime(){
   76 |         await this.endTime.fill('11:45 PM');
   77 |         await this.page.keyboard.press('Enter');
   78 |     }
   79 |
   80 |     async setRepeatStatus(eventRepeatOption){
   81 |         await this.repeatstatus.click();
   82 |
   83 |         const everyDayOption = this.page.locator(`//div[contains(@class, "ant-select-item-option")]//div[text()="${eventRepeatOption}"]`);
   84 |         await everyDayOption.waitFor({ state: 'visible' });
   85 |         await everyDayOption.click();
   86 |
   87 |         const okButton = this.page.locator("//button[@type='button']//span[text()='Ok']");
   88 |         await okButton.waitFor({ state: 'visible' });
   89 |         await okButton.click();
   90 |     }
   91 |
   92 |     async addNotification(notificationOption){
   93 |         await this.notification.click();
   94 |         const notificationTime = this.page.locator(`//div[contains(@class, "ant-select-item-option") and .//div[text()="${notificationOption}"]]`);
   95 |         await notificationTime.waitFor({ state: 'visible' });
   96 |         await notificationTime.click();
   97 |     }
   98 |
   99 |     async chooseLocation(){
  100 |         await this.location.waitFor({ state: 'visible'});
  101 |         await this.location.click();
  102 |         await this.page.waitForTimeout(1000);
  103 |
  104 |         await this.selectButton.waitFor({ state: 'visible' });
  105 |         await this.selectButton.click();
  106 |     }
  107 |
  108 |     async selectInvitees(){
  109 |         await this.invitees.click();
  110 |         
  111 |         await this.allDepartmentTab.waitFor({ state: 'visible', timeout: 10000 });
  112 |         await this.allDepartmentTab.click();
  113 |
  114 |         await this.selectButton.waitFor({ state: 'visible' });
  115 |         await this.selectButton.click();
  116 |     }
  117 |
  118 |     async selectCallType(callTypeOption){
  119 |         await this.callType.click();
  120 |         const callTypeOptions = this.page.locator(`//div[contains(@class, "ant-select-item-option") and .//div[text()="${callTypeOption}"]]`);
  121 |         await callTypeOptions.waitFor({ state: 'visible' });
  122 |         await callTypeOptions.click();
  123 |     }
  124 |
  125 |     async chooseColor(){
  126 |         await this.page.locator('.ant-btn.ant-dropdown-trigger.mt-2').click();
  127 |         await this.page.waitForSelector('.ant-dropdown-menu-item', { state: 'visible' });
  128 |         await this.page.locator('.ant-dropdown-menu-item').first().click();
  129 |
  130 |         try{
  131 |         const colorOptions = this.page.locator('div.flex.cursor-pointer.py-3.items-center.gap-2');
  132 |         const items = await colorOptions.allTextContents();
  133 |         console.log('Color options:', items);
  134 |         const preferredColors = ['GREEN', 'RED', 'BLUE', 'YELLOW'];
  135 |         for (const color of preferredColors) {
  136 |             if (items.includes(color)) {
  137 |                  await colorOptions.filter({ hasText: color }).first().click();
  138 |                  console.log(`Clicked on available color: ${color}`);
  139 |                 break;
  140 |             }
  141 |         }
  142 |         }catch(error){
  143 |         console.error(error);
  144 |         }
  145 |
  146 |     }
  147 |
  148 |     async addOutSiderUser(enterEmail){
  149 |         await this.externalUser.click();
  150 |
  151 |         const emailInput = this.page.locator('[placeholder="Enter Email"]');
> 152 |         await emailInput.waitFor({ state: 'visible', timeout: 10000 });
      |                          ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  153 |         await emailInput.fill(enterEmail);
  154 |
  155 |         const addButton = this.page.locator("//button[@type='button']//span[text()='Add']");
  156 |         await addButton.waitFor({ state: 'visible', timeout: 5000 });
  157 |         await addButton.click();
  158 |
  159 |         const submitButton = this.page.locator('//div[@class="ant-modal-footer"]//span[text()="Submit"]');
  160 |         await submitButton.waitFor({ state: 'visible', timeout: 5000 });
  161 |         await submitButton.click();
  162 |     }
  163 |
  164 |     async fillDiscription(enterDiscription){
  165 |         await this.descriptionInput.fill(enterDiscription);
  166 |     }
  167 |
  168 |     async submitEvent(){
  169 |         await this.submit.click();
  170 |         await this.page.waitForTimeout(4000);
  171 |     }
  172 |
  173 |     async createEventForMember(){
  174 |         await this.clickCalendarTab();
  175 |         await this.clickAddEvent();
  176 |         await this.navigateToMembers();
  177 |         await this.fillEventName('Babu1');
  178 |         await this.selectStartTime();
  179 |         await this.selectEndTime();
  180 |         await this.setRepeatStatus('Every Day');
  181 |         await this.addNotification('10 Minute Before');
  182 |         await this.chooseLocation();
  183 |         await this.selectInvitees();
  184 |         await this.selectCallType('Audio Call');
  185 |         await this.chooseColor();
  186 |         await this.addOutSiderUser('Bhavik@gmail.com');
  187 |         await this.fillDiscription('This meeting for urgent');
  188 |         await this.submitEvent();
  189 |     }
  190 |
  191 |     async fullDay(){
  192 |         const fullDayToggle = this.page.locator('#fullday');
  193 |         const isChecked = await fullDayToggle.getAttribute('aria-checked');
  194 |
  195 |         if (isChecked === 'false') {
  196 |             await fullDayToggle.click();
  197 |         }
  198 |     }
  199 |
  200 |     async createEventForMemberForFullDay(){
  201 |         await this.clickCalendarTab();
  202 |         await this.clickAddEvent();
  203 |         await this.navigateToMembers();
  204 |         await this.fillEventName('Babu2');
  205 |         await this.fullDay();
  206 |         await this.selectStartTime();
  207 |         await this.setRepeatStatus('Every Day');
  208 |         await this.addNotification('One Day Before');
  209 |         await this.chooseLocation();
  210 |         await this.selectInvitees();
  211 |         await this.selectCallType('Audio Call');
  212 |         await this.chooseColor();
  213 |         await this.addOutSiderUser('Bhavik@gmail.com');
  214 |         await this.fillDiscription('This meeting for urgent');
  215 |         await this.submitEvent();
  216 |     }
  217 |
  218 |     async createEventForPersonal(){
  219 |         await this.clickCalendarTab();
  220 |         await this.clickAddEvent();
  221 |         await this.navigateToPersonal();
  222 |         await this.fillEventName('Babu3');
  223 |         await this.selectStartTime();
  224 |         await this.selectEndTime();
  225 |         await this.setRepeatStatus('Every Day');
  226 |         await this.addNotification('10 Minute Before');
  227 |         await this.chooseLocation();
  228 |         await this.chooseColor();
  229 |         await this.fillDiscription('This meeting for urgent');
  230 |         await this.submitEvent();
  231 |     }
  232 |
  233 |     async createEventForPersonalFullDay(){
  234 |         await this.clickCalendarTab();
  235 |         await this.clickAddEvent();
  236 |         await this.navigateToPersonal();
  237 |         await this.fillEventName('Babu4');
  238 |         await this.fullDay();
  239 |
  240 |         await this.selectStartTime();
  241 |         await this.setRepeatStatus('Every Day');
  242 |         await this.addNotification('One Day Before');
  243 |         await this.chooseLocation();
  244 |         await this.chooseColor();
  245 |         await this.fillDiscription('This meeting for urgent');
  246 |         await this.submitEvent();
  247 |     }
  248 |
  249 |     /**
  250 |      * Created-Event Page Actions
  251 |      */ 
  252 |
```