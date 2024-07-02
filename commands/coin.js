/*

coin.js

coin decision maker
- flip it on the side (something that happens twice as less than heads / tails)
- flip it multiple times

*/

exports.run = (bot, message) => {

    // inputs
    // example : -coin Side 9
    let lcArgs = message.lcArgs; // ["side", "9"]

    function coinFlip(sm = false) {
        let outcome = Math.random(); // coinflip result
        if (sm) { // sidemode enabled
            if (outcome < 0.4) return 0; // 40% chance for heads
            else if (outcome < 0.8) return 1; // 40% chance for tails
            else return 2; // 20% chance for side
        }
        else { // else flip normal coin
            if (outcome < 0.5) return 0; // 50% chance for heads
            else return 1; // 50% chance for tails
        };
    };

    let sidemode = false;
    let times = 1;
    let result = 0;
    let output = ""; // output text

    if (lcArgs[0] == "side" || lcArgs[0] == "true" || lcArgs[0] == "on") {
        sidemode = true; // side args first
        times = parseInt(lcArgs[1]); // times to flip coin
        if (!times || times < 1) times = 1; // at least 1 flip
        else if (times > 1000000) times = 1000000; // at most 1 million flips
    }
    else {
        times = parseInt(lcArgs[0]); // times to flip coin
        if (!times || times < 1) times = 1; // at least 1 flip
        else if (times > 1000000) times = 1000000; // at most 1 million flips

        if (lcArgs[1] == "side") sidemode = true; // enable sidemode
    };

    if (times > 1) { // coin flipped more than 1 time
        result = [0, 0, 0];
        let i = 0;
        while (i < times) { // for times specified
            ++result[coinFlip(sidemode)];
            ++i;
        };
        output = `I flipped the coin \`${times}\` times.\n\`\`\`heads: ${result[0]}\ntails: ${result[1]}`; // output raw numbers

        if (sidemode) output += `\nside: ${result[2]}`; // append sidemode numbers

        output += `\`\`\``; // append ending
    }
    else { // coin flipped only once
        result = coinFlip(sidemode);

        if (result == 0) output = "oh, I got **heads**.";
        else if (result == 1) output = "oh, I got **tails**.";
        else output = "oh? the coin landed **on its side**!"; // side
    };

    message.reply(output);

};