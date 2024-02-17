def parse_input(input_str: str) -> tuple:
    listNodes, n = (
        input_str.replace("head = ", "")
        .replace("n = ", "")
        .replace("[", "")
        .replace("]", "")
        .replace(" ", "")
        .split("\n")
    )
    listNodes = list(map(int, listNodes.split(",")))
    n = int(n)

    for i, val in enumerate(listNodes):
        listNodes[i] = ListNode(val, None)
        if i > 0:
            listNodes[i - 1].next = listNodes[i]
    return (listNodes[0], n)


def parse_output(output) -> str:
    output_list = []
    next_node = output
    while next_node:
        output_list.append(next_node.val)
        next_node = next_node.next
    return str(output_list)


class ListNode:
    def __init__(self, val, next):
        self.val = val
        self.next = next


# expected inputs
# inputs = ["head = [1, 2, 3, 4, 5]\nn = 1", "head = [1]\nn = 1", "head = [1, 2]\nn = 2"]
# output will be a tuple of the head (ListNode) of the list and n (int)

solution = Solution()

for input_str in inputs:
    head, n = parse_input(input_str)
    try:
        output = solution.removeNthFromEnd(head, n)
        output = parse_output(output)
    except Exception as e:
        output = "Exception::" + str(e)
    print(output)
