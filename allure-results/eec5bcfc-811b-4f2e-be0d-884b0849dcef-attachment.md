# Test info

- Name: Casting >> Selects Tab >> verify move to shortlist location folder from the location name screen
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/locationTest.spec.js:45:9

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://qa.zillit.com/home", waiting until "load"

    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/locationTest.spec.js:17:20
```

# Test source

```ts
   1 | import { test } from '@playwright/test';
   2 | import Location from "../pages/locations";
   3 | import UploadMedia from "../actions/media-uploader";
   4 | import logger from "../utils/loggerUtils";
   5 |
   6 | test.describe('Casting', () => {
   7 |     let context;
   8 |     let page;
   9 |     let uploadmedia;
   10 |     let locationPage;
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
   20 |         locationPage = new Location(page);
   21 |
   22 |         logger.info('open the project')
   23 |         await uploadmedia.clickProjectName();
   24 |         await locationPage.locationTab();
   25 |     });
   26 |
   27 |     test.afterAll(async () => {
   28 |         logger.info('close browser');
   29 |         await context.close();
   30 |     });
   31 |
   32 |
   33 |
   34 |     test.describe.only('Selects Tab', () => {
   35 |
   36 |         test('verify location upload, open the folder, and view the image', async () => {
   37 |
   38 |              await locationPage.uploadLocation('TajMahal', '90', '1', 'famous for love');
   39 |              await locationPage.verifypopup('Location photograph(s) have been added successfully.');
   40 |              await locationPage.openFolderFirstScreen();
   41 |              await locationPage.openFolderSecondScreen();
   42 |              await locationPage.viewImages(); 
   43 |         }); 
   44 |         
   45 |         test('verify move to shortlist location folder from the location name screen', async () => {
   46 |
   47 |             await locationPage.dropDownArrowAction('selectsTab', 'Move to Shortlist');
   48 |             await locationPage.verifypopup('Location photograph(s) have been added successfully.');
   49 |         });
   50 |
   51 |         test('verify move to finals location folder from the location name screen', async () => {
   52 |
   53 |             await locationPage.dropDownArrowAction('selectsTab', 'Move to Final');
   54 |             await locationPage.verifypopup('Location photograph(s) have been added successfully.');
   55 |         });
   56 |
   57 |         test('verify delete location folder from shortlist', async () => {
   58 |
   59 |             await locationPage.dropDownArrowAction('shortlistTab', 'Delete');
   60 |         });
   61 |
   62 |         test('verify delete location folder from final', async () => {
   63 |
   64 |             await locationPage.dropDownArrowAction('finalsTab', 'Delete');
   65 |         });
   66 |
   67 |         test('verify move to shortlist media from the media screen', async () => {
   68 |
   69 |             await locationPage.selectsTab();
   70 |             await locationPage.moveToFromMediaScreen('Move to Shortlist');
   71 |             await locationPage.verifypopup('Location photograph(s) have been added successfully.');
   72 |             await locationPage.closeImageWindow();
   73 |         });
   74 |
   75 |         test('verify move to finals media from the media screen', async () => {
   76 |
   77 |             await locationPage.moveToFromMediaScreen('Move to Final');
   78 |             await locationPage.verifypopup('Location photograph(s) have been added successfully.');
   79 |             await locationPage.closeImageWindow();
   80 |         });
   81 |
   82 |         test.skip('verify edit cast details from the media screen', async () => {
   83 |
   84 |             await castingPage.editCastDeatils('55','ISI','Rocky', 'For the villain role');
   85 |             await castingPage.verifypopup('Cast photograph has been saved successfully.');
   86 |         });
   87 |
   88 |         test('verify forward cast and image reply', async () => {
   89 |
   90 |             await locationPage.forwardLocation();
   91 |             await locationPage.verifypopup('Message forwarded successfully');
   92 |             await locationPage.imageReplys();
   93 |             await locationPage.closeImageWindow();
   94 |         });
   95 |
   96 |     
   97 |     });
   98 |
   99 |     test.describe('Shortlist Tab', () => {
  100 |
  101 |         test('verify delete all cast folder from shortlist', async () => {
  102 |
  103 |             await locationPage.shortlistTab();
  104 |             await locationPage.deleteFolderIfAvailable();
  105 |         });
  106 |
  107 |         test('verify casting upload, open the folder, and view the image', async () => {
  108 |
  109 |             await locationPage.shortlistTab();
  110 |             await locationPage.uploadLocation('TajMahal', '90', '1', 'famous for love');
  111 |             await castingPage.verifypopup('Cast photograph(s) has been added successfully.');
  112 |             await castingPage.openFolderFirstScreen();
  113 |             await castingPage.openFolderSecondScreen();
  114 |             await castingPage.viewImages(); 
  115 |         });
  116 |
  117 |         test('verify move to finals cast folder from the character screen', async () => {
```