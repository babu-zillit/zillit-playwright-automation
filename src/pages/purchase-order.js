import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
const purchaseOrderDetails = loadJson('purchaseOrderDetails', 'testdata');

export default class PurchaseOrder {
    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');

        /**
         * Create a new P.O locators
         */
        this.createNewPO = page.locator("//strong[text()='Create a new P.O.']");
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

        /**
         * select delivery address locator's
         */ 
        this.selectDeliveryAddress = page.locator('#select_delivery_address_drawer_open_button');
        this.addNewDeliveryAddress = page.locator('div.ant-drawer-extra span');
        this.deliveryName = page.locator('#DeliveryName');
        this.deliveryEmail = page.locator('#DeliveryEmail');


    }

    async openPurchaseOrderTab(){
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Purchase Order').click();
    }

    async createPO(){
        await this.createNewPO.click();
    }

    async selectSuppliers(){
        await this.selectSupplier.click();
    }

    async createSupplier(){
        await this.addNewSupplier.click();
        await this.supplierName.fill(purchaseOrderDetails.supplierName);
        await this.supplierEmail.fill(purchaseOrderDetails.supplierEmail);
        await this.phone.fill(purchaseOrderDetails.supplierPhone);
        await this.country.fill(purchaseOrderDetails.supplierCountry);
        await this.page.keyboard.press('Enter');
        await this.contactPerson.fill(purchaseOrderDetails.supplierContactPerson);
        await this.vatNumber.fill(purchaseOrderDetails.supplierVATNumber);
        await this.postCode.fill(purchaseOrderDetails.supplierPostCode);
        await this.page.waitForTimeout(5000);
        await this.addressLine1.fill(purchaseOrderDetails.supplierAddress1);
        await this.addressLine2.fill(purchaseOrderDetails.supplierAddress2);
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
    }

    
}