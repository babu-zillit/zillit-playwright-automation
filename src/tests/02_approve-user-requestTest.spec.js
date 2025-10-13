import { test } from '@playwright/test';
import ApproveUserRequest from "../pages/Approve-user-request";
import UploadMedia from "../actions/media-uploader";
import Settings from "../pages/settings"; 
import logger from "../utils/loggerUtils";

test.describe('Approve New User Request', () => {
    test.setTimeout(60000);
    let context;
    let page;
    let uploadmedia;
    let approveUserRequest;
    let settingPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        approveUserRequest = new ApproveUserRequest(page);
        settingPage = new Settings(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await approveUserRequest.openSettings();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('user request', () => {

        test('verify user approve new user request', async () => {
            await approveUserRequest.approveNewUserRequest();
        });

        test.only('verify user create remote project in settings', async () => {
            await settingPage.openSettings();
            await settingPage.createRemoteProject();
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/02_approve-user-requestTest.spec.js --project=chromium --headed
   */ 
