/*

birthday.js

birthday tracker. he will remember your birthday. after that, he can calculate the number of days left until your next birthday.
he can also fetch other people's bdays

*/

exports.run = (bot, message) => {

    // functions

    // long date display fix
    function sdFix(d) {
        d = d.toString();
        switch (true) {
            case (d.endsWith("1") && d != "11"):
                return `${d}st`;
            case (d.endsWith("2") && d != "12"):
                return `${d}nd`;
            case (d.endsWith("3") && d != "13"):
                return `${d}rd`;
            default:
                return `${d}th`;
        };
    };

    // birthday countdown count
    function bdayCDC(m, d) {
        let compareDate = new Date()
        compareDate.setHours(0, 0, 0, 0);
        
        let bd;
        if ((compareDate.getUTCMonth() + 1 > m)
        || (compareDate.getUTCMonth() + 1 == m && compareDate.getUTCDate() > d)) {
            bd = new Date(`${m}/${d}/${compareDate.getUTCFullYear() + 1}`);
        }
        else bd = new Date(`${m}/${d}/${compareDate.getUTCFullYear()}`);

        let daysLeft = Math.round((bd.getTime() - compareDate.getTime()) / 86400000); // divide by number of milliseconds in a day
        if (daysLeft == 1) return `\nthere's **only one day left** until then! 👀`;
        else return `\nthere are **${daysLeft} days left** until then! ${bot.emoji.happy}`;
    };

    // inputs
    // example: -birthday August 19
    let lcArgs = message.lcArgs; // ["august", "19"]

    const strMonth = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    if (lcArgs.length == 0) {
        if (bot.userTable.bdayMonth == 99 || bot.userTable.bdayDate == 99) {
            message.reply(`...huh. I don't think I know when your birthday is. you should tell me using the following command: \`${bot.prefix}birthday [month; 1-12 or the full name of the month] [date; 1-31 within reason]\``);
            return;
        };

        let output = `hmm... my records tell me that your birthday is on **${strMonth[bot.userTable.bdayMonth - 1]} ${sdFix(bot.userTable.bdayDate)}**.`;
        if (bot.annualEvent(bot.userTable.bdayMonth, bot.userTable.bdayDate)) output += ` oh! it's your birthday where I'm at, so **happy birthday**! ${bot.emoji.party}`
        else output += bdayCDC(bot.userTable.bdayMonth, bot.userTable.bdayDate);
        message.reply(output);
        return;
    };

    switch (lcArgs[0]) {
        case "delete":
        case "forget":
        case "scrub": {
            bot.userTable.bdayMonth = 99;
            bot.userTable.bdayDate = 99;
            bot.setUserEntry("bdayMonth");
            bot.setUserEntry("bdayDate");
            message.reply("I forgor 💀");
            return;
        };
        case "check": {
            let target = lcArgs[1];
            if (target) {
                if (target.substring(0, 3) == "id:" && message.author.id == bot.config.kyuID) target = bot.sql.prepare(`SELECT * FROM users WHERE id = ?`).get(target.substring(3, target.length)); // actual user id check: owner only to prevent data leaks
                else target = bot.sql.prepare("SELECT * FROM users WHERE id = ?").get(target.substring(2, target.length - 1)); // ping check

                if (target) {
                    let output = `hmm... my records tell me that their birthday is on **${strMonth[target.bdayMonth - 1]} ${sdFix(target.bdayDate)}**.`
                    if (bot.annualEvent(target.bdayMonth, target.bdayDate)) output += ` oh! it's their birthday where I'm at, so wish them a **happy birthday**! ${bot.emoji.party}`;
                    else output += bdayCDC(target.bdayMonth, target.bdayDate);
                    message.reply(output);
                }
                else message.reply("hmm... I don't seem to know their birthday.");
            }
            return;
        };
    };
    
    let month = lcArgs[0]; // "august"
    let date = lcArgs[1]; // "19"

    if (!date) {
        if (month.includes("-")) lcArgs[0] = lcArgs[0].split("-");
        else if (month.includes("/")) lcArgs[0] = lcArgs[0].split("/");
        month = lcArgs[0][0];
        date = lcArgs[0][1];
    };

    // month check
    if (!parseInt(month)) { // if month is not a number,
        if (!strMonth.includes(month)) { // check if month is name of the month
            message.reply(bot.mSE("Input month is invalid."));
            return;
        }
        else month = strMonth.indexOf(month) + 1;
    }
    else {
        month = parseInt(month);
        if (month < 1 || month > 12) {
            message.reply(bot.mSE("Input month is invalid."));
            return;
        };
    };

    // date check
    date = parseInt(date); // convert date string to integer
    if (!date || date < 1 || // if input date is not a number or date is less than 0
    ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && date > 31) // or if it is a month that contains 31 days and the input date is greater than 31
    || ((month == 4 || month == 6 || month == 9 || month == 11) && date > 30) // or if it is a month that only contains 30 days and the input date is greater than 30
    || (month == 2 && date > 29)) { // or if it is february and the input date is greater than 29
        message.reply(bot.mSE("Input date is invalid."));
        return;
    };

    bot.userTable.bdayMonth = month;
    bot.userTable.bdayDate = date;

    bot.setUserEntry("bdayMonth");
    bot.setUserEntry("bdayDate");
    message.reply("...noted.");
    
};