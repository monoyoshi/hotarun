/*

emoji.js

allows hotaru to send lots of different emoji
- maximum 9 emoji
- does not let multiple "crack" send

*/

exports.run = async (bot, message) => {

    // inputs
    // example : -e run Amazing 💥 
    let args = message.args; // ["run", "Amazing", "💥"]

    function emojiParse(emoL) {
        let output = "";
        let i = 0, len = emoL.length;
        while (i < len) {
            output += ` ${emoL[i]}`; // stack emojis for new message
            ++i;
        };
        return output.trim();
    };

    let emojiList = []; // list of emojis
    let unknown = ""; // list of unknown emojis

    if (args) { // has specific emojis to print
        let i = 0, len = args.length;
        while (i < len) { // for length of message arguments
            if (emojiList.length > 9) { // 9 emoji cap
                emojiParse(emojiList);
                return;
            };

            let emojiSearch = bot.emoji.cache.find(emoji => emoji.name == args[i]); // find emoji
            const crack = bot.emoji.cache.find(emote => emote.name == "crack");

            if (emojiSearch == undefined) { // emoji was not found
                if (/\p{Emoji}/u.test(message.args[i])) emojiList.push(args[i]); // if emoji is actually an emoji, push it
                else unknown += ` \`${args[i]}\``; // else push input into unknown list
            }
            else if (emojiSearch == crack) { // if emoji is crack
                if (!emojiList.includes(crack)) emojiList.push(crack); // if crack hasn't already been used, push it
                // otherwise ignore because multiple cracks are really an eyesore
            }
            else emojiList.push(emojiSearch); // else (emoji is found) push

            ++i;
        };
    }
    else return;

    let output = emojiParse(emojiList); // generate output

    if (output) { // output isn't empty
        try { // webhook shenanigans time
	    	const webhooks = await message.channel.fetchWebhooks();
		    const webhook = webhooks.first();

    		await webhook.send({
	    		content: output,
		    	username: message.member.displayName,
			    avatarURL: message.author.avatarURL()
    		});

            message.delete();
	    } catch (e) {
            message.channel.send(bot.mSE("Something went wrong! Maybe the webhook isn't set up?"));
            return;
    	};
    };

    // post unknown emojis
    if (unknown) message.channel.send(`I wasn't able to find the following emoji: ${unknown}`);

};