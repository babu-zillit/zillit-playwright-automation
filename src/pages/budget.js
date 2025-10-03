import { loadJson } from '../utils/jsonUtil';
import CnC from "../pages/cnc";
const mediapaths = loadJson('mediapaths', 'testdata');

export default class Budget{
    constructor(page){
        this.page = page;
        this.cncPage = new CnC(page);

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.budgetFull = page.locator('div.ant-card-body').getByText('Budget (Full)');
        this.budgetDepartment = page.locator('div.ant-card-body').getByText('Budget (Department)');

        /**
         * upload pdf locators
         */ 
        this.uploadPDF = page.locator('span.ant-upload input');
        this.enterEpisodeNumber = page.locator('[placeholder="Enter Episode Number"]');
        this.upload = page.locator("//button[.='Upload']");

        /**
         * all more buttons locators
         */
        this.clickOnEpisodeNumber = page.locator('div.ant-card-meta');
        this.moreButton = page.locator('#budget_more_button');
        this.viewButton = page.locator('#budget_more_view_button');
        this.close = page.locator('#close_document_viewer_button');
        this.viewCountButton = page.locator('#budget_more_view_count_button');
        this.closeViewCountWindow = page.locator('div.ant-drawer-header-title button');
        this.downloadButton = page.locator('budget_more_download_button');
        this.downloadCountButton = page.locator('budget_more_download_count_button');


        /**
         * Chat locators
         */
        this.plus = page.locator('[aria-label="plus"]');
        this.addMemberButton = page.locator('#budget_add_chat_user_button');
        this.createGroupButton = page.locator('#budget_create_group_button');
        this.profilePic = page.locator('div.ant-card-meta-avatar');

        /**
         * Budget Department locator
         */
        this.plusDepartment = page.locator('#budget_create_new_department_button');
        this.departmentList = page.locator('div.ant-collapse-item');     

    }

    async openBudget(){
        await this.tools.click();
        await this.budgetFull.click();
    }

    async openBudgetDepartment(){
        await this.tools.click();
        await this.budgetDepartment.click();
    }

    async verifypopup(message){
        const popup = this.page.locator('.ant-message-notice-wrapper div div div').first();
        await expect.soft(popup).toBeVisible({ timeout: 10000 });
        await expect.soft(popup).toHaveText(message, { timeout: 10000 });
        await expect.soft(popup).toBeHidden({ timeout: 10000 });
        console.log('Popup message verified:');
    }

    async uploadPdf(episodeNumber){
        await this.uploadPDF.setInputFiles(mediapaths.document);
        
        const datePicker = this.page.getByPlaceholder('Select date');
        await datePicker.click();
        await this.page.locator('.ant-picker-header-next-btn').click();
        await this.page.locator('.ant-picker-header-prev-btn').click();
        await this.page.locator('.ant-picker-cell-inner').first().click();

        await this.enterEpisodeNumber.fill(`${episodeNumber}`);
        await this.upload.click();
    }

    async openDocument(){
        await this.clickOnEpisodeNumber.first().click();
    }

    async view(){ 
        await this.moreButton.click();
        await this.viewButton.click();
        await this.close.click();
    }

    async viewCount(){
        await this.moreButton.click();
        await this.viewCountButton.click();
        await this.closeViewCountWindow.click();
    }

    async download(){
        await this.moreButton.click();
        await this.page.locator('div.ant-popover-inner-content button').nth(1).click();
        await this.page.waitForTimeout(5000);
    }

    async downloadCount(){
        await this.moreButton.click();
        await this.page.locator('div.ant-popover-inner-content button').nth(2).click();
        await this.closeViewCountWindow.click();
    }

    async addMember(){
        await this.plus.click();
        await this.addMemberButton.click();
        await this.profilePic.click();
    }

    /**
     * Chat actions
     */ 
    async cncDropList(optionText){
        const targetHover = await this.page.locator('//div[contains(@class,"flex flex-col group relative")]');
        await targetHover.hover();
        const dropdownManu = await this.page.locator('[id="dropdownMenuIconButton"]');
        await dropdownManu.click();
        try{
            const menuItems = this.page.locator('ul.ant-dropdown-menu li span.ant-dropdown-menu-title-content');
            await menuItems.first().waitFor({ state: 'visible', timeout: 10000});   

            const allTexts = await menuItems.allTextContents();
            console.log("Dropdown items:", allTexts);
            await this.page.waitForTimeout(500);

            await this.page.getByText(optionText, { exact: true }).first().click();
        } catch(error) {
            console.error(`Failed to select dropdown option: ${optionText}`, error);
        }     
    }

    async attachment(){
        await this.cncPage.attachmentButton.click();
    }

    async imageUpload(){
        await this.cncPage.imageUploadInput.setInputFiles(mediapaths.image);
        await this.cncPage.send.nth(1).click();
    }

    async videoUpload(){
        await this.cncPage.videoUploadInput.setInputFiles(mediapaths.video);
        await this.cncPage.send.nth(0).click();
    }

    async plusBudgetDepartment(){
        await this.plusDepartment.click();
        await this.departmentList.first().click();
    }

}