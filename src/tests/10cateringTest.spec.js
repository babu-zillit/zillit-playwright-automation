//src/tests/calendarTest.spec.js
import { test } from '@playwright/test';
import Catering from "../pages/catering";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Catering', () => {
    let context;
    let page;
    let uploadmedia;
    let cateringPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        cateringPage = new Catering(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await cateringPage.clickCateringTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    test.describe('User change the department', () => {

        test('verify user become cater department', async () => {
            await cateringPage.openEditProfile();
            await cateringPage.changeDepartmentAndDesignation('Catering', 'Caterers');
        }); 
    
    });

    test.describe('Send Message', () => {

        test('verify send a message', async () => {
            await cateringPage.clickCateringTab();
            await cateringPage.selectUser();
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message', async () => {
            await uploadmedia.edit();
        });

        test('verify forward the message', async () => {
            await uploadmedia.forward();
        });

        test('verify the delete message', async () => {
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Image', () => {

        test('verify the send a image', async () => {
            await cateringPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadImage();
            await uploadmedia.clickSendMedia();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the delete image', async () => {
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Document', () => {

        test('verify the send a document', async () => {
            await cateringPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadDocument();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the delete document', async () => {
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Audio', () => {

        test('verify the send a audio', async () => {
            await cateringPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadAudio();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the delete audio', async () => {
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });



    test.describe('Catering unit > creation, edition, deletion', () => {

        test('verify create unit', async () => {
            await cateringPage.createCaterUnit();
        });

        test('verify edit unit', async () => {
            await cateringPage.editCaterUnit();
        });

        test('verify delete unit', async () => {
            await cateringPage.deleteCaterUnit();
        });

    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/10cateringTest.spec.js --project=chromium --headed
   */ 
