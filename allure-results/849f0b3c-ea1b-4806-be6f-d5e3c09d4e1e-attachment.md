# Test info

- Name: Casting >> Selects Tab >> verify forward cast
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/21_castingTest.spec.js:81:9

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('[placeholder="Type a message"]')

    at Casting.imageReplys (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/casting.js:215:32)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/21_castingTest.spec.js:84:13
```

# Page snapshot

```yaml
- complementary:
  - img "Zillit Logo"
  - superscript: "1"
  - img
  - paragraph: Turn on Notification
  - paragraph: Get notified of a new message or call on computer.
  - button "Turn on desktop notification"
  - menu:
    - menuitem "FilmTools Logo Home":
      - img "FilmTools Logo"
      - text: Home
    - menuitem "Email":
      - img
      - text: Email
    - menuitem "FilmTools Logo Tools":
      - img "FilmTools Logo"
      - text: Tools
    - menuitem "FilmTools Logo C & C":
      - img "FilmTools Logo"
      - text: C & C
    - menuitem "FilmTools Logo Settings":
      - img "FilmTools Logo"
      - text: Settings
    - menuitem "FilmTools Logo SOS":
      - img "FilmTools Logo"
      - text: SOS
    - menuitem "question Zillit Help":
      - img "question"
      - text: Zillit Help
    - menuitem "poweroff Logout":
      - img "poweroff"
      - text: Logout
  - img "user"
  - button "Zl automation50 down":
    - strong: Zl automation50
    - img "down"
  - superscript
- main:
  - heading "Something went wrong." [level=2]
  - paragraph: Please try again later or contact support if the issue persists.
  - link "Click Here":
    - /url: /help?tab=contact-us
    - heading "Click Here" [level=5]
```

# Test source

```ts
  115 |         if (gender === "male") {
  116 |             await this.page.keyboard.press('Enter');
  117 |         } else if (gender === "female") {
  118 |             await this.page.keyboard.press('ArrowDown');
  119 |             await this.page.keyboard.press('Enter');
  120 |         } else if (gender === "non binary" || gender === "nonbinary") {
  121 |             await this.page.keyboard.press('ArrowDown');
  122 |             await this.page.keyboard.press('ArrowDown');
  123 |             await this.page.keyboard.press('Enter');
  124 |         } else {
  125 |             throw new Error('Invalid gender type provided');
  126 |         }
  127 |     }
  128 |
  129 |     async openFolderFirstScreen(){
  130 |         const folderCount = await this.folder.count();
  131 |         await (folderCount === 1 ? this.folder.click() : this.folder.first().click());
  132 |     }
  133 |
  134 |     async openFolderSecondScreen(){
  135 |         const folderCount = await this.folderSecond.count();
  136 |         await (folderCount === 1 ? this.folderSecond.click() : this.folderSecond.first().click()); 
  137 |     }
  138 |
  139 |     async checkCharacterRadioButton(){
  140 |         if(!(await this.characterRadioButton.isChecked())){
  141 |             await this.characterRadioButton.click();
  142 |         }
  143 |     }
  144 |
  145 |     async viewImages(){
  146 |         const imageCount = await this.viewImage.count();
  147 |         await (imageCount === 1 ? this.viewImage.click() : this.viewImage.first().click());
  148 |         const target = await this.close;
  149 |         await target.hover();
  150 |         await target.click();
  151 |         await this.closeWindowFromMediaScreen.click();
  152 |         await this.closeWindowFromSecondScreen.click();
  153 |     }
  154 |
  155 |     async arrowClick(){
  156 |        const arrowCount = await this.arrow.count();
  157 |        await (arrowCount === 1 ? this.arrow.click() : this.arrow.first().click());
  158 |     }
  159 |
  160 |     async dropDownArrowAction(selectTab, actionText, confirmDelete = false){
  161 |         await this[selectTab]();
  162 |         await this.checkCharacterRadioButton();
  163 |         await this.arrowClick();
  164 |         await this.page.locator('.ant-dropdown-menu-item', { hasText: actionText }).first().click();
  165 |
  166 |         if(confirmDelete){
  167 |             await this.deleteOkButton.last().click();
  168 |         } else {
  169 |             await this.save.click();
  170 |         }
  171 |     }
  172 |
  173 |     async moveToFromMediaScreen(actionText){
  174 |         await this.checkCharacterRadioButton();
  175 |         await this.openFolderFirstScreen();
  176 |         await this.select.click();
  177 |         const countImage = await this.selectImageCheckbox.count();
  178 |         await (countImage === 1 ? this.selectImageCheckbox.first().check() : this.selectImageCheckbox.first().check());
  179 |         await this.page.waitForTimeout(500);
  180 |         await this.moveTo.hover();
  181 |         await this.page.locator('li.ant-dropdown-menu-item', { hasText: new RegExp(`^${actionText}$`)}).first().click();
  182 |         await this.save.click();
  183 |     }
  184 |
  185 |     async closeImageWindow(){
  186 |         await this.closeWindowFromMediaScreen.click();
  187 |     }
  188 |
  189 |     async clickArrowOnMediaScreen(actionText){
  190 |         await this.arrowOnMediaScreen.click();
  191 |         await this.page.locator('.ant-dropdown-menu-item', { hasText: actionText }).first().click();
  192 |     }
  193 |
  194 |     async editCastDeatils(episode, character, talent, discription){
  195 |         await this.checkCharacterRadioButton();
  196 |         await this.openFolderFirstScreen();
  197 |         await this.clickArrowOnMediaScreen('Edit');
  198 |         await this.enterEpisode.fill(`${episode}`);
  199 |         await this.enterCharacter.fill(`${character}`);
  200 |         await this.enterTalent.fill(`${talent}`);
  201 |         await this.enterDiscription.fill(`${discription}`);
  202 |         await this.save.click();
  203 |     }
  204 |
  205 |     async forwardCast(){
  206 |         await this.checkCharacterRadioButton();
  207 |         await this.openFolderFirstScreen();
  208 |         await this.clickArrowOnMediaScreen('Forward');
  209 |         await this.selectAll.click();
  210 |         await this.forward.click();
  211 |     }
  212 |
  213 |     async imageReplys(){
  214 |         await this.imageReply.click();
> 215 |         await this.typeMessage.fill('Hello Babu');
      |                                ^ Error: locator.fill: Target page, context or browser has been closed
  216 |         await this.sendImageReplyButton.nth(1).click();
  217 |         await this.loadingIcon.waitFor({ state: 'visible' });
  218 |         await this.loadingIcon.waitFor({ state: 'hidden' });
  219 |         await this.page.waitForTimeout(500);
  220 |         await this.closeImageReplyWindow.click();
  221 |     }
  222 |
  223 |
  224 |
  225 |
  226 |
  227 |
  228 |
  229 |
  230 |
  231 |
  232 |
  233 |
  234 |
  235 |
  236 |
  237 |     async handleDropdownAction(tabFn, actionText, successMessage, confirmDelete = false){
  238 |
  239 |         await this[tabFn]();
  240 |
  241 |         if(!(await this.characterRadioButton.isChecked())){
  242 |             await this.characterRadioButton.click();
  243 |         }
  244 |
  245 |         const arrowCount = await this.arrow.count();
  246 |         if (arrowCount === 1) {
  247 |             await this.arrowClick();
  248 |         } else if (arrowCount > 1) {
  249 |             await this.arrow.first().click();
  250 |         } else {
  251 |             throw new Error('Arrow element not found');
  252 |         }
  253 |         
  254 |         await this.page.waitForSelector('.ant-dropdown-menu-item');
  255 |         const itemTexts = await this.page.$$eval('.ant-dropdown-menu-item .ant-dropdown-menu-title-content', elements =>
  256 |             elements.map(el => el.textContent.trim())
  257 |         );
  258 |         console.log('Dropdown Items:', itemTexts);
  259 |         await this.page.click(`text=${actionText}`);
  260 |
  261 |         if (confirmDelete) {
  262 |             await this.page.locator('//div[@class="ant-modal-confirm-btns"]//button').nth(1).click();
  263 |         } else {
  264 |             await this.save.click();
  265 |         }
  266 |
  267 |         const successMsg = await this.page.locator(`text=${successMessage}`);
  268 |         await successMsg.waitFor({ state: 'visible' });
  269 |         await successMsg.waitFor({ state: 'hidden' });
  270 |     }
  271 |
  272 |     async moveToShortlistFromSelects() {
  273 |        // await this.handleDropdownAction('selectsTab', 'Move to Shortlist', 'Cast has been moved successfully.');
  274 |        await this.dropDownArrowAction('selectsTab', 'Move to Shortlist');
  275 |     }
  276 |
  277 |     async moveToFinalFromSelects() {
  278 |         //await this.handleDropdownAction('selectsTab', 'Move to Final', 'Cast has been moved successfully.');
  279 |         await this.dropDownArrowAction('selectsTab', 'Move to Final');
  280 |     }
  281 |
  282 |     async deleteFromSelects() {
  283 |         await this.handleDropdownAction('selectsTab', 'Delete', 'Cast photograph has been deleted successfully.', true);
  284 |     }
  285 |
  286 |     async deleteFromShortlist() {
  287 |         //await this.handleDropdownAction('shortlistTab', 'Delete', 'Cast photograph has been deleted successfully.', true);
  288 |         await this.dropDownArrowAction('shortlistTab', 'Delete', true);
  289 |     }
  290 |
  291 |     async deleteFromFinals() {
  292 |         await this.handleDropdownAction('finalsTab', 'Delete', 'Cast photograph has been deleted successfully.', true);
  293 |     }
  294 |
  295 |     async generatePDF() {
  296 |         await this.generatepdf.click();
  297 |         await this.page.locator('//div[@class="ant-modal-footer"]//button').nth(1).click();
  298 |         const successMsg = await this.page.locator('text=PDF for cast has been successfully created.');
  299 |         await successMsg.waitFor({ state: 'visible' });
  300 |         await successMsg.waitFor({ state: 'hidden' });
  301 |
  302 |         await this.page.locator('//div[@class="ant-modal-body"]//button').first().click();
  303 |         const successMsg2 = await this.page.locator('text=Document Published Sucessfully');
  304 |         await successMsg2.waitFor({ state: 'visible' });
  305 |         await successMsg2.waitFor({ state: 'hidden' });
  306 |     }
  307 |
  308 | }
```