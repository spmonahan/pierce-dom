export const execTest = async <T>(page, testName: string): T => {

    const result = await page.evaluate((testName: string) => {
      return window.__pierce_dom__.ShadowDomTreeWalker[testName]();
    }, testName);
  
    return result as T; 
};