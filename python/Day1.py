def get_sum(s, first=True):
    """
    Gets the sum of a string of digits.
    In the first challenge, a digit is included in the sum if it's identical to the next digit.
    In the second challenge, a digit is included in the sum if it's identical to the digit half-the-length ahead.
    Furthermore, the input is processed cyclic.
    :param s: The string of digits.
    :type s: str
    :param first: Whether to use first challenge logic.
    :type first: bool
    :return: The sum
    :rtype: int
    """
    jump = 1 if first else int(len(s) / 2)
    sum = 0
    for i in range(len(s)):
        if s[i] == code[(i + jump) % len(s)]:
            sum += int(s[i])
    return sum


print("Puzzle input: ", end='')
code = input()
print("First code: ", get_sum(code))
print("Second code: ", get_sum(code, False))
