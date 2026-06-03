// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Iterating matching elements in playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://github.com/BakkappaN');

    // For of loop
    const repositoryLinks = await page.$$('.repo');
    for (const repositoryLink of repositoryLinks) {
        const text = await repositoryLink.textContent();
        console.log(`Text from 1st for loop: ${text}`);
    }

    console.log(`==========================`);

    // For loop using index
    for (let index = 0; index < repositoryLinks.length; index++) {
        const text = await repositoryLinks[index].textContent();
        console.log(`Text from 2nd for loop: ${text}`);
    }

    console.log(`==========================`);

    // For loop using nth() method
    const repositoryLinks2 = page.locator('.repo');
    const count = await repositoryLinks2.count();
    for (let index = 0; index < count; index++) {
        const text = await repositoryLinks2.nth(index).textContent();
        console.log(`Text from 3rd for loop: ${text}`);
    }
});