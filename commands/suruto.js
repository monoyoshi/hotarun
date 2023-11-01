/*

surtr.js

speak like surtr dragalia lost! now in japanese

*/

const wanakana = require("wanakana"); // wanakana - easy kana to romaji converter

exports.run = async (bot, message) => {

    // dictionaries
    // suruto
    const suruto = {
        "あ": "３",
        "い": "e",
        "う": "４",
        "え": "５",
        "お": "６",
        "か": "t",
        "き": "g",
        "く": "h",
        "け": "：",
        "こ": "b",
        "さ": "x",
        "し": "d",
        "す": "r",
        "せ": "p",
        "そ": "c",
        "た": "q",
        "ち": "a",
        "つ": "z",
        "て": "w",
        "と": "s",
        "な": "u",
        "に": "i",
        "ぬ": "１",
        "ね": "，",
        "の": "k",
        "は": "f",
        "ひ": "v",
        "ふ": "２",
        "へ": "＾",
        "ほ": "ー",
        "ま": "j",
        "み": "n",
        "む": "］",
        "め": "／",
        "も": "m",
        "や": "７",
        "ゆ": "８",
        "よ": "９",
        "ら": "o",
        "り": "l",
        "る": "．",
        "れ": "；",
        "ろ": "¥",
        "わ": "０",
        "を": "［",
        "ん": "y",
        "ー": "￥",
        "が": "t",
        "ぎ": "g",
        "ぐ": "h",
        "げ": "：",
        "ご": "b",
        "ざ": "x",
        "じ": "d",
        "ず": "r",
        "ぜ": "p",
        "ぞ": "c",
        "だ": "q",
        "ち": "a",
        "づ": "z",
        "で": "w",
        "ど": "s",
        "ば": "f",
        "び": "v",
        "ぶ": "２",
        "べ": "＾",
        "ぼ": "ー",
        "ぱ": "f",
        "ぴ": "v",
        "ぷ": "２",
        "ぺ": "＾",
        "ぽ": "ー",
        "ぁ": "＃",
        "ぅ": "＄",
        "ぇ": "％",
        "ぉ": "＆",
        "ゃ": "’",
        "ゅ": "（",
        "ょ": "）"
    };

    const fullwidth = {
        "b": "ｂ",
        "c": "ｃ",
        "d": "ｄ",
        "f": "ｆ",
        "g": "ｇ",
        "h": "ｈ",
        "j": "ｊ",
        "k": "ｋ",
        "l": "ｌ",
        "m": "ｍ",
        "n": "ｎ",
        "p": "ｐ",
        "q": "ｑ",
        "r": "ｒ",
        "s": "ｓ",
        "t": "ｔ",
        "v": "ｖ",
        "w": "ｗ",
        "x": "ｘ",
        "y": "ｙ",
        "z": "ｚ"
    };

    // mikaeru
    const customRomaji = {
        "。": "。",
        "、": "、",
        "！": "！",
        "？": "？",
        "］": "］",
        "［": "［",
        "～": "～",
        "＃": "＃",
        "＄": "＄",
        "％": "％",
        "＆": "＆",
        "　": "　",
        "１": "1",
        "２": "2",
        "３": "3",
        "４": "4",
        "５": "5",
        "６": "6",
        "７": "7",
        "８": "8",
        "９": "9",
        "０": "0",
        "＾": "^",
        "’": "'",
        "ゎ": "lwa",
        "ゃ": "lya",
        "ゅ": "lyu",
        "ょ": "lyo",
        "ぁ": "xa",
        "ぃ": "xi",
        "ぅ": "xu",
        "ぇ": "xe",
        "ぉ": "xo",
        "ちぃ": "cyi",
        "ふぁ": "fa",
        "ふぃ": "fi",
        "ふぇ": "fe",
        "ふぉ": "fo",
        "くぁ": "qa",
        "くぃ": "qi",
        "くぅ": "qu",
        "くぇ": "qe",
        "くぉ": "qo",
        "すぁ": "swa",
        "すぃ": "swi",
        "すぅ": "swu",
        "すぇ": "swe",
        "すぉ": "swo",
        "てゃ": "tha",
        "てぃ": "thi",
        "てゅ": "thu",
        "てぇ": "the",
        "てょ": "tho",
        "つぁ": "tsa",
        "つぃ": "tsi",
        "つぇ": "tse",
        "つぉ": "tso",
        "とぁ": "twa",
        "とぃ": "twi",
        "とぅ": "twu",
        "とぇ": "twe",
        "とぉ": "two",
        "ちゃ": "twa",
        "ちゅ": "twu",
        "ちぇ": "twe",
        "ちょ": "two",
        "うぁ": "twa",
        "うぃ": "wi",
        "うぇ": "we",
        "うぉ": "two"
    };

    const halfwidth = {
        "ｃ": "c",
        "ｂ": "b",
        "ｄ": "d",
        "ｆ": "f",
        "ｇ": "g",
        "ｈ": "h",
        "ｊ": "j",
        "ｋ": "k",
        "ｌ": "l",
        "ｍ": "m",
        "ｎ": "n",
        "ｐ": "p",
        "ｑ": "q",
        "ｒ": "r",
        "ｓ": "s",
        "ｔ": "t",
        "ｖ": "v",
        "ｗ": "w",
        "ｘ": "x",
        "ｙ": "y",
        "ｚ": "z"
    };

    const mikaeru = {
        "3": "あ",
        "e": "い",
        "4": "う",
        "5": "え",
        "6": "お",
        "t": "か",
        "g": "き",
        "h": "く",
        ":": "け",
        "b": "こ",
        "x": "さ",
        "d": "し",
        "r": "す",
        "p": "せ",
        "c": "そ",
        "q": "た",
        "a": "ち",
        "z": "つ",
        "w": "て",
        "s": "と",
        "u": "な",
        "i": "に",
        "1": "ぬ",
        "，": "ね",
        "k": "の",
        "f": "は",
        "v": "ひ",
        "2": "ふ",
        "^": "へ",
        "-": "ほ",
        "j": "ま",
        "n": "み",
        "］": "む",
        "／": "め",
        "m": "も",
        "7": "や",
        "8": "ゆ",
        "9": "よ",
        "o": "ら",
        "l": "り",
        "．": "る",
        "；": "れ",
        "¥": "ろ",
        "0": "わ",
        "［": "を",
        "y": "ん",
        "￥": "ー",
        "#": "ぁ",
        "$": "ぅ",
        "%": "ぇ",
        "&": "ぉ",
        "'": "ゃ",
        "(": "ゅ",
        ")": "ょ"
    };

    // functions
    // suruto
    function rsConvert(fmInput) { // convert full-width japanese (michael) to romaji surtr-speak
        let rsOutput = ""; // output string
        let failFlag = false; // fail flag

        if (!fmInput) {
            rsOutput = "⚠️ ERROR: Invalid input.";
            failFlag = true;
        }

        else {
            let splstr = wanakana.toHiragana(fmInput).trim().split(""); // hiragana convert, trim, and split input string
            if (splstr.length > 300) {
                rsOutput = `⚠️ ERROR: Input string is too long (${splstr.length} - less than 300 characters, please!).`; // 50 character limit
                failFlag = true;
            }

            else { // all good!
                
                let i = 0, len = splstr.length;
                while (i < len) {
                    if (suruto[splstr[i]]) rsOutput = `${rsOutput}${suruto[splstr[i]]}`;
                    else rsOutput = `${rsOutput}${splstr[i]}`;
                    ++i;
                };
            };
        };

        return [rsOutput, failFlag];
    };

    function ksConvert(rsInput) { // convert romaji surtr-speak to kana surtr-speak
        let olist = []; // output sentence array
        let ksOutput = ""; // output string
        let cFlag = false; // character conversion flag

        let splstr = rsInput.trim().split(""); // trim whitespace and split into characters
        let i = 0, len = splstr.length;
        while (i < len) {
            cFlag = false; // character conversion flag reset
            if (splstr[i+3]) if ((splstr[i] == "l" || splstr[i+1] == "x") && splstr[i+2] == "t" && splstr[i+3] == "s" && splstr[i+4] == "u") {
                olist.push("っ");
                i += 3;
                cFlag = true;
            };

            if (splstr[i+2] && !cFlag) { // if the next two characters exist and the character hasn't been converted yet
                // if current is a certain letter, and the next two are also certain letters, use special character
                if (splstr[i] == "b" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("びゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("びぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("びゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("びぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("びょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "c" && splstr[i+1] == "h") {
                    if (splstr[i+2] == "a") { olist.push("ちゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ち"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ちゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ちぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ちょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "c" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("ちゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ちぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ちゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ちぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ちょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "d" && splstr[i+1] == "h") {
                    if (splstr[i+2] == "a") { olist.push("でゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("でぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("でゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("でぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("でょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "d" && splstr[i+1] == "w") {
                    if (splstr[i+2] == "a") { olist.push("どぁ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("どぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("どぅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("どぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("どぉ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "d" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("ぢゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ぢぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ぢゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ぢぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ぢょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "f" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("ふゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ふゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ふょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "g" && splstr[i+1] == "w") {
                    if (splstr[i+2] == "a") { olist.push("ぐぁ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ぐぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ぐぅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ぐぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ぐぉ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "g" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("ぎゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ぎぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ぎゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ぎぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ぎょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "h" && splstr[i+1] == "w") {
                    if (splstr[i+2] == "a") { olist.push("ふぁ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ふぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ふぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ふぉ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "h" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("ひゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ひぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ひゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ひぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ひょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "j" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("じゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("じぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("じゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("じぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("じょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "k" && splstr[i+1] == "w") {
                    if (splstr[i+2] == "a") { olist.push("くぁ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("くぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("くぅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("くぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("くぉ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "k" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("きゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("きぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("きゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("きぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("きょ"); i += 2; cFlag = true;};
                };
                if ((splstr[i] == "l" || splstr[i] == "x") && splstr[i+1] == "t" && splstr[i+2] == "u") { olist.push("っ"); i += 2; cFlag = true;};
                if ((splstr[i] == "l" || splstr[i] == "x") && splstr[i+1] == "w" && splstr[i+2] == "a") { olist.push("ゎ"); i += 2; cFlag = true;};
                if ((splstr[i] == "l" || splstr[i] == "x") && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("ゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "m" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("みゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("みぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("みゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("みぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("みょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "n" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("にゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("にぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("にゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("にぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("にょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "p" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("ぴゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ぴぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ぴゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ぴぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ぴょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "r" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("りゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("りぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("りゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("りぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("りょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "s" && splstr[i+1] == "h") {
                    if (splstr[i+2] == "a") { olist.push("しゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("し"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("しゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("しぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("しょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "s" && splstr[i+1] == "w") {
                    if (splstr[i+2] == "a") { olist.push("すぁ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("すぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("すぅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("すぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("すぉ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "s" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("しゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("しぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("しゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("しぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("しょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "t" && splstr[i+1] == "h") {
                    if (splstr[i+2] == "a") { olist.push("てゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("てぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("てゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("てぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("てょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "t" && splstr[i+1] == "s") {
                    if (splstr[i+2] == "a") { olist.push("つぁ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("つぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("つ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("つぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("つぉ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "t" && splstr[i+1] == "w") {
                    if (splstr[i+2] == "a") { olist.push("とぁ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("とぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("とぅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("とぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("とぉ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "t" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("ちゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ちぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ちゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ちぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ちょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "v" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("ゔゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ゔぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ゔゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ゔぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ゔょ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "w" && splstr[i+1] == "h") {
                    if (splstr[i+2] == "a") { olist.push("うぁ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("うぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("う"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("うぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("うぉ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "z" && splstr[i+1] == "w") {
                    if (splstr[i+2] == "a") { olist.push("ずぁ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("ずぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("ずぅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("ずぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("ずぉ"); i += 2; cFlag = true;};
                };
                if (splstr[i] == "z" && splstr[i+1] == "y") {
                    if (splstr[i+2] == "a") { olist.push("じゃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "i") { olist.push("じぃ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "u") { olist.push("じゅ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "e") { olist.push("じぇ"); i += 2; cFlag = true;}
                    else if (splstr[i+2] == "o") { olist.push("じょ"); i += 2; cFlag = true;};
                };
            };

            if (splstr[i+1] && !cFlag) { // if next character exists and the character hasn't been converted yet
                // if current is a certain letter, and next is also a certain letter, use special character
                if (splstr[i] == "k") {
                    if (splstr[i+1] == "a") { olist.push("か"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("き"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("く"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("け"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("こ"); ++i; cFlag = true;}
                    else { olist.push("ｋ"); cFlag = true;};
                }
                else if (splstr[i] == "s") {
                    if (splstr[i+1] == "a") { olist.push("さ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("し"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("す"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("せ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("そ"); ++i; cFlag = true;}
                    else { olist.push("ｓ"); cFlag = true;};
                }
                else if (splstr[i] == "t") {
                    if (splstr[i+1] == "a") { olist.push("た"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("ち"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("つ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("て"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("と"); ++i; cFlag = true;}
                    else { olist.push("ｔ"); cFlag = true;};
                }
                else if (splstr[i] == "n") {
                    if (splstr[i+1] == "a") { olist.push("な"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("に"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "n") { olist.push("ん"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ぬ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("ね"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("の"); ++i; cFlag = true;}
                    else { olist.push("ｎ"); cFlag = true;};
                }
                else if (splstr[i] == "h") {
                    if (splstr[i+1] == "a") { olist.push("は"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("ひ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ふ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("へ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ほ"); ++i; cFlag = true;}
                    else { olist.push("ｈ"); cFlag = true;};
                }
                else if (splstr[i] == "m") {
                    if (splstr[i+1] == "a") { olist.push("ま"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("み"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("む"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("め"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("も"); ++i; cFlag = true;}
                    else { olist.push("ｍ"); cFlag = true;};
                }
                else if (splstr[i] == "y") {
                    if (splstr[i+1] == "a") { olist.push("や"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ゆ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("よ"); ++i; cFlag = true;}
                    else { olist.push("ｙ"); cFlag = true;};
                }
                else if (splstr[i] == "r") {
                    if (splstr[i+1] == "a") { olist.push("ら"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("り"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("る"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("れ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ろ"); ++i; cFlag = true;}
                    else { olist.push("ｒ"); cFlag = true;};
                }
                else if (splstr[i] == "w") {
                    if (splstr[i+1] == "a") { olist.push("わ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("を"); ++i; cFlag = true;}
                    else { olist.push("ｗ"); cFlag = true;};
                }
                else if (splstr[i] == "g") {
                    if (splstr[i+1] == "a") { olist.push("が"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("ぎ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ぐ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("げ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ご"); ++i; cFlag = true;}
                    else { olist.push("ｇ"); cFlag = true;};
                }
                else if (splstr[i] == "z") {
                    if (splstr[i+1] == "a") { olist.push("ざ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("じ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ず"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("ぜ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ぞ"); ++i; cFlag = true;}
                    else { olist.push("ｚ"); cFlag = true;};
                }
                else if (splstr[i] == "d") {
                    if (splstr[i+1] == "a") { olist.push("だ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("ぢ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("づ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("で"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ど"); ++i; cFlag = true;}
                    else { olist.push("ｄ"); cFlag = true;};
                }
                else if (splstr[i] == "b") {
                    if (splstr[i+1] == "a") { olist.push("ば"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("び"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ぶ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("べ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ぼ"); ++i; cFlag = true;}
                    else { olist.push("ｂ"); cFlag = true;};
                }
                else if (splstr[i] == "p") {
                    if (splstr[i+1] == "a") { olist.push("ぱ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("ぴ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ぷ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("ぺ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ぽ"); ++i; cFlag = true;}
                    else { olist.push("ｐ"); cFlag = true;};
                }
                else if (splstr[i] == "c") {
                    if (splstr[i+1] == "a") { olist.push("か"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("し"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("く"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("せ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("こ"); ++i; cFlag = true;}
                    else { olist.push("ｃ"); cFlag = true;};
                }
                else if (splstr[i] == "f") {
                    if (splstr[i+1] == "a") { olist.push("ふぁ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("ふぃ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ふ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("ふぇ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ふぉ"); ++i; cFlag = true;}
                    else { olist.push("ｆ"); cFlag = true;};
                }
                else if (splstr[i] == "j") {
                    if (splstr[i+1] == "a") { olist.push("じゃ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("じ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("じゅ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("じぇ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("じょ"); ++i; cFlag = true;}
                    else { olist.push("ｊ"); cFlag = true;};
                }
                else if (splstr[i] == "l") {
                    if (splstr[i+1] == "a") { olist.push("ぁ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("ぃ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ぅ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("ぇ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ぉ"); ++i; cFlag = true;}
                    else { olist.push("ｌ"); cFlag = true;};
                }
                else if (splstr[i] == "q") {
                    if (splstr[i+1] == "a") { olist.push("くぁ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("くぃ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("く"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("くぇ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("くぉ"); ++i; cFlag = true;}
                    else { olist.push("ｑ"); cFlag = true;};
                }
                else if (splstr[i] == "v") {
                    if (splstr[i+1] == "a") { olist.push("ゔぁ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("ゔぃ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ゔ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("ゔぇ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ゔぉ"); ++i; cFlag = true;}
                    else { olist.push("ｖ"); cFlag = true;};
                }
                else if (splstr[i] == "w") {
                    if (splstr[i+1] == "a") { olist.push("わ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("うぃ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("う"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("うぇ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("を"); ++i; cFlag = true;}
                    else { olist.push("ｗ"); cFlag = true;};
                }
                else if (splstr[i] == "x") {
                    if (splstr[i+1] == "a") { olist.push("ぁ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "i") { olist.push("ぃ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "u") { olist.push("ぅ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "e") { olist.push("ぇ"); ++i; cFlag = true;}
                    else if (splstr[i+1] == "o") { olist.push("ぉ"); ++i; cFlag = true;}
                    else { olist.push("ｘ"); cFlag = true;};
                }
            };

            if (!cFlag) { // if the character hasn't been converted yet
                if (splstr[i] == "a") olist.push("あ");
                else if (splstr[i] == "i") olist.push("い");
                else if (splstr[i] == "u") olist.push("う");
                else if (splstr[i] == "e") olist.push("え");
                else if (splstr[i] == "o") olist.push("お");

                else { // either a full-width character or an ignored character
                    if (fullwidth[splstr[i].toLowerCase()]) olist.push(fullwidth[splstr[i].toLowerCase()]);
                    else olist.push(splstr[i].toLowerCase());
                };
            };

            ++i;
        };

        i = 0, len = olist.length;
        while (i < len) {
            ksOutput = `${ksOutput}${olist[i]}`; // build output
            ++i;
        };
        return ksOutput;
    };

    // mikaeru
    function rmConvert(fsInput) { // convert full-width surtr-speak to romaji (michael)
        let rmOutput = ""; // output string
        let failFlag = false; // fail flag

        if (!fsInput) {
            rmOutput = "⚠️ ERROR: Invalid input.";
            failFlag = true;
        }

        else {
            let splstr = wanakana.toRomaji(fsInput, {customRomajiMapping: customRomaji}).trim().split(""); // trim whitespace and split into characters
            if (splstr.length < 1) { // empty
                rmOutput = "⚠️ ERROR: Invalid input.";
                failFlag = true;
            }
            else if (splstr.length > 300) { // 300 character limit
                rmOutput = `⚠️ ERROR: Input string is too long (${splstr.length} - less than 300 characters, please!).`;
                failFlag = true;
            }

            else { // all good!
                let i = 0, len = splstr.length;
                while (i < len) {
                    if (halfwidth[splstr[i]]) rmOutput = `${rmOutput}${halfwidth[splstr[i]]}`;
                    else rmOutput = `${rmOutput}${splstr[i]}`;
                    ++i;
                };
            };
        };

        return [rmOutput, failFlag];
    };

    function kmConvert(rmInput) { // convert romaji (michael) to kana (michael)
        let kmOutput = "";

        let splstr = rmInput.split(""); // split input into characters
        let i = 0, len = splstr.length;
        while (i < len) {
            if (mikaeru[splstr[i]]) kmOutput = `${kmOutput}${mikaeru[splstr[i]]}`;
            else kmOutput = `${kmOutput}${splstr[i]}`;
            ++i;
        };

        return kmOutput.trim(); // trim and return output
    };

    let output = [];
    if (message.lcCommand = "mikaeru") {
        output = rmConvert(message.lcArgsText);
        if (!output[1]) output[0] = kmConvert(output[0]);
    }
    else {
        output = rsConvert(message.lcArgsText);
        if (!output[1]) output[0] = ksConvert(output[0]);
    };

    message.reply(`\`\`\`${output[0]}\`\`\``);

};