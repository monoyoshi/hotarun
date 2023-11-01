/*

flip.js

upside down / reverse text

*/

exports.run = (bot, message) => {

    // inputs
    // example : -flip why are u like this
    let argsText = message.argsText; // "why are u like this"

    // dictionary
    const flippad = {
        "a": "ɐ",
        "b": "q",
        "c": "ɔ",
        "d": "p",
        "e": "ǝ",
        "f": "ɟ",
        "g": "ƃ",
        "h": "ɥ",
        "i": "ᴉ",
        "j": "ɾ",
        "k": "ʞ",
        "l": "l",
        "m": "ɯ",
        "n": "u",
        "o": "o",
        "p": "d",
        "q": "b",
        "r": "ɹ",
        "s": "s",
        "t": "ʇ",
        "u": "n",
        "v": "ʌ",
        "w": "ʍ",
        "x": "x",
        "y": "ʎ",
        "z": "z",
        "A": "∀",
        "B": "q",
        "C": "Ɔ",
        "D": "p",
        "E": "Ǝ",
        "F": "Ⅎ",
        "G": "פ",
        "H": "H",
        "I": "I",
        "J": "ſ",
        "K": "ʞ",
        "L": "˥",
        "M": "W",
        "N": "N",
        "O": "O",
        "P": "Ԁ",
        "Q": "Q",
        "R": "ɹ",
        "S": "S",
        "T": "┴",
        "U": "∩",
        "V": "Λ",
        "W": "M",
        "X": "X",
        "Y": "⅄",
        "Z": "Z",
        "1": "Ɩ",
        "2": "ᄅ",
        "3": "Ɛ",
        "4": "ㄣ",
        "5": "ϛ",
        "6": "9",
        "7": "ㄥ",
        "9": "6",
        " ": " ",
        ",": "'",
        ".": "˙",
        "/": "/",
        "<": ">",
        ">": "<",
        "?": "¿",
        ";": ";",
        "'": ",",
        ":": ":",
        "\"": ",,",
        "[": "]",
        "]": "[",
        "\\": "\\",
        "{": "}",
        "}": "{",
        "|": "|",
        "!": "¡",
        "@": "@",
        "#": "#",
        "$": "$",
        "%": "%",
        "^": "^",
        "&": "⅋",
        "*": "*",
        "(": ")",
        ")": "(",
        "-": "-",
        "=": "=",
        "_": "‾",
        "+": "+",
        "`": ",",
        "~": "~"
    };

    function convert(istring) { // convert string function
        let ostring = ""; // output string
        let splstr = istring.split(""); // split input spring
        if (splstr.length > 50) return bot.mSE(`Input string is too long (${splstr.length} - less than 50 characters please!).`); // 50 character limit
        let i = 0, len = splstr.length;
        while (i < len) {
            if (flippad[splstr[i]]) ostring = `${flippad[splstr[i]]}${ostring}`; // convert
            ++i;
        };
        return ostring;
    };

    let result = "";
    if (!argsText) result = bot.mSE("Input is invalid.");
    else {
        result = convert(argsText);
        if (!result) result = bot.mSE("Input is invalid.");
    };

    message.reply(`${result}`);

};