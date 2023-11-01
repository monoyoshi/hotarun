/*

surtr.js

speak like surtr dragalia lost!

*/

exports.run = async (bot, message) => {

    // dictionaries
    const surtr = {
        "a": "e",
        "b": "n",
        "c": "v",
        "d": "s",
        "e": "i",
        "f": "g",
        "g": "f",
        "h": "j",
        "i": "o",
        "j": "h",
        "k": "l",
        "l": "k",
        "m": "b",
        "n": "m",
        "o": "u",
        "p": "y",
        "q": "w",
        "r": "t",
        "s": "d",
        "t": "r",
        "u": "a",
        "v": "c",
        "w": "q",
        "x": "z",
        "y": "p",
        "z": "x",
        "A": "E",
        "B": "N",
        "C": "V",
        "D": "S",
        "E": "I",
        "F": "G",
        "G": "F",
        "H": "J",
        "I": "O",
        "J": "H",
        "K": "L",
        "L": "K",
        "M": "B",
        "N": "M",
        "O": "U",
        "P": "Y",
        "Q": "W",
        "R": "T",
        "S": "D",
        "T": "R",
        "U": "A",
        "V": "C",
        "W": "Q",
        "X": "Z",
        "Y": "P",
        "Z": "X"
    };

    const michael = {
        "e": "a",
        "n": "b",
        "v": "c",
        "s": "d",
        "i": "e",
        "g": "f",
        "f": "g",
        "j": "h",
        "o": "i",
        "h": "j",
        "l": "k",
        "k": "l",
        "b": "m",
        "m": "n",
        "u": "o",
        "y": "p",
        "w": "q",
        "t": "r",
        "d": "s",
        "r": "t",
        "a": "u",
        "c": "v",
        "q": "w",
        "z": "x",
        "p": "y",
        "x": "z",
        "E": "A",
        "N": "B",
        "V": "C",
        "S": "D",
        "I": "E",
        "G": "F",
        "F": "G",
        "J": "H",
        "O": "I",
        "H": "J",
        "L": "K",
        "K": "L",
        "B": "M",
        "M": "N",
        "U": "O",
        "Y": "P",
        "W": "Q",
        "T": "R",
        "D": "S",
        "R": "T",
        "A": "U",
        "C": "V",
        "Q": "W",
        "Z": "X",
        "P": "Y",
        "X": "Z"
    };

    function sConvert(mInput) { // convert alphabet (michael) to surtr-speak
        let sOutput = ""; // output string

        if (!mInput) sOutput = "⚠️ ERROR: Invalid input.";
        else {
            let splstr = mInput.trim().split(""); // trim and split input string
            if (splstr.length > 300) sOutput = `⚠️ ERROR: Input string is too long (${splstr.length} - less than 300 characters, please!).`; // 300 character limit

            else { // all good!
                let i = 0, len = splstr.length;
                while (i < len) {
                    if (surtr[splstr[i]]) sOutput = `${sOutput}${surtr[splstr[i]]}`;
                    else sOutput = `${sOutput}${splstr[i]}`;

                    ++i;
                };
            };
        };

        return sOutput.trim(); // trim and return output
    };

    function mConvert(sInput) { // convert surtr-speak to alphabet (michael)
        let mOutput = ""; // output string

        if (!sInput) mOutput = "⚠️ ERROR: Invalid input.";
        else {
            let splstr = sInput.trim().split(""); // trim and split input string
            if (splstr.length > 300) mOutput = `⚠️ ERROR: Input string is too long (${splstr.length} - less than 300 characters, please!).`; // 300 character limit

            else { // all good!
                let i = 0, len = splstr.length;
                while (i < len) {
                    if (michael[splstr[i]]) mOutput = `${mOutput}${michael[splstr[i]]}`;
                    else mOutput = `${mOutput}${splstr[i]}`;
                    ++i;
                };
            };
        };

        return mOutput.trim(); // trim and return output
    };

    let output = "";
    if (message.lcCommand = "michael") output = mConvert(message.argsText);
    else output = sConvert(message.argsText);
    
    message.reply(`\`\`\`${output}\`\`\``);

};