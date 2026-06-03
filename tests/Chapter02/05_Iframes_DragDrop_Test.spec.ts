// Import playwright module
import { test, expect } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Handling Iframes, Drag and Drop element in playwright', async ({ page }) => {
    // Go to URL
    await page.goto('https://jqueryui.com/droppable/');

    const iframe = page.frameLocator('[class="demo-frame"]');
    
    // drag element, drop element
    const dragElement = iframe.locator('[id="draggable"]');
    const dropElement = iframe.locator('[id="droppable"]');

    await dragElement.dragTo(dropElement);
});

