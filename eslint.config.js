import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  // Global JavaScript and TypeScript recommendations across all files
  js.configs.recommended,
  ...tseslint.configs.recommended,
  
  {
    // Targeted scope configuration for Playwright automation scripts
    files: ['tests/**/*.spec.ts', 'tests/**/*.test.ts', 'src/domains/**/*.ts'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      
      // Architect Grade Customizations
      'playwright/no-wait-for-timeout': 'error',       // Disallow flakiness via page.waitForTimeout()
      'playwright/prefer-web-first-assertions': 'error', // Force async expect rules (toHaveText vs textContent)
      'playwright/no-element-handle': 'warn',           // Warn against legacy Selenium-style locator handles ($)
      'playwright/no-conditional-in-test': 'warn',      // Flag conditional statements that obscure assertion clarity
      '@typescript-eslint/no-floating-promises': 'error', // Catch forgotten awaits before test threads execution
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // Connects compiler types to the linter engine
      },
    },
  },
  
  {
    // Global rule overrides for directories like configuration settings
    ignores: ['node_modules/', 'test-results/', 'playwright-report/', 'blob-report/']
  }
);