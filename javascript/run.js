const {getSolver, loadInput, question} = require('./util.js');
const readline = require('readline');

async function run() {
    const rl = readline.createInterface(process.stdin, process.stdout);
    let [day, challenge] = process.argv.slice(2);

    if (day === undefined) {
        day = parseInt(await question(rl, 'Please pick a day: '));
    }

    const input = loadInput(day);
    const solver = getSolver(day);

    if (!challenge || challenge === '1') {
        console.log(solver(input, 1));
    }
    if (!challenge || challenge === '2') {
        console.log(solver(input, 2));
    }
    rl.close();
    process.stdin.destroy();
}

run().catch(console.log);
