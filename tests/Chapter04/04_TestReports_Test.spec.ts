// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test.describe('SmokeTesting', () => {
    // Write a test
    test('Test 1', async ({ page }) => {
        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill('playwright by testers talk');
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: 'Playwright by Testers Talk☑️' }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle('Playwright by Testers Talk☑️ - YouTube');
    });
});

/**
 * Author Testers Talk
 */
test.describe('RegressionTesting', () => {
    // Write a test
    test('Test 2', async ({ page }) => {
        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill('playwright by testers talk');
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: 'Playwright by Testers Talk☑️' }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle('Playwright by Testers Talk☑️ - YouTube');
    });

    // Write a test
    test('Test 3', async ({ page }) => {
        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill('playwright by testers talk');
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: 'Playwright by Testers Talk☑️' }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle('Playwright by Testers Talk☑️ - YouTube');
    });

    test('Test 4', async ({ page }) => {
        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill('playwright by testers talk');
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: 'Playwright by Testers Talk☑️' }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle('Playwright TypeScript by Testers Talk☑️ - YouTube');
    });
});