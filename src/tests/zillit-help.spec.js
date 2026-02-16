import { test } from '@playwright/test';
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";
import ZillitHelp from '../pages/zillit-help';

test.describe('Tools Customization', () => {
    let context;
    let page;
    let uploadmedia;
    let zillitHelpPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
         zillitHelpPage = new ZillitHelp(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await zillitHelpPage.openZillitHelpTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });


    test.describe('Zillit Help', () => {

        test('verify validate all links in newly opened tab', async () => {
        await zillitHelpPage.validateAllLinks(() =>
        zillitHelpPage.openTermsOfUse(0)
        );

        });

        test('verify validate all links ', async () => {
        await zillitHelpPage.validateAllLinks(() =>
        zillitHelpPage.openPrivacyPolicy(1)
        );

        });

        test.skip('verify validate all links for FAQ ', async () => {
        await zillitHelpPage.validateAllLinks(() =>
        zillitHelpPage.openFAQ(2)
        );

        });

        test.skip('verify validate all links for Reviews ', async () => {
        await zillitHelpPage.validateAllLinks(() =>
        zillitHelpPage.openReviews(4)
        );

        });
    
    });

});

  /**
   * 
   * ENV_TYPE=production npx playwright test src/tests/zillit-help.spec.js --project=chromium --headed
   */ 
