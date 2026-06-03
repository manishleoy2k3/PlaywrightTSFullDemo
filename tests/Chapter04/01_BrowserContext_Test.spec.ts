// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Multiple browser/tabs in Playwright TypeScript', async ({ page, browser }) => {
    // Go to URL
    await page.goto('https://www.google.com/');

    // Search with keywords
    await page.getByLabel('Search', { exact: true }).fill('playwright by testers talk');
    await page.getByLabel('Search', { exact: true }).press('Enter');

    // Click on playlist
    await page.getByRole('link', { name: 'Playwright by Testers Talk☑️' }).first().click();

    // Validate web page title 
    await expect(page).toHaveTitle('Playwright by Testers Talk☑️ - YouTube');


    // New browser session
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    // Go to URL
    await page2.goto('https://www.google.com/');

    // Search with keywords
    await page2.getByLabel('Search', { exact: true }).fill('playwright by testers talk');
    await page2.getByLabel('Search', { exact: true }).press('Enter');

    // Click on playlist
    await page2.getByRole('link', { name: 'Playwright by Testers Talk☑️' }).first().click();

    // Validate web page title 
    await expect(page2).toHaveTitle('Playwright by Testers Talk☑️ - YouTube');


    // Create new tabs
    const newTab = await context2.newPage();
    await newTab.goto('https://www.google.com/');

    // Search with keywords
    await newTab.getByLabel('Search', { exact: true }).fill('playwright by testers talk');
    await newTab.getByLabel('Search', { exact: true }).press('Enter');
});