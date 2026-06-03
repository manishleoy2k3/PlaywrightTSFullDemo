// Import playwright module
import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { ResultPage } from '../../src/pages/ResultPage';
import { PlaylistPage } from '../../src/pages/PlaylistPage';

/**
 * author Testers Talk
 */
test('Page Object Model Test in Playwright', async ({ page }) => {

    // Create object of homepage
    const homePage = new HomePage(page);
    await homePage.goToURL();
    await homePage.searchWithKeywords(`${process.env.SEARCH_KEYWORDS}`);

    // Create object of resultpage
    const resultPage = new ResultPage(page);
    await resultPage.clickOnPlaylist(`${process.env.SEARCH_KEYWORDS}`)

    // Create object of playlistpage
    const playlistPage = new PlaylistPage(page);
    await playlistPage.validatePageTitle(`${process.env.SEARCH_KEYWORDS}` + '☑️ - YouTube')
});