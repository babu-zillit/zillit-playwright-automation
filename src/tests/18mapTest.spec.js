import { test } from '@playwright/test';
import Map from '../pages/map';
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Map', () => {
    let context;
    let page;
    let uploadmedia;
    let mapPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        mapPage = new Map(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await mapPage.mapTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Map location', () => {

        test('Verify the PIN → Copy the location link → Open it in a new tab → Delete the location', async () => {
           await mapPage.pinLocation();
           await mapPage.fillLocationDetails();
           await mapPage.viewPinnedLocation();
           await mapPage.copyViewLocationLink();
           await mapPage.deleteLocation();
        });

        test('Search and verify the location using the PIN, fill in the details, then delete the location', async () => {
           await mapPage.searchLocation();
           await mapPage.fillLocationDetails();
           await mapPage.viewPinnedLocation();
           await mapPage.deleteLocation();
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/18mapTest.spec.js --project=chromium --headed
   */ 
