import { expect } from '@playwright/test';
import logger from "../utils/loggerUtils";

export default class Accounts {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.settings = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Settings"]');

        /**
         * Account page locators
         */
        this.accountSetting = page.locator('[id="account_setting"]');
        this.createAccountUnitButton = page.locator('[id="create_home_unit_drawer_open_button"]');
        this.enterAccountUnitName = page.locator('[placeholder="Unit Name"]');
        this.okButton = page.locator('//div[@class="ant-modal-footer"]//button//span[text()="Ok"]');
        this.selectUserButton = page.locator('#accounts_select_user_button');
        this.deleteAccountUnitButton = page.locator('(//span[@aria-label="delete"])[3]');

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

    
    async clickTools(){
        await this.tools.click();
    }


    async clickAccountTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Accounts').click();
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


    async createAccountUnit(){
        await this.settings.click();
        await this.accountSetting.click();
        await this.createAccountUnitButton.click();
        await this.enterAccountUnitName.fill('Babu');
        await this.okButton.click();

        try{
            const successMsg = this.page.locator('text=A new unit has been created');
            await successMsg.waitFor({ state: 'visible' });
            await successMsg.waitFor({ state: 'hidden' });

        }catch(error){
            console.log('Does not show any pop up after creating account unit');
        }
    }


    async editAccountUnit(){
        await this.settings.click();
        await this.accountSetting.click()

        await this.page.locator('(//button[@id="edit_home_unit_modal_open_button"])[3]').click();
        await this.enterAccountUnitName.fill('Babu1');
        await this.okButton.click();
    }


    async deleteAccountUnit(){
        await this.settings.click();
        await this.accountSetting.click();
        await this.page.locator('(//span[@aria-label="delete"])[3]').click();
        await this.page.locator('//div[@class="ant-popconfirm-buttons"]//button//span[text()="Yes"]').click();

        try{
            const successMsg = this.page.locator('text=Unit deleted successfully');
            await successMsg.waitFor({ state: 'visible' });
            await successMsg.waitFor({ state: 'hidden' });

        }catch(error){
            console.log('Does not show any pop up after deleting account unit');
        }
    }


    async account(){
        await this.tools.click();
        await this.clickHereLink.click();
       // await this.page.getByText('Account').waitFor({ state: 'visible' });

        const listItems = await this.page.locator('ul.ant-list-items li.ant-list-item');
        const texts = await listItems.allTextContents();
        console.log('List items:', texts);

        const count = await listItems.count();

        for(let i=0; i<count; i++){

            const item = listItems.nth(i);
            const text = await item.textContent();
            const trimmedText = text?.trim();

            if (trimmedText?.includes('Accounts')){

                const checkbox = item.locator('.ant-checkbox-wrapper input[type="checkbox"]');
                const isChecked = await checkbox.isChecked();

                if (!isChecked){

                    console.log('✅ Accounts is unchecked. Clicking it.');
                    await checkbox.click();
                    await this.page.getByRole('button', { name: 'Save' }).click();

                    await this.page.locator('text=Project tools updated.').waitFor({ state: 'visible', timeout: 10000 });
                    await this.page.locator('text=Project tools updated.').waitFor({ state: 'hidden', timeout: 10000 });

                }else{
                    console.log('❌ Accounts already checked. Clicking Cancel button.');
                     await this.page.getByRole('button', { name: 'Cancel' }).click();
                }

                break; // Stop after handling Accounts

            }
        }
        await this.page.waitForTimeout(10000);
    }

    
}

