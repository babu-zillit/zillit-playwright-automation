import { test , expect } from '@playwright/test';
import logger from "../utils/loggerUtils";
import UploadMedia from '../actions/media-uploader';
import DistributionList from '../pages/distribution-list';

test.describe('Distribution List', () => {
    test.setTimeout(550000);
    let context;
    let page;
    let uploadmedia;
    let distributionPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/');
        
        uploadmedia = new UploadMedia(page);
        distributionPage = new DistributionList(page);
        await uploadmedia.clickProjectName();
        await distributionPage.openDistributionTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    test.describe('Enable Distribution For self user', () => {

        test('Verify user can enable distribution for home and', async () => {
            await distributionPage.enableDistributionForUser();
            await distributionPage.enableDistributionForHome();
            await distributionPage.enableDistributionForTools();
            await distributionPage.enableDistributionForHome();
        });
            
    });

    test.describe.skip('Enable Distribution For other User', () => {

        test('Verify user can enable distribution for home and tools', async () => {
            await distributionPage.enableDistributionForSecondUser();
            await distributionPage.enableDistributionForHome();
            await distributionPage.enableDistributionForTools();
            await distributionPage.enableDistributionForHome();
        });
            
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/05_distribution-listTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/05_distribution-listTest.spec.js --project=chromium --headed
   */ 