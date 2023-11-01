/*

binary.js

group of commands that converts to and from binary
- dbinary : converts decimal to binary
- tbinary : converts text to binary
- binaryd : converts binary to decimal
- binaryt : converts binary to text

*/

exports.run = (bot, message) => {

    // inputs
    // example: -Binary TBinary Among Us
    let lcCommand = message.lcCommand; // "binary"
    let argsText = message.argsText; // "TBinary Among Us"
    let lcArgs = message.lcArgs; // ["tbinary", "among", "us"]

    // decimal to binary conversion
    // accessible with 'dbinary'
    function dbconvert(decimal) {
        let d = parseInt(decimal);
        if (!d) return bot.mSE("Input is not a number."); // check if d is a number
        else if (d < Number.MIN_SAFE_INTEGER || d > Number.MAX_SAFE_INTEGER) return bot.mSE("Input is not in within a reasonable range."); // check if d is not an excessively positive of negative number

        return Math.abs(d).toString(2).padStart(8, "0"); // convert
    }

    // text to binary conversion
    // accessible with 'tbinary'
    function tbconvert(text) {
        if (text.length > 50) return bot.mSE(`Input is too long (${text.length} - less than 50 characters please!).`); // check if text is reasonable size

        let output = ""; // output binary string

        let i = 0, len = text.length;
        while (i < len) {
            output += `${text[i].charCodeAt(0).toString(2).padStart(8, "0")} `; // convert
            ++i;
        };
        return output.trim();
    };

    // binary to decimal conversion
    // accessible with 'binaryd'
    function bdconvert(binary) {
        let b = parseInt(binary, 2);
        if (!b) return bot.mSE("Input is not a number."); // check if d is a number

        return b; // convert
    };

    // binary to text conversion
    // accessible with 'binaryt'
    function btconvert(binary) {
        if (binary.length > 300) return bot.mSE(`Input is too long (${binary.length} - less than 300 characters please!).`); // check if text is reasonable size

        let output = ""; // output text string
        binary.split(" ").map(function(bin) {
            output += String.fromCharCode(parseInt(bin, 2));
        });
        return output;
    };

    let result = "";

    if (!argsText) {
        message.reply(`\`\`\`${bot.mSE("Input is invalid.")}\`\`\``); // nothing to convert
        return;
    };

    if (lcCommand == "binary") {
        lcCommand = lcArgs[0]; // tbinary
        argsText = argsText.slice(lcCommand.length).trim(); // "Among Us"
    };

    switch (lcCommand) {
        case "dbinary":
            result = `\`\`\`${dbconvert(argsText)}\`\`\``;
            break;
        case "tbinary":
            result = `\`\`\`${tbconvert(argsText)}\`\`\``;
            break;
        case "binaryd":
            result = `\`\`\`${bdconvert(argsText)}\`\`\``;
            break;
        case "binaryt":
            result = `\`\`\`${btconvert(argsText)}\`\`\``;
            break;

        default:
            result = "Please specify which binary conversion you would like to perform:\n- decimal to binary: \`dbinary\`\n- text to binary: \`tbinary\`\n- binary to decimal: \`binaryd\`\n- binary to text: \`binaryt\`";
    };

    message.reply(result);

};