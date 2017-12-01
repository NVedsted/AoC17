/**
 * Day 1 of Advent of Code 2017
 * 
 * @author Nicklas Vedsted
 */

#include <iostream>
#include <string>

/**
 * Gets the sum of a string of digits.
 * In the first challenge, a digit is included in the sum if it's identical to the next digit.
 * In the second challenge, a digit is included in the sum if it's identical to the digit half-the-length ahead.
 * Furthermore, the input is processed cyclically.
 *
 * @param s The string of digits.
 * @param first Whether to use first challenge logic.
 * @return The sum of the input.
 */
int getSum(std::string s, bool first = true) {
	int jump = first ? 1 : s.length() / 2;
	int sum = 0;
	for (int i = 0; i < s.length(); ++i)
	{
		if (s[i] == s[(i + jump) % s.length()])
		{
			sum += s[i] - '0';
		}
	}
	return sum;
}

/**
 * Feed the input to the algorithm.
 */
int main() {
	std::string input;
	std::cout << "Puzzle input: ";
	std::cin >> input;
	std::cout << "First code: " << getSum(input, true) << std::endl;
	std::cout << "Second code: " << getSum(input, false) << std::endl;
	return 0;
}
