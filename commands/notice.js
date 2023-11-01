/*

notice.js

toggles a role that allows hotaru to interact with you

*/

exports.run = (bot, message) => {

    if (message.lcCommand == "trust") {    
        if (message.author.id != bot.config.kyuID) return; // limited to kyu

        if (message.lcArgs[0] == "on") {
            if (bot.serverTable.trust == 1) message.reply("I'm already comfortable here!");
            else {
                bot.serverTable.trust = 1;
                bot.setServerEntry("trust");
                message.reply("Alright, I'll trust this place.");
            };
        }
        else if (message.lcArgs[0] == "off") {
            if (bot.serverTable.trust == 0) message.reply("This place feels a little foreign to me...");
            else {
                bot.serverTable.trust = 0;
                bot.setServerEntry("trust");
                message.reply("Alright, I'll tone down.");
            };
        }
        else {
            if (bot.serverTable.trust == 1) message.reply("I'm already comfortable here!");
            else message.reply("This place feels a little foreign to me...");
        };

        return;
    };

    if (message.lcArgs[0] == "on") {
        if (bot.userTable.notice == 1) message.reply("I'm already your friend!");
        else {
            bot.userTable.notice = 1;
            bot.setUserEntry("notice");
            message.reply("Alright, I shall spare some attention to you.");
        };
    }
    else if (message.lcArgs[0] == "off") {
        if (bot.userTable.notice == 0) message.reply("... who are you?");
        else {
            bot.userTable.notice = 0;
            bot.setUserEntry("notice");
            message.reply("Alright, I'll see you some other time!");
        };
    }
    else {
        if (bot.userTable.notice == 1) message.reply("I'm already your friend!");
        else message.reply("... who are you?");
    };

};