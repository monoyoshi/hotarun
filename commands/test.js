/*

test.js

testing / quick execution

*/



exports.run = (bot, message) => {

    if (message.author.id != bot.config.kyuID) return; // limited to me

    let output = message.author.username; // bot.annualEvent(9, 21, 9, 30).toString();

    message.reply("you are **" + output + "** !!");

};