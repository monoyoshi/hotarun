/*

test.js

testing

*/

exports.run = (bot, message) => {

    let userID = [];
    let customSS = message.lcArgs[0];
    let customFlag = false;
    if (parseInt(customSS)) {
        userID = customSS.padStart(18, "0").split("");
        customFlag = true;
    }
    else {
        if (bot.userTable.soulscream) { // if user has an already-existing soulscream, use that one
            message.reply(bot.userTable.soulscream);
            return;
        };

        userID = message.author.id.padStart(18, "0").split(""); // takes user ID and splits it into 18 individual digits with leading 0s (so it's an 18 digit number)
    };

    // length of soulscream
    let lengthSS = parseInt(userID[15]) + parseInt(userID[16]) + parseInt(userID[17]); // base off last three numbers of ID
    while (lengthSS >= 10) lengthSS = lengthSS - 10; // decrease by 10 until number is between 0 and 9
    lengthSS = lengthSS * 11; // multiply by 11 to get soulscream length

    // build soulscream
    let uidI = 0; // position of digit to convert
    let finalSoulscream = ""; // final soulscream
    let loopTimes = 0;

    let i = 0;
    while (i < lengthSS) { // for the length of soulscream
        let ssChar = parseInt(userID[uidI]); // id digit in question
        // ssChar determines the letter used
        switch (ssChar) {
            case 1:
            case 7:
                finalSoulscream = `${finalSoulscream}A`;
                break;
            case 4:
            case 6:
                finalSoulscream = `${finalSoulscream}I`;
                break;
            case 3:
            case 0:
                finalSoulscream = `${finalSoulscream}E`;
                break;
            case 5:
            case 9:
                finalSoulscream = `${finalSoulscream}U`;
                break;
            case 2:
            case 8:
                finalSoulscream = `${finalSoulscream}X`;
        };

        if (ssChar == 0) ssChar = 3; // 0 cuts it real short so we'll substitute it with a 3
        uidI = uidI + ssChar + loopTimes; // new position is based on the old position, the letter used, and the number of loop times
        while (uidI >= 18) {
            uidI = uidI - 18;
            ++loopTimes;
        };
        if (uidI == 0) uidI = 1;

        ++i;
    };

    if (!customFlag) {
        bot.userTable.soulscream = finalSoulscream;
        bot.setUserEntry("soulscream");
    };
    
    message.reply(finalSoulscream);

};