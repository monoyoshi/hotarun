/*

rate.js

rate something. some stuff are rigged :)

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
        case lcArgsText.includes("dragalia"):
        case lcArgsText == "me" && message.author.id == bot.config.kyuID:
            output = "10/10";
            break;
        case lcArgsText.includes("hotaru"):
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