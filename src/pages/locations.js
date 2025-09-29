import { loadJson } from '../utils/jsonUtil';
import { expect } from '@playwright/test';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class Location {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.location = page.locator('div.ant-card-body').getByText('Location');

        this.selectsShortlistFinals = page.locator('//div[@class="ant-segmented-group"]//label');

        this.enterEpisode = page.locator('#episodeNo');
        this.enterLocation = page.locator('#fileName');
        this.enterScene = page.locator('#scene_no');
        this.enterDiscription = page.locator('#description');
        this.save = page.locator('#upload_location_modal_save_button');

        this.plus = page.locator('#create_location_details_modal_open_button');
        this.attchment = page.locator('[class="ant-float-btn-body"]');
        this.uploadMediaButton = page.locator("//div[contains(text(), 'Upload Media')]/ancestor::span//input[@type='file']");
        this.upload = page.locator('div.ant-modal-body div.text-end button');

        /**
         * folder locator
         */ 
        this.folder = page.locator('[alt="folder"]');
        this.folderSecond = page.locator('div.ant-modal-content div.ant-card-body img');
        this.viewImage = page.locator('//div[@class="relative cursor-pointer"]//img');

        this.close = page.locator('[id="close_document_viewer_button"]');
        this.closeWindowFromMediaScreen = page.locator('div.ant-modal.css-2iw4eq.bg-white div.ant-modal-content button[aria-label="Close"]');
        this.closeWindowFromSecondScreen = page.locator('div.ant-modal.css-2iw4eq div.ant-modal-content button[aria-label="Close"]');

        this.arrow = page.locator('div.ant-dropdown-trigger span.anticon-down');
        this.locationNameRadioButton = page.locator('//input[@name="radiogroup" and @value="1"]');
        this.sceneNumberRadioButton = page.locator('//input[@name="radiogroup" and @value="2"]');
        this.episodeRadioButton = page.locator('//input[@name="radiogroup" and @value="3"]');


        this.generatepdf = page.locator('#lcw_generate_pdf_button');

        this.deleteOkButton = page.locator('div.ant-modal-content div.ant-modal-confirm-btns button');

        /**
         * locator from media screen
         */
        this.select = page.locator('#lcw_select_unselect_media_button');
        this.selectImageCheckbox = page.locator('div.ant-modal-body  label input[type="checkbox"]');
        this.moveTo = page.locator('#lcw_move_media_button');
        this.moveToOptionButton = page.locator('li.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child span');
        this.arrowOnMediaScreen = page.locator('div.ant-modal-content div.ant-modal-body span[role="img"][aria-label="down"]');

        this.selectAll = page.locator('#lcw_forward_select_deselect_button');
        this.forward = page.locator('#lcw_forward_button');

        this.imageReply = page.locator('#location_image_reply_media_button');
        this.typeMessage = page.locator('[placeholder="Type a message"]');
        this.loadingIcon = page.locator('[data-icon="loading"]');
        this.closeImageReplyWindow = page.locator('div.ant-drawer-content-wrapper button span[aria-label="close-square"]');
        
    }

    async locationTab(){
        await this.tools.click();
        await this.location.click();
    }

    async selectsTab(){
        await this.selectsShortlistFinals.first().click();
    }

    async shortlistTab(){
        await this.selectsShortlistFinals.nth(1).click();
    }

    async finalsTab(){
        await this.selectsShortlistFinals.nth(2).click();
    }

    async verifypopup(message){
        const popup = this.page.locator('.ant-message-notice-wrapper div div div').first();
        await expect.soft(popup).toBeVisible({ timeout: 15000 });
        await expect.soft(popup).toHaveText(message, { timeout: 15000 });
        await expect.soft(popup).toBeHidden({ timeout: 15000 });
        console.log('Popup message verified:');
    }

    async uploadMedia(){
        await this.plus.click();
        await this.attchment.click();
        await this.uploadMediaButton.setInputFiles(mediapaths.image);
        await this.upload.nth(1).click();
    }

    async uploadLocation(location, scene, episode, discription){
        await this.uploadMedia();
        await this.enterLocation.fill(`${location}`);
        await this.enterScene.fill(`${scene}`);
        await this.enterEpisode.fill(`${episode}`);
        await this.enterDiscription.fill(`${discription}`);
        await this.save.click();
    }


    async openFolderFirstScreen(){
        const folderCount = await this.folder.count();
        await (folderCount === 1 ? this.folder.click() : this.folder.first().click());
    }

    async openFolderSecondScreen(){
        const folderCount = await this.folderSecond.count();
        await (folderCount === 1 ? this.folderSecond.click() : this.folderSecond.first().click()); 
    }

    async checkLocationNameRadioButton(){
        if(!(await this.locationNameRadioButton.isChecked())){
            await this.locationNameRadioButton.click();
        }
    }

    async checkEpisodeRadioButton(){
        if(!(await this.episodeRadioButton.isChecked())){
            await this.episodeRadioButton.click();
        }
    }

    async viewImages(){
        const imageCount = await this.viewImage.count();
        await (imageCount === 1 ? this.viewImage.click() : this.viewImage.first().click());
        const target = await this.close;
        await target.hover();
        await target.click();
        await this.closeWindowFromMediaScreen.click();
        await this.closeWindowFromSecondScreen.click();
    }

    async arrowClick(){
       const arrowCount = await this.arrow.count();
       await (arrowCount === 1 ? this.arrow.click() : this.arrow.first().click());
    }

    async dropDownArrowAction(selectTab, actionText){
        await this[selectTab]();
        await this.checkLocationNameRadioButton();
        await this.arrowClick();
        await this.page.locator('.ant-dropdown-menu-item', { hasText: actionText }).first().click();

        if(actionText === 'Delete'){
            await this.deleteOkButton.last().click();
            const loadingIcon = this.page.locator('.anticon-loading');
            await loadingIcon.waitFor({ state: 'visible', timeout: 10000 });
            await loadingIcon.waitFor({ state: 'hidden', timeout: 10000 });
        } else {
            await this.save.click();
        }
    }

    async moveToFromMediaScreen(actionText){
        await this.checkLocationNameRadioButton();
        await this.openFolderFirstScreen();
        await this.select.click();
        const countImage = await this.selectImageCheckbox.count();
        await (countImage === 1 ? this.selectImageCheckbox.first().check() : this.selectImageCheckbox.first().check());
        await this.page.waitForTimeout(500);
        await this.moveTo.hover();
        await this.page.locator('li.ant-dropdown-menu-item', { hasText: new RegExp(`^${actionText}$`)}).first().click();
        await this.save.click();
    }

    async closeImageWindow(){
        await this.closeWindowFromMediaScreen.click();
    }

    async clickArrowOnMediaScreen(actionText){
        await this.arrowOnMediaScreen.click();
        await this.page.locator('.ant-dropdown-menu-item', { hasText: actionText }).first().click();
    }

    async editLocationDeatils(episode, character, talent, discription){
        await this.checkCharacterRadioButton();
        await this.openFolderFirstScreen();
        await this.clickArrowOnMediaScreen('Edit');
        await this.enterEpisode.fill(`${episode}`);
        await this.enterCharacter.fill(`${character}`);
        await this.enterTalent.fill(`${talent}`);
        await this.enterDiscription.fill(`${discription}`);
        await this.save.click();
    }

    async forwardLocation(){
        await this.checkLocationNameRadioButton();
        await this.openFolderFirstScreen();
        await this.clickArrowOnMediaScreen('Forward');
        await this.selectAll.click();
        await this.forward.click();
    }

    async imageReplys(){
        await this.imageReply.click();
        await this.page.waitForTimeout(1000);
        await this.typeMessage.fill('Hello Babu');
        await this.upload.nth(1).click();
        await this.loadingIcon.waitFor({ state: 'visible' });
        await this.loadingIcon.waitFor({ state: 'hidden' });
        await this.page.waitForTimeout(500);
        await this.closeImageReplyWindow.click();
    }

    async deleteFolderIfAvailable(){
        await this.checkCharacterRadioButton();
        let arrowCount = await this.arrow.count();
        while(arrowCount > 0){
            await this.arrow.first().click();
            await this.page.locator('.ant-dropdown-menu-item', { hasText: 'Delete' }).first().click();
            await this.deleteOkButton.last().click();
            await this.verifypopup('Cast photograph has been deleted successfully.');
            arrowCount--;
        }
        await this.checkEpisodeRadioButton(); 
    }

       async generatePDF() {
        await this.generatepdf.click();
        await this.page.locator('div.ant-modal-footer button').nth(1).click();
        const successMsg = await this.page.locator('text=PDF for cast has been successfully created.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.page.locator('div.ant-modal-body button').first().click();
        const successMsg2 = await this.page.locator('text=Document Published Sucessfully');
        await successMsg2.waitFor({ state: 'visible' });
        await successMsg2.waitFor({ state: 'hidden' });
    }

}