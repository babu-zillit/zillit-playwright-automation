# Test info

- Name: Continuity >> All Department >> verify delete all department continuity scene
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/08_continuityTest.spec.js:55:9

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://qa.zillit.com/home", waiting until "load"

    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/08_continuityTest.spec.js:17:20
```

# Test source

```ts
   1 | import { test } from '@playwright/test';
   2 | import Continuity from "../pages/continuity";
   3 | import UploadMedia from "../actions/media-uploader";
   4 | import logger from "../utils/loggerUtils";
   5 |
   6 | test.describe('Continuity', () => {
   7 |     let context;
   8 |     let page;
   9 |     let uploadmedia;
  10 |     let continuityPage;
  11 |
  12 |     test.beforeAll(async ({ browser }) => {
  13 |         logger.info("browser is launching");
  14 |         context = await browser.newContext();
  15 |         page = await context.newPage();
  16 |
> 17 |         await page.goto('/home');
     |                    ^ Error: page.goto: Target page, context or browser has been closed
  18 |         
  19 |         uploadmedia = new UploadMedia(page);
  20 |         continuityPage = new Continuity(page);
  21 |
  22 |         logger.info('open the project')
  23 |         await uploadmedia.clickProjectName();
  24 |         await continuityPage.clickContinuityTab();
  25 |     });
  26 |
  27 |     test.afterAll(async () => {
  28 |         logger.info('close browser');
  29 |         await context.close();
  30 |     });
  31 |
  32 |
  33 |
  34 |     test.describe('My Department', () => {
  35 |
  36 |         test('verify upload the continuity scene', async () => {
  37 |             await continuityPage.uploadMedia();
  38 |         });
  39 |
  40 |         test('verify continuity scene edit -> forward -> delete', async () => {
  41 |             await continuityPage.openSceneFolder();
  42 |             await continuityPage.edit();
  43 |             await continuityPage.forward();
  44 |             await continuityPage.closeWindow();
  45 |         });   
  46 |     
  47 |     });
  48 |
  49 |     test.describe('All Department', () => {
  50 |
  51 |         test('verify all department continuity scene', async () => {
  52 |             await continuityPage.allDepartmentScene();
  53 |         });
  54 |
  55 |         test('verify delete all department continuity scene', async () => {
  56 |             await continuityPage.delete();
  57 |         });
  58 |
  59 |         test('verify delete my department continuity scene', async () => {
  60 |             await continuityPage.myDepartment();
  61 |             await continuityPage.openSceneFolder();
  62 |             await continuityPage.delete();
  63 |         });
  64 |             
  65 |     });
  66 |
  67 | });
  68 |
  69 |   /**
  70 |    * ENV_TYPE=qa npx playwright test src/tests/08_continuityTest.spec.js --project=chromium --headed
  71 |    */ 
  72 |
```