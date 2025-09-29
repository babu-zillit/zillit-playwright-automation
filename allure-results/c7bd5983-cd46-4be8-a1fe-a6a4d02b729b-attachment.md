# Test info

- Name: Casting >> Selects Tab >> verify location upload, open the folder, and view the image
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/locationTest.spec.js:36:9

# Error details

```
Error: expect(locator).toBeHidden()

Locator: locator('.ant-message-notice-wrapper div div div').first()
Expected: hidden
Received: visible
Call log:
  - expect.soft.toBeHidden with timeout 15000ms
  - waiting for locator('.ant-message-notice-wrapper div div div').first()
    5 × locator resolved to <div class="ant-message-custom-content ant-message-success">…</div>
      - unexpected value "visible"

    at Location.verifypopup (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/locations.js:87:34)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/locationTest.spec.js:39:14
```

# Test source

```ts
   1 | import { loadJson } from '../utils/jsonUtil';
   2 | import { expect } from '@playwright/test';
   3 | const mediapaths = loadJson('mediapaths', 'testdata');
   4 |
   5 | export default class Location {
   6 |
   7 |     constructor(page){
   8 |         this.page = page;
   9 |
   10 |         this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
   11 |         this.location = page.locator('div.ant-card-body').getByText('Location');
   12 |
   13 |         this.selectsShortlistFinals = page.locator('//div[@class="ant-segmented-group"]//label');
   14 |
   15 |         this.enterEpisode = page.locator('#episodeNo');
   16 |         this.enterLocation = page.locator('#fileName');
   17 |         this.enterScene = page.locator('#scene_no');
   18 |         this.enterDiscription = page.locator('#description');
   19 |         this.save = page.locator('#upload_location_modal_save_button');
   20 |
   21 |         this.plus = page.locator('#create_location_details_modal_open_button');
   22 |         this.attchment = page.locator('[class="ant-float-btn-body"]');
   23 |         this.uploadMediaButton = page.locator("//div[contains(text(), 'Upload Media')]/ancestor::span//input[@type='file']");
   24 |         this.upload = page.locator('div.ant-modal-body div.text-end button');
   25 |
   26 |         /**
   27 |          * folder locator
   28 |          */ 
   29 |         this.folder = page.locator('[alt="folder"]');
   30 |         this.folderSecond = page.locator('div.ant-modal-content div.ant-card-body img');
   31 |         this.viewImage = page.locator('//div[@class="relative cursor-pointer"]//img');
   32 |
   33 |         this.close = page.locator('[id="close_document_viewer_button"]');
   34 |         this.closeWindowFromMediaScreen = page.locator('div.ant-modal.css-2iw4eq.bg-white div.ant-modal-content button[aria-label="Close"]');
   35 |         this.closeWindowFromSecondScreen = page.locator('div.ant-modal.css-2iw4eq div.ant-modal-content button[aria-label="Close"]');
   36 |
   37 |         this.arrow = page.locator('div.ant-dropdown-trigger span.anticon-down');
   38 |         this.locationNameRadioButton = page.locator('//input[@name="radiogroup" and @value="1"]');
   39 |         this.sceneNumberRadioButton = page.locator('//input[@name="radiogroup" and @value="2"]');
   40 |         this.episodeRadioButton = page.locator('//input[@name="radiogroup" and @value="3"]');
   41 |
   42 |
   43 |         this.generatepdf = page.locator('#lcw_generate_pdf_button');
   44 |
   45 |         this.deleteOkButton = page.locator('div.ant-modal-content div.ant-modal-confirm-btns button');
   46 |
   47 |         /**
   48 |          * locator from media screen
   49 |          */
   50 |         this.select = page.locator('#lcw_select_unselect_media_button');
   51 |         this.selectImageCheckbox = page.locator('div.ant-modal-body  label input[type="checkbox"]');
   52 |         this.moveTo = page.locator('#lcw_move_media_button');
   53 |         this.moveToOptionButton = page.locator('li.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child span');
   54 |         this.arrowOnMediaScreen = page.locator('div.ant-modal-content div.ant-modal-body span[role="img"][aria-label="down"]');
   55 |
   56 |         this.selectAll = page.locator('#lcw_forward_select_deselect_button');
   57 |         this.forward = page.locator('#lcw_forward_button');
   58 |
   59 |         this.imageReply = page.locator('#location_image_reply_media_button');
   60 |         this.typeMessage = page.locator('[placeholder="Type a message"]');
   61 |         this.loadingIcon = page.locator('[data-icon="loading"]');
   62 |         this.closeImageReplyWindow = page.locator('div.ant-drawer-content-wrapper button span[aria-label="close-square"]');
   63 |         
   64 |     }
   65 |
   66 |     async locationTab(){
   67 |         await this.tools.click();
   68 |         await this.location.click();
   69 |     }
   70 |
   71 |     async selectsTab(){
   72 |         await this.selectsShortlistFinals.first().click();
   73 |     }
   74 |
   75 |     async shortlistTab(){
   76 |         await this.selectsShortlistFinals.nth(1).click();
   77 |     }
   78 |
   79 |     async finalsTab(){
   80 |         await this.selectsShortlistFinals.nth(2).click();
   81 |     }
   82 |
   83 |     async verifypopup(message){
   84 |         const popup = this.page.locator('.ant-message-notice-wrapper div div div').first();
   85 |         await expect.soft(popup).toBeVisible({ timeout: 15000 });
   86 |         await expect.soft(popup).toHaveText(message, { timeout: 15000 });
>  87 |         await expect.soft(popup).toBeHidden({ timeout: 15000 });
      |                                  ^ Error: expect(locator).toBeHidden()
   88 |         console.log('Popup message verified:');
   89 |     }
   90 |
   91 |     async uploadMedia(){
   92 |         await this.plus.click();
   93 |         await this.attchment.click();
   94 |         await this.uploadMediaButton.setInputFiles(mediapaths.image);
   95 |         await this.upload.nth(1).click();
   96 |     }
   97 |
   98 |     async uploadLocation(location, scene, episode, discription){
   99 |         await this.uploadMedia();
  100 |         await this.enterLocation.fill(`${location}`);
  101 |         await this.enterScene.fill(`${scene}`);
  102 |         await this.enterEpisode.fill(`${episode}`);
  103 |         await this.enterDiscription.fill(`${discription}`);
  104 |         await this.save.click();
  105 |     }
  106 |
  107 |
  108 |     async openFolderFirstScreen(){
  109 |         const folderCount = await this.folder.count();
  110 |         await (folderCount === 1 ? this.folder.click() : this.folder.first().click());
  111 |     }
  112 |
  113 |     async openFolderSecondScreen(){
  114 |         const folderCount = await this.folderSecond.count();
  115 |         await (folderCount === 1 ? this.folderSecond.click() : this.folderSecond.first().click()); 
  116 |     }
  117 |
  118 |     async checkLocationNameRadioButton(){
  119 |         if(!(await this.locationNameRadioButton.isChecked())){
  120 |             await this.locationNameRadioButton.click();
  121 |         }
  122 |     }
  123 |
  124 |     async checkEpisodeRadioButton(){
  125 |         if(!(await this.episodeRadioButton.isChecked())){
  126 |             await this.episodeRadioButton.click();
  127 |         }
  128 |     }
  129 |
  130 |     async viewImages(){
  131 |         const imageCount = await this.viewImage.count();
  132 |         await (imageCount === 1 ? this.viewImage.click() : this.viewImage.first().click());
  133 |         const target = await this.close;
  134 |         await target.hover();
  135 |         await target.click();
  136 |         await this.closeWindowFromMediaScreen.click();
  137 |         await this.closeWindowFromSecondScreen.click();
  138 |     }
  139 |
  140 |     async arrowClick(){
  141 |        const arrowCount = await this.arrow.count();
  142 |        await (arrowCount === 1 ? this.arrow.click() : this.arrow.first().click());
  143 |     }
  144 |
  145 |     async dropDownArrowAction(selectTab, actionText){
  146 |         await this[selectTab]();
  147 |         await this.checkLocationNameRadioButton();
  148 |         await this.arrowClick();
  149 |         await this.page.locator('.ant-dropdown-menu-item', { hasText: actionText }).first().click();
  150 |
  151 |         if(actionText === 'Delete'){
  152 |             await this.deleteOkButton.last().click();
  153 |             const loadingIcon = this.page.locator('.anticon-loading');
  154 |             await loadingIcon.waitFor({ state: 'visible', timeout: 10000 });
  155 |             await loadingIcon.waitFor({ state: 'hidden', timeout: 10000 });
  156 |         } else {
  157 |             await this.save.click();
  158 |         }
  159 |     }
  160 |
  161 |     async moveToFromMediaScreen(actionText){
  162 |         await this.checkLocationNameRadioButton();
  163 |         await this.openFolderFirstScreen();
  164 |         await this.select.click();
  165 |         const countImage = await this.selectImageCheckbox.count();
  166 |         await (countImage === 1 ? this.selectImageCheckbox.first().check() : this.selectImageCheckbox.first().check());
  167 |         await this.page.waitForTimeout(500);
  168 |         await this.moveTo.hover();
  169 |         await this.page.locator('li.ant-dropdown-menu-item', { hasText: new RegExp(`^${actionText}$`)}).first().click();
  170 |         await this.save.click();
  171 |     }
  172 |
  173 |     async closeImageWindow(){
  174 |         await this.closeWindowFromMediaScreen.click();
  175 |     }
  176 |
  177 |     async clickArrowOnMediaScreen(actionText){
  178 |         await this.arrowOnMediaScreen.click();
  179 |         await this.page.locator('.ant-dropdown-menu-item', { hasText: actionText }).first().click();
  180 |     }
  181 |
  182 |     async editLocationDeatils(episode, character, talent, discription){
  183 |         await this.checkCharacterRadioButton();
  184 |         await this.openFolderFirstScreen();
  185 |         await this.clickArrowOnMediaScreen('Edit');
  186 |         await this.enterEpisode.fill(`${episode}`);
  187 |         await this.enterCharacter.fill(`${character}`);
```