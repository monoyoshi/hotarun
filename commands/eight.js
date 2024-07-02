/*

eight.js

8-ball decision maker
- 8 positive
- 8 negative
- 8 neutral

*/

exports.run = (bot, message) => {

    // inputs
    // example: -8ball will I get the 5-star?
    let lcArgsText = message.lcArgsText; // will I get the 5-star

    if (["kill myself", "kill my self", "kms",
        "i die",
        "suicide",
        "commit",
        "unalive"].includes(lcArgsText.replace(/[,.<>?\/;':"\[\]{}\\|~`!@#$%\^&\*()\-=_+]/g, ""))) {
        message.reply("no!\n(please do not abuse this command. thank you.)"); // hard no
        return;
    };

    let rng = Math.random(); // picks between positive, negative, neutral
    const responses = [];

    if (rng < (1/3)) { // positive
        responses.push(
            "yes!",
            "absolutely!",
            "without a doubt.",
            "it's certain!",
            "positive!",
            "of course!",
            "yup!",
            "heck yeah!"
        );
    }
    else if (rng < (2/3)) { // negative
        responses.push(
            "no!",
            "never.",
            "not right now.",
            "don't count on it.",
            "negative.",
            "nah.",
            "nope!",
            "heck no!"
        );
    }
    else { // neutral
        responses.push(
            "maybe.",
            "I don't know.",
            "I can't tell...",
            "I can't really answer that...",
            "what?",
            "yes! no. maybe? I don't know.",
            "don't ask me...!",
            "heck...maybe!"
        );
    };

    message.reply(responses[Math.floor(Math.random() * responses.length)]); // picks from the preset choices

};