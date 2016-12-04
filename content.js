var data;
var text;


if (location.hostname == "www.facebook.com") {
    data = document.getElementsByClassName('_5pbx userContent');
    console.log(data);
} else if (location.hostname == 'twitter.com') {
    data = document.getElementsByClassName('js-tweet-text tweet-text');
}
;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function isMessageAbusive(message, x) {
    $.ajax({
        'method': 'POST',
        'async': 'false',
        'data': "{ \"message\": \"" + message + "\" }",
        'url': 'https://partner.bark.us/api/v1/messages?token=5SFQytoH5A69CUB2CY3ETGNg',
        'contentType': 'application/json; charset=utf-8',
        'success': function (response) {
            if (response['abusive']) {
                data[x].innerText = "";
                data[x].innerText = getRandomPositiveMessage();
            }
        },
        'error': function (response, status, errorThrown) {
            if (response.status == 429) {
                console.log(response);
                sleep(200);
                try {
                    isMessageAbusive(message, x);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    });
}

function getRandomPositiveMessage() {
    var joke = "";
    var probability = Math.floor(Math.random() * 100);
    if (probability < 0) {
        joke = getRandomJokeTambal();
    } else if (probability < 50) {
        joke = getRandomChuckNorrisJoke();
    } else {
        joke = getRandomChosenPhrase();
    }

    return joke;
}

function getRandomChuckNorrisJoke() {
    // Default joke
    var joke = "A Chuck Norris-delivered Roundhouse Kick is the preferred method of execution in 16 states.";
    $.ajax({
        method: 'GET',
        async: false,
        url: 'https://api.icndb.com/jokes/random?exclude=[explicit,nerdy]',
        success: function (response) {
            joke = response.value.joke;
        }
    });
    return joke;
}

function getRandomJokeTambal() {
    // Default joke
    var joke = "Why did the fireman wear red, white, and blue suspenders? To hold his pants up.";
    $.ajax({
        async: false,
        url: 'https://tambal.azurewebsites.net/joke/random',
        success: function (response) {
            joke = response.joke;
        },
        error: function (er, err) {
        }
    });
    return joke;
}


function getRandomChosenPhrase() {
    var phrases = [
        "I feel very, very small... please hold me...",
        "It's past my bedtime. Please don't tell my mommy.",
        "I'm wrestling with some insecurity issues in my life but thank you all for reading me.",
        "I could really use a hug right now",
        "I wish you the best",
        "Mommy says people my age shouldn't suck their thumbs. I disagree",
        "C'mon, Mom! Five more minutes before you tuck me in!"
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}


var lastData = 0;
var iter = 1;
function changeTexts() {
    if (iter < data.length) {
        try {
            isMessageAbusive(data[iter].innerText, iter);
            iter += 1;
        } catch (e) {
            console.log(e)
        }
    }
    setTimeout(changeTexts, 400);
}

chrome.runtime.sendMessage({msg: "getDisabled"}, function (response) {
    if (response.enabled){
        changeTexts();
    }
});