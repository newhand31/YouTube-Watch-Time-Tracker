document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var tab = tabs[0];

        // Load current watch time from storage
        chrome.storage.local.get(['watchTime'], function (result) {
            var watchTime = result.watchTime || 0;
            document.getElementById('watchTime').textContent = watchTime + ' seconds';
        });

        // Listen for messages from content script
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            if (message.type === 'timeUpdate') {
                // Update watch time
                var watchTime = message.time;
                document.getElementById('watchTime').textContent = watchTime + ' seconds';

                // Save watch time to storage
                chrome.storage.local.set({ 'watchTime': watchTime });

                // Save watch time for the video ID to storage
                saveWatchTime(message.videoId, watchTime);
            }
        });

        // Inject content script into the active tab
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['contentScript.js']
        });
    });
});
