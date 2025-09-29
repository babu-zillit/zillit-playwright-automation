import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class ScriptDistribution {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.fullScript = page.locator('//div[@class="ant-tabs-tab-btn"]//span[text()="Full Script"]');
        this.pages = page.locator('//div[@class="ant-tabs-tab-btn"]//span[text()="Pages"]');

        /**
         * upload documents locators
         */
        this.attachment = page.locator('//div[@id="scriptFooter"]//button');
        this.documentUpload = page.locator("//div[text()='Document Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.send = page.locator("//button[.='Upload']");

        /**
         * FullScript & Page locators
         */
        this.enterEpisodeNumber = page.locator('#episodeNo');
        this.enterSceneNumber = page.locator('#sceneNumber');

        /**
         * FullScript & Page more button locators
         */
        this.moreButton = page.locator('#script_distribution_more_button');
        this.viewButton = page.locator('#script_distribution_more_view_button');
        this.viewCountButton = page.locator('#script_distribution_more_view_count_button');
        this.replaceButton = page.locator('#script_distribution_more_replace_button');
        this.downloadButton = page.locator('#script_distribution_more_download_button');
        this.downloadCountButton = page.locator('#script_distribution_more_download_count_button');
        this.deleteButton = page.locator('#script_distribution_more_delete_button');
        this.yesButtonForDeletion = page.locator('//div[@class="ant-popconfirm-buttons"]//button//span[text()="Yes"]')
        this.close = page.locator('#close_document_viewer_button');
        this.closeIcon = page.locator('//button[@aria-label="Close"]');

        /**
         * Folder & other locators
         */
        this.folder = page.locator('//img[@alt="Folder Icon"]');

    }


    async scriptDistributionTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Script & Pages Distribution').click();
    }

    async fullScriptTab(){
        await this.fullScript.click();
    }

    async pageTab(){
        await this.pages.click();
    }


    async uploadScriptDistribution(enterEpisode, enterScene){
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
     * more button action: view → viewCount → download → downloadCount → move → delete
     */

    async view(){
        await this.moreButton.click();
        await this.viewButton.click();
        await this.close.click();
    }

    async viewCount(tabName){
        await this.moreButton.click();
        await this.viewCountButton.click();

        if(tabName == 'scriptFull'){
            await this.closeIcon.click();
        }

        if(tabName == 'pages'){
            await this.closeIcon.nth(2).click();
        }         
    }

    async viewCountForPage(){
        await this.moreButton.click();
        await this.viewCountButton.click();
        await this.closeIcon.nth(1).click();
    }


    async download(){
        await this.moreButton.click();
        await this.downloadButton.click();
    }

    async downloadCount(tabName){
        await this.moreButton.click();
        await this.downloadCountButton.click();

        if(tabName == 'scriptFull'){
            await this.closeIcon.click();
        }

        if(tabName == 'pages'){
            await this.closeIcon.nth(2).click();
        }
    }

    async downloadCountForPages(){
        await this.moreButton.click();
        await this.downloadCountButton.click();
        await this.closeIcon.nth(1).click();
    }


    async delete(){
        await this.moreButton.click();
        await this.deleteButton.click();
        await this.yesButtonForDeletion.click();
    }


    async clickPageFolder(){
        const count = await this.folder.count();

        if(count ==1){
            await this.folder.click();
        } else if( count > 1){
            await this.folder.first().click();
        } else{
            console.warn('No page folder found');
        }    
    }

}