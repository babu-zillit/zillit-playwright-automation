//src/tests/zillit.qa.spec.js
import { test, expect } from '@playwright/test';

test('click the first Add to cart button', async ({ page }) => {
    console.log(process.env.BASE_URL);

  // Go to the inventory page
  await page.goto('/projects');

// Expect to be already logged in and see the projects page
  await expect(page).toHaveURL('https://qa.zillit.com/projects');
  
  
  await page.waitForSelector('text=Zl 20th Feb QA.', { timeout: 30000 });
  await page.click('text=Zl 20th Feb QA.');
  //await page.waitForTimeout(10000);


});

//ENV_TYPE=qa npx playwright test src/tests/zillit.qa.spec.js --project=chromium --headed
//ENV_TYPE=qa npx playwright test src/tests/zillit.qa.spec.js --project=firefox --headed
//ENV_TYPE=qa npx playwright test src/tests/zillit.qa.spec.js --project=webkit --headed