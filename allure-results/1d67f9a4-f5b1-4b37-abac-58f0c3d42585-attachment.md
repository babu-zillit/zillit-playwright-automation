# Test info

- Name: Settings >> WaterMark Logo Company >> verify user delete water mark logo
- Location: /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/settingTest.spec.js:58:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('//div[@class="ant-popconfirm-buttons"]//button').nth(1)
    - locator resolved to <button type="button" class="ant-btn css-2iw4eq ant-btn-primary ant-btn-sm">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    54 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

    at Settings.deleteWaterMarkLogoCompany (/Users/babuyadav/Documents/zillit-playwright-automation/src/pages/settings.js:178:37)
    at /Users/babuyadav/Documents/zillit-playwright-automation/src/tests/settingTest.spec.js:59:7
```

# Page snapshot

```yaml
- complementary:
  - img "Zillit Logo"
  - superscript: "1"
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
  - button "Zl automation51 down":
    - strong: Zl automation51
    - img "down"
- main:
  - tablist:
    - tab "Profile Setting"
    - tab "Admin Settings" [selected]
  - tabpanel "Admin Settings":
    - button "Approve New User Request":
      - text: Approve New User Request
      - img
    - button "Approve User Profile":
      - text: Approve User Profile
      - img
    - button "Change Department Listing Order for Crew List":
      - text: Change Department Listing Order for Crew List
      - img
    - button "Create New Department":
      - text: Create New Department
      - img
    - button "Create New Designation":
      - text: Create New Designation
      - img
    - button "Create Remote shooting unit":
      - text: Create Remote shooting unit
      - img
    - button "Create/Update on Home Unit":
      - text: Create/Update on Home Unit
      - img
    - button "Customization of Tools":
      - text: Customization of Tools
      - img
    - button "Deal Memo for Onboarding":
      - text: Deal Memo for Onboarding
      - img
    - button "Edit Project Name":
      - text: Edit Project Name
      - img
    - button "File Cabinet Documents":
      - text: File Cabinet Documents
      - img
    - button "Pre-Approved Users":
      - text: Pre-Approved Users
      - img
    - button "Set/View SOS Receivers":
      - text: Set/View SOS Receivers
      - img
    - button "User Management":
      - text: User Management
      - img
    - button "Project Set Up Notes":
      - text: Project Set Up Notes
      - img
    - button "Viewing & Posting Rights Grid":
      - text: Viewing & Posting Rights Grid
      - img
    - button "Watermark Logo of Company":
      - text: Watermark Logo of Company
      - img
    - button "Delete Project":
      - text: Delete Project
      - img
```

# Test source

```ts
   78 |
   79 |         await this.cancelDepartmentButton.click();
   80 |     }
   81 |
   82 |     async deleteDepartment(){
   83 |         await this.createNewDepartment.click();
   84 |         await this.delete.click();
   85 |         await this.yesButton.nth(1).click();
   86 |
   87 |         const successMsg = await this.page.locator('text=Department deleted successfully');
   88 |         await successMsg.waitFor({ state: 'visible' });
   89 |         await successMsg.waitFor({ state: 'hidden' });
   90 |
   91 |         await this.cancelDepartmentButton.click();
   92 |     }
   93 |
   94 |     async createDesignation(){
   95 |         await this.createNewDesignation.click();
   96 |
   97 |         await this.page.locator('.ant-select-selector').click();
   98 |         await this.page.waitForSelector('div.ant-collapse-item', { state: 'visible' });
   99 |         await this.page.locator('div.ant-select-item-option-content', { hasText: 'Writer' }).click();
  100 |
  101 |         await this.enterNewDesignation.fill('Babu Tester');
  102 |         await this.addDesignation.click();
  103 |
  104 |         const successMsg = await this.page.locator('text=Designation has been created successfully.');
  105 |         await successMsg.waitFor({ state: 'visible' });
  106 |         await successMsg.waitFor({ state: 'hidden' });
  107 |
  108 |         await this.okButton.click();
  109 |     }
  110 |
  111 |     async deleteDesignation(){
  112 |         await this.createNewDesignation.click();
  113 |         await this.page.locator('//div[@class="ant-collapse-header"]//span[text()="Writer"]').click();
  114 |         
  115 |         await this.delete.click();
  116 |         await this.yesButton.nth(1).click();
  117 |
  118 |         const successMsg = await this.page.locator('text=Designation has been deleted successfully.');
  119 |         await successMsg.waitFor({ state: 'visible' });
  120 |         await successMsg.waitFor({ state: 'hidden' });
  121 |
  122 |         await this.okButton.click();
  123 |     }
  124 |
  125 |
  126 |     async createHomeUnit(){
  127 |         await this.createHomeUnitTab.click();
  128 |         await this.createHomeUnitPlusButton.click();
  129 |         await this.enterUnitName.fill('Sam');
  130 |         await this.createHomeUnitButton.click();
  131 |
  132 |         const successMsg = await this.page.locator('text=Home unit created successfully');
  133 |         await successMsg.waitFor({ state: 'visible' });
  134 |         await successMsg.waitFor({ state: 'hidden' });
  135 |     }
  136 |
  137 |     async editHomeUnit(){
  138 |         await this.createHomeUnitTab.click();
  139 |         await this.page.locator('[aria-label="edit"]').nth(3).click();
  140 |         
  141 |         const inputLocator = this.page.locator('//input[@type="text"]').nth(1);
  142 |         await inputLocator.click();
  143 |         await inputLocator.fill('Sam1');
  144 |
  145 |         await this.page.locator('#edit_home_unit').click();
  146 |     }
  147 |
  148 |     async deleteHomeUnit(){
  149 |         await this.createHomeUnitTab.click();
  150 |         await this.page.locator('[aria-label="delete"]').nth(3).click();
  151 |         await this.yesButton.nth(1).click();
  152 |
  153 |         const successMsg = await this.page.locator('text=Unit deleted successfully.');
  154 |         await successMsg.waitFor({ state: 'visible' });
  155 |         await successMsg.waitFor({ state: 'hidden' });
  156 |
  157 |         await this.page.locator('[aria-label="close"]').nth(2).click();
  158 |     }
  159 |
  160 |     async uploadWaterMarkLogo(){
  161 |         await this.page.waitForTimeout(3000);
  162 |         await this.waterMarkLogoCompany.click();
  163 |         await this.uploadImage.setInputFiles(mediapaths.image);
  164 |         await this.submitWaterMarkLogo.waitFor({ state: 'visible' });
  165 |         await this.submitWaterMarkLogo.click();
  166 |
  167 |         const successMsg = await this.page.locator('text=Watermark uploaded Sucessfully');
  168 |         await successMsg.waitFor({ state: 'visible' });
  169 |         await successMsg.waitFor({ state: 'hidden' });
  170 |
  171 |         await this.cancelWaterMarkLogo.click();
  172 |     }
  173 |
  174 |     async deleteWaterMarkLogoCompany(){
  175 |         await this.waterMarkLogoCompany.click();
  176 |         await this.deleteWaterMarkLogo.waitFor({ state: 'visible' });
  177 |         await this.deleteWaterMarkLogo.click();
> 178 |         await this.yesButton.nth(1).click();
      |                                     ^ Error: locator.click: Target page, context or browser has been closed
  179 |     }
  180 |
  181 |     async deleteProjects(){
  182 |         await this.page.waitForTimeout(2000);
  183 |         await this.deleteProject.click();
  184 |         await this.page.waitForTimeout(1500);
  185 |         await this.projectDeleteButton.click();
  186 |         await this.page.waitForTimeout(1500);
  187 |         const confirmButton = this.page.locator('//button[.//span[text()="Confirm"]]');
  188 |         await confirmButton.click();
  189 |
  190 |         const successMsg = await this.page.locator('text=Your Project Will Be Deleted After 12 hours');
  191 |         await successMsg.waitFor({ state: 'visible' });
  192 |         await successMsg.waitFor({ state: 'hidden' });
  193 |     }
  194 |
  195 |     async stopProjectDeletions(){
  196 |         await this.stopProjectDeletion.click();
  197 |         await this.page.waitForTimeout(1500);
  198 |         await this.page.locator('//div[@class="ant-modal-footer"]//button//span[text()="Stop Delete"]').click();
  199 |
  200 |         const successMsg = await this.page.locator('text=Project deletion has been stopped.');
  201 |         await successMsg.waitFor({ state: 'visible' });
  202 |         await successMsg.waitFor({ state: 'hidden' });
  203 |     }
  204 |
  205 |
  206 | }
```