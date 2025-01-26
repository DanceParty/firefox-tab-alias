// background.js
browser.menus.create({
  id: "rename-tab",
  title: "Rename Tab",
  contexts: ["tab"],
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "rename-tab") {
    browser.tabs.sendMessage(tab.id, {
      command: "openRenameModal",
      title: tab.title,
      tabId: tab.id,
    });
  }
});

// Listen for URL changes
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const result = await browser.storage.local.get(`tab-${tabId}`);
    if (result[`tab-${tabId}`]) {
      browser.tabs.sendMessage(tabId, {
        command: "setTitle",
        title: result[`tab-${tabId}`],
      });
    }
  }
});
