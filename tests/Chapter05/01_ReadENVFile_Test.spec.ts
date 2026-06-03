// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Read ENV file config in playwright', async ({ page }) => {
    // Go to URL
    await page.goto(`${process.env.GOOGLE_URL}`);

    // Search with keywords
    await page.getByLabel('Search', { exact: true }).fill(`${process.env.SEARCH_KEYWORDS}`);
    await page.getByLabel('Search', { exact: true }).press('Enter');

    // Click on playlist
    await page.getByRole('link', { name: `${process.env.SEARCH_KEYWORDS}` }).first().click();

    // Validate web page title 
    await expect(page).toHaveTitle(`${process.env.SEARCH_KEYWORDS}`+'☑️ - YouTube');
});