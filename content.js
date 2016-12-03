var tweets = document.getElementsByClassName('js-tweet-text tweet-text');
var timer = setInterval(changeTexts, 1500);
var lastTweet = 0;
var lastIter;

function changeTexts() {
    for (var i = lastTweet, l = tweets.length; i < l; i++) {
        tweets[i].innerText = 'Tu mama';
        lastTweet = i;
    }
}