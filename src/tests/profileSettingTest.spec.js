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
        await settingPage.openProfileSetting();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });


    test.describe('Edit Profile', () => {

        test('Verify editing the profile name → add a BCC preset → delete the BCC preset → add the BCC preset again.', async () => {
            await settingPage.editProfiles();
            await settingPage.addPreset();
            await settingPage.deletePreset();
            await settingPage.addPreset();
            await settingPage.submitEditProfileFunctionality();
        });
    
    });

    test.describe('Invites User', () => {

        test('Verify the user invitation functionality through email sharing', async () => {
            await settingPage.inviteUsers();
        });
    
    });

    test.describe.skip('Web Preference', () => {

        test('Verify default unit is set to Call Sheet and reflected on Home', async () => {
            await settingPage.webPreference();
        });
    
    });

    test.describe('Edit Preference', () => {

        test('Verify edit', async () => {
            await settingPage.editPreference();
        });
    
    });

    test.describe('Recovery Code or Email', () => {

        test('Verify recovery email or code', async () => {
            await settingPage.recoveryCodeEmail();
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/profileSettingTest.spec.js --project=chromium --headed
   */ 
