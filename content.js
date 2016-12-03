var data;
if (location.hostname == "www.facebook.com") {
    alert('face');
    data = document.getElementsByClassName('_5pbx userContent');
} else if (location.hostname == 'twitter.com') {
    data = document.getElementsByClassName('js-tweet-text tweet-text');
};

var timer = setInterval(changeTexts, 1500);
var lastData = 0;

function changeTexts() {
    for (var i = lastData, l = data.length; i < l; i++) {
        data[i].innerText = 'Tu mama';
        lastData = i;
    }
}