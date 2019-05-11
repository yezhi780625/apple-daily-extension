module.exports = {
  env: {
    browser: true,
    webextensions: true,
  },
  extends: ['standard', 'prettier'],
  globals: {
    $: 'readonly',
    STORAGE_KEY: 'readonly',
    getEnabled: 'readonly',
    setEnabled: 'readonly',
    reloadAllAppleDailyTabs: 'readonly',
    setTabIcon: 'readonly',
  },
};
