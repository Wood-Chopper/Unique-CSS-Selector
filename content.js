function getUniqueCSSSelector(element) {
    const getPath = (el) => {
        if (!el || el.nodeType !== 1) return '';
        let path = '';
        while (el && el.nodeType === 1) {
            let selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += `#${el.id}`;
            } else if (el.className) {
                selector += `.${el.className.trim().replace(/\s+/g, '.')}`;
            }
            path = `${selector}${path ? '>' : ''}${path}`;
            el = el.parentNode;
        }
        return path;
    };

    let selector = getPath(element);
    if (!document.querySelector(selector)) return '';
    let index = 0;
    let sibling = element;
    while ((sibling = sibling.previousElementSibling)) {
        index++;
    }
    if (index > 0) {
        selector += `:nth-child(${index + 1})`;
    }
    return selector;
}

document.addEventListener("mousedown", (event) => {
    if (event.button === 2) {
        window.lastRightClickedElement = event.target;
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "get-css-selector") {
        const element = window.lastRightClickedElement;
        const selector = getUniqueCSSSelector(element);
        prompt('selector', selector);
    }
});
