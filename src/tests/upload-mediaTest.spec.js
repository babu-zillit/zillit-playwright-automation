//src/tests/upload-mediaTest.spec.js
import { test } from '@playwright/test';
import UploadMedia from "../pages/upload-media";
import Logger from "../utils/loggerUtils";
// In test or page file
import { getValue } from '../utils/jsonUtil.js';

let context;
let page;
let uploadPage;

// test('send message and upload image, video, audio, document', async ({ page }) => {
//     test.setTimeout(60000);
//     await page.goto('/');
//     const uploadPage = new UploadMedia(page);

//     console.log("uploadMedia class execution start");

//     await uploadPage.clickOnProjectName();
    
//     await uploadPage.sendText("Hello, this is an automated test!");

//     await uploadPage.attachment();
//     await uploadPage.uploadImage('/Users/babuyadav/Desktop/babu.png');
//     await uploadPage.close();

//     await uploadPage.attachment();
//     await uploadPage.uploadVideo('/Users/babuyadav/Desktop/babu.mp4');
//     await uploadPage.close();

//     await uploadPage.attachment();
//     await uploadPage.uploadAudio('/Users/babuyadav/Desktop/babu.mp3');
//     await uploadPage.close();

//     await uploadPage.attachment();
//     await uploadPage.uploadDocument('/Users/babuyadav/Desktop/babu.pdf');
//     await uploadPage.close();

//     console.log("uploadMedia class execution done");
// });

  /**
   * ENV_TYPE=qa npx playwright test src/tests/upload-mediaTest.spec.js --project=chromium --headed
   * ENV_TYPE=qa npx playwright test src/tests/upload-mediaTest.spec.js --project=firefox --headed
   * ENV_TYPE=qa npx playwright test src/tests/upload-mediaTest.spec.js --project=webkit --headed
   * ENV_TYPE=qa npx playwright test src/tests/upload-mediaTest.spec.js
   * ENV_TYPE=qa npx playwright test src/tests/upload-mediaTest.spec.js --project=chromium
  */ 

test.describe('Upload media tests', () => {

  test.beforeAll(async ({ browser }) => {
    Logger.info("browser is launching");
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto('/');
    uploadPage = new UploadMedia(page);
    await uploadPage.clickOnProjectName();
  });

  test.afterAll(async () => {
    Logger.info('close browser');
    // Cleanup: close browser context
    await context.close();
  });

  test('send message', async () => {
      Logger.info('send message');
      await uploadPage.sendText("Hello, this is an automated test!");
      await uploadPage.clickSend();
      await page.waitForTimeout(5000);
      await uploadPage.moveElement();
      await uploadPage.delete();
      Logger.info('close send message');
  });

  test('upload image', async () => {
      Logger.info('upload image');
      await uploadPage.attachment();
      await uploadPage.uploadImage('/Users/babuyadav/Desktop/babu.png');
      await uploadPage.clickSendMedia();
      await uploadPage.moveElement();
      await uploadPage.delete();
      Logger.info('close send image');
  });

  test('upload video', async () => {
      Logger.info('upload video');
      await uploadPage.attachment();
      await uploadPage.uploadVideo('/Users/babuyadav/Desktop/babu.mp4');
      await uploadPage.clickSendMedia();
      await uploadPage.moveElement();
      await uploadPage.delete();
  });

  test('upload audio', async () => {
      Logger.info('upload audio');
      await uploadPage.attachment();
      await uploadPage.uploadAudio('/Users/babuyadav/Desktop/babu.mp3');
      await uploadPage.moveElement();
      await uploadPage.delete();
  });

  test('upload document', async () => {
      Logger.info('upload document');
      await uploadPage.attachment();
      await uploadPage.uploadDocument('/Users/babuyadav/Desktop/babu.pdf');
      await uploadPage.moveElement();
      await uploadPage.delete();
  });

  test.skip('verify delete', async () => {
    Logger.info('cursor move to hover element');
    await uploadPage.moveElement();
  })

  test.skip('read the data from json file', async () => {
    Logger.info('reading data from json file');
    console.log(getValue('user.name'));
    console.log(getValue('image.filePath'));
  })

  test.skip('setting module', async () => {
    Logger.info('verify edit profile');
    await uploadPage.settings();
  })

  test.skip('delete multiple', async () => {
    Logger.info('verify delete all');
    await uploadPage.deleteMultiple();
  })

});