# Test info

- Name: Location >> Location >> verify open folder > see image
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/23_locationTest.spec.js:40:9

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://qa.zillit.com/home", waiting until "load"

    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/23_locationTest.spec.js:17:20
```

# Test source

```ts
   1 | import { test } from '@playwright/test';
   2 | import Location from "../pages/location";
   3 | import UploadMedia from "../actions/media-uploader";
   4 | import logger from "../utils/loggerUtils";
   5 |
   6 | test.describe('Location', () => {
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
   34 |     test.describe.only('Location', () => {
   35 |
   36 |         test('verify uploadLocation', async () => {
   37 |             await locationPage.uploadLocation('Central Park', '9', '1');
   38 |         }); 
   39 |
   40 |         test('verify open folder > see image', async () => {
   41 |             await locationPage.openFolder(); 
   42 |             await locationPage.openImage();
   43 |         }); 
   44 |     
   45 |     });
   46 |
   47 |     test.describe('upload location in shortlist', () => {
   48 |
   49 |         test('verify uploading location in shortlist', async () => {
   50 |             await locationPage.shortlistTab();
   51 |             await locationPage.uploadLocation('Taj Mahal','10','2'); 
   52 |         });
   53 |
   54 |         test('verify open folder > see image', async () => {
   55 |             await locationPage.shortlistTab();
   56 |             await locationPage.openFolder(); 
   57 |             await locationPage.openImage();
   58 |         });
   59 |     
   60 |     });
   61 |
   62 |
   63 |      test.describe('upload location in finals', () => {
   64 |
   65 |         test('verify uploading location in finals', async () => {
   66 |             await locationPage.finalsTab();
   67 |             await locationPage.uploadLocation('Golden Temple','11','3');  
   68 |         });
   69 |
   70 |         test('verify open folder > see image', async () => {
   71 |             await locationPage.finalsTab();
   72 |             await locationPage.openFolder(); 
   73 |             await locationPage.openImage();
   74 |         });
   75 |     
   76 |     });
   77 |
   78 |     test.describe('Delete & move to shortlist , move to final from selects', () => {
   79 |
   80 |         test('verify location move to shortlist', async () => {
   81 |             await locationPage.selectsTab(); 
   82 |             await locationPage.moveToShortlistFromSelects();
   83 |             await locationPage.moveToFinalFromSelects(); 
   84 |         });
   85 |
   86 |         test('verify delete the location folder from selects', async () => {
   87 |             await locationPage.deleteFromSelects();
   88 |         });
   89 |     
   90 |     });
   91 |
   92 |     test.describe('Delete from shortlist', () => {
   93 |
   94 |         test('verify user delete the location folder from the shortlist', async () => {
   95 |             await locationPage.shortlistTab();
   96 |             await locationPage.deleteFromShortlist();
   97 |         });
   98 |     
   99 |     });
  100 |
  101 |     test.describe('Delete from Finals', () => {
  102 |
  103 |         test('verify user deletes the location folder from finals', async () => {
  104 |             await locationPage.finalsTab();
  105 |             await locationPage.deleteFromFinals();
  106 |         });
  107 |     
  108 |     });
  109 |
  110 |     test.describe('Generate pdf', () => {
  111 |
  112 |         test('verify user generate the pdf from finals', async () => {
  113 |             await locationPage.finalsTab();
  114 |             await locationPage.generatePDF();
  115 |         });
  116 |     
  117 |     });
```