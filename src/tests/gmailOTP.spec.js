//src/tests/bulletinTest.spec.js
import { test , expect } from '@playwright/test';
import logger from '../utils/loggerUtils';
import UploadMedia from '../actions/media-uploader';
import GmailOTP from '../pages/gmailOTP';

test.describe('Gmail OTP', () => {
    let context;
    let page;
    let uploadmedia;
    let gmailOTP;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/');
        
        uploadmedia = new UploadMedia(page);
        gmailOTP = new GmailOTP(page);
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    test.describe('Email OTP', () => {

        test('verify send a message successfully', async () => {
            await gmailOTP.verifyEmailWithOtp();
        });  

    });
    
});

/**
 * 
 * ENV_TYPE=qa npx playwright test src/tests/gmailOTP.spec.js --project=chromium --headed
 */
