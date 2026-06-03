// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Handling Dropdown list in playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.facebook.com/');
    await page.getByRole('button',{name : 'Create new account'}).click();

    // Select dropdown using value
    await page.getByLabel('Month').selectOption('3');

    // Select dropdown using visible text
    await page.getByLabel('Month').selectOption('Oct');

    // Validate all the options
    await expect(page.locator('#month > option')).toHaveText(['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
});

