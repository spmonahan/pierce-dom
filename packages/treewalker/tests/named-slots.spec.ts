import { test, expect } from '@playwright/test';

const NAMED_SLOTS_TEST_PAGE = 'http://localhost:3000/pages/named-slots.html';

const execTest = async <T>(page, testName: string): T => {

  const result = await page.evaluate((testName: string) => {
    return window.__pierce_dom__.ShadowDomTreeWalker[testName]();
  }, testName);

  return result as T;

};

test.describe('named slots custom element', () => {
  test('simple walk', async ({ page }) => {
    await page.goto(NAMED_SLOTS_TEST_PAGE);
  
    const walkResult = await execTest(page, "walk");
  
    expect(walkResult).toEqual([
      "body",
      "test-root",
      "first",
      "second",
      "named-slots-first-child",
      "first-slot",
      "first-slotted",
      "named-slots-second-child",
      "second-slot",
      "second-slotted",
      "named-slots-last-child",
      "third-slot",
      "last",
      "test-script"
    ]);
  });
  
  test.describe('shadow root', () => {
  
    test('first child', async ({ page }) => {
      await page.goto(NAMED_SLOTS_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowFirstChild");
  
      expect(walkResult).toEqual([
        "second",
        "named-slots-first-child"
      ]);
    });
  
    test('last child', async ({ page }) => {
      await page.goto(NAMED_SLOTS_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowLastChild");
  
      expect(walkResult).toEqual([
        "second",
        "third-slot"
      ]);
    });
  
    test('parent node', async ({ page }) => {
      await page.goto(NAMED_SLOTS_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowParentNode");
  
      expect(walkResult).toEqual([
        "second",
        "third-slot",
        "second"
      ]);
    });
  
    test('siblings', async ({ page }) => {
      await page.goto(NAMED_SLOTS_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowSiblings");
  
      expect(walkResult).toEqual([
        "second",
        "named-slots-first-child",
        "first-slot",
        "named-slots-second-child",
        "second-slot",
        "named-slots-last-child",
        "third-slot",
        null,
        "named-slots-last-child",
        "second-slot",
        "named-slots-second-child",
        "first-slot",
        "named-slots-first-child",
        null
      ]);
    });
  
    test('next and previous node', async ({ page }) => {
      await page.goto(NAMED_SLOTS_TEST_PAGE);
  
      const walkResult = await execTest(page, "shadowNextPrev");
  
      expect(walkResult).toEqual([
        "second",
        "named-slots-first-child",
        "first-slot",
        "first-slotted",
        "named-slots-second-child",
        "second-slot",
        "second-slotted",
        "named-slots-last-child",
        "third-slot",
        "named-slots-last-child",
        "second-slotted",
        "second-slot",
        "named-slots-second-child",
        "first-slotted",
        "first-slot",
        "named-slots-first-child",
      ]);
    });
  
  });
})
