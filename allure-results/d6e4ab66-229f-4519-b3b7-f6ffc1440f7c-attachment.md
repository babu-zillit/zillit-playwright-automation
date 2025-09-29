# Test info

- Name: CnC >> send message >> verify user reply message
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/20_cncTest.spec.js:45:10

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://qa.zillit.com/home", waiting until "load"

    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/20_cncTest.spec.js:17:20
```

# Test source

```ts
   1 | import { test } from '@playwright/test';
   2 | import CnC from "../pages/cnc";
   3 | import UploadMedia from "../actions/media-uploader";
   4 | import logger from "../utils/loggerUtils";
   5 |
   6 | test.describe('CnC', () => {
   7 |     let context;
   8 |     let page;
   9 |     let uploadmedia;
   10 |     let cncPage;
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
   20 |         cncPage = new CnC(page);
   21 |
   22 |         logger.info('open the project')
   23 |         await uploadmedia.clickProjectName();
   24 |         await cncPage.openCnC();
   25 |     });
   26 |
   27 |     test.afterAll(async () => {
   28 |         logger.info('close browser');
   29 |         await context.close();
   30 |     });
   31 |
   32 |
   33 |
   34 |     test.describe('send message', () => {
   35 |
   36 |         test('verify user send message', async () => {
   37 |             await cncPage.clickUserProfile();
   38 |             await cncPage.sendMessage();
   39 |         });
   40 |
   41 |         test('verify user forward message', async () => {
   42 |             await cncPage.forward();
   43 |         });
   44 |
   45 |          test('verify user reply message', async () => {
   46 |             await cncPage.reply();
   47 |         });
   48 |
   49 |         test('verify user delete message', async () => {
   50 |             await cncPage.deleteAllMessage();
   51 |         });
   52 |     
   53 |     });
   54 |
   55 |
   56 |     test.describe('send image', () => {
   57 |
   58 |         test('verify user send image', async () => {
   59 |             await cncPage.attachment();
   60 |             await cncPage.imageUpload();
   61 |         });
   62 |
   63 |         test('verify user forward message', async () => {
   64 |             await cncPage.forward();
   65 |         });
   66 |
   67 |         test('verify user save message', async () => {
   68 |             await cncPage.save();
   69 |         });
   70 |
   71 |         test('verify user reply message', async () => {
   72 |             await cncPage.reply();
   73 |         });
   74 |
   75 |         test('verify user delete message', async () => {
   76 |             await cncPage.deleteAllMessage();
   77 |         });
   78 |     
   79 |     });
   80 |
   81 |
   82 |     test.describe('send video', () => {
   83 |
   84 |         test('verify user send image', async () => {
   85 |             await cncPage.attachment();
   86 |             await cncPage.videoUpload();
   87 |         });
   88 |
   89 |         test('verify user forward message', async () => {
   90 |             await cncPage.forward();
   91 |         });
   92 |
   93 |         test('verify user save message', async () => {
   94 |             await cncPage.save();
   95 |         });
   96 |
   97 |         test('verify user reply message', async () => {
   98 |             await cncPage.reply();
   99 |         });
  100 |
  101 |         test('verify user delete message', async () => {
  102 |             await cncPage.deleteAllMessage();
  103 |         });
  104 |     
  105 |     });
  106 |
  107 |         test.describe('send document', () => {
  108 |
  109 |         test('verify user send image', async () => {
  110 |             await cncPage.attachment();
  111 |             await cncPage.documentUpload();
  112 |         });
  113 |
  114 |         test('verify user forward message', async () => {
  115 |             await cncPage.forward();
  116 |         });
  117 |
```