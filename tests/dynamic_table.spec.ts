import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import deepEqual from 'fast-deep-equal';

import { HomePage } from '../pages/HomePage';
import { extractTableData } from '../utils/ExtractedData';

let homePage: HomePage;

test.describe('Verify the efficiency of Dynamic Table App', () => {

  test.beforeEach(async ({ page, context }) => {
    homePage = new HomePage(page, context);
  });
  
  test('Table Data Update and Cross Verify', async () => {
        // Navigate to baseurl
        await homePage.goto('https://testpages.herokuapp.com/styled/tag/dynamic-table.html');
        // Verify title
        await homePage.waitForLoadState('networkidle');
        await expect(await homePage.getTitle()).toBe('Table HTML Tag - JavaScript Created');

        // setup the data file 
        const jsonData = fs.readFileSync('./data/tabledata.json', 'utf-8');
        // Verify table data button is visible 
        await expect(homePage.tableBtn).toBeVisible();
        await expect(homePage.tableBtn).toBeEnabled();
        await homePage.tableBtn.click();

        // Verify json TextField is visible and Enter field
        await expect(homePage.jsonTextBox).toBeVisible();
        await expect(homePage.jsonTextBox).toBeEnabled();
        // await homePage.jsonTextBox.click();
        await homePage.jsonTextBox.fill(jsonData);

        // Verify refresh table button is visible and enabled
        await expect(homePage.refreshTblBtn).toBeVisible();
        await expect(homePage.refreshTblBtn).toBeEnabled();
        await homePage.refreshTblBtn.click();
        await homePage.waitForLoadState('networkidle');

        // Verify table is visible after data update  and data is correct
        await expect(homePage.dynamicTbl).toBeVisible();
        await expect(homePage.dynamicTbl).toBeEnabled();

        // Verify table data is correct and matches the json data
        const extractedTableData = await extractTableData(homePage.dynamicTbl);
        const isDataValid = deepEqual(JSON.parse(jsonData), JSON.parse(JSON.stringify(extractedTableData)));
        expect(isDataValid).toBeTruthy();

        // Log extractedTableData and jsonData for debugging purpose
        await console.log('extractedTableData : ', extractedTableData);
        await console.log('jsonData : ', jsonData);
        console.log('isDataValid : ', isDataValid);

  })
});