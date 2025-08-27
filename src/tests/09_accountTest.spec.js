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

    test.describe('Account', () => {

        test('verify user become the accountant', async () => {
            await accountPage.openEditProfile();
            await accountPage.changeDepartmentAndDesignation('Accounts','1st Assistant Accountant');
            await accountPage.clickAccountTab();
            await accountPage.selectUser();
        }); 
    
    });

    test.describe('Send Message', () => {

        test('verify send a message', async () => {
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message', async () => {
            await uploadmedia.edit();
        });

        test('verify forward the message', async () => {
            await uploadmedia.forward();
        });

        test('verify reply to the message', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit the reply message', async () => {
            await accountPage.selectUser();
            await uploadmedia.editReply();
        });

        test('verify the delete the reply message', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the delete message', async () => {
            await accountPage.selectUser();
            await uploadmedia.delete();
        });

    });

    test.describe('Send Image', () => {
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

    test.describe('Send Document', () => {
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

    test.describe('Send Audio', () => {
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
   * ENV_TYPE=qa npx playwright test src/tests/09_accountTest.spec.js --project=chromium --headed
   * ENV_TYPE=production 
   */ 
