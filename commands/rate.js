/*

rate.js

rate something. some stuff are rigged

*/



exports.run = (bot, message) => {

    // inputs
    // example : -rate Jun Sazanami
    let lcArgsText = message.lcArgsText; // "jun sazanami"

    let output = "";

    switch (true) {
        case !lcArgsText:
            return;
        case bot.config.kyuAliases.includes(lcArgsText):
        case lcArgsText == "dragalia lost":
        case lcArgsText == "me" && message.author.id == bot.config.kyuID:
            output = "10/10";
            break;
        case lcArgsText == "hotaru":
        case lcArgsText == "hotaru(n)":
        case lcArgsText == "hotaru(n)#6467":
        case lcArgsText == "hotarun":
        case lcArgsText == "hotarumaru":
        case lcArgsText == "hontaru":
        case lcArgsText == "yourself":
        case lcArgsText == "urself":
            output = "100/10, of course!";
            break;
        default: 
            output = `${Math.floor(Math.random() * 11)}/10`;
    };

    message.reply(output);

};