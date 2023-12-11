/*

messageReactionAdd.js

this event is fired when a message is reacted to

*/

module.exports = async (bot, messageReaction) => {

    // bot is always passed and has all of hotaru(n)'s stuff
    // messageReaction is the message that has been reacted to

    const message = messageReaction.message; // the message reacted to
    const reaction = messageReaction._emoji.name; // the reaction itself

    if (messageReaction.me) return; // ignore self reacts

    // self-deletion: reacted emoji is either 👎, 🚮, or 🗑️.
    if ((message.author.id == bot.user.id || message.webhookId) && (reaction == "👎" || reaction == "🚮" || reaction == "🗑️")) message.delete();

};