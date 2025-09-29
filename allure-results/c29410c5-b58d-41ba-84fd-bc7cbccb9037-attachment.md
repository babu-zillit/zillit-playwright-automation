# Test info

- Name: Catering >> Send Audio >> verify the delete audio
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/10_cateringTest.spec.js:116:9

# Error details

```
Error: Timed out 20000ms waiting for expect(locator).toBeVisible()

Locator: locator('text=Message Deleted successfully')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 20000ms
  - waiting for locator('text=Message Deleted successfully')

    at UploadMedia.delete (/Users/babuyadav/Documents/zillit-playwright-automation/src/actions/media-uploader.js:229:29)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/10_cateringTest.spec.js:118:13
```

# Page snapshot

```yaml
- complementary:
  - img "Zillit Logo"
  - img
  - paragraph: Computer Not Connected !
  - paragraph: Make sure your computer has an active internet connection.
  - paragraph: Re-Load
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
  - img "user"
  - button "Zl automation50 down":
    - strong: Zl automation50
    - img "down"
- main:
  - img "svg"
```

# Test source

```ts
  129 |         await this.sendingIndicator.waitFor({state: 'hidden', timeout: 10000});
  130 |     }
  131 |
  132 |     async edit(){
  133 |         logger.info('[EditMessage] Started edit message...');
  134 |
  135 |         await this.handleDropdownAction('Edit Message');
  136 |         await this.typeMessage.fill('This is message');
  137 |         await this.replySendButton.click();
  138 |
  139 |         await this.page.locator('[aria-label="clock-circle"]').waitFor({ state: 'detached', timeout: 10000 });
  140 |         await this.edited.waitFor({state: 'visible', timeout: 15000})
  141 |         await expect(this.edited).toBeVisible();
  142 |     }
  143 |
  144 |     async forward(){
  145 |         logger.info('[ForwardMessage] Started forward message...');
  146 |
  147 |         await this.handleDropdownAction('Forward');
  148 |         await this.confidentialInfoTabButton.click();
  149 |
  150 |         const popup = this.page.locator('text=Forward Successfully');
  151 |         await expect(popup).toBeVisible({ timeout: 15000 });
  152 |         await expect(popup).toBeHidden({ timeout: 15000 });
  153 |     }
  154 |
  155 |     async readBy(){
  156 |         logger.info('[ReadByMessage] Started readBy message...');
  157 |
  158 |         await this.handleDropdownAction('Read By');
  159 |         await this.closeButton.click();
  160 |     }
  161 |
  162 |     async reply(){
  163 |         logger.info('[ReplyMessage] Started reply message...');
  164 |
  165 |         await this.handleDropdownAction('Reply');
  166 |         await this.typeMessage.fill('Reply message');
  167 |         await this.replySendButton.click();
  168 |     }
  169 |
  170 |     async dropDownListOnReply(optionText){
  171 |         try{
  172 |         const hoverIcon = await this.page.waitForSelector('.right-2.top-2.absolute [aria-label="down"]',{state: 'visible'});
  173 |         await hoverIcon.hover();
  174 |         await this.page.waitForTimeout(300);
  175 |         await hoverIcon.click();
  176 |
  177 |             const dropdown = this.page.locator('div.ant-dropdown:not(.ant-dropdown-hidden)');
  178 |             const liItems = dropdown.locator('li');
  179 |             await liItems.first().waitFor({ state: 'visible', timeout: 5000 });
  180 |
  181 |             const texts = await liItems.allTextContents();
  182 |             console.log('Dropdown list items:', texts);
  183 |
  184 |             await liItems.filter({ hasText: optionText }).first().click();
  185 |         }catch (error){
  186 |             console.error(`Failed to select dropdown option: ${optionText}`, error);
  187 |         }
  188 |     }
  189 |
  190 |     async editReply(){
  191 |         logger.info('[editReply] Started edit reply message...');
  192 |
  193 |         await this.dropDownListOnReply('Edit Message');
  194 |         await this.typeMessage.fill('This is message');
  195 |         await this.replySendButton.click();
  196 |
  197 |         await this.page.locator('[aria-label="clock-circle"]').waitFor({ state: 'detached', timeout: 10000 });
  198 |     }
  199 |
  200 |     async readByReply(){
  201 |         logger.info('[readByReply] Started read By reply message...');
  202 |
  203 |         await this.dropDownListOnReply('Read By')
  204 |         await this.page.waitForTimeout(1000);
  205 |         await this.closeButton.click();
  206 |     }
  207 |
  208 |     async deleteReply(){
  209 |         logger.info('[deleteReply] Started delete reply message...');
  210 |
  211 |         await this.dropDownListOnReply('Delete');
  212 |         await this.page.getByRole('button', { name: 'Ok' }).click();
  213 |
  214 |         const popup = this.page.locator("text=Comment deleted successfully!");
  215 |         await expect(popup).toBeVisible({timeout: 20000});
  216 |         await expect(popup).toBeHidden({timeout: 20000});
  217 |     }
  218 |
  219 |     async delete(){
  220 |         logger.info('[Delete] deletion started...');
  221 |
  222 |         await this.handleDropdownAction('Delete');
  223 |
  224 |         await this.deleteIcon.click();
  225 |         await this.deleteOk.click();
  226 |
  227 |         const popup = this.page.locator("text=Message Deleted successfully");
  228 |         console.log('Waiting for popup to appear...');
> 229 |         await expect(popup).toBeVisible({timeout: 20000});
      |                             ^ Error: Timed out 20000ms waiting for expect(locator).toBeVisible()
  230 |         console.log('Waiting for popup to disappear...');
  231 |         await expect(popup).toBeHidden({timeout: 20000});
  232 |     } 
  233 |     
  234 |     async clickAttachment(){
  235 |         await this.attachmentButton.click();
  236 |     }
  237 |
  238 |     async uploadImage(){
  239 |         logger.info('[Media] Upload image started...');
  240 |
  241 |         await this.imageUploadButton.setInputFiles(mediapaths.image);
  242 |     }
  243 |
  244 |     async clickSendMedia(){
  245 |         await this.sendMedia.click();
  246 |         
  247 |         // Wait for "sending" (case-insensitive) to appear
  248 |         await this.page.waitForSelector('text=/sending/i', { state: 'visible' });
  249 |
  250 |         // Wait for "sending" (case-insensitive) to disappear
  251 |         await this.page.waitForSelector('text=/sending/i', { state: 'hidden' });
  252 |
  253 |         // Wait for "File Size" (case-insensitive) to appear
  254 |         await this.page.waitForSelector('text=/file size/i', { state: 'visible' });
  255 |     }
  256 |
  257 |     async uploadVideo(){
  258 |         logger.info('[Media] Upload video started...');
  259 |
  260 |         await this.videoUploadButton.setInputFiles(mediapaths.video);
  261 |     }
  262 |
  263 |     async uploadAudio(){
  264 |         logger.info('[Media] Upload audio started...');
  265 |
  266 |         await this.audioUploadButton.setInputFiles(mediapaths.audio);
  267 |         await this.sendMedia.click();
  268 |         await this.page.locator('[class="w-4 h-4 text-white dark:text-white "]').waitFor({ state: 'visible' });
  269 |     }
  270 |
  271 |     async uploadDocument(){
  272 |         logger.info('[Media] Upload document started...');
  273 |
  274 |         await this.documentUploadButton.setInputFiles(mediapaths.document);
  275 |         await this.sendMedia.click();
  276 |     }
  277 |
  278 |     async uploadLocation(){
  279 |         logger.info('[Location] Upload location started...');
  280 |
  281 |         await this.locationUploadButton.waitFor({ state: 'visible' }),
  282 |         await this.locationUploadButton.click();
  283 |         await this.selectButton.waitFor({ state: 'visible' })
  284 |         await this.page.waitForTimeout(2000);
  285 |         await this.selectButton.click();
  286 |
  287 |         try{
  288 |         await this.page.waitForSelector('[aria-label="clock-circle"]', { state: 'hidden' });
  289 |         
  290 |         const image = this.page.locator('//img[@class="rounded-lg  object-cover h-[20rem] w-[100%]"]');
  291 |         await image.waitFor({ state: 'visible'});
  292 |
  293 |         const [newTab] = await Promise.all([
  294 |         this.page.context().waitForEvent('page'),
  295 |         image.click()
  296 |         ]);
  297 |
  298 |         await newTab.waitForLoadState();
  299 |         await newTab.close();
  300 |
  301 |         await this.page.bringToFront();
  302 |         }catch(error){
  303 |             console.log(`location is not clickable: ${error}`);
  304 |         }
  305 |     }
  306 |
  307 |     async imageReply(){
  308 |         logger.info('[ImageReply] Started image reply message...');
  309 |
  310 |         await this.handleDropdownAction('Image Reply');
  311 |         await this.page.locator('[placeholder="Type a message"]').fill('This is image reply');
  312 |         await this.clickSendMedia();
  313 |     }
  314 |
  315 |
  316 |     
  317 |     async deleteAll(){
  318 |         await this.page.waitForTimeout(1000);
  319 |
  320 |         const items = this.page.locator('.dropDown');
  321 |         const totalCount = await items.count();
  322 |
  323 |         console.log(`total message: ${totalCount}`);
  324 |
  325 |         if (totalCount === 0) {
  326 |             console.log('No elements found to hover on.');
  327 |             return;
  328 |         }
  329 |
```