import { test } from '@playwright/test';
import ExternalUser from "../pages/external-user";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('External User', () => {
    let context;
    let page;
    let uploadmedia;
    let externalUserPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        externalUserPage = new ExternalUser(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await externalUserPage.clickExternalUserTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Add user', () => {

        test('verify add external user', async () => {
            await externalUserPage.addUser();
        }); 
        
        test('verify delete the external user', async () => {
            await externalUserPage.delete();
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/16external-userTest.spec.js --project=chromium --headed
   */ 
