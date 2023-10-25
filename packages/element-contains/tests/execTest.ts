export const execTest = async <T>(page, testName: string): T => {

    const result = await page.evaluate((testName: string) => {
      return window.__pierce_dom__.elementContains[testName]();
    }, testName);
  
    return result as T; 
};

export const genResult = (num, value) => {
  return new Array(num).fill(value);
}