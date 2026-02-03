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

        test('verify the forward to remote project', async () => {
            await uploadmedia.forwardRemoteProject();
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

        test.skip('verify the save or download', async () => {
            await uploadmedia.save();
        });

        test('verify the forward to remote project', async () => {
            await uploadmedia.forwardRemoteProject();
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

        test.skip('verify the save or download', async () => {
            await uploadmedia.save();
        });

        test('verify the forward to remote project', async () => {
            await uploadmedia.forwardRemoteProject();
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

        test.skip('verify the save or download', async () => {
            await uploadmedia.save();
        });

        test('verify the forward to remote project', async () => {
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete audio', async () => {
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });


    test.describe('Send Message', () => {

        test('verify send a message in lunch', async () => {
            await cateringPage.lunchTab();
            await cateringPage.selectUser();
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.edit();
        });

        test('verify forward the message in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.forward();
        });

        test('verify the forward to remote project in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete message in lunch', async () => {
            await cateringPage.lunchTab();
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Image', () => {

        test('verify the send a image in lunch', async () => {
            await cateringPage.lunchTab();
            await cateringPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadImage();
            await uploadmedia.clickSendMedia();
        });

        test('verify the forward in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.forward();
        });

        test.skip('verify the save or download in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.save();
        });

        test('verify the forward to remote project in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete image in lunch', async () => {
            await cateringPage.lunchTab();
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Document', () => {

        test('verify the send a document in lunch', async () => {
            await cateringPage.lunchTab();
            await cateringPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadDocument();
        });

        test('verify the forward in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.forward();
        });

        test.skip('verify the save or download in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.save();
        });

        test('verify the forward to remote project in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete document in lunch', async () => {
            await cateringPage.lunchTab();
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Audio', () => {

        test('verify the send a audio in lunch', async () => {
            await cateringPage.lunchTab();
            await cateringPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadAudio();
        });

        test('verify the forward in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.forward();
        });

        test.skip('verify the save or download in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.save();
        });

        test('verify the forward to remote project in lunch', async () => {
            await cateringPage.lunchTab();
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete audio in lunch', async () => {
            await cateringPage.lunchTab();
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Message', () => {

        test('verify send a message in dinner', async () => {
            await cateringPage.dinnerTab();
            await cateringPage.selectUser();
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.edit();
        });

        test('verify forward the message in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.forward();
        });

        test('verify the forward to remote project in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete message in dinner', async () => {
            await cateringPage.dinnerTab();
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Image', () => {

        test('verify the send a image in dinner', async () => {
            await cateringPage.dinnerTab();
            await cateringPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadImage();
            await uploadmedia.clickSendMedia();
        });

        test('verify the forward in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.forward();
        });

        test.skip('verify the save or download in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.save();
        });

        test('verify the forward to remote project in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete image in dinner', async () => {
            await cateringPage.dinnerTab();
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Document', () => {

        test('verify the send a document in dinner', async () => {
            await cateringPage.dinnerTab();
            await cateringPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadDocument();
        });

        test('verify the forward in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.forward();
        });

        test.skip('verify the save or download in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.save();
        });

        test('verify the forward to remote project in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete document in dinner', async () => {
            await cateringPage.dinnerTab();
            await cateringPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Audio', () => {

        test('verify the send a audio in dinner', async () => {
            await cateringPage.dinnerTab();
            await cateringPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadAudio();
        });

        test('verify the forward in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.forward();
        });

        test.skip('verify the save or download in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.save();
        });

        test('verify the forward to remote project in dinner', async () => {
            await cateringPage.dinnerTab();
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete audio in dinner', async () => {
            await cateringPage.dinnerTab();
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
   * ENV_TYPE=qa npx playwright test src/tests/catering.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/catering.spec.js --project=chromium --headed
   */ 
