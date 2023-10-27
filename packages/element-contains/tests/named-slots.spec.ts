import { test, expect } from '@playwright/test';
import { execTest, genResult } from './execTest';

const NAMED_SLOT_TEST_PAGE = 'http://localhost:3000/pages/named-slots.html';


test.describe('named slot custom element', () => {
  test.describe('light dom', () => {
    test('contains', async ({ page }) => {

        await page.goto(NAMED_SLOT_TEST_PAGE);

        const result = await execTest(page, "lightDomContains");
        expect(result).toEqual(genResult(9, true));
    });

    test('does not contain', async ({ page }) => {

        await page.goto(NAMED_SLOT_TEST_PAGE);

        const result = await execTest(page, "lightDomNotContains");
        expect(result).toEqual(genResult(4, false));

    });
  });

  test.describe('shadow root', () => {

    test('contains', async ({ page }) => {
        await page.goto(NAMED_SLOT_TEST_PAGE);

        const result = await execTest(page, "shadowDomContains");
        expect(result).toEqual(genResult(14, true));
    });

    test('does not contain', async ({ page }) => {
        await page.goto(NAMED_SLOT_TEST_PAGE);

        const result = await execTest(page, "shadowDomNotContains");
        expect(result).toEqual(genResult(9, false));
    });

  });
});
