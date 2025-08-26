//src/tests/bulletinTest.spec.js
import { test , expect } from '@playwright/test';
import logger from '../utils/loggerUtils';
import UploadMedia from '../actions/media-uploader';
import Common from '../pages/common';

test.describe('Common test', () => {
    let context;
    let page;
    let uploadmedia;
    let commonPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/');
        
        uploadmedia = new UploadMedia(page);
        commonPage = new Common(page);
        await uploadmedia.clickProjectName();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
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
            await commonPage.forward();
            //await commonPage.verifypopup('Forward Successfullys');
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
    
});

/**
 * 
 * ENV_TYPE=qa npx playwright test src/tests/commonTest.spec.js --project=chromium --headed
 */
