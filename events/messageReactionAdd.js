/*

messageReactionAdd.js

in the event where a message has been reacted to

*/

module.exports = async (bot, messageReaction) => {

    // bot is always passed
    // messageReaction is message that has been reacted to

    const message = messageReaction.message; // the message reacted to
    const reaction = messageReaction._emoji.name; // the reaction itself

    if (messageReaction.me) return; // ignore self reacts

    // self-deletion: reacted emoji is either 👎, 🚮, or 🗑️.
    if (message.author.id == bot.user.id && (reaction == "👎" || reaction == "🚮" || reaction == "🗑️")) message.delete();

};