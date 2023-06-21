// Track YouTube video watch time
var video = document.querySelector('video');

if (video) {
    var watchTime = 0;
    var timer = setInterval(function () {
        watchTime += 1; // Increment watch time every second
        chrome.runtime.sendMessage({ type: 'timeUpdate', time: watchTime });
    }, 1000);

    // Listen for video pause or end events
    video.addEventListener('pause', function () {
        clearInterval(timer);
    });

    video.addEventListener('ended', function () {
        clearInterval(timer);
    });
}
