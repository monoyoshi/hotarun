/*

pin.js

convert letters into numbers

*/

exports.run = (bot, message) => {

    // inputs
    // example : -pin among us
    let lcArgsText = message.lcArgsText; // "among us"

    // dictionary
    const numberpad = {
        "a": 2, "b": 2, "c": 2,
        "d": 3, "e": 3, "f": 3,
        "g": 4, "h": 4, "i": 4,
        "j": 5, "k": 5, "l": 5,
        "m": 6, "n": 6, "o": 6,
        "p": 7, "q": 7, "r": 7, "s": 7,
        "t": 8, "u": 8, "v": 8,
        "w": 9, "x": 9, "y": 9, "z": 9,
        " ": " "
    };

    function convert(istring) { // convert string function
        let ostring = ""; // output string
        let splstr = istring.split(""); // split input spring
        if (splstr.length > 50) return bot.mSE(`Input is too long (${splstr.length} - less than 50 characters please!).`); // 50 character limit
        let i = 0, len = splstr.length;
        while (i < len) { // build pin
            if (parseInt(splstr[i])) ostring = ostring + parseInt(splstr[i]); // use number if number
            else if (numberpad[splstr[i].toLowerCase()]) ostring = ostring + numberpad[splstr[i].toLowerCase()]; // convert in object
            ++i;
        };
        return ostring;
    };

    if (!lcArgsText) {
        message.channel.send(bot.mSE("Input is invalid."));
        return;
    };

    var c = convert(message.lcArgsText);
    if (c.length == 0) {
        message.channel.send(bot.mSE("Input is invalid."));
        return;
    };

    message.channel.send(`\`\`\`${c}\`\`\``);

};