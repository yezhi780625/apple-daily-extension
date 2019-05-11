let changing = false;

chrome.browserAction.onClicked.addListener(async tab => {
  if (changing) return;
  changing = true;
  try {
    const enabled = await getEnabled();
    const enabling = !enabled;
    await setEnabled(enabling);
    await reloadAllAppleDailyTabs(tab);
    setTabIcon();
  } catch (e) {
    console.error(e);
  }
  changing = false;
});

chrome.tabs.onCreated.addListener(setTabIcon);
chrome.tabs.onUpdated.addListener(setTabIcon);
chrome.tabs.onActivated.addListener(setTabIcon);
chrome.tabs.onHighlighted.addListener(setTabIcon);
chrome.tabs.onReplaced.addListener(setTabIcon);
setTabIcon();
