# Test info

- Name: Catering >> Catering unit > creation, edition, deletion >> verify create unit
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/10_cateringTest.spec.js:127:9

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://qa.zillit.com/home
Call log:
  - navigating to "https://qa.zillit.com/home", waiting until "load"

    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/10_cateringTest.spec.js:18:20
```

# Page snapshot

```yaml
- heading "No Internet" [level=1]
- paragraph: "Try:"
- list:
  - listitem: Checking the network cables, modem and router
  - listitem: Reconnecting to Wi-Fi
- text: ERR_INTERNET_DISCONNECTED
- application "Dino game, press space to play"
```

# Test source

```ts
   1 | //src/tests/calendarTest.spec.js
   2 | import { test } from '@playwright/test';
   3 | import Catering from "../pages/catering";
   4 | import UploadMedia from "../actions/media-uploader";
   5 | import logger from "../utils/loggerUtils";
   6 |
   7 | test.describe('Catering', () => {
   8 |     let context;
   9 |     let page;
   10 |     let uploadmedia;
   11 |     let cateringPage;
   12 |
   13 |     test.beforeAll(async ({ browser }) => {
   14 |         logger.info("browser is launching");
   15 |         context = await browser.newContext();
   16 |         page = await context.newPage();
   17 |
>  18 |         await page.goto('/home');
      |                    ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://qa.zillit.com/home
   19 |         
   20 |         uploadmedia = new UploadMedia(page);
   21 |         cateringPage = new Catering(page);
   22 |
   23 |         logger.info('open the project')
   24 |         await uploadmedia.clickProjectName();
   25 |         await cateringPage.clickCateringTab();
   26 |     });
   27 |
   28 |     test.afterAll(async () => {
   29 |         logger.info('close browser');
   30 |         await context.close();
   31 |     });
   32 |
   33 |     test.describe('User change the department', () => {
   34 |
   35 |         test('verify user become cater department', async () => {
   36 |             await cateringPage.openEditProfile();
   37 |             await cateringPage.changeDepartmentAndDesignation('Catering', 'Caterers');
   38 |         }); 
   39 |     
   40 |     });
   41 |
   42 |     test.describe('Send Message', () => {
   43 |
   44 |         test('verify send a message', async () => {
   45 |             await cateringPage.clickCateringTab();
   46 |             await cateringPage.selectUser();
   47 |             await uploadmedia.sendMessage();
   48 |         });  
   49 |     
   50 |         test('verify edit the message', async () => {
   51 |             await uploadmedia.edit();
   52 |         });
   53 |
   54 |         test('verify forward the message', async () => {
   55 |             await uploadmedia.forward();
   56 |         });
   57 |
   58 |         test('verify the delete message', async () => {
   59 |             await cateringPage.selectUser();
   60 |             await uploadmedia.delete();
   61 |         });
   62 |
   63 |     });
   64 |
   65 |     test.describe('Send Image', () => {
   66 |
   67 |         test('verify the send a image', async () => {
   68 |             await cateringPage.selectUser();
   69 |             await uploadmedia.clickAttachment();
   70 |             await uploadmedia.uploadImage();
   71 |             await uploadmedia.clickSendMedia();
   72 |         });
   73 |
   74 |         test('verify the forward', async () => {
   75 |             await uploadmedia.forward();
   76 |         });
   77 |
   78 |         test('verify the delete image', async () => {
   79 |             await cateringPage.selectUser();
   80 |             await uploadmedia.delete();
   81 |         });
   82 |
   83 |     });
   84 |
   85 |     test.describe('Send Document', () => {
   86 |
   87 |         test('verify the send a document', async () => {
   88 |             await cateringPage.selectUser();
   89 |             await uploadmedia.clickAttachment();
   90 |             await uploadmedia.uploadDocument();
   91 |         });
   92 |
   93 |         test('verify the forward', async () => {
   94 |             await uploadmedia.forward();
   95 |         });
   96 |
   97 |         test('verify the delete document', async () => {
   98 |             await cateringPage.selectUser();
   99 |             await uploadmedia.delete();
  100 |         });
  101 |
  102 |     });
  103 |
  104 |     test.describe('Send Audio', () => {
  105 |
  106 |         test('verify the send a audio', async () => {
  107 |             await cateringPage.selectUser();
  108 |             await uploadmedia.clickAttachment();
  109 |             await uploadmedia.uploadAudio();
  110 |         });
  111 |
  112 |         test('verify the forward', async () => {
  113 |             await uploadmedia.forward();
  114 |         });
  115 |
  116 |         test('verify the delete audio', async () => {
  117 |             await cateringPage.selectUser();
  118 |             await uploadmedia.delete();
```