/*

surtr.js

speak like surtr dragalia lost!

*/

// surtrspeak.json - surtr cipher dictionary database
const scdb = require("../json/surtrspeak.json");

exports.run = async (bot, message) => {

    function sConvert(mInput) { // convert alphabet (michael) to surtr-speak
        let sOutput = ""; // output string

        if (!mInput) sOutput = bot.mSE("Input is invalid.");
        else {
            let splstr = mInput.trim().split(""); // trim and split input string
            if (splstr.length > 300) sOutput = bot.mSE(`Input is too long (${splstr.length} - less than 300 characters, please!).`); // 300 character limit

            else { // all good!
                let i = 0, len = splstr.length;
                while (i < len) {
                    if (scdb.surtr[splstr[i]]) sOutput = `${sOutput}${scdb.surtr[splstr[i]]}`;
                    else sOutput = `${sOutput}${splstr[i]}`;

                    ++i;
                };
            };
        };

        return sOutput.trim(); // trim and return output
    };

    function mConvert(sInput) { // convert surtr-speak to alphabet (michael)
        let mOutput = ""; // output string

        if (!sInput) mOutput = bot.mSE("Input is invalid.");
        else {
            let splstr = sInput.trim().split(""); // trim and split input string
            if (splstr.length > 300) mOutput = bot.mSE(`Input is too long (${splstr.length} - less than 300 characters, please!).`); // 300 character limit

            else { // all good!
                let i = 0, len = splstr.length;
                while (i < len) {
                    if (scdb.michael[splstr[i]]) mOutput = `${mOutput}${scdb.michael[splstr[i]]}`;
                    else mOutput = `${mOutput}${splstr[i]}`;
                    ++i;
                };
            };
        };

        return mOutput.trim(); // trim and return output
    };

    let output = "";
    if (message.lcCommand == "michael") output = mConvert(message.argsText);
    else output = sConvert(message.argsText);
    
    message.reply(`\`\`\`${output}\`\`\``);

};