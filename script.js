$(function() {
    // ready handler, ALL CODE goes in here!!!!

    // setup variables ======================================

    // define all of the global variables
    let endpointUrl = "https://api.mymemory.translated.net/get";

    //list of all languages and codes
    //add more languages
    let languages = [
        { name : "English",     code: ["en", "en-US"] },
        { name : "français",    code: ["fr", "fr-FR"] },
        { name : "አማርኛ",       code: ["amh", "am-ET"] },
        { name : "русский",      code: ["ru", "ru-RU"] },
        { name : "español",     code: ["es", "es-ES"] },
        { name : "af Soomaali", code: ["so", "so-SO"] },
        { name : "日本語",      code: ["ja", "ja-JP"] },
        { name : "اَلْعَرَبِيَّةُ",        code: ["ar", "ar-SA"] }
    ];

    let inputLang = $("#inputLang");
    let outputLang = $("#outputLang");

    // 
    for (let i = 0; i < languages.length; i++) {
        let inputDropdownItem = $("<option>");
        inputDropdownItem.text(languages[i].name);
        inputDropdownItem.val(JSON.stringify(languages[i].code));
        inputLang.append(inputDropdownItem);
        let outputDropdownItem = $("<option>");
        outputDropdownItem.text(languages[i].name);
        outputDropdownItem.val(JSON.stringify(languages[i].code));
        outputLang.append(outputDropdownItem);
    }

    // define the div elements,containers,ids and classes used
    // placeholders
    let recordBtn = $("#btnRecord");
    let input = $("#textArea1");
    let translateBtn = $("#btnTrans");
    let clearBtn = $("#btnClear");
    let output = $("#textArea2");

    // make sure we're using the right speech recognition interface for the browser
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recorder = new SpeechRecognition();
    let recordingOn = false;
    recorder.continuous = true;
    recorder.interimResults = true;

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

            // make the output from the program visible on the screen
            output.val(translation);
            console.log(response)

            //------------------
        });
    }

    //main process===========================================

    // ****click events
    // specify all of the buttons that need an event listner 
    // identify the start translating button 
    // **identify the maximum number of characters it will translate
    // use conditinal statements

    // using "change" event for now--we can adapt this to the frontend code later
    // will update the output when user presses enter on the input
    translateBtn.click(function() {
        //use the val() method to pull the user input from the page
        let userText = input.val();
        if (userText.length > 500) {
            // Input is over max, do something here
            output.val("Error: character length limit exceeded");
            return false;
        }

        // val() to get the languages we are translating from/into
        // needs to be a 2 character string in ISO format!
        // example: English = "en", spanish = "es", japanese = "ja"
        let fromLang = JSON.parse($("#inputLang").val())[0];
        let toLang = JSON.parse($("#outputLang").val())[0];

        // run the translation function
        translate(userText, fromLang, toLang);
        return false;
    });

    clearBtn.click(function() {
        output.val("");
        input.val("");
        return false;
    });
    
    // Toggle speech to text recording
    recordBtn.click(function() {
        if (!recordingOn) {
            recordingOn = true;
            $(this).html(`<span class="fa fa-microphone-slash"></span>`);
            recorder.lang = JSON.parse($("#inputLang").val())[1];
            recorder.start();
        } else {
            recordingOn = false;
            $(this).html(`<span class="fa fa-microphone"></span>`);
            recorder.stop();
        }
        return false;
    });

    // Add recorded audio to input textarea
    recorder.onresult = function(event) {
        let changes = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                changes += event.results[i][0].transcript;
            }
        }
        input.val(input.val() + changes);
    };

}); // NO CODE BELOW THIS LINE==========================