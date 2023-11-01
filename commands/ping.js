/*

ping.js

just a ping / pong command that hotaru can do!
- now reports time between messages

*/

exports.run = (bot, message) => {

    // example : -ping
    let lcCommand = message.lcCommand; // "ping"

    const preset = [];

    if (message.lcCommand == "pong") {
        if (bot.aprilfools >= 0.69) {
            message.channel.send(`(MSTEXT__CMD_PONG_${Date.now() - message.createdTimestamp}_00${Math.floor(Math.random() * 89) + 10})`);
            return;
        };
        preset.push(
            "Ping!",
            "ping!",
            "Oh, what, what?",
            "おっ、なになに？",
            "Is ponging me fun?",
            "ポンするの、楽しい？",
            "If you pong me that much, I'll crash!",
            "そんなにポンたら落ちちゃう！",
            "I'm here~",
            "入ってま～す",
            "Sto-p i-t! You're ponging me too much!",
            "やーめーてーよ！ポンしすぎ！",
            "I'm not a bot, okay?",
            "俺、ボットじゃないからな",
            "I! Told! You!",
            "だーかーらぁー",
            `Ping! ${bot.emoji.pool[Math.floor(Math.random() * bot.emoji.pool.length)]}`,
            `${bot.prefix}${lcCommand}`,
            "So this is another server, huh? Somehow it feels like I've seen many new servers...",
            "The members of this server are nice. They remind me of those from my own server.",
            "Communication is important regardless of topic. That's the only way we learn about others.",
            "I admit, it is sometimes nice to be adored... but being called Hotarun is still a little embarrassing.",
            "If you would be so kind as to...refrain from ponging me on the head..."
        );
    }

    else {
        if (bot.aprilfools >= 0.69) {
            message.channel.send(`(MSTEXT__CMD_PING_${Date.now() - message.createdTimestamp}_00${Math.floor(Math.random() * 89) + 10})`);
            return;
        };
        preset.push(
            "Pong!",
            "pong!",
            "Oh, what, what?",
            "おっ、なになに？",
            "Is pinging me fun?",
            "ピンするの、楽しい？",
            "If you ping me that much, I'll crash!",
            "そんなにピンたら落ちちゃう！",
            "I'm here~",
            "入ってま～す",
            "Sto-p i-t! You're pinging me too much!",
            "やーめーてーよ！ピンしすぎ！",
            "I'm not a bot, okay?",
            "俺、ボットじゃないからな",
            "I! Told! You!",
            "だーかーらぁー",
            `Pong! ${bot.emoji.pool[Math.floor(Math.random() * bot.emoji.pool.length)]}`,
            `${bot.prefix}${lcCommand}`,
            "So this is another server, huh? Somehow it feels like I've seen many new servers...",
            "The members of this server are nice. They remind me of those from my own server.",
            "Communication is important regardless of topic. That's the only way we learn about others.",
            "I admit, it is sometimes nice to be adored... but being called Hotarun is still a little embarrassing.",
            "If you would be so kind as to...refrain from pinging me on the head..."
        );
    };

    message.channel.send(`${preset[Math.floor(Math.random() * preset.length)]} (${Date.now() - message.createdTimestamp} ms)`);
};