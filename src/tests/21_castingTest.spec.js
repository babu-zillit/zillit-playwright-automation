import { test } from '@playwright/test';
import Casting from "../pages/casting";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Casting', () => {
    let context;
    let page;
    let uploadmedia;
    let castingPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        castingPage = new Casting(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await castingPage.castingMainTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Casting(Main Cast)', () => {

        test.only('verify uploadCasting', async () => {
             await castingPage.uploadCasting('1','Police','Salman','male', 'For the villain role');
             await castingPage.verifypopup('Cast photograph(s) has been added successfully.'); 
            // await castingPage.openFolderFirstScreen();
            // await castingPage.openFolderSecondScreen();
            // await castingPage.viewImages();
            await castingPage.moveToShortlistFromSelects();
            await castingPage.verifypopup('Cast has been moved successfully.');
            await castingPage.deleteFromShortlist();
            await castingPage.verifypopup('Cast photograph has been deleted successfully.');
        }); 

        test('verify open folder > see image', async () => {
            await castingPage.openFolder(); 
            await castingPage.openImage();
        }); 
    
    });

    test.describe('upload cast in shortlist', () => {

        test('verify uploading cast in shortlist', async () => {
            await castingPage.shortlistTab();
            await castingPage.uploadCasting('2','IAS','Deepika','female'); 
        });

        test('verify open folder > see image', async () => {
            await castingPage.shortlistTab();
            await castingPage.openFolder(); 
            await castingPage.openImage();
        });
    
    });


     test.describe('upload cast in finals', () => {

        test('verify uploading cast in finals', async () => {
            await castingPage.finalsTab();
            await castingPage.uploadCasting('3','IPS','Kaitrina','nonbinary');  
        });

        test('verify open folder > see image', async () => {
            await castingPage.finalsTab();
            await castingPage.openFolder(); 
            await castingPage.openImage();
        });
    
    });

    test.describe('Delete & move to shortlist , move to final from selects', () => {

        test('verify casts move to shortlist', async () => {
            await castingPage.selectsTab(); 
            await castingPage.moveToShortlistFromSelects();
            await castingPage.moveToFinalFromSelects(); 
        });

        test('verify delete the cast folder from selects', async () => {
            await castingPage.deleteFromSelects();
        });
    
    });

    test.describe('Delete from shortlist', () => {

        test('verify user delete the cast folder from the shortlist', async () => {
            await castingPage.shortlistTab();
            await castingPage.deleteFromShortlist();
        });
    
    });

    test.describe('Delete from Finals', () => {

        test('verify user deletes the cast folder from finals', async () => {
            await castingPage.finalsTab();
            await castingPage.deleteFromFinals();
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
   * ENV_TYPE=qa npx playwright test src/tests/21_castingTest.spec.js --project=chromium --headed
   */ 
