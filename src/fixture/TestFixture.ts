import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ResultPage } from '../pages/ResultPage';
import { PlaylistPage } from '../pages/PlaylistPage';
import { loadTestData } from '../utils/JsonHelper';
import { TestData } from '../interface/Module1TestData.interface';
import path from 'path';

/**
 * author Testers Talk
 * 
 * Extended fixtures with storage state authentication support
 */
export const test = base.extend<{
    saveLogs: void;
    homePage: HomePage;
    resultPage: ResultPage;
    playlistPage: PlaylistPage;
    testData: TestData;
    userPage: any; // Authenticated user page
    adminPage: any; // Authenticated admin page
    authenticatedHomePage: HomePage; // Pre-authenticated home page
    authenticatedResultPage: ResultPage; // Pre-authenticated result page
    authenticatedPlaylistPage: PlaylistPage; // Pre-authenticated playlist page
}>({
    saveLogs: [async ({ }, use) => {
        console.log('Global before is running...');

        await use();

        console.log('Global afterEach is running...');
    },
    { auto: true }],
    
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    
    resultPage: async ({ page }, use) => {
        const resultPage = new ResultPage(page);
        await use(resultPage);
    },
    
    playlistPage: async ({ page }, use) => {
        const playlistPage = new PlaylistPage(page);
        await use(playlistPage);
    },
    
    testData: async ({ }, use) => {
        const data = await loadTestData();
        await use(data);
    },

    /**
     * Fixture: userPage - Pre-authenticated user context
     * Loads user storage state (cookies, localStorage, sessionStorage)
     */
    userPage: async ({ browser }, use) => {
        const storageStatePath = path.resolve(__dirname, '../../storage-state/user-auth.json');
        const context = await browser!.newContext({
            storageState: storageStatePath,
        });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },

    /**
     * Fixture: adminPage - Pre-authenticated admin context
     * Loads admin storage state (cookies, localStorage, sessionStorage)
     */
    adminPage: async ({ browser }, use) => {
        const storageStatePath = path.resolve(__dirname, '../../storage-state/admin-auth.json');
        const context = await browser!.newContext({
            storageState: storageStatePath,
        });
        const page = await context.newPage();
        await use(page);
        await context.close();
    },

    /**
     * Fixture: authenticatedHomePage - HomePage with user authentication
     * Use this when you need HomePage with pre-authenticated user session
     */
    authenticatedHomePage: async ({ userPage }, use) => {
        const homePage = new HomePage(userPage);
        await use(homePage);
    },

    /**
     * Fixture: authenticatedResultPage - ResultPage with user authentication
     * Use this when you need ResultPage with pre-authenticated user session
     */
    authenticatedResultPage: async ({ userPage }, use) => {
        const resultPage = new ResultPage(userPage);
        await use(resultPage);
    },

    /**
     * Fixture: authenticatedPlaylistPage - PlaylistPage with user authentication
     * Use this when you need PlaylistPage with pre-authenticated user session
     */
    authenticatedPlaylistPage: async ({ userPage }, use) => {
        const playlistPage = new PlaylistPage(userPage);
        await use(playlistPage);
    },
});

export { expect } from '@playwright/test';