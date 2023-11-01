/*

mirror.js

hotaru can mimic the user

*/

exports.run = (bot, message) => {

    // inputs
    // example : -mirror Hello world!
    let argsText = message.argsText; // "Hello world!"
    
    if (!!argsText) {
        message.delete();
        message.channel.send(argsText);
    };

};