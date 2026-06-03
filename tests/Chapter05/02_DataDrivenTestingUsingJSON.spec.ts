// Import playwright module
import { test, expect } from '@playwright/test';
import testData from '../../test-data/qa/testdata.json';

type TestData = {
    TestDataSet1: {
        Skill1: string,
        Skill2: string,
        Skill3: string,
        Skill4: string,
        Skill5: string,
        Skill6: string,
        Skill7: string,
    },
    TestDataSet2: {
        Skill1: string,
        Skill2: string,
        Skill3: string,
        Skill4: string,
        Skill5: string,
        Skill6: string,
        Skill7: string,
    },
}
const typedTestData = testData as TestData;

/**
 * Author Testers Talk
 */
for (const dataSetName in typedTestData) {

    const skill = typedTestData[dataSetName as keyof TestData];

    test(`Data Driven Testing Using JSON file in playwright : ${skill.Skill2}`, { tag: ['@DataDrivenTesting'] }, async ({ page }) => {

        console.log(`Data set name : ${dataSetName}`);
        console.log(`Skill : ${skill.Skill1}`);
        console.log(`Skill : ${skill.Skill2}`);
        console.log(`Skill : ${skill.Skill3}`);
        console.log(`Skill : ${skill.Skill4}`);
        console.log(`Skill : ${skill.Skill5}`);
        console.log(`Skill : ${skill.Skill6}`);
        console.log(`Skill : ${skill.Skill7}`);

        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill(skill.Skill2);
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: skill.Skill2 }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle(skill.Skill2 + '☑️ - YouTube');
    });
}