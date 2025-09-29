# Test info

- Name: Email >> Send Email >> verify sent email
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/15_emailTest.spec.js:43:9

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://qa.zillit.com/home", waiting until "load"

    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/15_emailTest.spec.js:18:20
```

# Test source

```ts
   1 | import { test } from '@playwright/test';
   2 | import Email from "../pages/email";
   3 | import UploadMedia from "../actions/media-uploader";
   4 | import logger from "../utils/loggerUtils";
   5 | import { execPath } from 'process';
   6 |
   7 | test.describe('Email', () => {
   8 |     let context;
   9 |     let page;
  10 |     let uploadmedia;
  11 |     let emailPage;
  12 |
  13 |     test.beforeAll(async ({ browser }) => {
  14 |         logger.info("browser is launching");
  15 |         context = await browser.newContext();
  16 |         page = await context.newPage();
  17 |
> 18 |         await page.goto('/home');
     |                    ^ Error: page.goto: Target page, context or browser has been closed
  19 |         
  20 |         uploadmedia = new UploadMedia(page);
  21 |         emailPage = new Email(page);
  22 |
  23 |         logger.info('open the project')
  24 |         await uploadmedia.clickProjectName();
  25 |         await emailPage.clickEmailTab();
  26 |     });
  27 |
  28 |     test.afterAll(async () => {
  29 |         logger.info('close browser');
  30 |         await context.close();
  31 |     });
  32 |
  33 |
  34 |
  35 |     test.describe('Send Email', () => {
  36 |
  37 |         test('verify send email -> send email with media', async () => {
  38 |             await emailPage.loadEmailPageFully();
  39 |             await emailPage.sendEmail();
  40 |             await emailPage.sendEmailMedia();
  41 |         }); 
  42 |
  43 |         test('verify sent email', async () => {
  44 |             await emailPage.sentMessage();
  45 |         });
  46 |     
  47 |     });
  48 |
  49 | });
  50 |
  51 |   /**
  52 |    * ENV_TYPE=qa npx playwright test src/tests/15_emailTest.spec.js --project=chromium --headed
  53 |    */ 
  54 |
```