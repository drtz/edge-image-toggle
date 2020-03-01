'use strict';

function toggleImages() {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    const tab = tabs[0];
    chrome.contentSettings['images'].get({primaryUrl: tab.url}, (detail) => {
      if (detail.setting == 'block') {
        console.log('allowing images');
        chrome.contentSettings['images'].set({primaryPattern: '<all_urls>', setting: 'allow'});

        chrome.browserAction.setIcon({
          path: {
            "16": "icons/icon-16.png",
            "48": "icons/icon-48.png",
            "128": "icons/icon-128.png",
          }
        });
      } else {
        console.log('blocking images');
        chrome.contentSettings['images'].set({primaryPattern: '<all_urls>', setting: 'block'});

        chrome.browserAction.setIcon({
          path: {
            "16": "icons/icon-disabled-16.png",
            "48": "icons/icon-disabled-48.png",
            "128": "icons/icon-disabled-128.png",
          }
        });
      }

      chrome.tabs.executeScript(tab.id, {code: 'window.location.reload()'});
    });
  });
}

chrome.browserAction.onClicked.addListener(toggleImages);

