import { expect } from '@playwright/test';
import UploadMedia from '../actions/media-uploader';

export default class DistributionList {

    constructor(page){
        this.page = page;
        this.uploadMedia = new UploadMedia(page);

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.distribution = page.locator('div.ant-card-body').getByText('Distribution List');

        this.distribute = page.locator('#distribution_list_distribute_button');
        this.dropDownManu = page.locator('div.ant-select-selector');

    }

    async openDistributionTab(){
        await this.tools.click();
        await this.distribution.click();
    }

    async enableDistributionForUser(){
        await this.distribute.first().click();   
    }

    async enableDistributionForSecondUser(){
        await this.distribute.last().click();   
    }

    async enableDistributionForHome(){
        await this.page.waitForTimeout(3000);
        const toggles = this.page.locator('[role="switch"]');
        const count = await toggles.count();

        for (let i = 0; i < count; i++) {
            const toggle = toggles.nth(i);
            const isChecked = await toggle.getAttribute('aria-checked');

            if (isChecked !== 'true') {
                await toggle.click();
                await this.uploadMedia.verifyPopupMessage('User access update for distribution')
                await this.page.waitForLoadState('networkidle');
                const refreshedToggle = this.page.locator('[role="switch"]').nth(i);
                await expect(refreshedToggle).toHaveAttribute('aria-checked', 'true');
            }
        }
    }

    async enableDistributionForTools(){
        await this.dropDownManu.click();
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }


}