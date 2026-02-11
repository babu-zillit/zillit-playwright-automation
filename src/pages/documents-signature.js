import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
import UploadMedia from '../actions/media-uploader'
const mediapaths = loadJson('mediapaths', 'testdata');

export default class DocumentsSignature {
    constructor(page){
        this.page = page;
        this.uploadMedia = new UploadMedia(page);

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.addSignatureButton = page.locator('#add_signature_screen_open_button');
        this.signatureName = page.getByPlaceholder('Signature Name');
        this.saveSignature = page.locator('#clear_signature_image_button');
        this.editSignatureButton = page.locator('#edit_signature_screen_open_button');
        this.deleteSignatureButton = page.locator('#delete_signature_popconfirm_open_button');

        //Standard Documents
        this.documentName = page.getByPlaceholder('Document Name');
        this.documentUpload = page.locator('//input[@type="file"]');
        this.selectTypeOfDocument = page.locator('//input[@type="radio"]');
        this.upload = page.locator('#common_upload_document_button');

        this.viewAddToMyDownloadHistryDelete = page.locator('tbody.ant-table-tbody tr td div button');
        this.downloadInDeviceOrPrint = page.locator('div.flex.items-center.justify-end button');

        //My Downloads
        this.myDownalod = page.locator('#your_documents_button');


   
    }

    async openDocumentsSignatureTab(){
        await this.tools.click();
        await this.page.getByText('Documents & Signature', { exact: false }).click();
    }

    async #drawSignatureOnCanvas(){
        const canvas = this.page.locator('[class="signature-canvas w-full h-full"]');
        const box = await canvas.boundingBox();

        if (!box) throw new Error('Signature canvas not found');

        await this.page.mouse.move(box.x + 20, box.y + box.height / 2);
        await this.page.mouse.down();

        await this.page.mouse.move(box.x + 40, box.y + box.height / 2 - 10);
        await this.page.mouse.move(box.x + 60, box.y + box.height / 2 + 10);
        await this.page.mouse.move(box.x + 80, box.y + box.height / 2 - 10);
        await this.page.mouse.move(box.x + 100, box.y + box.height / 2 + 10);

        await this.page.mouse.up();
    }

    async #openSetSignatureBlockTab(){
        await this.page.getByText('Set/Edit Signature Block', { exact: false }).click();
    }

    async #addSignatureBlock(signature){
        await this.addSignatureButton.click();
        await this.signatureName.fill(`${signature}`);
        await this.#drawSignatureOnCanvas();
        await this.saveSignature.click();
    }

    /** add signature */
    async addSignature(signature){
        await this.#openSetSignatureBlockTab();
        await this.#addSignatureBlock(signature);
    }

    /** edit signature */
    async editSignature(signature){
        await this.editSignatureButton.first().click();
        await this.signatureName.fill(`${signature}`);
        await this.#drawSignatureOnCanvas();
        await this.saveSignature.click();
    }

    /** delete signature */
    async deleteSignature(deletepopupMsg){
        await this.deleteSignatureButton.first().click();

        const yesButton = this.page.locator('div.ant-popconfirm-buttons button');
        await yesButton.last().click();

        await this.uploadMedia.verifyPopupMessage(`${deletepopupMsg}`);
    }

    /** Standard Document Tab */
    async #openStandradDocumentTab(){
        await this.page.getByText('Standard Documents', { exact: false }).click();
    }

    async #uploadDocument(document, uploadSucccessMsg){
        await this.page.getByRole('button', { name: 'Upload Document' }).click();

        await this.documentName.fill(`${document}`);
        await this.documentUpload.setInputFiles(mediapaths.document);
        await this.upload.click();

        await this.uploadMedia.verifyPopupMessage(`${uploadSucccessMsg}`);
    }

    /** upload document in Standard Document Tab */
    async uploadDocumentInStandardDocumentTab(document, uploadSucccessMsg){
        await this.#openStandradDocumentTab();
        await this.#uploadDocument(document, uploadSucccessMsg);
    }

    async view(){
        await this.viewAddToMyDownloadHistryDelete.nth(0).click();
        await this.downloadInDeviceOrPrint.first().click();
        
        const backButton = this.page.locator('div.flex.items-center.justify-between.bg-white.text-black button');
        await backButton.click();
    }

    async addToMyDownload(){
        await this.viewAddToMyDownloadHistryDelete.nth(1).click();

        const okButton = this.page.locator('div.ant-modal-body button');
        await okButton.click();
    }

    async checkHistory(){
        await this.viewAddToMyDownloadHistryDelete.nth(2).click();

        const closeButton = this.page.locator('div.ant-modal-content button');
        await closeButton.click();
    }

    async delete(deletePopupSuccessMsg){
        await this.viewAddToMyDownloadHistryDelete.nth(3).click();

        const deleteButton = this.page.locator('div.ant-modal-content button');
        await deleteButton.last().click();

        await this.uploadMedia.verifyPopupMessage(`${deletePopupSuccessMsg}`);
    }

    async myDownalodsView(signPopupSuccessMsg){
        await this.myDownalod.click();
        await this.viewAddToMyDownloadHistryDelete.nth(0).click();
        await this.page.getByText('Add Signature', {exact : true}).click();
        await this.page.locator('[alt="signature"]').click();
        await this.page.getByText('Sign Document', {exact : true}).click();
        await this.page.waitForTimeout(5000);

        await this.page.getByText('Send Document', {exact: true}).click();

        const yesButton = this.page.locator('div.ant-popconfirm-buttons button');
        await yesButton.last().click();

        await this.uploadMedia.verifyPopupMessage(`${signPopupSuccessMsg}`)
    }

    async downloadCheckHistory(){
        await this.viewAddToMyDownloadHistryDelete.nth(1).click();

        await expect(this.page.getByText('Uploaded by').last()).toBeVisible();
        await expect(this.page.getByText('Signed by')).toBeVisible();

        const closeButton = this.page.locator('div.ant-modal-content button');
        await closeButton.click();
    }





}