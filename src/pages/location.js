import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class Location {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.location = page.locator('div.ant-card-body').getByText('Location');

        this.selectsShortlistFinals = page.locator('//div[@class="ant-segmented-group"]//label');

        this.enterLocation = page.locator('#fileName');
        this.enterScene = page.locator('#scene_no');
        this.enterEpisode = page.locator('#episodeNo');
        this.enterDiscription = page.locator('#description');
        this.save = page.locator('#upload_location_modal_save_button');

        this.plus = page.locator('#create_location_details_modal_open_button');
        this.attchment = page.locator('[class="ant-float-btn-body"]');
        this.uploadMediaButton = page.locator("//div[contains(text(), 'Upload Media')]/ancestor::span//input[@type='file']");
        this.send = page.locator("//button[.='Upload']");

        this.folder = page.locator('[alt="folder"]');
        this.viewImage = page.locator('//div[@class="relative cursor-pointer"]//img');
        this.close = page.locator('[id="close_document_viewer_button"]');
        this.closeWindow = page.locator('//span[@class="ant-modal-close-x"]//span[@aria-label="close"]');

        this.arrow = page.locator('//div[@class="mt-2"]//span[@aria-label="down"]');
        this.locationNameRadioButton = page.locator('//input[@name="radiogroup" and @value="1"]');

        this.generatepdf = page.locator('#lcw_generate_pdf_button');
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

    async uploadMedia(){
        await this.plus.click();
        await this.attchment.click();
        await this.uploadMediaButton.setInputFiles(mediapaths.image);
        await this.send.click();
    }

    async uploadLocation(location, scene, episode){
        await this.uploadMedia();
        await this.enterLocation.fill(`${location}`);
        await this.enterScene.fill(`${scene}`);
        await this.enterEpisode.fill(`${episode}`);
        
        await this.enterDiscription.fill('This location is for testing purposes');
        await this.save.click();
        
        const successMsg = await this.page.locator('text=Location photograph(s) have been added successfully.');
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
        await this.handleDropdownAction('selectsTab', 'Move to Shortlist', 'Location photograph(s) have been added successfully.');
    }

    async moveToFinalFromSelects() {
        await this.handleDropdownAction('selectsTab', 'Move to Final', 'Location photograph(s) have been added successfully.');
    }

    async deleteFromSelects() {
        await this.handleDropdownAction('selectsTab', 'Delete', null, true);
    }

    async deleteFromShortlist() {
        await this.handleDropdownAction('shortlistTab', 'Delete', null, true);
    }

    async deleteFromFinals() {
        await this.handleDropdownAction('finalsTab', 'Delete', null, true);
    }

    async generatePDF() {
        await this.generatepdf.click();
        await this.page.locator('//div[@class="ant-modal-footer"]//button').nth(1).click();
        const successMsg = await this.page.locator('text=Location List is generated successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.page.locator('//div[@class="ant-modal-body"]//button').nth(2).click();
        const successMsg2 = await this.page.locator('text=Document Published Sucessfully');
        await successMsg2.waitFor({ state: 'visible' });
        await successMsg2.waitFor({ state: 'hidden' });
    }


}