/*

sticker.js

sends a sticker + the audio file paired with it (if user is in voice chat)

*/

// stickers.json - list of useable stickers for the sticker command
const stickers = require("../json/stickers.json");

exports.run = async (bot, message) => {

    // inputs
    // example : -sticker Together
    let lcCommand = message.lcCommand; // "sticker"
    let lcArgs = message.lcArgs; // ["together"]

    function stickerSound(file) {

        if (file.startsWith("1110")) file = "11101"; // directional sticker fix

        // new version new ... voice shenanigans

        if (bot.inVC()) {

            const { joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require("@discordjs/voice"); // voice requirements

            // create connection to server voice channel
            const connection = joinVoiceChannel({
	            channelId: message.member.voice.channel.id,
    	        guildId: message.member.voice.channel.guild.id,
    	        adapterCreator: message.member.voice.channel.guild.voiceAdapterCreator,
            });

            // bot is connected to voice channel
            connection.on(VoiceConnectionStatus.Ready, () => {
                let resource = createAudioResource(`assets/sticker/audio/${file}.wav`); // file to play

                // create audio player
                const player = createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Stop
                    }
                });

                player.play(resource); // play file
                connection.subscribe(player); // subscribe it to voice channel

                // player errors / ends
                player.on("idle", error => {
                    connection.destroy();
                });
            });
        };
    };

    let sticker = "";
    const thanksS = ["10003", "12403"];
    const heeheeS = ["10202", "10703"];
    const doyaS = ["10203", "11502", "13102"];
    const boomS = ["10203", "13102"];
    const tadaS = ["10703", "13103"];
    const hnyS = ["10801", "10802", "10901", "10902"];
    const wellwellS = ["11202", "12901"];

    // umbrella command
    if (lcCommand == "sticker" || lcCommand == "s") {
        if (lcArgs) lcCommand = lcArgs[0]; // new command : -sticker together → "together"
        else return;
    };

    switch (lcCommand) {
        case "thanks":
            sticker = thanksS[Math.floor(Math.random() * thanksS.length)];
            break;
        case "heehee":
            sticker = heeheeS[Math.floor(Math.random() * heeheeS.length)];
            break;
        case "doya":
            sticker = doyaS[Math.floor(Math.random() * doyaS.length)];
            break;
        case "boom":
            sticker = boomS[Math.floor(Math.random() * boomS.length)];
            break;
        case "tada":
            sticker = tadaS[Math.floor(Math.random() * tadaS.length)];
            break;
        case "happynewyear":
        case "hny":
            sticker = hnyS[Math.floor(Math.random() * hnyS.length)];
            break;
        case "wellwell":
            sticker = wellwellS[Math.floor(Math.random() * wellwellS.length)];
            break;
        default:
            sticker = stickers[lcCommand]; // new command : -together → "together"
    }

    if (sticker) {
        stickerSound(sticker);

        try {
            const webhooks = await message.channel.fetchWebhooks();
            const webhook = webhooks.first();
    
            await webhook.send({
                files: [{
                    attachment: `assets/sticker/image/${sticker}.png`,
                    name: `${sticker}.png`
                }],
                username: message.member.displayName,
                avatarURL: message.author.avatarURL()
            });

            message.delete();
        } catch (e) {
            message.reply(bot.mSE("Something went wrong. The webhook's probably not set up."));
            return;
        };
    };

};