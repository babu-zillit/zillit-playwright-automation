import { test } from '@playwright/test';
import DocumentsSignature from "../pages/documents-signature";
import UploadMedia from "../actions/media-uploader";

test.describe('Documents & Signature', () => {
    let context;
    let page;
    let uploadmedia;
    let documentSignaturePage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        documentSignaturePage = new DocumentsSignature(page);

        await uploadmedia.clickProjectName();
        await documentSignaturePage.openDocumentsSignatureTab();
    });

    test.afterAll(async () => {
        await context.close();
    });



    test.describe('Documents & Signature: Signature Management', () => {

        test('verify user can add new signature', async () => {

            const signatureName = 'Babu';
            await documentSignaturePage.addSignature(signatureName);
        });

        test('verify user can edit signature', async () => {

            const signatureName = 'Babu1';
            await documentSignaturePage.editSignature(signatureName);
        });

        test('verify user can delete signature', async () => {
            await documentSignaturePage.deleteSignature('Document signature has been deleted successfully.');
        });

        test('verify user add signature again', async () => {

            const signatureName = 'Babu';
            await documentSignaturePage.addSignature(signatureName);
        });
    });

    test.describe('Standrad Documents', () => {

        test('verify user can upload documents', async () => {

            const documentName = 'Tester';
            const popupSuccessMsg = 'Standard documents has been added successfully.';
            await documentSignaturePage.uploadDocumentInStandardDocumentTab(documentName, popupSuccessMsg);
        });

        test('verify user can view the uploaded document', async () => {
            await documentSignaturePage.view();
        });

        test('verify user can add the document to My Downloads', async () => {
            await documentSignaturePage.addToMyDownload();
        });

        test('verify user can check history', async () => {
            await documentSignaturePage.checkHistory();
        });

        test('verify user can delete uploaded documents', async () => {

            const popupSuccessMsg = 'Document deleted successfully.';
            await documentSignaturePage.delete(popupSuccessMsg);
        });

        test('verify the sign the document from My Downloads', async () => {
            await documentSignaturePage.myDownalodsView('Document has been signed successfully.');
        });

        test('verify My Downloads → History details', async () => {
            await documentSignaturePage.downloadCheckHistory();
        });
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/purchase-orderTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/documents-signature.spec.js --project=chromium --headed
   */ 
