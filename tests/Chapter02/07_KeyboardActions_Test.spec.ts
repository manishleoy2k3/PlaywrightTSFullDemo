// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Keyboard actions in playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.google.com/');

    // Enter action from keyboard
    // await page.getByLabel('Search', {exact : true}).first().click();
    // await page.getByLabel('Search', {exact : true}).first().fill('playwright by testers talk');
    // await page.getByLabel('Search', {exact : true}).first().press('Enter');

    // Selecting & deleting from keyboard
    // await page.getByLabel('Search', {exact : true}).first().click();
    // await page.keyboard.press('Meta+A');
    // await page.keyboard.press('Delete');

    // Press TAB and Enter
    await page.getByLabel('Search', {exact : true}).first().click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
});

