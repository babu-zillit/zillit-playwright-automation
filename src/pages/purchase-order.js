import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
import UploadMedia from '../actions/media-uploader'
const mediapaths = loadJson('mediapaths', 'testdata');
const purchaseOrderDetails = loadJson('purchaseOrderDetails', 'testdata');

export default class PurchaseOrder {
    constructor(page){
        this.page = page;
        this.uploadMedia = new UploadMedia(page);

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');

        /**
         * Create a new P.O locators
         */
        this.createNewPO = page.locator("//strong[text()='Create a new PO ']");
        this.selectSupplier = page.locator('#select_suplier_drawer_open_button');
        this.addNewSupplier = page.locator('div.ant-drawer-extra span');
        this.supplierName = page.locator('#supplierName');
        this.supplierEmail = page.locator('#supplierEmail');
        this.phone = page.locator('#phoneNumber');
        this.contactPerson = page.locator('#contactPerson');
        this.vatNumber = page.locator('#vatNumber');
        this.country = page.locator('#country');
        this.postCode = page.locator('#postCode');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.addressLine1 = page.locator('#addressLine1');
        this.addressLine2 = page.locator('#addressLine2');
        this.saveSupplier = page.locator('#add_new_supplier_save_button');
        this.saveSupplierAddress = page.locator('#select_supplier_save_button');

        /**
         * select delivery address locator's
         */ 
        this.selectDeliveryAddress = page.locator('#select_delivery_address_drawer_open_button');
        this.addNewDeliveryAddress = page.locator('div.ant-drawer-extra span');
        this.deliveryName = page.locator('#DeliveryName');
        this.deliveryEmail = page.locator('#DeliveryEmail');

        this.selectCurrency = page.locator('#Currency');
        this.budgetCode = page.locator('#budgetCode');
        this.shipingCharge = page.locator('#shippingCharges');
        this.description = page.locator('#note');
        this.saveDeliveryAddress = page.locator('#save_delivery_address_button');
        this.selectExistingDeliveryAddress = page.locator('#select_delivery_address_save_button');
        
        /**
         * select delivery date, currency, shipping charge locator's
         */ 
        this.currency = page.locator('#Currency');
        this.shippingCharge = page.locator('#shippingCharges');
        this.description = page.locator('#note');


        /**
         * P.O Item Add List locators
         */ 
        this.poItemAddList = page.locator('#po_add_list_item_button');
        this.expenditureType = page.locator('#expenditureType');
        this.itemName = page.locator('#itemName');
        this.setCode = page.locator('#setCode');
        this.quantity = page.locator('#quantity');
        this.price = page.locator('#price');
        this.tax = page.locator('#tax');
        this.saveItem = page.locator('#create_new_po_save_update_item_button');

        this.saveToDraftButton = page.locator('#save_to_draft_button');
        this.submitForApprovalButton = page.locator('#submit_for_approval_button');
        this.saveForTemplatesButton = page.locator('#submit_for_template_button');

        /**
         * Company details locators
         */
        this.companyDetailsTab = page.locator("//strong[text()='Production Company Details and Address for Deliveries']");
        this.addCompanyDetails = page.locator('#add_company_details_button');
        this.companyName = page.locator('#CompanyName');
        this.companyEmail = page.locator('#CompanyEmail');
        this.POPrefix = page.locator('#POprefix');
        this.saveCompanyDetailsButton = page.locator('#save_company_details_button')

        /**
         * PO submited to me for approval locators
         */
        this.pOSubmitedMeForApprovalTab = page.locator("//strong[text()='PO’S Submitted To Me For Approval ']");
        this.acceptReject = page.locator('#approved_pending_po_accept_reject_button');
        this.accept = page.locator('#approved_pending_po_accept_button');
        this.reject = page.locator('#approved_pending_po_reject_button');

        //My PO
        this.viewDetailsButton = page.locator('#send_to_suppliers_accounts_view_more_details_button');
        this.viewAddAttachment = page.locator('[data-icon="paper-clip"]');
        this.uploadAttachment = page.locator('//input[@type="file"]');
        this.upload = page.locator('#upload_document_send_script_button');   

    }

    async openPurchaseOrderTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Purchase Order').click();
    }

    async openCreatePOTab(){
        await this.createNewPO.click();
    }

    async selectSuppliers(){
        await this.selectSupplier.click();
    }

    async addNewSupplierDetails(){
        await this.addNewSupplier.click();
        await this.supplierName.fill(purchaseOrderDetails.supplierName);
        await this.supplierEmail.fill(purchaseOrderDetails.supplierEmail);
        await this.phone.fill(purchaseOrderDetails.supplierPhone);
        await this.page.waitForTimeout(1000);
        await this.country.fill(purchaseOrderDetails.supplierCountry);
        await this.page.keyboard.press('Enter');
        await this.contactPerson.fill(purchaseOrderDetails.supplierContactPerson);
        await this.vatNumber.fill(purchaseOrderDetails.supplierVATNumber);
        await this.postCode.fill(purchaseOrderDetails.supplierPostCode);
        await this.page.waitForTimeout(5000);
        await this.addressLine1.fill(purchaseOrderDetails.supplierAddress1);
        await this.addressLine2.fill(purchaseOrderDetails.supplierAddress2);
        await this.saveSupplier.click();
    }

    async selectExistingSupplier(){
        await this.page.locator('[type="checkbox"]').first().click();
        await this.page.waitForTimeout(1000);
        await this.saveSupplierAddress.click();
    }

    async addSupplier(){
        const edit = this.page.locator('#po_edit_supplier_button');

        try{
            await edit.waitFor({ state: 'visible', timeout: 10000 });
        }catch(e){
            console.log('there is no supplier');
        }
        
        if(await edit.first().isVisible()){
            await this.selectExistingSupplier();
        } else {
            await this.addNewSupplierDetails();
            await this.selectExistingSupplier();
        }
    }

    async selectDeliveryAddres(){
        await this.selectDeliveryAddress.click();
    }

    async addDeliveryAddress(){
        await this.addNewDeliveryAddress.click();
        await this.deliveryName.fill(purchaseOrderDetails.deliveryName);
        await this.deliveryEmail.fill(purchaseOrderDetails.deliveryEmail);
        await this.phone.last().fill(purchaseOrderDetails.deliveryPhone);
        await this.page.locator('input[aria-owns="country_list"]').click();
        await this.page.keyboard.type('United States');
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
        await this.postCode.last().fill(purchaseOrderDetails.deliveryPostCode);
        await this.page.waitForTimeout(5000);
        await this.addressLine1.last().fill(purchaseOrderDetails.deliveryAddress1);
        await this.addressLine2.last().fill(purchaseOrderDetails.deliveryAddress2);
        await this.saveDeliveryAddress.click();
    }

    async selectExistingDelivery(){
        await this.page.locator('[type="checkbox"]').first().click();
        await this.page.waitForTimeout(1000);
        await this.selectExistingDeliveryAddress.click();
    }

    async addDelivery(){
        const edit = this.page.locator('#po_edit_delivery_address_button');

        try{
            await edit.waitFor({ state: 'visible', timeout: 10000 });
        }catch(e){
            console.log('There is no any delivery address');
        }
        
        if(await edit.first().isVisible()){
            await this.selectExistingDelivery();
        } else {
            await this.addDeliveryAddress();
            await this.selectExistingDelivery();
        }
    }

    async selectDeliveryDateCurrencyShippingCharge(){
        await this.currency.fill(purchaseOrderDetails.selectCurrency);
        await this.page.keyboard.press('Enter');
        await this.shippingCharge.fill(purchaseOrderDetails.shippingCharge);
        await this.description.fill(purchaseOrderDetails.description);
    }

    async addPOItem(successMsg){
        await this.poItemAddList.click();
        await this.expenditureType.click();
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(500);
        await this.itemName.fill(purchaseOrderDetails.itemName);
        await this.budgetCode.fill(purchaseOrderDetails.itemBudgetCode);
        await this.setCode.fill(purchaseOrderDetails.itemSetCode);
        await this.quantity.fill(purchaseOrderDetails.itemQuantity);
        await this.price.fill(purchaseOrderDetails.itemprice);
        await this.tax.fill(purchaseOrderDetails.itemTax);
        await this.saveItem.click();

        await this.uploadMedia.verifyPopupMessage(`${successMsg}`)

        await this.page.locator('#close_add_update_item_modal_button').click();
        await this.page.waitForTimeout(5000);
    }

    async saveToDraft(){
        await this.saveToDraftButton.click();

        const popup = this.page.locator('.ant-message-notice-content');
        await expect(popup).toContainText(
            'Purchase order draft created successfully. You can view your draft(s) in My PO\'s section.');
            
        await this.page.goBack();    
    }

    async submitForApproval(){
        await this.submitForApprovalButton.click();
        await this.page.waitForTimeout(5000);
    }

    async saveForTemplate(){
        await this.saveForTemplatesButton.click();
        await this.page.waitForTimeout(5000);
    }

    async CompanyDetails(){
        await this.companyDetailsTab.click();
        await this.addCompanyDetails.click();
        await this.page.waitForTimeout(1000);
        await this.companyName.fill(purchaseOrderDetails.companyName);
        await this.page.waitForTimeout(1000);
        await this.vatNumber.fill(purchaseOrderDetails.companyVatNumber);
        await this.page.waitForTimeout(1000);
        await this.companyEmail.fill(purchaseOrderDetails.companyEmail);
        await this.page.waitForTimeout(1000);
        await this.phone.fill(purchaseOrderDetails.companyPhoneNumber);
        await this.page.waitForTimeout(1000);
        await this.country.fill(purchaseOrderDetails.companyCountry);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.postCode.fill(purchaseOrderDetails.companyPostCode);
        await this.page.waitForTimeout(5000);
        await this.addressLine1.fill(purchaseOrderDetails.companyAddress1);
        await this.addressLine2.fill(purchaseOrderDetails.companyAddress2);
        await this.POPrefix.fill(purchaseOrderDetails.companyPOprefix);
        await this.saveCompanyDetailsButton.click();
        await this.page.waitForTimeout(5000);

        await this.page.goBack();
    }

    async myPO(successMsg){
        await this.page.getByText("My PO", { exact: false }).click();

        await this.viewDetailsButton.first().click();
        await this.viewAddAttachment.click();
        await this.uploadAttachment.setInputFiles(mediapaths.document);
        await this.upload.click();

        await this.page.locator('[aria-label="close"]').last().click();
        await this.page.locator('div.ant-drawer-footer button').first().click();
        
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);

        await this.page.goBack();
    }

    async rejectPO(successMsg){
        await this.pOSubmitedMeForApprovalTab.click();

        await this.acceptReject.first().click();
        await this.reject.click();
        await this.page.locator('div.ant-popconfirm-buttons button').first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`)

        await this.page.goBack();
    }

    async myPOAfterRejectPO(successMsg){
        await this.page.getByText("My PO", { exact: false }).click();

        await this.viewDetailsButton.first().click();
        await this.page.locator('#resubmit_rejected_po_button').click();

        await this.page.locator('button.pobuttonstyle').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);

        await this.page.goBack();
    }

    async acceptPO(successMsg){
        await this.pOSubmitedMeForApprovalTab.click();

        await this.acceptReject.first().click();
        await this.accept.click();
        await this.page.locator('div.ant-popover-content button').last().click();

        const popup = this.page.getByText(successMsg, { exact: false });
        await expect(popup).toBeVisible({ timeout: 25000 });
        await expect(popup).toBeHidden({ timeout: 25000 });
    }

    async emailToSupplier(successMsg){
        await this.page.getByText("My PO", { exact: false }).click();

        await this.viewDetailsButton.first().click();
        await this.page.locator('#email_to_supplier_button').click();

        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);

        await this.page.locator('[data-icon="close"]').click();
        await this.page.goBack();
    }

    async allPOInTheProject(){
        await this.page.getByText("All Po's In The Project", { exact: false }).click();

        await expect(this.page.locator('text=Approved').first()).toBeVisible({ timeout: 5000 });
        await this.page.goBack();
    }

    async setApprovalLevel(successMsg){
        await this.page.getByText("Set Approval Levels Globally or for each Department ", { exact: false }).click();

        await this.page.locator('div.ant-card-body span').first().click();
        await this.page.locator('div.ant-modal-body button').last().click();
        await this.page.locator('[placeholder="Range"]').fill('60000');

        await this.page.locator('#approver').first().click();
        await this.page.keyboard.press('Enter');

        await this.page.getByRole('button', { name: 'Set' }).click();
    
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async editApprovalLevel(successMsg){
        await this.page.locator('#edit_global_department_levels_button').last().click();
        await this.page.locator('#approval-level').fill('60001');

        await this.page.getByRole('button', { name: 'Set' }).click();
        await this.page.waitForTimeout(6000);
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async deleteApprovalLevel(successMsg){
        const deleteIcons = this.page.locator('[data-icon="delete"]');
        await deleteIcons.nth(2).click()
        await this.page.locator('div.ant-popconfirm-buttons button').last().click();

        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);

        await this.page.locator('#close_global_department_modal_button').click();
        await this.page.goBack();
    }

 
}