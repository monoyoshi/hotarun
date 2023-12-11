/*

birthday.js

birthday tracker. he will remember your birthday. after that, he can calculate the number of days left until the next birthday.

*/

exports.run = (bot, message) => {

    // inputs
    // example: -birthday July 30
    let lcArgs = message.lcArgs; // ["july", "30"]

    const strMonth = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    if (lcArgs.length == 0) {
        if (bot.userTable.bdayMonth == 99 || bot.userTable.bdayDate == 99) {
            message.reply(`...huh. I don't think I know when your birthday is. you should tell me using the following command: \`${bot.prefix}birthday [month; 1-12 or the full name of the month] [date; 1-31 within reason]\``);
            return;
        };

        // long date display fix
        let strDate = bot.userTable.bdayDate.toString();
        switch (true) {
            case (strDate.endsWith("1") && strDate != "11"):
                strDate += "st";
                break;
            case (strDate.endsWith("2") && strDate != "11"):
                strDate += "nd";
                break;
            case (strDate.endsWith("3") && strDate != "11"):
                strDate += "rd";
                break;
            default:
                strDate += "th";
        };

        let output = `hmm... my records tell me that your birthday is on **${strMonth[bot.userTable.bdayMonth - 1]} ${strDate}**.`;
        if (bot.annualEvent(bot.userTable.bdayMonth, bot.userTable.bdayDate)) output += ` oh! it's your birthday where I'm at, so **happy birthday**! ${bot.emoji.party}`
        else {
            let d = new Date();
            d.setHours(0,0,0,0);

            let bd = `${bot.userTable.bdayMonth}/${bot.userTable.bdayDate}`;
            if ((d.getUTCMonth() + 1 > bot.userTable.bdayMonth)
            || (d.getUTCMonth() + 1 == bot.userTable.bdayMonth && d.getUTCDate() > bot.userTable.bdayDate)) {
                bd = new Date(`${bd}/${d.getUTCFullYear() + 1}`)
            }
            else bd = new Date(`${bd}/${d.getUTCFullYear()}`);

            let daysLeft = Math.round((bd.getTime() - d.getTime()) / 86400000); // divide by number of milliseconds in a day
            if (daysLeft == 1) output += ` there's **only one day left** until then! 👀`;
            else output += ` there are **${daysLeft} days left** until then! ${bot.emoji.happy}`;
        }
        message.reply(output);
        return;
    };

    if (["delete", "forget", "scrub"].includes(lcArgs[0])) {
        bot.userTable.bdayMonth = 99;
        bot.userTable.bdayDate = 99;
        bot.setUserEntry("bdayMonth");
        bot.setUserEntry("bdayDate");
        message.reply("I forgor 💀");
        return;
    }
    
    let month = lcArgs[0]; // "july"
    let date = lcArgs[1]; // "30"

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