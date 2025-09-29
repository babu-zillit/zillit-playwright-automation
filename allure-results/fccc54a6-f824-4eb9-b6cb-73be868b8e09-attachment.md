# Test info

- Name: Email >> Send Email >> verify send email -> send email with media
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/15_emailTest.spec.js:37:9

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('[placeholder="to"]')

    at Email.sendEmail (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/email.js:42:23)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/15_emailTest.spec.js:39:13
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
  - button "New Email":
    - img
    - text: New Email
  - button "Send":
    - img
    - text: Send
  - button "Attach":
    - img
    - text: Attach
  - button "Save as Draft":
    - img
    - text: Save as Draft
  - button "Discard":
    - img
    - text: Discard
  - button "Inbox":
    - img
    - text: Inbox
  - button "Sent":
    - img
    - text: Sent
  - button "Drafts":
    - img
    - text: Drafts
  - button "Junk":
    - img
    - text: Junk
  - button "Trash":
    - img
    - text: Trash
  - button "Distributed Mails":
    - img
    - text: Distributed Mails
  - paragraph: Folders
  - button:
    - img
  - button "Distribution":
    - img
    - text: Distribution
  - paragraph: Settings
  - button "Import Contacts":
    - img
    - paragraph: Import Contacts
  - button "Add/Edit BCC Presets":
    - img
    - paragraph: Add/Edit BCC Presets
  - button "Create Email Group":
    - img
    - paragraph: Create Email Group
  - button "Email Setup Externally":
    - img
    - paragraph: Email Setup Externally
  - button:
    - img
  - img
  - textbox "Search mail..."
  - button "user":
    - img "user"
  - button:
    - img
  - img
  - text: No emails found
  - paragraph: From
  - paragraph: babuweb.zlautomation50@zillit.info
  - paragraph: To *
  - textbox "To"
  - paragraph: cc
  - textbox "cc"
  - paragraph: bcc
  - textbox "bcc"
  - paragraph: subject
  - textbox "subject"
  - button "Normal":
    - text: Normal
    - img
  - button "bold":
    - img "bold"
  - button "italic":
    - img "italic"
  - button "underline":
    - img "underline"
  - button "strikethrough":
    - img "strikethrough"
  - button:
    - img
  - button:
    - img
  - button:
    - img
  - button:
    - img
  - button:
    - img
  - button:
    - img
  - button "link":
    - img "link"
  - paragraph
```

# Test source

```ts
   1 |
   2 | import { loadJson } from '../utils/jsonUtil';
   3 | const mediapaths = loadJson('mediapaths', 'testdata');
   4 |
   5 | export default class Email {
   6 |
   7 |     constructor(page){
   8 |         this.page = page;
   9 |
   10 |         this.email = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Email"]');
   11 |         
   12 |         this.inbox = page.locator('//div[contains(@class,"flex items-center")]//span[text()="Inbox"]');
   13 |         this.synchronusEmail = page.locator('//p[@class=" flex items-center gap-2"]');
   14 |
   15 |         this.newEmail = page.locator('//button//span[text()="New Email"]');
   16 |         this.to = page.locator('[placeholder="to"]');
   17 |         this.cc = page.locator('[placeholder="cc"]');
   18 |         this.subject = page.locator('[placeholder="subject"]');
   19 |         this.typeMessage = page.locator('[class="ql-editor ql-blank"]');
   20 |
   21 |         this.button = page.locator('//div[@class="flex items-center"]//button');
   22 |         this.attach = page.locator('//div[@class="flex items-center"]//button//span[text()="Attach"]');
   23 |         this.attachment = page.locator('//input[@type="file" and @name="email_attachment"]');
   24 |
   25 |         this.sentButton = page.locator('//div[contains(@class,"flex items-center")]//span[text()="Sent"]');
   26 |     }
   27 |
   28 |     
   29 |     async clickEmailTab(){
   30 |         await this.email.click();
   31 |     }
   32 |
   33 |     async loadEmailPageFully(){
   34 |         await this.inbox.waitFor({ state: 'visible' });
   35 |         const syncingEmails = await this.synchronusEmail;
   36 |         await syncingEmails.waitFor({ state: 'visible' });
   37 |         await syncingEmails.waitFor({ state: 'detached' });
   38 |     }
   39 |
   40 |     async sendEmail(){
   41 |         await this.newEmail.click();
>  42 |         await this.to.fill('Bhavik@zillit.com');
      |                       ^ Error: locator.fill: Target page, context or browser has been closed
   43 |         await this.page.keyboard.press('Enter');
   44 |
   45 |         await this.cc.fill('pramod@zillit.com');
   46 |         await this.page.keyboard.press('Enter');
   47 |
   48 |         await this.subject.fill('Regarding emergency leave');
   49 |         await this.typeMessage.fill('Hii,\nI hope you are doing well.\nI would like to request emergency leave for today.\n \nRegads\nBabu');
   50 |         await this.button.first().click();
   51 |
   52 |         const successMsg = await this.page.locator('text=Email sent successfully');
   53 |         await successMsg.waitFor({ state: 'visible' });
   54 |         await successMsg.waitFor({ state: 'hidden' });
   55 |     }
   56 |
   57 |     async attachMedia(){
   58 |         await this.attach.click();
   59 |         await this.page.waitForTimeout(500);
   60 |         await this.attachment.setInputFiles(mediapaths.image);
   61 |         const loading = await this.page.locator('[aria-label="loading"]');
   62 |         await loading.waitFor({ state: 'visible'});
   63 |         await loading.waitFor({ state: 'detached'});
   64 |     }
   65 |
   66 |     async sendEmailMedia(){
   67 |         await this.newEmail.click();
   68 |         await this.to.fill('Bhavik@zillit.com');
   69 |         await this.page.keyboard.press('Enter');
   70 |
   71 |         await this.cc.fill('pramod@zillit.com');
   72 |         await this.page.keyboard.press('Enter');
   73 |
   74 |         await this.subject.fill('Regarding emergency leave');
   75 |         await this.typeMessage.fill('Hii,\nI hope you are doing well.\nI would like to request emergency leave for today.\n \nRegads\nBabu');
   76 |         
   77 |         await this.attachMedia();
   78 |
   79 |         await this.button.first().click();
   80 |
   81 |         const successMsg = await this.page.locator('text=Email sent successfully');
   82 |         await successMsg.waitFor({ state: 'visible' });
   83 |         await successMsg.waitFor({ state: 'hidden' });
   84 |     }
   85 |
   86 |     async sentMessage(){
   87 |         await this.sentButton.click();
   88 |         //await this.page.waitForTimeout(2000);
   89 |         const sent = await this.page.locator('//span[text()="bhavik@zillit.com"]');
   90 |         const count = await sent.count();
   91 |
   92 |         if(count ==1){
   93 |             await sent.click();
   94 |         } else if(count > 1){
   95 |             await sent.first().click();
   96 |         } else {
   97 |             console.log('Sent email not available');
   98 |         }
   99 |
  100 |         await this.page.waitForTimeout(2000);
  101 |     }
  102 |
  103 |
  104 |
  105 |
  106 | }
```