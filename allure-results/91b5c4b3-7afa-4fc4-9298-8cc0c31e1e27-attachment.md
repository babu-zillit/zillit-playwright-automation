# Test info

- Name: Continuity Script Notes >> Continuity Notes >> verify the forward
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/continuity-script-notesTest.spec.js:192:9

# Error details

```
Error: locator.waitFor: Error: strict mode violation: locator('//div[@class=\'dropDown\']') resolved to 2 elements:
    1) <div class="dropDown">…</div> aka locator('.dropDown').first()
    2) <div class="dropDown">…</div> aka locator('div:nth-child(2) > .self-center > .dropDown')

Call log:
  - waiting for locator('//div[@class=\'dropDown\']') to be visible

    at UploadMedia.handleDropdownAction (/Users/babuyadav/Documents/zillit-playwright-automation/src/actions/media-uploader.js:106:32)
    at UploadMedia.forward (/Users/babuyadav/Documents/zillit-playwright-automation/src/actions/media-uploader.js:147:20)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/continuity-script-notesTest.spec.js:194:31
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
  - button "Zl automation51 down":
    - strong: Zl automation51
    - img "down"
  - superscript
- main:
  - button "arrow-left Back":
    - img "arrow-left"
    - text: Back
  - text: Continuity Script Notes
  - img "folder"
  - text: Selected Takes
  - img
  - img "right"
  - img "folder"
  - text: Daily Progress Report
  - img
  - img "right"
  - img "folder"
  - text: Continuity Notes
  - img
  - img "right"
  - button "history":
    - img "history"
- dialog:
  - button "Close":
    - button "close-square":
      - img "close-square"
    - text: Continuity Notes
  - text: B Babu Web (Caterers)
  - paragraph: Hello How are you
  - paragraph
  - text: Aug 22, 2025 at 04:53 PM
  - img "down"
  - text: B Babu Web (Caterers)
  - img "image Thumbnail"
  - text: babu.pdf File Size - 274.38 KB Aug 22, 2025 at 04:53 PM
  - img "down"
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
   6 |  * 
   7 |  * import expect from '@playwright/test'; // ❌ Invalid for Playwright
   8 |  * import { expect } from '@playwright/test'; // ✅ Correct
   9 |  * 
   10 |  * In Playwright, @playwright/test does not have a default export.
   11 |  * 
   12 |  */
   13 |
   14 | import { expect } from '@playwright/test';
   15 | import logger from "../utils/loggerUtils";
   16 | import { loadJson } from '../utils/jsonUtil';
   17 | const mediapaths = loadJson('mediapaths', 'testdata');
   18 | const startproject = loadJson('startproject', 'testdata');
   19 |
   20 | /**
   21 |  * 
   22 |  * export – Share something from a file
   23 |  * If you use export with any method, function, class or vaiable name means this is available for other files
   24 |  * 
   25 |  * export default class UploadMedia {} : You can import it with any name (no {} needed)
   26 |  * 
   27 |  * export class UploadMedia {} : You must import it with the same name, using {}
   28 |  * 
   29 |  */ 
   30 | export default class UploadMedia {
   31 |
   32 |     constructor(page){
   33 |         this.page = page;
   34 |
   35 |          /**
   36 |           * Project buttons
   37 |           */ 
   38 |          const projectName = startproject.projectName;
   39 |          this.qaProject = page.locator(`text=/${projectName}/i`);
   40 |         //this.qaProject = page.locator('text=/Zl Testing 2nd Jan QA/i');
   41 |         this.productionProject = page.locator('text=/Zl 20 May live/i');
   42 |
   43 |         /**
   44 |          * Message locators
   45 |          */
   46 |         this.typeYourMessage = page.locator('textarea[placeholder="Type your message"]');
   47 |         //this.sendButton = page.locator('span[aria-label="send"]');
   48 |         this.sendButton = page.locator('#send_messages_to_users_button');
   49 |         this.sendingIndicator = page.locator('span[aria-label="clock-circle"]');
   50 |         this.edited = page.locator("//span[text()='Edited']");
   51 |         this.hoverTarget = page.locator("//div[@class='dropDown']");
   52 |
   53 |         /**
   54 |          * Upload inputs
   55 |          */
   56 |         this.attachmentButton = page.locator('button.css-2iw4eq.ant-float-btn.ant-float-btn-primary.ant-float-btn-circle');
   57 |         this.imageUploadButton = page.locator("//div[text()='Image Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
   58 |         this.videoUploadButton = page.locator("//div[text()='Video Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
   59 |         this.audioUploadButton = page.locator("//div[text()='Audio Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
   60 |         this.documentUploadButton = page.locator("//div[text()='Document Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
   61 |         this.locationUploadButton = page.locator("//div[text()='Location Upload']");
   62 |
   63 |         this.selectButton = page.locator("//span[text()='Select']");
   64 |         this.sendMedia = page.locator("text=Send");
   65 |
   66 |         /**
   67 |          * Delete buttons locator
   68 |          */
   69 |         this.deleteButton = page.locator('text="Delete"');
   70 |         this.deleteIcon = page.locator('span[aria-label="delete"]');
   71 |         this.deleteOk = page.getByRole('button', { name: /ok/i });
   72 |
   73 |         /**
   74 |          * ReadBy buttons locator
   75 |          */
   76 |         this.readUserButton = page.locator('//div[contains(@class, "ant-segmented-item-label") and text()="READ USER"]');
   77 |         this.unReadUserButton = page.locator('//div[contains(@class, "ant-segmented-item-label") and text()="UN-READ USER"]');
   78 |         this.closeButton = page.getByRole('button', { name: 'Close' });
   79 |
   80 |         /**
   81 |          * Common locator
   82 |          */
   83 |         this.typeMessage = page.locator('textarea[placeholder="Type a message"]');
   84 |         this.replySendButton =  page.getByRole('button', { name: 'Send' });
   85 |
   86 |         this.confidentialInfoTabButton = this.page.getByText('Confidential Info Tab');
   87 |
   88 |     }
   89 |
   90 |     async clickProjectName(){
   91 |         const hostname = new URL(this.page.url()).hostname;
   92 |         console.log('Current hostname is:', hostname);
   93 |
   94 |         if(hostname === 'qa.zillit.com'){
   95 |             logger.info('QA environment is started...')
   96 |             await this.qaProject.first().click();    
   97 |         } else if(hostname === 'web.zillit.com'){
   98 |             logger.info('Production environment is started...')
   99 |             await this.productionProject.click();
  100 |         } else{
  101 |             console.log("Environment is wrong...");
  102 |         }
  103 |     }
  104 |
  105 |     async handleDropdownAction(optionText){
> 106 |         await this.hoverTarget.waitFor({ state: 'visible' });
      |                                ^ Error: locator.waitFor: Error: strict mode violation: locator('//div[@class=\'dropDown\']') resolved to 2 elements:
  107 |         await this.hoverTarget.hover();
  108 |         await this.hoverTarget.click();
  109 |
  110 |         try{
  111 |             //const liItems = this.page.locator('div[class*="ant-dropdown-placement-topLeft"] li');
  112 |             const liItems = this.page.locator('div[class*="ant-dropdown-placement-"] li');
  113 |             await liItems.first().waitFor({ state: 'visible', timeout: 5000 });
  114 |             const texts = await liItems.allTextContents();
  115 |             console.log('Dropdown list items:', texts);
  116 |             await this.page.waitForTimeout(500);
  117 |             await liItems.filter({ hasText: optionText }).first().click();
  118 |         }catch (error){
  119 |             console.error(`Failed to select dropdown option: ${optionText}`, error);
  120 |         }
  121 |     }
  122 |
  123 |     async sendMessage(){
  124 |         logger.info('[SendMessage] Started sending message...');
  125 |
  126 |         await this.typeYourMessage.fill('Hello How are you');
  127 |         await this.sendButton.click();
  128 |         await this.page.waitForTimeout(2000);
  129 |         await this.sendingIndicator.waitFor({state: 'hidden', timeout: 10000});
  130 |     }
  131 |
  132 |     async edit(){
  133 |         logger.info('[EditMessage] Started edit message...');
  134 |
  135 |         await this.handleDropdownAction('Edit Message');
  136 |         await this.typeMessage.fill('This is message');
  137 |         await this.replySendButton.click();
  138 |
  139 |         await this.page.locator('[aria-label="clock-circle"]').waitFor({ state: 'detached', timeout: 10000 });
  140 |         await this.edited.waitFor({state: 'visible', timeout: 15000})
  141 |         await expect(this.edited).toBeVisible();
  142 |     }
  143 |
  144 |     async forward(){
  145 |         logger.info('[ForwardMessage] Started forward message...');
  146 |
  147 |         await this.handleDropdownAction('Forward');
  148 |         await this.confidentialInfoTabButton.click();
  149 |
  150 |         const popup = this.page.locator('text=Forward Successfully');
  151 |         await expect(popup).toBeVisible({ timeout: 15000 });
  152 |         await expect(popup).toBeHidden({ timeout: 15000 });
  153 |     }
  154 |
  155 |     async readBy(){
  156 |         logger.info('[ReadByMessage] Started readBy message...');
  157 |
  158 |         await this.handleDropdownAction('Read By');
  159 |         await this.closeButton.click();
  160 |     }
  161 |
  162 |     async reply(){
  163 |         logger.info('[ReplyMessage] Started reply message...');
  164 |
  165 |         await this.handleDropdownAction('Reply');
  166 |         await this.typeMessage.fill('Reply message');
  167 |         await this.replySendButton.click();
  168 |     }
  169 |
  170 |     async dropDownListOnReply(optionText){
  171 |         try{
  172 |         const hoverIcon = await this.page.waitForSelector('.right-2.top-2.absolute [aria-label="down"]',{state: 'visible'});
  173 |         await hoverIcon.hover();
  174 |         await this.page.waitForTimeout(300);
  175 |         await hoverIcon.click();
  176 |
  177 |             const dropdown = this.page.locator('div.ant-dropdown:not(.ant-dropdown-hidden)');
  178 |             const liItems = dropdown.locator('li');
  179 |             await liItems.first().waitFor({ state: 'visible', timeout: 5000 });
  180 |
  181 |             const texts = await liItems.allTextContents();
  182 |             console.log('Dropdown list items:', texts);
  183 |
  184 |             await liItems.filter({ hasText: optionText }).first().click();
  185 |         }catch (error){
  186 |             console.error(`Failed to select dropdown option: ${optionText}`, error);
  187 |         }
  188 |     }
  189 |
  190 |     async editReply(){
  191 |         logger.info('[editReply] Started edit reply message...');
  192 |
  193 |         await this.dropDownListOnReply('Edit Message');
  194 |         await this.typeMessage.fill('This is message');
  195 |         await this.replySendButton.click();
  196 |
  197 |         await this.page.locator('[aria-label="clock-circle"]').waitFor({ state: 'detached', timeout: 10000 });
  198 |     }
  199 |
  200 |     async readByReply(){
  201 |         logger.info('[readByReply] Started read By reply message...');
  202 |
  203 |         await this.dropDownListOnReply('Read By')
  204 |         await this.page.waitForTimeout(1000);
  205 |         await this.closeButton.click();
  206 |     }
```