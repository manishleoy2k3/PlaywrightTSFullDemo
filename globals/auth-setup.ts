import { chromium, FullConfig } from '@playwright/test';
import { login } from '../src/utils/Login';
import path from 'path';
import fs from 'fs';

/**
 * Global setup for authenticating users and saving storage state
 * This runs once before all tests and saves authenticated sessions
 */
async function globalSetup(config: FullConfig) {
  // Ensure storage-state directory exists
  const storageStateDir = path.resolve(__dirname, '../storage-state');
  if (!fs.existsSync(storageStateDir)) {
    fs.mkdirSync(storageStateDir, { recursive: true });
  }

  const browser = await chromium.launch();

  // Define authentication profiles
  const authProfiles = [
    {
      name: 'user',
      username: process.env.USER_EMAIL || 'user@example.com',
      password: process.env.USER_PASSWORD || 'password123',
      storageFile: path.join(storageStateDir, 'user-auth.json'),
    },
    {
      name: 'admin',
      username: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'adminpass123',
      storageFile: path.join(storageStateDir, 'admin-auth.json'),
    },
  ];

  const orgUrl = process.env.ORG_URL || 'https://login.microsoftonline.com';

  // Authenticate each profile
  for (const profile of authProfiles) {
    console.log(`🔐 Authenticating ${profile.name}...`);
    
    try {
      const context = await browser.newContext();
      const page = await context.newPage();

      // Perform login
      await login(page, orgUrl, profile.username, profile.password);

      // Wait a bit for any final redirects
      await page.waitForLoadState('networkidle');

      // Save storage state (includes cookies, localStorage, sessionStorage)
      await context.storageState({ path: profile.storageFile });

      console.log(`✅ ${profile.name} authenticated and saved to ${profile.storageFile}`);

      await context.close();
    } catch (error) {
      console.error(`❌ Failed to authenticate ${profile.name}:`, error);
      // Don't fail the entire setup, just log the error
    }
  }

  await browser.close();
  console.log('🎯 Global setup completed!');
}

export default globalSetup;
