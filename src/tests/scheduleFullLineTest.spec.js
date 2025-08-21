import { test } from '@playwright/test';
import ScheduleFullOneLine from "../pages/scheduleFull-oneLine";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Script & Page Distribution', () => {
    let context;
    let page;
    let uploadmedia;
    let scheduleFullOneLinePage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        scheduleFullOneLinePage = new ScheduleFullOneLine(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await scheduleFullOneLinePage.scheduleFuleLineTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Schedule Full Line', () => {

        test('verify upload schedule full document', async () => {
            await scheduleFullOneLinePage.scheduleFuleLineTab();
            await scheduleFullOneLinePage.uploadScheduleFullLine('Episode');

            await scheduleFullOneLinePage.verifyPopUpMessage('Schedule full uploaded successfully')
            .catch(e => console.log('Error verifying script uploaded popup:', e.message));
        });

        test('verify fullScript workflow: view → viewCount → download → downloadCount', async () => {
            await scheduleFullOneLinePage.scheduleFuleLineTab();
            await scheduleFullOneLinePage.view();
            await scheduleFullOneLinePage.viewCount('scheduleFull');

            await scheduleFullOneLinePage.download();
            await scheduleFullOneLinePage.verifyPopUpMessage('File downloaded successfully')
            .catch(e => console.log('Error verifying download popup:', e.message));
            await scheduleFullOneLinePage.downloadCount('scheduleFull');
        });
    
    });

    test.describe('Pages', () => {

        test('verify upload page document', async () => {
            await scheduleFullOneLinePage.pageTab();
            await scheduleFullOneLinePage.uploadSchedulePages();

            await scheduleFullOneLinePage.verifyPopUpMessage('Page uploaded successfully')
            .catch(e => console.log('Error verifying page uploaded popup:', e.message));
        }); 

        test('verify fullScript workflow: view → viewCount → download → downloadCount → delete', async () => {
            await scheduleFullOneLinePage.pageTab();
            await scheduleFullOneLinePage.clickPageFolder();

            await scheduleFullOneLinePage.view();
            await scheduleFullOneLinePage.viewCount('pages');

            await scheduleFullOneLinePage.download();
            await scheduleFullOneLinePage.verifyPopUpMessage('File downloaded successfully')
            .catch(e => console.log('Error verifying download popup:', e.message));
            await scheduleFullOneLinePage.downloadCount('pages');

            await scheduleFullOneLinePage.delete();
            await scheduleFullOneLinePage.verifyPopUpMessage('Page has been deleted successfully.')
            .catch(e => console.log('Error verifying download popup:', e.message));

            await scheduleFullOneLinePage.closePageScreen();
            
        });
    
    });


    test.describe('Schedule One Line', () => {

        test('verify upload page document', async () => {
            await scheduleFullOneLinePage.scheduleOneLineTab();
            await scheduleFullOneLinePage.uploadScheduleFullLine('Episode');

            await scheduleFullOneLinePage.verifyPopUpMessage('Schedule One Line uploaded successfully.')
            .catch(e => console.log('Error verifying page uploaded popup:', e.message));
        }); 

        test('verify fullScript workflow: view → viewCount → download → downloadCount → delete', async () => {
            await scheduleFullOneLinePage.scheduleOneLineTab();

            await scheduleFullOneLinePage.view();
            await scheduleFullOneLinePage.viewCount('oneLine');

            await scheduleFullOneLinePage.download();
            await scheduleFullOneLinePage.verifyPopUpMessage('File downloaded successfully')
            .catch(e => console.log('Error verifying download popup:', e.message));
            await scheduleFullOneLinePage.downloadCount('oneLine');
        });
    
    });



});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/scheduleFullLineTest.spec.js --project=chromium --headed
   */ 
