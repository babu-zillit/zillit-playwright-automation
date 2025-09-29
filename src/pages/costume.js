import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class Costume {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.costume = page.locator('div.ant-card-body').getByText('Costume (Main Cast)');

        this.selectsShortlistFinals = page.locator('//div[@class="ant-segmented-group"]//label');

        this.selectCharacter = page.locator('#costume_select_character_modal_open_button');
        this.enterScene = page.locator('#scene_no');
        this.enterEpisode = page.locator('#episodeNo');
        this.enterDiscription = page.locator('#description');
        this.save = page.locator('#upload_costume_modal_save_button');

        this.plus = page.locator('#create_costume_details_modal_open_button');
        this.attchment = page.locator('[class="ant-float-btn-body"]');
        this.uploadMediaButton = page.locator("//div[contains(text(), 'Upload Media')]/ancestor::span//input[@type='file']");
        this.upload = page.locator("//button[.='Upload']");

        this.folder = page.locator('[alt="folder"]');
        this.viewImage = page.locator('//div[@class="relative cursor-pointer"]//img');
        this.close = page.locator('[id="close_document_viewer_button"]');
        this.closeWindow = page.locator('//span[@class="ant-modal-close-x"]//span[@aria-label="close"]');

        this.arrow = page.locator('//div[@class="mt-2"]//span[@aria-label="down"]');
        this.locationNameRadioButton = page.locator('//input[@name="radiogroup" and @value="1"]');
    }

    async costumeTab(){
        await this.tools.click();
        await this.costume.click();
    }

    async costumeBackgroundTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Costume (Background Cast)').click();
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

    async uploadMedia(){
        await this.plus.click();
        await this.attchment.click();
        await this.uploadMediaButton.setInputFiles(mediapaths.image);
        await this.upload.click();
    }

    async uploadCostume(scene, episode){
        await this.uploadMedia();
        await this.selectCharacter.click();
        await this.folder.first().click();
        await this.enterScene.fill(`${scene}`);
        await this.enterEpisode.fill(`${episode}`);
        
        await this.enterDiscription.fill('This costume is for testing purposes');
        await this.save.click();
        
        const successMsg = await this.page.locator('text=Costume has been created successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async openFolder(){
        await this.folder.click();
    }

    async openImage(){
        await this.folder.nth(1).click();
        await this.viewImage.first().click();
        const target = await this.close;
        await target.hover();
        await target.click();
        await this.closeWindow.nth(1).click();
        await this.closeWindow.first().click();
    }

    async arrowClick(){
        await this.arrow.click();
    }


    async handleDropdownAction(tabFn, actionText, successMessage, confirmDelete = false){

        await this[tabFn]();

        if(!(await this.locationNameRadioButton.isChecked())){
            await this.locationNameRadioButton.click();
        }

        const arrowCount = await this.arrow.count();
        if (arrowCount === 1) {
            await this.arrowClick();
        } else if (arrowCount > 1) {
            await this.arrow.first().click();
        } else {
            throw new Error('Arrow element not found');
        }
        
        await this.page.waitForSelector('.ant-dropdown-menu-item');
        const itemTexts = await this.page.$$eval('.ant-dropdown-menu-item .ant-dropdown-menu-title-content', elements =>
            elements.map(el => el.textContent.trim())
        );
        console.log('Dropdown Items:', itemTexts);
        await this.page.click(`text=${actionText}`);

        if (confirmDelete) {
            await this.page.locator('//div[@class="ant-modal-confirm-btns"]//button').nth(1).click();
            await this.page.waitForTimeout(1000);
        } else {
            await this.save.click();
        }

        if(successMessage){
            const successMsg = await this.page.locator(`text=${successMessage}`);
            await successMsg.waitFor({ state: 'visible' });
            await successMsg.waitFor({ state: 'hidden' });
        }  
    }

    async moveToShortlistFromSelects() {
        await this.handleDropdownAction('selectsTab', 'Move to Shortlist', 'Costume(s) have been moved successfully.');
    }

    async moveToFinalFromSelects() {
        await this.handleDropdownAction('selectsTab', 'Move to Final', 'Costume(s) have been moved successfully.');
    }

    async deleteFromSelects() {
        await this.handleDropdownAction('selectsTab', 'Delete', 'Costume has been deleted successfully.', true);
    }

    async deleteFromShortlist() {
        await this.handleDropdownAction('shortlistTab', 'Delete', 'Costume has been deleted successfully.', true);
    }

    async deleteFromFinals() {
        await this.handleDropdownAction('finalsTab', 'Delete', 'Costume has been deleted successfully.', true);
    }

}