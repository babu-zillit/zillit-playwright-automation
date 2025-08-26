import { count, log } from "console";
import { expect } from '@playwright/test';

export default class CommonPage {
    constructor(page){
        this.page = page;
        this.hoverMainManu = page.locator("//div[@class='dropDown']");
        this.hoverReplyManu = page.locator('.right-2.top-2.absolute [aria-label="down"]');

        this.confidentialInfoTabButton = this.page.getByText('Confidential Info Tab');
    }

    async handleDropdownAction(optionText){
        const count = await this.hoverMainManu.count();

        if(count === 1){
            await this.hoverMainManu.first().waitFor({ state: 'visible' });
            await this.hoverMainManu.first().hover();
            await this.hoverMainManu.first().click();
        } else if (count > 1){
            await this.hoverMainManu.last().waitFor({ state: 'visible' });
            await this.hoverMainManu.last().hover();
            await this.hoverMainManu.last().click();
        } else{
            throw new Error("No elements found for the given selector.");
        }

        try{
            const liItems = this.page.locator('div[class*="ant-dropdown-placement-"] li');
            await liItems.first().waitFor({ state: 'visible', timeout: 5000 });
            const texts = await liItems.allTextContents();
            console.log('Dropdown list items:', texts);
            await this.page.waitForTimeout(500);
            await liItems.filter({ hasText: optionText }).first().click();
        }catch (error){
            console.error(`Failed to select dropdown option: ${optionText}`, error);
        }

        //await this.page.waitForTimeout(2000);
    }





    async forward(){
            await this.handleDropdownAction('Forward');
            await this.confidentialInfoTabButton.click();
    
            const popup = this.page.locator('text=Forward Successfully');
            await expect(popup).toBeVisible({ timeout: 15000 });
            await expect(popup).toBeHidden({ timeout: 15000 });
        }

    async verifypopup(message){
        const popup = this.page.locator('.ant-message-notice-wrapper div div div').first();
        await expect.soft(popup).toBeVisible({ timeout: 10000 });
        await expect.soft(popup).toHaveText(message, { timeout: 10000 });
        await expect.soft(popup).toBeHidden({ timeout: 10000 });
        console.log('Popup message verified:');
    }
    
}