import { expect, Locator, Page } from "@playwright/test";

export class PlaylistPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;

        // Elements
    }

    // Methods
    async validatePageTitle(title: string) {
        await expect(this.page).toHaveTitle(title);
    }
}