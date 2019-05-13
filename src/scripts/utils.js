/* eslint-disable no-unused-vars */
const STORAGE_KEY = 'apple-daily';

const getEnabled = () =>
  new Promise(resolve =>
    chrome.storage.sync.get(
      [STORAGE_KEY],
      ({ [STORAGE_KEY]: result = 'true' } = {}) => resolve(result === 'true')
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
const getCurrentTab = () =>
  new Promise(resolve =>
    chrome.tabs.query({ active: true }, ([current]) => resolve(current))
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
const setTabIcon = async () => {
  const currentTab = await getCurrentTab();
  const enabled = await getEnabled();
  const allAppleDailyTabs = await getAllAppleDailyTabs();
  if (!enabled) {
    await setDisabledIcon();
  } else if (allAppleDailyTabs.map(tab => tab.id).includes(currentTab.id)) {
    await setActiveIcon();
  } else {
    await setEnabledIcon();
  }
};
