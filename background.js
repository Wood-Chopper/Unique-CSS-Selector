chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "get-css-selector",
        title: "Get unique CSS selector",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "get-css-selector") {
        chrome.tabs.sendMessage(tab.id, { action: "get-css-selector" });
    }
});