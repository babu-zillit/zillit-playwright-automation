import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class CnC {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.cnc = page.locator('//span[@class="ant-menu-title-content"]//span[text()="C & C"]');

        /**
         * locators for user profile
         */ 
        this.chatCallContactTab = page.locator('//div[@role="tab"]');
        this.userProfile = page.locator('[class="ant-image css-2iw4eq"]');

        /**
         * locators for message and media
         */
        this.typeMessage = page.locator('[placeholder="Type a message"]'); 
        this.sendButton = page.locator('[aria-label="send"]');
        this.attachmentButton = page.locator('//div[@id="attachment"]//button');
        this.imageUploadInput = page.locator('//span[contains(@class,"ant-upload")][.//div[contains(text(),"Image Upload")]]//input[@type="file"]');
        this.videoUploadInput = page.locator('//span[contains(@class,"ant-upload")][.//div[contains(text(),"Video Upload")]]//input[@type="file"]');
        this.documentUploadInput = page.locator('//span[contains(@class,"ant-upload")][.//div[contains(text(),"Document Upload")]]//input[@type="file"]');
        this.audioUploadInput = page.locator('//span[contains(@class,"ant-upload")][.//div[contains(text(),"Audio Upload")]]//input[@type="file"]');
        this.send = page.locator('div.text-end button');

        this.replyButton = page.locator('#reply_button');


        this.confidentialInfoTabButton = page.getByText('Confidential Info Tab');

        /**
         *  locators for group creation and deletion
         */
        this.createGroupIcon = page.locator('[trigger="click"]'); 
        this.enterGroupName = page.locator('[placeholder="Please enter group name"]');
        this.selectMember = page.locator('[id="users"]');
        this.selectAll = page.locator('[title="Select All"]');
        this.submit = page.locator('[role="submit"]');
        this.allMemberGroupFavoritesTab = page.locator('.flex .overflow-x-auto.scroll-container_chat-filters button');
        this.groupProfilePic = page.locator('.ant-avatar.ant-avatar-circle.flex');
        
        this.groupName = page.locator('.truncate.text-lg');
        this.deleteGroupButton = page.locator('[aria-label="delete"]');
        this.ok = page.locator('.ant-popover-inner-content button');


    }

    async openCnC(){
        await this.cnc.click();
    }

    async clickUserProfile(){
        await this.chatCallContactTab.nth(2).click();
        await this.chatCallContactTab.nth(1).click();
        await this.page.waitForTimeout(500);
        await this.chatCallContactTab.nth(2).click();
        await this.userProfile.click();
    }

    async cncDropList(optionText){
        const targetHover = await this.page.locator('//div[contains(@class,"flex flex-col group relative")]');
        await targetHover.hover();

        const dropdownManu = await this.page.locator('[id="dropdownMenuIconButton"]');
        await dropdownManu.click();

       // await this.page.locator(`text=${optionText}`).first().click();

        try{
            const menuItems = this.page.locator('ul.ant-dropdown-menu li span.ant-dropdown-menu-title-content');
            await menuItems.first().waitFor({ state: 'visible', timeout: 10000});   

            const allTexts = await menuItems.allTextContents();
            console.log("Dropdown items:", allTexts);
            await this.page.waitForTimeout(500);

            //await menuItems.filter({ hasText: optionText, exact: true }).first().click();
            await this.page.getByText(optionText, { exact: true }).first().click();
        } catch(error) {
            console.error(`Failed to select dropdown option: ${optionText}`, error);
        }     
    }

    async sendMessage(){
        await this.typeMessage.fill('Welcome to Squid Game');
        await this.sendButton.click();
        await this.page.waitForTimeout(500);
    }

    async attachment(){
        await this.attachmentButton.click();
    }

    async imageUpload(){
        await this.imageUploadInput.setInputFiles(mediapaths.image);
        await this.send.nth(1).click();
        await this.page.waitForSelector('text=/sending/i', { state: 'visible' });
        await this.page.waitForSelector('text=/sending/i', { state: 'hidden' });
    }

    async videoUpload(){
        await this.videoUploadInput.setInputFiles(mediapaths.video);
        await this.send.nth(0).click();
        await this.page.waitForSelector('text=/sending/i', { state: 'visible' });
        await this.page.waitForSelector('text=/sending/i', { state: 'hidden' });
    }

    async documentUpload(){
        await this.documentUploadInput.setInputFiles(mediapaths.document);
        await this.send.nth(0).click();
        await this.page.waitForSelector('[data-icon="loading"]', { state: 'visible' });
        await this.page.waitForSelector('[data-icon="loading"]', { state: 'hidden' });
    }

    async audioUpload(){
        await this.audioUploadInput.setInputFiles(mediapaths.audio);
        await this.send.nth(0).click();
        await this.page.locator('[class="w-4 h-4 text-white dark:text-white "]').waitFor({ state: 'visible' });
    }

    async reply(){
        await this.cncDropList('Reply');
        await this.typeMessage.nth(1).fill('Reply message');
        await this.replyButton.click();   
        
        //const messages = await this.page.locator('text=Reply message');
        const messages = this.page.getByText('Reply message', { exact: true });
        await messages.waitFor({ state: 'visible', timeout: 10000 });
    }

    async forward(){
        await this.cncDropList('Forward');
        await this.confidentialInfoTabButton.click();
        
        const popup = this.page.locator('text=Forward Successfully');
        await popup.waitFor({ state: 'visible' });
        await popup.waitFor({ state: 'hidden' });
    }

    async save(){
        await this.cncDropList('Save');
        await this.page.waitForTimeout(3000);
    }

    async readBy(){
        await this.cncDropList('Read By');
        await this.page.waitForTimeout(2000);
        await this.page.locator('.ant-modal-content button[aria-label="Close"]').click();
        await this.page.waitForTimeout(500);
    }

    async delete(){
        await this.cncDropList('Delete');
        
        await this.page.locator('div.bg-gray-800.flex.justify-between.items-center button').nth(1).click();
        await this.page.locator('div.ant-popconfirm-buttons button').nth(1).click();

        const successMsg = await this.page.locator('text=Messages Deleted');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async toggleCheckBox(){
        await this.page.waitForTimeout(1000);
        const checkbox = await this.page.locator('//div[@style="position: relative;"]//label//input[not(@checked)]').first();
        await checkbox.waitFor({ state: 'visible', timeout: 5000 });
        const isChecked = await checkbox.isChecked();

        if(!isChecked){
            await checkbox.check();
        } else{
            console.log("Checkbox is already checked → skipping.");
        }
    }

    async deleteAllMessage(){
        const targetHover = await this.page.locator('//div[contains(@class,"flex flex-col group relative")]');
        await targetHover.first().hover();

        const dropdownManu = await this.page.locator('[id="dropdownMenuIconButton"]');
        await dropdownManu.first().click();

        const menuItems = this.page.locator('ul.ant-dropdown-menu li span.ant-dropdown-menu-title-content');
        await menuItems.first().waitFor({ state: 'visible', timeout: 10000}); 
        await menuItems.filter({ hasText: 'Delete' }).first().click();
        
        await this.toggleCheckBox();

        await this.page.locator('div.bg-gray-800.flex.justify-between.items-center button').nth(1).click();
        await this.page.locator('div.ant-popconfirm-buttons button').nth(1).click();

        const successMsg = await this.page.locator('text=Messages Deleted');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });     
    }

    async createGroup(){
        await this.tools.click();
        await this.cnc.click();
        await this.createGroupIcon.click();
        await this.enterGroupName.fill('Tester');
        await this.selectMember.click();
        await this.selectAll.click();
        await this.submit.click();
        await this.allMemberGroupFavoritesTab.nth(3).click();
        await this.groupProfilePic.click();
    }

    async deleteGroup(){
        await this.groupName.click();
        await this.page.waitForSelector('text=Delete group', { state: 'visible', timeout: 10000 });
        await this.deleteGroupButton.click();
        await this.ok.nth(1).click();
        await this.page.waitForTimeout(2000);
    }

}