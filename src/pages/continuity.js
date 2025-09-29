import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class Continuity {

    constructor(page){
        this.page = page;


        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.continuity = page.locator('//span[@class="filmtools-card-title"]//span[text()="Continuity"]');

        /**
         * upload media locators
         */ 
        this.attachment = page.locator('button.css-2iw4eq.ant-float-btn.ant-float-btn-primary.ant-float-btn-circle');
        this.uploadMediaButton = page.locator("//div[text()='Upload Media']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.upload = page.locator("//button[.='Upload']");

        /**
         * continuity locators
         */ 
        this.enterSceneNumber = page.locator('[placeholder="Enter Scene Number"]');
        this.enterEpisodeNumber = page.locator('[placeholder="Enter Episode Number"]');
        this.description = page.locator('[placeholder="Description"]');
        this.submit = page.locator('#continuity_submit_ecene_button');
        this.sceneFolder = page.locator('//div[contains(@class,"ant-card-grid")]');

        this.more = page.locator('//span[@aria-label="more"]');

        this.editDetails = page.locator('.edit_details_icon');
        this.update = page.locator('#continuity_update_scene_button');

        this.forwardButton = page.locator('.forward_icon');
        this.continuityForward = page.locator('#continuity_forward_scene_button');
        this.allDepartment = page.locator('#continuity_forward_drawer_all_department_button');


        this.deleteButton = page.locator('.delete_icon');
        this.okButton = page.locator('//div[@class="ant-popconfirm-buttons"]//button');
        this.close = page.locator('[aria-label="Close"]');

        /**
         * All Department
         */
        this.myDepartmentTab = page.locator('[data-node-key="1"]');
        this.allDepartmentTab = page.locator('[data-node-key="3"]');
        this.production = page.locator('//div[contains(@class,"select_departments_list")]//div[text()="Production"]');



    }


    async clickContinuityTab(){
        await this.tools.click();
        await this.continuity.click();
    }


    async uploadMedia(){
        await this.attachment.click();
        await this.uploadMediaButton.setInputFiles(mediapaths.image);
        await this.upload.click(); 
        
        await this.enterSceneNumber.fill('99');
        await this.enterEpisodeNumber.fill('88');
        await this.description.fill('Romantic scene');
        await this.submit.click();
    }

    async openSceneFolder(){
        await this.sceneFolder.first().waitFor({ state: 'visible' });
        const count = await this.sceneFolder.count();
        if(count == 1){
            await this.sceneFolder.click();
        } else if(count > 1){
            await this.sceneFolder.first().click();
        } else {
            console.log('Not scene folder available');
        }
    }

    async threeDots(){
        await this.more.first().waitFor({ state: 'visible' });
        const count = await this.more.count();
        if(count == 1){
            await this.more.click();
        } else if(count > 1){
            await this.more.first().click();
        } else {
            console.log('Not image is avialable');
        }
    }

    async edit(){
        await this.threeDots();
        await this.editDetails.click();
        await this.description.fill('Romantic scene for villain');
        await this.update.click();

        const successMsg = await this.page.locator('text=Scene has been updated successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async forward(){
        await this.threeDots();
        await this.forwardButton.first().click();
        await this.okButton.nth(1).click();

        const checkboxButton = await this.page.locator('//input[@class="ant-checkbox-input"]');
        const count = await checkboxButton.count();
        if(count == 1){
            await checkboxButton.check();
            await expect(checkboxButton).toBeChecked();
        } else if(count > 1){
            await checkboxButton.first().check();
            await expect(checkboxButton.first()).toBeChecked();
        } else{
            console.log('Not checkboxbutton available');
        }

        await this.continuityForward.click();
        await this.allDepartment.click();
    
        const successMsg = await this.page.locator('text=Scene(s) have been forwarded successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async delete(){
        await this.threeDots();
        await this.deleteButton.click();
        await this.okButton.nth(1).click();
    
        const successMsg = await this.page.locator('text=Media deleted successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
        //await this.close.click();
    }

    async myDepartment(){
        await this.myDepartmentTab.click();
    }

    async allDepartmentScene(){
        await this.allDepartmentTab.click();
        await this.openSceneFolder();
        await this.production.click();
    }

    async closeWindow(){
        await this.close.click();
    }

}