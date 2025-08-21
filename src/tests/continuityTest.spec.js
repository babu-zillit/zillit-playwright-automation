import { test } from '@playwright/test';
import Continuity from "../pages/continuity";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Continuity', () => {
    let context;
    let page;
    let uploadmedia;
    let continuityPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        continuityPage = new Continuity(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await continuityPage.clickContinuityTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('My Department', () => {

        test('verify upload the continuity scene', async () => {
            await continuityPage.uploadMedia();
        });

        test('verify continuity scene edit -> forward -> delete', async () => {
            await continuityPage.openSceneFolder();
            await continuityPage.edit();
            await continuityPage.forward();
            await continuityPage.closeWindow();
        });   
    
    });

    test.describe('All Department', () => {

        test('verify all department continuity scene', async () => {
            await continuityPage.allDepartmentScene();
        });

        test('verify delete all department continuity scene', async () => {
            await continuityPage.delete();
        });

        test('verify delete my department continuity scene', async () => {
            await continuityPage.myDepartment();
            await continuityPage.openSceneFolder();
            await continuityPage.delete();
        });
            
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/continuityTest.spec.js --project=chromium --headed
   */ 
