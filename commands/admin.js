/*

admin.js

a bunch of admin commands, for both hotaru and the server (he needs a role for this, which should come with the discord invite link).
- activity : sets hotaru's activity, shown under his name. activity / game / play = playing, stream = playing (live on twitch), listen = listening to, watch = watching. blank entry removes game.
- webhook : creates a webhook for the channel it is used on. enables some features.
- eval : run javascript code
- status : sets hotaru's status. online = green, idle = yellow, invisible = gray (plus offline status), dnd = red.
- delete : deletes messages (1-100 messages from the past two weeks).
- reload : reload commands.
- brainwash : directly edit hotarun's sqlite database.

*/

exports.run = async (bot, message) => {

    if (message.author.id != bot.config.kyuID) return; // limited to kyu

    // inputs
    // example : -Admin Activity Play Dragalia Lost
    let lcCommand = message.lcCommand; // "admin"
    let args = message.args; // ["Activity", "Play", "Dragalia", "Lost"]
    let argsText = message.argsText; // "Activity Play Dragalia Lost"
    let lcArgs = message.lcArgs; // ["activity", "play", "dragalia", "lost"]

    // umbrella command
    if (lcCommand == "admin" || lcCommand == "bot") {
        lcCommand = lcArgs.shift(); // lcCommand = "activity", lcArgs = ["play", "dragalia", "lost"]
        args.shift(); // ["Play", "Dragalia", "Lost"]
        argsText = args.join(" "); // "Play Dragalia Lost"
    };

    switch (lcCommand) {
        case "activity": // activity : sets the activity of hotaru
        case "g":
        case "game":
        case "play":
        case "stream":
        case "listen":
        case "watch":
        case "compete": {
            // example: -Admin Activity Play Dragalia Lost
            let inputGame = argsText; // "Play Dragalia Lost"

            const outputGame = {"name": "", "activityType": "PLAYING"}; // output game

            if (lcCommand == "activity") {
                lcCommand = lcArgs.shift(); // lcCommand = "play", lcArgs = ["dragalia", "lost"] (unused)
                inputGame = args.slice(1).join(" "); // "Dragalia Lost"
            };

            if (inputGame.length > 50) inputGame = "";

            if (!inputGame.trim()) {
                if (lcCommand == "g") {
                    let gResult = bot.game(); // shortcut g : -g
                    if (gResult) {
                        outputGame.name = gResult.name;
                        outputGame.activityType = gResult.activityType;
                    };
                }
                else {
                    // bad input removes activity : -play
                    bot.user.setActivity();
                    message.reply("Okay, I'm not doing anything anymore.");
                    return;
                };
            }
            else { // there is definitely an input
                outputGame.name = inputGame;
                switch (lcCommand) {
                    case "stream":
                        outputGame.activityType = "STREAMING"; // streaming touken ranbu online (playing touken ranbu online) : -stream touken ranbu online
                        break;
                    case "listen":
                        outputGame.activityType = "LISTENING"; // listening (!) katsugeki touken ranbu ost : -listen katsugeki touken ranbu ost
                        break;
                    case "watch":
                        outputGame.activityType = "WATCHING"; // watching touken ranbu hanamaru : -watch touken ranbu hanamaru
                        break;
                    case "compete":
                        outputGame.activityType = "COMPETING"; // competing (!) alberian battle royale : -compete alberian battle royale
                        break;
                    default:
                        outputGame.activityType = "PLAYING"; // playing dragalia lost : -play dragalia lost
                };
            };

            bot.user.setActivity(outputGame.name, {type: outputGame.activityType}); // sets activity

            if (outputGame.activityType == "LISTENING") { // (grammar fix) listening to Crab Rave : -listen Crab Rave
                message.reply(`Okay, I'm now listening to **${outputGame.name}**.`);
                return;
            }
            else if (outputGame.activityType == "COMPETING") { // (grammar fix) competing in Alberian Battle Royale : -compete Alberian Battle Royale
                message.reply(`Okay, I'm now competing in **${outputGame.name}**.`);
                return;
            }
            else {
                if (outputGame.name.length < 1) message.reply("Okay, I'm not doing anything anymore.");
                else message.reply(`Okay, I'm now ${outputGame.activityType.toLowerCase()} **${outputGame.name}**.`);
                return;
            };
        };

        case "webhook": // webhook - initializes hotaru's webhook
            message.channel.createWebhook("hotaru(n)'s webhook", {
                avatar: bot.user.avatarURL(),
            }).then(
                message.reply("Okay, webhook created.")
            );
            return;

        case "general":
            bot.serverTable.general = message.channel.id;
            bot.setServerEntry("general");
            message.reply("Okay, I'll speak here.");
            return;
        
        case "exit":
            message.reply("Oh, alright! Initiating shutdown...").then(() => {
                console.log(`${bot.timestamp()}: Going offline...`);
                bot.user.setStatus("invisible");
            }).then(() => {
                console.log(`${bot.timestamp()}: Saving and closing my database...`);
                bot.sql.close();
            }).then(() => {
                console.log(`${bot.timestamp()}: Wrapping things up... See you later, master!`);
                process.exit(0);
            });
    };

    // following commands need arguments
    if (!argsText) return;

    switch (lcCommand) {
        case "eval": { // taken/referenced from here: https://anidiots.guide/examples/making-an-eval-command/
            const clean = async (text) => { // cleans up and prepares result
                // await promises
                if (text && text.constructor.name == "Promise") text = await text;

                // stringify non-strings
                if (typeof text !== "string") text = require("util").inspect(text, { depth: 1 });

                // replace symbols with character code alternatives
                text = text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));

                return text;
            };

            let cleaned = "";
            try {
                const evaled = eval(argsText); // raw eval
                cleaned = await clean(evaled); // clean eval
            } catch (e) {
                cleaned = e; // eval is now the error
            };

            message.reply(`\`\`\`js\n${cleaned}\`\`\``);
            return;
        };

        case "status": {
            let status = lcArgs[0];
            if (status == "online" || status == "idle" || status == "invisible" || status == "dnd") { // accepted statuses
                bot.user.setStatus(status).then(
                    message.reply(`Understood! I am now **${status}**.`)
                );
            }
            else message.reply("Uh, you know I can't do that..."); // invalid option
            return;
        };

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
            // if (r == 1) console.log(`${bot.timestamp()}: Deleted a message.`);
            // else console.log(`${bot.timestamp()}: Deleted ${r} messages.`);
            return;
        };

        case "r":
        case "reload": {
            let i = 0, len = lcArgs.length;
            let isCommands = "";
            let notCommands = "";
            let output = "";
            while (i < len) {
                let ciq = lcArgs[i]; // "command in question"
                if (!bot.commands.has(ciq)) notCommands += ` \`${ciq}\``; // will not consider shortcuts
                else {
                    delete require.cache[require.resolve(`./${ciq}.js`)]; // delete from cache
                    bot.commands.delete(ciq); // delete from enmap

                    // reload
                    const props = require(`./${ciq}.js`);
                    bot.commands.set(ciq, props);

                    isCommands += `\`${ciq}\` `;
                };
                ++i;
            };

            if (isCommands) output = `Okay. The following commands have been reloaded: ${isCommands}`;
            if (!!notCommands) output += `\nI wasn't able to find the following commands: ${notCommands}`;
            message.reply(output);
            return;
        };

        case "bw":
        case "brainwash": {
            try {
                let lcCommand = lcArgs[0];
                let table = args[1]; // name of table
                let id = lcArgs[2]; // id of row
                let column = args[3]; // name of column

                if (!table) return;

                if (!id || id == "self") {
                    id = message.author.id;
                    table = "users";
                };

                function getRow(tbl, id, col) {
                    let output = bot.sql.prepare(`SELECT * FROM ${tbl} WHERE id = ?`).get(id);
                    if (col) return eval(`output.${col}`);
                    else return JSON.stringify(output, null, 4);
                };

                function setRow(tbl, id, col, value) {
                    if (value) {
                        let type = bot.sql.prepare(`SELECT typeof(${col}) FROM ${tbl} LIMIT 1`).get()[`typeof(${col})`];
                        if (type == "text") return bot.sql.prepare(`UPDATE ${tbl} SET ${col} = '${value}' WHERE id = ${id};`).run();
                        else if (type == "integer") return bot.sql.prepare(`UPDATE ${tbl} SET ${col} = ${parseInt(value)} WHERE id = ${id};`).run();
                    };
                };

                switch (lcCommand) {
                    case "get":
                        message.reply(`\`\`\`js\n${getRow(table, id, column)}\`\`\``);
                        return;
                    case "set":
                        setRow(table, id, column, args.slice(5).join(" ").trim());
                        break;
                    case "new":
                        bot.sql.prepare(`INSERT OR REPLACE INTO ${table} (id) VALUES (${id});`).run();
                        break;
                    case "delete":
                        bot.sql.prepare(`DELETE FROM ${table} WHERE id = ${id};`).run();
                };

                message.reply("Done!");
            } catch (e) {
                message.channel.send(`\`\`\`js\n${e}\`\`\``);
            };
            return;
        };
    };

};