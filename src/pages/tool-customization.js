import { expect } from '@playwright/test';

export default class ToolCustomization {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.clickHere = page.locator('//span[@class="text-blue-500 underline"]');
        this.selectAll = page.locator('//div[@class="ant-modal-footer"]//span//input[@type="checkbox"]');
        this.save = page.locator('#save_customize_tools_button');
        
    }

    async openTools(){
        await this.tools.click();
    }

    async enableToolsModule(){
        await this.clickHere.click();
        await this.page.waitForSelector('text=Accounts' ,{ state: 'visible' });
        await this.selectAll.check();
        await expect(this.selectAll).toBeChecked();
        await this.save.click();

        const popup = await this.page.locator('text=Project tools updated.');
        await popup.waitFor({ state: 'visible' });
        await popup.waitFor({ state: 'hidden' });
    }

}