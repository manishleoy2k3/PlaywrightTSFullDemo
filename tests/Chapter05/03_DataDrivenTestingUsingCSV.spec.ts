// Import playwright module
import { test, expect } from '@playwright/test';

import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type TestRecords = {
    Skill1: string,
    Skill2: string
}

const records = parse(
    fs.readFileSync(path.join(__dirname, '../../test-data/qa/testdata.csv')),
    {
        columns: true,
        skipEmptyLines: true
    }
) as TestRecords[];

/**
 * Author Testers Talk
 */
for (const record of records) {

    test(`Data Driven Testing Using CSV file in playwright : ${record.Skill1}`, { tag: ['@DataDrivenTesting'] }, async ({ page }) => {

        console.log(`CSV file row data`);
        console.log(`Skill 1 : ${record.Skill1}`);
        console.log(`Skill 2 : ${record.Skill2}`);

        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill(record.Skill1);
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: record.Skill1 }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle(record.Skill1 + '☑️ - YouTube');
    });
}