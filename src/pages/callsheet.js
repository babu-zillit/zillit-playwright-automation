import { expect } from '@playwright/test';
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export default class CallSheet {

    constructor(page){
        this.page = page;

        this.callsheetTab = page.locator('text=Call Sheet');

        this.attachment = page.locator('[class="css-2iw4eq ant-float-btn ant-float-btn-primary ant-float-btn-circle"]');
        this.continuation = page.locator('//div[contains(@class,"justify-evenly")]//button//span[text()=" Continuation "]');
        this.newButton = page.locator('//div[contains(@class,"justify-evenly")]//button//span[text()=" New "]');
        this.yesButton = page.locator('//div[contains(@class,"justify-evenly")]//button//span[text()=" Yes "]');
    }


    async clickCallSheet(){
        await this.callsheetTab.click();
    }


    async clickContinuation(){
        await this.continuation.click();
    }


    async clickNew(){
        await this.newButton.click();
        await this.yesButton.click();
    }


    async clickAttachment(){
        await this.attachment.click();
    }


    async uploadDocumentByClickingContinuation(){
        await this.clickAttachment();
        await this.clickContinuation();
        await this.uploadDocument();
    }


    async uploadDocumentByClickingNew(){
        await this.clickAttachment();
        await this.clickNew();
        await this.uploadDocument();
        await this.page.waitForTimeout(3000);
    }


    async uploadDocument() {
       // await this.page.waitForTimeout(2000);
        const filePath = '/Users/babuyadav/Desktop/babu.pdf';

        const appleScript = `
            tell application "System Events"
            delay 1
            keystroke "G" using {command down, shift down}
            delay 1
            keystroke "${filePath}"
            delay 1
            key code 36
            delay 1
            key code 36
            end tell
        `;

        // 🔧 Save AppleScript to a temp file
        const tempScriptPath = path.join(os.tmpdir(), 'uploadFile.scpt');
        await fs.writeFile(tempScriptPath, appleScript);

        const runAppleScript = () => {
            return new Promise((resolve, reject) => {
            exec(`osascript ${tempScriptPath}`, (error, stdout, stderr) => {
                fs.unlink(tempScriptPath); // cleanup
                if (error) reject(error);
                else resolve(stdout);
            });
            });
        };

        try {
            await runAppleScript();
            console.log('✅ AppleScript ran successfully');
        } catch (err) {
            console.error('❌ AppleScript error:', err.message);
            throw err;
        }
 
        await this.page.locator('#upload_document_send_script_button').click();

        await this.page.locator('[data-icon="loading"]').waitFor({ state: 'hidden', timeout: 15000 });
        //await this.page.waitForTimeout(5000);
    }

}