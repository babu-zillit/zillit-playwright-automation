import { test } from '@playwright/test';
import Settings from "../pages/settings";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Admin Settings', () => {
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

        test('Verify the creation of a new department', async () => {
            await settingPage.createDepartment('Department has been created successfully.');
        });
        test('Verify the deletion of a department', async () => {
            await settingPage.deleteDepartment('Department deleted successfully');
        });

    });


    test.describe('Create New Designation', () => {

        test('Verify creating a new designation', async () => {
            await settingPage.createDesignation('Designation has been created successfully.');
        });
        test('Verify the deletion of a designation', async () => {
            await settingPage.deleteDesignation('Designation has been deleted successfully.');
        });
    
    });

    test.describe('Create Join Unit', () => {

        test('Verify the user can create a join unit', async () => {
            await settingPage.createJoinUnit('Remote unit created successfully.');
        });
        test('Verify the user can delete a join unit', async () => {
            await settingPage.deleteJoinUnit('Remote unit deleted successfully.');
        });
    
    });

    test.describe('Edit Project Name', () => {

        test('Verify the user can edit the project name', async () => {
            await settingPage.editProjectName('Project name updated successfully');
        });
    
    });

    test.describe('Customization Of Tools', () => {

        test('Verify the user can enable or disable tools in the Tools module', async () => {
            await settingPage.customizationTools('Project tools updated.');
        });
    
    });

    test.describe('Set SOS Receiver', () => {

        test('Verify the user can set the SOS receiver', async () => {
            await settingPage.setSOSReceiver('Record added successfully');
        });
        test('Verify the user can edit the SOS receiver', async () => {
            await settingPage.editSOSReciever('Record added successfully');
        });
        test('Verify the user can delete the SOS receiver', async () => {
            await settingPage.deleteSOSReciever('Record deleted successfully');
        });
    
    });

    test.describe('Home Unit', () => {

        test('Verify creating a home unit by selecting all departments', async () => {
            await settingPage.createHomeUnit('Home unit created successfully');
        });
        test('Verify the user can edit a home unit', async () => {
            await settingPage.editHomeUnit();
        });
        test('Verify the user can delete a home unit', async () => {
            await settingPage.deleteHomeUnit('Unit deleted successfully.');
        });
        test('Verify creating a home unit by selecting all users', async () => {
            await settingPage.createHomeUnitBySelectingAllUser('Home unit created successfully');
        });
    
    });

    test.describe('WaterMark Logo Company', () => {

        test('Verify the user can upload the watermark logo', async () => {
            await settingPage.uploadWaterMarkLogo('Watermark uploaded Sucessfully');
        });
        test('Verify the user can delete the watermark logo', async () => {
            await settingPage.deleteWaterMarkLogoCompany();
        });
    
    });

    test.describe('Change Department List Order', () => {

        test('Verify the user can change the order of the department list', async () => {
            await settingPage.changeDepartmentListOrder('Departments have been reordered successfully.');
        });
    
    });

    test.describe.skip('Approve User Profile', () => {

        test('Verify the user can approve a user profile', async () => {
            await settingPage.approveUserProfile('Request approved and details updated successfully.');
        });
    
    });

    test.describe('User Management', () => {

        test('Verify the user can change a regular user to admin', async () => {
            await settingPage.userManagement();
        });
    
    });

    test.describe('Delete project', () => {

        test('Verify the user can delete a project', async () => {
            await settingPage.deleteProjects('Your Project Will Be Deleted After 12 hours');
        });
        test('Verify the user can stop projects after deletion', async () => {
            await settingPage.stopProjectDeletions('Project deletion has been stopped.');
        });
        test('Verify the user can delete the project again', async () => {
            await settingPage.deleteProjects('Your Project Will Be Deleted After 12 hours');
        });
    
    });

    test.describe('Pre Approved User', () => {

        test('Verify the user can create a pre-approved user and send an internal email', async () => {
            await settingPage.preApprovedUser('Production', 'Assistant coordinator');
        });
    
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/adminSettingTest.spec.js --project=chromium --headed
   */ 
