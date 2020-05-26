const matches = {
	'}': '{',
	']': '[',
	')': '('
};

export const isPaired = (input) => {
	const stack = [];

	for (let idx=0; idx<input.length; idx++) {
		const l = input[idx];

		switch (l) {
			case '{':
			case '[':
			case '(':
				stack.push(l);
				break;
			case '}':
			case ']':
			case ')':
				if (stack.pop() !== matches[l]) {
					return false;
				}
		}
	}

	return stack.length === 0;
};
