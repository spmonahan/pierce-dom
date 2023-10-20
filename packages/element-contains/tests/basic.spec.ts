import { test, expect } from '@playwright/test';

const BASIC_TEST_PAGE = 'http://localhost:3000/pages/basic.html';

const execTest = async <T>(page, testName: string): T => {

  const result = await page.evaluate((testName: string) => {
    return window.__pierce_dom__.elementContains[testName]();
  }, testName);

  return result as T;

};

const genResult = (num, value) => {
  return new Array(num).fill(value);
}


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
