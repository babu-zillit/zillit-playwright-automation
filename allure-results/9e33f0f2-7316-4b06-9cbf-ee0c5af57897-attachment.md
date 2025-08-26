# Test info

- Name: Bulletin >> Send Message >> verify read by status on message
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/3bulletinTest.spec.js:43:9

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://qa.zillit.com/", waiting until "load"

    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/3bulletinTest.spec.js:16:20
```

# Test source

```ts
   1 | //src/tests/bulletinTest.spec.js
   2 | import { test , expect } from '@playwright/test';
   3 | import logger from '../utils/loggerUtils';
   4 | import UploadMedia from '../actions/media-uploader';
   5 |
   6 | test.describe('Bulletin', () => {
   7 |     let context;
   8 |     let page;
   9 |     let uploadmedia;
   10 |
   11 |     test.beforeAll(async ({ browser }) => {
   12 |         logger.info("browser is launching");
   13 |         context = await browser.newContext();
   14 |         page = await context.newPage();
   15 |
>  16 |         await page.goto('/');
      |                    ^ Error: page.goto: Target page, context or browser has been closed
   17 |         
   18 |         uploadmedia = new UploadMedia(page);
   19 |         await uploadmedia.clickProjectName();
   20 |     });
   21 |
   22 |     test.afterAll(async () => {
   23 |         logger.info('close browser');
   24 |         await context.close();
   25 |     });
   26 |
   27 |     test.describe.skip('Delete all message if available' , () =>{
   28 |         test('delete all', async () => {
   29 |             await uploadmedia.deleteAll();
   30 |         });
   31 |     });
   32 |
   33 |     test.describe('Send Message', () => {
   34 |
   35 |         test('verify send a message', async () => {
   36 |             await uploadmedia.sendMessage();
   37 |         });  
   38 |     
   39 |         test('verify edit the message', async () => {
   40 |             await uploadmedia.edit();
   41 |         });
   42 |
   43 |         test('verify read by status on message', async () => {
   44 |             await uploadmedia.readBy();
   45 |         });
   46 |
   47 |         test('verify forward the message', async () => {
   48 |             await uploadmedia.forward();
   49 |         });
   50 |
   51 |         test('verify reply to the message', async () => {
   52 |             await uploadmedia.reply();
   53 |         });
   54 |
   55 |         test('verify the edit the reply message', async () => {
   56 |             await uploadmedia.editReply();
   57 |         });
   58 |
   59 |         test('verify the read by status on reply message', async () => {
   60 |             await uploadmedia.readByReply();
   61 |         });
   62 |
   63 |         test('verify the delete the reply message', async () => {
   64 |             await uploadmedia.deleteReply();
   65 |         });
   66 |
   67 |         test('verify the delete message', async () => {
   68 |             await uploadmedia.delete();
   69 |         });
   70 |
   71 |     });
   72 |     
   73 |
   74 |     test.describe('Send Image', () => {
   75 |         test('verify the send a image', async () => {
   76 |             await uploadmedia.clickAttachment();
   77 |             await uploadmedia.uploadImage();
   78 |             await uploadmedia.clickSendMedia();
   79 |         });
   80 |
   81 |         test('verify the readBy status', async () => {
   82 |             await uploadmedia.readBy();
   83 |         });
   84 |
   85 |         test('verify the forward', async () => {
   86 |             await uploadmedia.forward();
   87 |         });
   88 |
   89 |         test('verify the reply', async () => {
   90 |             await uploadmedia.reply();
   91 |         });
   92 |
   93 |         test('verify the edit reply', async () => {
   94 |             await uploadmedia.editReply();
   95 |         });
   96 |
   97 |         test('verify the readBy reply', async () => {
   98 |             await uploadmedia.readByReply();
   99 |         });
  100 |
  101 |         test('verify the delete reply', async () => {
  102 |             await uploadmedia.deleteReply();
  103 |         });
  104 |
  105 |         test('verify the delete image', async () => {
  106 |             await uploadmedia.delete();
  107 |         });
  108 |
  109 |     });
  110 |
  111 |     test.describe('Send Video', () => {
  112 |         test('verify the send a video', async () => {
  113 |             await uploadmedia.clickAttachment();
  114 |             await uploadmedia.uploadVideo();
  115 |             await uploadmedia.clickSendMedia();
  116 |         });
```