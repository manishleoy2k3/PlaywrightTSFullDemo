import { Locator, Page } from "@playwright/test";

export class ResultPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;

        // Elements
    }

    // Methods
    async clickOnPlaylist(link: string) {
        await this.page.getByRole('link', { name: link }).first().click();
    }
}