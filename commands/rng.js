/*

rng.js

hotaru can call upon the great power of rng to satisfy your needs!

*/

exports.run = (bot, message) => {

    // inputs
    // example : -rng 100 0 9
    let lcCommand = message.lcCommand; // "rng"
    let lcArgs = message.lcArgs; // ["100", "0", "9"]

    let rng = 0;
    let output = 0;
    let times = parseInt(lcArgs[0]);
    if (!times || times < 0) times = 1;

    if (lcCommand == "roll" || lcCommand == "dice") {
        const dice = [0, 0, 0, 0, 0, 0];
        while (i < times) {
            rng = Math.floor(Math.random() * 6) + 1; // hotaru ran out of koban so he only has six-sided dice
            ++dice[rng - 1];
            ++i;
        };
        if (times > 1) {
            output =
`I rolled the six-sided dice **${times}** times.

- one: **${dice[0]}**.
- two: **${dice[1]}**.
- three: **${dice[2]}**.
- four: **${dice[3]}**.
- five: **${dice[4]}**.
- six: **${dice[5]}**.`
        }
        else output = `Oh, I rolled a **${rng}**.\n`; // heads
        message.reply(output);
        return;
    };

    if (!message.lcArgsText) return;

    let min = 0;
    let max = 0;
    let rolls = 0;
    if (times > 100) times = 100;
    min = parseInt(lcArgs[1]); // minimum number for rng
    max = parseInt(lcArgs[2]); // maximum number for rng

    if (!min) min = 1;
    if (!max) max = 10;
    if (max <= min) max = min + 1;
    if (min == 0) ++max; // something
    rolls = "";
    let i = 0;
    while (i < times) {
        rng = Math.floor(Math.random() * (max - min + 1) ) + min; // can pick from (min = 0, max = 5) 0, 1, 2, 3, 4, 5
            
        switch (true) {
            case ((i == (times - 1)) && times > 1):
                rolls = rolls + "**and **" + rng; // 1 [and 2]
                break;
            case times == 2:
                rolls = rolls + rng + " "; // [1 ]and 2
                break;
            case times == 1:
                rolls = rolls + rng; // [1]
                break;
            default:
                rolls = rolls + rng + ", "; // [1, ][2, ]and 3
        };

        ++i;
    };

    if (min == 0) --max; // something
    message.reply(`From the numbers **${min}** to **${max}**, I got\n**${rolls}**.`); // generates (times = 5, min = 1, max = 10) From the numbers 1 to 5, I got **2, 6, 10, 4, and 8**.

};