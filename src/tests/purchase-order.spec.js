import { test } from '@playwright/test';
import PurchaseOrder from "../pages/purchase-order";
import UploadMedia from "../actions/media-uploader";
import { populate } from 'dotenv';

test.describe('Purchase Order', () => {
    let context;
    let page;
    let uploadmedia;
    let purchaseOrderPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        purchaseOrderPage = new PurchaseOrder(page);

        await uploadmedia.clickProjectName();
        await purchaseOrderPage.openPurchaseOrderTab();
    });

    test.afterAll(async () => {
        await context.close();
    });



    test.describe.only('Create New PO', () => {

        test('verify the add new supplier', async () => {
            await purchaseOrderPage.openCreatePOTab();
            await purchaseOrderPage.selectSuppliers();
            await purchaseOrderPage.addSupplier();
        });

        test('verify the add new delivery address', async () => {
            await purchaseOrderPage.selectDeliveryAddres();
            await purchaseOrderPage.addDelivery();
        });

        test('verify select Delivery Date, Currency, Shipping Charge', async () => {
            await purchaseOrderPage.selectDeliveryDateCurrencyShippingCharge();
            await purchaseOrderPage.addPOItem('Item added successfully'); 
        });

        test.skip('verify add company details', async () => {
            await purchaseOrderPage.CompanyDetails();
        });
    });

    test.describe('Approval PO', () => {

        test('verify accept or reject approval PO', async () => {
            await purchaseOrderPage.pOApproval();
        });
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/purchase-orderTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/purchase-order.spec.js --project=chromium --headed
   */ 
