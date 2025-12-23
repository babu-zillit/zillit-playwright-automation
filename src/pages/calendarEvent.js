export default class CalendarEvent {
    constructor(page){
        this.page = page;

        this.calendarTab = page.locator('text=Calendar');
        this.addEventButton = page.locator('text=Add Event');
        this.membersTab = page.locator('text=Members');
        this.personalTab = page.locator('text=Personal');

        this.enterEventName = page.locator('#eventName');
        this.fullDayToggle = this.page.locator('#fullday');
        this.startDate = page.locator('[id="startDate"]');
        this.endTime = page.locator('#endTime');

        this.repeatstatus = page.locator('//input[@id="repeatStatus"]/ancestor::div[contains(@class,"ant-select-selector")]');

        this.notification = page.locator('//input[@id="notification"]/ancestor::div[contains(@class,"ant-select-selector")]');

        this.location = page.locator('//div[@class="ant-form-item-control-input-content"]//button[@id="location"]');
        this.selectButton = page.locator('//div[@class="ant-modal-footer"]//button[@type="button"]//span[text() = "Select"]');

        this.invitees = page.locator('id=invitees');
        this.allDepartmentTab = page.locator('[title="All Departments"]');
        this.selectUserTab = page.locator('[title="Select Users"]');

        this.callType = page.locator('//input[@id="call_type"]/ancestor::div[contains(@class,"ant-select-selector")]');

        this.externalUser = page.locator('[id="external_user"]');

        this.submit = page.locator('//div[contains(@class, "justify-end")]//span[text()="Submit"]');
    
        this.addEvent = page.getByRole('button', { name: 'Add Event' });
        this.descriptionInput = page.locator('#description');
        
        this.createdEvent = page.locator('//button[@type="button"]//span[text()="Created-Events"]');
        this.delete = page.locator('div.ant-card-body div.flex.justify-between.items-center button');
        this.allEvent = page.locator('//button[@type="button"]//span[text()="All Events"]');
        this.ok = page.locator('//div[@class="ant-modal-footer"]//button');
    }

    async clickCalendarTab(){
        await this.calendarTab.click();
    }

    async selectDropdownByText(text) {
        if (!text) return;

        const option = this.page.locator(
            `//div[contains(@class,"ant-select-item-option")]//div[text()="${text}"]`
        );
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async createCalendar({
        eventType,
        eventName,
        isFullDay = false,
        repeatStatusOption,
        notificationOption,
        selectLocation = false,
        selectInviteesType, // OPTIONAL
        selectCallType,
        organizerIncluded = false,
        selectColour = false,
        selectOutSiderUser = false,
        enterEmail, // OPTIONAL
        enterDescription // OPTIONAL (string)
    }){
        await this.addEvent.click();

        /* ---------- Event Type ---------- */
        const eventTabs = {
            Member: this.membersTab,
            Personal: this.personalTab
        };
        if (!eventTabs[eventType]) {
            throw new Error(`Invalid event type: ${eventType}`);
        }
        await eventTabs[eventType].click();

        /* ---------- Event Name ---------- */
        await this.enterEventName.fill(eventName);

        /* ---------- Full Day Toggle ---------- */
        if (isFullDay) {
            await this.fullDayToggle.click();
        }

        /* ---------- Date Selection ---------- */
        await this.startDate.click();
            await this.page.locator('.ant-picker-header-next-btn').click(); // next month
            await this.page.locator('.ant-picker-cell:not(.ant-picker-cell-disabled) >> text=25').click();

        if (!isFullDay) {
            await this.endTime.fill('11:45 PM');
            await this.page.keyboard.press('Enter');
        }
        
        /* ---------- Repeat ---------- */
        const validRepeatOptions = ['Do Not Repeat', 'Every Day', 'Every Week', 'Every Month', 'Every Year'];
        if (repeatStatusOption != null) {

            if(!validRepeatOptions.includes(repeatStatusOption)){
                throw new Error(`Entered invalid repeatStatusOption: ${repeatStatusOption}`);
            }

            await this.repeatstatus.click();
            await this.selectDropdownByText(repeatStatusOption);

            if (repeatStatusOption !== 'Do Not Repeat') {
                await this.page.locator('//span[text()="Ok"]').click();
            }
        }

        /* ---------- Notification ---------- */
        const validNotifications = ['None', 'One Day Before', 'One Week Before', '5 Minute Before', '10 Minute Before', '15 Minute Before', '30 Minute Before', '1 Hour Before'];
        if(notificationOption != null){
            if(!validNotifications.includes(notificationOption)){
                throw new Error(`Entered invalid notificationOption: ${notificationOption}`);
            }

            await this.notification.click();
            await this.selectDropdownByText(notificationOption);
        }
         
        /* ---------- Location ---------- */
        if (selectLocation) {
            await this.location.click();
            await this.page.waitForTimeout(3000);
            await this.selectButton.click();
        }
  
    /* ======================================================
                MEMBER-ONLY SECTION
     ====================================================== */
        /* ---------- Invitees ---------- */
        if(eventType === 'Member'){

            /* ---------- Invitees ---------- */
            if(selectInviteesType != null){
                await this.invitees.click();
                const inviteesActions = {
                    'All Department': async () => await this.allDepartmentTab.click(),
                    'Select User': async () => {
                        await this.selectUserTab.click();
                        await this.page.locator('div.ant-select-selection-overflow').click();
                        await this.page.keyboard.press('Enter');
                    }
                };
                if (!inviteesActions[selectInviteesType]) {
                throw new Error(`Invalid invitees type: ${selectInviteesType}`);
               }
               await inviteesActions[selectInviteesType]();
               await this.selectButton.click(); 
            }

            /* ---------- Call Type ---------- */
            const validCallTypeOption = ['Audio Call', 'Video Call', 'Meet In Person & Call'];
            if(selectCallType !=null){
                if(!validCallTypeOption.includes(selectCallType)){
                throw new Error(`Entered invalid notificationOption: ${selectCallType}`);
                }

                await this.callType.click();
                await this.selectDropdownByText(selectCallType);
            }

            /* ---------- Organizer ---------- */
            if(organizerIncluded) {
                await this.page.locator('#createUser_exclude').check();
            }

             /* ---------- External User ---------- */
            if (selectOutSiderUser == null) return; //skip if not passed

             if (selectOutSiderUser === true){
                if(!enterEmail){
                    throw new Error('enterEmail is required when selectOutSiderUser is true');
                }

                await this.externalUser.click();
                const emailInput = this.page.locator('[placeholder="Type Email..."]');
                await emailInput.waitFor({ state: 'visible', timeout: 10000 });
                await emailInput.fill(enterEmail);

                await this.page.locator('div.divide-y').first().click();
                const submitButton = this.page.locator('//div[@class="ant-modal-footer"]//span[text()="Submit"]');
                await submitButton.waitFor({ state: 'visible', timeout: 5000 });
                await submitButton.click();
             }    
        }
        
        /* ---------- Color ---------- */
        if (selectColour) {
            await this.chooseColor();
        }

        /* ---------- Description ---------- */
        if(enterDescription !=null){
            await this.descriptionInput.fill(enterDescription);
        } 
         
        /* ---------- Submit ---------- */
        await this.submitCalendar();              
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

    async submitCalendar(){
        await this.submit.click();
        const button = this.page.locator('div.ant-modal-footer div button');
        if (await button.isVisible()) {
            await button.waitFor({ state: 'visible', timeout: 10000 });
            await button.click();
        }
        await this.page.waitForTimeout(5000); 
    }

    async deleteCalender(tabName){
        await this.createdEvent.click();

        if(tabName == 'Member'){
            await this.page.locator('//div[@title="Invites-Sent"]').click();
        } else if (tabName === 'Personal') {
            await this.page.locator('//div[@title="Personal"]').click();
        }

        await this.delete.nth(1).click();
        await this.page.waitForTimeout(2000);
        if (await this.allEvent.isVisible()) {
            await this.allEvent.click();
        }
        await this.page.locator('div.ant-modal-footer button').last().click();
        await this.page.waitForTimeout(5000);
        await this.page.locator('div.ant-modal-content button[aria-label="Close"]').first().click();
    }
       
}