def parse_input(input_str: str) -> str:
    number = input_str.replace("x = ", "")
    return int(number)


def parse_output(output: int) -> str:
    return "true" if output else "false"


# expected input
# inputs = ["x = 111", "x = 123", "x = 10", "x = -1"]
# output will be a string (true or false)
solution = Solution()

for i in range(len(inputs)):
    input_str = parse_input(inputs[i])
    try:
        output = solution.isPalindrome(input_str)
    except Exception as e:
        output = "Exception::" + str(e)
    output = parse_output(output)
    print(f"{output}")
