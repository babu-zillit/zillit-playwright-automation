import { test } from '@playwright/test';
import Location from "../pages/locations";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Casting', () => {
    let context;
    let page;
    let uploadmedia;
    let locationPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        locationPage = new Location(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await locationPage.locationTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe.only('Selects Tab', () => {

        test('verify location upload, open the folder, and view the image', async () => {

             await locationPage.uploadLocation('TajMahal', '90', '1', 'famous for love');
             await locationPage.verifypopup('Location photograph(s) have been added successfully.');
             await locationPage.openFolderFirstScreen();
             await locationPage.openFolderSecondScreen();
             await locationPage.viewImages(); 
        }); 
        
        test('verify move to shortlist location folder from the location name screen', async () => {

            await locationPage.dropDownArrowAction('selectsTab', 'Move to Shortlist');
            await locationPage.verifypopup('Location photograph(s) have been added successfully.');
        });

        test('verify move to finals location folder from the location name screen', async () => {

            await locationPage.dropDownArrowAction('selectsTab', 'Move to Final');
            await locationPage.verifypopup('Location photograph(s) have been added successfully.');
        });

        test('verify delete location folder from shortlist', async () => {

            await locationPage.dropDownArrowAction('shortlistTab', 'Delete');
        });

        test('verify delete location folder from final', async () => {

            await locationPage.dropDownArrowAction('finalsTab', 'Delete');
        });

        test('verify move to shortlist media from the media screen', async () => {

            await locationPage.selectsTab();
            await locationPage.moveToFromMediaScreen('Move to Shortlist');
            await locationPage.verifypopup('Location photograph(s) have been added successfully.');
            await locationPage.closeImageWindow();
        });

        test('verify move to finals media from the media screen', async () => {

            await locationPage.moveToFromMediaScreen('Move to Final');
            await locationPage.verifypopup('Location photograph(s) have been added successfully.');
            await locationPage.closeImageWindow();
        });

        test.skip('verify edit cast details from the media screen', async () => {

            await castingPage.editCastDeatils('55','ISI','Rocky', 'For the villain role');
            await castingPage.verifypopup('Cast photograph has been saved successfully.');
        });

        test('verify forward cast and image reply', async () => {

            await locationPage.forwardLocation();
            await locationPage.verifypopup('Message forwarded successfully');
            await locationPage.imageReplys();
            await locationPage.closeImageWindow();
        });

    
    });

    test.describe('Shortlist Tab', () => {

        test('verify delete all cast folder from shortlist', async () => {

            await locationPage.shortlistTab();
            await locationPage.deleteFolderIfAvailable();
        });

        test('verify casting upload, open the folder, and view the image', async () => {

            await locationPage.shortlistTab();
            await locationPage.uploadLocation('TajMahal', '90', '1', 'famous for love');
            await castingPage.verifypopup('Cast photograph(s) has been added successfully.');
            await castingPage.openFolderFirstScreen();
            await castingPage.openFolderSecondScreen();
            await castingPage.viewImages(); 
        });

        test('verify move to finals cast folder from the character screen', async () => {

            await castingPage.dropDownArrowAction('shortlistTab', 'Move to Final');
            await castingPage.verifypopup('Cast has been moved successfully.');
        });

        test('verify edit cast details from the media screen', async () => {

            await castingPage.shortlistTab();
            await castingPage.editCastDeatils('66','Raw','Sam', 'For the villain role');
            await castingPage.verifypopup('Cast photograph has been saved successfully.');
        });

        test('verify forward cast and image reply', async () => {

            await castingPage.shortlistTab();
            await castingPage.forwardCast();
            await castingPage.verifypopup('Message forwarded successfully');
            await castingPage.closeImageWindow();
        });    
    
    });

    test.describe('Finals Tab', () => {

        test('verify delete all cast folder from final', async () => {

            await castingPage.finalsTab();
            await castingPage.deleteFolderIfAvailable();
        });

        test('verify casting upload, open the folder, and view the image', async () => {
            await castingPage.finalsTab();
             await castingPage.uploadCasting('3','Professor','Kaitrina','female', 'for the philosophy role');
             await castingPage.verifypopup('Cast photograph(s) has been added successfully.');
             await castingPage.openFolderFirstScreen();
             await castingPage.openFolderSecondScreen();
             await castingPage.viewImages(); 
        }); 
        
         test('verify forward cast and image reply', async () => {

            await castingPage.finalsTab();
            await castingPage.forwardCast();
            await castingPage.verifypopup('Message forwarded successfully');
            await castingPage.closeImageWindow();
        }); 
 
    });


    test.describe('Generate pdf', () => {

        test('verify user generate the pdf from finals', async () => {
            await castingPage.finalsTab();
            await castingPage.generatePDF();
        });

    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/locationTest.spec.js --project=chromium --headed
   */ 
