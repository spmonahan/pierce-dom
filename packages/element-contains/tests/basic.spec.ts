import { test, expect } from '@playwright/test';
import { execTest, genResult } from './execTest';

const BASIC_TEST_PAGE = 'http://localhost:3000/pages/basic.html';


test.describe('basic custom element', () => {
  
  test.describe('light dom', () => {
    test('contains', async ({ page }) => {
     
        await page.goto(BASIC_TEST_PAGE);

        const result = await execTest(page, "lightDomContains");

        expect(result).toEqual(genResult(11, true));

    });

    test('does not contain', async ({ page }) => {
     
      await page.goto(BASIC_TEST_PAGE);

      const result = await execTest(page, "lightDomNotContains");

      expect(result).toEqual(genResult(9, false));

    });
  });

  test.describe('shadow dom', () => {
    test('contains', async ({ page }) => {
     
      await page.goto(BASIC_TEST_PAGE);

      const result = await execTest(page, "shadowDomContains");

      expect(result).toEqual(genResult(8, true));
    });

    test('does not contain', async ({ page }) => {
     
      await page.goto(BASIC_TEST_PAGE);

      const result = await execTest(page, "shadowDomNotContains");

      expect(result).toEqual(genResult(5, false));
    });
  });
})
