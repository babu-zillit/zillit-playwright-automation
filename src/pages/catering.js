import { expect } from '@playwright/test';
import logger from "../utils/loggerUtils";

export default class Catering {  

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.settings = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Settings"]');

        /**
         * Catering page locators
         */
        this.selectUserButton = page.locator('#catering_select_user_button');
        this.cateringSettingButton = page.locator('#catering_settings');
        this.createCaterUnitButton = page.locator('#create_home_unit_drawer_open_button');
        this.enterCaterUnitName = page.locator('input[placeholder="Unit Name"]');
        this.okButton = this.page.locator('//div[@class="ant-modal-footer"]//button//span[text()="Ok"]');
        this.editCaterUnitButton = page.locator('(//span[@aria-label="edit"])[4]');
        this.deleteCaterUnitButton = page.locator('(//span[@aria-label="delete"])[4]');

        /**
         * Edit profile locators
         */
        this.editProfile = page.locator("text=Edit Profile");
        this.department = page.locator('(//div[@class="ant-select-selector"])[1]');
        this.close = page.locator('text=Close');
        this.designation = page.locator("(//span[@class='ant-select-selection-item'])[2]");
        this.submit = page.locator('[id="submit_edit_profile_button"]');

        /**
         * Send message locators
         */
        this.typeYourMessage = page.locator('textarea[placeholder="Type your message"]');
        this.sendButton = page.locator('span[aria-label="send"]');
    }



    async clickCateringTab(){
        await this.tools.click();
        await this.page.waitForTimeout(10000);
        await this.page.locator('div.ant-card-body').getByText('Catering').click();
    }

    async selectUser(){
        await this.selectUserButton.click();
        await this.page.locator('.h-10.w-10.bg-orange-500.rounded-full.text-xl').first().click();
    }

    async openEditProfile(){
        await this.settings.click();
        await this.editProfile.click();
    }

    async changeDepartmentAndDesignation(departmentName, designationName){

        await this.department.waitFor({ state: 'visible' });
        await this.department.click();

        if(await this.close.isVisible()){
            await this.close.click();
            await this.department.click();
        }
        await this.page.keyboard.type('Ca');

        const departmentOptions = this.page.locator('.ant-select-dropdown .ant-select-item-option');
        await departmentOptions.first().waitFor({ state: 'visible' });
        console.log('Dropdown Options:', await departmentOptions.allTextContents());

        const department = this.page.locator('.ant-select-dropdown .ant-select-item-option', { hasText: departmentName });
        await department.click();

        await this.designation.click();

        const designationOptions = this.page.locator('.ant-select-dropdown .ant-select-item-option');
        await designationOptions.first().waitFor({ state: 'visible' });
        console.log('Dropdown Options:', await designationOptions.allTextContents());

        const designation = this.page.locator('.ant-select-dropdown .ant-select-item-option', { hasText: designationName });
        await designation.click();

        await this.submit.click();

        try{
            const successMsg = this.page.locator('text=Profile updated successfully.');
            await successMsg.waitFor({ state: 'visible' });
            await successMsg.waitFor({ state: 'hidden' });

        }catch(error){
            console.log('Does not show any pop up after clicking on submit button');
        }
    }


    async sendMessageAndVerifyPopup(expectedPopupText){
        try{
            await this.typeYourMessage.fill('Hello Guys');
            await this.sendButton.click();

            const popup = this.page.locator(`text=${expectedPopupText}`);
            await popup.waitFor({ state: 'visible' });
            console.log('Popup appeared:', expectedPopupText);

            await popup.waitFor({ state: 'hidden' });
            console.log('Popup disappeared');

        } catch(error){
            console.error('Failed to send the message or verify popup:', error);
        }
    }


    async createCaterUnit(){
        await this.settings.click();
        await this.cateringSettingButton.waitFor({ state: 'visible' });
        await this.cateringSettingButton.click();
        await this.createCaterUnitButton.click();
        await this.enterCaterUnitName.fill('Babu');
        await this.okButton.click();

        const successMsg = this.page.locator('text=A new unit has been created');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }


    async editCaterUnit(){
         await this.settings.click();
        await this.cateringSettingButton.waitFor({ state: 'visible' });
        await this.cateringSettingButton.click();
        await this.editCaterUnitButton.click();
        await this.enterCaterUnitName.fill('Babu1');
        await this.okButton.click();
    }


    async deleteCaterUnit(){
         await this.settings.click();
        await this.cateringSettingButton.waitFor({ state: 'visible' });
        await this.cateringSettingButton.click();
        await this.deleteCaterUnitButton.click();
        await this.page.locator('//div[@class="ant-popconfirm-buttons"]//button//span[text()="Yes"]').click();

        const deleteSuccessMsg = this.page.locator('text=Unit deleted successfully');
        await deleteSuccessMsg.waitFor({ state: 'visible' });
        await deleteSuccessMsg.waitFor({ state: 'hidden' });
    }

}