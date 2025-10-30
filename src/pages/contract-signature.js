import { time } from 'console';
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class ContractSignature {

    constructor(page) {
        this.page = page;
        
        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');

        /**
         * locators for uploaded documents for future use
         */ 
        this.uploadDocument = page.locator('#common_upload_document_drawer_open_button');
        this.contractButton = page.locator('#contract_button');
        this.formButton = page.locator('#form_button');
        this.enterContractName = page.locator('[placeholder="Contract Name"]');
        this.enterFormName = page.locator('[placeholder="Form Name"]');
        this.browseYourContracts = page.locator('input[type="file"]');
        this.upload = page.locator('#common_upload_document_button');
        this.deleteDocument = page.locator('#common_delete_document_button');
        this.deleteConfirmation = page.locator('#delete_confirmation_button');
        this.uploadToStandardFormButton = page.locator('#upload_to_standard_form_button');
        this.sendForSignature = page.locator('#past_library_send_for_signature_modal_open_button');
        this.select = page.locator('#send_for_signature_select_deselect_users_button');
        this.next = page.locator('#revise_document_confirmation_screen_open_button');
        this.noItNew = page.locator('#new_document_upload_button');

        /**
         * locators for set signature block
         */
        this.signatureBlock = page.locator('text=Set/Edit Signature Block');
        this.addSignatureButton = page.locator('[id="add_signature_screen_open_button"]');
        this.signatureNameInput = page.locator('[placeholder="Signature Name"]');
        this.save = page.locator('#clear_signature_image_button');
        this.deleteSignatureButton = page.locator('[id="delete_signature_popconfirm_open_button"]');
        this.deleteConfirmationButton = page.locator('//div[@class="ant-popconfirm-buttons"]//button');

        /**
         * locators for Standard Forms & Contracts and Your Documents
         */
        this.standardFormAndContractsYourDocuments = page.locator('text=Standard Forms & Contracts and Your Documents');
        this.addToYourDocument = page.locator('#standard_form_add_to_your_documents_button');
        this.ok = page.locator('//div[@class="ant-modal-confirm-btns"]//button');
        this.deleteStandardFormDocuments = page.locator('#standard_form_delete_document_button');
        this.deleteConfirmationButtonStandardForm = page.locator('#delete_confirmation_button');

        // new locator's
        this.documents = page.locator('#all_documents_button');
        this.myDownloads = page.locator('#your_documents_button');
        this.documentsButtonTab = page.locator('div.flex.gap-2.items-center.justify-end button');

    }




    async contractSignatureTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Documents & Signature').click();
    }

    async uploadDocumentsForFutureUseTab(){
        await this.page.locator('text=Uploaded Documents for Future use').click();
    }

    async contract(){
        await this.contractButton.click();
    }

    async form(){
        await this.formButton.click();
    }

    async uploadDocumentsForFutureUse(tab){

        if( tab === 'contract' ) {
            await this.contract();
            await this.uploadDocument.click();
            await this.enterContractName.fill('Test Contract');
        }
        else if( tab === 'form' ) {
            await this.form();
            await this.uploadDocument.click();
            await this.enterFormName.fill('Test Form');
        }
        else {
            throw new Error('Invalid tab specified');
        }
        
        await this.browseYourContracts.setInputFiles(mediapaths.document);
        await this.upload.click();

        const successMsg = await this.page.locator('text=Document has been saved successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async uploadToStandardFormAndSendForSignature(){
        const documentLocator = this.page.locator('//p[text()="Test Form" or text()="Test Contract"]');
        if (await documentLocator.count() > 0) {
            await documentLocator.first().click();
        } else {
            console.log("No document uploaded");
        }

        await this.sendForSignature.click();
        await this.select.click();
        await this.next.click();
        await this.noItNew.click();

        const successMsg1 = await this.page.locator('text=Document has been sent for signature.');
        await successMsg1.waitFor({ state: 'visible' });
        await successMsg1.waitFor({ state: 'hidden' });

        await this.uploadToStandardFormButton.click();

        const successMsg = await this.page.locator('text=Standard documents has been added successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }


    async delete(){
        const deleteButton = await this.deleteDocument.count();
        if (deleteButton > 0) {
            await this.deleteDocument.first().click();
            await this.deleteConfirmation.click();

            const successMsg = await this.page.locator('text=Document deleted successfully.');
            await successMsg.waitFor({ state: 'visible' });
            await successMsg.waitFor({ state: 'hidden' });
        } else {
            console.log("No document to delete");
        }
    }



    async drawSignatureWithMouse(){
        await this.signatureBlock.click();
        await this.addSignatureButton.click();
        await this.signatureNameInput.fill('Babu');

        const canvas = this.page.locator('[class="signature-canvas w-full h-full"]');
        await canvas.waitFor({ state: 'visible' });

        const box = await canvas.boundingBox();
        if (!box) throw new Error('Canvas not in layout or is not visible');

        const startX = box.x + box.width * 0.15;
        const startY = box.y + box.height * 0.55;

        const relativePoints = [
        
            [0, 0], [0, -40], [30, -40], [30, -20], [0, -20],
            [0, -20], [30, -20], [30, 0], [0, 0],

            [50, 0], [50, -40], [80, 0], [65, -20], [50, 0],

            [100, 0], [100, -40], [130, -40], [130, -20], [100, -20],
            [100, -20], [130, -20], [130, 0], [100, 0],

            [150, -40], [150, 0], [180, 0], [180, -40]
        ];

        await this.page.mouse.move(startX, startY);
        await this.page.mouse.down();

        for (const [dx, dy] of relativePoints) {
            const x = startX + dx;
            const y = startY + dy;
            // smoothness: small delay and move granularity
            await this.page.mouse.move(x, y, { steps: 8 });
        }

        await this.page.mouse.up();

        await this.save.click();
        await this.page.waitForTimeout(3000);
    }

    async deleteSignature(){
        await this.signatureBlock.click();
        await this.deleteSignatureButton.first().click();
        await this.deleteConfirmationButton.nth(1).click();
    
        const successMsg = await this.page.locator('text=Document signature has been deleted successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async standardDocuments(){
        await this.page.locator('text=Standard Documents').click();
        await this.page.locator("//span[text()='Upload Document']").click();
        await this.page.locator('[placeholder="Document Name"]').fill('Contract Test');
        await this.page.locator('//input[@type="file"]').setInputFiles(mediapaths.document);
        await this.page.locator('#common_upload_document_button').click();
      
        const successMsg = await this.page.locator('text=Standard documents has been added successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async view(){
        await this.documentsButtonTab.first().click();
        await this.page.locator('div.flex.items-center.justify-end.mx-auto button').first().click();
        await this.page.waitForTimeout(3000);
        await this.page.locator('div.flex.items-center.gap-2 button').first().click();
    }

    async checkHistory(){
        await this.documentsButtonTab.nth(2).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator('[aria-label="Close"]').click();
    }

    async addToMyDownloads(){
        await this.documentsButtonTab.nth(1).click();
        await this.page.locator('div.ant-modal-confirm-btns button').click(); 
        await this.documentsButtonTab.first().click();
        await this.page.locator('div.flex.items-center.gap-2 button').first().click();
    }

    async myDownload(){
        await this.myDownloads.click();
        await this.documentsButtonTab.first().click();
        await this.page.locator('text=Add Signature').click();
        await this.page.locator('[alt="signature"]').click();
        await this.page.locator('text=Sign Document').click();
        await this.page.locator('text=Send Document').click();
        await this.page.locator('div.ant-popover-inner-content button').last().click();

        const successMsg = await this.page.locator('text=Document has been signed successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async delete(){
        await this.documents.click();
        await this.documentsButtonTab.last().click();
        await this.page.locator('div.ant-modal-content button').last().click();

        const successMsg = await this.page.locator('text=Document deleted successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });

        await this.page.locator('div.flex.items-center.gap-2 button').first().click();
    }












    async standardFormAndContractsAndYourDocument(){
        await this.standardFormAndContractsYourDocuments.click();
        await this.page.locator('//div[@class="divide-y"]//div//p').nth(0).click();
        await this.addToYourDocument.click();
        await this.ok.click(); 
    }

    async yourDocuments(){
        await this.page.waitForTimeout(3000);
        await this.page.locator('#your_documents_button').click();
        await this.page.locator('//div[@class="divide-y"]//div//p').nth(0).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('id=common_add_signature_modal_open_button').click();
        await this.page.locator('//img[@alt="signature"]').click();
        await this.page.locator('#common_sign_document_button').click();
        await this.page.locator('#common_send_document_button').click();

        const successMsg = await this.page.locator('text=Document has been signed successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async deleteAllDocument(){
        await this.page.locator('#all_documents_button').click();

        const deleteButton = await this.deleteStandardFormDocuments.count();
        if (deleteButton > 0) {
            await this.deleteStandardFormDocuments.first().click();
            await this.deleteConfirmationButtonStandardForm.click();

            const successMsg = await this.page.locator('text=Document deleted successfully.');
            await successMsg.waitFor({ state: 'visible' });
            await successMsg.waitFor({ state: 'hidden' });
        } else {
            console.log("No document to delete");
        }
    }

    async uploadDocumentAndSeeList(){
        await this.uploadDocumentsAndSeeList.click();
        await this.page.locator('#common_upload_document_drawer_open_button').click();
        await this.page.locator('[placeholder="Contract Name"]').fill('Test Contract')
        await this.browseYourContracts.nth(1).setInputFiles(mediapaths.document);
        await this.page.locator('#upload_document_select_users_screen_open_button').click();
        await this.page.locator('#send_for_signature_select_deselect_users_button').click();
        await this.page.locator('#revise_document_confirmation_screen_open_button').click();
        await this.page.locator('#new_document_upload_button').click();

        const successMsg = await this.page.locator('text=Document has been sent for signature.');
            await successMsg.waitFor({ state: 'visible' });
            await successMsg.waitFor({ state: 'hidden' });
    }

    async navigiateBack() {
         await this.page.goBack();
    }



}