
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export default class ContinuityScriptNotes {

    constructor(page) {
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');

        this.attachment = page.locator('[class="css-2iw4eq ant-float-btn ant-float-btn-primary ant-float-btn-circle"]');
        this.continuation = page.locator('//div[contains(@class,"justify-evenly")]//button//span[text()=" Continuation "]');
        this.newButton = page.locator('//div[contains(@class,"justify-evenly")]//button//span[text()=" New "]');
        this.yesButton = page.locator('//div[contains(@class,"justify-evenly")]//button//span[text()=" Yes "]');

        this.continuityNotesTileName = page.locator('//div[contains(@class,"mt-4")]//img');
        this.enterEpisode = page.locator('#episode');
    }

    async continuityScriptNotesTab() {
        await this.tools.click();
        await this.page.locator('div.ant-card-body').getByText('Continuity Script Notes').click();
    }

    async selectedTakesTab() {
        await this.continuityNotesTileName.nth(0).click();
    }

    async dailyProgressNotesTab() { 
        await this.continuityNotesTileName.nth(1).click();
    }

    async continuityNotesTab() {
        await this.continuityNotesTileName.nth(2).click();
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


    async sendScriptConfirmation(){
        await this.enterEpisode.fill('9');
        await this.page.locator('//div[contains(@class,"flex justify-end")]//button').first().click();
    }

    async uploadDocument() {
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
 
        //await this.page.locator('text=Send').click();
        await this.page.locator('//div[contains(@class,"text-end")]//button').first().click();

        await this.sendScriptConfirmation();

        await this.page.locator('[data-icon="loading"]').waitFor({ state: 'hidden', timeout: 15000 });
    }


}