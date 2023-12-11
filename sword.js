/*

sword.js (I think people usually call it index.js, but eh I like swords more :))

The heart of hotaru(n)!
- sets up essential packages and files
- logs him into Discord
- sets up event and command handlers
- sets up functions for timekeeping
- sets up functions for activity customization

*/

// basic requirements
const { Client, Intents } = require("discord.js"); // discord.js api
const fs = require('node:fs'); // for event / command handler
const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
}); // instance of bot
const enmap = require("enmap"); // for command handling / mapping

// for memory system
const SQLite = require("better-sqlite3");
bot.sql = new SQLite("./memory/tracker.sqlite");

require("dotenv").config(); // .env file

// swearing filter (just so I don't have to say anything here :))
const Filter = require("bad-words");
bot.swearJar = new Filter();

// config.json - settings and tokens
bot.config = require("./json/config.json");

// activities.json - list of activities hotarun can do + custom status support (for the future)
const activities = require("./json/activities.json");

// punctuation list
bot.punctList = /[!@#$%^&*()-=_+[\]{}\\|;':",./<>?`~]/g;

// error handler - no more crashing - he now just screams (into the void) about what the error is and goes on with his day
process.on("unhandledRejection", e => {
    console.log(`${bot.timestamp()}: an error has occurred.
    ${e.name}: ${e.message.replace(/(\r\n|\n|\r)/gm, "\n\t")}`);
    return;
});

// error message template function
bot.mSE = function messageSoftError(em = "...You did something wrong.") {
    return `⚠️ ERROR: ${em}`;
}

// as for any function related to time, hotaru(n) operates in UTC (hence the UTC part in the Date methods)

// timestamp function for console logging
bot.timestamp = function printTime() {
    let d = new Date(); // current time in milliseconds
    return `${d.getUTCFullYear()}/${(d.getUTCMonth() + 1).toString().padStart(2, "0")}/${d.getUTCDate().toString().padStart(2, "0")} ${d.getUTCHours().toString().padStart(2, "0")}:${d.getUTCMinutes().toString().padStart(2, "0")}:${d.getUTCSeconds().toString().padStart(2, "0")} ${d.getUTCMilliseconds().toString().padStart(3, "0")} UTC`; // timestamp - 2018/09/28 16:20:00 420
};

// annual event function
bot.annualEvent = function eventDate(startMonth, startDate, endMonth, endDate) {
    let d = new Date();
    d.month = d.getUTCMonth() + 1;
    d.date = d.getUTCDate();
    
    if (endMonth && endDate) { // end time is specified, meaning it is an event that spans multiple days
        if (endMonth < startMonth) { // endMonth comes before startMonth, meaning the event spans between years
            if ((d.month == startMonth && d.date >= startDate) // same startMonth, after startDate
            || (d.month > startMonth && d.month <= 12) // after sartMonth, same year
            || (d.month >= 1 && d.month < endMonth) // new year, before endMonth
            || (d.month == endMonth && d.date <= endDate)) // same endMonth, before endDate
                return true;
        }
        else if (endMonth == startMonth) { // spans in the same month
            if (d.month == startMonth && d.date >= startDate && d.date <= endDate) return true; // between startDate and endDate
        }
        else { // spans between months in the same year
            if ((d.month == startMonth && d.date >= startDate) // same startMonth, after startDate
            || (d.month > startMonth && d.month < endMonth) // between startMonth and endMonth
            || (d.month == endMonth && d.date <= endDate)) // same endMonth, before endDate
                return true;
        };
    }
    else if (d.month == startMonth && d.date == startDate) return true; // no endtime; one day event
    return false;
};

// daily event function
bot.dailyEvent = function eventTime(startHour, endHour) {
    let d = new Date();
    d.hour = d.getUTCHours();
    if (endHour < startHour) if (d.hour >= startHour || d.hour <= endHour) return true; // end hour is less than start hour, meaning the event happens overnight
    else if (d.hour >= startHour && d.hour <= endHour) return true; // event happens for a while
    return false;
};

// "sleeps" from 02:00 to 09:59
// it's to make him look alive, but cuz I don't really host him anywhere, it's useless. keeping it here for the future though
// he'll sill respond like usual; this usually just triggers cosmetic changes
// unlike other timekeeping functions, this one works with the timezone of wherever he's hosted at the moment
bot.sleeping = function sleepTime() {
    if (bot.dailyEvent(1, 10)) return true; // "asleep"
    else return false; // "awake"
}

// game
bot.game = function activity() {
    let library = []; // list(s) of games
    let current = {"name": "", "activityType": "PLAYING"}; // current game

    // overall status configuration (sleeping)
    if (bot.sleeping()) library = activities.sleep;
    else if (Math.random() >= 0.69 && bot.annualEvent(4, 1)) library = activities.aprilfools;
    else library = activities.games;

    // game determination
    let rng = Math.random(); // rng
    if (rng < 0.2) { // 20% chance to set special activity based on the day
        switch (true) {
            case bot.annualEvent(1, 14):
                current = {"name": "刀剣乱舞-ONLINE-", "activityType": "PLAYING"};
                break;
            case bot.annualEvent(2, 27) && rng < 0.1:
                current = {"name": "Pokémon Red", "activityType": "PLAYING"};
                break;
            case bot.annualEvent(2, 27):
                current = {"name": "Pokémon Green", "activityType": "PLAYING"};
                break;
            case bot.annualEvent(3, 27):
            case bot.annualEvent(9, 27):
            case bot.annualEvent(11, 29, 11, 30):
                current = {"name": "Dragalia Lost", "activityType": "PLAYING"};
                break;
            case bot.annualEvent(4, 20):
                current = {"name": "Fire Emblem: Shadow Dragon and the Blade of Light", "activityType": "PLAYING"};
                break;
            case bot.annualEvent(7, 30):
            case bot.annualEvent(8, 19):
            case bot.annualEvent(11, 17):
                current = {"name": "Happy Birthday", "activityType": "LISTENING"};
                break;
            default:
                current = library[Math.floor(Math.random() * library.length)]; // otherwise game is determined normally
        };
    }
    else current = library[Math.floor(Math.random() * library.length)]; // otherwise game is determined normally

    return current;
};

console.log(`${bot.timestamp()}: it's loading now!`);

// event handler
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    let eventTotal = 0;
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        ++eventTotal;
        bot.on(eventName, event.bind(null, bot));
    });
    console.log(`${bot.timestamp()}: attempting to load ${eventTotal} events...`);
});

// command handler
bot.commands = new enmap();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    let commandTotal = 0;
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        ++commandTotal;
        bot.commands.set(commandName, props);
    });
    console.log(`${bot.timestamp()}: attempting to load ${commandTotal} commands...`);
});

void bot.login(process.env.DISCORDTOKEN); // hotaru(n)#6467