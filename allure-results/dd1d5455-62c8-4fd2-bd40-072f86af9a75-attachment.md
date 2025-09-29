# Test info

- Name: Map >> Map location >> Verify the PIN → Copy the location link → Open it in a new tab → Delete the location
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/18_mapTest.spec.js:36:9

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('div.ant-card-body').getByText('Map')

    at Map.mapTab (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/map.js:25:71)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/18_mapTest.spec.js:24:9
```

# Page snapshot

```yaml
- complementary:
  - img "Zillit Logo"
  - img
  - paragraph: Turn on Notification
  - paragraph: Get notified of a new message or call on computer.
  - button "Turn on desktop notification"
  - menu:
    - menuitem "FilmTools Logo Home":
      - img "FilmTools Logo"
      - text: Home
    - menuitem "Email":
      - img
      - text: Email
    - menuitem "FilmTools Logo Tools":
      - img "FilmTools Logo"
      - text: Tools
    - menuitem "FilmTools Logo C & C":
      - img "FilmTools Logo"
      - text: C & C
    - menuitem "FilmTools Logo Settings":
      - img "FilmTools Logo"
      - text: Settings
    - menuitem "FilmTools Logo SOS":
      - img "FilmTools Logo"
      - text: SOS
    - menuitem "question Zillit Help":
      - img "question"
      - text: Zillit Help
    - menuitem "poweroff Logout":
      - img "poweroff"
      - text: Logout
  - img "user"
  - button "Zl automation50 down":
    - strong: Zl automation50
    - img "down"
- main:
  - strong:
    - img "highlight"
    - paragraph: Customize functionality of 'Tools'. To add/remove modules, please go to‘Settings -> Admin Settings -> Customization of tools or Click Here
  - textbox "Search tools..."
  - paragraph: Film Tools
  - text: Accounts
  - img
  - text: Asset Report
  - img
  - text: Box / Film Schedule
  - img
  - text: Budget (Department)
  - img
  - text: Budget (Full)
  - img
  - text: Casting (Background Cast)
  - img
  - text: Casting (Main Cast)
  - img
  - text: Catering
  - img
  - text: Confidential Info
  - img
  - text: Continuity
  - img
  - text: Continuity Script Notes
  - img
  - text: Costume (Background Cast)
  - img
  - text: Costume (Main Cast)
  - img
  - text: Crew List
  - img
  - text: Distribution List
  - img
  - text: Documents & Signature
  - img
  - text: External Users
  - img
  - text: Info
  - img
  - text: Location
  - img
  - text: Production Report
  - img
  - text: Purchase Order
  - img
  - text: Schedule D.O.D.
  - img
  - text: Schedule Full & One Line
  - img
  - text: Script & Pages Distribution
  - img
  - text: Transportation
  - img
  - text: Viewing & Posting Rights Grid
  - img
  - text: Weather
  - img
```

# Test source

```ts
   1 | import { expect } from '@playwright/test';
   2 | const mediapaths = loadJson('mediapaths', 'testdata');
   3 | import { loadJson } from '../utils/jsonUtil';
   4 |
   5 | export default class Map {
   6 |
   7 |     constructor(page){
   8 |         this.page = page;
   9 |
  10 |         this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
  11 |
  12 |         this.selectLocationType = page.locator('#location_type');
  13 |         this.enterName = page.locator('input[placeholder="Enter name"]');
  14 |         this.enterDescription = page.locator('#description');
  15 |         this.uploadDocumentButton = page.locator('//span[@class="ant-upload"]//input[@type="file"]');
  16 |         this.save = page.locator('button[type="submit"]');
  17 |         
  18 |         this.editViewDeleteButton = page.locator('//tbody[@class="ant-table-tbody"]//tr[2]//td//button');
  19 |         this.searchForLocation = page.locator('[placeholder="Search For Location"]');
  20 |     
  21 |     }
  22 |
  23 |     async mapTab(){
  24 |         await this.tools.click();
> 25 |         await this.page.locator('div.ant-card-body').getByText('Map').click();
     |                                                                       ^ Error: locator.click: Target page, context or browser has been closed
  26 |     }
  27 |
  28 |     async pinLocation(){
  29 |         await this.page.locator('//div[contains(@class,"absolute top-4")]//button').first().click();
  30 |         await this.page.locator('//div[@role="button"]//img').dblclick();
  31 |     }
  32 |
  33 |     async fillLocationDetails() {
  34 |         await this.selectLocationType.click();
  35 |         await this.page.keyboard.press('Enter');
  36 |
  37 |         const checkBox = this.page.locator('#forCast');
  38 |         await checkBox.waitFor({ state: 'visible' });
  39 |         await checkBox.check();
  40 |
  41 |         await this.enterName.fill('Test Location');
  42 |         await this.enterDescription.fill('This is a test location description');
  43 |
  44 |         await this.uploadDocumentButton.setInputFiles(mediapaths.image);
  45 |         await this.save.click();
  46 |
  47 |         const successMsg = this.page.locator('text=Map location created successfully.');
  48 |         await expect(successMsg).toBeVisible();
  49 |         await expect(successMsg).toBeHidden();
  50 |     }
  51 |
  52 |     async viewPinnedLocation() {
  53 |         await this.page.locator('text=View Pinned Location').click();
  54 |         await this.editViewDeleteButton.nth(1).click();
  55 |         await this.page.waitForTimeout(2000);
  56 |     }
  57 |
  58 |     async deleteLocation() {
  59 |         await this.editViewDeleteButton.nth(2).click();
  60 |
  61 |         const successMsg = this.page.locator('text=Map location deleted successfully.');
  62 |         await successMsg.waitFor({ state: 'visible' });
  63 |         await successMsg.waitFor({ state: 'hidden' });
  64 |     }
  65 |
  66 |     async searchLocation() {
  67 |         await this.page.reload();
  68 |         await this.searchForLocation.fill('Delhi');
  69 |         await this.page.keyboard.press('ArrowDown');
  70 |         await this.page.keyboard.press('Enter');
  71 |         await this.page.waitForTimeout(1000);
  72 |         await this.page.locator('//div[@role="button"]//img').dblclick();
  73 |         await this.page.waitForTimeout(1000);
  74 |     }
  75 |
  76 |     async copyViewLocationLink() {
  77 |         await this.page.locator('//div[contains(@class,"border-t")]//button').first().click();
  78 |
  79 |         const successMsg = this.page.locator('text=Link copied to clipboard');
  80 |         await successMsg.waitFor({ state: 'visible' });
  81 |         await successMsg.waitFor({ state: 'hidden' });
  82 |
  83 |         const url = await this.page.evaluate(() => navigator.clipboard.readText());
  84 |         const newPage = await this.page.context().newPage();
  85 |         await newPage.goto(url, { waitUntil: 'load' });
  86 |         await this.page.waitForTimeout(2000);
  87 |         await newPage.close();  
  88 |     }
  89 | }
```