# Test info

- Name: External User >> Add user >> verify add external user
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/16_external-userTest.spec.js:36:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('[aria-owns="department_id_list"]')
    - locator resolved to <input value="" type="search" role="combobox" id="department_id" autocomplete="off" aria-required="true" aria-expanded="false" aria-haspopup="listbox" aria-autocomplete="list" aria-owns="department_id_list" aria-controls="department_id_list" class="ant-select-selection-search-input"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span title="" class="ant-select-selection-item"></span> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span title="" class="ant-select-selection-item"></span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    26 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span title="" class="ant-select-selection-item"></span> intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying

    at ExternalUser.addUser (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/external-user.js:40:69)
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
> 40 |         await this.page.locator('[aria-owns="department_id_list"]').click();
     |                                                                     ^ Error: locator.click: Target page, context or browser has been closed
  41 |         await this.page.waitForTimeout(500);
  42 |         await this.page.keyboard.press('Enter');
  43 |         await this.page.locator('#designation_id').click();
  44 |         await this.page.waitForTimeout(500);
  45 |         await this.page.keyboard.press('Enter');
  46 |         await this.submit.click();
  47 |
  48 |         const successMsg = await this.page.locator('text=External user information has been added successfully.');
  49 |         await successMsg.waitFor({ state: 'visible' });
  50 |         await successMsg.waitFor({ state: 'hidden' });
  51 |     }
  52 |
  53 |     async delete(){
  54 |         await this.deleteButton.click();
  55 |         await this.page.locator('//div[@class="ant-popconfirm-buttons"]//button').nth(1).click();
  56 |
  57 |         const successMsg = await this.page.locator('text=External user information has been deleted.');
  58 |         await successMsg.waitFor({ state: 'visible' });
  59 |         await successMsg.waitFor({ state: 'hidden' });
  60 |     }
  61 |
  62 | }
```