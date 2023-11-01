/*

test.js

testing

*/

exports.run = (bot, message) => {

    // inputs
    // example: -remember Dragalia Lost
    let lcCommand = message.lcCommand; // "remember"
    let argsText = message.argsText; // "Dragalia Lost"

    if (lcCommand == "recall") {
        if (!bot.userTable.remember) message.reply("Hmm, I don't think you made me remember anything...right?");
        else message.reply(`${bot.userTable.remember}`);
        return;
    }

    else if (lcCommand == "forget") {
        bot.userTable.remember = "";
        bot.setUserEntry("remember");
        message.reply("I forgor 💀");
        return;
    };

    if (!argsText) return;

    bot.userTable.remember = argsText.replace(/'/g, "''");
    bot.setUserEntry("remember");
    message.reply("Noted!");
    
};