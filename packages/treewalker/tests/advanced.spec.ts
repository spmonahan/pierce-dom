import { test, expect } from '@playwright/test';
import { execTest } from './execTest';

const ADVANCED_TEST_PAGE = 'http://localhost:3000/pages/advanced.html';

test.describe('advanced custom element', () => {
  test('simple walk', async ({ page }) => {
    await page.goto(ADVANCED_TEST_PAGE);
  
    const walkResult = await execTest(page, "walk");
  
    expect(walkResult).toEqual([
      "body",
        "test-root",
      
          "first",
            "first-child",
              "first-grand-child-one",
                "basic-first-child",
                "basic-second-child",
                "basic-last-child",
              "first-grand-child-two",

          "second",
            "basic-first-child",
            "basic-second-child",
            "basic-last-child",

          "third",
            "default-slot-first-child",
            "default-slot-second-child",
            "slot",
              "third-child",
                "default-slot-first-child",
                "default-slot-second-child",
                "slot",
                  "third-child-slotted",
                "default-slot-last-child",
            "default-slot-last-child",
      
          "fourth",
            "fourth-child",
              "default-slot-first-child",
              "default-slot-second-child",
              "slot",
                "fourth-grand-child-one",
                  "named-slots-first-child",
                  "first-slot",
                    "fourth-grand-child-one-first-slot",
                      "basic-first-child",
                      "basic-second-child",
                      "basic-last-child",
                  "named-slots-second-child",
                  "second-slot",
                    "fourth-grand-child-one-second-slot",
                  "named-slots-last-child",
                  "third-slot",
                    "fourth-grand-child-one-third-slot",
              "default-slot-last-child",
      "test-script"
      
    ]);
  });
  
//   test.describe('shadow root', () => {
  
//     test('first child', async ({ page }) => {
//       await page.goto(ADVANCED_TEST_PAGE);
  
//       const walkResult = await execTest(page, "shadowFirstChild");
  
//       expect(walkResult).toEqual([
//         "second",
//         "named-slots-first-child"
//       ]);
//     });
  
//     test('last child', async ({ page }) => {
//       await page.goto(ADVANCED_TEST_PAGE);
  
//       const walkResult = await execTest(page, "shadowLastChild");
  
//       expect(walkResult).toEqual([
//         "second",
//         "third-slot"
//       ]);
//     });
  
//     test('parent node', async ({ page }) => {
//       await page.goto(ADVANCED_TEST_PAGE);
  
//       const walkResult = await execTest(page, "shadowParentNode");
  
//       expect(walkResult).toEqual([
//         "second",
//         "third-slot",
//         "second"
//       ]);
//     });
  
//     test('siblings', async ({ page }) => {
//       await page.goto(ADVANCED_TEST_PAGE);
  
//       const walkResult = await execTest(page, "shadowSiblings");
  
//       expect(walkResult).toEqual([
//         "second",
//         "named-slots-first-child",
//         "first-slot",
//         "named-slots-second-child",
//         "second-slot",
//         "named-slots-last-child",
//         "third-slot",
//         null,
//         "named-slots-last-child",
//         "second-slot",
//         "named-slots-second-child",
//         "first-slot",
//         "named-slots-first-child",
//         null
//       ]);
//     });
  
//     test('next and previous node', async ({ page }) => {
//       await page.goto(ADVANCED_TEST_PAGE);
  
//       const walkResult = await execTest(page, "shadowNextPrev");
  
//       expect(walkResult).toEqual([
//         "second",
//         "named-slots-first-child",
//         "first-slot",
//         "first-slotted",
//         "named-slots-second-child",
//         "second-slot",
//         "second-slotted",
//         "named-slots-last-child",
//         "third-slot",
//         "named-slots-last-child",
//         "second-slotted",
//         "second-slot",
//         "named-slots-second-child",
//         "first-slotted",
//         "first-slot",
//         "named-slots-first-child",
//       ]);
//     });
  
//   });
})
