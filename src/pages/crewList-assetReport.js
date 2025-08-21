
export default class CrewListAssetReport {

    constructor(page){
        this.page = page;

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');
        this.crewList = page.locator('//span[@class="filmtools-card-title"]//span[text()="Crew List"]');
        this.assetReport = page.locator('//span[@class="filmtools-card-title"]//span[text()="Asset Report"]');

        /**
         * Crew list locator
         */ 
        this.generatePDF = page.locator('#crew_list_generate_pdf_button');
        this.publish = page.locator('#publish_crew_list_button');

        /**
         * Asset Report locator
         */
        this.generateAssetReport = page.locator('#generate_view_asset_report_button');
        this.close = page.locator('#close_document_viewer_button')

    }
    

    async crewListFunctionality(){
        await this.tools.click();
        await this.crewList.click();
        await this.generatePDF.click();
        await this.publish.click();

        const successMsg = await this.page.locator('text=Crew List Published Successfully');
        await successMsg.waitFor({ state: 'visible' });
        await successMsg.waitFor({ state: 'hidden' });
    }

    async assetReportFunctionality(){
        await this.tools.click();
        await this.assetReport.click();
        await this.generateAssetReport.click();
        await this.close.click();
    }

}