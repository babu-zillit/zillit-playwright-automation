// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
MyProject/
├── src/
│   ├── config/                  ← Environment configs (URLs, base paths, env vars)
│   ├── fixtures/                ← Sample test data (JSON, mock data)
│   ├── 
│   ├── pages/                   ← Page Object Model files (e.g., login.js, home.js)
│   │   └── login.js
│   ├── tests/                   ← Your actual test files
│   │   ├── login.spec.js        ← Test for login page
│   │   ├── home.spec.js         ← Test for home page
│   │   └── skip/                ← Folder with tests you want to ignore
│   │       └── old.spec.js
│   ├── utils/                   ← Utility/helper functions
│   │   ├── loggerUtils.js
│   │   ├── jsonUtil.js
│   │   └── excelUtils/          ← Folder with Excel parsing utilities
│
├── package.json                 ← Project dependencies & scripts
└── playwright.config.js         ← Playwright test configuration
 * 
 */ 



/**
 * 
 * Environment Variables and dotenv
 * for reading env file
 * 
 */ 
import dotenv from 'dotenv';
import path from 'path';


// Load env file dynamically
const envFileName = process.env.ENV_TYPE || 'qa'; 
dotenv.config({ path: path.resolve(`src/config/.env.${envFileName}`) });  // read the which env file to load either qa or production



/**
 * 
 * Map environment to specific session state file
 * 
 */
const storageStatePath = {
  qa: './src/sessions/zillit-session-qa.json',
  production: './src/sessions/zillit-session-production.json',
}[envFileName];

/**
 * 
 * Map environment to corresponding global setup script
 * 
 */
const globalSetupPath = {
  qa: './src/globalSetup/globalSetup-qa-login.js',
  production: './src/globalSetup/globalSetup-production-login.js',
}[envFileName];



export default defineConfig({
  /**
   * 
   * all configurations keep inside export defineConfig block
   * 
   */


  /**
   * 
   * 📁 1. Test Directory
   * Purpose: It tells the test runner (e.g., Jest, Vitest) to look in the ./tests folder for test files.
   * 
   */ 

  testDir: './src/tests',            // It tells the test runner (e.g., Jest, Vitest) to look in the ./tests folder for test files.
  //testMatch: /.*\.spec\.(js|ts)/,     // To identify which files are test files based on naming. Only files matching this pattern (e.g., user.spec.ts, api/user.spec.ts) will be considered test files
  testIgnore: ['**/skip/**'],    // '**/skip/**' means ignore any file or folder that is inside a folder named skip, 



  /**
   * 
   * 📁 2. Reports
   * 
   */

  reporter: [

    /**
     * ['list'] : Console output for developers
     */ 
    ['list'],

    /**
     * html : HTML report (viewable in browser)
     * Can be 'always', 'never', or 'on-failure'
     */ 
    ['html', { open: 'never' }],  
    
    /**
     * JSON report (for custom integrations or dashboards)
     */ 
    ['json', { outputFile: 'reports/report.json' }],

    /**
     * JUnit report (for CI tools like Jenkins, Azure DevOps, etc.)
     */ 
    ['junit', { outputFile: 'reports/results.xml' }],

    /**
     * Allure raw report (for generating Allure HTML reports)
     * After running your tests, generate the Allure HTML report with and open the report in your browser:
     * 
     * allure generate allure-results --clean -o allure-report
     * allure open allure-report
     */ 
    ['allure-playwright', {
      outputFolder: 'allure-results', // ✅ root directory
      detail: true,
      suiteTitle: false
    }]

  ],


  /**
   * 
   * 📁 3. Parallel
   * Purpose: Allows all tests to run in full parallel
   * 
   */ 

  fullyParallel: false, // run all tests in full parallel




  /**
   * 
   * 📁 4. Retries
   * Purpose: Retry failed tests 2 times in CI/Cd pipeline, but 0 times locally when you run in your laptop.
   * 
   */ 

 // retries: process.env.CI ? 1 : 0,




  /**
   * 
   * 📁 5. Workers
   * Purpose: In CI/CD pipeline, use 1 worker (run tests serially). Locally, use all available CPU cores (default).
   * Reduces flakiness and system load in CI by running tests one at a time.
   * Locally, you get faster test runs by allowing full parallelism.
   * 
   */ 
  workers: process.env.CI ? 1 : undefined,




  /**
   * 
   * 📁 6. forbidOnly
   * Purpose: It tells Playwright to fail the test run if any test file contains: test.only(...) or describe.only(...)
   * These are used to run only one test for debugging — great locally, dangerous in CI.
   * 
   */ 
  forbidOnly: !!process.env.CI, // fail build if test.only exists

  /**
   * 
   * CI/CD Integration Considerations
   * Use different reporters or trace settings in CI
   * 
   */  
  

  /**
   * 
   * Artifacts, Output Paths
   * outputDir: 'test-results/', // artifacts (screenshots, videos, traces)
   * 
   */ 




  /**
   * 
   * use block
   * use block in your Playwright configuration defines default settings for how the browser behaves during every test run.
   * 
   */ 

use: {

  /**
   * 
   * Timeouts
   * 
   */ 

   timeout: 30000,                // if element will not found within 30 sec then throw the exception
    // expect: {
    //  timeout: 5000               // Max wait time for expect() assertions: 5 seconds
    // },
    // actionTimeout: 10000,         // Max time for actions like click, fill: 10 seconds
    // navigationTimeout: 15000,     // Max time for page navigations: 15 seconds




 
  /**
   * 
   * headless
   * Run browser without showing the UI (no visible window).
   * 
   */ 

   headless: true,




  /**
   * 
   * viewport
   * Set the default browser window size
   * 
   */

  viewport: { width: 1280, height: 720 },




  /**
   * 
   * baseURL
   * Sets a base URL for all tests using page.goto('/').
   * Avoid repeating full URLs.
   * Easier to switch between environments (dev, staging, production, qa)
   * 
   */

  baseURL: process.env.BASE_URL || 'https://qa.zillit.com/',




  /**
   * 
   * trace
   * Record a trace (step-by-step replay) only if a test fails and is retried.
   * 
   */

  trace: 'on-first-retry',




  /**
   * 
   * screenshot
   * Capture a screenshot only if a test fails.
   * 
   */

  screenshot: 'only-on-failure',




  /**
   * 
   * video
   * Record a video of the test only if it fails.
   * Visually understand how the failure happened.
   * 
   */

  video: 'retain-on-failure',





  /**
   * 
   * storageState
   * Use the logged-in session or other saved cookies from state.json
   * Skip login before each test — tests start in a logged-in state.
   * Speeds up test execution, avoids repeating setup flows.
   * 
   */

  //storageState: process.env.SESSION_FILE || 'src/sessions/zillit-session-qa.json',

  storageState: storageStatePath,




  /**
   * 
   * launchOptions: { ... }
   * Custom launch settings passed when launching the browser.
   * slowMo : Slow down each action by 50ms.
   * Make actions easier to see during debugging.
   * Helpful to watch the test steps in motion.
   * args: ['--start-maximized'] : for maximizes window
   * 
   */

  // launchOptions: {
  //   slowMo: 50,
  //   args: ['--start-maximized'],
  // },





  /**
   * 
   * GlobalSetup
   * globalSetup is a special script in Playwright that runs once before all tests start.
   * Uses : Log in and save session state (like cookies, auth tokens)
   * Set up global test data
   * Prepare a testing environment
   * 
   */ 

  globalSetup: globalSetupPath,

}, 




  /**
   * 
   *  Project Configuration (Browsers, Devices, permission and pop-up configration)
   * 
   */ 

  projects: [


    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        // Auto-allow permissions in Chromium
        permissions: [
          'camera',
          'microphone',
          'geolocation',
          'notifications',
          'clipboard-read',
          'clipboard-write',
        ],
      },
    },




    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] ,
        browserName: 'firefox',
        // Auto-allow permissions via Firefox prefs
        firefoxUserPrefs: {
          'permissions.default.desktop-notification': 1,
          'dom.webnotifications.enabled': true,
          'dom.push.enabled': true,
          'dom.push.testing.enabled': true,
          'dom.push.alwaysConnect': true,
        },
      },
    },




    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
        browserName: 'webkit',
        // No native permission support for camera/mic/notifications,
        // so omit or handle manually
      },
    },

    
    
  ],
  
});

