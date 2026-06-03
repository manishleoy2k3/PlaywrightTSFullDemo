// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Visual Comparison in Playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://github.com/login');

    // Compare page screnshots
    await expect(page).toHaveScreenshot('GitHubLoginPage.png');

    await page.locator('#login_field').fill('playwright with typescript')

    // Compare page screnshots
    //await expect(page).toHaveScreenshot('GitHubLoginPage.png');
})

/**
 * Author Testers Talk
 */
test('Element Visual Comparison in Playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://github.com/login');

    await expect(page).toHaveScreenshot('GitHubLoginPage.png');

    // Compare element screnshots
    const element = page.locator('[class="auth-form-body mt-3"]');
    await expect(element).toHaveScreenshot('GitHubLoginForm.png');

    // Compare element screnshots
    await page.locator('#login_field').fill('playwright with typescript')
    //await expect(element).toHaveScreenshot('GitHubLoginForm.png');
});