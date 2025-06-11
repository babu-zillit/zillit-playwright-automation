//src/pages/upload-media.js
import { expect } from '@playwright/test';

export default class Calendar {

    constructor(page){
        this.page = page;

        this.calendarButton = page.locator('text=Calendar');
        this.addEventButton = page.locator('text=Add Event');
        this.enterTitle = page.locator('[placeholder="Add Title *"]');
        this.selectDate = page.locator('//div[@class="ant-picker-input"]//child::input[@id="startDate"]');
        this.startTime = page.locator('//span[@class="ant-select-selection-search"]//child::input[@id="startTime"]');
    }

    async calendar(){
        await this.calendarButton.click();
        await this.addEventButton.click();
        await this.enterTitle.fill("Babu");

        await this.selectDate.click();
        //await this.page.waitForTimeout(2000);
        await this.page.locator('.ant-picker-header-next-btn').click(); // next month
        //await this.page.waitForTimeout(2000);
        await this.page.locator('.ant-picker-cell:not(.ant-picker-cell-disabled) >> text=12').click();
    }

    async selectTime(){
        // const options = this.page.locator('//span[@class="ant-select-selection-item"]');
        // const secondOption = options.nth(1);  // nth is zero-based index, so 1 means 2nd element
        // const text = await secondOption.textContent();
        // console.log(text.trim());

        await this.page.locator('#endTime').fill('07:30 PM');
        await this.page.locator('#endTime').press('Enter'); // Press Enter inside the input
        //await this.page.waitForTimeout(2000);

        await this.page.locator('text=Do Not Repeat').click();
        //await this.page.waitForTimeout(2000);

        await this.page.locator('text=Every Week').waitFor({ state: 'visible' });
        await this.page.locator('text=Every Week').click();
        await this.page.locator("//button[@type='button']//span[text() = 'Ok']").waitFor({ state: 'visible' });
        await this.page.locator("//button[@type='button']//span[text() = 'Ok']").click();
       // await this.page.waitForTimeout(5000);
    }

}