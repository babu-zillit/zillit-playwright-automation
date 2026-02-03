//src/tests/calendarTest.spec.js
import { test } from '@playwright/test';
import CalendarEvent from "../pages/calendarEvent";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Calendar', () => {
    let context;
    let page;
    let uploadmedia;
    let calendarPage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('/home');
        uploadmedia = new UploadMedia(page);
        calendarPage = new CalendarEvent(page);
        await uploadmedia.clickProjectName();
        await calendarPage.clickCalendarTab();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test.describe('Member Calendar', () => {

        test('Verify that user can create a event by filling all option', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu1',
                        isFullDay: false,
                        repeatStatusOption: 'Every Day',
                        notificationOption: '5 Minute Before',
                        selectLocation: true,
                        selectInviteesType: 'Select User',
                        selectCallType: 'Audio Call',
                        organizerIncluded: true,
                        selectColour: true,
                        selectOutSiderUser: true,
                        enterEmail: 'bhavik@zillit.com',
                        enterDescription: 'This is member event'
                    });
        });
        test('Verify that user can create a event by filling all option with changing the repeat status', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu2',
                        isFullDay: false,
                        repeatStatusOption: 'Every Week',
                        notificationOption: '10 Minute Before',
                        selectLocation: true,
                        selectInviteesType: 'Select User',
                        selectCallType: 'Audio Call',
                        organizerIncluded: true,
                        selectColour: true,
                        selectOutSiderUser: true,
                        enterEmail: 'bhavik@zillit.com',
                        enterDescription: 'This is member event'
                    });

        });
        test('Verify that user can create an event by filling event name, Invitees Type: all department, Call Type: audio call', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu3',
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call'
                    });     
        }); 
        test('Verify that user can create an event by filling event name, select user, audio call', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu4',
                        selectInviteesType: 'Select User',
                        selectCallType: 'Audio Call'
                    });
                    
        });
        test('Verify that user can create an event by filling event name, Invitees Type: select user, Call Type: video call', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu5',
                        selectInviteesType: 'Select User',
                        selectCallType: 'Video Call'
                    });
                    
        });
        test('Verify that user can create an event by filling event name, all department, video call', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu6',
                        selectInviteesType: 'All Department',
                        selectCallType: 'Video Call'
                    });
                    
        });
        test('Verify that user can create an event by filling event name, all department, audio call, every day', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu7',
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call',
                        repeatStatusOption: 'Every Day',
                    });
                    
        });
        test('Verify that user can create an event by filling event name, all department, audio call, every day, 15 min before', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu8',
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call',
                        repeatStatusOption: 'Every Day',
                        notificationOption: '15 Minute Before'
                    });
                    
        });
        test('Verify that user can create an event by filling event name, all department, audio call, every week, 5 min before', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu9',
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call',
                        repeatStatusOption: 'Every Week',
                        notificationOption: '5 Minute Before',
                        selectLocation: true,
                    });
                    
        });
        test('Verify that user can create an event by filling event name, all department, video call, every week, 5 min before, organizer included', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu10',
                        selectInviteesType: 'All Department',
                        selectCallType: 'Video Call',
                        repeatStatusOption: 'Every Week',
                        notificationOption: '5 Minute Before',
                        selectLocation: true,
                        organizerIncluded: true,
                    });

        });
        test('Verify that user can create an event by filling event name, all department, audio call, every week, 10 min before, organizer included, select location, select coulour', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu11',
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call',
                        repeatStatusOption: 'Every Week',
                        notificationOption: '10 Minute Before',
                        selectLocation: true,
                        organizerIncluded: true,
                        selectColour: true,
                    });

        });
        test('Verify that user can create an event by filling event name, all department, audio call, every week, 10 min before, organizer included, select location, select coulour, select outsider', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu12',
                        selectInviteesType: 'All Department',
                        selectCallType: 'Video Call',
                        repeatStatusOption: 'Every Day',
                        notificationOption: '10 Minute Before',
                        selectLocation: true,
                        organizerIncluded: true,
                        selectColour: true,
                        selectOutSiderUser: true,
                        enterEmail: 'bhavik@zillit.com'
                    });

        });
            
    });    

    test.describe('Member Calendar Full Day', () => {

        test('Verify that user can create a event by filling all option', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu1',
                        isFullDay: true,
                        repeatStatusOption: 'Every Day',
                        notificationOption: 'One Day Before',
                        selectLocation: true,
                        selectInviteesType: 'Select User',
                        selectCallType: 'Audio Call',
                        organizerIncluded: true,
                        selectColour: true,
                        selectOutSiderUser: true,
                        enterEmail: 'bhavik@zillit.com',
                        enterDescription: 'This is member event'
                    });
        });
        test('Verify that user can create a event by filling all option with changing the repeat status', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu2',
                        isFullDay: true,
                        repeatStatusOption: 'Every Week',
                        notificationOption: 'One Day Before',
                        selectLocation: true,
                        selectInviteesType: 'Select User',
                        selectCallType: 'Audio Call',
                        organizerIncluded: true,
                        selectColour: true,
                        selectOutSiderUser: true,
                        enterEmail: 'bhavik@zillit.com',
                        enterDescription: 'This is member event'
                    });
        });
        test('Verify that user can create an event by filling event name, Invitees Type: all department, Call Type: audio call', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu3',
                        isFullDay: true,
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call'
                    });     
        }); 
        test('Verify that user can create an event by filling event name, Invitees Type: select user, Call Type: audio call', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu4',
                        isFullDay: true,
                        selectInviteesType: 'Select User',
                        selectCallType: 'Audio Call'
                    });            
        });
        test('Verify that user can create an event by filling event name, Invitees Type: select user, Call Type: video call', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu5',
                        isFullDay: true,
                        selectInviteesType: 'Select User',
                        selectCallType: 'Video Call'
                    });                 
        });
        test('Verify that user can create an event by filling event name, Invitees Type: all department, Call Type: video call', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu6',
                        isFullDay: true,
                        selectInviteesType: 'All Department',
                        selectCallType: 'Video Call'
                    });             
        });
        test('Verify that user can create an event by filling event name, Repeat Status: Every Day, Invitees Type: all department, Call Type: audio call', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu7',
                        isFullDay: true,
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call',
                        repeatStatusOption: 'Every Day',
                    });            
        });
        test('Verify that user can create an event by filling event name, Repeat Status: Every Day, Invitees Type: all department, Call Type: audio call, Notification: One Day Before', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu8',
                        isFullDay: true,
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call',
                        repeatStatusOption: 'Every Day',
                        notificationOption: 'One Week Before'
                    });               
        });
        test('Verify that user can create an event by filling event name, Repeat Status: Every Week, Invitees Type: all department, Call Type: audio call, Notification: One Week Before, Select location', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu9',
                        isFullDay: true,
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call',
                        repeatStatusOption: 'Every Week',
                        notificationOption: 'One Week Before',
                        selectLocation: true,
                    });            
        });
        test('Verify that user can create an event by filling event name, Repeat Status: Every Week, Invitees Type: all department, Call Type: audio call, Notification: One Week Before, location, organizer included', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu10',
                        isFullDay: true,
                        selectInviteesType: 'All Department',
                        selectCallType: 'Video Call',
                        repeatStatusOption: 'Every Week',
                        notificationOption: 'One Week Before',
                        selectLocation: true,
                        organizerIncluded: true,
                    });
        });
        test('Verify that user can create an event by filling event name, Repeat Status: Every Week, Invitees Type: all department, Call Type: audio call, Notification: One Week Before, location, organizer included, colour', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu11',
                        isFullDay: true,
                        selectInviteesType: 'All Department',
                        selectCallType: 'Audio Call',
                        repeatStatusOption: 'Every Week',
                        notificationOption: 'One Day Before',
                        selectLocation: true,
                        organizerIncluded: true,
                        selectColour: true,
                    });
        });
        test('Verify that user can create an event by filling event name, Repeat Status: Every Week, Invitees Type: all department, Call Type: audio call, Notification: One Week Before, location, organizer included, colour, outsider', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Member',
                        eventName: 'Babu12',
                        isFullDay: true,
                        selectInviteesType: 'All Department',
                        selectCallType: 'Video Call',
                        repeatStatusOption: 'Every Day',
                        notificationOption: 'One Day Before',
                        selectLocation: true,
                        organizerIncluded: true,
                        selectColour: true,
                        selectOutSiderUser: true,
                        enterEmail: 'bhavik@zillit.com'
                    });
        });      
            
    });    

    test.describe('Personal Calendar', () => {

        test('Verify that user can create a event by filling all option', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu1',
                        repeatStatusOption: 'Every Day',
                        notificationOption: '5 Minute Before',
                        selectLocation: true,
                        selectColour: true,
                        enterDescription: 'This is member event'
                    });
        });
        test('Verify that user can create a event by filling event name, repeat status: every day', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu2',
                        repeatStatusOption: 'Every Day',
                    });

        });
        test('Verify that user can create a event by filling event name, repeat status: every day, notification: 5 min before', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu3',
                        repeatStatusOption: 'Every Day',
                        notificationOption: '5 Minute Before',
                    });     
        }); 
        test('Verify that user can create a event by filling event name, repeat status: every day, notification: 5 min before, location', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu4',
                        repeatStatusOption: 'Every Day',
                        notificationOption: '5 Minute Before',
                        selectLocation: true,
                    });
                    
        });
        test('Verify that user can create a event by filling event name, notification: 5 min before, location, colour, description', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu5',
                        notificationOption: '5 Minute Before',
                        selectLocation: true,
                        selectColour: true,
                        enterDescription: 'This is member event'
                    });
                    
        });
        test('Verify that user can create a event by filling event name, location, location, colour, description', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu6',
                        selectLocation: true,
                        selectColour: true,
                        enterDescription: 'This is member event'
                    });
                    
        });
            
    });    

    test.describe('Personal Calendar Full Day', () => {

        test('Verify that user can create a event by filling all option', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu1',
                        isFullDay: true,
                        repeatStatusOption: 'Every Day',
                        notificationOption: 'One Week Before',
                        selectLocation: true,
                        selectColour: true,
                        enterDescription: 'This is member event'
                    });
        });
        test('Verify that user can create a event by filling event name, repeat status: every day', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu2',
                        isFullDay: true,
                        repeatStatusOption: 'Every Week',
                    });

        });
        test('Verify that user can create a event by filling event name, repeat status: every day, notification: 5 min before', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu3',
                        isFullDay: true,
                        repeatStatusOption: 'Every Day',
                        notificationOption: 'One Day Before',
                    });     
        }); 
        test('Verify that user can create a event by filling event name, repeat status: every day, notification: 5 min before, location', async () => {
                    await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu4',
                        isFullDay: true,
                        repeatStatusOption: 'Every Week',
                        notificationOption: 'One Day Before',
                        selectLocation: true,
                    });
                    
        });
        test('Verify that user can create a event by filling event name, notification: 5 min before, location, colour, description', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu5',
                        isFullDay: true,
                        notificationOption: 'One Day Before',
                        selectLocation: true,
                        selectColour: true,
                        enterDescription: 'This is member event'
                    });
                    
        });
        test('Verify that user can create a event by filling event name, location, location, colour, description', async () => {
            await calendarPage.createCalendar({
                        eventType: 'Personal',
                        eventName: 'Babu6',
                        isFullDay: true,
                        selectLocation: true,
                        selectColour: true,
                        enterDescription: 'This is member event'
                    });
                    
        });
        
    }); 
    
    test.describe('Calendar Member Delete', () => {
        test('Verify that user can delete the member calendar event', async () =>{
            await calendarPage.deleteCalender('Member');
        });

    });

    test.describe('Calendar Personal Delete', () => {
        test('Verify that user can delete the personal calendar event', async () =>{
            await calendarPage.deleteCalender('Personal');
        });

    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/07_calendarTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/07_calendarTest.spec.js --project=chromium --headed
   */ 
