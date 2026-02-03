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



    test.describe.skip('upload the budget', () => {

        test('verify upload budget full document', async () => {
            await budgetPage.uploadPdf(99);
        });

        test('verify View → Download → View Count → Download Count', async () => {
            await budgetPage.openDocument();
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

        test.skip('verify user save message', async () => {
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

        test.skip('verify user save message', async () => {
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

        test.skip('verify user save message', async () => {
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

        test.skip('verify user save message', async () => {
            await cncPage.save();
        });

        test('verify user reply message', async () => {
            await cncPage.reply();
        });

        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });

    test.describe('Group Creation', () => {

        test('verify user creates a group & send message', async () => {
            await budgetPage.createGroup();
            await cncPage.sendMessage();
        });
        test('verify user edit message', async () => {
            await cncPage.edit();
        });
        test('verify user forward message', async () => {
            await cncPage.forward();
        });
        test('verify user read by message', async () => {
            await cncPage.readBy();
        });
        test('verify user reply message', async () => {
            await cncPage.reply();
        });
        test('verify user edit reply message', async () => {
            await cncPage.editReply();
        });
        test('verify user readBy reply message', async () => {
            await cncPage.readByReply();
        });
        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });

    test.describe('send image in group', () => {

        test('verify user send image', async () => {
            await cncPage.attachment();
            await cncPage.imageUpload();
        });
        test('verify user forward message', async () => {
            await cncPage.forward();
        });
        test('verify user read by message', async () => {
            await cncPage.readBy();
        });
        test('verify user reply message', async () => {
            await cncPage.reply();
        });
        test('verify user edit reply message', async () => {
            await cncPage.editReply();
        });
        test('verify user readBy reply message', async () => {
            await cncPage.readByReply();
        });
        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });


    test.describe('send video in group', () => {

        test('verify user send image', async () => {
            await cncPage.attachment();
            await cncPage.videoUpload();
        });
        test('verify user forward message', async () => {
            await cncPage.forward();
        });
        test('verify user read by message', async () => {
            await cncPage.readBy();
        });
        test('verify user reply message', async () => {
            await cncPage.reply();
        });
        test('verify user edit reply message', async () => {
            await cncPage.editReply();
        });
        test('verify user readBy reply message', async () => {
            await cncPage.readByReply();
        });
        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });

    test.describe('send document in group', () => {

        test('verify user send image', async () => {
            await cncPage.attachment();
            await cncPage.documentUpload();
        });
        test('verify user forward message', async () => {
            await cncPage.forward();
        });
        test('verify user read by message', async () => {
            await cncPage.readBy();
        });
        test('verify user reply message', async () => {
            await cncPage.reply();
        });
        test('verify user edit reply message', async () => {
            await cncPage.editReply();
        });
        test('verify user readBy reply message', async () => {
            await cncPage.readByReply();
        });
        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });


    test.describe('send audio in group', () => {

        test('verify user send image', async () => {
            await cncPage.attachment();
            await cncPage.audioUpload();
        });
        test('verify user forward message', async () => {
            await cncPage.forward();
        });
        test('verify user read by message', async () => {
            await cncPage.readBy();
        });
        test('verify user reply message', async () => {
            await cncPage.reply();
        });
        test('verify user edit reply message', async () => {
            await cncPage.editReply();
        });
        test('verify user readBy reply message', async () => {
            await cncPage.readByReply();
        });
        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });

    test.describe('send location in group', () => {

        test('verify user send location', async () => {
            await cncPage.attachment();
            await uploadmedia.uploadLocation();
        });
        test('verify user forward message', async () => {
            await cncPage.forward();
        });
        test('verify user reply message', async () => {
            await cncPage.reply();
        });
        test('verify user edit reply message', async () => {
            await cncPage.editReply();
        });
        test('verify user readBy reply message', async () => {
            await cncPage.readByReply();
        });
        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });

    test.describe('send image Reply in group', () => {

        test('verify user send image', async () => {
            await cncPage.attachment();
            await cncPage.imageUpload();
        });
        test('verify user image reply message', async () => {
            await cncPage.imageReply();
        });
        test('verify user delete message', async () => {
            await cncPage.deleteAllMessage();
        });
    
    });

    test.describe('Delete Group', async () => {

        test('verify user delete the group', async() => {
            await cncPage.deleteGroup();
        });
   });





});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/budgetFullTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/budget-full.spec.js --project=chromium --headed
   */ 
