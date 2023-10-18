export const addTest = (name, fn, win) => {
    win = win || window;
    win.__pierce_dom__ = window.__pierce_dom__ || {};
    win.__pierce_dom__.ShadowDomTreeWalker = window.__pierce_dom__.ShadowDomTreeWalker || {};
    win.__pierce_dom__.ShadowDomTreeWalker[name] = fn;
}