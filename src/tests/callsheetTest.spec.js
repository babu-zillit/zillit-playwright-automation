//src/tests/calendarTest.spec.js
import { test } from '@playwright/test';
import CallSheet from "../pages/callsheet";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('CallSheet', () => {
    let context;
    let page;
    let uploadmedia;
    let callsheet;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        callsheet = new CallSheet(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await callsheet.clickCallSheet();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    
    test.describe('Send Document Flow', () => {
        test('verify the send a document', async () => {
            await uploadmedia.sendMessage();
            await callsheet.uploadDocumentByClickingContinuation();
            await callsheet.uploadDocumentByClickingNew();
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


    test.describe('CallSheet test cases', () => {

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



});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/callsheetTest.spec.js --project=chromium --headed
   */ 
