import { test } from '@playwright/test';
import CnC from "../pages/cnc";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('CnC', () => {
    let context;
    let page;
    let uploadmedia;
    let cncPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        cncPage = new CnC(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await cncPage.openCnC();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('send message', () => {

        test('verify user send message', async () => {
            await cncPage.clickUserProfile();
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
            await cncPage.attachment();
            await cncPage.imageUpload();
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
            await cncPage.attachment();
            await cncPage.videoUpload();
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
            await cncPage.attachment();
            await cncPage.documentUpload();
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
            await cncPage.attachment();
            await cncPage.audioUpload();
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

    test.describe('send message in group', () => {

        test('verify user send message', async () => {
            await cncPage.createGroup();
            await cncPage.sendMessage();
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
   * ENV_TYPE=qa npx playwright test src/tests/20_cncTest.spec.js --project=chromium --headed
   */ 
