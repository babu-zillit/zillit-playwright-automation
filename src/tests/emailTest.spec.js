import { test } from '@playwright/test';
import Email from "../pages/email";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";
import { execPath } from 'process';

test.describe('Email', () => {
    let context;
    let page;
    let uploadmedia;
    let emailPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        emailPage = new Email(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await emailPage.clickEmailTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('email functionality', () => {

        test('verify send email', async () => {
            await emailPage.loadEmailPageFully();
            await emailPage.sendEmail();
            await emailPage.sendEmailMedia();
        }); 

        test('verify sent email', async () => {
            await emailPage.sentMessage();
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/emailTest.spec.js --project=chromium --headed
   */ 
