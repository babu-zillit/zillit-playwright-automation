import { test } from '@playwright/test';
import FilmSchedule from '../pages/filmSchedule';
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Film Schedule', () => {
    let context;
    let page;
    let uploadmedia;
    let filmSchedulePage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        filmSchedulePage = new FilmSchedule(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await filmSchedulePage.openFilmSchedule();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('create schedule', () => {

        test('verify user create the schedule', async () => {
            await filmSchedulePage.selectStartDate();
            await filmSchedulePage.selectEndDate();
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/filmSheduleTest.spec.js --project=chromium --headed
   */ 
