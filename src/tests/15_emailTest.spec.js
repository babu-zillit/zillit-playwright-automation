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



    test.describe('Send Email', () => {

        test('verify send email -> send email with media', async () => {
            await emailPage.loadEmailPageFully();
            await emailPage.sendEmail();
            await emailPage.sendEmailMedia();
        }); 

        test('verify sent email', async () => {
            await emailPage.sentMessage();
        });

        test('verify send reply email', async () => {
            await emailPage.reply();
        });

        test('verify reply all email', async () => {
            await emailPage.replyAll();
        });

        test('verify forward email', async () => {
            await emailPage.forward();
        });

        test('verify delete email', async () => {
            await emailPage.delete();
        });
    
    });

     test.describe('Email Folder', () => {

        test('verify folder Create email', async () => {
            await emailPage.folderCreate();
        });

        test('verify folder Edit email', async () => {
            await emailPage.folderEdit();
        });

         test('verify folder Delete email1', async () => {
            await emailPage.folderDelete();
        });
    
    });



});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/15_emailTest.spec.js --project=chromium --headed
   */ 
