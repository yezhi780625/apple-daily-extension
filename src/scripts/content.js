const localStorageKeys = [
  'article',
  'articleExpires',
  'articleID',
  'articleValid',
];

const log = (...args) =>
  console.log('%c[Apple Daily Extension]', 'color: #FF00FF;', ...args);

localStorageKeys.forEach(key => localStorage.removeItem(key));
log('reset LocalStorage successfully!');
chrome.runtime.sendMessage({ type: 'resetCookies' }, log);
