//src/tests/calendarTest.spec.js
import { test } from '@playwright/test';
import Calendar from "../pages/calendar";
import UploadMedia from "../pages/upload-media";
import Logger from "../utils/loggerUtils";

 test('verify the calendar test', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/home');
    const uploadMedia = new UploadMedia(page);
    const calendar = new Calendar(page);
    console.log("calendar class execution start");

    await uploadMedia.clickOnProjectName();
    await calendar.calendar();
    await calendar.selectTime();
    
 });

  /**
   * ENV_TYPE=qa npx playwright test src/tests/calendarTest.spec.js --project=chromium --headed
   * ENV_TYPE=production npx playwright test src/tests/calendarTest.spec.js --project=chromium --headed
   * ENV_TYPE=qa npx playwright test src/tests/calendarTest.spec.js --project=firefox --headed
   * ENV_TYPE=qa npx playwright test src/tests/calendarTest.spec.js --project=webkit --headed
   * ENV_TYPE=qa npx playwright test src/tests/calendarTest.spec.js
   * ENV_TYPE=qa npx playwright test src/tests/calendarTest.spec.js --project=chromium
   * 
  */ 