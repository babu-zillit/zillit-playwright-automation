import { expect } from '@playwright/test';
const mediapaths = loadJson('mediapaths', 'testdata');
import { loadJson } from '../utils/jsonUtil';

export default class Map {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');

        this.selectLocationType = page.locator('#location_type');
        this.enterName = page.locator('input[placeholder="Enter name"]');
        this.enterDescription = page.locator('#description');
        this.uploadDocumentButton = page.locator('//span[@class="ant-upload"]//input[@type="file"]');
        this.save = page.locator('button[type="submit"]');
        
        this.editViewDeleteButton = page.locator('//tbody[@class="ant-table-tbody"]//tr[2]//td//button');
        this.searchForLocation = page.locator('[placeholder="Search For Location"]');
    
    }

    async mapTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Map').click();
    }

    async pinLocation(){
        await this.page.locator('//div[contains(@class,"absolute top-4")]//button').first().click();
        await this.page.locator('//div[@role="button"]//img').dblclick();
    }

    async fillLocationDetails() {
        await this.selectLocationType.click();
        await this.page.keyboard.press('Enter');

        const checkBox = this.page.locator('#forCast');
        await checkBox.waitFor({ state: 'visible' });
        await checkBox.check();

        await this.enterName.fill('Test Location');
        await this.enterDescription.fill('This is a test location description');

        await this.uploadDocumentButton.setInputFiles(mediapaths.image);
        await this.save.click();

        const successMsg = this.page.locator('text=Map location created successfully.');
        await expect(successMsg).toBeVisible();
        await expect(successMsg).toBeHidden();
    }

    async viewPinnedLocation() {
        await this.page.locator('text=View Pinned Location').click();
        await this.editViewDeleteButton.nth(1).click();
        await this.page.waitForTimeout(2000);
    }

    async deleteLocation() {
        await this.editViewDeleteButton.nth(2).click();

        const successMsg = this.page.locator('text=Map location deleted successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async searchLocation() {
        await this.page.reload();
        await this.searchForLocation.fill('Delhi');
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.page.locator('//div[@role="button"]//img').dblclick();
        await this.page.waitForTimeout(1000);
    }

    async copyViewLocationLink() {
        await this.page.locator('//div[contains(@class,"border-t")]//button').first().click();

        const successMsg = this.page.locator('text=Link copied to clipboard');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        const url = await this.page.evaluate(() => navigator.clipboard.readText());
        const newPage = await this.page.context().newPage();
        await newPage.goto(url, { waitUntil: 'load' });
        await this.page.waitForTimeout(2000);
        await newPage.close();  
    }
}