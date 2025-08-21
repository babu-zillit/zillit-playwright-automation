import { test } from '@playwright/test';
import StartProject from '../pages/start-project';

   test('Verify the user is created project successfully', async ({ page }) => {
      test.setTimeout(60000);

      await page.goto('/');
      const startproject = new StartProject(page);
      await startproject.clickStartProject();
      await startproject.projectCreation();
   });


/**
 * ENV_TYPE=qa npx playwright test src/tests/1startprojectTest.spec.js --project=chromium --headed
 */