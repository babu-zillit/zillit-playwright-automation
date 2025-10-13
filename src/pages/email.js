
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');

export default class Email {

    constructor(page){
        this.page = page;

        this.email = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Email"]');
        
        this.inbox = page.locator('//div[contains(@class,"flex items-center")]//span[text()="Inbox"]');
        this.synchronusEmail = page.locator('//p[@class=" flex items-center gap-2"]');

        this.newEmail = page.locator('//button//span[text()="New Email"]');
        this.to = page.locator('[placeholder="To"]');
        this.cc = page.locator('[placeholder="cc"]');
        this.subject = page.locator('[placeholder="subject"]');
        this.typeMessage = page.locator('[class="ql-editor ql-blank"]');

        this.button = page.locator('//div[@class="flex items-center"]//button');
        this.attach = page.locator('//div[@class="flex items-center"]//button//span[text()="Attach"]');
        this.attachment = page.locator('//input[@type="file" and @name="email_attachment"]');

        this.sentButton = page.locator('//div[contains(@class,"flex items-center")]//span[text()="Sent"]');

        /**
         * Reply, Reply All, Forward Locators
         */
        this.replyReplyAllForward = page.locator('div.flex.items-center.gap-2.px-2.mt-6 button'); 
        this.deleteSentEmail = page.locator('div.bg-white.flex.flex-col.flex-grow.overflow-y-auto.py-2 span');
        this.clickOnSentEmail = page.locator('div.bg-white.flex.flex-col.flex-grow.overflow-y-auto.py-2 div.w-full div');
    }

    
    async clickEmailTab(){
        await this.email.click();
    }

    async loadEmailPageFully(){
        await this.inbox.waitFor({ state: 'visible' });
        const syncingEmails = await this.synchronusEmail;
        await syncingEmails.waitFor({ state: 'visible' });
        await syncingEmails.waitFor({ state: 'detached' });
    }

    async sendEmail(){
        await this.newEmail.click();
        await this.to.fill('Bhavik@zillit.com');
        await this.page.keyboard.press('Enter');

        await this.cc.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');

        await this.subject.fill('Regarding emergency leave');
        await this.typeMessage.fill('Hii,\nI hope you are doing well.\nI would like to request emergency leave for today.\n \nRegads\nBabu');
        await this.button.first().click();

        const successMsg = await this.page.locator('text=Email sent successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async attachMedia(){
        await this.attach.click();
        await this.page.waitForTimeout(500);
        await this.attachment.setInputFiles(mediapaths.image);
        const loading = await this.page.locator('[aria-label="loading"]');
        await loading.waitFor({ state: 'visible'});
        await loading.waitFor({ state: 'detached'});
    }

    async sendEmailMedia(){
        await this.newEmail.click();
        await this.to.fill('Bhavik@zillit.com');
        await this.page.keyboard.press('Enter');

        await this.cc.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');

        await this.subject.fill('Regarding emergency leave');
        await this.typeMessage.fill('Hii,\nI hope you are doing well.\nI would like to request emergency leave for today.\n \nRegads\nBabu');
        
        await this.attachMedia();

        await this.button.first().click();

        const successMsg = await this.page.locator('text=Email sent successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async sentMessage(){
        await this.sentButton.click();
        //await this.page.waitForTimeout(2000);
        const sent = await this.page.locator('//span[text()="bhavik@zillit.com"]');
        const count = await sent.count();

        if(count ==1){
            await sent.click();
        } else if(count > 1){
            await sent.first().click();
        } else {
            console.log('Sent email not available');
        }

        await this.page.waitForTimeout(2000);
    }

    async reply(){
        await this.clickOnSentEmail.first().click();
        await this.replyReplyAllForward.nth(0).click();
        await this.page.locator('div.ql-editor p').nth(0).fill('Hello this is rely message');
        await this.button.first().click();

        const successMsg = await this.page.locator('text=Email sent successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async replyAll(){
        await this.clickOnSentEmail.first().click();
        await this.replyReplyAllForward.nth(1).click();
        await this.page.locator('div.ql-editor p').nth(0).fill('Hello this is rely all message');
        await this.button.first().click();

        const successMsg = await this.page.locator('text=Email sent successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async forward(){
        await this.clickOnSentEmail.first().click();
        await this.replyReplyAllForward.nth(2).click();
        await this.to.fill('pramod@zillit.com');
        await this.page.keyboard.press('Enter');
        await this.page.locator('div.ql-editor p').nth(6).fill('Hello this is forward message');
        await this.button.first().click();

        const successMsg = await this.page.locator('text=Email sent successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async delete(){
        await this.deleteSentEmail.first().click();
        await this.page.locator('div.flex.items-center.w-auto button').first().click();
        await this.page.locator('div.ant-modal-content button').last().click();

        const successMsg = await this.page.locator('text=Email has been moved to Trash successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async folderCreate(){
        await this.page.locator('div.flex.items-center.px-4.justify-between button').click();
        await this.page.locator('[placeholder="Folder Name"]').fill('VIP');
        await this.page.locator('div.ant-modal-footer button').last().click();

        const successMsg = await this.page.locator('text=Email folder has been saved successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async folderEdit(){
        await this.page.locator('div.ant-dropdown-trigger').click();
        await this.page.locator('span.ant-dropdown-menu-title-content').first().click();
        await this.page.locator('[placeholder="Folder Name"]').fill('VIP1');
        await this.page.locator('div.ant-modal-footer button').last().click();
        
        const successMsg = await this.page.locator('text=Email folder renamed successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async folderDelete(){
        await this.page.locator('div.ant-dropdown-trigger').click();
        await this.page.locator('span.ant-dropdown-menu-title-content').last().click();
        await this.page.locator('div.ant-modal-content button').last().click();
        
        const successMsg = await this.page.locator('text=Email Folder deleted successfully.');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }




}