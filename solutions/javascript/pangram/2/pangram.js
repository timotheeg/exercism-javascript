const a_code = 'a'.charCodeAt(0);

export const isPangram = (input) => {
	const res = Array(26).fill(0);
	const inputLowered = input.toLowerCase();

	for (let idx = inputLowered.length; idx--; ) {
		res[inputLowered[idx].charCodeAt(0) - a_code] = 1;
	}

	return !res.includes(0);
};