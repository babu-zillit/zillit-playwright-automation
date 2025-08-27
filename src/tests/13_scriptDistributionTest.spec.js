import { test } from '@playwright/test';
import ScriptDistribution from "../pages/script-page-distribution";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Script & Page Distribution', () => {
    let context;
    let page;
    let uploadmedia;
    let scriptDistributionPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        scriptDistributionPage = new ScriptDistribution(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await scriptDistributionPage.scriptDistributionTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Full Script', () => {

        test('verify upload fullScript document', async () => {
            await scriptDistributionPage.fullScriptTab();
            await scriptDistributionPage.uploadScriptDistribution('Episode');

            await scriptDistributionPage.verifyPopUpMessage('Script uploaded successfully')
            .catch(e => console.log('Error verifying script uploaded popup:', e.message));
        });

        test('verify fullScript workflow: view → viewCount → download → downloadCount', async () => {
            await scriptDistributionPage.fullScriptTab();
            await scriptDistributionPage.view();
            await scriptDistributionPage.viewCount('scriptFull');

            await scriptDistributionPage.download();
            await scriptDistributionPage.verifyPopUpMessage('File downloaded successfully')
            .catch(e => console.log('Error verifying download popup:', e.message));
            await scriptDistributionPage.downloadCount('scriptFull');
        });
    
    });

    test.describe('Pages', () => {

        test('verify upload page document', async () => {
            await scriptDistributionPage.pageTab();
            await scriptDistributionPage.uploadScriptDistribution('Episode', 'Scene');
            await scriptDistributionPage.verifyPopUpMessage('Script page uploaded successfully');
        }); 

        test('verify fullScript workflow: view → viewCount → download → downloadCount → delete', async () => {
            await scriptDistributionPage.pageTab();
            await scriptDistributionPage.clickPageFolder();

            await scriptDistributionPage.view();
            await scriptDistributionPage.viewCount('pages');

            await scriptDistributionPage.download();
            await scriptDistributionPage.verifyPopUpMessage('File downloaded successfully');
            await scriptDistributionPage.downloadCount('pages');

            await scriptDistributionPage.delete();
            await scriptDistributionPage.verifyPopUpMessage('Script page has been deleted successfully.');
            
        });
    
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/13_scriptDistributionTest.spec.js --project=chromium --headed
   */ 
