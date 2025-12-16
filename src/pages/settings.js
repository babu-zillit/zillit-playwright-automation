import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');
import UploadMedia from '../actions/media-uploader';

export default class Settings {

    constructor(page){
        this.page = page;
        this.uploadMedia = new UploadMedia(page);

        this.settings = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Settings"]');
        this.adminSetting = page.locator('[data-node-key="admin"]');

        /**
         * Edit Profile
         */
         this.editProfile = page.locator('#edit_profile');
         this.lastName = page.locator('#lastName');
         this.openBccPreset = page.locator('#bcc_preset_modal_open_button');
         this.addBccPreset = page.locator('#add_bcc_preset_popover_button');
         this.to = page.locator('[placeholder="To"]');
         this.bccSubmit = page.locator('#add_bcc_preset_submit_button');
         this.deleteBccPreset = page.locator('#add_bcc_preset_trash_button');
         this.sumbitEditProfile = page.locator('#submit_edit_profile_button');

        /**
         * Invite User
         */
        this.inviteUser = page.locator('#invite_users');
        this.share = page.locator('#invite_users_open_share_popover_button');
        this.shareViaInternalEmail = page.locator('#invite_users_share_via_internal_email_button');
        this.to = page.locator('[placeholder="To"]');
        this.send = page.locator('div.ant-modal-footer button');
        this.cancelShareProjectCodeWindow = page.locator('#invite_users_close_modal_button');

        /**
         * Web Preferences
         */
        this.webPreferences = page.locator('#web_preferences');
        this.clickOnHomeUnit = page.locator('div.ant-select-selector');
        

        /**
         * Edit Preferences
         */
        this.editPreferences = page.locator('#edit_preference');
        this.changeProfilePicture = page.locator('span.ant-upload input[type="file"]');
        this.uploadProfilePicture = page.locator('#edit_preferences_change_profile_picture_button');
        this.country = page.locator('#country_code');
        this.phone = page.locator('#phone');
        this.selectCheckBox = page.locator('input.ant-checkbox-input');
        this.gender = page.locator('#gender');
        this.submitEditPreference = page.locator('#edit_preferences_submit_button');

        /**
         * Recovery Code or Email
         */
        this.recoveryCode = page.locator('#recovery_code_or_email');
        this.recoveryEmail = page.locator('#recoveryForm_recoveryEmail');
        this.recoveryUpdate = page.locator('#recovery_code_update_button');


        /**
         * Create New Department locator
         */ 
        this.createNewDepartment = page.locator('#create_new_department');
        this.enterDepartmentName = page.locator('[placeholder="Enter Department Name"]');
        this.saveDepartment = page.locator('#create_new_department_button');
        this.cancelDepartmentButton = page.locator('#cancel_new_department_button');

        this.delete = page.locator('[aria-label="delete"]');
        this.yesButton = page.locator('//div[@class="ant-popconfirm-buttons"]//button');

        /**
         * Create New Designation locator
         */ 
        this.createNewDesignation = page.locator('#create_new_designation');
        this.enterNewDesignation = page.locator('[placeholder="Enter new designation"]');
        this.addDesignation = page.locator('#create_new_designation_button');
        this.okButton = page.locator('//div[@class="ant-modal-footer"]//button//span[text()="Ok"]');


        /**
         * Create Home Unit
         */ 
        this.createHomeUnitTab = page.locator('#create_home_unit');
        this.createHomeUnitPlusButton = page.locator('#create_home_unit_drawer_open_button');
        this.enterUnitName = page.locator('[placeholder="Enter unit name"]');
        this.allDepartment = page.locator('[value="all department"]');
        this.createHomeUnitButton = page.locator('#create_home_unit_button');

        /**
         * Watermark logo company locator
         */ 
        this.waterMarkLogoCompany = page.locator('#watermark_logo_of_company');
        this.uploadImage = page.locator("//button[@id='upload_watermark_logo_button']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.submitWaterMarkLogo = page.locator('#submit_watermark_logo_button');
        this.cancelWaterMarkLogo = page.locator('#cancel_watermark_logo_button');
        this.deleteWaterMarkLogo = page.locator('#delete_watermark_logo_button');

        /**
         * Forward to Remote Projects
         */
        this.remoteShootingUnit = page.locator('#create_remote_shooting_unit');
        this.createRemoteUnit = page.locator('#create_remote_unit_drawer_open_button');
        this.enterUnitName = page.locator('[placeholder="Enter unit name"]');
        this.selectsUserAdmin = page.locator('div.ant-select-selector');
        this.saveRemoteUnit = page.locator('#save_remote_unit_button');

        /**
         * Delete project locator
         */
        this.deleteProject = page.locator('#delete_project');
        this.projectDeleteButton = page.locator('[id="12hour_project_deletion_button"]');
        this.confirm = page.locator('//div[@class="ant-modal-footer"]//button');
    
        this.stopProjectDeletion = page.locator('#stop_project_deletion');



    }

    async openProfileSetting(){
        await this.settings.click();
    }


    async openSettings(){
        await this.page.waitForTimeout(10000);
        await this.settings.click();
        await this.adminSetting.click();
    }


    async createDepartment(){
        await this.createNewDepartment.click();
        await this.enterDepartmentName.fill('Babu');
        await this.saveDepartment.click();

        const successMsg = await this.page.locator('text=Department has been created successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.cancelDepartmentButton.click();
    }

    async deleteDepartment(){
        await this.createNewDepartment.click();
        await this.delete.click();
        await this.yesButton.nth(1).click();

        const successMsg = await this.page.locator('text=Department deleted successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.cancelDepartmentButton.click();
    }

    async createDesignation(){
        await this.createNewDesignation.click();

        await this.page.locator('.ant-select-selector').click();
        await this.page.waitForSelector('div.ant-collapse-item', { state: 'visible' });
        await this.page.locator('div.ant-select-item-option-content', { hasText: 'Writer' }).click();

        await this.enterNewDesignation.fill('Babu Tester');
        await this.addDesignation.click();

        const successMsg = await this.page.locator('text=Designation has been created successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.okButton.click();
    }

    async deleteDesignation(){
        await this.createNewDesignation.click();
        await this.page.locator('//div[@class="ant-collapse-header"]//span[text()="Writer"]').click();
        
        await this.delete.click();
        await this.yesButton.nth(1).click();

        const successMsg = await this.page.locator('text=Designation has been deleted successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.okButton.click();
    }


    async createHomeUnit(){
        await this.createHomeUnitTab.click();
        await this.createHomeUnitPlusButton.click();
        await this.enterUnitName.fill('Sam');
        await this.createHomeUnitButton.click();

        const successMsg = await this.page.locator('text=Home unit created successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async editHomeUnit(){
        await this.createHomeUnitTab.click();
        await this.page.locator('[aria-label="edit"]').nth(3).click();
        
        const inputLocator = this.page.locator('//input[@type="text"]').nth(1);
        await inputLocator.click();
        await inputLocator.fill('Sam1');

        await this.page.locator('#edit_home_unit').click();
    }

    async deleteHomeUnit(){
        await this.createHomeUnitTab.click();
        await this.page.locator('[aria-label="delete"]').nth(3).click();
        await this.yesButton.nth(1).click();

        const successMsg = await this.page.locator('text=Unit deleted successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.page.locator('[aria-label="close"]').nth(2).click();
    }

    async uploadWaterMarkLogo(){
        await this.page.waitForTimeout(3000);
        await this.waterMarkLogoCompany.click();
        await this.uploadImage.setInputFiles(mediapaths.image);
        await this.submitWaterMarkLogo.waitFor({ state: 'visible' });
        await this.submitWaterMarkLogo.click();

        const successMsg = await this.page.locator('text=Watermark uploaded Sucessfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.cancelWaterMarkLogo.click();
    }

    async deleteWaterMarkLogoCompany(){
        await this.waterMarkLogoCompany.click();
        await this.deleteWaterMarkLogo.waitFor({ state: 'visible' });
        await this.deleteWaterMarkLogo.click();
        //await this.yesButton.nth(1).click();
        await this.page.locator('.ant-popconfirm-buttons button span').nth(1).click();
    }

    async createRemoteProject(){
        await this.page.waitForTimeout(2000);
        await this.remoteShootingUnit.click();
        await this.createRemoteUnit.click();
        await this.enterUnitName.fill('Zl remote automation');
        await this.selectsUserAdmin.last().click();
        await this.page.keyboard.press('Enter');
        await this.saveRemoteUnit.click();

        const popup = this.page.locator("text=Project has been created successfully.");
        await expect(popup).toBeVisible({timeout: 20000});
        await expect(popup).toBeHidden({timeout: 20000});
    }

    async deleteProjects(){
        await this.page.waitForTimeout(3000);
        await this.deleteProject.click();
        await this.page.waitForTimeout(1500);
        await this.projectDeleteButton.click();
        await this.page.waitForTimeout(1500);
        const confirmButton = this.page.locator('//button[.//span[text()="Confirm"]]');
        await confirmButton.click();

        const successMsg = await this.page.locator('text=Your Project Will Be Deleted After 12 hours');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async stopProjectDeletions(){
        await this.stopProjectDeletion.click();
        await this.page.waitForTimeout(1500);
        await this.page.locator('//div[@class="ant-modal-footer"]//button//span[text()="Stop Delete"]').click();

        const successMsg = await this.page.locator('text=Project deletion has been stopped.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async changeDepartmentListOrder(){
        await this.page.locator('#change_department_listing_order').click();
        const source = this.page.locator('[role="button"]').nth(5); // the one you want to move up
        const target = this.page.locator('[role="button"]').nth(4); // the one above it

        await source.dragTo(target);
    }

    async editProfiles(){
        await this.editProfile.click();
        await this.lastName.fill('Web1');  
    }

    async addPreset(){
        await this.openBccPreset.click();
        await this.addBccPreset.click();
        await this.to.fill('bhavik@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.bccSubmit.click();
        await this.uploadMedia.verifyPopupMessage('Bcc preset has been updated successfully.');
    }

    async deletePreset(){
        await this.openBccPreset.click();
        await this.deleteBccPreset.first().click();
        await this.uploadMedia.verifyPopupMessage('Bcc preset has been updated successfully.');
        await this.page.locator('[aria-label="Close"]').last().click();
    }

    async submitEditProfileFunctionality(){
        await this.sumbitEditProfile.click();
        await this.uploadMedia.verifyPopupMessage('Profile updated successfully.');
    }

    async inviteUsers(){
        await this.inviteUser.click();
        await this.share.click();
        await this.shareViaInternalEmail.click();
        await this.to.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.send.last().click();
        await this.uploadMedia.verifyPopupMessage('Email sent successfully');
        await this.cancelShareProjectCodeWindow.click();
    }

    async webPreference(){
        await this.page.waitForTimeout(5000);
        await this.webPreferences.click();
        await this.clickOnHomeUnit.click();
        await this.page.getByRole('option', { name: 'Call Sheet' }).click();

        await this.uploadMedia.verifyPopupMessage('Default Tab updated successfully!');
        await this.page.locator('[aria-label="Close"]').last().click();
    }

    async editPreference(){
        await this.editPreferences.click();
        await this.page.waitForTimeout(2000);
        await this.changeProfilePicture.setInputFiles(mediapaths.image);
        await this.page.locator('div.text-end button').nth(1).click();
        await this.uploadProfilePicture.click();
        await this.uploadMedia.verifyPopupMessage('Profile updated successfully.');

        await this.country.fill('India');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.phone.fill('12345');
        const checkboxes = await this.selectCheckBox.all();
        for (const checkbox of checkboxes) {
            const isChecked = await checkbox.isChecked();
            if (!isChecked) {
            await checkbox.click();
            }
        }
        await this.submitEditPreference.click();
        await this.uploadMedia.verifyPopupMessage('Profile updated successfully.');
    }

    async recoveryCodeEmail(){
        await this.recoveryCode.click();
        await this.recoveryEmail.fill('pramod+389@zillit.com');
        await this.recoveryUpdate.click();
        await this.uploadMedia.verifyPopupMessage('A verification link has been sent to your email address, kindly verify to proceed.');
    }

}