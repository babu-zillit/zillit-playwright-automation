import { expect } from '@playwright/test';
const mediapaths = loadJson('mediapaths', 'testdata');
import { loadJson } from '../utils/jsonUtil';

export default class Map {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');

        this.searchAndSelectCity = page.locator('[placeholder="Search and select city"]');
        this.selectLocationType = page.locator('#location_type');
        this.enterName = page.locator('input[placeholder="Enter name"]');
        this.enterDescription = page.locator('#description');
        this.uploadDocumentButton = page.locator('//span[@class="ant-upload"]//input[@type="file"]');
        this.save = page.locator('button[type="submit"]');
        
        this.editViewDeleteButton = page.locator('//tbody[@class="ant-table-tbody"]//tr[2]//td//button');
        this.searchForLocation = page.locator('[placeholder="Search For Location"]');
        this.addButton = page.locator('div.relative button');

        this.viewAndDeleteButton = page.locator('div.ant-table-container tbody.ant-table-tbody tr td button');
    
    }

    async mapTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Map').click();
    }

    async searchSelectCity(){
        await this.page.waitForTimeout(5000);
        await this.searchAndSelectCity.fill('Noida');
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.addButton.last().click();
        
        const successMsg = this.page.locator('text=New city has been added in the city list.');
        await expect(successMsg).toBeVisible();
        await expect(successMsg).toBeHidden();
    }

    async pinLocation(){
        await this.page.locator('div.ant-space-item button').first().click();
        await this.page.waitForTimeout(3000);
        await this.page.locator('//div[contains(@class,"absolute top-4")]//button').first().click();
        await this.page.locator('//div[@role="button"]//img').dblclick();
        await this.page.waitForTimeout(3000);
    }

    async fillLocationDetails() {
        await this.page.waitForTimeout(3000);
        await this.selectLocationType.click();
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);

        const sceneNumber = this.page.locator('[placeholder="Enter Scene Number"]');
        await sceneNumber.fill('99');

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
        await this.page.locator('[aria-label="eye"]').click();
        await this.page.waitForTimeout(3000);
    }

    async deleteLocation() {
        await this.page.locator('[aria-label="delete"]').last().click();
        await this.page.locator('div.ant-modal-confirm-btns button').last().click();

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