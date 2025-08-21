//src/tests/bulletinTest.spec.js
import { test , expect } from '@playwright/test';
import logger from '../utils/loggerUtils';
import UploadMedia from '../actions/media-uploader';

test.describe('Bulletin', () => {
    let context;
    let page;
    let uploadmedia;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/');
        
        uploadmedia = new UploadMedia(page);
        await uploadmedia.clickProjectName();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    test.describe.skip('Delete all message if available' , () =>{
        test('delete all', async () => {
            await uploadmedia.deleteAll();
        });
    });

    test.describe('Send Message flow', () => {

        test('verify send a message successfully', async () => {
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message successfully', async () => {
            await uploadmedia.edit();
        });

        test('verify read by status on message', async () => {
            await uploadmedia.readBy();
        });

        test('forward the message successfully', async () => {
            await uploadmedia.forward();
        });

        test('verify reply to the message successfully', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit the reply message successfully', async () => {
            await uploadmedia.editReply();
        });

        test('verify the read by status on reply message', async () => {
            await uploadmedia.readByReply();
        });

        test('verify the delete the reply message successfully', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete message successfully', async () => {
            await uploadmedia.delete();
        });

    });
    

    test.describe('Send Image Flow', () => {
        test('verify the send a image', async () => {
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadImage();
            await uploadmedia.clickSendMedia();
        });

        test('verify the readBy status', async () => {
            await uploadmedia.readBy();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await uploadmedia.editReply();
        });

        test('verify the readBy reply', async () => {
            await uploadmedia.readByReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete image', async () => {
            await uploadmedia.delete();
        });

    });

    test.describe('Send Video Flow', () => {
        test('verify the send a video', async () => {
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadVideo();
            await uploadmedia.clickSendMedia();
        });

        test('verify the readBy status', async () => {
            await uploadmedia.readBy();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await uploadmedia.editReply();
        });

        test('verify the readBy reply', async () => {
            await uploadmedia.readByReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete video', async () => {
            await uploadmedia.delete();
        });

    });

    test.describe('Send Audio Flow', () => {
        test('verify the send a audio', async () => {
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadAudio();
        });

        test('verify the readBy status', async () => {
            await uploadmedia.readBy();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await uploadmedia.editReply();
        });

        test('verify the readBy reply', async () => {
            await uploadmedia.readByReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete audio', async () => {
            await uploadmedia.delete();
        });

    });

    test.describe('Send Document Flow', () => {
        test('verify the send a document', async () => {
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadDocument();
        });

        test('verify the readBy status', async () => {
            await uploadmedia.readBy();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await uploadmedia.editReply();
        });

        test('verify the readBy reply', async () => {
            await uploadmedia.readByReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete document', async () => {
            await uploadmedia.delete();
        });

    });

    test.describe('Send Location Flow', () => {
        test('verify the send a location', async () => {
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadLocation();
        });

        test('verify the readBy status', async () => {
                await uploadmedia.readBy();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await uploadmedia.editReply();
        });

        test('verify the readBy reply', async () => {
            await uploadmedia.readByReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete location', async () => {
            await uploadmedia.delete();
        });

    });

});

/**
 * 
 * ENV_TYPE=qa npx playwright test src/tests/bulletinTest.spec.js --project=chromium --headed
 * ENV_TYPE=qa npx playwright test src/tests/bulletinTest.spec.js --project=firefox --headed
 * ENV_TYPE=qa npx playwright test src/tests/bulletinTest.spec.js --project=webkit --headed
 * ENV_TYPE=production npx playwright test src/tests/bulletinTest.spec.js --project=chromium --headed
 * ENV_TYPE=production npx playwright test src/tests/bulletinTest.spec.js --project=firefox --headed
 * ENV_TYPE=production npx playwright test src/tests/bulletinTest.spec.js --project=webkit --headed
 * 
 */
