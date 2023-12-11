/*

messageCreate.js

this event is fired in when a message is sent.

*/

// shortcuts.json - allows commands with multiple triggers
const shortcuts = require("../json/shortcuts.json");

// stickers.json - list of useable stickers for the sticker command
const stickers = require("../json/stickers.json");

module.exports = async (bot, message) => {

    // bot is always passed and has all of hotaru(n)'s stuff
    // message is the message created

    // if (!(message.author.id == bot.config.kyuID || message.author.id == bot.user.id)) return; // maintenance :)

    if (message.webhookId) return; // interaction blacklist part 1: ignoring webhook messages

    // prefix
    bot.prefix = bot.config.prefix;
    if (message.content.startsWith(`<@${bot.user.id}> `)) bot.prefix = `<@${bot.user.id}> `; // now he responds to pings
    
    // message part identification
    
    // default
    // example: -Admin Activity Play Dragalia Lost
    message.conTrim = message.content.trim(); // -Admin Activity Play Dragalia Lost
    message.args = message.conTrim.split(" ").slice(1); // ["Activity", "Play", "Dragalia", "Lost"]
    message.argsText = message.args.join(" "); // "Activity Play Dragalia Lost"

    // lowercase
    message.lcConTrim = message.conTrim.toLowerCase(); // -admin activity play dragalia lost
    message.lcCommand = message.lcConTrim.slice(bot.prefix.length).split(" ")[0]; // "admin"
    message.lcArgs = message.lcConTrim.split(" ").slice(1); // ["activity", "play", "dragalia", "lost"]
    message.lcArgsText = message.lcArgs.join(" "); // "activity play dragalia lost"

    // interaction blacklist part 2: ignoring bots, (most) swears / offensive words
    if (message.author.bot || bot.swearJar.isProfane(message.lcConTrim.split(" ").join("").replace(bot.punctList, ""))) return;

    // emoji
    bot.emoji = bot.emojis;
    bot.emoji.pool = [
        // a pool of random emoji that hotaru can use freely

        bot.emoji.hotarun = bot.emoji.cache.find(emoji => emoji.name == "hotarun"), // hotarun

        // ray mystic messenger emoji :)
        bot.emoji.ehhh = bot.emoji.cache.find(emoji => emoji.name == "ray_ehhh_a"), // ehhh
        bot.emoji.happy = bot.emoji.cache.find(emoji => emoji.name == "ray_happy_a"), // happy
        bot.emoji.love = bot.emoji.cache.find(emoji => emoji.name == "ray_flower_a"), // flower
        bot.emoji.no = bot.emoji.cache.find(emoji => emoji.name == "ray_no_a"), // no
        bot.emoji.party = bot.emoji.cache.find(emoji => emoji.name == "ray_party_a"), // party
        bot.emoji.sad = bot.emoji.cache.find(emoji => emoji.name == "ray_sad_a"), // sad
        bot.emoji.what = bot.emoji.cache.find(emoji => emoji.name == "ray_what_a"), // what

        // other mystic messenger emoji
        bot.emoji.depressed = bot.emoji.cache.find(emote => emote.name == "zen_depressed"), // depressed
        bot.emoji.surprised = bot.emoji.cache.find(emote => emote.name == "yoosung_surprised"), // surprised
        
        // etc.
        bot.emoji.kyurem = bot.emoji.cache.find(emote => emote.name == "kyurem"), // kyurem (it's marth)
        bot.emoji.keiko = bot.emoji.cache.find(emote => emote.name == "keiko"), // my dog keiko
        bot.emoji.nyo = bot.emoji.cache.find(emote => emote.name == "nyo"), // nyo
        bot.emoji.blade = bot.emoji.cache.find(emote => emote.name == "blade"), // blade
        bot.emoji.pesive = bot.emoji.cache.find(emote => emote.name == "pesive"), // pesive
        bot.emoji.flood = bot.emoji.cache.find(emote => emote.name == "flood"), // flood
        bot.emoji.sadrat = bot.emoji.cache.find(emote => emote.name == "sadrat"), // sadrat
        bot.emoji.marthjr = bot.emoji.cache.find(emote => emote.name == "marthjr"), // marthjr

        // etc. animated
        bot.emoji.hannah = bot.emoji.cache.find(emote => emote.name == "hannah"), // hannah
        bot.emoji.wiggle = bot.emoji.cache.find(emote => emote.name == "wiggle"), // wiggle
        bot.emoji.ratshake = bot.emoji.cache.find(emote => emote.name == "ratshake") // ratshake
    ];

    // functions

    // in voice channel - he flips out if the user isn't in a voice channel so this is here to stop that
    bot.inVC = function inVC() {
        if (message.member.voice.channel) return true; // in voice channel
        else return false; // not in voice channel
    };

    // play local audio
    bot.playLocal = function playLocal(audioPath) {

        // I . have no idea what's going on here actually (one day i will optimize this...or not)

        if (!bot.inVC()) return;

        const { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require("@discordjs/voice"); // voice requirements

        // create connection to server voice channel
        const connection = joinVoiceChannel({
	        channelId: message.member.voice.channel.id,
    	    guildId: message.member.voice.channel.guild.id,
	        adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
        });

        // bot is connected to voice channel
        connection.on(VoiceConnectionStatus.Ready, () => {
            let resource = createAudioResource(`assets/audio/${audioPath}`); // file to play

            // create audio player
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Stop,
                },
            });

            player.play(resource); // play file
            connection.subscribe(player); // subscribe it to voice channel

            // player errors / ends
            player.on("idle", (error) => {
                connection.destroy();
                console.log(error);
            });
        });
    };

    // extend shitposting
    function extender(spMsg) {
        // spMsg = shitpost message, the message that triggered this
        let extension = ""; // extension to use
        let result = ""; // resulting string

        if (spMsg.includes("ayy"))  {
            extension = "y";
            result = "ayy";
        }
        else if (spMsg.includes("lolol")) {
            extension = "ol";
            result = "lolol";
        }
        else {
            extension = "ha";
            result = "haha";
        };

        // it got nerfed :pensive:
        let i = 0, len = Math.floor(Math.random() * 5);
        while (i < len) {
            result = `${result}${extension}`; // builds output

            ++i;
        };

        return result;
    };

    function hotaruMention(mention = message.lcConTrim) {
        return bot.config.hotAliases.some(m => mention.includes(m));
    };

    // memory feature
    bot.userTable = bot.sql.prepare("SELECT * FROM users WHERE id = ?").get(message.author.id);
    bot.serverTable = bot.sql.prepare("SELECT * FROM servers WHERE id = ?").get(message.guild.id);

    if (!bot.userTable) {
        bot.sql.prepare(`INSERT OR REPLACE INTO users (id) VALUES (${message.author.id});`).run();
        bot.userTable = bot.sql.prepare("SELECT * FROM users WHERE id = ?").get(message.author.id);
    };

    if (!bot.serverTable) {
        bot.sql.prepare(`INSERT OR REPLACE INTO servers (id) VALUES (${message.guild.id});`).run();
        bot.serverTable = bot.sql.prepare("SELECT * FROM servers WHERE id = ?").get(message.guild.id);
    };

    // level formula; loosely based on dragalia lost's adventurer levelling system
    bot.lvlFormula = function lvlFormula(lvl) {
        return 10 * Math.floor((2/3) * Math.pow(lvl + 1, 3));
    };

    bot.getLevel = function getLevel() {
        let currentLvlFlag = false;
        let currentLvl = 1;
        while (!currentLvlFlag) {
            if (bot.userTable.exp >= bot.lvlFormula(currentLvl)) ++currentLvl;
            else currentLvlFlag = true;
        };

        return currentLvl;
    };

    bot.addExp = function addExp(exp = 0) {
        return bot.userTable.exp + exp;
    };

    // hp formula; loosely based off dragalia's hp formula with sword enthusiast ren as the base
    bot.hpFormula = function hpFormula(lvl) {
        return Math.floor((4.9 * lvl) + 60);
        // lvl 1 = 64
        // lvl 80 = 452

        // return Math.floor((((2 * 150) + 95) * lvl) / 100) + lvl + 5; // pkmn
    };

    // attack formula; loosely based off dragalia's attack stat formula with sword enthusiast ren as the base
    bot.atkFormula = function atkFormula(lvl) {
        return Math.floor((3.29 * lvl) + 39);
        // lvl 1 = 42
        // lvl 80 = 302

        // return Math.floor(((((2 * 150) + 95) * lvl) / 100 ) + 5 * 1.1); // pkmn
    };

    // emoji reacts
    if (bot.userTable.notice == 1 && hotaruMention()) {
        if (bot.config.waveList.includes(message.lcConTrim)) message.react("👋");
        if (bot.config.thankList.includes(message.lcConTrim)) message.react(bot.emoji.happy);
        if (bot.config.sleepList.includes(message.lcConTrim)) message.react(bot.emoji.oyasumarth);
    };

    // april fools! hotarun forgot to finalize his messages
    // this one is pretty solid so it's going to be recurring
    bot.aprilfools = 0;
    if (bot.annualEvent(4, 1)) {
        bot.aprilfools = Math.random();
        // 31% chance to MSTEXT (x >= 0.69)
        // affects no prefix commands + some prefix commands
    };

    if (!message.lcConTrim.startsWith(bot.prefix) ) { // if message doesn't have prefix : some special commands

        if (Math.random() < 0.009) { // 0.9% chance to change game upon being sent a message that isn't a command
            let messageGame = bot.game();
            bot.user.setActivity(messageGame.name, {type: messageGame.activityType});
        };

        // hotaru's birthday
        if (bot.annualEvent(11, 17) && message.lcConTrim.includes("happy birthday") && hotaruMention()) message.reply(`thank you ${message.author}! ${bot.emoji.happy}`);

        // interaction blacklist part 3: ignores messages in servers that aren't "trusted"
        if (bot.serverTable.trust == 0) return;

        // dadbot
        // ignore formatted text just to make things easier
        if (!["||", "\`", "~~", "*", "_"].some(m => message.lcConTrim.includes(m))) { // formatted text (plus some unfortunate asterisks ig) ban
            let input = message.lcConTrim.split(" "); // message to be processed
            let output = message.conTrim.split(" "); // dadbot reply
            let dbActive = false; // dadbot flag; true = dadbot

            // singular trigger
            let i = 0, ilen = input.length;
            while (i < ilen) { // go through message
                if (!dbActive && (input[i] == "im" || input[i] == "i'm")) {
                    if (bot.aprilfools >= 0.69) { // april fools
                        message.channel.send(`(MSTEXT__CHR_DADBOT_01_${i.toString().padStart(2, "0")}_${message.conTrim.length.toString().padStart(3, "0")})`);
                        return;
                    };

                    output = output[i+1];
                    if (output) dbActive = true; // dadbot is now triggered
                };

                ++i;
            };

            // i am trigger
            if (!dbActive) { // single-word didn't trigger dadbot
                i = 0;
                while (i < ilen) { // go through message
                    if (input[i+1] && !dbActive) { // if the word after still exists and dadbot hasn't been triggered
                        if (input[i] == "i" && input[i+1] == "am") { // if the two words being looked at are "i" and "am"
                            if (bot.aprilfools >= 0.69) { // april fools
                                message.channel.send(`(MSTEXT__CHR_DADBOT_01_04_${message.conTrim.length.toString().padStart(3, "0")})`);
                                return;
                            };

                            output = output[i+2];
                            if (output) dbActive = true; // dadbot is now triggered
                        };
                    };

                    ++i;
                };
            };

            // output generation and message handling
            if (dbActive && output.length > 0 && output.length <= 140) { // if dadbot has been triggered and the output is a valid length

                let lcOutput = output.toLowerCase();
                    
                // easter eggs
                if (hotaruMention(lcOutput)) {
                    message.channel.send("hello- wait, what? hey! you're not me...!");
                    return;
                };

                if (bot.userTable.notice == 0) return; // prevents unroled users from triggering dadbot; it can come off as weird

                if (message.author.id != bot.config.kyuID && bot.config.kyuAliases.includes(lcOutput)) {
                    message.channel.send("hello- wait, what? hey! you're not my...!");
                    return;
                };

                // dadbot sussy baka
                if (lcOutput == "sus") {
                    bot.playLocal("amogus.mp3");
                    if (bot.aprilfools >= 0.69) message.channel.send("(MSSUS)");
                    else message.channel.send(`${message.author} is a sussy baka`);
                    return;
                };

                // emoji cleaner using regex
                if (!/\p{Emoji}/u.test(output)) output = output.replace(bot.punctList, ""); // exception if output ends with emoji

                // filter
                if (bot.config.dbBlacklist.some(str => lcOutput.includes(str))) return;

                message.channel.send(`hello ${output.trim()}, I'm hotaru(n)!`);
                return;
            };
        };

        // interaction blackkist part 4: ignores messages from users that aren't "noticed"
        if (bot.userTable.notice == 0) return;

        // 21st night of september
        if (bot.annualEvent(9, 21, 9, 30) && (message.lcConTrim == "do you remember" || message.lcConTrim == "do u remember")) message.channel.send("THE 21ST NIGHT OF SEPTEMBER");

        else {
            switch (true) {
                // voice chat shenanigans

                // this is so sad alexa (hotaru) play despacito
                case hotaruMention() && message.lcConTrim.includes("play despacito"):
                case message.lcConTrim.includes("alexa play despacito"):
                    bot.playLocal("despacito.mp3");
                    if (bot.inVC()) {
                        if (bot.aprilfools >= 0.69) message.channel.send("(MSAUDIO__BGM_DESPACITO)");
                        else message.reply("Now Playing: Luis Fonsi - Despacito (feat. Daddy Yankee)");
                        return;
                    };
                    break;

                // among us trap remix
                case message.lcConTrim.includes(" is a sussy baka"):
                    bot.playLocal("amogus.mp3");
                    if (bot.aprilfools >= 0.69) message.channel.send(`(MSTEXT__CHR_SUS_00_${message.lcConTrim.split(" is a sussy baka")[0].split("").length.toString().padStart(2, "0")})`);
                    else message.channel.send(message.lcConTrim);
                    return;
                case message.lcConTrim.includes("sus") && Math.random() < 0.2:
                    bot.playLocal("amogus.mp3");

                    if (bot.aprilfools >= 0.69) message.channel.send(`(MSTEXT__CHR_SUS_01)`);
                    else message.channel.send("sus");
                    return;
                case message.lcConTrim.includes("amogus") && Math.random() < 0.3:
                    bot.playLocal("amogus.mp3");

                    if (bot.aprilfools >= 0.69) message.channel.send("(MSTEXT__VO_CHR_AMOGUS)");
                    else message.channel.send("amogus");
                    return;
                
                // echolalia
                // epee
                case message.lcConTrim.includes("epee") && Math.random() < 0.3:
                    if (bot.aprilfools >= 0.69) message.channel.send("(MSTEXT__CHR_EPEE)");
                    else message.channel.send("epee");
                    return;
                // aawagga
                case message.lcConTrim.includes("aawagga") && Math.random() < 0.3:
                    if (bot.aprilfools >= 0.69) message.channel.send("(MSTEXT__CHR_AAWAGGA)");
                    else message.channel.send("aawagga");
                    return;
            };

            // response building
            let output = "";

            switch (true) {
                // who's steve jobs
                case message.lcConTrim.includes("who's steve jobs"):
                case message.lcConTrim.includes("whos steve jobs"):
                case message.lcConTrim.includes("who is steve jobs"):
                    if (bot.aprilfools >= 0.69) {
                        message.channel.send("(MSTEXT__CHR_STEVEJOBS_00)");
                        return;
                    };
                    output = "💥 ";
                    break;

                // what's ligma
                case message.lcConTrim.includes("what's ligma"):
                case message.lcConTrim.includes("whats ligma"):
                case message.lcConTrim.includes("what is ligma"):
                    if (bot.aprilfools >= 0.69) {
                        message.channel.send("(MSTEXT__CHR_LIGMA_00)");
                        return;
                    };
                    output = "ligma balls ";
                    break;
                case message.lcConTrim.includes("わつりぐま"):
                case message.lcConTrim.includes("ワツりぐま"):
                    if (bot.aprilfools >= 0.69) {
                        message.channel.send("(MSTEXT__CHR_LIGMA_01)");
                        return;
                    };
                    output = "りぐまぼーるず ";
                    break;
                case message.lcConTrim.includes("ワツリグマ"):
                case message.lcConTrim.includes("わつリグマ"):
                    if (bot.aprilfools >= 0.69) {
                        message.reply("(MSTEXT__CHR_LIGMA_02)");
                        return;
                    };
                    output = "リグマボールズ ";
                    break;
            };

            // shitposting
            let ayyFlag = message.lcConTrim.includes("ayy");
            let lololFlag = message.lcConTrim.includes("lolol");
            let hahaFlag = message.lcConTrim.includes("haha");

            if ((ayyFlag || lololFlag || hahaFlag)
            && !((ayyFlag && lololFlag)
            || (ayyFlag && hahaFlag)
            || (lololFlag && hahaFlag))) { // triggers only if only one extender is present

                if (Math.random() <= 0.3) { // only 30% chance to react (it is annoying sometimes)
                    if (bot.aprilfools >= 0.69) {
                        if (ayyFlag) {
                            message.channel.send(`(MSTEXT__CHR_SPOST_03_${message.lcConTrim.length.toString().padStart(3, "0")})`)
                            return;
                        }
                        else if (lololFlag) {
                            message.channel.send(`(MSTEXT__CHR_SPOST_05_${message.lcConTrim.length.toString().padStart(3, "0")})`)
                            return;
                        }
                        else {
                            message.channel.send(`(MSTEXT__CHR_SPOST_04_${message.lcConTrim.length.toString().padStart(3, "0")})`);
                            return;
                        };
                    };
                    output += `${extender(message.lcConTrim)} `;
                };
            };

            // marguns reply
            if (message.lcConTrim.includes(":marguns:")) {
                const filter = m => m.content;
                const collector = message.channel.createMessageCollector({ filter, time: 7500, max: 1 });
                let responded = false;
                
                collector.on('collect', m => {
                    if (m.content.toLowerCase().includes(":marsnug:")) responded = true;
                });
                
                collector.on('end', collected => {
                    if (!responded) {
                        if (bot.aprilfools >= 0.69) message.reply("(MSTEXT__CHR_MARSNUG)");
                        else message.reply(`${bot.emoji.cache.find(emote => emote.name == "marsnug")}`);
                        return;
                    };
                });
            };
            // unfortunately as a result, hotarun never responds to marsnug

            if (output) {
                message.channel.send(output);
                return;
            };
        };
    }
    else { // time for some real commands

        // well, kinda.
        // quick commands: commands I didn't feel the need to make a whole new file for
        let output = "";
        switch (message.lcCommand) {
            case "cry":
                output = "*lies down and cries*";
                break;
            case "crysomemore":
                output = "*lies down and cries some more*";
                break;
            case "d20":
                output = `oh, I rolled a \`${Math.floor(Math.random() * 20) + 1}\`.`;
                break;
            case "hug":
            case "providecomfortandsupportandbeagoodfriendforalongtime":
                output = "\*hugs you*";
                break;
            case "pat":
            case "pet":
                output = "\*pats you*";
                break;
            case "kick":
            case "punch":
            case "slap":
                output = "ow";
                break;
            case "avatar":
                output = `Here you go: ${message.author.avatarURL()}`;
                break;
            case "servericon":
                output = `Here you go: ${message.guild.iconURL()}`;
        };
        if (output) {
            message.channel.send(output);
            return;
        };

        let cmd = bot.commands.get(message.lcCommand);
        if (!cmd) {
            // shortcuts bc typing e is a lot more convenient than typing emoji
            if (shortcuts[message.lcCommand]) cmd = bot.commands.get(shortcuts[message.lcCommand]);
            else if (stickers[message.lcCommand]) cmd = bot.commands.get("sticker");
            else return;
        };
        cmd.run(bot, message);

        // and our adventure continues!
    };

};