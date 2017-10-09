// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly'
// import 'chrome'
///<reference path="../../node_modules/@types/chrome/index.d.ts"/>

chrome.runtime.onInstalled.addListener((details) => {
    console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener((tabId) => {
    chrome.pageAction.show(tabId);
});
