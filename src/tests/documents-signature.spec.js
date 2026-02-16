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



    test.describe.skip('Documents & Signature: Signature Management', () => {

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

    test.describe.skip('Standrad Documents', () => {

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

    test.describe('Chat With Users', () => {

        test('verify user clicks on chat with user tab and select the user', async () => {
            await documentSignaturePage.chatWithUsers();
            await documentSignaturePage.selectUser();
        });

        test('verify send a message', async () => {
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message', async () => {
            await uploadmedia.edit();
        });

        test('verify forward the message', async () => {
            await uploadmedia.forward();
        });

        test('verify reply to the message', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit the reply message', async () => {
            await uploadmedia.editReply();
        });

        test('verify the delete the reply message', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the forward to remote project', async () => {
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete message', async () => {
            await uploadmedia.delete();
        });

    });

    test.describe('Send Document', () => {
        test('verify the send a document', async () => {
            await uploadmedia.clickAttachment();
            await uploadmedia.uploadDocument();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await uploadmedia.editReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the forward to remote project', async () => {
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete document', async () => {
            await uploadmedia.delete();
        });

    });

    test.describe('Send VoiceOver', () => {
        test('verify the send a voiceOver', async () => {
            await uploadmedia.voiceOverRecord();
        });

        test('verify the forward', async () => {
            await uploadmedia.forward();
        });

        test('verify the reply', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit reply', async () => {
            await uploadmedia.editReply();
        });

        test('verify the delete reply', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the forward to remote project', async () => {
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete audio', async () => {
            await uploadmedia.delete();
        });

    });



});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/purchase-orderTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/documents-signature.spec.js --project=chromium --headed
   */ 
