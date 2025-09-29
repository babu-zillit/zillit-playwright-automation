# Test info

- Name: Casting >> Selects Tab >> verify move to finals media from the media screen
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/22_casting-backgroundTest.spec.js:77:9

# Error details

```
Error: expect(locator).toBeHidden()

Locator: locator('.ant-message-notice-wrapper div div div').first()
Expected: hidden
Received: visible
Call log:
  - expect.soft.toBeHidden with timeout 10000ms
  - waiting for locator('.ant-message-notice-wrapper div div div').first()
    5 × locator resolved to <div class="ant-message-custom-content ant-message-success">…</div>
      - unexpected value "visible"

    at Casting.verifypopup (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/casting.js:96:34)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/22_casting-backgroundTest.spec.js:80:13
```

# Test source

```ts
   1 | import { loadJson } from '../utils/jsonUtil';
   2 | import { expect } from '@playwright/test';
   3 | const mediapaths = loadJson('mediapaths', 'testdata');
   4 |
   5 | export default class Casting {
   6 |
   7 |     constructor(page){
   8 |         this.page = page;
   9 |
   10 |         this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
   11 |
   12 |         this.selectsShortlistFinals = page.locator('//div[@class="ant-segmented-group"]//label');
   13 |
   14 |         this.enterEpisode = page.locator('#episodeNo');
   15 |         this.enterCharacter = page.locator('#character');
   16 |         this.enterTalent = page.locator('#castName');
   17 |         this.selectGender = page.locator('#gender');
   18 |         this.enterDiscription = page.locator('#description');
   19 |         this.save = page.locator('#upload_casting_details_save_button');
   20 |
   21 |         this.plus = page.locator('#create_casting_details_modal_open_button');
   22 |         this.attchment = page.locator('[class="ant-float-btn-body"]');
   23 |         this.uploadMediaButton = page.locator("//div[contains(text(), 'Upload Media')]/ancestor::span//input[@type='file']");
   24 |         this.upload = page.locator('div.ant-modal-body div.text-end button');
   25 |
   26 |         this.folder = page.locator('[alt="folder"]');
   27 |         this.folderSecond = page.locator('div.ant-modal-content div.ant-card-body img');
   28 |         this.viewImage = page.locator('//div[@class="relative cursor-pointer"]//img');
   29 |
   30 |         this.close = page.locator('[id="close_document_viewer_button"]');
   31 |         //this.closeWindow = page.locator('//span[@class="ant-modal-close-x"]//span[@aria-label="close"]');
   32 |         this.closeWindowFromMediaScreen = page.locator('div.ant-modal.css-2iw4eq.bg-white div.ant-modal-content button[aria-label="Close"]');
   33 |         this.closeWindowFromSecondScreen = page.locator('div.ant-modal.css-2iw4eq div.ant-modal-content button[aria-label="Close"]');
   34 |
   35 |         this.arrow = page.locator('div.ant-dropdown-trigger span.anticon-down');
   36 |         this.characterRadioButton = page.locator('//input[@name="radiogroup" and @value="1"]');
   37 |         this.talentRadioButton = page.locator('//input[@name="radiogroup" and @value="2"]');
   38 |         this.episodeRadioButton = page.locator('//input[@name="radiogroup" and @value="3"]');
   39 |
   40 |         this.generatepdf = page.locator('#lcw_generate_pdf_button');
   41 |
   42 |         this.deleteOkButton = page.locator('div.ant-modal-content div.ant-modal-confirm-btns button');
   43 |
   44 |         /**
   45 |          * locator from media screen
   46 |          */
   47 |         this.select = page.locator('#lcw_select_unselect_media_button');
   48 |         this.selectImageCheckbox = page.locator('div.ant-modal-body  label input[type="checkbox"]');
   49 |         this.moveTo = page.locator('#lcw_move_media_button');
   50 |         this.moveToOptionButton = page.locator('li.ant-dropdown-menu-item.ant-dropdown-menu-item-only-child span');
   51 |         this.arrowOnMediaScreen = page.locator('div.ant-modal-content div.ant-modal-body span[role="img"][aria-label="down"]');
   52 |
   53 |         this.selectAll = page.locator('#lcw_forward_select_deselect_button');
   54 |         this.forward = page.locator('#lcw_forward_button');
   55 |
   56 |         this.imageReply = page.locator('#casting_image_reply_media_button');
   57 |         this.typeMessage = page.locator('[placeholder="Type a message"]');
   58 |         this.loadingIcon = page.locator('[data-icon="loading"]');
   59 |         this.closeImageReplyWindow = page.locator('div.ant-drawer-content-wrapper button span[aria-label="close-square"]');
   60 |         
   61 |     }
   62 |
   63 |     async castingMainTab(){
   64 |         await this.tools.click();
   65 |         await this.page.locator('div.ant-card-body').getByText('Casting (Main Cast)').click();
   66 |     }
   67 |
   68 |     async castingBackgroundTab(){
   69 |         await this.tools.click();
   70 |         await this.page.locator('div.ant-card-body').getByText('Casting (Background Cast)').click();
   71 |     }
   72 |
   73 |     async selectsTab(){
   74 |         await this.selectsShortlistFinals.first().click();
   75 |     }
   76 |
   77 |     async shortlistTab(){
   78 |         await this.selectsShortlistFinals.nth(1).click();
   79 |     }
   80 |
   81 |     async finalsTab(){
   82 |         await this.selectsShortlistFinals.nth(2).click();
   83 |     }
   84 |
   85 |     async uploadMedia(){
   86 |         await this.plus.click();
   87 |         await this.attchment.click();
   88 |         await this.uploadMediaButton.setInputFiles(mediapaths.image);
   89 |         await this.upload.nth(1).click();
   90 |     }
   91 |
   92 |     async verifypopup(message){
   93 |         const popup = this.page.locator('.ant-message-notice-wrapper div div div').first();
   94 |         await expect.soft(popup).toBeVisible({ timeout: 10000 });
   95 |         await expect.soft(popup).toHaveText(message, { timeout: 10000 });
>  96 |         await expect.soft(popup).toBeHidden({ timeout: 10000 });
      |                                  ^ Error: expect(locator).toBeHidden()
   97 |         console.log('Popup message verified:');
   98 |     }
   99 |
  100 |     async uploadCasting(episode, character, talent, gender, discription){
  101 |         await this.uploadMedia();
  102 |         await this.enterEpisode.fill(`${episode}`);
  103 |         await this.enterCharacter.fill(`${character}`);
  104 |         await this.enterTalent.fill(`${talent}`);
  105 |         await this.selectGenderType(`${gender}`);
  106 |         await this.enterDiscription.fill(`${discription}`);
  107 |         await this.save.click();
  108 |     }
  109 |
  110 |     async selectGenderType(genderType) {
  111 |         await this.selectGender.click();
  112 |         const gender = genderType.trim().toLowerCase();
  113 |
  114 |         if (gender === "male") {
  115 |             await this.page.keyboard.press('Enter');
  116 |         } else if (gender === "female") {
  117 |             await this.page.keyboard.press('ArrowDown');
  118 |             await this.page.keyboard.press('Enter');
  119 |         } else if (gender === "non binary" || gender === "nonbinary") {
  120 |             await this.page.keyboard.press('ArrowDown');
  121 |             await this.page.keyboard.press('ArrowDown');
  122 |             await this.page.keyboard.press('Enter');
  123 |         } else {
  124 |             throw new Error('Invalid gender type provided');
  125 |         }
  126 |     }
  127 |
  128 |     async openFolderFirstScreen(){
  129 |         const folderCount = await this.folder.count();
  130 |         await (folderCount === 1 ? this.folder.click() : this.folder.first().click());
  131 |     }
  132 |
  133 |     async openFolderSecondScreen(){
  134 |         const folderCount = await this.folderSecond.count();
  135 |         await (folderCount === 1 ? this.folderSecond.click() : this.folderSecond.first().click()); 
  136 |     }
  137 |
  138 |     async checkCharacterRadioButton(){
  139 |         if(!(await this.characterRadioButton.isChecked())){
  140 |             await this.characterRadioButton.click();
  141 |         }
  142 |     }
  143 |
  144 |     async checkEpisodeRadioButton(){
  145 |         if(!(await this.episodeRadioButton.isChecked())){
  146 |             await this.episodeRadioButton.click();
  147 |         }
  148 |     }
  149 |
  150 |     async viewImages(){
  151 |         const imageCount = await this.viewImage.count();
  152 |         await (imageCount === 1 ? this.viewImage.click() : this.viewImage.first().click());
  153 |         const target = await this.close;
  154 |         await target.hover();
  155 |         await target.click();
  156 |         await this.closeWindowFromMediaScreen.click();
  157 |         await this.closeWindowFromSecondScreen.click();
  158 |     }
  159 |
  160 |     async arrowClick(){
  161 |        const arrowCount = await this.arrow.count();
  162 |        await (arrowCount === 1 ? this.arrow.click() : this.arrow.first().click());
  163 |     }
  164 |
  165 |     async dropDownArrowAction(selectTab, actionText, confirmDelete = false){
  166 |         await this[selectTab]();
  167 |         await this.checkCharacterRadioButton();
  168 |         await this.arrowClick();
  169 |         await this.page.locator('.ant-dropdown-menu-item', { hasText: actionText }).first().click();
  170 |
  171 |         if(confirmDelete){
  172 |             await this.deleteOkButton.last().click();
  173 |         } else {
  174 |             await this.save.click();
  175 |         }
  176 |     }
  177 |
  178 |     async moveToFromMediaScreen(actionText){
  179 |         await this.checkCharacterRadioButton();
  180 |         await this.openFolderFirstScreen();
  181 |         await this.select.click();
  182 |         const countImage = await this.selectImageCheckbox.count();
  183 |         await (countImage === 1 ? this.selectImageCheckbox.first().check() : this.selectImageCheckbox.first().check());
  184 |         await this.page.waitForTimeout(500);
  185 |         await this.moveTo.hover();
  186 |         await this.page.locator('li.ant-dropdown-menu-item', { hasText: new RegExp(`^${actionText}$`)}).first().click();
  187 |         await this.save.click();
  188 |     }
  189 |
  190 |     async closeImageWindow(){
  191 |         await this.closeWindowFromMediaScreen.click();
  192 |     }
  193 |
  194 |     async clickArrowOnMediaScreen(actionText){
  195 |         await this.arrowOnMediaScreen.click();
  196 |         await this.page.locator('.ant-dropdown-menu-item', { hasText: actionText }).first().click();
```