// Track YouTube video watch time
var video = document.querySelector('video');

if (video) {
    var videoId = getVideoId(); // Get the YouTube video ID
    var watchTime = getStoredWatchTime(videoId) || 0;
    var timer = null;

    // Listen for video play event
    video.addEventListener('play', function () {
        // Check if the timer is not already running
        if (!timer) {
            timer = setInterval(function () {
                watchTime += 1; // Increment watch time every second
                chrome.runtime.sendMessage({ type: 'timeUpdate', time: watchTime, videoId: videoId });
            }, 1000);
        }
    });

    // Listen for video pause or end events
    video.addEventListener('pause', function () {
        clearInterval(timer);
        timer = null;
    });

    video.addEventListener('ended', function () {
        clearInterval(timer);
        timer = null;
        saveWatchTime(videoId, watchTime);
    });
}

function getVideoId() {
    // Extract video ID from the URL
    var videoUrl = window.location.href;
    var match = videoUrl.match(/\/watch\?v=([^&]+)/);
    return match ? match[1] : null;
}

function getStoredWatchTime(videoId) {
    // Load stored watch time for the given video ID from storage
    var key = 'watchTime_' + videoId;
    return parseInt(localStorage.getItem(key)) || 0;
}

function saveWatchTime(videoId, watchTime) {
    // Save watch time for the given video ID to storage
    var key = 'watchTime_' + videoId;
    localStorage.setItem(key, watchTime);
}
