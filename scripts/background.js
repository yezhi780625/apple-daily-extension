let changing = false;

chrome.browserAction.onClicked.addListener(async tab => {
  if (changing) return;
  changing = true;
  try {
    const enabled = await getEnabled();
    const enabling = !enabled;
    await setEnabled(enabling);
    await reloadAllAppleDailyTabs(tab);
    setTabIcon(tab.id);
  } catch (e) {
    console.error(e);
  }
  changing = false;
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => setTabIcon(tabId));
