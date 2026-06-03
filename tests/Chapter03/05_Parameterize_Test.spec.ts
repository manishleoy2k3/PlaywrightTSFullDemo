// Import playwright module
import { test, expect } from '@playwright/test';

const searchKeywords = ['Playwright by Testers Talk', 'Cypress by Testers Talk', 'API Testing by Testers Talk']

for (const searchKeyword of searchKeywords) {

    /**
    * Author Testers Talk
    */
    test(`Parameterize Tests in Playwright ${searchKeyword}`, async ({ page }) => {
        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill(searchKeyword);
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: searchKeyword }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle(searchKeyword + '☑️ - YouTube');
    });
}
