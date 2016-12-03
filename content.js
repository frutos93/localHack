var tweets = document.getElementsByClassName('js-tweet-text tweet-text');
var timer = setInterval(changeTexts, 1000);

function changeTexts() {
    for (var i = 0, l = tweets.length; i < l; i++) {
        tweets[i].innerText = 'Tu mama';
    }
}