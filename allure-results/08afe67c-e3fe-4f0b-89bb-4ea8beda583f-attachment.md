# Test info

- Name: Contrcat Signature >> Standard Forms & Contracts and Your Documents >> verify verify the standrad form & contracts documents
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/contract-signatureTest.spec.js:66:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('#standard_form_add_to_your_documents_button')

    at ContractSignature.standardFormAndContractsAndYourDocument (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/contract-signature.js:216:38)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/contract-signatureTest.spec.js:67:12
```

# Test source

```ts
  116 |         } else {
  117 |             console.log("No document uploaded");
  118 |         }
  119 |
  120 |         await this.sendForSignature.click();
  121 |         await this.select.click();
  122 |         await this.next.click();
  123 |         await this.noItNew.click();
  124 |
  125 |         const successMsg1 = await this.page.locator('text=Document has been sent for signature.');
  126 |         await successMsg1.waitFor({ state: 'visible' });
  127 |         await successMsg1.waitFor({ state: 'hidden' });
  128 |
  129 |         await this.uploadToStandardFormButton.click();
  130 |
  131 |         const successMsg = await this.page.locator('text=Standard documents has been added successfully.');
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
  210 |         const documentLocator = this.page.locator('//p[text()="Test Form" or text()="Test Contract"]');
  211 |         if (await documentLocator.count() > 0) {
  212 |             await documentLocator.first().click();
  213 |         } else {
  214 |             console.log("No document uploaded");
  215 |         }
> 216 |         await this.addToYourDocument.click();
      |                                      ^ Error: locator.click: Target page, context or browser has been closed
  217 |         await this.ok.click();    
  218 |     }
  219 |
  220 |     async yourDocuments(){
  221 |         await this.page.locator('#your_documents_button');
  222 |         const documentLocator = this.page.locator('//p[text()="Test Form" or text()="Test Contract"]');
  223 |         if (await documentLocator.count() > 0) {
  224 |             await documentLocator.first().click();
  225 |         } else {
  226 |             console.log("No document uploaded");
  227 |         }
  228 |
  229 |         await this.page.locator('#common_add_signature_modal_open_button').click();
  230 |         await this.page.locator('//img[@alt="signature"]').click();
  231 |         await this.page.locator('#common_sign_document_button').click();
  232 |         await this.page.locator('#common_send_document_button').click();
  233 |
  234 |         const successMsg = await this.page.locator('text=Document has been signed successfully.');
  235 |         await successMsg.waitFor({ state: 'visible' });
  236 |         await successMsg.waitFor({ state: 'hidden' });
  237 |     }
  238 |
  239 |     async deleteAllDocument(){
  240 |         await this.page.locator('#all_documents_button').click();
  241 |
  242 |         const deleteButton = await this.deleteStandardFormDocuments.count();
  243 |         if (deleteButton > 0) {
  244 |             await this.deleteStandardFormDocuments.first().click();
  245 |             await this.deleteConfirmationButtonStandardForm.click();
  246 |
  247 |             const successMsg = await this.page.locator('text=Document deleted successfully.');
  248 |             await successMsg.waitFor({ state: 'visible' });
  249 |             await successMsg.waitFor({ state: 'hidden' });
  250 |         } else {
  251 |             console.log("No document to delete");
  252 |         }
  253 |     }
  254 |
  255 |     async uploadDocumentAndSeeList(){
  256 |         await this.uploadDocumentsAndSeeList.click();
  257 |         await this.page.locator('#common_upload_document_drawer_open_button').click();
  258 |         await this.page.locator('[placeholder="Contract Name"]').fill('Test Contract')
  259 |         await this.browseYourContracts.setInputFiles(mediapaths.document);
  260 |         await this.page.locator('#upload_document_select_users_screen_open_button').click();
  261 |         await this.page.locator('#send_for_signature_select_deselect_users_button').click();
  262 |         await this.page.locator('#revise_document_confirmation_screen_open_button').click();
  263 |         await this.page.locator('#new_document_upload_button').click();
  264 |
  265 |         const successMsg = await this.page.locator('text=Document has been sent for signature.');
  266 |             await successMsg.waitFor({ state: 'visible' });
  267 |             await successMsg.waitFor({ state: 'hidden' });
  268 |     }
  269 |
  270 |     async navigiateBack() {
  271 |          await this.page.goBack();
  272 |     }
  273 |
  274 |
  275 |
  276 | }
```