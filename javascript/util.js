const fs = require('fs');
const _ = require("lodash");

const INPUT_LOCATION = "../input/";

/**
 * Loads the input for a day.
 *
 * @param {int} day The day to load for.
 */
function loadInput(day) {
    const inputPath = `${INPUT_LOCATION}Day${day}.txt`;
    if (!fs.existsSync(inputPath)) {
        throw Error(`Input file for day ${day} could not be found.`);
    } else {
        return fs.readFileSync(inputPath, {encoding: 'utf8'});
    }
}

/**
 * Runs a given challenge on a given day.
 *
 * @param {int} day
 * @return {function} That takes input and challenge as arguments.
 * @throws {Error} If the day could not found.
 */
function getSolver(day) {
    const scriptPath = `Day${day}.js`;

    if (!fs.existsSync(scriptPath)) {
        throw Error(`${scriptPath} could not be found.`);
    }

    const solver = require(`./${scriptPath}`);

    return (input, challenge) => solver(_.replace(input, '\r', ''), challenge);
}

/**
 * Asks a question on a readline interface.
 *
 * @param rl The readline interface to use.
 * @param {string} msg The question to ask.
 * @returns {Promise} A Promise that will resolve with the answer.
 */
function question(rl, msg) {
    return new Promise((resolve) => {
        rl.question(msg, resolve);
    });
}

module.exports = {
    loadInput,
    getSolver,
    question
};