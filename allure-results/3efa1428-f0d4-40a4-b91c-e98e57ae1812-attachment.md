# Test info

- Name: Continuity Script Notes >> Continuity Notes >> send message2
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/continuity-script-notesTest.spec.js:185:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('//div[contains(@class,"text-end")]//button').first()

    at ContinuityScriptNotes.uploadDocument (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/continuity-script-notes.js:114:87)
    at ContinuityScriptNotes.uploadDocumentByClickingNew (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/continuity-script-notes.js:65:9)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/continuity-script-notesTest.spec.js:189:13
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
  - text: Doing this will send all current data, posted here, to the File Cabinet. It will be replaced with the new upload. Do you still want to proceed?
  - button "Yes"
  - button "No"
  - button "file-pdf":
    - img "file-pdf"
  - text: Document Upload
  - button "close":
    - img "close"
  - img "smile"
  - textbox "Type your message"
  - button "audio":
    - img "audio"
  - button "search":
    - img "search"
```

# Test source

```ts
   14 |         this.attachment = page.locator('[class="css-2iw4eq ant-float-btn ant-float-btn-primary ant-float-btn-circle"]');
   15 |         this.continuation = page.locator('//div[contains(@class,"justify-evenly")]//button//span[text()=" Continuation "]');
   16 |         this.newButton = page.locator('//div[contains(@class,"justify-evenly")]//button//span[text()=" New "]');
   17 |         this.yesButton = page.locator('//div[contains(@class,"justify-evenly")]//button//span[text()=" Yes "]');
   18 |
   19 |         this.continuityNotesTileName = page.locator('//div[contains(@class,"mt-4")]//img');
   20 |         this.enterEpisode = page.locator('#episode');
   21 |     }
   22 |
   23 |     async continuityScriptNotesTab() {
   24 |         await this.tools.click();
   25 |         await this.page.locator('div.ant-card-body').getByText('Continuity Script Notes').click();
   26 |     }
   27 |
   28 |     async selectedTakesTab() {
   29 |         await this.continuityNotesTileName.nth(0).click();
   30 |     }
   31 |
   32 |     async dailyProgressNotesTab() { 
   33 |         await this.continuityNotesTileName.nth(1).click();
   34 |     }
   35 |
   36 |     async continuityNotesTab() {
   37 |         await this.continuityNotesTileName.nth(2).click();
   38 |     }
   39 |
   40 |     async clickContinuation(){
   41 |         await this.continuation.click();
   42 |     }
   43 |     
   44 |     async clickNew(){
   45 |         await this.newButton.click();
   46 |         await this.yesButton.click();
   47 |     }
   48 |
   49 |
   50 |     async clickAttachment(){
   51 |         await this.attachment.click();
   52 |     }
   53 |
   54 |
   55 |     async uploadDocumentByClickingContinuation(){
   56 |         await this.clickAttachment();
   57 |         await this.clickContinuation();
   58 |         await this.uploadDocument();
   59 |     }
   60 |
   61 |
   62 |     async uploadDocumentByClickingNew(){
   63 |         await this.clickAttachment();
   64 |         await this.clickNew();
   65 |         await this.uploadDocument();
   66 |         await this.page.waitForTimeout(3000);
   67 |     }
   68 |
   69 |
   70 |     async sendScriptConfirmation(){
   71 |         await this.enterEpisode.fill('9');
   72 |         await this.page.locator('//div[contains(@class,"flex justify-end")]//button').first().click();
   73 |     }
   74 |
   75 |     async uploadDocument() {
   76 |         const filePath = '/Users/babuyadav/Desktop/babu.pdf';
   77 |
   78 |         const appleScript = `
   79 |             tell application "System Events"
   80 |             delay 1
   81 |             keystroke "G" using {command down, shift down}
   82 |             delay 1
   83 |             keystroke "${filePath}"
   84 |             delay 1
   85 |             key code 36
   86 |             delay 1
   87 |             key code 36
   88 |             end tell
   89 |         `;
   90 |
   91 |         // 🔧 Save AppleScript to a temp file
   92 |         const tempScriptPath = path.join(os.tmpdir(), 'uploadFile.scpt');
   93 |         await fs.writeFile(tempScriptPath, appleScript);
   94 |
   95 |         const runAppleScript = () => {
   96 |             return new Promise((resolve, reject) => {
   97 |             exec(`osascript ${tempScriptPath}`, (error, stdout, stderr) => {
   98 |                 fs.unlink(tempScriptPath); // cleanup
   99 |                 if (error) reject(error);
  100 |                 else resolve(stdout);
  101 |             });
  102 |             });
  103 |         };
  104 |
  105 |         try {
  106 |             await runAppleScript();
  107 |             console.log('✅ AppleScript ran successfully');
  108 |         } catch (err) {
  109 |             console.error('❌ AppleScript error:', err.message);
  110 |             throw err;
  111 |         }
  112 |  
  113 |         //await this.page.locator('text=Send').click();
> 114 |         await this.page.locator('//div[contains(@class,"text-end")]//button').first().click();
      |                                                                                       ^ Error: locator.click: Target page, context or browser has been closed
  115 |
  116 |         await this.sendScriptConfirmation();
  117 |
  118 |         await this.page.locator('[data-icon="loading"]').waitFor({ state: 'hidden', timeout: 15000 });
  119 |     }
  120 |
  121 |
  122 | }
```