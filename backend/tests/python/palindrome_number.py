def parse_input(input_str: str) -> str:
    return int(input_str)


def parse_output(output: int) -> str:
    return "true" if output else "false"

# expected input
# inputs = ["111", "123", "10", "-1"]
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
