export const addTest = (name, fn, win) => {
    win = win || window;
    win.__pierce_dom__ = window.__pierce_dom__ || {};
    win.__pierce_dom__.elementContains = window.__pierce_dom__.elementContains || {};
    win.__pierce_dom__.elementContains[name] = fn;
}

