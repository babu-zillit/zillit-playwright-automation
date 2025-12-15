import { test , expect } from '@playwright/test';
import logger from '../utils/loggerUtils';
import UploadMedia from '../actions/media-uploader';
import Settings from '../pages/settings';

test.describe('Remote Project Unit', () => {
    let context;
    let page;
    let uploadmedia;
    let settingPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/');
        
        uploadmedia = new UploadMedia(page);
        settingPage = new Settings(page);
        await uploadmedia.clickProjectName();
        await settingPage.openSettings();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    test.describe('Create Remote Project Unit', () => {

        test('Verify user can create a remote project unit', async () => {
            await settingPage.createRemoteProject();
        });
            
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/remoteProjectTest.spec.js --project=chromium --headed
   */ 