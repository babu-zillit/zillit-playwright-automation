import { test } from '@playwright/test';
import ContinuityScriptNotes from '../pages/continuity-script-notes';
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Continuity Script Notes', () => {
    let context;
    let page;
    let uploadmedia;
    let continuityScriptNotesPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        continuityScriptNotesPage = new ContinuityScriptNotes(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await continuityScriptNotesPage.continuityScriptNotesTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Selected Takes', () => {

        test('send message', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.sendMessage();
            await continuityScriptNotesPage.uploadDocumentByClickingContinuation();
            await continuityScriptNotesPage.uploadDocumentByClickingNew();
        });

        test('verify the forward', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.editReply();
        });

        test('verify the delete reply', async () => {
            //await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.deleteReply();
        });

        test('verify the delete document', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.delete();
        });
    
    });

    test.describe('Selected Takes', () => {

        test('verify send a message successfully', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message successfully', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.edit();
        });

        test('forward the message successfully', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.forward();
        });

        test('verify reply to the message successfully', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.reply();
        });

        test('verify the edit the reply message successfully', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.editReply();
        });

        test('verify the delete the reply message successfully', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete message successfully', async () => {
            await continuityScriptNotesPage.selectedTakesTab();
            await uploadmedia.delete();
        });
    
    });

    test.describe('Daily Progress Notes', () => {

        test('send message1', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.sendMessage();
            await continuityScriptNotesPage.uploadDocumentByClickingContinuation();
            await continuityScriptNotesPage.uploadDocumentByClickingNew();
        });

        test('verify the forward', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.editReply();
        });

        test('verify the delete reply', async () => {
            //await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.deleteReply();
        });

        test('verify the delete document', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.delete();
        });
    
    });

    test.describe('Daily Progress Notes', () => {

        test('verify send a message successfully', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message successfully', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.edit();
        });

        test('forward the message successfully', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.forward();
        });

        test('verify reply to the message successfully', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.reply();
        });

        test('verify the edit the reply message successfully', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.editReply();
        });

        test('verify the delete the reply message successfully', async () => {
            //await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.deleteReply();
        });

        test('verify the delete message successfully', async () => {
            await continuityScriptNotesPage.dailyProgressNotesTab();
            await uploadmedia.delete();
        });
    
    });

    test.describe('Continuity Notes', () => {

        test('send message2', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.sendMessage();
            await continuityScriptNotesPage.uploadDocumentByClickingContinuation();
            await continuityScriptNotesPage.uploadDocumentByClickingNew();
        });

        test('verify the forward', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.editReply();
        });

        test('verify the delete reply', async () => {
            //await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.deleteReply();
        });

        test('verify the delete document', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.delete();
        });
    
    });
    
    test.describe('Continuity Notes', () => {

        test('verify send a message successfully', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message successfully', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.edit();
        });

        test('forward the message successfully', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.forward();
        });

        test('verify reply to the message successfully', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.reply();
        });

        test('verify the edit the reply message successfully', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.editReply();
        });

        test('verify the delete the reply message successfully', async () => {
            //await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.deleteReply();
        });

        test('verify the delete message successfully', async () => {
            await continuityScriptNotesPage.continuityNotesTab();
            await uploadmedia.delete();
        });
    
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/continuity-script-notesTest.spec.js --project=chromium --headed
   */ 
