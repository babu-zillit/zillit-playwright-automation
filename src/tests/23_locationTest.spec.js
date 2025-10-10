import { test } from '@playwright/test';
import Location from "../pages/location";
import Casting from '../pages/casting';
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Location', () => {
    let context;
    let page;
    let uploadmedia;
    let locationPage;
    let castingPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        locationPage = new Location(page);
        castingPage = new Casting(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await locationPage.locationTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    test.describe.only('Send Message', () => {

        test('verify send a message', async () => {
            await locationPage.chat();
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message', async () => {
            await castingPage.dropDownChat();
            await castingPage.edit();
        });

        test('verify read by status on message', async () => {
            await castingPage.dropDownChat();
            await castingPage.readBy();
        });

        test('verify forward the message', async () => {
            await castingPage.dropDownChat();
            await castingPage.forwards();
        });

        test('verify reply to the message', async () => {
            await castingPage.dropDownChat();
            await castingPage.reply();
        });

        test('verify the forward to remote project', async () => {
            await castingPage.dropDownChat();
            await castingPage.forwardRemoteProject();
        });

        test('verify the delete message', async () => {
            await castingPage.dropDownChat();
            await castingPage.delete();
        });

    });

    test.describe('Location', () => {

        test('verify uploadLocation', async () => {
            await locationPage.uploadLocation('Central Park', '9', '1');
            await locationPage.distribute();
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
            await locationPage.distribute();
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
            await locationPage.distribute();
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
