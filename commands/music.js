/*

music.js

basically a(n old) hub of music commands

*/

exports.run = (bot, message) => {

    let lcCommand = message.lcCommand;

    if (lcCommand == "nya") bot.playLocal("nya.mp3");
    else if (lcCommand == "airhorn") bot.playLocal("airhorn.mp3");

};