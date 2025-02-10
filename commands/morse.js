/*

morse.js

convert letters into morse code

*/

exports.run = (bot, message) => {

    // inputs
    // example : -morse sos
    let lcArgsText = message.lcArgsText; // "sos"

    // dictionary
    const morsecode = {
        "a": "._",
        "b": "_...",
        "c": "_._.",
        "d": "_..",
        "e": ".",
        "f": ".._.",
        "g": "__.",
        "h": "....",
        "i": "..",
        "j": ".___",
        "k": "_._",
        "l": "._..",
        "m": "__",
        "n": "_.",
        "o": "___",
        "p": ".__.",
        "q": "__._",
        "r": "._.",
        "s": "...",
        "t": "_",
        "u": ".._",
        "v": "..._",
        "w": ".__",
        "x": "_.._",
        "y": "_.__",
        "z": "__..",
        "0": "-----",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        ".": ".-.-.-",
        ",": "--..--",
        "?": "..--..",
        "'": ".----.",
        "!": "-.-.--",
        "/": "-..-.",
        "(": "-.--.",
        ")": "-.--.-",
        "&": ".-...",
        ":": "---...",
        ";": "-.-.-.",
        "=": "-...-",
        "+": ".-.-.",
        "-": "-....-",
        "_": "..--.-",
        '"': ".-..-.",
        "$": "...-..-",
        "@": ".--.-.",
        " ": "/"
    };

    function convert(istring) { // convert string function
        let ostring = ""; // output string
        let splstr = istring.split(""); // split input string
        if (splstr.length > 50) return bot.mSE(`Input is too long (${splstr.length} - less than 50 characters please!).`); // 50 character limit
        let i = 0, len = splstr.length;
        while (i < len) { // build morse code
            ostring = ostring.trim(); // trim whitespace
            if (morsecode[splstr[i].toLowerCase()]) ostring = ostring + " " + morsecode[splstr[i].toLowerCase()]; // convert in object
            ++i;
        };
        return ostring.trim();
    };

    if (!lcArgsText) { // nothing to input
        message.channel.send(bot.mSE("Input is invalid."));
        return;
    };
    let c = convert(message.lcArgsText);
    if (c.length == 0) {
        message.channel.send(bot.mSE("Input is invalid."));
        return;
    };

    message.channel.send(`\`\`\`${c}\`\`\``);

};