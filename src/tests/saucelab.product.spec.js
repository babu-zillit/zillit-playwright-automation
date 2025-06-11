//src/tests/saucelab.product.spec.js
import { test, expect } from '@playwright/test';

test('click the first Add to cart button', async ({ page }) => {
     console.log(process.env.BASE_URL);

  // Go to the inventory page
  await page.goto('/inventory.html');

  // Click the first "Add to cart" button
  await page.click('.inventory_list .btn_inventory');
  await page.waitForTimeout(5000);

  // Optionally verify it changed to "Remove"
  const button = page.locator('.inventory_list .btn_inventory').first();
  await expect(button).toHaveText('REMOVE');
});

//ENV_TYPE=staging npx playwright test src/tests/saucelab.product.spec.js --project=chromium --headed
//ENV_TYPE=staging npx playwright test src/tests/saucelab.product.spec.js --project=firefox --headed
//ENV_TYPE=staging npx playwright test src/tests/saucelab.product.spec.js --project=webkit --headed
