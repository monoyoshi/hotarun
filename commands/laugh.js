/*

laugh.js

hotaru can laugh (moderately) and play a laugh track in the voice channel

*/

exports.run = (bot, message) => {

    // variable laugh size
    let laugh = "haha";
    let i = 0, len = Math.floor(Math.random() * 5);
    while (i < len) {
        laugh = `${laugh}ha`;
        ++i;
    };
    
    bot.playLocal("laugh.mp3");

    if (bot.aprilfools >= 0.69) {
        message.channel.send(`(MSTEXT__VO_CMD_LAUGH_${laugh.split("").length / 2})`);
        return;
    };
    message.channel.send(laugh);

};