/*

roulette.js

russian roulette

*/

exports.run = (bot, message) => {

    if (!bot.userTable.roulette) bot.userTable.roulette = 6;

    let rng = Math.floor(Math.random() * bot.userTable.roulette);

    if (rng == 0) {
        message.reply("💥");
        bot.userTable.roulette = 6;
    }
    else {
        message.react("💨");
        --bot.userTable.roulette;

        let r = "6️⃣";
        switch (bot.userTable.roulette) {
            case 5:
                r = "5️⃣";
                break;
            case 4:
                r = "4️⃣";
                break;
            case 3:
                r = "3️⃣";
                break;
            case 2:
                r = "2️⃣";
                break;
            case 1:
                r = "1️⃣";
        };

        message.react(r);
    };

    bot.setUserEntry("roulette");

};