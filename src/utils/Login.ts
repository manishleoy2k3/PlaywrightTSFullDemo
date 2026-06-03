import { Page } from '@playwright/test';

export async function login(
    page: Page, 
    orgurl: string, 
    username: string, 
    password: string 
): Promise<void> { 
    await page.goto(orgurl);
    await page.locator('input[placeholder="Email, phone, or Skype"]').click();
    await page.locator('input[placeholder="Email, phone, or Skype"]').fill(username);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('input[placeholder="Password"]').click();
    await page.locator('input[placeholder="Password"]').fill(password);
    await Promise.all([
        page.waitForNavigation(),
        page.getByRole('button', { name: 'Sign in' }).click(),
        page.getByRole('button', { name: 'Yes' }).click(),
    ]);
}

export default login;
