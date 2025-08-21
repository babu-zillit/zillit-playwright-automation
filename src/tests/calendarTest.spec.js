//src/tests/calendarTest.spec.js
import { test } from '@playwright/test';
import Calendar from "../pages/calendar";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Calendar page: ', () => {
    let context;
    let page;
    let uploadmedia;
    let calendar;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        calendar = new Calendar(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    test.describe('Member calendar', () => {

        test('verify the create the new event for memebrs', async () => {
            await calendar.createEventForMember();
            await calendar.deleteCalenderEvent('member');
        }); 
    
    });

    test.describe('Member calendar full day', () => { 
        
        test('for memebrs for full day', async () => {
            await calendar.createEventForMemberForFullDay();
            await calendar.deleteCalenderEvent('member');
        });
    
    });

    test.describe('Personal Calendar', () => { 
        
        test('personal event', async () => {
            await calendar.createEventForPersonal();
            await calendar.deleteCalenderEvent('personal');
        });
    
    });

    test.describe('Personal Calendar full day', () => { 
        
        test('personal event for full day', async () => {
            await calendar.createEventForPersonalFullDay();
            await calendar.deleteCalenderEvent('personal');
        });
    
    });

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/calendarTest.spec.js --project=chromium --headed
   */ 
