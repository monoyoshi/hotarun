/*

ping.js

just a ping / pong command that hotaru(n) can do!
- now reports time between messages

*/

exports.run = (bot, message) => {

    // example : -ping
    let lcCommand = message.lcCommand; // "ping"

    const preset = [];

    if (bot.aprilfools >= 0.69) {
        message.channel.send(`(MSTEXT__CMD_${message.lcCommand.toUpperCase()}_${Date.now() - message.createdTimestamp})`);
        return;
    };

    if (message.lcCommand == "pong") {
        preset.push(
            "ping!",
            "oh, what, what?",
            "おっ、なになに？",
            "is ponging me fun?",
            "ポンするの、楽しい？",
            "if you pong me that much, I'll crash!",
            "そんなにポンたら落ちちゃう！",
            "I'm here~",
            "入ってま～す",
            "hey, stop it...! you're ponging me too much!",
            "やーめーてーよ！ポンしすぎ！",
            "I'm not a bot, okay?",
            "俺、ボットじゃないからな",
            "I...told...you!",
            "だーかーらぁー",
            `ping! ${bot.emoji.pool[Math.floor(Math.random() * bot.emoji.pool.length)]}`,
            `${bot.prefix}${lcCommand}`
        );
    }

    else {
        preset.push(
            "pong!",
            "oh, what, what?",
            "おっ、なになに？",
            "is pinging me fun?",
            "ピンするの、楽しい？",
            "if you ping me that much, I'll crash!",
            "そんなにピンたら落ちちゃう！",
            "I'm here~",
            "入ってま～す",
            "hey, stop it...! you're pinging me too much!",
            "やーめーてーよ！ピンしすぎ！",
            "I'm not a bot, okay?",
            "俺、ボットじゃないからな",
            "I...told...you!",
            "だーかーらぁー",
            `pong! ${bot.emoji.pool[Math.floor(Math.random() * bot.emoji.pool.length)]}`,
            `${bot.prefix}${lcCommand}`
        );
    };

    message.channel.send(`${preset[Math.floor(Math.random() * preset.length)]} (${Date.now() - message.createdTimestamp} ms)`);
};