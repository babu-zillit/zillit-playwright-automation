import { test } from '@playwright/test';
import ContractSignature from "../pages/contract-signature";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Contrcat Signature', () => {
    let context;
    let page;
    let uploadmedia;
    let contractSignaturePage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        contractSignaturePage = new ContractSignature(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await contractSignaturePage.contractSignatureTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Upload documents in contract', () => {

        test('verify upload document in contract', async () => {
            await contractSignaturePage.uploadDocumentsForFutureUseTab();
            await contractSignaturePage.uploadDocumentsForFutureUse('contract');
            await contractSignaturePage.uploadToStandardFormAndSendForSignature();
            await contractSignaturePage.delete();      
        });

        test('verify upload document in form', async () => {
            await contractSignaturePage.uploadDocumentsForFutureUse('form');
            await contractSignaturePage.form();
            await contractSignaturePage.uploadToStandardFormAndSendForSignature();
            await contractSignaturePage.delete();
            await contractSignaturePage.navigiateBack();
        });
    
    });

    test.describe('Add signature', async () => {

        test('verify add signature', async () => {
           await contractSignaturePage.drawSignatureWithMouse();
           await contractSignaturePage.navigiateBack();
           await contractSignaturePage.navigiateBack();
           await contractSignaturePage.navigiateBack();
        });

    });

    test.describe('Standard Forms & Contracts and Your Documents', async () => {

        test('verify verify the standrad form & contracts documents', async () => {
           await contractSignaturePage.standardFormAndContractsAndYourDocument();
           await contractSignaturePage.yourDocuments();
           await contractSignaturePage.navigiateBack();
        });

    });

    test.describe('upload documents and see list', async () => {

        test('verify upload documents and see list', async () => {
           await contractSignaturePage.uploadDocumentAndSeeList();
           await contractSignaturePage.navigiateBack();
        });

    });

    test.describe('Delete signature', async () => {

        test('verify upload documents and see list', async () => {
           await contractSignaturePage.deleteSignature();
           await contractSignaturePage.navigiateBack();
        });

    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/contract-signatureTest.spec.js --project=chromium --headed
   */ 
