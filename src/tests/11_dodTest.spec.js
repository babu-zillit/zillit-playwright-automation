import { test } from '@playwright/test';
import ScheduleDOD from "../pages/schedule-dod";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Schedule D.O.D', () => {
    let context;
    let page;
    let uploadmedia;
    let dodPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        dodPage = new ScheduleDOD(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await dodPage.clickDODTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('D.O.D', () => {

        test('verify upload dod document', async () => {
            await dodPage.uploadDOD('Babu', '99');  
            await dodPage.verifyPopUpMessage('Schedule D.O.D. page uploaded successfully.');
        });

        test('verify dod workflow: view → viewCount → download → downloadCount → move → delete', async () => {
            await dodPage.clickDODFolder();
            await dodPage.view();
            await dodPage.viewCount();

            await dodPage.download();
            await dodPage.verifyPopUpMessage('File downloaded successfully');
            await dodPage.downloadCount();

            await dodPage.move();

            await dodPage.delete();
            await dodPage.verifyPopUpMessage('Schedule D.O.D. page deleted successfully.');
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/11_dodTest.spec.js --project=chromium --headed
   */ 
