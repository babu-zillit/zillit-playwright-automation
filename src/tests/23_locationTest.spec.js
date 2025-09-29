import { test } from '@playwright/test';
import Location from "../pages/location";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Location', () => {
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



    test.describe('Location', () => {

        test.only('verify uploadLocation', async () => {
            await locationPage.uploadLocation('Central Park', '9', '1');
        }); 

        test('verify open folder > see image', async () => {
            await locationPage.openFolder(); 
            await locationPage.openImage();
        }); 
    
    });

    test.describe('upload location in shortlist', () => {

        test('verify uploading location in shortlist', async () => {
            await locationPage.shortlistTab();
            await locationPage.uploadLocation('Taj Mahal','10','2'); 
        });

        test('verify open folder > see image', async () => {
            await locationPage.shortlistTab();
            await locationPage.openFolder(); 
            await locationPage.openImage();
        });
    
    });


     test.describe('upload location in finals', () => {

        test('verify uploading location in finals', async () => {
            await locationPage.finalsTab();
            await locationPage.uploadLocation('Golden Temple','11','3');  
        });

        test('verify open folder > see image', async () => {
            await locationPage.finalsTab();
            await locationPage.openFolder(); 
            await locationPage.openImage();
        });
    
    });

    test.describe('Delete & move to shortlist , move to final from selects', () => {

        test('verify location move to shortlist', async () => {
            await locationPage.selectsTab(); 
            await locationPage.moveToShortlistFromSelects();
            await locationPage.moveToFinalFromSelects(); 
        });

        test('verify delete the location folder from selects', async () => {
            await locationPage.deleteFromSelects();
        });
    
    });

    test.describe('Delete from shortlist', () => {

        test('verify user delete the location folder from the shortlist', async () => {
            await locationPage.shortlistTab();
            await locationPage.deleteFromShortlist();
        });
    
    });

    test.describe('Delete from Finals', () => {

        test('verify user deletes the location folder from finals', async () => {
            await locationPage.finalsTab();
            await locationPage.deleteFromFinals();
        });
    
    });

    test.describe('Generate pdf', () => {

        test('verify user generate the pdf from finals', async () => {
            await locationPage.finalsTab();
            await locationPage.generatePDF();
        });
    
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/23_locationTest.spec.js --project=chromium --headed
   */ 
