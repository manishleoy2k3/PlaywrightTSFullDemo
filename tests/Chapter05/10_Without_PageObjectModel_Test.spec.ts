// Import playwright module
import { test, expect, Page, Locator } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { subAreaMenuSelectors, FormControlSelectors, CommandBarFormButtonsSelectors } from "../../selectors/commonselectors.json";
import { navigateToApps, stringFormat, waitUntilAppIdle } from '../../src/utils/Common';

const appId = `process.env.CSH_APPID`;

/**
 * Author Testers Talk
 */
test('Without Page Object Model in Playwright', async ({ page }: { page: Page }) => {

  await navigateToApps(page, stringFormat(appId), 'Customer Service Hub');

  await page.locator(stringFormat(subAreaMenuSelectors.ServiceCaseMenuSelector, "Service", "Cases")).click();

  await page.locator(stringFormat(CommandBarFormButtonsSelectors.DynamicCommandBarButtonSelector, 'New Case')).click();

  const titleLocator = page.locator(stringFormat(FormControlSelectors.TextBox, 'title'));
  await titleLocator.click();
  await titleLocator.fill('TEST CASE AUTOMATION - SAMPLE ' + Math.floor((Math.random() * 100) + 1).toString());

  await page.locator(stringFormat(FormControlSelectors.LookupButton, 'customerid')).click();
  await page.getByRole('button', { name: 'Search records for Customer, Lookup field' }).click();
  await page.getByRole('treeitem', { name: 'Fourth Coffee, claudia@pmgdemo.onmicrosoft.com' })
    .getByText('Fourth Coffee').click();

  const descriptionLocator = page.locator(stringFormat(FormControlSelectors.TextBox, 'description'));
  await descriptionLocator.click();
  await descriptionLocator.fill('We are having issue turning on the coffee machine.');

  await page.locator(stringFormat(CommandBarFormButtonsSelectors.DynamicCommandBarButtonSelector, 'Save')).click();

  await waitUntilAppIdle(page);

  const ticketNumberLocator = page.locator(stringFormat(FormControlSelectors.TextBoxValueSelector, 'ticketnumber'));
  await ticketNumberLocator.waitFor({ state: 'visible' });

  await ticketNumberLocator.waitFor({ state: 'attached' });
  const caseNumber = await ticketNumberLocator.inputValue();
  console.log(stringFormat('CREATED A NEW CASE: {0}', caseNumber));
});
