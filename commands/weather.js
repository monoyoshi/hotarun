/*

weather.js

a way for hotaru to tell the weather of almost any area!

*/

const { MessageEmbed } = require("discord.js"); // discord.js api for embeds
const tenki = require("weather-js"); // weather-js - returns weather

exports.run = (bot, message) => {

    // inputs
    // example : -weather tokyo JAPAN
    let lcArgsText = message.lcArgsText; // "tokyo japan"

    if (!lcArgsText) return;
    tenki.find({ search: lcArgsText, degreeType: "F" }, function (err, result) {

        // error handling
        if (err) {
            message.channel.send(bot.mSE(`An unexpected error has occured. Please try again.\n\`\`\`${err}\`\`\``));
            return;
        }

        if (result.length == 0) {
            message.channel.send(bot.mSE(`Invalid location (${message.argsText}). Please try again.`));
            return;
        }

        // weather variables
        let location = result[0].location;
        let current = result[0].current;

        let timezone = location.timezone;

        let temperature = current.temperature;
        let feelsLike = current.feelslike;

        let date = current.date;
        let time = current.observationtime;

        const embed = new MessageEmbed()
            .setAuthor({name: `Weather for ${current.observationpoint}`})
            .setColor(bot.config.color)
            .setThumbnail(current.imageUrl)
            .addFields(
                {name: "Weather", value: current.skytext},
                {name: "Temperature", value: `${temperature}°F / ${Math.round(((temperature - 32) * (5 / 9)))}°C`, inline: true},
                {name: "Feels Like", value: `${feelsLike}°F / ${Math.round(((feelsLike - 32) * (5 / 9)))}°C`, inline: true},
                {name: "Humidity", value: `${current.humidity}%`},
                {name: "Winds", value: current.winddisplay.toLowerCase()}
            )
            .setFooter({text: "Data taken from weather.service.msn.com using weather-js.", iconURL: bot.user.avatarURL()});
        if (timezone > 0) embed.setDescription(`Last updated on ${date} at ${time} UTC+${timezone}`);
        else if (timezone < 0) embed.setDescription(`Last updated on ${date} at ${time} UTC${timezone}`);
        else embed.setDescription(`Last updated on ${date} at ${time} UTC`);

        message.channel.send({ embeds: [embed] });
    });

};