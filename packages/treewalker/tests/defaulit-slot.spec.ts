import { test, expect } from '@playwright/test';

const DEFAULT_SLOT_TEST_PAGE = 'http://localhost:3000/pages/default-slot.html';

const execTest = async <T>(page, testName: string): T => {

  const result = await page.evaluate((testName: string) => {
    return window.__pierce_dom__.ShadowDomTreeWalker[testName]();
  }, testName);

  return result as T;

};

test.describe('default slot custom element', () => {
  test('simple walk', async ({ page }) => {
    await page.goto(DEFAULT_SLOT_TEST_PAGE);
  
    const walkResult = await execTest(page, "walk");
  
    expect(walkResult).toEqual([
      "body",
      "test-root",
      "first",
      "second",
      "default-slot-first-child",
      "default-slot-second-child",
      "slot",
      "slotted",
      "default-slot-last-child",
      "last",
      "test-script"
    ]);
  });
  
  test.describe('shadow root', () => {
  
    test('first child', async ({ page }) => {
      await page.goto(DEFAULT_SLOT_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowFirstChild");
  
      expect(walkResult).toEqual([
        "second",
        "default-slot-first-child"
      ]);
    });
  
    test('last child', async ({ page }) => {
      await page.goto(DEFAULT_SLOT_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowLastChild");
  
      expect(walkResult).toEqual([
        "second",
        "default-slot-last-child"
      ]);
    });
  
    test('parent node', async ({ page }) => {
      await page.goto(DEFAULT_SLOT_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowParentNode");
  
      expect(walkResult).toEqual([
        "second",
        "default-slot-last-child",
        "second"
      ]);
    });
  
    test('siblings', async ({ page }) => {
      await page.goto(DEFAULT_SLOT_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowSiblings");
  
      expect(walkResult).toEqual([
        "second",
        "default-slot-first-child",
        "default-slot-second-child",
        "slot",
        "default-slot-last-child",
        null,
        "slot",
        "default-slot-second-child",
        "default-slot-first-child",
        null
      ]);
    });
  
    test('next and previous node', async ({ page }) => {
      await page.goto(DEFAULT_SLOT_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowNextPrev");
  
      expect(walkResult).toEqual([
        "second",
        "default-slot-first-child",
        "default-slot-second-child",
        "slot",
        "slotted",
        "default-slot-last-child",
        "slotted",
        "slot",
        "default-slot-second-child",
        "default-slot-first-child",
      ]);
    });
  
  });
})
