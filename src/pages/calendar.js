import { expect } from '@playwright/test';
import logger from "../utils/loggerUtils";

export default class Calendar {

    constructor(page){
        this.page = page;

        this.calendarTab = page.locator('text=Calendar');
        this.membersTab = page.locator('text=Members');
        this.personalTab = page.locator('text=Personal');
        this.addEventButton = page.locator('text=Add Event');

        this.eventNameInput = page.locator('#eventName');

        this.startDate = page.locator('[id="startDate"]');
        this.endTime = page.locator('#endTime');

        this.repeatstatus = page.locator('//input[@id="repeatStatus"]/ancestor::div[contains(@class,"ant-select-selector")]');

        this.notification = page.locator('//input[@id="notification"]/ancestor::div[contains(@class,"ant-select-selector")]');

        this.location = page.locator('//div[@class="ant-form-item-control-input-content"]//button[@id="location"]');

        this.selectButton = page.locator('//div[@class="ant-modal-footer"]//button[@type="button"]//span[text() = "Select"]');

        this.invitees = page.locator('id=invitees');
        this.allDepartmentTab = page.locator('[title="All Departments"]');

        this.callType = page.locator('//input[@id="call_type"]/ancestor::div[contains(@class,"ant-select-selector")]');

        this.externalUser = page.locator('[id="external_user"]');

        this.submit = page.locator('//div[contains(@class, "justify-end")]//span[text()="Submit"]');
    
        this.addEvent = page.getByRole('button', { name: 'Add Event' });
        this.descriptionInput = page.locator('#description');

        /**
         * Created-Events locator
         */ 
        this.createdEvent = page.locator('//button[@type="button"]//span[text()="Created-Events"]');
        this.deleteEvent = page.locator('//div[@class="flex items-center gap-2"]//span[@class="ant-btn-icon"]');
        this.allEvent = page.locator('//button[@type="button"]//span[text()="All Events"]');
        this.okButton = page.locator('//div[@class="ant-modal-footer"]//button');
    }


    async clickCalendarTab(){
        await this.calendarTab.click();
    }

    async clickAddEvent(){
        await this.addEvent.click();
    }

    async navigateToMembers(){
        await this.membersTab.click();
    }

    async navigateToPersonal(){
        await this.personalTab.click();
    }

    async fillEventName(eventName){
        await this.eventNameInput.fill(eventName);
    }

    async selectStartTime(){
        await this.startDate.click();
        await this.page.locator('.ant-picker-header-next-btn').click(); // next month
        await this.page.locator('.ant-picker-cell:not(.ant-picker-cell-disabled) >> text=29').click();
    }

    async selectEndTime(){
        await this.endTime.fill('11:45 PM');
        await this.page.keyboard.press('Enter');
    }

    async setRepeatStatus(eventRepeatOption){
        await this.repeatstatus.click();

        const everyDayOption = this.page.locator(`//div[contains(@class, "ant-select-item-option")]//div[text()="${eventRepeatOption}"]`);
        await everyDayOption.waitFor({ state: 'visible' });
        await everyDayOption.click();

        const okButton = this.page.locator("//button[@type='button']//span[text()='Ok']");
        await okButton.waitFor({ state: 'visible' });
        await okButton.click();
    }

    async addNotification(notificationOption){
        await this.notification.click();
        const notificationTime = this.page.locator(`//div[contains(@class, "ant-select-item-option") and .//div[text()="${notificationOption}"]]`);
        await notificationTime.waitFor({ state: 'visible' });
        await notificationTime.click();
    }

    async chooseLocation(){
        await this.location.waitFor({ state: 'visible'});
        await this.location.click();
        await this.page.waitForTimeout(1000);

        await this.selectButton.waitFor({ state: 'visible' });
        await this.selectButton.click();
    }

    async selectInvitees(){
        await this.invitees.click();
        
        await this.allDepartmentTab.waitFor({ state: 'visible', timeout: 10000 });
        await this.allDepartmentTab.click();

        await this.selectButton.waitFor({ state: 'visible' });
        await this.selectButton.click();
    }

    async selectCallType(callTypeOption){
        await this.callType.click();
        const callTypeOptions = this.page.locator(`//div[contains(@class, "ant-select-item-option") and .//div[text()="${callTypeOption}"]]`);
        await callTypeOptions.waitFor({ state: 'visible' });
        await callTypeOptions.click();
    }

    async chooseColor(){
        await this.page.locator('.ant-btn.ant-dropdown-trigger.mt-2').click();
        await this.page.waitForSelector('.ant-dropdown-menu-item', { state: 'visible' });
        await this.page.locator('.ant-dropdown-menu-item').first().click();

        try{
        const colorOptions = this.page.locator('div.flex.cursor-pointer.py-3.items-center.gap-2');
        const items = await colorOptions.allTextContents();
        console.log('Color options:', items);
        const preferredColors = ['GREEN', 'RED', 'BLUE', 'YELLOW'];
        for (const color of preferredColors) {
            if (items.includes(color)) {
                 await colorOptions.filter({ hasText: color }).first().click();
                 console.log(`Clicked on available color: ${color}`);
                break;
            }
        }
        }catch(error){
        console.error(error);
        }

    }

    async addOutSiderUser(enterEmail){
        await this.externalUser.click();

        const emailInput = this.page.locator('[placeholder="Enter Email"]');
        await emailInput.waitFor({ state: 'visible', timeout: 10000 });
        await emailInput.fill(enterEmail);

        const addButton = this.page.locator("//button[@type='button']//span[text()='Add']");
        await addButton.waitFor({ state: 'visible', timeout: 5000 });
        await addButton.click();

        const submitButton = this.page.locator('//div[@class="ant-modal-footer"]//span[text()="Submit"]');
        await submitButton.waitFor({ state: 'visible', timeout: 5000 });
        await submitButton.click();
    }

    async fillDiscription(enterDiscription){
        await this.descriptionInput.fill(enterDiscription);
    }

    async submitEvent(){
        await this.submit.click();
        await this.page.waitForTimeout(4000);
    }

    async createEventForMember(){
        await this.clickCalendarTab();
        await this.clickAddEvent();
        await this.navigateToMembers();
        await this.fillEventName('Babu1');
        await this.selectStartTime();
        await this.selectEndTime();
        await this.setRepeatStatus('Every Day');
        await this.addNotification('10 Minute Before');
        await this.chooseLocation();
        await this.selectInvitees();
        await this.selectCallType('Audio Call');
        await this.chooseColor();
        await this.addOutSiderUser('Bhavik@gmail.com');
        await this.fillDiscription('This meeting for urgent');
        await this.submitEvent();
    }

    async fullDay(){
        const fullDayToggle = this.page.locator('#fullday');
        const isChecked = await fullDayToggle.getAttribute('aria-checked');

        if (isChecked === 'false') {
            await fullDayToggle.click();
        }
    }

    async createEventForMemberForFullDay(){
        await this.clickCalendarTab();
        await this.clickAddEvent();
        await this.navigateToMembers();
        await this.fillEventName('Babu2');
        await this.fullDay();
        await this.selectStartTime();
        await this.setRepeatStatus('Every Day');
        await this.addNotification('One Day Before');
        await this.chooseLocation();
        await this.selectInvitees();
        await this.selectCallType('Audio Call');
        await this.chooseColor();
        await this.addOutSiderUser('Bhavik@gmail.com');
        await this.fillDiscription('This meeting for urgent');
        await this.submitEvent();
    }

    async createEventForPersonal(){
        await this.clickCalendarTab();
        await this.clickAddEvent();
        await this.navigateToPersonal();
        await this.fillEventName('Babu3');
        await this.selectStartTime();
        await this.selectEndTime();
        await this.setRepeatStatus('Every Day');
        await this.addNotification('10 Minute Before');
        await this.chooseLocation();
        await this.chooseColor();
        await this.fillDiscription('This meeting for urgent');
        await this.submitEvent();
    }

    async createEventForPersonalFullDay(){
        await this.clickCalendarTab();
        await this.clickAddEvent();
        await this.navigateToPersonal();
        await this.fillEventName('Babu4');
        await this.fullDay();

        await this.selectStartTime();
        await this.setRepeatStatus('Every Day');
        await this.addNotification('One Day Before');
        await this.chooseLocation();
        await this.chooseColor();
        await this.fillDiscription('This meeting for urgent');
        await this.submitEvent();
    }

    /**
     * Created-Event Page Actions
     */ 

    async deleteCalenderEvent(tabName){
        await this.createdEvent.click();

        if(tabName == 'member'){
            await this.page.locator('//div[@title="Invites-Sent"]').click();
        } else if (tabName === 'personal') {
            await this.page.locator('//div[@title="Personal"]').click();
        }

        await this.deleteEvent.nth(1).click();
        await this.allEvent.click();
        await this.okButton.nth(1).click();
        await this.page.waitForTimeout(4000);
        await this.page.locator('[aria-label="close"]').first().click();
    }

}