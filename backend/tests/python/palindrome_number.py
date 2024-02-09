def parse_input(input_str: str) -> str:
    return int(input_str)

def parse_output(output):
    return 'true' if output else 'false'

inputs = ['111', '123']
outputs = ['true', 'false']
solution = Solution()

for i in range(len(inputs)):
    input_str = parse_input(inputs[i])
    try:
        output = solution.isPalindrome(input_str)
    except Exception as e:
        output = "Exception::" + str(e)
    output = parse_output(output)
    print(f"output: {output}, expected: {outputs[i]}")