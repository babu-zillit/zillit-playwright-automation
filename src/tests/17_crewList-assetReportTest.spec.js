import { test } from '@playwright/test';
import CrewListAssetReport from "../pages/crewList-assetReport";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Crew List → Asset Report', () => {
    let context;
    let page;
    let uploadmedia;
    let crewListAssetReportPage;

    test.beforeEach(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        crewListAssetReportPage = new CrewListAssetReport(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
    });

    test.afterEach(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Crew List', () => {

        test('verify user generate the crew list', async () => {
            await crewListAssetReportPage.crewListFunctionality();
        }); 
        
    });

    test.describe('Asset Report', () => {

        test('verify user generate the asset report', async () => {
            await crewListAssetReportPage.assetReportFunctionality();
        }); 
        
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/17_crewList-assetReportTest.spec.js --project=chromium --headed
   */ 
