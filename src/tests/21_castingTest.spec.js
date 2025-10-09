import { test } from '@playwright/test';
import Casting from "../pages/casting";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";

test.describe('Casting', () => {
    let context;
    let page;
    let uploadmedia;
    let castingPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        castingPage = new Casting(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await castingPage.castingMainTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });



    test.describe('Selects Tab', () => {

        test('verify casting upload, open the folder, and view the image', async () => {

             await castingPage.uploadCasting('1','Police','Salman','male', 'For the villain role');
             await castingPage.verifypopup('Cast photograph(s) has been added successfully.');
             await castingPage.distribute();
             await castingPage.openFolderFirstScreen();
             await castingPage.openFolderSecondScreen();
             await castingPage.viewImages(); 
        }); 
        
        test('verify move to shortlist cast folder from the character screen', async () => {

            await castingPage.dropDownArrowAction('selectsTab', 'Move to Shortlist');
            await castingPage.verifypopup('Cast has been moved successfully.');
        });

        test('verify move to finals cast folder from the character screen', async () => {

            await castingPage.dropDownArrowAction('selectsTab', 'Move to Final');
            await castingPage.verifypopup('Cast has been moved successfully.');
        });

        test('verify delete cast folder from shortlist', async () => {

            await castingPage.dropDownArrowAction('shortlistTab', 'Delete', true);
            await castingPage.verifypopup('Cast photograph has been deleted successfully.');
        });

        test('verify delete cast folder from final', async () => {

            await castingPage.dropDownArrowAction('finalsTab', 'Delete', true);
            await castingPage.verifypopup('Cast photograph has been deleted successfully.');
        });

        test('verify move to shortlist media from the media screen', async () => {

            await castingPage.selectsTab();
            await castingPage.moveToFromMediaScreen('Move to Shortlist');
            await castingPage.verifypopup('Cast has been moved successfully.');
            await castingPage.closeImageWindow();
        });

        test('verify move to finals media from the media screen', async () => {

            await castingPage.moveToFromMediaScreen('Move to Final');
            await castingPage.verifypopup('Cast has been moved successfully.');
            await castingPage.closeImageWindow();
        });

        test('verify edit cast details from the media screen', async () => {

            await castingPage.editCastDeatils('55','ISI','Rocky', 'For the villain role');
            await castingPage.verifypopup('Cast photograph has been saved successfully.');
        });

        test('verify forward cast and image reply', async () => {

            await castingPage.forwardCast();
            await castingPage.verifypopup('Message forwarded successfully');
            //await castingPage.imageReplys();
            await castingPage.closeImageWindow();
        });
    
    });

    test.describe.only('Send Message', () => {

        test('verify send a message', async () => {
            await castingPage.chat();
            await uploadmedia.sendMessage();
        });  
    
        test('verify edit the message', async () => {
            await uploadmedia.edit();
        });

        test('verify read by status on message', async () => {
            await uploadmedia.readBy();
        });

        test('verify forward the message', async () => {
            await uploadmedia.forward();
        });

        test('verify reply to the message', async () => {
            await uploadmedia.reply();
        });

        test('verify the edit the reply message', async () => {
            await uploadmedia.editReply();
        });

        test('verify the read by status on reply message', async () => {
            await uploadmedia.readByReply();
        });

        test('verify the delete the reply message', async () => {
            await uploadmedia.deleteReply();
        });

        test('verify the forward to remote project', async () => {
            await uploadmedia.forwardRemoteProject();
        });

        test('verify the delete message', async () => {
            await uploadmedia.delete();
        });

    });

    test.describe('Shortlist Tab', () => {

        test('verify delete all cast folder from shortlist', async () => {

            await castingPage.shortlistTab();
            await castingPage.distribute();
            await castingPage.deleteFolderIfAvailable();
        });

        test('verify casting upload, open the folder, and view the image', async () => {

            await castingPage.shortlistTab();
            await castingPage.uploadCasting('2','IPS','Deepika','female', 'for the police role');
            await castingPage.verifypopup('Cast photograph(s) has been added successfully.');
            await castingPage.openFolderFirstScreen();
            await castingPage.openFolderSecondScreen();
            await castingPage.viewImages(); 
        });

        test('verify move to finals cast folder from the character screen', async () => {

            await castingPage.dropDownArrowAction('shortlistTab', 'Move to Final');
            await castingPage.verifypopup('Cast has been moved successfully.');
        });

        test('verify edit cast details from the media screen', async () => {

            await castingPage.shortlistTab();
            await castingPage.editCastDeatils('66','Raw','Sam', 'For the villain role');
            await castingPage.verifypopup('Cast photograph has been saved successfully.');
        });

        test('verify forward cast and image reply', async () => {

            await castingPage.shortlistTab();
            await castingPage.forwardCast();
            await castingPage.verifypopup('Message forwarded successfully');
            await castingPage.closeImageWindow();
        });    
    
    });

    test.describe('Finals Tab', () => {

        test('verify delete all cast folder from final', async () => {

            await castingPage.finalsTab();
            await castingPage.distribute();
            await castingPage.deleteFolderIfAvailable();
        });

        test('verify casting upload, open the folder, and view the image', async () => {
            await castingPage.finalsTab();
             await castingPage.uploadCasting('3','Professor','Kaitrina','female', 'for the philosophy role');
             await castingPage.verifypopup('Cast photograph(s) has been added successfully.');
             await castingPage.openFolderFirstScreen();
             await castingPage.openFolderSecondScreen();
             await castingPage.viewImages(); 
        }); 
        
         test('verify forward cast and image reply', async () => {

            await castingPage.finalsTab();
            await castingPage.forwardCast();
            await castingPage.verifypopup('Message forwarded successfully');
            await castingPage.closeImageWindow();
        }); 
 
    });


    test.describe('Generate pdf', () => {

        test('verify user generate the pdf from finals', async () => {
            await castingPage.finalsTab();
            await castingPage.generatePDF();
        });
    });


});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/21_castingTest.spec.js --project=chromium --headed
   */ 
