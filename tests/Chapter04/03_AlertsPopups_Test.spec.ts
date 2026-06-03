// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Handling Alert popups in Playwright ', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');

    page.once('dialog', dialog =>{
        dialog.accept();
        console.log(`Alert message is : ${dialog.message()}`);
        console.log(`Dialog type is : ${dialog.type()}`);
    })
    await page.getByText('See an example alert', {exact : true}).click();
});

/**
 * Author Testers Talk
 */
test('Handling Popups in Playwright ', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');

    page.once('dialog', dialog =>{
        console.log(`Dialog type is : ${dialog.type()}`);
        //dialog.accept();
        dialog.dismiss();
        console.log(`Popup message is : ${dialog.message()}`);
    })
    await page.getByText('See a sample confirm', {exact : true}).click();
});

// Write a test
test('Handling Prompt Popups in Playwright ', async ({ page }) => {
    // Go to URL
    await page.goto('https://www.selenium.dev/documentation/webdriver/interactions/alerts/');

    page.once('dialog', async(dialog) =>{
        console.log(`Dialog type is : ${dialog.type()}`);
        console.log(`Prompt popup message is : ${dialog.message()}`);
        await dialog.accept('playwright');
    })
    await page.getByText('See a sample prompt', {exact : true}).click();
});


