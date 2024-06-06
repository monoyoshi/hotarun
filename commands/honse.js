/*

honse.js

translate into honsespeak
(pain)

*/

exports.run = async (bot, message) => {

    // inputs
    // example : -honse kyu is AMAZING!
    let argsText = message.argsText; // "kyu is AMAZING!"

    // custom emoji
    const eDR = bot.emoji.cache.find(emote => emote.name == "dr");
    const eDown = bot.emoji.cache.find(emote => emote.name == "down");

    // dictionary
    const honsespeak = {
        "a": "🅰️",
        "b": "🆎",
        "c": "🆖",
        "d": eDR,
        "e": "🇪",
        "f": "🇵 🇭",
        "g": "🆖",
        "h": "🇭",
        "i": "ℹ️",
        "j": "🆖",
        "k": "🆖",
        "l": "🇷",
        "m": "🇭",
        "n": "🆖",
        "o": "🅾️",
        "p": "🇵",
        "q": "🆖",
        "r": "🇷",
        "s": "🆖",
        "t": "🇾",
        "u": "🆙",
        "v": "🆎",
        "w": "🇭",
        "x": "🆖",
        "y": "🇾",
        "z": "🆖",
        "!": "‼️",
        "?": "❓",
        "-": "➖"
    };

    function convert(istring) {
        let olist = []; // output sentence array
        let ostring = ""; // output string

        istring = istring.split(" ");
        
        let i = 0, ilen = istring.length;
        while (i < ilen) { // for words inputted
            let splword = istring[i].split(""); // split word into characters

            let j = 0, jlen = splword.length;
            while (j < jlen) {
                if (!honsespeak[splword[j]]) ++j; // skip if character doesn't exist
                else if (splword[j+1]) { // if next character exists
                    // if current is a certain letter, and next is also a certain letter, use special character
                    switch (true) {
                        case (splword[j] == "d" && splword[j+1] == "o" && splword[j+2] == "w" && splword[j+3] == "n" && splword[j+4] == "!"):
                            olist.push(eDown);
                            j += 4;
                            break;
                        case (splword[j] == "d" && splword[j+1] == "o" && splword[j+2] == "w" && splword[j+3] == "n"):
							olist.push(eDown);
                            j += 3;
                            break;
                        case (splword[j] == "u" && splword[j+1] == "p" && splword[j+2] == "!"):
							olist.push("🆙");
                            j += 2;
                            break;
                        case (splword[j] == "a" && splword[j+1] == "b"):
							olist.push("🆎");
                            ++j;
                            break;
                        case (splword[j] == "a" && splword[j+1] == "v"):
							olist.push("🆎");
                            ++j;
                            break;
                        case (splword[j] == "d" && splword[j+1] == "r"):
							olist.push(eDR);
                            ++j;
                            break;
                        case (splword[j] == "u" && splword[j+1] == "e"):
							olist.push("🆙");
                            ++j;
                            break;
                        case (splword[j] == "n" && splword[j+1] == "g"):
							olist.push("🆖");
                            ++j;
                            break;
                        case (splword[j] == "n" && splword[j+1] == "l"):
							olist.push("🆖");
                            ++j;
                            break;
                        case (splword[j] == "w" && splword[j+1] == "h"):
							olist.push("🇭");
                            ++j;
                            break;
                        case (splword[j] == "u" && splword[j+1] == "p"):
							olist.push("🆙");
                            ++j;
                            break;
                        case (splword[j] == "u" && splword[j+1] == "s"):
							olist.push("🆙");
                            ++j;
                            break;
                        case (splword[j] == "s" && splword[j+1] == "s"):
							olist.push("🆖");
                            ++j;
                            break;
                        case (splword[j] == "!" && splword[j+1] == "!"):
							olist.push("‼️");
                            ++j;
                            break;
                        default:
                            olist.push(honsespeak[splword[j]]);
                    };
                }
                else olist.push(honsespeak[splword[j]]); // push last character

                ++j;
            };

            ++i;
        };

        i = 0, ilen = olist.length;
        while (i < ilen) {
            ostring = `${ostring} ${olist[i]}`; // build output
            ++i;
        };

        
        return ostring.trim(); // trim and return output
    };

    if (!argsText) return;

    if (argsText.replace(/\s+/g, "").length > 20) {
        message.channel.send(bot.mSE(`Input is too long (${argsText.replace(/\s+/g, "").length} - less than 20 characters please!).`)); // no longer than 20
        return;
    };

    let c = convert(argsText.toLowerCase()); // convert

    if (!c) { // reject if no characters were converted
        message.channel.send(bot.mSE("Input is invalid."));
        return;
    };

    try { // webhook shenanigans time
		const webhooks = await message.channel.fetchWebhooks();
		const webhook = webhooks.first();

		await webhook.send({
			content: c,
			username: message.member.displayName,
			avatarURL: message.author.avatarURL()
		});

        message.delete();
        message.channel.send(`Translation: ||${argsText}||`);
	} catch (e) {
        message.reply(bot.mSE("Something went wrong. The webhook's probably not set up."));
        return;
	};

};