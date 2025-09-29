# Test info

- Name: Continuity >> My Department >> verify upload the continuity scene
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/08_continuityTest.spec.js:36:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('//div[contains(@class,"text-end")]//button//span[text()="Send"]')

    at Continuity.uploadMedia (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/continuity.js:65:25)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/08_continuityTest.spec.js:37:13
```

# Test source

```ts
   1 | import { expect } from '@playwright/test';
   2 | import { loadJson } from '../utils/jsonUtil';
   3 | const mediapaths = loadJson('mediapaths', 'testdata');
   4 |
   5 | export default class Continuity {
   6 |
   7 |     constructor(page){
   8 |         this.page = page;
   9 |
   10 |
   11 |         this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
   12 |         this.continuity = page.locator('//span[@class="filmtools-card-title"]//span[text()="Continuity"]');
   13 |
   14 |         /**
   15 |          * upload media locators
   16 |          */ 
   17 |         this.attachment = page.locator('button.css-2iw4eq.ant-float-btn.ant-float-btn-primary.ant-float-btn-circle');
   18 |         this.uploadMediaButton = page.locator("//div[text()='Upload Media']/ancestor::span[contains(@class, 'ant-upload')]//input[@type='file']");
   19 |         this.send = page.locator('//div[contains(@class,"text-end")]//button//span[text()="Send"]');
   20 |
   21 |         /**
   22 |          * continuity locators
   23 |          */ 
   24 |         this.enterSceneNumber = page.locator('[placeholder="Enter Scene Number"]');
   25 |         this.enterEpisodeNumber = page.locator('[placeholder="Enter Episode Number"]');
   26 |         this.description = page.locator('[placeholder="Description"]');
   27 |         this.submit = page.locator('#continuity_submit_ecene_button');
   28 |         this.sceneFolder = page.locator('//div[contains(@class,"ant-card-grid")]');
   29 |
   30 |         this.more = page.locator('//span[@aria-label="more"]');
   31 |
   32 |         this.editDetails = page.locator('.edit_details_icon');
   33 |         this.update = page.locator('#continuity_update_scene_button');
   34 |
   35 |         this.forwardButton = page.locator('.forward_icon');
   36 |         this.continuityForward = page.locator('#continuity_forward_scene_button');
   37 |         this.allDepartment = page.locator('#continuity_forward_drawer_all_department_button');
   38 |
   39 |
   40 |         this.deleteButton = page.locator('.delete_icon');
   41 |         this.okButton = page.locator('//div[@class="ant-popconfirm-buttons"]//button');
   42 |         this.close = page.locator('[aria-label="Close"]');
   43 |
   44 |         /**
   45 |          * All Department
   46 |          */
   47 |         this.myDepartmentTab = page.locator('[data-node-key="1"]');
   48 |         this.allDepartmentTab = page.locator('[data-node-key="3"]');
   49 |         this.production = page.locator('//div[contains(@class,"select_departments_list")]//div[text()="Production"]');
   50 |
   51 |
   52 |
   53 |     }
   54 |
   55 |
   56 |     async clickContinuityTab(){
   57 |         await this.tools.click();
   58 |         await this.continuity.click();
   59 |     }
   60 |
   61 |
   62 |     async uploadMedia(){
   63 |         await this.attachment.click();
   64 |         await this.uploadMediaButton.setInputFiles(mediapaths.image);
>  65 |         await this.send.click(); 
      |                         ^ Error: locator.click: Target page, context or browser has been closed
   66 |         
   67 |         await this.enterSceneNumber.fill('99');
   68 |         await this.enterEpisodeNumber.fill('88');
   69 |         await this.description.fill('Romantic scene');
   70 |         await this.submit.click();
   71 |     }
   72 |
   73 |     async openSceneFolder(){
   74 |         await this.sceneFolder.first().waitFor({ state: 'visible' });
   75 |         const count = await this.sceneFolder.count();
   76 |         if(count == 1){
   77 |             await this.sceneFolder.click();
   78 |         } else if(count > 1){
   79 |             await this.sceneFolder.first().click();
   80 |         } else {
   81 |             console.log('Not scene folder available');
   82 |         }
   83 |     }
   84 |
   85 |     async threeDots(){
   86 |         await this.more.first().waitFor({ state: 'visible' });
   87 |         const count = await this.more.count();
   88 |         if(count == 1){
   89 |             await this.more.click();
   90 |         } else if(count > 1){
   91 |             await this.more.first().click();
   92 |         } else {
   93 |             console.log('Not image is avialable');
   94 |         }
   95 |     }
   96 |
   97 |     async edit(){
   98 |         await this.threeDots();
   99 |         await this.editDetails.click();
  100 |         await this.description.fill('Romantic scene for villain');
  101 |         await this.update.click();
  102 |
  103 |         const successMsg = await this.page.locator('text=Scene has been updated successfully.');
  104 |         await successMsg.waitFor({ state: 'visible' });
  105 |         await successMsg.waitFor({ state: 'hidden' });
  106 |     }
  107 |
  108 |     async forward(){
  109 |         await this.threeDots();
  110 |         await this.forwardButton.first().click();
  111 |         await this.okButton.nth(1).click();
  112 |
  113 |         const checkboxButton = await this.page.locator('//input[@class="ant-checkbox-input"]');
  114 |         const count = await checkboxButton.count();
  115 |         if(count == 1){
  116 |             await checkboxButton.check();
  117 |             await expect(checkboxButton).toBeChecked();
  118 |         } else if(count > 1){
  119 |             await checkboxButton.first().check();
  120 |             await expect(checkboxButton.first()).toBeChecked();
  121 |         } else{
  122 |             console.log('Not checkboxbutton available');
  123 |         }
  124 |
  125 |         await this.continuityForward.click();
  126 |         await this.allDepartment.click();
  127 |     
  128 |         const successMsg = await this.page.locator('text=Scene(s) have been forwarded successfully.');
  129 |         await successMsg.waitFor({ state: 'visible' });
  130 |         await successMsg.waitFor({ state: 'hidden' });
  131 |     }
  132 |
  133 |     async delete(){
  134 |         await this.threeDots();
  135 |         await this.deleteButton.click();
  136 |         await this.okButton.nth(1).click();
  137 |     
  138 |         const successMsg = await this.page.locator('text=Media deleted successfully');
  139 |         await successMsg.waitFor({ state: 'visible' });
  140 |         await successMsg.waitFor({ state: 'hidden' });
  141 |         //await this.close.click();
  142 |     }
  143 |
  144 |     async myDepartment(){
  145 |         await this.myDepartmentTab.click();
  146 |     }
  147 |
  148 |     async allDepartmentScene(){
  149 |         await this.allDepartmentTab.click();
  150 |         await this.openSceneFolder();
  151 |         await this.production.click();
  152 |     }
  153 |
  154 |     async closeWindow(){
  155 |         await this.close.click();
  156 |     }
  157 |
  158 | }
```