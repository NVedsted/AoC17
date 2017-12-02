/**
 * Gets the sum of a string of digits.
 * In the first challenge, a digit is included in the sum if it's identical to the next digit.
 * In the second challenge, a digit is included in the sum if it's identical to the digit half-the-length ahead.
 * Furthermore, the input is processed cyclic.
 *
 * @param {string} s The string of digits.
 * @param {boolean} first Whether to use first challenge logic.
 * @returns {number} The sum of the input.
 */
function getSum(s, first = true) {
    const jump = first ? 1 : s.length / 2;
    let sum = 0;
    for (let i = 0; i < s.length; ++i) {
        if (s[i] === s[(i + jump) % s.length]) {
            sum += parseInt(s[i]);
        }
    }
    return sum
}

/**
 * Solves the daily challenge.
 *
 * @param {string} input The input.
 * @param {int} challenge Which challenge to solve.
 * @returns {number} The result.
 */
module.exports = (input, challenge) => {
    const first = challenge === 1;
    return getSum(input, first);
};
