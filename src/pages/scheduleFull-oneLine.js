import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class ScheduleFullOneLine {
   
    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.scheduleFull = page.locator('//div[@class="ant-tabs-tab-btn"]//span[text()="Schedule Full"]');
        this.pages = page.locator('//div[@class="ant-tabs-tab-btn"]//span[text()="Pages"]');
        this.scheduleOneLine = page.locator('//div[@class="ant-tabs-tab-btn"]//span[text()="Schedule One Line"]');

        /**
         * upload documents locators
         */
        this.attachment = page.locator('//div[@id="scriptFooter"]//button');
        this.documentUpload = page.locator("//div[text()='Document Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.send = page.locator('#upload_document_send_script_button');

        /**
         * FullScript & Page locators
         */
        this.enterEpisodeNumber = page.locator('#episodeNo');
        this.enterSceneNumber = page.locator('#sceneNumber');
        this.fullSchedulePagesRadioButton = page.locator('//input[@value="full_schedule_pages"]');
        this.okButton = page.locator('//div[@class="ant-modal-footer"]//button');

        /**
         * FullScript & Page more button locators
         */
        this.moreButton = page.locator('#schedule_distribution_more_button');
        this.viewButton = page.locator('#schedule_distribution_more_view_button');
        this.viewCountButton = page.locator('#schedule_distribution_more_view_count_button');
        this.replaceButton = page.locator('#schedule_distribution_more_replace_button');
        this.downloadButton = page.locator('#schedule_distribution_more_download_button');
        this.downloadCountButton = page.locator('#schedule_distribution_more_download_count_button');
        this.deleteButton = page.locator('#schedule_distribution_more_delete_button');
        this.yesButtonForDeletion = page.locator('//div[@class="ant-popconfirm-buttons"]//button//span[text()="Yes"]')
        this.close = page.locator('#close_document_viewer_button');
        this.closeIcon = page.locator('//button[@aria-label="Close"]');

        /**
         * Folder & other locators
         */
        this.folder = page.locator('//img[@alt="Folder Icon"]');
        this.closeWindow = page.locator('#schedule_distribution_pages_modal_close_button');
    }


    async scheduleFuleLineTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Schedule Full & One Line').click();
    }


    async scheduleFullTab(){
        await this.scheduleFull.click();
    }

    async pageTab(){
        await this.pages.click();
    }

    async scheduleOneLineTab(){
        await this.scheduleOneLine.click();
    }


    async uploadScheduleFullLine(enterEpisode, enterScene, ){
        await this.attachment.click();
        await this.documentUpload.setInputFiles(mediapaths.document);

        if(enterEpisode=='Episode'){
            await this.enterEpisodeNumber.fill('99'); 
        }  
        if(enterScene=='Scene'){
            await this.enterSceneNumber.fill('55'); 
        } 
        await this.send.click();
    }

    async uploadSchedulePages(){
        await this.attachment.click();
        await this.documentUpload.setInputFiles(mediapaths.document);
        await this.enterEpisodeNumber.fill('99'); 
        await this.enterSceneNumber.fill('55');
        await this.send.click();   
        await this.fullSchedulePagesRadioButton.click();
        await this.okButton.nth(1).click(); 
    }




    async verifyPopUpMessage(popup){
        try{
            const successMsg = await this.page.locator(`text=${popup}`);
            await successMsg.waitFor({ state: 'visible', timeout: 15000 });
            await successMsg.waitFor({ state: 'hidden', timeout: 15000 });
        } catch(error){
            console.log('Not show the success pop up message', error.message);
        }
    }


    /**
     * more button action: view → viewCount → download → downloadCount → delete
     */

    async view(){
        await this.moreButton.click();
        await this.viewButton.click();
        await this.close.click();
    }

    async viewCount(tabName){
        await this.moreButton.click();
        await this.viewCountButton.click();

        if(tabName == 'scheduleFull'){
            await this.closeIcon.click();
        }

        if(tabName == 'pages'){
            await this.closeIcon.nth(2).click();
        }

        if(tabName == 'oneLine'){
            await this.closeIcon.nth(0).click();
        }           
    }

    async download(){
        await this.moreButton.click();
        await this.downloadButton.click();
    }

    async downloadCount(tabName){
        await this.moreButton.click();
        await this.downloadCountButton.click();

        if(tabName == 'scheduleFull'){
            await this.closeIcon.click();
        }

        if(tabName == 'pages'){
            await this.closeIcon.nth(2).click();
        }

        if(tabName == 'oneLine'){
            await this.closeIcon.nth(0).click();
        }
    }

    async delete(){
        await this.moreButton.click();
        await this.deleteButton.click();
        await this.yesButtonForDeletion.click();
    }

    async clickPageFolder(){
        await this.folder.click();  
    }

    async closePageScreen(){
        await this.closeWindow.click();
    }


}