//src/pages/upload-media.js
import { expect } from '@playwright/test';

export default class UploadMedia {

    constructor(page){
        this.page = page;

        this.clickProjectName = page.locator('text=/Zl Testing 2nd Jan QA/i');
        this.typeYourMessage = page.locator('textarea[placeholder="Type your message"]');
        this.clickAttachment = page.locator('button.css-2iw4eq.ant-float-btn.ant-float-btn-primary.ant-float-btn-circle');
        this.clickImage = page.locator("//div[text()='Image Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.clickVideo = page.locator("//div[text()='Video Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.clickAudio = page.locator("//div[text()='Audio Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.clickDocument = page.locator("//div[text()='Document Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.clickClose = page.locator('text=Close');

        this.hoverTarget = page.locator("//div[@class='dropDown']");
        this.deleteButton = page.locator("text=Delete");
        this.deleteIcon = page.locator("//*[@data-icon='delete']");
        this.deleteOk = page.locator("text=Ok");
        this.deletionSuccessPopup = page.locator("text=Message Deleted successfully");

        this.sendButton = page.locator("[aria-label='send']");
        this.sendMedia = page.locator("text=Send");

        this.settingsButton = page.locator("text=Settings");
        this.editProfileButton = page.locator("text=Edit Profile");
        this.selectorButton = page.locator('(//div[@class="ant-select-selector"])[1]');

        this.designationButton = page.locator("(//span[@class='ant-select-selection-item'])[2]");
    }

    async clickOnProjectName(){
        await this.clickProjectName.click();
    }

    async sendText(enterMessage){
        await this.typeYourMessage.fill(enterMessage);
    }

    async attachment(){
        await this.clickAttachment.click();
    }

    async uploadImage(filePath){
        await this.clickImage.setInputFiles(filePath);
    }

    async uploadVideo(filePath){
        await this.clickVideo.setInputFiles(filePath);
    }

    async uploadAudio(filePath){
        // Wait until the input is attached to the DOM
        await this.clickAudio.waitFor({ state: 'attached' });
        // Upload the file
        await this.clickAudio.setInputFiles(filePath);
        await this.page.locator("text=Send").click();
        await this.page.locator('[class="w-4 h-4 text-white dark:text-white "]').waitFor({ state: 'visible' }); 
    }

    async uploadDocument(filePath){
        await this.clickDocument.setInputFiles(filePath);
        await this.page.locator("text=Send").click();
        await this.page.waitForTimeout(5000);
    }

    async clickSend(){
        await this.sendButton.waitFor({ state: 'visible'});
        await this.sendButton.click();
    }

    async clickSendMedia(){
        await this.sendMedia.click();
        
        // Wait for "sending" (case-insensitive) to appear
        await this.page.waitForSelector('text=/sending/i', { state: 'visible' });

        // Wait for "sending" (case-insensitive) to disappear
        await this.page.waitForSelector('text=/sending/i', { state: 'hidden' });

        // Wait for "File Size" (case-insensitive) to appear
        await this.page.waitForSelector('text=/file size/i', { state: 'visible' });
    }

    // async close(){
    //     await this.clickClose.waitFor({ state: 'visible', timeout: 10000 });
    //     await this.clickClose.click();
    // }

    async moveElement(){
        // Wait for the element to be visible before hovering
        await this.hoverTarget.waitFor({ state: 'visible' });
        // Hover over the element
        await this.hoverTarget.hover();
    }

    async delete() {
        await this.deleteButton.click();
        await this.deleteIcon.click();
        await this.deleteOk.click();
        const popup = this.page.locator("text=Message Deleted successfully");
        //await expect(popup).toBeVisible();
        //await expect(popup).toBeHidden(); 
        await popup.waitFor({ state: 'visible', timeout: 15000 });
        await expect(popup).toBeVisible();
        await popup.waitFor({ state: 'hidden', timeout: 15000 });
        console.log("disaaper the delete pop up");
    }

    async settings() {
        await this.settingsButton.click();
        await this.editProfileButton.click();
    
        // Open the dropdown by clicking the selector
        await this.selectorButton.waitFor({ state: 'visible' });
        await this.selectorButton.click();
        await this.clickClose.waitFor({ state: 'visible', timeout: 10000 });
        await this.clickClose.click();
        await this.selectorButton.click();
    
        // Wait for the dropdown options to appear
        const options = this.page.locator('.ant-select-dropdown .ant-select-item-option');
        await options.first().waitFor({ state: 'visible' });
    
        // Get all the text content of the dropdown options
        const optionTexts = await options.allTextContents();
        console.log('Dropdown Options:', optionTexts);

        // Click the option with text "Accounts"
        const accountsOption = this.page.locator('.ant-select-dropdown .ant-select-item-option', { hasText: 'Accounts' });
        await accountsOption.click();
        //await this.page.waitForTimeout(5000);

        await this.designationButton.click();

        // Wait for the dropdown options to appear
        const optionsDesig = this.page.locator('.ant-select-dropdown .ant-select-item-option');
        // Wait for the dropdown to load options (check that at least one option exists)
        await optionsDesig.first().waitFor({ state: 'attached' });
        await optionsDesig.first().waitFor({ state: 'visible' });

        // Get all the text content of the dropdown options
        const optionDesignation = await optionsDesig.allTextContents();
        console.log('Dropdown Options:', optionDesignation);

        const accountsFirst = this.page.locator('.ant-select-dropdown .ant-select-item-option', { hasText: '1st Assistant Accountant' });
        await accountsFirst.click();
        await this.page.waitForTimeout(5000);

    }

    async deleteMultiple(){
        const items = await this.page.locator('[class="dropDown"]').all();
        const totalCount = items.length;
        
        if(totalCount === 0){
        console.log('No elements found to hover on.');
        return;
        }

        await items[totalCount - 1].hover();
        await this.deleteButton.click();

        const checkboxes = await this.page.locator('[class="ant-checkbox-input"]').all();
        for (const checkbox of checkboxes) {
        const isChecked = await checkbox.isChecked().catch(() => false); // fallback if isChecked() not available
        if (!isChecked) {
        await checkbox.click();
        await this.page.waitForTimeout(1000);
        }
    //    await this.deleteIcon.click();
    //     await this.deleteOk.click();
    //     const popup = this.page.locator("text=Message Deleted successfully");
    //     await expect(popup).toBeVisible();
    //     await expect(popup).toBeHidden(); 
    //     console.log("disaaper the delete pop up"); 
    }

 }

}
