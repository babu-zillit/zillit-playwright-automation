import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class Settings {

    constructor(page){
        this.page = page;

        this.settings = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Settings"]');
        this.adminSetting = page.locator('[data-node-key="admin"]');

        /**
         * Create New Department locator
         */ 
        this.createNewDepartment = page.locator('#create_new_department');
        this.enterDepartmentName = page.locator('[placeholder="Enter Department Name"]');
        this.saveDepartment = page.locator('#create_new_department_button');
        this.cancelDepartmentButton = page.locator('#cancel_new_department_button');

        this.delete = page.locator('[aria-label="delete"]');
        this.yesButton = page.locator('//div[@class="ant-popconfirm-buttons"]//button');

        /**
         * Create New Designation locator
         */ 
        this.createNewDesignation = page.locator('#create_new_designation');
        this.enterNewDesignation = page.locator('[placeholder="Enter new designation"]');
        this.addDesignation = page.locator('#create_new_designation_button');
        this.okButton = page.locator('//div[@class="ant-modal-footer"]//button//span[text()="Ok"]');


        /**
         * Create Home Unit
         */ 
        this.createHomeUnitTab = page.locator('#create_home_unit');
        this.createHomeUnitPlusButton = page.locator('#create_home_unit_drawer_open_button');
        this.enterUnitName = page.locator('[placeholder="Enter unit name"]');
        this.allDepartment = page.locator('[value="all department"]');
        this.createHomeUnitButton = page.locator('#create_home_unit_button');

        /**
         * Watermark logo company locator
         */ 
        this.waterMarkLogoCompany = page.locator('#watermark_logo_of_company');
        this.uploadImage = page.locator("//button[@id='upload_watermark_logo_button']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
        this.submitWaterMarkLogo = page.locator('#submit_watermark_logo_button');
        this.cancelWaterMarkLogo = page.locator('#cancel_watermark_logo_button');
        this.deleteWaterMarkLogo = page.locator('#delete_watermark_logo_button');

        /**
         * Delete project locator
         */
        this.deleteProject = page.locator('#delete_project');
        this.projectDeleteButton = page.locator('[id="12hour_project_deletion_button"]');
        this.confirm = page.locator('//div[@class="ant-modal-footer"]//button');
    
        this.stopProjectDeletion = page.locator('#stop_project_deletion');



    }


    async openSettings(){
        await this.page.waitForTimeout(10000);
        await this.settings.click();
        await this.adminSetting.click();
    }


    async createDepartment(){
        await this.createNewDepartment.click();
        await this.enterDepartmentName.fill('Babu');
        await this.saveDepartment.click();

        const successMsg = await this.page.locator('text=Department has been created successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.cancelDepartmentButton.click();
    }

    async deleteDepartment(){
        await this.createNewDepartment.click();
        await this.delete.click();
        await this.yesButton.nth(1).click();

        const successMsg = await this.page.locator('text=Department deleted successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.cancelDepartmentButton.click();
    }

    async createDesignation(){
        await this.createNewDesignation.click();

        await this.page.locator('.ant-select-selector').click();
        await this.page.waitForSelector('div.ant-collapse-item', { state: 'visible' });
        await this.page.locator('div.ant-select-item-option-content', { hasText: 'Writer' }).click();

        await this.enterNewDesignation.fill('Babu Tester');
        await this.addDesignation.click();

        const successMsg = await this.page.locator('text=Designation has been created successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.okButton.click();
    }

    async deleteDesignation(){
        await this.createNewDesignation.click();
        await this.page.locator('//div[@class="ant-collapse-header"]//span[text()="Writer"]').click();
        
        await this.delete.click();
        await this.yesButton.nth(1).click();

        const successMsg = await this.page.locator('text=Designation has been deleted successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.okButton.click();
    }


    async createHomeUnit(){
        await this.createHomeUnitTab.click();
        await this.createHomeUnitPlusButton.click();
        await this.enterUnitName.fill('Sam');
        await this.createHomeUnitButton.click();

        const successMsg = await this.page.locator('text=Home unit created successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async editHomeUnit(){
        await this.createHomeUnitTab.click();
        await this.page.locator('[aria-label="edit"]').nth(3).click();
        
        const inputLocator = this.page.locator('//input[@type="text"]').nth(1);
        await inputLocator.click();
        await inputLocator.fill('Sam1');

        await this.page.locator('#edit_home_unit').click();
    }

    async deleteHomeUnit(){
        await this.createHomeUnitTab.click();
        await this.page.locator('[aria-label="delete"]').nth(3).click();
        await this.yesButton.nth(1).click();

        const successMsg = await this.page.locator('text=Unit deleted successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.page.locator('[aria-label="close"]').nth(2).click();
    }

    async uploadWaterMarkLogo(){
        await this.page.waitForTimeout(3000);
        await this.waterMarkLogoCompany.click();
        await this.uploadImage.setInputFiles(mediapaths.image);
        await this.submitWaterMarkLogo.waitFor({ state: 'visible' });
        await this.submitWaterMarkLogo.click();

        const successMsg = await this.page.locator('text=Watermark uploaded Sucessfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.cancelWaterMarkLogo.click();
    }

    async deleteWaterMarkLogoCompany(){
        await this.waterMarkLogoCompany.click();
        await this.deleteWaterMarkLogo.waitFor({ state: 'visible' });
        await this.deleteWaterMarkLogo.click();
        //await this.yesButton.nth(1).click();
        await this.page.locator('.ant-popconfirm-buttons button span').nth(1).click();
    }

    async deleteProjects(){
        await this.page.waitForTimeout(3000);
        await this.deleteProject.click();
        await this.page.waitForTimeout(1500);
        await this.projectDeleteButton.click();
        await this.page.waitForTimeout(1500);
        const confirmButton = this.page.locator('//button[.//span[text()="Confirm"]]');
        await confirmButton.click();

        const successMsg = await this.page.locator('text=Your Project Will Be Deleted After 12 hours');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async stopProjectDeletions(){
        await this.stopProjectDeletion.click();
        await this.page.waitForTimeout(1500);
        await this.page.locator('//div[@class="ant-modal-footer"]//button//span[text()="Stop Delete"]').click();

        const successMsg = await this.page.locator('text=Project deletion has been stopped.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }


}