import { test } from '@playwright/test';
import Settings from "../pages/settings";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Settings', () => {
    let context;
    let page;
    let uploadmedia;
    let settingPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        settingPage = new Settings(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await settingPage.openSettings();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Create New Department', () => {

        test('verify the create new department', async () => {
            await settingPage.createDepartment();
        });

        test('verify the delete new department', async () => {
            await settingPage.deleteDepartment();
        });
    
    });


    test.describe('Create New Designation', () => {

        test('verify the create new designation', async () => {
            await settingPage.createDesignation();
        });

        test('verify the delete new designation', async () => {
            await settingPage.deleteDesignation();
        });
    
    });


    test.describe('Home Unit', () => {

        test('verify create home unit', async () => {
            await settingPage.createHomeUnit();
        });

        test.skip('verify edit home unit', async () => {
            await settingPage.editHomeUnit();
        });

        test('verify delete home unit', async () => {
            await settingPage.deleteHomeUnit();
        });
    
    });


    test.describe('WaterMark Logo Company', () => {

        test('verify upload water mark logo', async () => {
            await settingPage.uploadWaterMarkLogo();
        });

        test('verify delete water mark logo', async () => {
            await settingPage.deleteWaterMarkLogoCompany();
        });
    
    });


     test.describe('Delete project', () => {

        test('verify delete the project', async () => {
            await settingPage.deleteProjects();
        });

        test('verify stops the projects', async () => {
            await settingPage.stopProjectDeletions();
        });

        test('verify again delete the project', async () => {
            await settingPage.deleteProjects();
        });
    
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/14_settingTest.spec.js --project=chromium --headed
   */ 
