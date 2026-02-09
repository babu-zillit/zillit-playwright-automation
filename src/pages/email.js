
import { loadJson } from '../utils/jsonUtil';
import { expect } from '@playwright/test';
const mediapaths = loadJson('mediapaths', 'testdata');
import UploadMedia from '../actions/media-uploader';

export default class Email {

    constructor(page){
        this.page = page;
        this.uploadMedia = new UploadMedia(page);

        this.email = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Email"]');
        
        this.inbox = page.locator('//div[contains(@class,"flex items-center")]//span[text()="Inbox"]');
        this.synchronusEmail = page.locator('//p[@class=" flex items-center gap-2"]');

        this.newEmail = page.locator('//button//span[text()="New Email"]');
        this.to = page.locator('[placeholder="To"]');
        this.cc = page.locator('[placeholder="cc"]');
        this.subject = page.locator('[placeholder="subject"]');
        this.typeMessage = page.locator('div.ql-editor div').first();

        this.button = page.locator('//div[@class="flex items-center"]//button');
        this.attach = page.locator('//div[@class="flex items-center"]//button//span[text()="Attach"]');
        this.attachment = page.locator('//input[@type="file" and @name="email_attachment"]');

        this.sentButton = page.locator('//div[contains(@class,"flex items-center")]//span[text()="Sent"]');
        this.sentEmailList = page.locator('div.flex.items-start.gap-2');

        this.inboxSentDraftJunkTrashDistributed = page.locator('div.space-y-1.mt-4 button');
        this.expandLeftDeleteMoveReplyReplyAllForward = page.locator('div.flex.items-center.w-auto button');
        this.moveInboxJunkDistributedMail = page.locator('div.divide-y div');

        this.signatureConversationImportBCCPresetEmailGroupEmailSetup = page.locator('div.flex.flex-col.gap-3 button');
        this.addBccPreset = page.locator('#add_bcc_preset_popover_button');
        this.bccPrestTo = page.locator('[placeholder="To"]');
        this.submitAddBccPreset = page.locator('#add_bcc_preset_submit_button');

        // Reply, Reply All, Forward Locators
        this.replyReplyAllForward = page.locator('div.flex.items-center.gap-2.px-2.mt-6 button'); 
        this.deleteSentEmail = page.locator('div.bg-white.flex.flex-col.flex-grow.overflow-y-auto.py-2 span');

        this.clickOnSentEmail = page.locator('div.bg-white.flex.flex-col.flex-grow.overflow-y-auto.py-2 div.w-full div');

        this.folderCreationIcon = page.locator('div.flex.items-center.px-4.justify-between button');
        this.folderName = page.locator('[placeholder="Folder Name"]');
        this.createButton = page.locator('div.ant-modal-footer button');
        this.editDeleteFolder = page.locator('span.ant-dropdown-menu-title-content');

    }

    
    async clickEmailTab(){
        await this.email.click();
        await this.loadEmailPageFully();
    }

    async loadEmailPageFully(){
        await this.inbox.waitFor({ state: 'visible' });
        const syncingEmails = await this.synchronusEmail;
        await syncingEmails.waitFor({ state: 'visible' });
        await syncingEmails.waitFor({ state: 'detached' });
    }

    async clickNewEmail(){
        await this.newEmail.click();
    }

    async writeTextInBody(){
        await this.page.keyboard.press('Meta+A');
        await this.page.keyboard.press('Delete');
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.type('Hello Bhavik');
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.type('I would like to discuss regarding salary increment. Please let me know when we can talk.');
    }

    async sendEmail(successMsg){
        await this.to.fill('Bhavik@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.cc.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.subject.fill('Automation Report');
        await this.button.first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async attachMedia(){
        await this.attach.click();
        await this.page.waitForTimeout(500);
        await this.attachment.setInputFiles(mediapaths.image);
        const loading = await this.page.locator('[aria-label="loading"]');
        await loading.waitFor({ state: 'visible'});
        await loading.waitFor({ state: 'detached'});
    }

    async sendMediaEmail(successMsg){
        await this.to.fill('Bhavik@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.cc.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.subject.fill('Automation Report');
        await this.attachMedia();
        await this.button.first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async reply(successMsg){
        await this.inboxSentDraftJunkTrashDistributed.nth(1).click();
        await this.sentEmailList.first().click();
        await this.replyReplyAllForward.nth(0).click();
        await this.page.keyboard.type('This is REPLY EMAIL')
        await this.page.waitForTimeout(5000);
        //await this.page.locator('div.ql-editor div').nth(0).fill('Hello this is rely message');
        await this.button.first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async replyAll(successMsg){
        await this.inboxSentDraftJunkTrashDistributed.nth(1).click();
        await this.sentEmailList.first().click();
        await this.replyReplyAllForward.nth(1).click();
        await this.page.keyboard.type('This is REPLY ALL EMAIL');
        await this.page.waitForTimeout(5000);
       // await this.page.locator('div.ql-editor div').nth(0).fill('Hello this is rely all message');
        await this.button.first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async forward(successMsg){
        await this.inboxSentDraftJunkTrashDistributed.nth(1).click();
        await this.sentEmailList.first().click();
        await this.replyReplyAllForward.nth(2).click();
        await this.page.keyboard.type('This is FORWARD EMAIL');
        await this.to.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(5000);
        //await this.page.locator('div.ql-editor div').nth(6).fill('Hello this is forward message');
        await this.button.first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async delete(successMsg){
        await this.inboxSentDraftJunkTrashDistributed.nth(1).click();
        await this.sentEmailList.first().click();
        await this.expandLeftDeleteMoveReplyReplyAllForward.nth(1).click();
        await this.page.locator('#delete-emails-button').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async moveToInboxFromSent(successMsg){
        await this.inboxSentDraftJunkTrashDistributed.nth(1).click();
        await this.sentEmailList.first().click();
        await this.expandLeftDeleteMoveReplyReplyAllForward.nth(2).click();
        await this.moveInboxJunkDistributedMail.first().click();
        await this.page.locator('div.mt-2.flex.items-end.justify-end button').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async moveToJunkFromInbox(successMsg){
        await this.inboxSentDraftJunkTrashDistributed.first().click();
        await this.sentEmailList.first().click();
        await this.expandLeftDeleteMoveReplyReplyAllForward.nth(2).click();
        await this.moveInboxJunkDistributedMail.first().click();
        await this.page.locator('div.mt-2.flex.items-end.justify-end button').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async moveToTrashFromJunk(successMsg){
        await this.inboxSentDraftJunkTrashDistributed.nth(3).click();
        await this.sentEmailList.first().click();
        await this.expandLeftDeleteMoveReplyReplyAllForward.nth(2).click();
        await this.moveInboxJunkDistributedMail.nth(1).click();
        await this.page.locator('div.mt-2.flex.items-end.justify-end button').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async moveToDistributedMailFromTrash(successMsg){
        await this.inboxSentDraftJunkTrashDistributed.nth(4).click();
        await this.sentEmailList.first().click();
        await this.expandLeftDeleteMoveReplyReplyAllForward.nth(2).click();
        await this.moveInboxJunkDistributedMail.last().click();
        await this.page.locator('div.mt-2.flex.items-end.justify-end button').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

     async moveToFolderFromDistributedMail(successMsg){
        await this.inboxSentDraftJunkTrashDistributed.nth(5).click();
        await this.sentEmailList.first().click();
        await this.expandLeftDeleteMoveReplyReplyAllForward.nth(2).click();
        await this.moveInboxJunkDistributedMail.last().click();
        await this.page.locator('div.mt-2.flex.items-end.justify-end button').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async draft(){
        await this.inboxSentDraftJunkTrashDistributed.nth(2).click();
        console.log('draft functionality')
    }

    async createFolder(successMsg){
        await this.folderCreationIcon.click();
        await this.folderName.fill('VIP');
        await this.createButton.last().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async createFolderWithSameName(successMsg){
        await this.folderCreationIcon.click();
        await this.folderName.fill('VIP');
        await this.createButton.last().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
        await this.page.locator('[data-icon="close"]').click();
    }

    async editFolder(successMsg){
        await this.page.locator('div.ant-dropdown-trigger').click();
        await this.editDeleteFolder.first().click();
        await this.folderName.fill('VIP1');
        await this.page.locator('div.ant-modal-footer button').last().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async deleteFolder(successMsg){
        await this.page.locator('div.ant-dropdown-trigger').click();
        await this.editDeleteFolder.last().click();
        await this.page.locator('div.ant-modal-content button').last().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async addSignature(successMsg){
        await this.signatureConversationImportBCCPresetEmailGroupEmailSetup.first().click();
        await this.page.locator('div.ant-modal-body button').last().click();
        await this.page.locator('[placeholder="Enter signature name"]').fill('Babu Yadav');
        await this.page.locator('div.ant-modal-body div.ql-editor').fill('Best Regards \n Babu \n Automation');
        await this.page.locator('div.ant-modal-body button').last().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
        await this.page.locator('div.ant-modal-content span[aria-label="close"]').click();
    }

    async editSignature(successMsg){
        await this.signatureConversationImportBCCPresetEmailGroupEmailSetup.first().click();
        await this.page.locator('div.ant-modal-content div.ant-modal-body button').first().click();
        await this.page.locator('li.ant-dropdown-menu-item').first().click();
        await this.page.locator('[placeholder="Enter signature name"]').fill('Babu Yadav1');
        await this.page.locator('div.ant-modal-body div.ql-editor').fill('Best Regards \n Babu \n Automation');
        await this.page.locator('div.ant-modal-body button').last().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
        await this.page.locator('div.ant-modal-content span[aria-label="close"]').click();
    }

    async deleteSignature(){
        await this.signatureConversationImportBCCPresetEmailGroupEmailSetup.first().click();
        await this.page.locator('div.ant-modal-content div.ant-modal-body button').first().click();
        await this.page.locator('li.ant-dropdown-menu-item').last().click();
        await this.page.locator('div.ant-modal-confirm-btns button').last().click();
        await this.page.locator('div.ant-modal-content span[aria-label="close"]').click();
        await this.page.waitForTimeout(3000);
    }

    async addBCCPreset(successMsg){
        await this.signatureConversationImportBCCPresetEmailGroupEmailSetup.nth(3).click();
        await this.addBccPreset.click();
        await this.bccPrestTo.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.submitAddBccPreset.click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`)
    }

    async deleteBCCPreset(successMsg){
        await this.signatureConversationImportBCCPresetEmailGroupEmailSetup.nth(3).click();
        await this.page.locator('#add_bcc_preset_trash_button').first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`)
        await this.page.locator('[aria-label="close"]').click();
    }

    async createEmailGroup(){
        await this.signatureConversationImportBCCPresetEmailGroupEmailSetup.nth(4).click();
        //await this.page.locator('div.ant-modal-footer button').first().click();

        const footerButton = this.page.locator('div.ant-modal-footer button').first();
        await footerButton.waitFor({ state: 'visible', timeout: 15000 });
        await expect(footerButton).toBeEnabled({ timeout: 15000 });
        await footerButton.click();

        await this.page.locator('#group_name').fill('Tester');
        await this.page.locator('div.ant-modal-body button').first().click();
        await this.page.locator('div.ant-modal-body button').last().click();
        await this.page.locator('div.ant-modal-footer button').last().click();
        await this.page.locator('div.ant-modal-footer button').click();
        await this.page.waitForTimeout(5000);
        await this.page.locator('[aria-label="close"]').click();
    }

    async deleteEmailGroup(successMsg){
        await this.signatureConversationImportBCCPresetEmailGroupEmailSetup.nth(4).click();
        await this.page.locator('div.divide-y.h-full span.ant-btn-icon').last().click();
        await this.page.locator('#delete_confirmation_button').click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`) 
        await this.page.locator('[aria-label="close"]').click();
    }

    async emailSetUpExternally(successMsg){
        await this.signatureConversationImportBCCPresetEmailGroupEmailSetup.nth(5).click();
        await this.page.locator('div.ant-modal-body span.ant-btn-icon').click();
        await this.page.locator('div.ant-modal-body input').fill('123@Password');
        await this.page.locator('div.ant-modal-body button').first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`)
        await this.page.locator('[aria-label="close"]').click();
    }

    async sendEmailToGroup(successMsg){
        await this.newEmail.click();
        await this.to.fill('Tester');
        await this.page.keyboard.press('Enter');

        await this.cc.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');

        await this.subject.fill('Automation Report');
        await this.typeMessage.fill('Hii,\nPlease see the email report.\nThis report is generated by automation');
        await this.button.first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async saveDraftEmail(successMsg){
        await this.cc.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.subject.fill('Automation Report');
        await this.button.nth(2).click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);
    }

    async sendDraftEmail(successMsg){
        await this.draft();

        this.draftEmailList = this.page.locator('text=Automation Report');
        await this.draftEmailList.first().click();
        
        await this.to.fill('Bhavik@zillit.com');
        await this.page.keyboard.press('Enter');

        await this.button.first().click();
        await this.uploadMedia.verifyPopupMessage(`${successMsg}`);

        await this.inboxSentDraftJunkTrashDistributed.nth(1).click();
        await this.sentEmailList.first().click();
        await this.page.waitForTimeout(2000);
    }

}