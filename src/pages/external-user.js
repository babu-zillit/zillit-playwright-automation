import { expect } from '@playwright/test';
export default class ExternalUser {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.externalUser = page.locator('//span[@class="filmtools-card-title"]//span[text()="External Users"]');

        this.addUserPlusIcon = page.locator('[aria-label="plus"]');
        this.name = page.locator('#full_name');
        this.email = page.locator('#email');
        this.phone = page.locator('#phone');
        this.submit = page.locator('#external_user_submit_button');

        /**
         * edit, delete locators
         */ 
        this.editButton = page.locator('#external_user_edit_user_button');
        this.deleteButton = page.locator('[aria-label="delete"]');

    }

    async clickExternalUserTab(){
        await this.tools.click();
        await this.externalUser.click();
    }

    async addUser(){
        await this.addUserPlusIcon.click();
        await this.name.fill('Bhavik');
        await this.email.fill('Bhavik@gmail.com');
        await this.page.locator('//span[@class="ant-select-selection-item"]').nth(1).click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter');
        await this.phone.fill('12345');
        await this.page.locator('//span[@class="ant-select-selection-item"]').nth(2).click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter');
        await this.page.locator('//span[@class="ant-select-selection-item"]').last().click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.page.locator('#designation_id').click();
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Enter');
        await this.submit.click();

        const successMsg = await this.page.locator('text=External user information has been added successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async delete(){
        await this.deleteButton.click();
        await this.page.locator('//div[@class="ant-popconfirm-buttons"]//button').nth(1).click();

        const successMsg = await this.page.locator('text=External user information has been deleted.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

}