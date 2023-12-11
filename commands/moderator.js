/*

moderator.js

this group of commands are more like a collection of miscellaneous admin commands than actual helpful moderator commands. I mean, if you really wanted to ban someone, just right-click them.
- webhook : creates a webhook for the channel it is used on. important for enabling some features.
- general : sets the "general" channel (required for non-command-based replies)
- delete : mass-deletes messages (1-100 messages from the past two weeks).

*/

exports.run = async (bot, message) => {

    if (message.author.id != bot.config.kyuID) return; // limited to kyu

    // inputs
    // example : -Moderator Delete 69
    let lcCommand = message.lcCommand; // "moderator"
    let args = message.args; // ["Delete", "69"]
    let argsText = message.argsText; // "Delete 69"
    let lcArgs = message.lcArgs; // ["delete", "69"]

    // umbrella command
    if (lcCommand == "mod") {
        lcCommand = lcArgs.shift(); // lcCommand = "delete", lcArgs = ["69"]
        args.shift(); // ["69"]
        argsText = args.join(" "); // "69"
    };

    switch (lcCommand) {
        case "webhook": // webhook - initializes hotaru's webhook
            message.channel.createWebhook("hotaru(n)'s webhook", {
                avatar: bot.user.avatarURL(),
            }).then(
                message.reply("okay, I have created the webhook.")
            );
            return;

        case "general":
            bot.serverTable.general = message.channel.id;
            bot.setServerEntry("general");
            message.reply("okay, I'll speak here.");
            return;
    };

    // following commands need arguments
    if (!argsText) return;

    switch (lcCommand) {
        case "del":
        case "delete": {
            let r = parseInt(lcArgs[0]); // messages to delete; any decimals will be ignored
            if (!r) return; // ignore if nonsense
            if (r > 100) r = 100; // upper cap 100 message
            else if (r < 1) r = 1; // lower cap 1 message

            message.delete().then(() => {
                message.channel.bulkDelete(r, true);
            }); // delete action + r messages
            
            // console logging
            // if (r == 1) console.log(`${bot.timestamp()}: deleted 1 message.`);
            // else console.log(`${bot.timestamp()}: deleted ${r} messages.`);
            return;
        };
    };

};