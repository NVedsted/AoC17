import java.util.Scanner;

/**
 * Day 1 of Advent of Code 2017
 * @author Nicklas Vedsted
 */
public class Day1 {
    /**
     * Gets the sum of a string of digits.
     * In the first challenge, a digit is included in the sum if it's identical to the next digit.
     * In the second challenge, a digit is included in the sum if it's identical to the digit half-the-length ahead.
     * Furthermore, the input is processed cyclic.
     *
     * @param s The string of digits.
     * @param first Whether to use first challenge logic.
     * @return The sum of the input.
     */
    private static int getSum(String s, boolean first) {
        int jump = first ? 1 : s.length() / 2;
        int sum = 0;
        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) == s.charAt((i + jump) % s.length())){
                sum += s.charAt(i) - '0';
            }
        }
        return sum;
    }

    /**
     * Feed input to the algorithm.
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Puzzle input: ");
        String input = scanner.next();

        System.out.println("First code: " + getSum(input, true));
        System.out.println("Second code: " + getSum(input, false));
    }
}
