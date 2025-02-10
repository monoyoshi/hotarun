/*

fortune.js

fortune cookie generator
returns a fortune (from my very own stash) as well as 6 unique randomly generated numbers

*/

// fortunes.json - list of fortunes for the fortune command
const fcdb = require("../json/fortunes.json");

exports.run = (bot, message) => {

    // lucky number sequence generator 0-99
    // no duplicate numbers
    const lnList = [Math.floor(Math.random() * 100)]; // new list with first randomized number
    while (lnList.length < 6) {
        let ln = Math.floor(Math.random() * 100);
        if (!lnList.includes(ln)) lnList.push(ln);
    };

    message.reply(`"${fcdb.fortunes[Math.floor(Math.random() * fcdb.fortunes.length)]}"\nlucky numbers: ${lnList.join(", ")}`);

};