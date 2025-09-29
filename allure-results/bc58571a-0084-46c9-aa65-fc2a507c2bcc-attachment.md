# Test info

- Name: External User >> Add user >> verify add external user
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/16_external-userTest.spec.js:36:9

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('text=External user information has been added successfully.') to be visible

    at ExternalUser.addUser (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/external-user.js:43:26)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/16_external-userTest.spec.js:37:13
```

# Test source

```ts
   1 | import { expect } from '@playwright/test';
   2 | export default class ExternalUser {
   3 |
   4 |     constructor(page){
   5 |         this.page = page;
   6 |
   7 |         this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
   8 |         this.externalUser = page.locator('//span[@class="filmtools-card-title"]//span[text()="External Users"]');
   9 |
  10 |         this.addUserPlusIcon = page.locator('[aria-label="plus"]');
  11 |         this.name = page.locator('#full_name');
  12 |         this.email = page.locator('#email');
  13 |         this.phone = page.locator('#phone');
  14 |         this.submit = page.locator('#external_user_submit_button');
  15 |
  16 |         /**
  17 |          * edit, delete locators
  18 |          */ 
  19 |         this.editButton = page.locator('#external_user_edit_user_button');
  20 |         this.deleteButton = page.locator('[aria-label="delete"]');
  21 |
  22 |     }
  23 |
  24 |     async clickExternalUserTab(){
  25 |         await this.tools.click();
  26 |         await this.externalUser.click();
  27 |     }
  28 |
  29 |     async addUser(){
  30 |         await this.addUserPlusIcon.click();
  31 |         await this.name.fill('Bhavik');
  32 |         await this.email.fill('Bhavik@gmail.com');
  33 |         await this.page.locator('//span[@class="ant-select-selection-item"]').nth(1).click();
  34 |         await this.page.waitForTimeout(500);
  35 |         await this.page.keyboard.press('Enter');
  36 |         await this.phone.fill('12345');
  37 |         await this.page.locator('//span[@class="ant-select-selection-item"]').nth(2).click();
  38 |         await this.page.waitForTimeout(500);
  39 |         await this.page.keyboard.press('Enter');
  40 |         await this.submit.click();
  41 |
  42 |         const successMsg = await this.page.locator('text=External user information has been added successfully.');
> 43 |         await successMsg.waitFor({ state: 'visible' });
     |                          ^ Error: locator.waitFor: Target page, context or browser has been closed
  44 |         await successMsg.waitFor({ state: 'hidden' });
  45 |     }
  46 |
  47 |     async delete(){
  48 |         await this.deleteButton.click();
  49 |         await this.page.locator('//div[@class="ant-popconfirm-buttons"]//button').nth(1).click();
  50 |
  51 |         const successMsg = await this.page.locator('text=External user information has been deleted.');
  52 |         await successMsg.waitFor({ state: 'visible' });
  53 |         await successMsg.waitFor({ state: 'hidden' });
  54 |     }
  55 |
  56 | }
```