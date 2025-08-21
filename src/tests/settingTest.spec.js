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

        test('verify user create new department successfully', async () => {
            await settingPage.createDepartment();
        });

        test('verify user delete new department successfully', async () => {
            await settingPage.deleteDepartment();
        });
    
    });


    test.describe('Create New Designation', () => {

        test('verify user create new designation successfully', async () => {
            await settingPage.createDesignation();
        });

        test('verify user delete new designation successfully', async () => {
            await settingPage.deleteDesignation();
        });
    
    });


    test.describe('Home Unit', () => {

        test('verify user create home unit', async () => {
            await settingPage.createHomeUnit();
        });

        test.skip('verify user edit home unit', async () => {
            await settingPage.editHomeUnit();
        });

        test('verify user delete home unit', async () => {
            await settingPage.deleteHomeUnit();
        });
    
    });


    test.describe('WaterMark Logo Company', () => {

        test('verify user upload water mark logo', async () => {
            await settingPage.uploadWaterMarkLogo();
        });

        test('verify user delete water mark logo', async () => {
            await settingPage.deleteWaterMarkLogoCompany();
        });
    
    });


     test.describe('Delete project', () => {

        test('verify user delete the projects', async () => {
            await settingPage.deleteProjects();
        });

        test('verify user stops the projects', async () => {
            await settingPage.stopProjectDeletions();
        });
    
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/settingTest.spec.js --project=chromium --headed
   */ 
