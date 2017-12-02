const _ = require('lodash');
const {getSolver, loadInput, question} = require('./util.js');
const readline = require('readline');
const fs = require('fs');

const TEST_PATH = '../tests/';

const BEGIN1_HEADER = '###BEGIN1###';
const BEGIN2_HEADER = '###BEGIN2###';
const INPUT_HEADER = '###INPUT###';
const OUTPUT_HEADER = '###OUTPUT###';
const END_HEADER = '###END###';

const ADDING_NOTHING = 0;
const ADDING_INPUT = 1;
const ADDING_OUTPUT = 2;

function loadTests(day) {
    const testsFile = `${TEST_PATH}${day}.test`;
    if (!fs.existsSync(testsFile)) {
        return [];
    }
    const testsRaw = fs.readFileSync(testsFile, {encoding: 'utf8'}).split(/\r?\n/);
    const tests = [];
    let temp;
    let mode = ADDING_NOTHING;
    let currentTest = null;
    for (const [index, line] of testsRaw.entries()) {
        switch (_.trim(line)) {
            case BEGIN1_HEADER:
                if (currentTest !== null) {
                    throw new Error(`Started a test without ending the prior line ${index + 1} in '${testsFile}'.`);
                }
                currentTest = {input: "", output: "", challenge: 1};
                mode = ADDING_NOTHING;
                break;
            case BEGIN2_HEADER:
                if (currentTest !== null) {
                    throw new Error(`Started a test without ending the prior line ${index + 1} in '${testsFile}'.`);
                }
                currentTest = {input: "", output: "", challenge: 2};
                mode = ADDING_NOTHING;
                break;
            case INPUT_HEADER:
                if (currentTest === null) {
                    throw new Error(`Started input without starting a test on line ${index + 1} in '${testsFile}'.`);
                }
                if (mode === ADDING_OUTPUT) {
                    currentTest.output = parseInt(temp);
                }
                temp = "";
                mode = ADDING_INPUT;
                break;
            case OUTPUT_HEADER:
                if (currentTest === null) {
                    throw new Error(`Started output without starting a test on line ${index + 1} in '${testsFile}'.`);
                }
                if (mode === ADDING_INPUT) {
                    currentTest.input = _.trim(temp, '\n');
                }
                temp = "";
                mode = ADDING_OUTPUT;
                break;
            case END_HEADER:
                if (currentTest === null) {
                    throw new Error(`Ended a test without starting one on line ${index + 1} in '${testsFile}'.`);
                }
                if (mode === ADDING_INPUT) {
                    currentTest.input = _.trim(temp, '\n');
                } else if (mode === ADDING_OUTPUT) {
                    currentTest.output = parseInt(temp);
                }
                tests.push(currentTest);
                currentTest = null;
                break;
            default:
                if (mode !== ADDING_NOTHING) temp += line + '\n';
        }
    }
    return tests;
}

async function run() {
    const rl = readline.createInterface(process.stdin, process.stdout);
    let [day] = process.argv.slice(2);

    if (day === undefined) {
        day = parseInt(await question(rl, 'Please pick a day: '));
    }

    function exit(code = 0) {
        rl.close();
        process.stdin.destroy();
        process.exit(code);
    }

    try {
        let solver = getSolver(day);

        for (const [index, {input, output, challenge}] of loadTests(day).entries()) {
            const result = solver(input, challenge);
            if (result === output) {
                console.log(`Test ${index + 1} succeeded.`);
            } else {
                console.log(`Test ${index + 1} failed.`);
                console.log(`Expected:\n${output}`);
                console.log(`Got:\n${result}`);
            }
        }
        console.log('Tests finished.');
        exit();
    } catch(error) {
        console.log('Failed to get solver: ' + error.message);
        exit(1);
    }


}

run().catch(console.log);
