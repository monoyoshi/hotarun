/*

eight.js

8-ball decision maker
- 8 positive
- 8 negative
- 8 neutral

*/

exports.run = (bot, message) => {

    let rng = Math.random(); // picks between positive, negative, neutral
    const responses = [];

    if (rng < (1/3)) { // positive
        responses.push(
            "Yes!",
            "Absolutely!",
            "Without a doubt!",
            "It's certain!",
            "Positive!",
            "Of course!",
            "Yup!",
            "Heck yeah!"
        );
    }
    else if (rng < (2/3)) { // negative
        responses.push(
            "No!",
            "Never!",
            "Not right now.",
            "Don't count on it.",
            "Negative...",
            "Nah.",
            "Nope!",
            "Heck no!"
        );
    }
    else { // neutral
        responses.push(
            "Maybe.",
            "I don't know.",
            "I can't predict it right now...",
            "I'm not in the position to answer that...",
            "What?",
            "Oh... Ask again, sorry.",
            "I might not be the best one to answer that...",
            "Heck maybe!"
        );
    };

    message.reply(responses[Math.floor(Math.random() * responses.length)]); // picks from the preset choices

};