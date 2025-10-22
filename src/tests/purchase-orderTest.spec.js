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



    test.describe('Create New PO', () => {

        test('verify the add new supplier', async () => {
            await purchaseOrderPage.createPO();
            await purchaseOrderPage.selectSuppliers();
            //await purchaseOrderPage.createSupplier();
            await purchaseOrderPage.selectExistingSupplier();
        });

        test('verify the add new delivery address', async () => {
            await purchaseOrderPage.selectDeliveryAddres();
            //await purchaseOrderPage.addDeliveryAddress();
            await purchaseOrderPage.selectExistingDelivery();
        });

        test('verify select Delivery Date, Currency, Shipping Charge', async () => {
            await purchaseOrderPage.selectDeliveryDateCurrencyShippingCharge();
            await purchaseOrderPage.addPOItem(); 
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/purchase-orderTest.spec.js --project=chromium --headed
   */ 
