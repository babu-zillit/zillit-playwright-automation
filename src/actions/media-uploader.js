//src/actions/media-uploader.js
/**
 * 
 * We cannot import expect, test from @playwright/test without curly braces
 * because expect , test is a named export, not the default export.
 * 
 * import expect from '@playwright/test'; // ❌ Invalid for Playwright
 * import { expect } from '@playwright/test'; // ✅ Correct
 * 
 * In Playwright, @playwright/test does not have a default export.
 * 
 */

import { expect } from '@playwright/test';
import logger from "../utils/loggerUtils";
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');
const startproject = loadJson('startproject', 'testdata');

/**
 * 
 * export – Share something from a file
 * If you use export with any method, function, class or vaiable name means this is available for other files
 * 
 * export default class UploadMedia {} : You can import it with any name (no {} needed)
 * 
 * export class UploadMedia {} : You must import it with the same name, using {}
 * 
 */ 
export default class UploadMedia {

    constructor(page){
        this.page = page;

         /**
          * Project buttons
          */ 
         const projectName = startproject.projectName;
         this.qaProject = page.locator(`text=/${projectName}/i`);
        //this.qaProject = page.locator('text=/Zl Testing 2nd Jan QA/i');
        this.productionProject = page.locator('text=/Zl 20 May live/i');

        /**
         * Message locators
         */
        this.typeYourMessage = page.locator('textarea[placeholder="Type your message"]');
        //this.sendButton = page.locator('span[aria-label="send"]');
        this.sendButton = page.locator('#send_messages_to_users_button');
        this.sendingIndicator = page.locator('span[aria-label="clock-circle"]');
        this.edited = page.locator("//span[text()='Edited']");
        this.hoverTarget = page.locator("//div[@class='dropDown']");

        /**
         * Upload inputs
         */
        this.attachmentButton = page.locator('button.css-2iw4eq.ant-float-btn.ant-float-btn-primary.ant-float-btn-circle');
        this.imageUploadButton = page.locator("//div[text()='Image Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.videoUploadButton = page.locator("//div[text()='Video Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.audioUploadButton = page.locator("//div[text()='Audio Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.documentUploadButton = page.locator("//div[text()='Document Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.locationUploadButton = page.locator("//div[text()='Location Upload']");

        this.selectButton = page.locator("//span[text()='Select']");
        this.sendMedia = page.locator("text=Send");

        /**
         * Delete buttons locator
         */
        this.deleteButton = page.locator('text="Delete"');
        this.deleteIcon = page.locator('span[aria-label="delete"]');
        this.deleteOk = page.getByRole('button', { name: /ok/i });

        /**
         * ReadBy buttons locator
         */
        this.readUserButton = page.locator('//div[contains(@class, "ant-segmented-item-label") and text()="READ USER"]');
        this.unReadUserButton = page.locator('//div[contains(@class, "ant-segmented-item-label") and text()="UN-READ USER"]');
        this.closeButton = page.getByRole('button', { name: 'Close' });

        /**
         * Common locator
         */
        this.typeMessage = page.locator('textarea[placeholder="Type a message"]');
        this.replySendButton =  page.getByRole('button', { name: 'Send' });

        this.confidentialInfoTabButton = this.page.getByText('Confidential Info Tab');

    }

    async clickProjectName(){
        const hostname = new URL(this.page.url()).hostname;
        console.log('Current hostname is:', hostname);

        if(hostname === 'qa.zillit.com'){
            logger.info('QA environment is started...')
            await this.qaProject.first().click();    
        } else if(hostname === 'web.zillit.com'){
            logger.info('Production environment is started...')
            await this.productionProject.click();
        } else{
            console.log("Environment is wrong...");
        }
    }

    async handleDropdownAction(optionText){
        await this.hoverTarget.waitFor({ state: 'visible' });
        await this.hoverTarget.hover();
        await this.hoverTarget.click();

        try{
            //const liItems = this.page.locator('div[class*="ant-dropdown-placement-topLeft"] li');
            const liItems = this.page.locator('div[class*="ant-dropdown-placement-"] li');
            await liItems.first().waitFor({ state: 'visible', timeout: 5000 });
            const texts = await liItems.allTextContents();
            console.log('Dropdown list items:', texts);
            await this.page.waitForTimeout(500);
            await liItems.filter({ hasText: optionText }).first().click();
        }catch (error){
            console.error(`Failed to select dropdown option: ${optionText}`, error);
        }
    }

    async sendMessage(){
        logger.info('[SendMessage] Started sending message...');

        await this.typeYourMessage.fill('Hello How are you');
        await this.sendButton.click();
        await this.page.waitForTimeout(2000);
        await this.sendingIndicator.waitFor({state: 'hidden', timeout: 10000});
    }

    async edit(){
        logger.info('[EditMessage] Started edit message...');

        await this.handleDropdownAction('Edit Message');
        await this.typeMessage.fill('This is message');
        await this.replySendButton.click();

        await this.page.locator('[aria-label="clock-circle"]').waitFor({ state: 'detached', timeout: 10000 });
        await this.edited.waitFor({state: 'visible', timeout: 15000})
        await expect(this.edited).toBeVisible();
    }

    async forward(){
        logger.info('[ForwardMessage] Started forward message...');

        await this.handleDropdownAction('Forward');
        await this.confidentialInfoTabButton.click();

        const popup = this.page.locator('text=Forward Successfully');
        await expect(popup).toBeVisible({ timeout: 15000 });
        await expect(popup).toBeHidden({ timeout: 15000 });
    }

    async readBy(){
        logger.info('[ReadByMessage] Started readBy message...');

        await this.handleDropdownAction('Read By');
        await this.closeButton.click();
    }

    async reply(){
        logger.info('[ReplyMessage] Started reply message...');

        await this.handleDropdownAction('Reply');
        await this.typeMessage.fill('Reply message');
        await this.replySendButton.click();
    }

    async dropDownListOnReply(optionText){
        try{
        const hoverIcon = await this.page.waitForSelector('.right-2.top-2.absolute [aria-label="down"]',{state: 'visible'});
        await hoverIcon.hover();
        await this.page.waitForTimeout(300);
        await hoverIcon.click();

            const dropdown = this.page.locator('div.ant-dropdown:not(.ant-dropdown-hidden)');
            const liItems = dropdown.locator('li');
            await liItems.first().waitFor({ state: 'visible', timeout: 5000 });

            const texts = await liItems.allTextContents();
            console.log('Dropdown list items:', texts);

            await liItems.filter({ hasText: optionText }).first().click();
        }catch (error){
            console.error(`Failed to select dropdown option: ${optionText}`, error);
        }
    }

    async editReply(){
        logger.info('[editReply] Started edit reply message...');

        await this.dropDownListOnReply('Edit Message');
        await this.typeMessage.fill('This is message');
        await this.replySendButton.click();

        await this.page.locator('[aria-label="clock-circle"]').waitFor({ state: 'detached', timeout: 10000 });
    }

    async readByReply(){
        logger.info('[readByReply] Started read By reply message...');

        await this.dropDownListOnReply('Read By')
        await this.page.waitForTimeout(1000);
        await this.closeButton.click();
    }

    async deleteReply(){
        logger.info('[deleteReply] Started delete reply message...');

        await this.dropDownListOnReply('Delete');
        await this.page.getByRole('button', { name: 'Ok' }).click();

        const popup = this.page.locator("text=Comment deleted successfully!");
        await expect(popup).toBeVisible({timeout: 20000});
        await expect(popup).toBeHidden({timeout: 20000});
    }

    async delete(){
        logger.info('[Delete] deletion started...');

        await this.handleDropdownAction('Delete');

        await this.deleteIcon.click();
        await this.deleteOk.click();

        const popup = this.page.locator("text=Message Deleted successfully");
        console.log('Waiting for popup to appear...');
        await expect(popup).toBeVisible({timeout: 20000});
        console.log('Waiting for popup to disappear...');
        await expect(popup).toBeHidden({timeout: 20000});
    } 
    
    async clickAttachment(){
        await this.attachmentButton.click();
    }

    async uploadImage(){
        logger.info('[Media] Upload image started...');

        await this.imageUploadButton.setInputFiles(mediapaths.image);
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

    async uploadVideo(){
        logger.info('[Media] Upload video started...');

        await this.videoUploadButton.setInputFiles(mediapaths.video);
    }

    async uploadAudio(){
        logger.info('[Media] Upload audio started...');

        await this.audioUploadButton.setInputFiles(mediapaths.audio);
        await this.page.locator("text=Send").click();
        await this.page.locator('[class="w-4 h-4 text-white dark:text-white "]').waitFor({ state: 'visible' });
    }

    async uploadDocument(){
        logger.info('[Media] Upload document started...');

        await this.documentUploadButton.setInputFiles(mediapaths.document);
        await this.page.locator("text=Send").click();
    }

    async uploadLocation(){
        logger.info('[Location] Upload location started...');

        await this.locationUploadButton.waitFor({ state: 'visible' }),
        await this.locationUploadButton.click();
        await this.selectButton.waitFor({ state: 'visible' })
        await this.page.waitForTimeout(2000);
        await this.selectButton.click();

        try{
        await this.page.waitForSelector('[aria-label="clock-circle"]', { state: 'hidden' });
        
        const image = this.page.locator('//img[@class="rounded-lg  object-cover h-[20rem] w-[100%]"]');
        await image.waitFor({ state: 'visible'});

        const [newTab] = await Promise.all([
        this.page.context().waitForEvent('page'),
        image.click()
        ]);

        await newTab.waitForLoadState();
        await newTab.close();

        await this.page.bringToFront();
        }catch(error){
            console.log(`location is not clickable: ${error}`);
        }
    }

    async imageReply(){
        logger.info('[ImageReply] Started image reply message...');

        await this.handleDropdownAction('Image Reply');
        await this.page.locator('[placeholder="Type a message"]').fill('This is image reply');
        await this.clickSendMedia();
    }


    
    async deleteAll(){
        await this.page.waitForTimeout(1000);

        const items = this.page.locator('.dropDown');
        const totalCount = await items.count();

        console.log(`total message: ${totalCount}`);

        if (totalCount === 0) {
            console.log('No elements found to hover on.');
            return;
        }

        // Hover and click the last dropdown icon
        const lastItem = items.nth(totalCount - 1);
        await lastItem.hover();
        await lastItem.click();

        // Wait for dropdown to be visible (not hidden)
        const dropdown = this.page.locator('div.ant-dropdown:not(.ant-dropdown-hidden)');
        await dropdown.waitFor({ state: 'visible', timeout: 5000 });

        const options = dropdown.locator('li');
        const count = await options.count();

        // Get all <li> items from the dropdown
        console.log('Dropdown options:');
        for (let i = 0; i < count; i++) {
            const text = await options.nth(i).textContent();
            console.log(text);
        }

        // Click on the 'Delete' option
        await options.filter({ hasText: 'Delete' }).first().click();

        // ✅ Wait for checkboxes to appear (optional timeout)
        await this.page.waitForTimeout(1000);
        const checkboxes = this.page.locator('.ant-checkbox-input');
        const checkboxCount = await checkboxes.count();
        console.log(`Total checkboxes: ${checkboxCount}`);

        for (let i = 0; i < checkboxCount; i++) {
        const checkbox = checkboxes.nth(i);
        const isChecked = await checkbox.evaluate(el => el.checked);
        if (!isChecked) {
            await checkbox.click();
            await this.page.waitForTimeout(500); // optional wait between clicks
            }
        }

        await this.deleteIcon.click();
        await this.deleteOk.click();

        const popup = this.page.locator("text=Message Deleted successfully");
        console.log('Waiting for popup to appear...');
        await expect(popup).toBeVisible({timeout: 20000});
        console.log('Waiting for popup to disappear...');
        await expect(popup).toBeHidden({timeout: 20000});
    }

}