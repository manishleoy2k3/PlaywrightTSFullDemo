import { test } from '../../src/fixture/TestFixture';

/**
 * Example: Using Pre-Authenticated Fixtures
 * 
 * This demonstrates how to use storage state authentication
 * to skip the login process and start tests with authenticated sessions
 */

test.describe('Authenticated User Tests', () => {
  
  test('User should see personalized dashboard [with auth]', async ({ authenticatedHomePage }) => {
    // ✅ No login needed! User is already authenticated via storage state
    
    await authenticatedHomePage.page.goto('/');
    
    // Verify user-specific elements are visible
    // await expect(authenticatedHomePage.userMenuButton).toBeVisible();
    // await expect(authenticatedHomePage.userNameText).toContainText('User Name');
  });

  test('User can access result page directly [with auth]', async ({ authenticatedResultPage }) => {
    // ✅ Pre-authenticated ResultPage
    
    await authenticatedResultPage.page.goto('/results');
    
    // Start testing immediately without login flow
    // const results = await authenticatedResultPage.getResults();
    // expect(results.length).toBeGreaterThan(0);
  });

  test('User playlist functionality [with auth]', async ({ authenticatedPlaylistPage }) => {
    // ✅ Pre-authenticated PlaylistPage
    
    await authenticatedPlaylistPage.page.goto('/playlists');
    
    // Test playlist features while already logged in
    // await authenticatedPlaylistPage.createPlaylist('My Playlist');
  });
});

test.describe('Admin-Only Tests', () => {
  
  test('Admin should access admin dashboard [admin auth]', async ({ adminPage }) => {
    // ✅ Uses admin authentication from storage state
    
    await adminPage.goto('/admin/dashboard');
    
    // Admin-specific tests here
    // await expect(adminPage).toHaveTitle(/Admin/);
  });

  test('Admin can manage users [admin auth]', async ({ adminPage }) => {
    // ✅ Pre-authenticated admin page
    
    await adminPage.goto('/admin/users');
    
    // Admin user management tests
    // const users = await adminPage.locator('[data-testid="user-row"]').count();
    // expect(users).toBeGreaterThan(0);
  });
});

test.describe('Unauthenticated Tests', () => {
  
  test('User should log in successfully [no pre-auth]', async ({ homePage }) => {
    // ❌ Using regular homePage fixture (not authenticated)
    // This will require manual login steps
    
    // This is useful for testing login flows themselves
    // await homePage.login(username, password);
  });

  test('Public pages should be accessible without login', async ({ homePage }) => {
    // ❌ Using regular fixture for public page testing
    
    await homePage.page.goto('/');
    
    // Test public functionality
  });
});
