/*

help.js

help command

*/

const { MessageEmbed } = require("discord.js"); // discord.js api for embeds

// shortcuts.json - allows commands with multiple triggers
const shortcuts = require("../json/shortcuts.json");

exports.run = (bot, message) => {

    // inputs
    // example : -help soulscream
    //let commandQ = message.lcArgs[0]; // "soulscream"

    /*const commandsList = {
        "admin":
`Alters certain features of me or the server I am in (I need specific permissions for this. These permissions should come with my invite link though, so as long as my role isn't messed with, I think I should be good.).
This command consists of five **master-only** subcommands (so unless you're them, you don't really need to see this. ...Why is this here, actually?).`,
        "binary":
`Translates text/decimal input to binary and vice versa.
This command consists of four subcommands.
The usage of \`binary\` is optional.

These subcommands are the following:
・\`dbinary\`: Converts decimal to binary. Usage: \`binary dbinary [integer]\`
・\`tbinary\`: Converts text to binary. Usage: \`binary tbinary [text; max 50 characters]\`
・\`binaryd\`: Converts binary to decimal. Usage: \`binary binaryd [binary number; can be negative]\`
・\`binaryt\`: Converts binary to text. Usage: \`binary binaryt [binary; max 300 characters]\``,
        "coin":
`Flip a coin. There is also an option to allow whether the coin lands on its side or not.

Usage: \`coin [number of flips; from 1 to 1000000 (optional)] [text; side / true / on (optional, default empty)]\``,
        "dotw":
`Calculate the day of the week given a certain date.

Usage: \`dotw [year; from 0 to ~9 quadrillion] [month; 1-12 or the full name of month] [date; 1-31 within reason]\``,
        "eight":
`Consult Juliana the Magic 8 Ball for advice. ...Don't ask who she is.

Usage: \`eight [your question (optional)]\``,
        "emoji":
`Allows you to access a huge variety of emoji.
This command uses a webhook in order to make the message look like it was sent from you.

Usage: \`emoji [names of emoji; case-sensitive, 9 emoji maximum\``,
        "flip":
`Flip your text upside-down.

Usage: \`flip [text; max 50 characters]`,
        "help":
`Provides info about me. Like this! You can get help for specific commands too.

Usage: \`help [command (optional)]\``,
        "honse":
`Translate text into a language called Honse. I'm not 100% fluent, but it's understandable. A translation follows the initial message.
This command uses a webhook in order to make the message look like it was sent from you.

Usage: \`honse [text; 30 character max]\``,
        "laugh":
`I can laugh on command. Haha...?
If you're in a voice channel, I will join and play a laugh track.`,
        "math":
`Math is scary but ... I guess I can do some things?
This command consists of multiple sub-commands.
The usage of \`math\` is optional.

These subcommands are the following:
・\`sqrt\`: Calculates the square root of a number.
・\`average\`: Calculates the average of a given set of numbers.
・\`fibonacci\`: Calculate any number from the Fibonacci sequence.
・\`calc\`: Calculates basic equations (+, -, *, /, ^).`,
        "mirror":
`I repeat what you say. Simple, right? ...Just don't make me say things I'll regret, or else *they'll* get mad.

Usage: \`mirror [text]\``,
        "morse":
`Translates text into Morse code.

Usage: \`morse [text; max 50 characters]\``,
        "music":
`This command consists of two subcommands.
The sender is __required__ to be in a voice channel.
The usage of \`music\` is optional.

These subcommands are the following:
・\`nya\`: Meow ~
・\`airhorn\`: **BWAAAA**`,
        "notice":
`Toggles whether I should respond to all of your messages if possible. Without an on or off argument, this command shows your current status.

Usage: \`notice [text; on / off (optional)]\``,
        "pin":
`Translates text into a PIN code.

Usage: \`pin [text; max 50 characters]\``,
        "ping":
`Ping pong! The response also shows the speed of your message sent in milliseconds.
The command \`pong\` is similar. Pong ping?`,
        "rng":
`Utilizes a random number generator a given number of times.
This command has one subcommand: \`dice\`
In \`dice\`, a six-sided dice is rolled a given number of times.

Usage:
・\`rng [number of rolls; from 1 to 100] [number; minimum number for rng] [number; maximum number for rng]\`
・\`dice [number of rolls; from 1 to 100]\``,
        "roulette": "Be careful...",
        "rps":
`Play rock paper scissors with me. Swords and guns are also eligible!
This command has one subcommand: \`rpsls\`.
In \`rpsls\`, Lizard and Spock are also eligible moves.

Usage:
・\`rps [text; rock / paper / scissors, each "action" is separated using spaces]\`
・\`rpsls [text; rock / paper / scissors / lizard / spock, each "action" is separated using spaces]\``,
        "soulscream":
`Allows you to find out what your soulscream (from the hit game Blaseball!) is.\nSoulscreams are generated based on your Discord ID and your vibes. *I see right through you, after all...*

Usage: \`soulscream [text; a discord id (or any reasonable number, really) (optional)\``,
        "sticker":
`Sends stickers originating from Dragalia Lost.
If you are in a voice channel, the associated sound plays when a sticker is sent.
The usage of \`sticker\` is optional.

Usage: \`sticker [text; name of sticker]\``,
        "surtr":
`(\`surtr\`) O eb taom, rji duqit ug sierj!
(\`michael\`) I am ruin, the sower of death!

Usage:
・\`surtr [text; max 300 characters]\`
・\`michael [text; max 300 characters]\``,
"suruto":
`(\`suruto\`) ０ｑｄｆｄ０ふぉｊｈｈ￥ｇｆ／ｚ！
(\`mikaeru\`) わたしはしわはらまくくーきはめつ！

Usage:
・\`suruto [text; max 300 characters]\`
・\`mikaeru [text; max 300 characters]\``,
        "type":
`Shows the type effectiveness of a given type combination. Like in Pokémon! I try to be as up-to-date as possible.

Usage: \`type [text; type 1] [text; type 2 (optional)]\``,
        "weather":
`Checks the weather from around the world.

Usage: \`weather [text; a valid name of a given place]\``
    };*/

    let d = new Date(); // check time after every message received

    let output = "";
    // april fools
    if (bot.annualEvent(3, 31, 4, 1)) {
        output =
`\`\`\`(${d.getUTCFullYear()}/${(d.getUTCMonth() + 1).toString().padStart(2, "0")}/${d.getUTCDate().toString().padStart(2, "0")}) NEW MESSAGE
------------------------------
hey there, (MSNAME__${message.author.username.toUpperCase()})!
\`\`\`** **`;
    }
    else if (bot.annualEvent(4, 2, 4, 8)) {
        output =
`\`\`\`(${d.getUTCFullYear()}/04/0${d.getUTCDate()}) NEW MESSAGE
------------------------------
sorry about that, ${message.author.tag}! I should be fine from now on though, so don't worry!
\`\`\`** **`;
    };

    const embed = new MessageEmbed();

    /*if (commandsList[commandQ]) {
        embed
            .setColor(bot.config.color)
            .setTitle(`Help for ${commandQ}`)
            .setDescription(commandsList[commandQ]);

        if (output) message.channel.send({ content: output, embeds: [embed] });
        else message.channel.send({ embeds: [embed] });
    }
    else if (shortcuts[commandQ]) {
        let shortcutsQ = shortcuts[commandQ];
        embed
            .setColor(bot.config.color)
            .setTitle(`Help for ${commandQ} (${shortcutsQ})`)
            .setDescription(commandsList[shortcutsQ]);

        if (output) message.channel.send({ content: output, embeds: [embed] });
        else message.channel.send({ embeds: [embed] });
    }
    else {*/
        embed
            .setColor(bot.config.color)
            .setTitle(`help for ${bot.user.tag}`)
            .setThumbnail(bot.user.avatarURL())
            .setDescription(
`hello! I am **hotaru(n)**, a combat android.

currently, I am cooking. if you need help with commands, then you're kinda out of luck. sorry :(`
            )
            .addFields({ name: "List of commands", value: `\`${bot.commands.indexes.join("`, `")}\``});
        if (output) message.channel.send({ content: output, embeds: [embed] });
        else message.channel.send({ embeds: [embed] });
    //};

};