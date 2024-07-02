/*

dotw.js

find the day of the week for any date (from year 0 to year MAX_SAFE_INTEGER (which is unreasonably high))

*/

exports.run = (bot, message) => {

    // inputs
    // example : -dotw 2018 September 28
    let lcArgs = message.lcArgs; // ["2018", "september", "28"]
    let year = lcArgs[0]; // "2018"
    let month = lcArgs[1]; // "september"
    let date = lcArgs[2]; // "28"

    const strMonth = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december", "january", "february"]; // months; january and february are on here twice because the first two don't mean anything
    const strDay = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]; // days of the week

    function zeller(q, m, year) { // zeller equation
        let bigK = year % 100; // year of the century; 1996 = 96, 2000 = 0, 2018 = 18
        let bigJ = Math.floor(year / 100); // zero-based century; 1996 = 19, 2000 = 20, 2018 = 20
        return (q + 5 + Math.floor((13 * (m + 1)) / 5) + bigK + Math.floor((bigK / 4)) + Math.floor(bigJ / 4) - (2 * bigJ)) % 7;
    };

    if (!date) { // lacking date (you need all three pieces of information)
        message.reply(bot.mSE(`Invalid input.\nWrite the message like this: \`${bot.prefix}dotw [year] [month] [date]\``));
        return;
    };

    // month check
    if (!parseInt(month)) { // if month is not a number, check if month is name of the month
        if (strMonth.includes(month)) month = strMonth.indexOf(month) + 1; // if it is name of the month, convert into number
        else { // else error
            message.reply(bot.mSE("Input month is invalid."));
            return;
        };
    }
    else {
        month = parseInt(month);
        if (month < 1 || month > 12) {
            message.reply(bot.mSE("Input month is invalid."));
            return;
        };
    };

    // year check
    year = parseInt(year); // convert year string to integer
    if (!year || year < 0 || year > Number.MAX_SAFE_INTEGER) { // if it is not an integer, it is less than 0, or it is too big of a number, error
        message.reply(bot.mSE("Input year is invalid."));
        return;
    };

    // month offset for january / february
    if (month < 3) { // january = 13, february = 14, year - 1
        month = month + 12;
        year--;
    };

    // date check
    date = parseInt(date); // convert date string to integer
    if (!date || date < 1 || // if input date is not a number or date is less than 0
    ((month == 13 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && date > 31) // or if it is a month that contains 31 days and the input date is greater
    || ((month == 4 || month == 6 || month == 9 || month == 11) && date > 30)) { // or if it is a month that only contains 30 days and the input date is greater
        message.reply(bot.mSE("Input date is invalid."));
        return;
    }
    else if (month == 14) { // leap year check; if input month is february
        if (((year + 1) % 4) == 0) { // might be a leap year: divisible by 4
            if (((year + 1) % 100) == 0) { // not leap year: divisible by 100
                if (((year + 1) % 400) == 0) { // leap year: divisible by 400
                    if (date < 1 || date > 29) {
                        message.reply(bot.mSE("Input date is invalid.")); // not in date range 1-29
                        return;
                    };
                }
                else { // not leap year
                    if (date == 29) {
                        message.reply(bot.mSE("Input year is not a leap year."));
                        return;
                    }
                    else if (date < 1 || date > 28) {
                        message.reply(bot.mSE("Input date is invalid.")); // not in date range 1-28
                        return;
                    };
                };
            }
            else { // leap year
                if (date < 1 || date > 29) {
                    message.reply(bot.mSE("Input date is invalid.")); // in date range 1-29
                    return;
                };
            };
        }
        else { // not a leap year
            if (date == 29) {
                message.reply(bot.mSE("Input year is not a leap year."));
                return;
            }
            else if (date < 1 || date > 28) {
                message.reply(bot.mSE("Input date is not one of the days of the month.")); // in date range 1-28
                return;
            };
        };
    };

    // numbers are good to go!
    var result = zeller(date, month, year); // call function
    if (month > 12) { // restore equation offset (january = 1, february = 2, year + 1)
        month = month - 12;
        year = year + 1;
    };

    // long date display fix
    date = date.toString();
    switch (true) {
        case (date.endsWith("1") && date != "11"):
            date += "st";
            break;
        case (date.endsWith("2") && date != "12"):
            date += "nd";
            break;
        case (date.endsWith("3") && date != "13"):
            date += "rd";
            break;
        default:
            date += "th";
    };

    message.reply(`${strMonth[month-1]} ${date}, ${year} is a **${strDay[result]}**!`);

};