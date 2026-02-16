import { expect } from '@playwright/test';
import { loadJson } from '../utils/jsonUtil';
import UploadMedia from '../actions/media-uploader'
const mediapaths = loadJson('mediapaths', 'testdata');

export default class ZillitHelp {
    constructor(page){
        this.page = page;

        this.zillitHelpButton = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Zillit Help"]');
    }

    async openZillitHelpTab(){
        await this.zillitHelpButton.click();
    }

    async openTermsOfUse(index){
        await this.page.locator('div.p-6').nth(index).click()
    }

    async openPrivacyPolicy(index){
        await this.page.locator('div.p-6').nth(index).click()
    }

    async openFAQ(index){
        await this.page.locator('div.p-6').nth(index).click()
    }

    async openReviews(index){
        await this.page.locator('div.p-6').nth(index).click()
    }

    async validateAllLinks(clickAction){
        const context = this.page.context();

        const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        //this.page.locator('div.p-6').first().click()
        clickAction()
        ]);

        await newPage.waitForLoadState('load');
        console.log('New Tab URL:', newPage.url());

        const links = await newPage.$$eval('a', anchors =>
      anchors
        .map(a => a.href)
        .filter(href =>
          href &&
          href.startsWith('http') &&
          !href.startsWith('mailto:') &&
          !href.startsWith('tel:')
        )
    );

    console.log(`Total Links Found: ${links.length}`);

    let brokenLinks = [];

    // for (const link of links) {
    //   const response = await newPage.request.get(link);
    //   const status = response.status();

    //   console.log(`${link} → ${status}`);

    //   if (status >= 400) {
    //     brokenLinks.push(`${link} → ${status}`);
    //   }
    // }
    for (const link of links) {
  try {
    const response = await newPage.request.get(link, {
      timeout: 15000
    });

    const status = response.status();
    console.log(`${link} → ${status}`);

    if (status >= 400) {
      brokenLinks.push(`${link} → ${status}`);
    }

  } catch (error) {
    console.log(`${link} → ERROR: ${error.message}`);
    brokenLinks.push(`${link} → ERROR`);
  }
}


    expect(brokenLinks).toEqual([]);

    await newPage.close();
  }

}