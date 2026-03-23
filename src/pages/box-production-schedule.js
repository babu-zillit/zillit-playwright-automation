import { expect } from '@playwright/test';
import logger from "../utils/loggerUtils";
import { loadJson } from '../utils/jsonUtil';
const mediapaths = loadJson('mediapaths', 'testdata');
import UploadMedia from '../actions/media-uploader';

export default class BoxProductionSchedule {

    constructor(page){
        this.page = page;
        this.uploadMedia = new UploadMedia(page);

        this.tools = page.locator('//span[@class="ant-menu-title-content"]//span[text()="Tools"]');

        this.createNewEventButton = page.locator('#box_schedule_create_new_event_button');
        this.enterEventTitle = page.getByPlaceholder('Enter event title');
        this.notes = page.getByPlaceholder('Enter Notes');

        this.selectInvitees = page.locator('#event_with_notes_select_invitees_drawer_open_button');
        this.selectAll = page.locator('#continuity_forward_select_all_users_button');
        this.submit = page.locator('#submit_distributed_events_button');
        this.eventSubmit = page.locator('#box_schedule_add_event_submit_button');

        this.createEditScheduleButton = page.locator('#box_schedule_edit_schedule_button');
        this.createScheduleButton = page.locator('div.flex.justify-between.items-center.p-1 button');
        this.enterScheduleName = page.getByPlaceholder('Enter schedule name');
        this.startDate = page.getByPlaceholder('Select Start Date');

    }

    async openBoxProductionScheduleTab(){
        await this.tools.click();
        await this.page.getByText('Box / Production Schedule', { exact: false }).click();
    }

    async createNewEvent(enterEvent, enterNote, successPopupMsg){
        await this.createNewEventButton.click();
        await this.enterEventTitle.fill(enterEvent);
        await this.notes.fill(enterNote);
        await this.selectInvitees.click();

        const selectUsers = this.page.locator('div.ant-segmented-group label').nth(4);
        await selectUsers.click();
        await this.selectAll.click();
        await this.submit.click();

        await this.eventSubmit.click();

        await this.uploadMedia.verifyPopupMessage(`${successPopupMsg}`);
    }

    async editEvent(enterEvent, enterNote, successPopupMsg){
        await this.page.locator('div.ant-card-body', { hasText: 'USERS' }).click();

        const editButton = this.page.locator('div.ant-modal-content span.ant-btn-icon');
        await editButton.nth(0).click();

        await this.enterEventTitle.fill(enterEvent);
        await this.notes.fill(enterNote);
        await this.eventSubmit.click();

        await this.uploadMedia.verifyPopupMessage(`${successPopupMsg}`);
    }

    async deleteEvent(successPopupMsg){
        await this.page.locator('div.ant-card-body', { hasText: 'USERS' }).click();

        const deleteButton = this.page.locator('div.ant-modal-content span.ant-btn-icon');
        await deleteButton.nth(1).click();

        const confirmDeleteButton = this.page.locator('div.ant-modal-footer button');
        await confirmDeleteButton.nth(1).click();

        await this.uploadMedia.verifyPopupMessage(`${successPopupMsg}`);
    }

    async createSchedule(enterSchedule){
        await this.createEditScheduleButton.click();
        await this.createScheduleButton.last().click();

        const addMoreSchedule = this.page.locator('div.grid.grid-cols-2 button');
        await addMoreSchedule.nth(0).click();

        await this.enterScheduleName.fill(enterSchedule);
        const saveButton = this.page.locator('div.flex.justify-end button');
        await saveButton.nth(1).click();

       // await this.page.locator('div.ant-modal-content button').first().click();
    }

    async selectStartDate(){
        await this.startDate.click();
        await this.page.locator('.ant-picker-header-next-btn').click(); // next month
        await this.page.locator('.ant-picker-cell:not(.ant-picker-cell-disabled) >> text=25').click();

        await this.page.locator('span.ant-select-selection-search').click();
        await this.page.keyboard.press('Enter');

        await this.page.waitForTimeout(5000);
    }

    




}