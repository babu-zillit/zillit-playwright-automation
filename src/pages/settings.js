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

        //Edit Profile
         this.editProfile = page.locator('#edit_profile');
         this.lastName = page.locator('#lastName');
         this.openBccPreset = page.locator('#bcc_preset_modal_open_button');
         this.addBccPreset = page.locator('#add_bcc_preset_popover_button');
         this.to = page.locator('[placeholder="To"]');
         this.bccSubmit = page.locator('#add_bcc_preset_submit_button');
         this.deleteBccPreset = page.locator('#add_bcc_preset_trash_button');
         this.sumbitEditProfile = page.locator('#submit_edit_profile_button');

        //Invite User
        this.inviteUser = page.locator('#invite_users');
        this.share = page.locator('#invite_users_open_share_popover_button');
        this.shareViaInternalEmail = page.locator('#invite_users_share_via_internal_email_button');
        this.to = page.locator('[placeholder="To"]');
        this.send = page.locator('div.ant-modal-footer button');
        this.cancelShareProjectCodeWindow = page.locator('#invite_users_close_modal_button');

        //Web Preferences
        this.webPreferences = page.locator('#web_preferences');
        this.clickOnHomeUnit = page.locator('div.ant-select-selector');
        
        //Edit Preferences
        this.editPreferences = page.locator('#edit_preference');
        this.changeProfilePicture = page.locator('span.ant-upload input[type="file"]');
        this.uploadProfilePicture = page.locator('#edit_preferences_change_profile_picture_button');
        this.country = page.locator('#country_code');
        this.phone = page.locator('#phone');
        this.selectCheckBox = page.locator('input.ant-checkbox-input');
        this.gender = page.locator('#gender');
        this.submitEditPreference = page.locator('#edit_preferences_submit_button');

        //Recovery Code or Email
        this.recoveryCode = page.locator('#recovery_code_or_email');
        this.recoveryEmail = page.locator('#recoveryForm_recoveryEmail');
        this.recoveryUpdate = page.locator('#recovery_code_update_button');

        //Create New Department 
        this.createNewDepartment = page.locator('#create_new_department');
        this.enterDepartmentName = page.locator('[placeholder="Enter Department Name"]');
        this.saveDepartment = page.locator('#create_new_department_button');
        this.cancelDepartmentButton = page.locator('#cancel_new_department_button');

        this.delete = page.locator('[aria-label="delete"]');
        this.yesButton = page.locator('//div[@class="ant-popconfirm-buttons"]//button');

        //Create New Designation
        this.createNewDesignation = page.locator('#create_new_designation');
        this.enterNewDesignation = page.locator('[placeholder="Enter new designation"]');
        this.addDesignation = page.locator('#create_new_designation_button');
        this.okButton = page.locator('//div[@class="ant-modal-footer"]//button//span[text()="Ok"]');

        //Create Home Unit
        this.createHomeUnitTab = page.locator('#create_home_unit');
        this.createHomeUnitPlusButton = page.locator('#create_home_unit_drawer_open_button');
        this.enterUnitName = page.locator('[placeholder="Enter unit name"]');
        this.allDepartment = page.locator('[value="all department"]');
        this.selectAllUser = page.locator('[value="selected user"]');
        this.createHomeUnitButton = page.locator('#create_home_unit_button');

        //Watermark logo company 
        this.waterMarkLogoCompany = page.locator('#watermark_logo_of_company');
        this.uploadImage = page.locator("//button[@id='upload_watermark_logo_button']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.submitWaterMarkLogo = page.locator('#submit_watermark_logo_button');
        this.cancelWaterMarkLogo = page.locator('#cancel_watermark_logo_button');
        this.deleteWaterMarkLogo = page.locator('#delete_watermark_logo_button');

        //Forward to Remote Projects
        this.remoteShootingUnit = page.locator('#create_remote_shooting_unit');
        this.createRemoteUnit = page.locator('#create_remote_unit_drawer_open_button');
        this.enterUnitName = page.locator('[placeholder="Enter unit name"]');
        this.selectsUserAdmin = page.locator('div.ant-select-selector');
        this.saveRemoteUnit = page.locator('#save_remote_unit_button');

        //Delete & Stop project
        this.deleteProject = page.locator('#delete_project');
        this.projectDeleteButton = page.locator('[id="12hour_project_deletion_button"]');
        this.confirm = page.locator('//div[@class="ant-modal-footer"]//button');
        this.stopProjectDeletion = page.locator('#stop_project_deletion');

        //Pre Approved User
        this.preApprovedUserTab = page.locator('#pre_approved_users');

        //Create Join Unit
        this.createJoinButton = page.locator('[aria-label="plus"]');
        this.enterJoinUnitName = page.locator('#unit_name');

        //Edit Project Name
        this.editProjectNametab = page.locator('#edit_project_name');
        this.submitEditProject = page.locator('#edit_project_submit_button');

        //Set View SOS Receiver
        this.setViewSOSReceiverTab = page.locator('#set_view_sos_receivers');
        this.contactName = page.locator('#contact_name');
        this.relation = page.locator('#relation')
        this.countryCode = page.locator('#country_code');
        this.phoneNumber = page.locator('#phone_number');
        this.submitOutSiderSOS = page.locator('#submit_outsider_sos_button');

        //Approve User Profile
        this.approveUserProfileTab = page.locator('#approve_user_profile');
        this.open = page.locator('#open_user_profile');
        this.approve = page.locator('#approve_user_profile');



    }

    async openProfileSetting(){
        await this.settings.click();
    }

    async openSettings(){
        await this.page.waitForTimeout(10000);
        await this.settings.click();
        await this.adminSetting.click();
    }

    async createDepartment(creationPopup){
        await this.createNewDepartment.click();
        await this.enterDepartmentName.fill('Babu');
        await this.saveDepartment.click();
        await this.uploadMedia.verifyPopupMessage(`${creationPopup}`)
        await this.cancelDepartmentButton.click();
    }

    async deleteDepartment(deletionPopup){
        await this.createNewDepartment.click();
        await this.delete.click();
        await this.yesButton.last().click();
        await this.uploadMedia.verifyPopupMessage(`${deletionPopup}`);
        await this.cancelDepartmentButton.click();
    }

    async createDesignation(creationPopup){
        await this.createNewDesignation.click();
        await this.page.locator('.ant-select-selector').click();
        await this.page.waitForSelector('div.ant-collapse-item', { state: 'visible' });
        await this.page.locator('div.ant-select-item-option-content', { hasText: 'Writer' }).click();
        await this.enterNewDesignation.fill('Babu Tester');
        await this.addDesignation.click();
        await this.uploadMedia.verifyPopupMessage(`${creationPopup}`);
        await this.okButton.click();
    }

    async deleteDesignation(deletionPopup){
        await this.createNewDesignation.click();
        await this.page.locator('//div[@class="ant-collapse-header"]//span[text()="Writer"]').click();
        await this.delete.click();
        await this.yesButton.last().click();
        await this.uploadMedia.verifyPopupMessage(`${deletionPopup}`);
        await this.okButton.click();
    }

    async createHomeUnit(creationPopup){
        await this.createHomeUnitTab.click();
        await this.createHomeUnitPlusButton.click();
        await this.enterUnitName.fill('Sam');
        await this.createHomeUnitButton.click();
        await this.uploadMedia.verifyPopupMessage(`${creationPopup}`);
    }

    async editHomeUnit(){
        await this.page.waitForTimeout(2000);
        await this.createHomeUnitTab.click();
        await this.page.waitForTimeout(3000);
        await this.page.locator('[aria-label="edit"]').last().click();
        await this.page.waitForTimeout(3000);
        const inputLocator = this.page.locator('//input[@type="text"]').last();
        await inputLocator.click();
        await inputLocator.fill('Sam1');
        await this.page.locator('#edit_home_unit').click();
        await this.page.waitForTimeout(3000);
    }

    async deleteHomeUnit(deletionPopup){
        await this.createHomeUnitTab.click();
        await this.page.waitForTimeout(3000);
        await this.page.locator('[aria-label="delete"]').last().click();
        await this.yesButton.last().click();
        await this.uploadMedia.verifyPopupMessage(`${deletionPopup}`);
        await this.page.locator('[aria-label="close"]').last().click();
    }

    async createHomeUnitBySelectingAllUser(creationPopup){
        await this.createHomeUnitTab.click();
        await this.createHomeUnitPlusButton.click();
        await this.enterUnitName.fill('Bhavik');
        const checkbox = this.selectAllUser;
        if (!(await checkbox.isChecked())) {
            await checkbox.check();
        }
        const checkBoxUser = this.page.locator('input.ant-checkbox-input').first();
        if(!(await checkBoxUser.isChecked())){
            await checkBoxUser.check();
        }
        await this.createHomeUnitButton.click();
        await this.uploadMedia.verifyPopupMessage(`${creationPopup}`);
    }

    async uploadWaterMarkLogo(successMsg){
        await this.page.waitForTimeout(3000);
        await this.waterMarkLogoCompany.click();
        await this.uploadImage.setInputFiles(mediapaths.image);
        await this.submitWaterMarkLogo.waitFor({ state: 'visible' });
        await this.submitWaterMarkLogo.click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`)
        await this.cancelWaterMarkLogo.click();
    }

    async deleteWaterMarkLogoCompany(){
        await this.waterMarkLogoCompany.click();
        await this.deleteWaterMarkLogo.waitFor({ state: 'visible' });
        await this.deleteWaterMarkLogo.click();
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

    async deleteProjects(deletionPopup){
        await this.page.waitForTimeout(3000);
        await this.deleteProject.click();
        await this.page.waitForTimeout(2000);
        await this.projectDeleteButton.click();
        await this.page.waitForTimeout(2000);
        const confirmButton = this.page.locator('//button[.//span[text()="Confirm"]]');
        await confirmButton.click();
        await this.uploadMedia.verifyPopupMessage(`${deletionPopup}`)
    }

    async stopProjectDeletions(stopPopup){
        await this.page.waitForTimeout(3000);
        await this.stopProjectDeletion.click();
        await this.page.waitForTimeout(200);
        await this.page.locator('//div[@class="ant-modal-footer"]//button//span[text()="Stop Delete"]').click();
        await this.uploadMedia.verifyPopupMessage(`${stopPopup}`) 
    }

    async changeDepartmentListOrder(successMsg){
        await this.page.locator('#change_department_listing_order').click();
        const source = this.page.locator('[role="button"]').nth(5); // the one you want to move up
        const target = this.page.locator('[role="button"]').nth(4); // the one above it
        await source.dragTo(target);
        await this.page.locator('#save_change_priority').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async editProfiles(){
        await this.editProfile.click();
        await this.lastName.fill('Web1');  
    }

    async addPreset(){
        await this.openBccPreset.click();
        await this.addBccPreset.click();

        const randomNumber = Math.floor(Math.random() * 10000);
        await this.to.fill(`bhavik+${randomNumber}@zillit.com`);
        await this.page.keyboard.press('Enter');
        await this.bccSubmit.click();
        await this.page.waitForTimeout(3000);
       // await this.uploadMedia.verifyPopupMessage('Bcc preset has been updated successfully.');
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
        await this.uploadMedia.verifyPopupMessage('Email has been sent');

        await this.share.click();
        await this.page.locator('#invite_users_copy_link_button').click();
        await this.uploadMedia.verifyPopupMessage('Link copied to clipboard');
        await this.page.locator('span.ant-modal-close-x').last().click();

        await this.page.locator('//span[@class="ant-menu-title-content"]//span[text()="Home"]').click();
        await this.page.locator('[placeholder="Type your message"]').click();
        await this.page.keyboard.press('Meta+V'); 
        await this.page.locator('#send_messages_to_users_button').click();
    }

    async webPreference(){
        await this.page.waitForTimeout(2000);
        await this.webPreferences.click();
        await this.page.locator('//span[@class="ant-menu-title-content"]//span[text()="Home"]').click();
        await this.settings.click();
        await this.page.waitForTimeout(3000);
        await this.webPreferences.click();
        await this.page.waitForTimeout(2000);
        await this.clickOnHomeUnit.click();
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.uploadMedia.verifyPopupMessage('Default Tab updated successfully!');
    }

    async leaveUser(){
        await this.page.locator('#leave_project').click();
        await this.page.locator('div.ant-modal-footer button').first().click();
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
        const randomNumber = Math.floor(Math.random() * 100); 
        await this.recoveryEmail.fill(`pramod+${randomNumber}@zillit.com`);
        await this.recoveryUpdate.click();
        await this.uploadMedia.verifyPopupMessage('A verification link has been sent to your email address, kindly verify to proceed.');
    }

    async customizationTools(successMsg){
        await this.page.locator('#customization_of_tools').click();
        const checkbox = this.page.locator('input.ant-checkbox-input').first();
        if(await checkbox.isChecked()){
            await checkbox.click();
            await this.page.locator('div.ant-popconfirm-buttons button').last().click();
            await checkbox.click();
        }
        if(!(await checkbox.isChecked())){
            await checkbox.click();
        }
        await this.page.locator('input.ant-checkbox-input').last();
        await this.page.locator('#save_customize_tools_button').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async approveUserProfile(){
        await this.page.locator('#approve_user_profile').click();
    }

    async createJoinUnit(creationPopup){
        await this.page.getByText('Create Join Unit', { exact: true }).click();
        await this.createJoinButton.click();
        await this.enterJoinUnitName.fill('Babu');
        await this.page.locator('div.ant-space-item button').last().click();
        await this.uploadMedia.verifyPopupMessage(`${creationPopup}`);
        await this.page.locator('span.ant-btn-icon').first().click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(2000);
    }

    async deleteJoinUnit(deletionPopup){
        await this.page.getByText('Create Join Unit', { exact: true }).click();
        await this.page.locator('div.ant-space-item button').last().click();
        await this.page.locator('div.ant-popconfirm-buttons button').last().click();
        await this.uploadMedia.verifyPopupMessage(`${deletionPopup}`);
        await this.page.locator('span.ant-btn-icon').first().click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(2000);
    }

    async editProjectName(updatePoup){
        await this.editProjectNametab.click();
        const projectName = this.page.locator('#projectName');
        await projectName.click();
        await projectName.press('End');
        await projectName.type('s'); 
        await this.submitEditProject.click();
        await this.uploadMedia.verifyPopupMessage(`${updatePoup}`);
    }

    async preApprovedUser(departmentName, designationName){
        await this.page.waitForTimeout(4000);
        await this.preApprovedUserTab.click();
        await this.page.locator('#firstName').fill('Saloni');
        await this.page.locator('#lastName').fill('Rawat');

        await this.page.locator('#department').click();
        await this.page.waitForSelector('.ant-select-dropdown:visible');
        await this.page.getByTitle(departmentName, { exact: true }).click();

        await this.page.locator('span.ant-select-selection-item').last().click();
        await this.page.waitForSelector('.ant-select-dropdown:visible');
        await this.page.getByTitle(designationName, { exact: true }).click();

        await this.page.waitForTimeout(1000);
        await this.page.locator('#unit').click();
        await this.page.keyboard.press('Enter');
        await this.page.locator('#pre_approved_submit_button').click();
        await this.uploadMedia.verifyPopupMessage('Pre-Approved User create Sucessfully!');

        await this.page.locator('ul.ant-list-item-action li span[aria-label="mail"]').first().click();
        await this.page.locator('ul.ant-dropdown-menu li').first().click();
        await this.to.fill('vishal@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.page.locator('#subject').fill('Regarding PreApproved User');
        await this.send.last().click();
        await this.uploadMedia.verifyPopupMessage('Email sent successfully');

        await this.page.locator('#close_pre_approved_users_button').click();
    }

    async setSOSReceiver(successMsg){
        await this.page.waitForTimeout(3000);
        await this.setViewSOSReceiverTab.click();
        await this.page.locator('[role="tab"]').last().click();
        await this.contactName.fill('Sweety');
        await this.relation.click();
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        await this.countryCode.click();
        await this.countryCode.fill('India');
        await this.page.keyboard.press('Enter');
        await this.phoneNumber.fill('9645019602');
        await this.submitOutSiderSOS.click();
        await this.uploadMedia.verifyPopupMessage(successMsg);
        await this.page.locator('div.ant-drawer-header-title button').first().click();
    }

    async editSOSReciever(successMsg){
        await this.page.waitForTimeout(2000);
        await this.setViewSOSReceiverTab.click();
        await this.page.locator('[role="tab"]').last().click();
        await this.page.waitForTimeout(3000);
        await this.page.locator('[aria-label="edit"]').first().click();
        await this.contactName.fill('Sweety1');
        await this.submitOutSiderSOS.click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
        await this.page.locator('div.ant-drawer-header-title button').first().click();
    }

    async deleteSOSReciever(){
        await this.page.waitForTimeout(2000);
        await this.setViewSOSReceiverTab.click();
        await this.page.locator('[role="tab"]').last().click();
        await this.page.waitForTimeout(3000);
        await this.page.locator('[aria-label="delete"]').first().click();
        await this.page.locator('div.ant-popconfirm-buttons button').last().click();
        await this.uploadMedia.verifyPopupMessage('Record deleted successfully');
        await this.page.locator('div.ant-drawer-header-title button').first().click();
    }

    async approveUserProfile(successMsg){
        await this.approveUserProfileTab.click();
        await this.open.click();
        await this.approve.last().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
        await this.page.waitForTimeout(2000);
    }

    async userManagement(){
        await this.page.locator('#user_management').click();
        await this.page.waitForTimeout(4000);
        await this.page.locator('[role="switch"]').last().click();
        await this.page.waitForTimeout(2000);
        await this.page.locator('div.ant-modal-confirm-btns button').last().click();
        await this.page.waitForTimeout(5000);
        await this.page.goBack({ waitUntil: 'load' });
        await this.settings.click();
        await this.adminSetting.click();
        await this.page.waitForTimeout(2000);
    }

}