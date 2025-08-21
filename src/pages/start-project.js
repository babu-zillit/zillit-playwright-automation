import { expect } from '@playwright/test';
import logger from "../utils/loggerUtils";
import { loadJson } from '../utils/jsonUtil';
const startproject = loadJson('startproject', 'testdata');

export default class StartProject {
    
    constructor(page){
        this.page = page;

        this.startProjectViewButton = page.locator('//button[@type="button"]//span[contains(text(),"Start Project")]');

        /**
         * Start-project page input locators
         */
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.projectType = page.locator('#projectType');
        this.projectSubType = page.locator('#projectSubType');
        this.language = page.locator('#language');
        this.projectNameInput = page.locator('#projectName');
        this.emailInput = page.locator('#email');
        this.checkboxButton = page.locator('#agreeTerms');
        this.submitButton = page.locator('//div[@class="ant-modal-footer"]//button');
    }

    async clickStartProject(){
      logger.info('[StartProject] project creation is started...')

        await this.startProjectViewButton.click();
    }

    async enterFirstName(){
        await this.firstNameInput.fill(startproject.firstName);
        await expect(this.firstNameInput).toHaveValue(startproject.firstName, { timeout: 9000 });
    }

    async enterLastName(){
        await this.lastNameInput.fill(startproject.lastName);
        await expect(this.lastNameInput).toHaveValue(startproject.lastName, { timeout: 9000 });
    }

    async selectProjectType(){
        
        // Click to open the projectType dropdown 
        await this.projectType.click();

        //Wait for the visible projectType dropdown
        const dropdown = this.page.locator('.ant-select-dropdown:visible');
        await dropdown.waitFor({ state: 'visible' });

        //Locate all the projectType options inside the visible dropdown
        const options = dropdown.locator('.ant-select-item-option');

        //Wait for the first option to be visible
        await options.first().waitFor({ state: 'visible' });
        const languageOptions = await options.allTextContents();
        console.log('Language Options:', languageOptions);

        //Select Entertainment Industry
        await options.filter({ hasText: 'Entertainment Industry' }).first().click();
    }

    async selectProjectSubType(){
        await expect(this.projectSubType).toBeVisible();
        await this.projectSubType.click();

        const dropdown = this.page.locator('.ant-select-dropdown:visible');
        await dropdown.waitFor({ state: 'visible' });

        const options = dropdown.locator('.ant-select-item-option');
        await options.first().waitFor({ state: 'visible' });

        const optionTexts = await options.allTextContents();
        console.log('Options:', optionTexts);

        const projectSubTypeName = startproject.projectSubType;
        await options.filter({ hasText: projectSubTypeName }).first().click();
    }

    async selectLanguage(){
        await expect(this.language).toBeVisible();
        await this.language.click();

        const dropdown = this.page.locator('.ant-select-dropdown:visible');
        await dropdown.waitFor({ state: 'visible' });

        const options = dropdown.locator('.ant-select-item-option');
        await options.first().waitFor({ state: 'visible' });

        const languageOptions = await options.allTextContents();
        console.log('Language Options:', languageOptions);

        await options.filter({ hasText: 'English' }).first().click();
    }

    async enterProjectName(){
        await this.projectNameInput.fill(startproject.projectName)
        await expect(this.projectNameInput).toHaveValue(startproject.projectName, { timeout: 5000 });
    }

    async enterEmail(){
        await this.emailInput.fill(startproject.email);
        await expect(this.emailInput).toHaveValue(startproject.email, { timeout: 5000});
    }

    async clickCheckBox(){
        await this.checkboxButton.check();
        await expect(this.checkboxButton).toBeChecked();
    }

    async clickSubmit(){
       await this.submitButton.nth(1).click();
    }

    async next(){
        await this.page.waitForTimeout(28000);
        await this.page.locator('#invite_users_next_button').click();
        await this.page.locator('#skip_navigation_to_project_setup_notes_button');
    }

    async projectCreation(){
        await this.page.waitForTimeout(1500);
        await this.enterFirstName();
        await this.page.waitForTimeout(1500);
        await this.enterLastName();
        await this.page.waitForTimeout(1500);
        await this.selectProjectType();
        await this.page.waitForTimeout(1500);
        await this.selectProjectSubType();
        await this.page.waitForTimeout(1500);
        await this.selectLanguage();
        await this.page.waitForTimeout(1500);
        await this.enterProjectName();
        await this.page.waitForTimeout(1500);
        await this.enterEmail();
        await this.page.waitForTimeout(1500);
        await this.clickCheckBox();
        await this.clickSubmit();
        await this.next();
    }

}