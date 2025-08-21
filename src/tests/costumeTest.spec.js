import { test } from '@playwright/test';
import Costume from "../pages/costume";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";
import { copyFile } from 'fs';

test.describe('Costume', () => {
    let context;
    let page;
    let uploadmedia;
    let costumePage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        costumePage = new Costume(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await costumePage.costumeTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Costume', () => {

        test('verify uploadLocation', async () => {
            await costumePage.uploadCostume('9', '1');
        }); 

        test('verify open folder > see image', async () => {
            await costumePage.openFolder(); 
            await costumePage.openImage();
        }); 
    
    });

    test.describe('upload costume in shortlist', () => {

        test('verify uploading costume in shortlist', async () => {
            await costumePage.shortlistTab();
            await costumePage.uploadCostume('10','2'); 
        });

        test('verify open folder > see image', async () => {
            await costumePage.shortlistTab();
            await costumePage.openFolder(); 
            await costumePage.openImage();
        });
    
    });


     test.describe('upload costume in finals', () => {

        test('verify uploading costume in finals', async () => {
            await costumePage.finalsTab();
            await costumePage.uploadCostume('11','3');  
        });

        test('verify open folder > see image', async () => {
            await costumePage.finalsTab();
            await costumePage.openFolder(); 
            await costumePage.openImage();
        });
    
    });

    test.describe('Delete & move to shortlist , move to final from selects', () => {

        test('verify location move to shortlist', async () => {
            await costumePage.selectsTab(); 
            await costumePage.moveToShortlistFromSelects();
            await costumePage.moveToFinalFromSelects(); 
        });

        test('verify delete the location folder from selects', async () => {
            await costumePage.deleteFromSelects();
        });
    
    });

    test.describe('Delete from shortlist', () => {

        test('verify user delete the location folder from the shortlist', async () => {
            await costumePage.shortlistTab();
            await costumePage.deleteFromShortlist();
        });
    
    });

    test.describe('Delete from Finals', () => {

        test('verify user deletes the location folder from finals', async () => {
            await costumePage.finalsTab();
            await costumePage.deleteFromFinals();
        });
    
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/costumeTest.spec.js --project=chromium --headed
   */ 
