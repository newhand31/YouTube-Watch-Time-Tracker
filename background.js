chrome.runtime.onInstalled.addListener(function () {
    // 設定初始觀看時長為 0
    chrome.storage.local.set({ watchTime: 0 });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'timeUpdate') {
        // 接收來自 content script 的觀看時間更新訊息
        var videoId = message.videoId;
        var watchTime = message.time;

        // 從 storage 中獲取影片的觀看時長
        chrome.storage.local.get(['videos'], function (result) {
            var videos = result.videos || {};

            // 更新特定影片的觀看時長
            videos[videoId] = watchTime;

            // 將更新後的觀看時長儲存回 storage
            chrome.storage.local.set({ videos: videos });
        });
    }
});
