# Test info

- Name: Contrcat Signature >> Standard Forms & Contracts and Your Documents >> verify verify the standrad form & contracts documents
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/contract-signatureTest.spec.js:66:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#common_add_signature_modal_open_button')

    at ContractSignature.yourDocuments (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/contract-signature.js:232:76)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/contract-signatureTest.spec.js:68:12
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
  - button "Zl automation51 down":
    - strong: Zl automation51
    - img "down"
  - superscript
- main:
  - link:
    - /url: /film-tools/form-signature
    - img
  - heading "Standard Forms & Contracts and Your Documents" [level=2]
  - textbox "Search"
  - button "search":
    - img "search"
  - button "All Documents"
  - button "Your Documents"
  - paragraph: DOCUMENTS
  - paragraph: UPLOADED ON
  - paragraph: UPLOADED BY
  - paragraph: ACTION
  - paragraph: Test Form
  - paragraph: Aug 22, 2025 at 01:15 PM
  - paragraph: Babu Web - Caterers
  - paragraph: Check History
```

# Test source

```ts
  132 |         await successMsg.waitFor({ state: 'visible' });
  133 |         await successMsg.waitFor({ state: 'hidden' });
  134 |     }
  135 |
  136 |
  137 |     async delete(){
  138 |         const deleteButton = await this.deleteDocument.count();
  139 |         if (deleteButton > 0) {
  140 |             await this.deleteDocument.first().click();
  141 |             await this.deleteConfirmation.click();
  142 |
  143 |             const successMsg = await this.page.locator('text=Document deleted successfully.');
  144 |             await successMsg.waitFor({ state: 'visible' });
  145 |             await successMsg.waitFor({ state: 'hidden' });
  146 |         } else {
  147 |             console.log("No document to delete");
  148 |         }
  149 |     }
  150 |
  151 |
  152 |
  153 |     async drawSignatureWithMouse(){
  154 |         await this.signatureBlock.click();
  155 |         await this.addSignatureButton.click();
  156 |         await this.signatureNameInput.fill('Babu');
  157 |
  158 |         const canvas = this.page.locator('//canvas[@class="h-full"]');
  159 |         await canvas.waitFor({ state: 'visible' });
  160 |
  161 |         const box = await canvas.boundingBox();
  162 |         if (!box) throw new Error('Canvas not in layout or is not visible');
  163 |
  164 |         const startX = box.x + box.width * 0.15;
  165 |         const startY = box.y + box.height * 0.55;
  166 |
  167 |         const relativePoints = [
  168 |         
  169 |             [0, 0], [0, -40], [30, -40], [30, -20], [0, -20],
  170 |             [0, -20], [30, -20], [30, 0], [0, 0],
  171 |
  172 |             [50, 0], [50, -40], [80, 0], [65, -20], [50, 0],
  173 |
  174 |             [100, 0], [100, -40], [130, -40], [130, -20], [100, -20],
  175 |             [100, -20], [130, -20], [130, 0], [100, 0],
  176 |
  177 |             [150, -40], [150, 0], [180, 0], [180, -40]
  178 |         ];
  179 |
  180 |         await this.page.mouse.move(startX, startY);
  181 |         await this.page.mouse.down();
  182 |
  183 |         for (const [dx, dy] of relativePoints) {
  184 |             const x = startX + dx;
  185 |             const y = startY + dy;
  186 |             // smoothness: small delay and move granularity
  187 |             await this.page.mouse.move(x, y, { steps: 8 });
  188 |         }
  189 |
  190 |         await this.page.mouse.up();
  191 |
  192 |         await this.save.click();
  193 |         await this.page.waitForTimeout(3000);
  194 |     }
  195 |
  196 |     async deleteSignature(){
  197 |         await this.signatureBlock.click();
  198 |         await this.deleteSignatureButton.click();
  199 |         await this.deleteConfirmationButton.nth(1).click();
  200 |     
  201 |         const successMsg = await this.page.locator('text=Document signature has been deleted successfully.');
  202 |         await successMsg.waitFor({ state: 'visible' });
  203 |         await successMsg.waitFor({ state: 'hidden' });
  204 |     }
  205 |
  206 |
  207 |     async standardFormAndContractsAndYourDocument(){
  208 |         await this.standardFormAndContractsYourDocuments.click();
  209 |
  210 |         //const documentLocator = this.page.locator('//div[@class="divide-y"]//div//p');
  211 |         // if (await documentLocator.count() > 0) {
  212 |         //     await documentLocator.first().waitFor({ state: 'visible', timeout: 10000 });
  213 |         //     await documentLocator.first().click();
  214 |         // } else {
  215 |         //     console.log("No document uploaded");
  216 |         // }
  217 |         await this.page.locator('//div[@class="divide-y"]//div//p').nth(0).click();
  218 |         await this.addToYourDocument.click();
  219 |         await this.ok.click();    
  220 |     }
  221 |
  222 |     async yourDocuments(){
  223 |         await this.page.locator('#your_documents_button');
  224 |         const documentLocator = this.page.locator('//p[text()="Test Form" or text()="Test Contract"]');
  225 |         if (await documentLocator.count() > 0) {
  226 |             await documentLocator.first().waitFor({ state: 'visible' });
  227 |             await documentLocator.first().click();
  228 |         } else {
  229 |             console.log("No document uploaded");
  230 |         }
  231 |
> 232 |         await this.page.locator('#common_add_signature_modal_open_button').click();
      |                                                                            ^ Error: locator.click: Target page, context or browser has been closed
  233 |         await this.page.locator('//img[@alt="signature"]').click();
  234 |         await this.page.locator('#common_sign_document_button').click();
  235 |         await this.page.locator('#common_send_document_button').click();
  236 |
  237 |         const successMsg = await this.page.locator('text=Document has been signed successfully.');
  238 |         await successMsg.waitFor({ state: 'visible' });
  239 |         await successMsg.waitFor({ state: 'hidden' });
  240 |     }
  241 |
  242 |     async deleteAllDocument(){
  243 |         await this.page.locator('#all_documents_button').click();
  244 |
  245 |         const deleteButton = await this.deleteStandardFormDocuments.count();
  246 |         if (deleteButton > 0) {
  247 |             await this.deleteStandardFormDocuments.first().click();
  248 |             await this.deleteConfirmationButtonStandardForm.click();
  249 |
  250 |             const successMsg = await this.page.locator('text=Document deleted successfully.');
  251 |             await successMsg.waitFor({ state: 'visible' });
  252 |             await successMsg.waitFor({ state: 'hidden' });
  253 |         } else {
  254 |             console.log("No document to delete");
  255 |         }
  256 |     }
  257 |
  258 |     async uploadDocumentAndSeeList(){
  259 |         await this.uploadDocumentsAndSeeList.click();
  260 |         await this.page.locator('#common_upload_document_drawer_open_button').click();
  261 |         await this.page.locator('[placeholder="Contract Name"]').fill('Test Contract')
  262 |         await this.browseYourContracts.setInputFiles(mediapaths.document);
  263 |         await this.page.locator('#upload_document_select_users_screen_open_button').click();
  264 |         await this.page.locator('#send_for_signature_select_deselect_users_button').click();
  265 |         await this.page.locator('#revise_document_confirmation_screen_open_button').click();
  266 |         await this.page.locator('#new_document_upload_button').click();
  267 |
  268 |         const successMsg = await this.page.locator('text=Document has been sent for signature.');
  269 |             await successMsg.waitFor({ state: 'visible' });
  270 |             await successMsg.waitFor({ state: 'hidden' });
  271 |     }
  272 |
  273 |     async navigiateBack() {
  274 |          await this.page.goBack();
  275 |     }
  276 |
  277 |
  278 |
  279 | }
```