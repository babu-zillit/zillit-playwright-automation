import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class ScheduleDOD {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');

        /**
         * upload documents locators
         */
        this.attachment = page.locator('//div[@id="scriptFooter"]//button');
        this.documentUpload = page.locator("//div[text()='Document Upload']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.send = page.locator('#upload_document_send_script_button');

        /**
         * DOD page locators
         */
        this.enterDocumentName = page.locator('[id="documentName"]');
        this.enterEpisodeNumber = page.locator('[id="episodeNo"]');
        this.folder = page.locator('//img[@alt="Folder Icon"]');

        /**
         * dod more button locators
         */
        this.moreButton = page.locator('#dod_more_button');
        this.viewButton = page.locator('#dod_more_view_button');
        this.deleteButton = page.locator('#dod_more_delete_button');
        this.downloadButton = page.locator('#dod_more_download_button');
        this.downloadCountButton = page.locator('#dod_more_download_count_button');
        this.viewCountButton = page.locator('#dod_more_view_count_button');
        this.moveButton = page.locator('#dod_more_move_button');

        this.close = page.locator('#close_document_viewer_button');
        this.closeIcon = page.locator('//button[@aria-label="Close"]');
    }

    async clickTools(){
        await this.tools.click();
    }


    async clickDODTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Schedule D.O.D.').click();
    }


    async uploadDOD(dodname, episodeNo){
        await this.attachment.click();
        await this.documentUpload.setInputFiles(mediapaths.document);
        await this.enterDocumentName.fill(`${dodname}`);
        await this.enterEpisodeNumber.fill(`${episodeNo}`);
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


    async clickDODFolder(){
        try{
            const dodname = await this.page.locator('text=Babu');
            await dodname.waitFor({ state: 'visible' });
        } catch(error){
            console.log('dod name folder not visible');
        }
        const count = await this.folder.count();

        if(count ==1){
            await this.folder.click();
        } else if( count > 1){
            await this.folder.first().click();
        } else{
            console.warn('No dod folder found');
        }    
    }

    /**
     * dod more button action
     */

    async view(){
        await this.moreButton.click();
        await this.viewButton.click();
        await this.close.click();
    }


    async viewCount(){
        await this.moreButton.click();
        await this.viewCountButton.click();
        await this.closeIcon.nth(1).click();
    }


    async download(){
        await this.moreButton.click();
        await this.downloadButton.click();
    }


    async downloadCount(){
        await this.moreButton.click();
        await this.downloadCountButton.click();
        await this.closeIcon.nth(1).click();
    }


    async move(){
        await this.moreButton.click();
        await this.moveButton.click();

        try{
            const checkbox = await this.page.locator('//span[contains(@class, "ant-checkbox")]//input[@type="checkbox"]');
            if(!(await checkbox.isVisible())){
                await this.page.locator('//span[@class="ant-modal-close-x"]').nth(1).click();
            }
        } catch(error){
            console.log('Checkbox is visible, more than one folder is available');
        }
    }


    async delete(){
        await this.moreButton.click();
        await this.deleteButton.click();
        const yespopup = await this.page.locator('//div[@class="ant-popconfirm-buttons"]//button//span[text()="Yes"]');
        await yespopup.click();
    }

}