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

        test('verify user can save to Draft', async () => {
            await purchaseOrderPage.saveToDraft();
        });

        test('verify add company details', async () => {
            await purchaseOrderPage.CompanyDetails();
        });
    });

    test.describe('My PO', () => {

        test('verify my draft PO', async () => {
            await purchaseOrderPage.myPO('Purchase order created and submitted for approval.');
        });
    });

    test.describe('PO Submited To Me For Approval', () => {

        test('verify reject po', async () => {
            const rejectPopupMessage = 'Rejection has been save succesfully, we will notify user to act on it and request to re-submit as per your comment.';
            await purchaseOrderPage.rejectPO(rejectPopupMessage);
        });

        test('verify user resubmit the PO after reject the PO', async () => {
            const resubmitPOpopup = 'Purchase order has been re-submitted succesfully. Approvals are all reset for all users and will follow the approval workflow.';
            await purchaseOrderPage.myPOAfterRejectPO(resubmitPOpopup);
        });

        test('verify accept PO', async () => {
            await purchaseOrderPage.acceptPO('Purchase Order approved successfully');
        });

    });

    test.describe('email to supplier', () => {

        test('verify email to supplier', async () => {
            const emailToSupplierpopup = 'The approved purchase order invoice has been successfully emailed to the supplier and the accounts department.';
            await purchaseOrderPage.emailToSupplier(emailToSupplierpopup);
        });
    });

    test.describe('All PO in The Project', () => {

        test('verify approved PO in the all po project tab', async () => {
            await purchaseOrderPage.allPOInTheProject();
        });
    });

    test.describe('Set Approval Level', () => {

        test('verify use can set the approval level', async () => {
            await purchaseOrderPage.setApprovalLevel('Approval level has been created succesfully.');
        });

        test('verify use can edit approval level', async () => {
            await purchaseOrderPage.editApprovalLevel('Approval level has been saved succesfully.');
        });

        test('verify use can delete approval level', async () => {
            await purchaseOrderPage.deleteApprovalLevel('Approval level deleted Sucessfully');
        });

    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/purchase-orderTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/purchase-order.spec.js --project=chromium --headed
   */ 
