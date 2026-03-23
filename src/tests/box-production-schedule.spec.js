import { test } from '@playwright/test';
import BoxProductionSchedule from "../pages/box-production-schedule";
import UploadMedia from "../actions/media-uploader";

test.describe('Box Production Schedule', () => {
    let context;
    let page;
    let uploadmedia;
    let boxProductionSchedulePage;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        boxProductionSchedulePage = new BoxProductionSchedule(page);

        await uploadmedia.clickProjectName();
        await boxProductionSchedulePage.openBoxProductionScheduleTab();
    });

    test.afterAll(async () => {
        await context.close();
    });



    test.describe('Box Production Schedule', () => {

        test('verify create', async () => {

            const eventName = 'Babu';
            const enterNote = 'This is meeting for production';
            const successPopupMsg = 'The note for the box-schedule date has been distributed successfully.';

            await boxProductionSchedulePage.createNewEvent(eventName, enterNote, successPopupMsg);
        });

        test('verify edit', async () => {

            const eventName = 'Babu1';
            const enterNote = 'This is meeting changed now';
            const successPopupMsg = 'The note for the box-schedule date has been distributed successfully.';

            await boxProductionSchedulePage.editEvent(eventName, enterNote, successPopupMsg);
        });

        test('verify delete', async () => {

            const successPopupMsg = 'The note for the box-schedule date has been deleted successfully.';

            await boxProductionSchedulePage.deleteEvent(successPopupMsg);
        });

        test('verify create again', async () => {

            const eventName = 'Babu';
            const enterNote = 'This is meeting for production';
            const successPopupMsg = 'The note for the box-schedule date has been distributed successfully.';

            await boxProductionSchedulePage.createNewEvent(eventName, enterNote, successPopupMsg);
        });

    });   

    test.describe.only('Create Schedule', () => {

        test('verify create schedule', async () => {

            const enterSchedule = 'Party';
            await boxProductionSchedulePage.createSchedule(enterSchedule);
            await boxProductionSchedulePage.selectStartDate();
        });

    });   

});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/purchase-orderTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/box-production-schedule.spec.js --project=chromium --headed
   */ 
