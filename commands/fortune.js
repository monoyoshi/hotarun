/*

fortune.js

fortune cookie generator
returns a fortune (from my very own stash) as well as 6 unique randomly generated numbers

*/

// stickers.json - list of fortunes for the sticker command
const fcdb = require("../json/fortunes.json");

exports.run = (bot, message) => {

    // lucky number sequence generator
    // no duplicate numbers
    let lnList = []; // empty list
    lnList.push(Math.floor(Math.random() * 100)); // first number
    while (lnList.length < 6) {
        let ln = Math.floor(Math.random() * 100);
        if (!lnList.includes(ln)) lnList.push(ln);
    };

    message.reply(`"${fcdb.fortunes[Math.floor(Math.random() * fcdb.fortunes.length)]}"\nlucky numbers: ${lnList.join(", ")}`);

};