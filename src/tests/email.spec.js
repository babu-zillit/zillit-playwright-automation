import { test } from '@playwright/test';
import Email from "../pages/email";
import UploadMedia from "../actions/media-uploader";
import logger from "../utils/loggerUtils";
import { execPath } from 'process';

test.describe('Email', () => {
    let context;
    let page;
    let uploadmedia;
    let emailPage;

    test.beforeAll(async ({ browser }) => {
        logger.info("browser is launching");
        context = await browser.newContext();
        page = await context.newPage();

        await page.goto('/home');
        
        uploadmedia = new UploadMedia(page);
        emailPage = new Email(page);

        logger.info('open the project')
        await uploadmedia.clickProjectName();
        await emailPage.clickEmailTab();
    });

    test.afterAll(async () => {
        logger.info('close browser');
        await context.close();
    });

    test.describe('Send Email', () => {

        test('Verify that the user can send an email with message', async () => {
            await emailPage.clickNewEmail();
            await emailPage.writeTextInBody();
            await emailPage.sendEmail('Email has been sent');
        }); 
        test('verify user can send email with media', async () => {
            await emailPage.clickNewEmail();
            await emailPage.writeTextInBody();
            await emailPage.sendMediaEmail('Email has been sent');
        });
        test('Verify that the user can send a reply email.', async () => {
            await emailPage.reply('Email has been sent');
        });
        test('Verify that the user can send reply all email', async () => {
            await emailPage.replyAll('Email has been sent');
        });
        test('Verify that the user can forward an email.', async () => {
            await emailPage.forward('Email has been sent');
        });
        test('Verify that the user can delete an email.', async () => {
            await emailPage.delete('Email has been moved to Trash successfully.');
        });
    
    });

    test.describe('Move Email', () => {

        test('Verify that the user can move an email from Sent to Inbox.', async () => {
            await emailPage.moveToInboxFromSent('Email has been moved to INBOX successfully.');
        });
        test('Verify that the user can move an email from Inbox to Junk.', async () => {
            await emailPage.moveToJunkFromInbox('Email has been moved to Junk successfully.');
        });
        test('Verify that the user can move an email from Junk to Trash.', async () => {
            await emailPage.moveToTrashFromJunk('Email has been moved to Trash successfully.');
        });
        test('Verify that the user can move an email from Trash to Distributed Mail.', async () => {
            await emailPage.moveToDistributedMailFromTrash('Email has been moved to Distributed Mails successfully.');
        });

    });    

     test.describe('Email Folder', () => {
        test('verify that user can create folder', async () => {
            await emailPage.createFolder('Email folder has been saved successfully.');
        });
        test('verify that user can create the folder with same name', async () => {
            await emailPage.createFolderWithSameName('A folder with this name already exists. Please choose a unique name.');
        });
        test('verify that user can edit the folder name', async () => {
            await emailPage.editFolder('Email folder renamed successfully.');
        });
        test('verify that user can delete folder', async () => {
            await emailPage.deleteFolder('Email Folder deleted successfully.');
        });
    
    });

    test.describe('Signature', () => {

        test('verify that user can create the signature', async () => {
            await emailPage.addSignature('Email signature saved successfully.');
        });
        test('verify that user can edit the signature', async () => {
            await emailPage.editSignature('Email signature updated successfully.');
        });
        test('verify that user can delete the signature', async () => {
            await emailPage.deleteSignature();
        });
        test('verify that user can create the signature again', async () => {
            await emailPage.addSignature('Email signature saved successfully.');
        });

    
    });

    test.describe('BCC Preset', () => {
        
        test('verify that user can add the BCC Preset', async () => {
            await emailPage.addBCCPreset('Bcc preset has been updated successfully.');
        });
        test('verify that user can delete the BCC preset', async () => {
            await emailPage.deleteBCCPreset('Bcc preset has been updated successfully.');
        });
        test('verify that user can add BCC preset again', async () => {
            await emailPage.addBCCPreset('Bcc preset has been updated successfully.');
        });
    
    });

    test.describe('Create Email Group', () => {
        
        test('Verify that user can create the email group', async () => {
            await emailPage.createEmailGroup();
        });
        test('Verify that user can delete the email group', async () => {
            await emailPage.deleteEmailGroup('Email Group has been deleted successfully');
        });
        test('Verify that user can create the email group again', async () => {
            await emailPage.createEmailGroup();
        });
    
    });

    test.describe('Email Setup Externally', () => {
        
        test('verify that user can edit the password', async () => {
            await emailPage.emailSetUpExternally('Email password has been updated successfully');
        });
    
    });

    test.describe('Send Email to Group', () => {
        test('verify that user can send group email', async () => {
            await emailPage.sendEmailToGroup('Email has been sent');
        });

    });

    test.describe.only('Send Draft Email', () => {
        test('verify that user can send email from draft', async () => {
            await emailPage.clickNewEmail();
            await emailPage.writeTextInBody();
            await emailPage.saveDraftEmail('Draft updated successfully');
            await emailPage.sendDraftEmail('Email has been sent');
        });
    });



});

  /**
   * ENV_TYPE=qa npx playwright test src/tests/10_emailTest.spec.js --project=chromium --headed
   * 
   * ENV_TYPE=production npx playwright test src/tests/email.spec.js --project=chromium --headed
   */ 
