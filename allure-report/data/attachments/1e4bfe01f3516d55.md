# Test info

- Name: Upload media tests >> upload document
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/upload-mediaTest.spec.js:105:3

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('//div[@class=\'dropDown\']') to be visible

    at UploadMedia.moveElement (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/upload-media.js:94:32)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/upload-mediaTest.spec.js:109:24
```

# Page snapshot

```yaml
- complementary:
  - img "Zillit Logo"
  - img
  - paragraph: Turn on Notification
  - paragraph: Get notified of a new message or call on computer.
  - button "Turn on desktop notification"
  - img
  - button "Zl Testing 2... down":
    - strong: Zl Testing 2...
    - img "down"
  - superscript
  - menu:
    - menuitem "FilmTools Logo Home":
      - img "FilmTools Logo"
      - text: Home
    - menuitem "Email":
      - img
      - text: Email
    - menuitem "FilmTools Logo Tools 2 7":
      - img "FilmTools Logo"
      - text: Tools
      - superscript: 2 7
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
- main:
  - tablist:
    - tab "Bulletin" [selected]
    - tab "Calendar"
    - tab "Call Sheet"
    - tab "Babu1"
    - tab "Babu2"
  - tabpanel "Bulletin"
  - text: B Babu Android (1st Ac - A camera)
  - img "image Thumbnail"
  - text: babu.pdf
  - img "loading"
  - text: File Size - 274.38 KB Jun 11, 2025 at 01:03 PM
  - button
  - button "paper-clip":
    - img "paper-clip"
  - img "smile"
  - textbox "Type your message"
  - button "audio":
    - img "audio"
  - button "search":
    - img "search"
```

# Test source

```ts
   1 | //src/pages/upload-media.js
   2 | import { expect } from '@playwright/test';
   3 |
   4 | export default class UploadMedia {
   5 |
   6 |     constructor(page){
   7 |         this.page = page;
   8 |
   9 |         this.clickProjectName = page.locator('text=/Zl Testing 2nd Jan QA/i');
   10 |         this.typeYourMessage = page.locator('textarea[placeholder="Type your message"]');
   11 |         this.clickAttachment = page.locator('button.css-2iw4eq.ant-float-btn.ant-float-btn-primary.ant-float-btn-circle');
   12 |         this.clickImage = page.locator("//div[text()='Image Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
   13 |         this.clickVideo = page.locator("//div[text()='Video Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
   14 |         this.clickAudio = page.locator("//div[text()='Audio Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
   15 |         this.clickDocument = page.locator("//div[text()='Document Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
   16 |         this.clickClose = page.locator('text=Close');
   17 |
   18 |         this.hoverTarget = page.locator("//div[@class='dropDown']");
   19 |         this.deleteButton = page.locator("text=Delete");
   20 |         this.deleteIcon = page.locator("//*[@data-icon='delete']");
   21 |         this.deleteOk = page.locator("text=Ok");
   22 |         this.deletionSuccessPopup = page.locator("text=Message Deleted successfully");
   23 |
   24 |         this.sendButton = page.locator("[aria-label='send']");
   25 |         this.sendMedia = page.locator("text=Send");
   26 |
   27 |         this.settingsButton = page.locator("text=Settings");
   28 |         this.editProfileButton = page.locator("text=Edit Profile");
   29 |         this.selectorButton = page.locator('(//div[@class="ant-select-selector"])[1]');
   30 |
   31 |         this.designationButton = page.locator("(//span[@class='ant-select-selection-item'])[2]");
   32 |     }
   33 |
   34 |     async clickOnProjectName(){
   35 |         await this.clickProjectName.click();
   36 |     }
   37 |
   38 |     async sendText(enterMessage){
   39 |         await this.typeYourMessage.fill(enterMessage);
   40 |     }
   41 |
   42 |     async attachment(){
   43 |         await this.clickAttachment.click();
   44 |     }
   45 |
   46 |     async uploadImage(filePath){
   47 |         await this.clickImage.setInputFiles(filePath);
   48 |     }
   49 |
   50 |     async uploadVideo(filePath){
   51 |         await this.clickVideo.setInputFiles(filePath);
   52 |     }
   53 |
   54 |     async uploadAudio(filePath){
   55 |         // Wait until the input is attached to the DOM
   56 |         await this.clickAudio.waitFor({ state: 'attached' });
   57 |         // Upload the file
   58 |         await this.clickAudio.setInputFiles(filePath);
   59 |         await this.page.locator("text=Send").click();
   60 |         await this.page.locator('[class="w-4 h-4 text-white dark:text-white "]').waitFor({ state: 'visible' }); 
   61 |     }
   62 |
   63 |     async uploadDocument(filePath){
   64 |         await this.clickDocument.setInputFiles(filePath);
   65 |         await this.page.locator("text=Send").click();
   66 |         await this.page.waitForTimeout(5000);
   67 |     }
   68 |
   69 |     async clickSend(){
   70 |         await this.sendButton.waitFor({ state: 'visible'});
   71 |         await this.sendButton.click();
   72 |     }
   73 |
   74 |     async clickSendMedia(){
   75 |         await this.sendMedia.click();
   76 |         
   77 |         // Wait for "sending" (case-insensitive) to appear
   78 |         await this.page.waitForSelector('text=/sending/i', { state: 'visible' });
   79 |
   80 |         // Wait for "sending" (case-insensitive) to disappear
   81 |         await this.page.waitForSelector('text=/sending/i', { state: 'hidden' });
   82 |
   83 |         // Wait for "File Size" (case-insensitive) to appear
   84 |         await this.page.waitForSelector('text=/file size/i', { state: 'visible' });
   85 |     }
   86 |
   87 |     // async close(){
   88 |     //     await this.clickClose.waitFor({ state: 'visible', timeout: 10000 });
   89 |     //     await this.clickClose.click();
   90 |     // }
   91 |
   92 |     async moveElement(){
   93 |         // Wait for the element to be visible before hovering
>  94 |         await this.hoverTarget.waitFor({ state: 'visible' });
      |                                ^ Error: locator.waitFor: Target page, context or browser has been closed
   95 |         // Hover over the element
   96 |         await this.hoverTarget.hover();
   97 |     }
   98 |
   99 |     async delete() {
  100 |         await this.deleteButton.click();
  101 |         await this.deleteIcon.click();
  102 |         await this.deleteOk.click();
  103 |         const popup = this.page.locator("text=Message Deleted successfully");
  104 |         //await expect(popup).toBeVisible();
  105 |         //await expect(popup).toBeHidden(); 
  106 |         await popup.waitFor({ state: 'visible', timeout: 15000 });
  107 |         await expect(popup).toBeVisible();
  108 |         await popup.waitFor({ state: 'hidden', timeout: 15000 });
  109 |         console.log("disaaper the delete pop up");
  110 |     }
  111 |
  112 |     async settings() {
  113 |         await this.settingsButton.click();
  114 |         await this.editProfileButton.click();
  115 |     
  116 |         // Open the dropdown by clicking the selector
  117 |         await this.selectorButton.waitFor({ state: 'visible' });
  118 |         await this.selectorButton.click();
  119 |         await this.clickClose.waitFor({ state: 'visible', timeout: 10000 });
  120 |         await this.clickClose.click();
  121 |         await this.selectorButton.click();
  122 |     
  123 |         // Wait for the dropdown options to appear
  124 |         const options = this.page.locator('.ant-select-dropdown .ant-select-item-option');
  125 |         await options.first().waitFor({ state: 'visible' });
  126 |     
  127 |         // Get all the text content of the dropdown options
  128 |         const optionTexts = await options.allTextContents();
  129 |         console.log('Dropdown Options:', optionTexts);
  130 |
  131 |         // Click the option with text "Accounts"
  132 |         const accountsOption = this.page.locator('.ant-select-dropdown .ant-select-item-option', { hasText: 'Accounts' });
  133 |         await accountsOption.click();
  134 |         //await this.page.waitForTimeout(5000);
  135 |
  136 |         await this.designationButton.click();
  137 |
  138 |         // Wait for the dropdown options to appear
  139 |         const optionsDesig = this.page.locator('.ant-select-dropdown .ant-select-item-option');
  140 |         // Wait for the dropdown to load options (check that at least one option exists)
  141 |         await optionsDesig.first().waitFor({ state: 'attached' });
  142 |         await optionsDesig.first().waitFor({ state: 'visible' });
  143 |
  144 |         // Get all the text content of the dropdown options
  145 |         const optionDesignation = await optionsDesig.allTextContents();
  146 |         console.log('Dropdown Options:', optionDesignation);
  147 |
  148 |         const accountsFirst = this.page.locator('.ant-select-dropdown .ant-select-item-option', { hasText: '1st Assistant Accountant' });
  149 |         await accountsFirst.click();
  150 |         await this.page.waitForTimeout(5000);
  151 |
  152 |     }
  153 |
  154 |     async deleteMultiple(){
  155 |         const items = await this.page.locator('[class="dropDown"]').all();
  156 |         const totalCount = items.length;
  157 |         
  158 |         if(totalCount === 0){
  159 |         console.log('No elements found to hover on.');
  160 |         return;
  161 |         }
  162 |
  163 |         await items[totalCount - 1].hover();
  164 |         await this.deleteButton.click();
  165 |
  166 |         const checkboxes = await this.page.locator('[class="ant-checkbox-input"]').all();
  167 |         for (const checkbox of checkboxes) {
  168 |         const isChecked = await checkbox.isChecked().catch(() => false); // fallback if isChecked() not available
  169 |         if (!isChecked) {
  170 |         await checkbox.click();
  171 |         await this.page.waitForTimeout(1000);
  172 |         }
  173 |     //    await this.deleteIcon.click();
  174 |     //     await this.deleteOk.click();
  175 |     //     const popup = this.page.locator("text=Message Deleted successfully");
  176 |     //     await expect(popup).toBeVisible();
  177 |     //     await expect(popup).toBeHidden(); 
  178 |     //     console.log("disaaper the delete pop up"); 
  179 |     }
  180 |
  181 |  }
  182 |
  183 | }
  184 |
```