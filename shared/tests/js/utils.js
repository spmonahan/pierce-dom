export const addTest = (packageUnderTest) => (name, fn, win) => {
    win = win || window;
    win.__pierce_dom__ = window.__pierce_dom__ || {};
    win.__pierce_dom__[packageUnderTest] = window.__pierce_dom__[packageUnderTest] || {};
    win.__pierce_dom__[packageUnderTest][name] = fn;
}