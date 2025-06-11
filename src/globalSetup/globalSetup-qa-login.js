// src/globalSetup-qa-login.js
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
const envFile = process.env.ENV_TYPE || 'qa';
dotenv.config({ path: path.resolve(`src/config/.env.${envFile}`) });

/**
 * Global setup function for staging
 */

(async () =>   {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(`${process.env.BASE_URL}`);
  
  await page.waitForURL('**/projects', { timeout: 150000 });
  await page.waitForTimeout(20000);

  await context.storageState({ path: './src/sessions/zillit-session-qa.json' });

  await browser.close();
})();

/**
 * Run it manually (Node.js script)
 * node src/globalSetup/globalSetup-qa-login.js
 * ENV_TYPE=qa node src/globalSetup/globalSetup-qa-login.js
 */