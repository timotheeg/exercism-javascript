const a_code = 'a'.charCodeAt(0);

export const isPangram = (input) => {
	const res = Array(26).fill(0);

	for (let idx = input.length; idx--; ) {
		res[input[idx].charCodeAt(0) - a_code] = 1;
	}

	return !res.includes(0);
};
