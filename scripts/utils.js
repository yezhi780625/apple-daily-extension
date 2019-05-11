/* eslint-disable no-unused-vars */
const STORAGE_KEY = 'apple-daily';

const getEnabled = () =>
  new Promise(resolve =>
    chrome.storage.sync.get([STORAGE_KEY], ({ [STORAGE_KEY]: result }) =>
      resolve(['true', undefined].includes(result))
    )
  );
const setEnabled = enabling =>
  new Promise(resolve =>
    chrome.storage.sync.set(
      { [STORAGE_KEY]: enabling ? 'true' : 'false' },
      resolve
    )
  );
const getAllAppleDailyTabs = () =>
  new Promise(resolve =>
    chrome.tabs.query({ url: 'https://*.appledaily.com/*' }, resolve)
  );
const reloadTab = tab =>
  new Promise(resolve => chrome.tabs.reload(tab.id, {}, resolve));
const reloadAllAppleDailyTabs = async () => {
  const tabs = await getAllAppleDailyTabs();
  await Promise.all(tabs.map(async tab => reloadTab(tab)));
};
const setIcon = status =>
  new Promise(resolve =>
    chrome.browserAction.setIcon({ path: `../images/${status}.png` }, resolve)
  );
const setDisabledIcon = async () => setIcon('disable');
const setEnabledIcon = async () => setIcon('enable');
const setActiveIcon = async () => setIcon('active');
const setTabIcon = async tabId => {
  const enabled = await getEnabled();
  const allAppleDailyTabs = await getAllAppleDailyTabs();
  if (!enabled) {
    await setDisabledIcon();
  } else if (allAppleDailyTabs.map(tab => tab.id).includes(tabId)) {
    await setActiveIcon();
  } else {
    await setEnabledIcon();
  }
};
