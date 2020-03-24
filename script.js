$(function() {
    // ready handler, ALL CODE goes in here!!!!

    // setup variables ======================================

    // define all of the global variables
    let endpointUrl = "https://api.mymemory.translated.net/get";

    // define the div elements,containers,ids and classes used
    // placeholders
    let input = $("<input>").attr("style", "width: 400px;");
    let output = $("<div>").attr("style", "font-size: larger;");
    $("body").append(input, output);

    // functions=============================================

    // translate function - retrieve a translated string and display it
    function translate(inputText, srcLang, targetLang) {
        // make an AJAX request to the API to get the needed values
        $.ajax({
            url: endpointUrl + "?q=" + inputText + "&langpair=" + srcLang + "|" + targetLang,
            method: "GET"
        }).then(function(response) {
            //for translation quality - iterate through matches and find the machine translation if possible -- work on this later if needed
            // let translation;
            // for (let i = 0; i < response.matches.length; i++) {
            //     if (response.matches[i].id === 0) {
            //         translation = response.matches[i].translation;
            //     }
            // }

            // Get the (default) translated string
            // Quality is iffy but we can fix this later
            let translation = response.responseData.translatedText;

            //-----------Output

            //console.log(response);

            // make the output from the program visible on the screen(use the text method) 
            output.text(translation);

            //------------------
        });
    }

    //main process===========================================

    // ****click events
    // specify all of the buttons that need an event listner 
    // identify the start translating button 
    // **identify the maximum number of characters it will translate
    // API max is 500 bytes, = 125 full-width characters
    // use conditinal statements

    // using "change" event for now--we can adapt this to the frontend code later
    // will update the output when user presses enter on the input
    input.change(function() {
        //use the val() method to pull the user input from the page
        userText = $(this).val();
        if (userText.length > 125) { // use 125 for now, can come up with a better system later
            // Input is over max, do something here

        }
        // use val() to get the languages we are translating from/into
        // needs to be a 2 character string in ISO format!
        // example: English = "en", spanish = "es", japanese = "ja"
        fromLang = "en"; //placeholder
        toLang = "ja"; //placeholder

        // run the translation function
        translate(userText, "en", "ja");

        return false; //prevents default
    });

}); // NO REAL CODE BELOW THIS LINE==========================



// for voice stuff, add this to the above code

//  identify the stop recording button
    // stop recording when max recording is reached
    // call the stop recoding fuction
    // specify the maximum set time out or the maximum word the app takes in  one minute
// define the start recording funcion
// define the stop recording function