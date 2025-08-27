import { test } from '@playwright/test';
import ApproveUserRequest from "../pages/Approve-user-request";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";
import ToolCustomization from '../pages/tool-customization';

test.describe('Tools Customization', () => {
    let context;
    let page;
    let uploadmedia;
    let toolCustomization;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        toolCustomization = new ToolCustomization(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await toolCustomization.openTools();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });


    test.describe('tool customization', () => {

        test('verify enable all the module of tools', async () => {
            await toolCustomization.enableToolsModule();
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/07_tool-customizationTest.spec.js --project=chromium --headed
   */ 
