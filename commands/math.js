/*

math.js

hotaru does math
- unit circle database
- calculate averages
- calculate any number in the fibonacci sequence
- simple calculator (+ - * / ^)

*/

exports.run = (bot, message) => {

    // inputs
    // example : -math 99 + 10 / 10
    let lcCommand = message.lcCommand; // "math"
    let lcArgs = message.lcArgs; // ["99", "+", "10", "/", "10"]
    let argsText = message.argsText; // "99 + 10 / 10"

    // fibany function, taken straight from a python program
    function fibonacci(on, i = 1, fn1 = 0, fn2 = 1, fnc = 0) {
        // on = original 'n'
        // i = increment number
        // fn1 = fibonacci number n-2
        // fn2 = fibonacci number n-1
        // fnc = current sum of fibonacci

        let n = on; // negative checker

        if (on == 0) return 0; // fn0 = 0
        else if (i == n) return fn2; // incremented enough times so output the final answer
        else { // not done yet
            if (on < 0 && n == on) n *= -1; // negative input and n hasn't been adjusted yet will calculate positive

            if (i < n) { // while not at the nth iteration
                fnc = fn1 + fn2; // current sum
                fn1 = fn2; // calculated value becomes saved
                fn2 = fnc; // current sum is now saved, in preparation for doing this again
                return fibonacci(on, i + 1, fn1, fn2, fnc); // recursion
            };
            // by now, the answer has been decided
            if (on < 0 && (n * -1) == on) fn2 *= -1; // negative input and n has been adjusted so it turns positive into negative 
            return fibonacci(n, i, fn1, fn2, fnc); // recursion
        };
    };

    // following commands need arguments
    if (!lcArgs) return;

    // output variable
    let output = "";

    switch (lcCommand) {
        // square root: sqrt [value]
        case "sqrt": {
            let radicand = parseFloat(lcArgs[0]); // base
            if (!radicand) return;

            // sqrt(4) = 2, sqrt(0.25) = 0.5, sqrt(-9) = NaN
            // generates (value = 4) sqrt(4)
            output = `\`\`\`sqrt(${radicand}) = ${Math.sqrt(radicand)}\`\`\``;

            break;
        };

        // average
        case "average":
        case "avg": {
            let add = 0; // value when everything is added up
            let i = 0; // number of values
            let equation = "";

            len = lcArgs.length;
            while (i < len) {
                let addValue = parseInt(lcArgs[i]);
                if (!addValue && addValue != 0) return;

                
                if (i == lcArgs.length - 1) equation = `${equation}${addValue}`;
                else equation = `${equation}${addValue} + `;
                add = add + addValue; // will add all numbers specified in command
                ++i;
            };

            let solution = add / i; // then divide them by the number of numbers in the command (lol)
            output = `\`\`\`${equation} = ${add}\n${add} / ${i} = ${solution}\`\`\``;
            // generates (args = 1 2 3)
            // 1 + 2 + 3 = 6
            // 6 / 3 = 2

            break;
        };

        case "fibonacci":
        case "fib":
        case "fibany": {
            fibInput = parseInt(lcArgs[0]);
            if (!fibInput) return;

            fibResult = fibonacci(fibInput);

            // nth term display fix
            switch (true) {
                case (fibInput.toString().endsWith("1") && !fibInput.toString().endsWith("11")):
                    fibInput = fibInput + "**st"; // 31st
                    break;
                case (fibInput.toString().endsWith("2") && !fibInput.toString().endsWith("12")):
                    fibInput = fibInput + "**nd"; // 22nd
                    break;
                case (fibInput.toString().endsWith("3") && !fibInput.toString().endsWith("13")):
                    fibInput = fibInput + "**rd"; // 3rd
                    break;
                default:
                    fibInput = fibInput + "**th"; // 14th
            };

            output = `The **${fibInput} term of the fibonacci sequence is: \`${fibResult}\``;

            break;
        };

        default: { // NEW AND (hopefully) IMPROVED basic math calculator - only EMDAS (end my depression and suffering) cuz im too lazy to deal with the P
            let input = argsText.replace(/\s+/g, "").split(""); // no spaces / break into individual characters
            let calcs = []; // parts of the equation

            let term = ""; // term to be built
            let tNegFlag = false; // negative flag
            let tDecFlag = false; // decimal flag

            // iterate through input to build equation
            let i = 0, len = input.length;
            while (i < len) {
                let calcChar = input[i]; // current iterated character

                // negative decimal trigger if value is empty
                if (!tDecFlag && term.length == 0) { // only if decimal flag hasn't been activated yet
                    switch (calcChar) {
                        case "-": // negative flag trigger
                            if (!tNegFlag) tNegFlag = true;
                            else tNegFlag = false; // two negatives make a positive :)
                            break;
                        case "+":
                            break; // ignore ... positive positive?
                        case ".": // <1 decimal trigger
                            term = "0.";
                            tDecFlag = true;
                    };
                };

                switch (true) {
                    case Number.isInteger(parseInt(calcChar)): // build value with numbers
                        term = `${term}${calcChar}`;
                        break;

                    case calcChar == ".": 
                        if (tDecFlag) {
                            message.reply(`⚠️ ERROR: Input is invalid.`);
                            return;
                        };
                        term = `${term}.`;
                        tDecFlag = true;
                        break;
                    
                    // add built value into calcs
                    case calcChar == "^":
                    case calcChar == "*":
                    case calcChar == "/":
                    case calcChar == "+":
                    case calcChar == "-":
                        if (tNegFlag) { // negative flag
                            term = `-${term}`;
                            // reset flags for next number
                            tNegFlag = false;
                            tDecFlag = false;
                        };

                        // not end of array
                        if (i != len - 1) {
                            calcs.push(parseFloat(term));
                            calcs.push(calcChar);

                            term = "";
                            tNegFlag = false;
                            tDecFlag = false;
                        };
                        break;

                    default: // NaN results in an error
                        message.reply("⚠️ ERROR: Input is invalid.");
                        return;
                };

                // end of array
                if (i == (input.length - 1)) {
                    if (tNegFlag) term = `-${term}`;
                    calcs.push(parseFloat(term));
                };

                ++i;
            };

            let screen = calcs.join(""); // displayed equation

            // checks for ^
            i = 0, len = calcs.length;
            while (i < len) {
                if (calcs[i] == "^") {
                    calcs[i-1] = Math.pow(calcs[i-1], calcs[i+1]);
                    calcs.splice(i, 2);
                    --i;
                }
                else ++i;
            };

            // checks for * and /
            i = 0; len = calcs.length;
            while (i < len) {
                if (calcs[i] == "*") {
                    calcs[i-1] = calcs[i-1] * calcs[i+1];
                    calcs.splice(i, 2);
                    --i;
                }
                else if (calcs[i] == "/") {
                    calcs[i-1] = calcs[i-1] / calcs[i+1];
                    calcs.splice(i, 2);
                    --i;
                }
                else ++i;
            };

            // checks for + and -
            i = 0, len = calcs.length;
            while (i < len) {
                if (calcs[i] == "+") {
                    calcs[i-1] = calcs[i-1] + calcs[i+1];
                    calcs.splice(i, 2);
                    --i;
                }
                else if (calcs[i] == "-") {
                    calcs[i-1] = calcs[i-1] - calcs[i+1];
                    calcs.splice(i, 2);
                    --i;
                }
                else ++i;
            };

            output = `\`${screen}=${calcs}\``;
        };
    };

    message.reply(output);

};