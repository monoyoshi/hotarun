/*

ready.js

this is a one-time-only event that occurs when hotaru connects to discord
- mayhas a chance to play a game at login

*/

module.exports = (bot) => {

    // bot is always passed and has all of hotaru(n)'s stuff

    // set start game
    console.log(`${bot.timestamp()}: Attempting to set activity...`);
    let startGame = bot.game();
    if (startGame) bot.user.setActivity(startGame.name, {type: startGame.activityType});

    console.log(`${bot.timestamp()}: Attempting to load the user database...`);
    const userTracker = bot.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'users';").get();
    if (!userTracker["count(*)"]) {
        
        bot.sql.pragma("synchronous = 1");
        bot.sql.pragma("journal_mode = wal");
        // If the table isn't there, create it and setup the database correctly.
        bot.sql.prepare("CREATE TABLE users (id TEXT PRIMARY KEY DEFAULT 0);").run();

        // Ensure that the "id" row is always unique and indexed.
        // bot.sql.prepare("CREATE UNIQUE INDEX idx_userTracker_id ON userTracker (id);").run();
    };

    let columnsList = [
        "notice INTEGER DEFAULT 0", // notice flag

        // rpg elements
        "exp INTEGER DEFAULT 0",
        // "currentHP INTEGER DEFAULT 64",
        // "atk INTEGER DEFAULT 42",

        "roulette INTEGER DEFAULT 6", // roulette gun count
        "remember TEXT DEFAULT ''", // remember text
        "soulscream TEXT DEFAULT ''", // soulscream text

        "bdayMonth INTEGER DEFAULT 99",
        "bdayDate INTEGER DEFAULT 99"
    ];

    for (let column of columnsList) {
        try {
            bot.sql.prepare(`ALTER TABLE users ADD ${column};`).run();
        } catch (e) {
            continue;
        };
    };

    console.log(`${bot.timestamp()}: Attempting to load the server database...`);
    const serverTracker = bot.sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'servers';").get();
    if (!serverTracker["count(*)"]) {
        // If the table isn't there, create it and setup the database correctly.
        bot.sql.prepare("CREATE TABLE servers (id TEXT PRIMARY KEY DEFAULT 0);").run();

        // Ensure that the "id" row is always unique and indexed.
        // bot.sql.prepare("CREATE UNIQUE INDEX idx_serverTracker_id ON serverTracker (id);").run();
    };

    columnsList = [
        "trust INTEGER DEFAULT 0", // trust flag

        "general TEXT DEFAULT ''", // general channel designation
    ];

    for (let column of columnsList) {
        try {
            bot.sql.prepare(`ALTER TABLE servers ADD ${column};`).run();
        } catch (e) {
            continue;
        };
    };

    // prepared statements
    // user entry setting
    bot.setUserEntry = function setEntry(entry, userID = bot.userTable.id) {
        type = bot.sql.prepare(`SELECT typeof(${entry}) FROM users`).get()[`typeof(${entry})`];
        if (type == "text") bot.sql.prepare(`UPDATE users SET ${entry} = '${eval(`bot.userTable.${entry}`)}' WHERE id = ${userID};`).run();
        else bot.sql.prepare(`UPDATE users SET ${entry} = ${eval(`bot.userTable.${entry}`)} WHERE id = ${userID};`).run();
    };

    // server entry setting
    bot.setServerEntry = function setEntry(entry, serverID = bot.serverTable.id) {
        type = bot.sql.prepare(`SELECT typeof(${entry}) FROM servers`).get()[`typeof(${entry})`];
        if (type == "text") bot.sql.prepare(`UPDATE servers SET ${entry} = '${eval(`bot.serverTable.${entry}`)}' WHERE id = ${serverID};`).run();
        else bot.sql.prepare(`UPDATE servers SET ${entry} = ${eval(`bot.serverTable.${entry}`)} WHERE id = ${serverID};`).run();
    };

    console.log(`${bot.timestamp()}: I'm Hotaru, from the laptop of kyu(rem). Tada! This is what you'd call a "headline-worthy introduction," right?`); // he's ready!
};