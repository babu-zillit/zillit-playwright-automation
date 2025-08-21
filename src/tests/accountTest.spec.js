import { test } from '@playwright/test';
import Accounts from "../pages/accounts";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Accounts', () => {
    let context;
    let page;
    let uploadmedia;
    let accountPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        accountPage = new Accounts(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await accountPage.clickAccountTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    test.describe('Account module', () => {

        test('account test casess', async () => {
            await accountPage.openEditProfile();
            await accountPage.changeDepartmentAndDesignation('Accounts','1st Assistant Accountant');
            await accountPage.clickAccountTab();
            await accountPage.selectUser();
        }); 
    
    });

    test.describe('Send Message flow', () => {

        test('verify send a message successfully', async () => {
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message successfully', async () => {
            await uploadmedia.edit();
        });

        test('forward the message successfully', async () => {
            await uploadmedia.forward();
        });

        test('verify reply to the message successfully', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit the reply message successfully', async () => {
            await accountPage.selectUser();
            await uploadmedia.editReply();
        });

        test('verify the delete the reply message successfully', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete message successfully', async () => {
            await accountPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Image Flow', () => {
        test('verify the send a image', async () => {
            await accountPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadImage();
            await uploadmedia.clickSendMedia();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await accountPage.selectUser();
            await uploadmedia.editReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete image', async () => {
            await accountPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Document Flow', () => {
        test('verify the send a document', async () => {
            await accountPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadDocument();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await accountPage.selectUser();
            await uploadmedia.editReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete document', async () => {
            await accountPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Audio Flow', () => {
        test('verify the send a audio', async () => {
            await accountPage.selectUser();
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadAudio();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await accountPage.selectUser();
            await uploadmedia.editReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete audio', async () => {
            await accountPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Account unit', () => {

        test('verify create the account unit', async () => {
            await accountPage.createAccountUnit();
        });

        test('verify edit the account unit', async () => {
            await accountPage.editAccountUnit();
        });

        test('verify delete the account unit', async () => {
            await accountPage.deleteAccountUnit();
        });

    });



});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/accountTest.spec.js --project=chromium --headed 
   */ 
