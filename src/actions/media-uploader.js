import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';
import { expect } from '@playwright/test';
import logger from "../utils/loggerUtils";
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');
const startproject = loadJson('startproject', 'testdata');
 
export default class UploadMedia {

    constructor(page){
        this.page = page;

         /**
          * Project buttons
          */ 
         const projectName = startproject.projectName;
         this.qaProject = page.locator(`text=/${projectName}/i`);
         this.productionProject = page.locator('text=/Zl 20 May live/i');

        /**
         * Message locators
         */
        this.typeYourMessage = page.locator('textarea[placeholder="Type your message"]');
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
        this.sendMedia = page.locator("//button[.='Upload']");

        /**
         * Delete buttons locator
         */
        this.deleteButton = page.locator('text="Delete"');
        this.deleteIcon = page.locator('span[aria-label="delete"]');
        this.deleteOk = page.getByRole('button', { name: /ok/i });

        /**
         * ReadBy buttons locator
         */
        this.readUnreadTab = page.locator('div.ant-modal-body label');
        this.closeButton = page.getByRole('button', { name: 'Close' });

        /**
         * Common locator
         */
        this.typeMessage = page.locator('textarea[placeholder="Type a message"]');
        this.replySendButton =  page.getByRole('button', { name: 'Send' });

        this.confidentialInfoTabButton = this.page.getByText('Confidential Info Tab');

        /**
         * Forward to Remote Projects
         */
        this.settings = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Settings"]');
        this.adminSetting = page.locator('[data-node-key="admin"]');
        this.remoteShootingUnit = page.locator('#create_remote_shooting_unit');
        this.createRemoteUnit = page.locator('#create_remote_unit_drawer_open_button');
        this.enterUnitName = page.locator('[placeholder="Enter unit name"]');
        this.selectsUserAdmin = page.locator('div.ant-select-selector');
        this.saveRemoteUnit = page.locator('#save_remote_unit_button');

        this.remoteProjectList = page.locator('div.ant-modal-body p');


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

    async homeUnitTab(){
        await this.page.locator('[role="tab"]').nth(3).click();
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
        await this.typeYourMessage.fill('Hello How are you');
        await this.sendButton.click();
        await this.page.waitForTimeout(2000);
        await this.sendingIndicator.waitFor({state: 'hidden', timeout: 10000});
    }

    async edit(){
        await this.handleDropdownAction('Edit Message');
        await this.typeMessage.fill('This is message');
        await this.replySendButton.click();

        await this.page.locator('[aria-label="clock-circle"]').waitFor({ state: 'detached', timeout: 10000 });
        await this.edited.waitFor({state: 'visible', timeout: 15000})
        await expect(this.edited).toBeVisible();
    }

    async forward(){
        await this.handleDropdownAction('Forward');
        await this.confidentialInfoTabButton.click();

        const popup = this.page.locator('text=Forward Successfully');
        await expect(popup).toBeVisible({ timeout: 15000 });
        await expect(popup).toBeHidden({ timeout: 15000 });
    }

    async readBy(){
        await this.handleDropdownAction('Read By');
        await this.page.waitForTimeout(500);
        await this.readUnreadTab.last().click();
        await this.page.waitForTimeout(500);
        await this.closeButton.click();
    }

    async reply(){
        await this.handleDropdownAction('Reply');
        await this.typeMessage.fill('Reply message');
        await this.replySendButton.click();
    }

    async save(){
        await this.handleDropdownAction('Save');
        await this.page.waitForTimeout(500);
        await this.pressReturnKey();

        const popup = this.page.locator("text=File downloaded successfully");
        await expect(popup).toBeVisible({timeout: 15000});
        await expect(popup).toBeHidden({timeout: 15000});
    }

    async distribute(){
        await this.handleDropdownAction('Distribute');
        await this.page.locator('#forward_selected_messages_button').click();
        await this.page.locator('div.ant-modal-content button').last().click();

        const popup = this.page.locator("text=Media distributed successfully.");
        await expect(popup).toBeVisible({timeout: 15000});
        await expect(popup).toBeHidden({timeout: 15000});
    }

    async forwardRemoteProject(){
        await this.handleDropdownAction('Forward to Remote Projects');
        await this.remoteProjectList.first().click();
        await this.confidentialInfoTabButton.click();
        
        const popup = this.page.locator('text=Forward Successfully');
        await expect(popup).toBeVisible({ timeout: 15000 });
        await expect(popup).toBeHidden({ timeout: 15000 });

        const close = this.page.locator('div.ant-modal-content button');
        await close.last().click();
        await close.first().click();
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
        await this.dropDownListOnReply('Edit Message');
        await this.typeMessage.fill('This is message');
        await this.replySendButton.click();

        await this.page.locator('[aria-label="clock-circle"]').waitFor({ state: 'detached', timeout: 10000 });
    }

    async readByReply(){
        await this.dropDownListOnReply('Read By');
        await this.page.waitForTimeout(500);
        await this.readUnreadTab.last().click();
        await this.page.waitForTimeout(500);
        await this.closeButton.click();
    }

    async deleteReply(){
        await this.dropDownListOnReply('Delete');
        await this.page.getByRole('button', { name: 'Ok' }).click();

        const popup = this.page.locator("text=Comment deleted successfully!");
        await expect(popup).toBeVisible({timeout: 20000});
        await expect(popup).toBeHidden({timeout: 20000});
    }

    async delete(){
        await this.handleDropdownAction('Delete');
        await this.deleteIcon.click();
        await this.deleteOk.click();

        const popup = this.page.locator("text=Message Deleted successfully");
        await expect(popup).toBeVisible({timeout: 20000});
        await expect(popup).toBeHidden({timeout: 20000});
    } 
    
    async clickAttachment(){
        await this.attachmentButton.click();
    }

    async uploadImage(){
        await this.imageUploadButton.setInputFiles(mediapaths.image);
    }

    async clickSendMedia(){
        await this.sendMedia.click();

        await this.page.waitForSelector('text=/sending/i', { state: 'visible' });
        await this.page.waitForSelector('text=/sending/i', { state: 'hidden' });
        await this.page.waitForSelector('text=/file size/i', { state: 'visible' });
    }

    async uploadVideo(){
        await this.videoUploadButton.setInputFiles(mediapaths.video);
    }

    async uploadAudio(){
        await this.audioUploadButton.setInputFiles(mediapaths.audio);
        await this.sendMedia.click();
        await this.page.locator('[class="w-4 h-4 text-white dark:text-white "]').waitFor({ state: 'visible' });
    }

    async uploadDocument(){
        await this.documentUploadButton.setInputFiles(mediapaths.document);
        await this.sendMedia.click();
    }

    async uploadLocation(){
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
        await this.handleDropdownAction('Image Reply');
        await this.page.locator('[placeholder="Type a message"]').fill('This is image reply');
        await this.clickSendMedia();
    }

    async history(){
        await this.page.locator('div.ant-float-btn-body').nth(1).click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(2000);
    }

    async pressReturnKey() {
  // AppleScript: simulate pressing the Return key
  const appleScript = `
    tell application "System Events"
        key code 36
    end tell
  `;

  // Save to a temp script file
  const tempScriptPath = path.join(os.tmpdir(), 'pressReturn.scpt');
  await fs.writeFile(tempScriptPath, appleScript);

  const runAppleScript = () => {
    return new Promise((resolve, reject) => {
      exec(`osascript ${tempScriptPath}`, (error, stdout, stderr) => {
        fs.unlink(tempScriptPath); // cleanup
        if (error) reject(error);
        else resolve(stdout);
      });
    });
  };

  try {
    await runAppleScript();
    console.log('✅ Pressed Return successfully');
  } catch (err) {
    console.error('❌ AppleScript error:', err.message);
  }
 }

 async replyMediaForAccount(){
    await this.handleDropdownAction('Reply');
 }

}