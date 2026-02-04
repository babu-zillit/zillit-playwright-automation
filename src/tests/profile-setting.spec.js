import { test } from '@playwright/test';
import Settings from "../pages/settings";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Settings', () => {
    let context;
    let page;
    let uploadmedia;
    let settingPage;

    test.beforeEach(async ({ browser }) => {
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

    test.afterEach(async () => {
        logger.info('close browser');
        await context.close();
    });


    test.describe('Edit Profile', () => {

        test('Verify editing the profile name → add a BCC preset → delete the BCC preset → add the BCC preset again. and submit the edit profile', async () => {
            await settingPage.editProfiles();
            await settingPage.addPreset();
            await settingPage.deletePreset();
            await settingPage.addPreset();
            await settingPage.submitEditProfileFunctionality();
        });
    
    });

    test.describe('Edit Preference', () => {

        test('Verify user can upload profile picture → select country → enter phone number → select all checkboxes.', async () => {
            await settingPage.editPreference();
        });
    
    });

    test.describe('Recovery Code or Email', () => {

        test('Verify user can update recovery email or code', async () => {
            await settingPage.recoveryCodeEmail();
        });
    
    });

    test.describe('Web Preference', () => {

        test('Verify the user can change the default home unit', async () => {
            await settingPage.webPreference();
        });
    
    });

    test.describe('Invites User', () => {

        test('Verify the user invitation functionality through email sharing and copy the link and send it to home', async () => {
            await settingPage.inviteUsers();
        });
    
    });

    test.describe('Leave User', () => {

        test('Verify the user can leave the project', async () => {
            await settingPage.leaveUser();
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/profileSettingTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/profile-setting.spec.js --project=chromium --headed
   */ 
