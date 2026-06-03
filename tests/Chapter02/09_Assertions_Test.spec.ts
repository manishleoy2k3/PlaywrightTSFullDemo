// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Assertions in playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.youtube.com/');

    // visible, editable, enabled, empty
    await expect(page.getByPlaceholder('Search', {exact :true}).first()).toBeVisible();
    await expect(page.getByPlaceholder('Search', {exact :true}).first()).toBeEditable();
    await expect(page.getByPlaceholder('Search', {exact :true}).first()).toBeEnabled();
    await expect(page.getByPlaceholder('Search', {exact :true}).first()).toBeEmpty();

    // Verify URL, title, text, count, 
    await page.getByPlaceholder('Search', {exact :true}).first().click();
    await page.getByPlaceholder('Search', {exact :true}).first().fill('playwright by testers talk')
    await page.getByPlaceholder('Search', {exact :true}).first().press('Enter');
    await expect(page).toHaveURL('https://www.youtube.com/results?search_query=playwright+by+testers+talk');

    await expect(page).toHaveTitle('playwright by testers talk - YouTube');

    await expect(page.locator('span[id="title"]').first()).toHaveText('Latest posts from Testers Talk');

    await expect(page.locator('span[id="title"]')).toHaveCount(4);

    //await expect(page.locator('span[id="title"]')).toBeDisabled();
});


