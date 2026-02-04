import { test } from '@playwright/test';
import Map from '../pages/map';
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Map', () => {
    test.setTimeout(60000);
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


    test.describe('Map', () => {

        test('Verify the user can search and select a city on the map', async () => {
            await mapPage.searchSelectCity();
        });

        test('Verify the user can pin a location on the map', async () => {
            await mapPage.pinLocation();
        });

        test('Verify the user can fill and save location details', async () => {
            await mapPage.fillLocationDetails();
        });

        test('Verify the user can view the pinned location on the map', async () => {
            await mapPage.viewPinnedLocation();
        });

        test('Verify user can copy and open the pinned location link in new tab', async () => {
            await mapPage.copyViewLocationLink();
        });

        test('Verify user can delete a pinned location', async () => {
            await mapPage.deleteLocation();
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/18_mapTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/map.spec.js --project=chromium --headed
   */ 
