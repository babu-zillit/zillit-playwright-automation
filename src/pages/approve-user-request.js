import { expect } from '@playwright/test';

export default class ApproveUserRequest{

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.settings = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Settings"]');
        this.adminSetting = page.locator('[data-node-key="admin"]')
        this.approveNewUserRequestTab = page.locator('#approve_new_user_request');
        this.acceptUser = page.locator('#accept_onboarding_without_deal_memo_nda');
        this.yesApprove = page.locator('//div[@class="ant-modal-confirm-btns"]//button');
    }

    async openSettings(){
        await this.settings.click();
        await this.adminSetting.click();
    }

    async approveNewUserRequest(){
        await this.approveNewUserRequestTab.click();
        await this.acceptUser.click();
        await this.yesApprove.nth(1).click();
        await this.page.waitForTimeout(5000);
    }

}