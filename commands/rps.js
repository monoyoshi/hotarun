/*

rps.js

play a game of rock paper scissors witgh hotaru!
- you can also play with lizard and spock
- sword and gun are both options that give no points

*/

exports.run = (bot, message) => {

    // example : -rps Scissors SWORD rock
    let lcCommand = message.lcCommand; // "rps"
    let args = message.args; // ["Scissors", "SWORD", "rock"]
    let lcArgs = message.lcArgs; // ["scissors", "sword", "rock"]

    function cpuMove(avPool) {
        let cheatRNG = Math.random();
        if (cheatRNG < 0.025) return "Gun";
        else if (cheatRNG < 0.1) return "Sword";
        else return avPool[Math.floor(Math.random() * avPool.length)];
    };

    const available = ["Rock", "Paper", "Scissors"];

    if (!args) return; // prevents play if only the command is sent

    if (lcCommand == "rpsls") { // rock paper scissors lizard spock
        available.push("Lizard", "Spock");
    }

    let userScore = 0; // initial user score
    let botScore = 0; // initial bot score
    let result = "";
    let output = "";

    output = "";
    let i = 0, len = args.length;
    while (i < len) { // allows for multiple rounds of rps in one command
        let botMove = cpuMove(available); // bot move
        let userMove = args[i]; // user move for output display
        let lcUserMove = lcArgs[i]; // user move for internal use

        if (lcCommand != "rpsls" && (lcUserMove == "lizard" || lcUserMove == "spock")) result = "that's not a move..."; // rps lizard spock block
        else if (botMove.toLowerCase() == lcUserMove) result = "it's a tie!"; // user == bot, other than gun leads to a tie
        else {
            switch (botMove) {
                case "Gun":
                    if (lcUserMove == "gun") result = "... maybe it's a tie?"; // user: sword; bot: gun
                    else result = "I win!"; // user: gun; bot: [rock, paper, scissors, lizard, spock]
                    return;
                case "Sword":
                    if (lcUserMove == "Sword") result = "one-on-one, huh..."; // user: sword; bot: gun
                    else result = "I win!"; // user: sword; bot: [rock, paper, scissors, lizard, spock]
                    break;
                case "Rock":
                    switch (lcUserMove) {
                        case "paper":
                        case "spock":
                            result = "you win!";
                            ++userScore;
                            break;
                        case "scissors":
                        case "lizard":
                            result = "I win!";
                            ++botScore;
                    };
                    break;
                case "Paper":
                    switch (lcUserMove) {
                        case "rock":
                        case "spock":
                            result = "I win!";
                            ++botScore;
                            break;
                        case "scissors":
                        case "lizard":
                            result = "you win!";
                            ++userScore;
                    };
                    break;
                case "Scissors":
                    switch (lcUserMove) {
                        case "rock":
                        case "spock":
                            result = "you win!";
                            ++userScore;
                            break;
                        case "paper":
                        case "lizard":
                            result = "I win!";
                            ++botScore;
                    };
                    break;
                case "Lizard":
                    switch (lcUserMove) {
                        case "rock":
                        case "scissors":
                            result = "you win!";
                            ++userScore;
                            break;
                        case "paper":
                        case "spock":
                            result = "I win!";
                            ++botScore;
                    };
                    break;
                case "Spock":
                    switch (lcUserMove) {
                        case "rock":
                        case "scissors":
                            result = "I win!";
                            ++botScore;
                            break;
                        case "paper":
                        case "lizard":
                            result = "you win!";
                            ++userScore;
                    };
                    break;
                default:
                    result = "that's not a move...";
            };
        };

        output += `(${userMove}) **${botMove}**! ${result}\n`; // output for one round

        ++i;
    };

    if (message.lcArgs.length > 2) { // I think people don't care if you play a game or two
        output += `\n\n- overall score: **${userScore - botScore}**.
- your score: **${userScore}**.
- my score: **${botScore}**.`; // user total score - bot total score, user total score, bot total score
    };
    message.channel.send(output.trim());

};