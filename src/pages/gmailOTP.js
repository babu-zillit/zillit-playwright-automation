import { test } from '@playwright/test';
import fs from 'fs';
import { google } from 'googleapis';

export default class GmailOTP {
    constructor(page){
        this.page = page;
    }

    async verifyEmailWithOtp(){
        const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
        const GMAIL_ID = 'babu.yadav@zillit.com';

        // 1️⃣ Send OTP (email is pre-filled)
        await this.page.locator('[type="email"]').fill(GMAIL_ID);
        await this.page.locator('#email button').click();

        // 2️⃣ Gmail auth setup
        const credentials = JSON.parse(fs.readFileSync('credentials.json'));
        const { client_secret, client_id, redirect_uris } = credentials.web;

        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
        );

        // 3️⃣ Token handling
        if (!fs.existsSync('token.json')) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this URL:', authUrl);
        throw new Error('Token not found. Authorize and rerun the test.');
       }

       oAuth2Client.setCredentials(JSON.parse(fs.readFileSync('token.json')));
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

        // 4️⃣ Wait & fetch OTP mail
        await this.page.waitForTimeout(5000);

        const res = await gmail.users.messages.list({
            userId: 'me',
            q: 'subject:OTP',
            maxResults: 1,
        });

        if (!res.data.messages || res.data.messages.length === 0) {
            throw new Error('No OTP email found.');
        }
            const msgId = res.data.messages[0].id;
            const msg = await gmail.users.messages.get({
                userId: 'me',
                id: msgId,
            });

            const body = Buffer.from(
                msg.data.payload.parts[0].body.data,
                'base64'
            ).toString('utf-8');


            const otpMatch = body.match(/\d{4,6}/);
                if (!otpMatch) {
                throw new Error('OTP not found in email body.');
            }

            const otp = otpMatch[0];

             // 5️⃣ Enter OTP & verify
            await this.page.fill('[inputmode="numeric"]', otp);
            await this.page.waitForTimeout(5000);
    }

}   
