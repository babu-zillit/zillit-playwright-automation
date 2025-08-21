import { expect } from '@playwright/test';

export default class FilmSchedule {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');

        this.startDate = page.locator('input[placeholder="Select Start Date"]');
        this.endDate = page.locator('input[placeholder="Select End Date"]');


    }

    async openFilmSchedule(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Box / Film Schedule').click();
    }

    async selectStartDate() {
        await this.startDate.click();
        await this.page.locator('.ant-picker-header-next-btn').click();
        await this.page.locator('.ant-picker-cell:not(.ant-picker-cell-disabled) >> text=10').first().click();
    }

    async selectEndDate() {
        await this.endDate.click();
        await this.page.locator('.ant-picker-header-next-btn').click();
        await this.page.locator('.ant-picker-cell:not(.ant-picker-cell-disabled) >> text=15').first().click();
        await this.page.waitForTimeout(3000);
    }


}