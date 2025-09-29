# Test info

- Name: Location >> Location >> verify uploadLocation
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/23_locationTest.spec.js:36:14

# Error details

```
Error: locator.click: Error: strict mode violation: locator('text=Upload') resolved to 3 elements:
    1) <div class="_attachment_box_hryun_1">Upload Media</div> aka getByText('Upload Media')
    2) <div class="_attachment_box_hryun_1">Link Upload</div> aka getByText('Link Upload')
    3) <span>Upload</span> aka getByRole('button', { name: 'Upload' })

Call log:
  - waiting for locator('text=Upload')

    at Location.uploadMedia (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/location.js:58:25)
    at Location.uploadLocation (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/location.js:62:9)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/23_locationTest.spec.js:37:13
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
  - img "loading"
  - paragraph: Loading...
  - button "arrow-left Back":
    - img "arrow-left"
    - text: Back
  - text: Location
  - radio "Selects" [checked]
  - text: Selects
  - radio "Shortlist"
  - text: Shortlist
  - radio "Final"
  - text: Final
  - img
  - radio "Location Name"
  - text: Location Name
  - radio "Scene No"
  - text: Scene No
  - radio "Episode No" [checked]
  - text: Episode No
  - textbox "Search by Scene no. / City Name / Location Name"
  - button "search":
    - img "search"
  - separator
  - img "loading"
  - paragraph: Loading...
  - button "plus":
    - img "plus"
- dialog "Add Location Details":
  - button "Close":
    - img "close"
  - text: Add Location Details * Location Name
  - textbox "* Location Name"
  - text: Scene No
  - textbox "Scene No"
  - text: Episode No Note - You can add multiple episodes by separating them with commas (e.g.,1,2,3,3A..).
  - textbox "Episode No Note - You can add multiple episodes by separating them with commas (e.g.,1,2,3,3A..)."
  - text: Description
  - textbox "Description"
  - text: Add Address Details Address
  - textbox "Address"
  - text: City
  - textbox "City"
  - text: Add Information Details Contact Name
  - textbox "Contact Name"
  - text: Contact Number
  - combobox
  - text: +91 India
  - textbox "Contact Number"
  - text: Email
  - textbox "Email"
  - button "video-camera-add":
    - img "video-camera-add"
  - text: Upload Media
  - button "link":
    - img "link"
  - text: Link Upload
  - button "paper-clip":
    - img "paper-clip"
  - button "Cancel"
  - button "Save" [disabled]
- dialog:
  - button "edit":
    - img "edit"
  - button "Upload"
  - button "Close"
  - img "babu.png"
  - separator
  - img
  - button "close":
    - img "close"
```

# Test source

```ts
   1 | import { loadJson } from '../utils/jsonUtil';
   2 | const mediapaths = loadJson('mediapaths', 'testdata');
   3 |
   4 | export default class Location {
   5 |
   6 |     constructor(page){
   7 |         this.page = page;
   8 |
   9 |         this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
   10 |         this.location = page.locator('div.ant-card-body').getByText('Location');
   11 |
   12 |         this.selectsShortlistFinals = page.locator('//div[@class="ant-segmented-group"]//label');
   13 |
   14 |         this.enterLocation = page.locator('#fileName');
   15 |         this.enterScene = page.locator('#scene_no');
   16 |         this.enterEpisode = page.locator('#episodeNo');
   17 |         this.enterDiscription = page.locator('#description');
   18 |         this.save = page.locator('#upload_location_modal_save_button');
   19 |
   20 |         this.plus = page.locator('#create_location_details_modal_open_button');
   21 |         this.attchment = page.locator('[class="ant-float-btn-body"]');
   22 |         this.uploadMediaButton = page.locator("//div[contains(text(), 'Upload Media')]/ancestor::span//input[@type='file']");
   23 |         this.send = page.locator('text=Upload');
   24 |
   25 |         this.folder = page.locator('[alt="folder"]');
   26 |         this.viewImage = page.locator('//div[@class="relative cursor-pointer"]//img');
   27 |         this.close = page.locator('[id="close_document_viewer_button"]');
   28 |         this.closeWindow = page.locator('//span[@class="ant-modal-close-x"]//span[@aria-label="close"]');
   29 |
   30 |         this.arrow = page.locator('//div[@class="mt-2"]//span[@aria-label="down"]');
   31 |         this.locationNameRadioButton = page.locator('//input[@name="radiogroup" and @value="1"]');
   32 |
   33 |         this.generatepdf = page.locator('#lcw_generate_pdf_button');
   34 |     }
   35 |
   36 |     async locationTab(){
   37 |         await this.tools.click();
   38 |         await this.location.click();
   39 |     }
   40 |
   41 |     async selectsTab(){
   42 |         await this.selectsShortlistFinals.first().click();
   43 |     }
   44 |
   45 |     async shortlistTab(){
   46 |         await this.selectsShortlistFinals.nth(1).click();
   47 |         await this.page.waitForTimeout(3000);
   48 |     }
   49 |
   50 |     async finalsTab(){
   51 |         await this.selectsShortlistFinals.nth(2).click();
   52 |     }
   53 |
   54 |     async uploadMedia(){
   55 |         await this.plus.click();
   56 |         await this.attchment.click();
   57 |         await this.uploadMediaButton.setInputFiles(mediapaths.image);
>  58 |         await this.send.click();
      |                         ^ Error: locator.click: Error: strict mode violation: locator('text=Upload') resolved to 3 elements:
   59 |     }
   60 |
   61 |     async uploadLocation(location, scene, episode){
   62 |         await this.uploadMedia();
   63 |         await this.enterLocation.fill(`${location}`);
   64 |         await this.enterScene.fill(`${scene}`);
   65 |         await this.enterEpisode.fill(`${episode}`);
   66 |         
   67 |         await this.enterDiscription.fill('This location is for testing purposes');
   68 |         await this.save.click();
   69 |         
   70 |         const successMsg = await this.page.locator('text=Location photograph(s) have been added successfully.');
   71 |         await successMsg.waitFor({ state: 'visible' });
   72 |         await successMsg.waitFor({ state: 'hidden' });
   73 |     }
   74 |
   75 |     async openFolder(){
   76 |         await this.folder.click();
   77 |     }
   78 |
   79 |     async openImage(){
   80 |         await this.folder.nth(1).click();
   81 |         await this.viewImage.first().click();
   82 |         const target = await this.close;
   83 |         await target.hover();
   84 |         await target.click();
   85 |         await this.closeWindow.nth(1).click();
   86 |         await this.closeWindow.first().click();
   87 |     }
   88 |
   89 |     async arrowClick(){
   90 |         await this.arrow.click();
   91 |     }
   92 |
   93 |
   94 |     async handleDropdownAction(tabFn, actionText, successMessage, confirmDelete = false){
   95 |
   96 |         await this[tabFn]();
   97 |
   98 |         if(!(await this.locationNameRadioButton.isChecked())){
   99 |             await this.locationNameRadioButton.click();
  100 |         }
  101 |
  102 |         const arrowCount = await this.arrow.count();
  103 |         if (arrowCount === 1) {
  104 |             await this.arrowClick();
  105 |         } else if (arrowCount > 1) {
  106 |             await this.arrow.first().click();
  107 |         } else {
  108 |             throw new Error('Arrow element not found');
  109 |         }
  110 |         
  111 |         await this.page.waitForSelector('.ant-dropdown-menu-item');
  112 |         const itemTexts = await this.page.$$eval('.ant-dropdown-menu-item .ant-dropdown-menu-title-content', elements =>
  113 |             elements.map(el => el.textContent.trim())
  114 |         );
  115 |         console.log('Dropdown Items:', itemTexts);
  116 |         await this.page.click(`text=${actionText}`);
  117 |
  118 |         if (confirmDelete) {
  119 |             await this.page.locator('//div[@class="ant-modal-confirm-btns"]//button').nth(1).click();
  120 |             await this.page.waitForTimeout(1000);
  121 |         } else {
  122 |             await this.save.click();
  123 |         }
  124 |
  125 |         if(successMessage){
  126 |             const successMsg = await this.page.locator(`text=${successMessage}`);
  127 |             await successMsg.waitFor({ state: 'visible' });
  128 |             await successMsg.waitFor({ state: 'hidden' });
  129 |         }  
  130 |     }
  131 |
  132 |     async moveToShortlistFromSelects() {
  133 |         await this.handleDropdownAction('selectsTab', 'Move to Shortlist', 'Location photograph(s) have been added successfully.');
  134 |     }
  135 |
  136 |     async moveToFinalFromSelects() {
  137 |         await this.handleDropdownAction('selectsTab', 'Move to Final', 'Location photograph(s) have been added successfully.');
  138 |     }
  139 |
  140 |     async deleteFromSelects() {
  141 |         await this.handleDropdownAction('selectsTab', 'Delete', null, true);
  142 |     }
  143 |
  144 |     async deleteFromShortlist() {
  145 |         await this.handleDropdownAction('shortlistTab', 'Delete', null, true);
  146 |     }
  147 |
  148 |     async deleteFromFinals() {
  149 |         await this.handleDropdownAction('finalsTab', 'Delete', null, true);
  150 |     }
  151 |
  152 |     async generatePDF() {
  153 |         await this.generatepdf.click();
  154 |         await this.page.locator('//div[@class="ant-modal-footer"]//button').nth(1).click();
  155 |         const successMsg = await this.page.locator('text=Location List is generated successfully.');
  156 |         await successMsg.waitFor({ state: 'visible' });
  157 |         await successMsg.waitFor({ state: 'hidden' });
  158 |
```