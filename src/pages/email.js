
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




}