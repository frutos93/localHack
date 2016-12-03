require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);

    function isMessageAbusive(message){
        $.ajax({
            'method': 'POST',
            'async': 'false',
            'data': "{ \"message\": \""+ message +"\" }",
            'url': 'https://partner.bark.us/api/v1/messages?token=5SFQytoH5A69CUB2CY3ETGNg',
            'contentType': 'application/json; charset=utf-8',
            'success': function(response){
                //console.log(response);
                if(response['abusive']){
                    console.log("Your message: \"" + message + "\" is abusive.");
                    console.log("\tNew value for abusive message:");
                    console.log("\t" + getRandomPositiveMessage());
                    /*
                    console.log(response.results.cyberbullying.likelihood);
                    if(response.results.profanity.abusive){
                        console.log(response.results.profanity.terms)
                    }
                    */
                } else {
                    console.log("Your message \"" + message + "\" is not abusive. Good job!");
                }
            },
            'error': function(response, status, errorThrown){
                console.log(response);
                console.log(status);
            }
        });
    }

    function getRandomPositiveMessage(){
        var joke = "";
        var probability = Math.floor(Math.random() * 100);
        if(probability < 0){
            joke = getRandomJokeTambal();
        } else if (probability < 50){
            joke = getRandomChuckNorrisJoke();
        } else {
            joke = getRandomChosenPhrase();
        }

        return joke;
    }

    function getRandomChuckNorrisJoke(){
        // Default joke
        var joke = "A Chuck Norris-delivered Roundhouse Kick is the preferred method of execution in 16 states.";
        $.ajax({
            method: 'GET',
            async: false,
            url: 'http://api.icndb.com/jokes/random?exclude=[explicit,nerdy]',
            success: function(response){
                joke = response.value.joke;
            }
        });
        return joke;
    }

    function getRandomJokeTambal(){
        // Default joke
        var joke = "Why did the fireman wear red, white, and blue suspenders? To hold his pants up.";
        $.ajax({
            async: false,
            url: 'http://tambal.azurewebsites.net/joke/random',
            success: function(response){
                console.log("TAMBAL")
                joke = response.joke;
            },
            error: function(er, err){
                console.log("ERROR");
                console.log(er);
                console.log(err);
            }
        });
        return joke;
    }


    function getRandomChosenPhrase(){
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

    isMessageAbusive("You are worth nothing.");
    isMessageAbusive("u r a fag!");
    isMessageAbusive("u sucks.");
});
