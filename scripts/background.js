chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      // That fires when a page's URL contains a 'g' ...
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'facebook.com', schemes: ['https'] },
        })
      ],
      // And shows the extension's page action.
      actions: [
        new chrome.declarativeContent.ShowPageAction(),
        
      ]
    }
  ]);
});