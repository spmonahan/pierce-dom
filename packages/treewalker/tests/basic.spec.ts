import { test, expect } from '@playwright/test';
import { execTest } from './execTest';

const BASIC_TEST_PAGE = 'http://localhost:3000/pages/basic.html';

test.describe('basic custom element', () => {
  test('simple walk', async ({ page }) => {
    await page.goto(BASIC_TEST_PAGE);
  
    const walkResult = await execTest(page, "walk");
  
    expect(walkResult).toEqual([
      "body",
      "test-root",
      "first",
      "second",
      "basic-first-child",
      "basic-second-child",
      "basic-last-child",
      "last",
      "test-script"
    ]);
  });
  
  test.describe('shadow root', () => {
  
    test('first child', async ({ page }) => {
      await page.goto(BASIC_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowFirstChild");
  
      expect(walkResult).toEqual([
        "second",
        "basic-first-child"
      ]);
    });
  
    test('last child', async ({ page }) => {
      await page.goto(BASIC_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowLastChild");
  
      expect(walkResult).toEqual([
        "second",
        "basic-last-child"
      ]);
    });
  
    test('parent node', async ({ page }) => {
      await page.goto(BASIC_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowParentNode");
  
      expect(walkResult).toEqual([
        "second",
        "basic-last-child",
        "second"
      ]);
    });
  
    test('siblings', async ({ page }) => {
      await page.goto(BASIC_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowSiblings");
  
      expect(walkResult).toEqual([
        "second",
        "basic-first-child",
        "basic-second-child",
        "basic-last-child",
        null,
        "basic-second-child",
        "basic-first-child",
        null
      ]);
    });
  
    test('next and previous node', async ({ page }) => {
      await page.goto(BASIC_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowNextPrev");
  
      expect(walkResult).toEqual([
        "second",
        "basic-first-child",
        "basic-second-child",
        "basic-last-child",
        "basic-second-child",
        "basic-first-child",
      ]);
    });
  
  });
})
