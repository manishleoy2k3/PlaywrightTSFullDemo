// Import playwright module
import { test } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Count total tests in playwright report', async ({ page }) => {

    const reportPath = 'file:///path/PlaywrightTypeScriptTutorialFullCourse/screenshots/playwright-report/index.html';
    await page.goto(reportPath);

   // Object to store the counts of tests (total, passed, failed, flaky) per spec file
  const testStatusCounts: Record<string, { total: number, passed: number, failed: number, flaky: number, skipped: number }> = {};

  // Get all chips (each representing a spec file)
  const chips = await page.locator('.chip').all();

  for (const chip of chips) {
    // Extract the spec file path from the header
    const filePath = await chip.locator('.chip-header span').textContent();

    if (filePath) {
      let totalCount = 0;
      let passedCount = 0;
      let failedCount = 0;
      let flakyCount = 0;
      let skippedCount = 0;

      // Get all test entries under this spec file
      const testEntries = await chip.locator('.test-file-test').all();

      for (const testEntry of testEntries) {
        totalCount++; // Increment the total test count

        // Check the test status (success, failure, flaky)
        const testStatusIcon = await testEntry.locator('.test-file-test-status-icon svg').getAttribute('class');

        // Check for passed tests
        if (testStatusIcon?.includes('color-icon-success')) {
          passedCount++;
        }
        // Check for failed tests
        else if (testStatusIcon?.includes('color-text-danger')) {
          failedCount++;
        }
        // Check for skipped tests (replace with actual class if different)
        else if (testStatusIcon?.includes('octicon')) {
            skippedCount++;
        }
        // For flaky tests, you can use another class or rule (adjust this if you have flaky indicators)
        else if (testStatusIcon?.includes('color-icon-warning')) {
          flakyCount++;
        }
      }

      // Store the counts for this spec file
      testStatusCounts[filePath] = {
        total: totalCount,
        passed: passedCount,
        failed: failedCount,
        flaky: flakyCount,
        skipped: skippedCount
      };
    }
  }

  // Print the result (for debugging or checking the counts)
  console.log(testStatusCounts);

});