import { test } from '@playwright/test';
import Budget from "../pages/budget";
import CnC from "../pages/cnc";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Budget Full', () => {
    test.setTimeout(60000);
    let context;
    let page;
    let uploadmedia;
    let budgetPage;
    let cncPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        cncPage = new CnC(page);
        budgetPage = new Budget(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await budgetPage.openBudget();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('upload the budget', () => {

        test.skip('verify upload budget full document', async () => {
            await budgetPage.uploadPdf(99);
        });

        test('verify view - download - view count - download count', async () => {
            await budgetPage.view();
            await budgetPage.viewCount();
            await budgetPage.download();
            await budgetPage.downloadCount();
        });

        test('verify add member', async () => {
            await budgetPage.addMember();
        });
    
    });

     test.describe('send message', () => {

        test('verify user send message', async () => {
            await cncPage.sendMessage();
        });

        test('verify user forward message', async () => {
            await cncPage.forward();
        });

         test('verify user reply message', async () => {
            await cncPage.reply();
        });

        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });

    test.describe('send image', () => {

        test('verify user send image', async () => {
            await budgetPage.attachment();
            await budgetPage.imageUpload();
        });

        test('verify user forward message', async () => {
            await cncPage.forward();
        });

        test('verify user save message', async () => {
            await cncPage.save();
        });

        test('verify user reply message', async () => {
            await cncPage.reply();
        });

        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });

    test.describe('send video', () => {

        test('verify user send image', async () => {
            await budgetPage.attachment();
            await budgetPage.videoUpload();
        });

        test('verify user forward message', async () => {
            await cncPage.forward();
        });

        test('verify user save message', async () => {
            await cncPage.save();
        });

        test('verify user reply message', async () => {
            await cncPage.reply();
        });

        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });

    test.describe('send document', () => {

        test('verify user send image', async () => {
            await budgetPage.attachment();
            await budgetPage.documentUpload();
        });

        test('verify user forward message', async () => {
            await cncPage.forward();
        });

        test('verify user save message', async () => {
            await cncPage.save();
        });

        test('verify user reply message', async () => {
            await cncPage.reply();
        });

        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });


    test.describe('send audio', () => {

        test('verify user send image', async () => {
            await budgetPage.attachment();
            await budgetPage.audioUpload();
        });

        test('verify user forward message', async () => {
            await cncPage.forward();
        });

        test('verify user save message', async () => {
            await cncPage.save();
        });

        test('verify user reply message', async () => {
            await cncPage.reply();
        });

        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/budgetFullTest.spec.js --project=chromium --headed
   */ 
