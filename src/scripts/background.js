const cookiesKeys = ['article', 'articleExpires', 'articleValid', 'articleID'];

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  switch (msg.type) {
    case 'resetCookies':
      cookiesKeys.forEach(name =>
        chrome.cookies.remove({
          url: 'http://appledaily.com',
          name,
        })
      );
      break;
    default:
      console.error('unknown type:', msg.type);
  }
  sendResponse('reset cookies successfully!');
});
