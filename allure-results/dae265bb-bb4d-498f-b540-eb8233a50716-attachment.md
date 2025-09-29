# Test info

- Name: Accounts >> Send Message >> verify reply to the message
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/09_accountTest.spec.js:57:9

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://qa.zillit.com/home", waiting until "load"

    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/09_accountTest.spec.js:17:20
```

# Test source

```ts
   1 | import { test } from '@playwright/test';
   2 | import Accounts from "../pages/accounts";
   3 | import UploadMedia from "../actions/media-uploader";
   4 | import logger from "../utils/loggerUtils";
   5 |
   6 | test.describe('Accounts', () => {
   7 |     let context;
   8 |     let page;
   9 |     let uploadmedia;
   10 |     let accountPage;
   11 |
   12 |     test.beforeAll(async ({ browser }) => {
   13 |         logger.info("browser is launching");
   14 |         context = await browser.newContext();
   15 |         page = await context.newPage();
   16 |
>  17 |         await page.goto('/home');
      |                    ^ Error: page.goto: Target page, context or browser has been closed
   18 |         
   19 |         uploadmedia = new UploadMedia(page);
   20 |         accountPage = new Accounts(page);
   21 |
   22 |         logger.info('open the project')
   23 |         await uploadmedia.clickProjectName();
   24 |         await accountPage.clickAccountTab();
   25 |     });
   26 |
   27 |     test.afterAll(async () => {
   28 |         logger.info('close browser');
   29 |         await context.close();
   30 |     });
   31 |
   32 |     test.describe('Account', () => {
   33 |
   34 |         test('verify user become the accountant', async () => {
   35 |             await accountPage.openEditProfile();
   36 |             await accountPage.changeDepartmentAndDesignation('Accounts','1st Assistant Accountant');
   37 |             await accountPage.clickAccountTab();
   38 |             await accountPage.selectUser();
   39 |         }); 
   40 |     
   41 |     });
   42 |
   43 |     test.describe('Send Message', () => {
   44 |
   45 |         test('verify send a message', async () => {
   46 |             await uploadmedia.sendMessage();
   47 |         });  
   48 |     
   49 |         test('verify edit the message', async () => {
   50 |             await uploadmedia.edit();
   51 |         });
   52 |
   53 |         test('verify forward the message', async () => {
   54 |             await uploadmedia.forward();
   55 |         });
   56 |
   57 |         test('verify reply to the message', async () => {
   58 |             await uploadmedia.reply();
   59 |         });
   60 |
   61 |         test('verify the edit the reply message', async () => {
   62 |             await accountPage.selectUser();
   63 |             await uploadmedia.editReply();
   64 |         });
   65 |
   66 |         test('verify the delete the reply message', async () => {
   67 |             await uploadmedia.deleteReply();
   68 |         });
   69 |
   70 |         test('verify the delete message', async () => {
   71 |             await accountPage.selectUser();
   72 |             await uploadmedia.delete();
   73 |         });
   74 |
   75 |     });
   76 |
   77 |     test.describe('Send Image', () => {
   78 |         test('verify the send a image', async () => {
   79 |             await accountPage.selectUser();
   80 |             await uploadmedia.clickAttachment();
   81 |             await uploadmedia.uploadImage();
   82 |             await uploadmedia.clickSendMedia();
   83 |         });
   84 |
   85 |         test('verify the forward', async () => {
   86 |             await uploadmedia.forward();
   87 |         });
   88 |
   89 |         test('verify the reply', async () => {
   90 |             await uploadmedia.reply();
   91 |         });
   92 |
   93 |         test('verify the edit reply', async () => {
   94 |             await accountPage.selectUser();
   95 |             await uploadmedia.editReply();
   96 |         });
   97 |
   98 |         test('verify the delete reply', async () => {
   99 |             await uploadmedia.deleteReply();
  100 |         });
  101 |
  102 |         test('verify the delete image', async () => {
  103 |             await accountPage.selectUser();
  104 |             await uploadmedia.delete();
  105 |         });
  106 |
  107 |     });
  108 |
  109 |     test.describe('Send Document', () => {
  110 |         test('verify the send a document', async () => {
  111 |             await accountPage.selectUser();
  112 |             await uploadmedia.clickAttachment();
  113 |             await uploadmedia.uploadDocument();
  114 |         });
  115 |
  116 |         test('verify the forward', async () => {
  117 |             await uploadmedia.forward();
```