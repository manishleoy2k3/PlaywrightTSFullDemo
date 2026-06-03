// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Record at cursor test', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.google.com/');

    // Search with keywords
    await page.getByLabel('Search', { exact: true }).fill('playwright by testers talk');
    await page.getByLabel('Search', { exact: true }).press('Enter');

    // Click on playlist
    await page.getByRole('link', { name: 'Playwright by Testers Talk☑️' }).first().click();

    // Validate web page title 
    await expect(page).toHaveTitle('Playwright by Testers Talk☑️ - YouTube');
    
    await expect(page.getByRole('link', { name: 'Playwright Tutorial Full' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Playwright API Testing Tutorial Crash Course' })).toBeVisible();
    await expect(page.getByLabel('Playwright Tutorial Full Course 2024').locator('#video-title')).toContainText('Playwright Tutorial Full Course 2024 | Playwright Testing Tutorial');
    await expect(page.getByLabel('Playwright API Testing Tutorial Crash Course 2024').locator('#video-title')).toContainText('Playwright API Testing Tutorial Crash Course 2024');
});

